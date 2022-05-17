<template>
  <div>
    <slot v-if="localList.length > 0" :list="localList" />
    <div v-if="showEmpty" class="flex items-center justify-center">
      <base-empty text="暂无信息" class="mb-48 py-12" />
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
    }
    askApi()
    watch(props.params, (value) => {
      console.log('params',value)
      askApi(false)
    }, {
      deep: true
    })
    watch(() => props.size, value => {
      askApi()
    })
    watch(() => props.url, value => {
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