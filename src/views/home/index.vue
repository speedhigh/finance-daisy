<template>
  <div class="py-3">
    <base-start />
    <!-- 订单分析 -->
    <div class="mt-4 w-full bg-white shadow-lg p-6 rounded-2xl">
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
    <div class="mt-4 w-full flex space-x-4">
      <div class="w-1/3 h-96 bg-white rounded-2xl shadow-2xl">

      </div>
      <div class="w-2/3 h-96 bg-white rounded-2xl shadow-2xl">

      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
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
    setTimeout(() => emitter.emit('changeLoadingState', false), 800)
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
    })
    return {
      numCharts,
      sumCharts,
      expendCharts
    }
  }
}
</script>

<style scoped>
  .chart-box {
    @apply mt-3 w-full h-64 rounded-2xl border px-1 pt-5 pb-2
  }
</style>