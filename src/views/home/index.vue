<template>
  <div>
    <base-start />
    <!-- 订单分析 -->
    <div class="mt-5 w-full bg-white shadow-lg px-6 pt-4 pb-6 rounded-box">
      <h2>订单分析</h2>
      <div class="grid grid-cols-3 gap-x-5 mt-3">
        <!-- 总成交量 -->
        <div>
          <div class="flex items-center space-x-2">
            <div class="w-1.5 h-1.5 rounded-full bg-primary-focus" /><h3 class="text-gray-600">总成交量</h3>
          </div>
          <div class="chart-box">
            <base-chart id="numCharts" :options="numCharts.options" />
          </div>
        </div>
        <!-- 总成交额 -->
        <div>
          <div class="flex items-center space-x-2">
            <div class="w-1.5 h-1.5 rounded-full bg-secondary" /><h3>总成交额</h3>
          </div>
          <div class="chart-box">
            <base-chart id="sumCharts" :options="sumCharts.options" />
          </div>
        </div>
        <!-- 总收益 -->
        <div>
          <div class="flex items-center space-x-2">
            <div class="w-1.5 h-1.5 rounded-full bg-secondary" /><h3>总收益</h3>
          </div>
          <div class="chart-box">
            <base-chart id="expendCharts" :options="expendCharts.options" />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 w-full flex space-x-5 min-h-[270px]">
      <!-- 最近订单 -->
      <div class="w-2/3 bg-white rounded-box shadow-2xl px-6 pt-4 pb-6 ">
        <div class="flex items-center">
          <h2>最近订单</h2>
          <router-link
            v-show="orderList.length > 0"
            to="/order/data"
            class="ml-auto cursor-pointer hover:font-bold"
          >
            查看更多 >
          </router-link>
        </div>
        <div v-if="orderList.length > 0" class="mt-3 overflow-x-auto text-sm">
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
              <tr v-for="(item, index) in orderList" :key="index">
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
        <div v-else class="w-full h-full flex flex-col justify-center items-center -mt-5">
          <empty-order  class="w-40 h-40" />
          <p class="opacity-40 text-sm">暂无最近订单</p>
        </div>
      </div>
      <!-- 待办信息 -->
      <div class="w-1/3 bg-white backdrop-blur rounded-box shadow-2xl px-6 pt-4 pb-6">
        <div class="flex items-center">
          <h2>待办信息</h2>
          <router-link
            v-show="todoList.length > 0"
            to="/withdraw/todo"
            class="ml-auto cursor-pointer hover:font-bold"
          >
            去处理 >
          </router-link>
        </div>
        <div v-if="todoList.length > 0" class="mt-2.5">
          <div
            v-for="item in todoList"
            :key="item.id"
            class="flex items-center cursor-pointer pr-2"
          >
            <div class="flex-shrink-0 pt-5 pb-3.5 mr-2">
              <div class="w-2 h-2 rounded-full bg-gray-400" />
            </div>
            <router-link 
              to="/withdraw/todo" 
              class="flex-grow flex items-center pt-5 pb-3.5 border-b border-gray-200"
            >
              <p class="flex-grow mr-4 text-gray-500 line-1">{{ item.shuoming }}</p>
              <p class="ml-auto flex-shrink-0 text-gray-500">{{ item.zhuangtai }}</p>
            </router-link>
          </div>
        </div>
        <div v-else class="w-full h-full flex flex-col justify-center items-center -mt-5">
          <empty-data  class="w-40 h-40" />
          <p class="opacity-40 text-sm">暂无待办信息</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import api from '/src/api/index.js'
import barChartOptions from '/src/charts/barChartOptions.js'
import lineChartOptions from '/src/charts/lineChartOptions.js'
import emitter from '/src/until/eventbus'
import BaseStart from '/src/components/BaseStart.vue'
export default {
  components: {
    BaseStart
},
  setup() {
    emitter.emit('changeLoadingState', true)
    const loadingNum = ref(0)
    watch(() => loadingNum.value, (value) => {
      if(value === 5) emitter.emit('changeLoadingState', false)
    })
    
    // 总成交量
    const numCharts = reactive({
      show: false,
      options: barChartOptions(),
    })
    api.get('/home/getTotalChengJiaoNum').then((res) => {
      let arr = JSON.parse(res.data.data)
      if(arr.length > 0) numCharts.show = true
      let options = barChartOptions(arr.map(item => item.shijian), arr.map(item => item.renshu))
      numCharts.options = options
      loadingNum.value += 1
    })

    // 总成交额
    const sumCharts = reactive({
      show: false,
      options: lineChartOptions(),
    })
    api.get('/home/getTotalChengJiaoMoney').then((res) => {
      let arr = JSON.parse(res.data.data)
      if(arr.length > 0) sumCharts.show = true
      let options = lineChartOptions(arr.map(item => item.shijian), arr.map(item => item.renshu))
      sumCharts.options = options
      loadingNum.value += 1
    })

    // 总收益
    const expendCharts = reactive({
      show: false,
      options: lineChartOptions(),
    })
    api.get('/home/getTotalZhiChuMoney').then((res) => {
      let arr = JSON.parse(res.data.data)
      if(arr.length > 0) expendCharts.show = true
      let options = lineChartOptions(arr.map(item => item.shijian), arr.map(item => item.renshu))
      expendCharts.options = options
      loadingNum.value += 1
    })

    // 待办信息
    const todoList = ref([])
    api.get('/home/getToDoInformations').then((res) => {
      todoList.value = res.data.data
      loadingNum.value += 1
    })

    // 最近订单
    const orderList = ref([])
    api.get("/home/getOrdersRecent").then((res) => {
      orderList.value = res.data.data
      loadingNum.value += 1
    })
    return {
      loadingNum,
      numCharts,
      sumCharts,
      expendCharts,
      todoList,
      orderList
    }
  }
}
</script>

<style scoped>
  .chart-box {
    @apply mt-3 w-full h-64 rounded-box border px-1 pt-5 pb-2
  }
  .table :where(th,td) {
    @apply p-3
  }
</style>