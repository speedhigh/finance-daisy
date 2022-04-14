<template>
  <!-- 最近订单 -->
  <section>
    <div class="flex items-center">
      <h2>最近订单</h2>
      <router-link
        v-show="order.list.length > 0"
        to="/order/data"
        class="ml-auto text-gray-500 cursor-pointer hover:text-gray-800"
      >
        查看更多 >
      </router-link>
    </div>
    <div v-if="order.list.length > 0" class="mt-3 overflow-x-auto text-sm">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>时间</th>
            <th>高级经理</th>
            <th>高级经理用户名</th>
            <th>成交额（元）</th>
            <th>收益额（元）</th>
            <th>上级 ID</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="(item, index) in order.list" :key="index">
            <td>{{ item.xiadanshijian }}</td>
            <td>{{ item.gaojijingliid }}</td>
            <td>{{ item.gaojijingliyonghuming }}</td>
            <td>{{ item.dingdanjine }}</td>
            <td>{{ item.dingdanshouyi }}</td>
            <td>{{ item.shangjiid }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="flex items-center justify-center">
      <base-empty text="暂无订单" />
    </div>
  </section>
</template>

<script>
import { reactive } from 'vue'
import api from '/src/api/index.js'
import emptyImg from '/src/assets/images/empty.png'

export default {
  setup() {
    const order = reactive({
      list: []
    })
    api.get("/home/getOrdersRecent").then((res) => {
      order.list = res.data.data
    })
    return {
      emptyImg,
      order,
    }
  }
}
</script>

<style>
  .table :where(th,td) {
    @apply p-3
  }
</style>