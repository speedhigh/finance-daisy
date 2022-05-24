<template>
  <div>
    <!-- 大客户资料 -->
    <div class="w-full bg-white shadow-lg px-6 pt-4 pb-6 rounded-box">
      <h2>大客户资料</h2>
      <div class="mt-6 flex space-x-6">
        <div class="flex-shrink-0 w-[73px]">
          <img src="https://api.lorem.space/image/fashion?w=73&h=73" class="rounded-full" />
        </div>
        <div class="mt-1 flex-grow space-y-4">
          <p class="text-2xl">{{ info.yonghuming }}</p>
          <div class="flex items-center space-x-14 text-gray-700">
            <p>用户ID：{{ info.id }}</p>
            <p>联系方式：{{ info.lianxifangshi }}</p>
            <p>下级数量：{{ info.xiajishuliang }}</p>
            <p>注册时间：{{ info.zhuceriqi }}</p>
            <p>到期时间：{{ info.endriqi }}</p>
          </div>
          <div class="flex items-center space-x-14 text-gray-700">
            <p>累计订单数量：{{ info.leijidingdanshuliang }}</p>
            <p>累计订单金额：{{ info.leijidingdanjine }}</p>
            <p>累计订单收益：{{ info.leijidingdanshouyi }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单分析 -->
    <div class="mt-5 w-full bg-white shadow-lg px-6 pt-4 pb-6 rounded-box">
      <h2>订单分析</h2>
      <div class="mt-5 grid grid-cols-3 gap-x-6">

        <!-- 年度 -->
        <div v-if="niandudtos.show" class="w-full">
          <div class="flex items-center space-x-2">
            <div class="tag" /><h3>年度</h3>
          </div>
          <div v-loading="niandudtos.loading" class="chart-box">
            <base-chart id="niandudtos" :options="niandudtos.options" />
          </div>
        </div>

        <!-- 季度 -->
        <div v-if="jidudtos.show" class="w-full">
          <div class="flex items-center space-x-2">
            <div class="tag" /><h3>季度</h3>
          </div>
          <div v-loading="jidudtos.loading" class="chart-box">
            <base-chart id="jidudtos" :options="jidudtos.options" />
          </div>
        </div>

        <!-- 月度 -->
        <div v-if="yuedudtos.show" class="w-full">
          <div class="flex items-center space-x-2">
            <div class="tag" /><h3>月度</h3>
          </div>
          <div v-loading="yuedudtos.loading" class="chart-box">
            <base-chart id="yuedudtos" :options="yuedudtos.options" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '/src/api/index.js'
import barChartOptions from '/src/charts/barChartOptions.js'
import lineChartOptions from '/src/charts/lineChartOptions.js'
export default {
  setup() {
    const route = useRoute()
    const params = ref({
      userType: '大客户',
      userId: route.params.id
    })

    const newbParams = ref({
      pid: route.params.id
    })

    // 大客户资料
    const info = ref({})
    const infoLoading = ref(true)

    const niandudtos = reactive({
      show: false,
      options: barChartOptions(),
      loading: true
    })

    const jidudtos = reactive({
      show: false,
      options: lineChartOptions(), 
      loading: true 
    })

    const yuedudtos = reactive({
      show: false,
      options: lineChartOptions(),
      loading: true
    })

    const salaries = ref([])

    api.get('/home/getNewBigById', { id: route.params.id }).then((res) => {
      console.log(res.data.data.info)
      // info（个人资料）
      info.value = res.data.data.info
      infoLoading.value = false
      // 年度图表
      let nianduArr = JSON.parse(res.data.data.niandudtos)
      if(nianduArr.length > 0) niandudtos.show = true
      let nianduOptions = barChartOptions(nianduArr.map(item => item.shijian), nianduArr.map(item => item.renshu))
      niandudtos.options = nianduOptions
      niandudtos.loading = false

      // 季度图表
      let jiduArr = JSON.parse(res.data.data.jidudtos)
      if(jiduArr.length > 0) jidudtos.show = true
      let jiduOptions = lineChartOptions(jiduArr.map(item => item.shijian), jiduArr.map(item => item.renshu))
      jidudtos.options = jiduOptions
      jidudtos.loading = false

      // 月度图表
      let yueduArr = JSON.parse(res.data.data.yuedudtos)
      if(yueduArr.length > 0) yuedudtos.show = true
      let yueduoptions = lineChartOptions(yueduArr.map(item => item.shijian), yueduArr.map(item => item.renshu))
      yuedudtos.options = yueduoptions
      yuedudtos.loading = false

      // salaries
      // salaries.value = res.data.data.salaries
    })

    return {
      params,
      newbParams,
      info,
      infoLoading,
      niandudtos,
      jidudtos,
      yuedudtos
    }
  }
}
</script>

<style>

</style>