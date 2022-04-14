<template>
  <section>
    <!-- title -->
    <div class="flex items-center">
      <h2>待办信息</h2>
      <router-link 
        to="/withdraw/todo" 
        class="ml-auto text-gray-500 cursor-pointer hover:text-gray-800"
      >
        查看更多 >
      </router-link>
    </div>
    <!-- content -->
    <div v-if="list.length > 0" class="mt-2.5">
      <div
        v-for="item in list"
        :key="item.id"
        class="flex items-center cursor-pointer pr-2 hover:font-bold active:font-normal"
      >
        <div class="flex-shrink-0 pt-5 pb-3.5 mr-2">
          <div class="w-2 h-2 rounded-full bg-gray-400" />
        </div>
        <router-link to="/withdraw/todo" class="flex-grow flex items-center pt-5 pb-3.5 border-b border-gray-200 hover:border-gray-300 active:border-gray-200">
          <p class="flex-grow mr-4 text-gray-500 line-1">{{ item.shuoming }}</p>
          <p class="ml-auto flex-shrink-0 text-red-700">{{ item.zhuangtai }}></p>
        </router-link>
      </div>
    </div>
    <!-- empty -->
    <div v-else class="flex items-center justify-center">
      <base-empty text="暂无信息" />
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import api from '/src/api/index.js'
export default {
  setup() {
    const list = ref([])
    api.get("/home/getToDoInformations").then((res) => {
      console.log(res)
      list.value = res.data.data
    })
    return {
      list
    }
  }
}
</script>