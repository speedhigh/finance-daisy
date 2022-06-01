<template>
  <div>
    <!-- 大客户资料 -->
    <div class="w-full bg-white shadow-lg px-6 pt-4 pb-6 rounded-box">
      <h2>大客户资料</h2>
      <div class="mt-6 flex space-x-6">
        <div class="flex-shrink-0 w-[73px]">
          <img src="https://api.lorem.space/image/fashion?w=73&h=73" :alt="info.yonghuming" class="rounded-full" />
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
    <div
      v-if="niandudtos.show || jidudtos.show || yuedudtos.show" 
      class="mt-5 w-full bg-white shadow-lg px-6 pt-4 pb-6 rounded-box"
    >
      <h2>订单分析</h2>
      <div class="mt-5 grid grid-cols-3 gap-x-6">

        <!-- 年度 -->
        <div v-if="niandudtos.show" class="w-full">
          <div class="flex items-center space-x-2">
            <div class="w-1.5 h-1.5 rounded-full bg-primary-focus" /><h3>年度</h3>
          </div>
          <div class="mt-3 w-full h-72 rounded-2xl border px-1 pt-5 pb-2">
            <base-chart id="niandudtos" :options="niandudtos.options" />
          </div>
        </div>

        <!-- 季度 -->
        <div v-if="jidudtos.show" class="w-full">
          <div class="flex items-center space-x-2">
            <div class="w-1.5 h-1.5 rounded-full bg-secondary" /><h3>季度</h3>
          </div>
          <div class="mt-3 w-full h-72 rounded-2xl border px-1 pt-5 pb-2">
            <base-chart id="jidudtos" :options="jidudtos.options" />
          </div>
        </div>

        <!-- 月度 -->
        <div v-if="yuedudtos.show" class="w-full">
          <div class="flex items-center space-x-2">
            <div class="w-1.5 h-1.5 rounded-full bg-secondary" /><h3>月度</h3>
          </div>
          <div class="mt-3 w-full h-72 rounded-2xl border px-1 pt-5 pb-2">
            <base-chart id="yuedudtos" :options="yuedudtos.options" />
          </div>
        </div>
      </div>
    </div>

    <!-- 订单数据 -->
    <div class="mt-5 grid grid-cols-2 gap-x-4">
      <div class="w-full bg-white shadow-lg px-6 pt-4 pb-6 rounded-box">
        <h2>订单数据</h2>
        <base-pagination
          :params="params"
          url="/home/userInfo/getAllOrder"
          :size="5"
          class="mt-4"
        >
          <template #default="slotProps">
            <div class="w-full bg-white rounded-md shadow-lg shadow-indigo-200/50 overflow-x-scroll">
              <table class="table table-zebra min-w-full">
                <thead>
                  <tr>
                    <th>下单时间</th>
                    <th>下级id</th>
                    <th>子订单数量</th>
                    <th>订单金额(HK$)</th>
                    <th>订单收益(元)</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody class="text-sm text-gray-500">
                  <tr v-for="(item, index) in slotProps.list" :key="index">
                    <!-- 下单时间 -->
                    <td>{{ item.inserttime }}</td>
                    <!-- 下级id -->
                    <td>{{ item.userId }}</td>
                    <!-- 子订单数量 -->
                    <td>--</td>
                    <!-- 订单金额(HK$) -->
                    <td>{{ item.orderPriceHK }}</td>
                    <!-- 订单收益(元) -->
                    <td>{{ item.profit }}</td>
                    <!-- 操作/查看信息 -->
                    <td>
                      <button 
                        class="btn btn-link text-primary-focus px-0 btn-xs font-normal underline hover:font-bold"
                        @click="$router.push({ path: '/order/data', query: { userId: item.userId } })"
                      >
                        查看订单
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </base-pagination>
      </div>
      <div class="w-full bg-white shadow-lg px-6 pt-4 pb-6 rounded-box">
        <h2>麾下高级经理列表</h2>
        <base-pagination
          :params="newbParams"
          url="/home/getGaoJiJingLiPage"
          :size="5"
          class="mt-4"
        >
          <template #default="slotProps">
            <div class="w-full bg-white rounded-md shadow-lg shadow-indigo-200/50 overflow-x-scroll">
              <table class="table table-zebra min-w-full">
                <thead>
                  <tr>
                    <th>高级经理ID</th>
                    <th>高级经理用户名</th>
                    <th>联系方式</th>
                    <th>注册日期</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody class="text-sm text-gray-500">
                  <tr v-for="(item, index) in slotProps.list" :key="index">
                    <!-- 高级经理ID -->
                    <td>{{ item.id }}</td>
                    <!-- 高级经理用户名 -->
                    <td>{{ item.yonghuming }}</td>
                    <!-- 联系方式 -->
                    <td>{{ item.lianxifangshi }}</td>
                    <!-- 注册日期 -->
                    <td>{{ item.zhuceriqi }}</td>
                    <!-- 操作/查看信息 -->
                    <td>
                      <button 
                        class="btn btn-link text-primary-focus px-0 btn-xs font-normal underline hover:font-bold"
                        @click="$router.push('/customer/newb/detail/' + item.id)"
                      >
                        查看订单
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </base-pagination>
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
import BasePagination from '/src/components/BasePagination.vue'
export default {
  components: {
    BasePagination
  },
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

    const niandudtos = reactive({
      show: false,
      options: barChartOptions(),
    })

    const jidudtos = reactive({
      show: false,
      options: lineChartOptions(), 
    })

    const yuedudtos = reactive({
      show: false,
      options: lineChartOptions(),
    })

    const salaries = ref([])

    api.get('/home/getNewBigById', { id: route.params.id }).then((res) => {
      // info（个人资料）
      info.value = res.data.data.info
      // 年度图表
      let nianduArr = JSON.parse(res.data.data.niandudtos)
      if(nianduArr.length > 0) niandudtos.show = true
      let nianduOptions = barChartOptions(nianduArr.map(item => item.shijian), nianduArr.map(item => item.renshu))
      niandudtos.options = nianduOptions

      // 季度图表
      let jiduArr = JSON.parse(res.data.data.jidudtos)
      if(jiduArr.length > 0) jidudtos.show = true
      let jiduOptions = lineChartOptions(jiduArr.map(item => item.shijian), jiduArr.map(item => item.renshu))
      jidudtos.options = jiduOptions

      // 月度图表
      let yueduArr = JSON.parse(res.data.data.yuedudtos)
      if(yueduArr.length > 0) yuedudtos.show = true
      let yueduoptions = lineChartOptions(yueduArr.map(item => item.shijian), yueduArr.map(item => item.renshu))
      yuedudtos.options = yueduoptions

      // salaries
      // salaries.value = res.data.data.salaries
    })

    return {
      params,
      newbParams,
      info,
      niandudtos,
      jidudtos,
      yuedudtos
    }
  }
}
</script>