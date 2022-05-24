<template>
  <div>
    <slot v-if="localList.length > 0" :list="localList" />
    <div v-if="showEmpty" class="w-full h-full flex flex-col justify-center items-center py-12">
      <empty-order  class="w-96 h-96" />
      <p class="opacity-40">暂无内容</p>
    </div>
    <div class="flex justify-center mt-4">
      <my-pagination
        v-model:currentPage="currentPage"
        :total="total" 
        :size="size" 
        @change="changePage" 
      />
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import mitt from 'mitt'
import api from '/src/api/index.js'
import emitter from '/src/until/eventbus'
import { pickBy } from 'lodash'
import MyPagination from './Pagination/MyPagination.vue'
export default {
  components: {
    MyPagination
  },
  props: {
    size: {
      type: Number,
      default: 7
    },
    url: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    emitter.emit('changeLoadingState', true)
    const BasePaginationMitt = mitt()
    BasePaginationMitt.on('refresh',() => { askApi() })
    const showEmpty = ref(false)
    const total = ref(0)
    const currentPage = ref(1)
    const localList = ref([])
    const askApi = function(more = true) {
      let newParams = {}
      if(!more) currentPage.value = 1
      Object.assign(newParams, props.params, { current: currentPage.value, size: props.size })
      api.get(props.url, pickBy(newParams)).then((res) => {
        if(res.data.code === 20000) {
          showEmpty.value = (res.data.data.total === 0)
          total.value = res.data.data.total
          localList.value = res.data.data.records
        } else {
          total.value = 0
          localList.value = []
        }
      })
      setTimeout(() => {emitter.emit('changeLoadingState', false)}, 150)
    }
    askApi()
    watch(props.params, (value) => {
      emitter.emit('changeLoadingState', true)
      askApi(false)
    }, {
      deep: true
    })
    watch(() => props.size, value => {
      emitter.emit('changeLoadingState', true)
      askApi()
    })
    watch(() => props.url, value => {
      emitter.emit('changeLoadingState', true)
      askApi()
    })
    return {
      showEmpty,
      BasePaginationMitt,
      total,
      currentPage,
      localList,
      askApi,
      changePage(page) {
        currentPage.value = page
        askApi()
      }
    }
  }
}
</script>