<template>
  <div class="w-full bg-white shadow-xl rounded-box p-4 space-y-2">
    <!-- 筛选区 -->
    <div class="flex flex-wrap w-full">
      <!-- 账户ID -->
      <base-input 
        v-model="params.userId"
        title="账户ID"
        class="mb-2 mx-2"
      />
      <!-- 用户名 -->
      <base-input 
        v-model="params.userName"
        title="用户名"
        class="mb-2 mx-2"
      />
      <!-- 身份 -->
      <base-dropdown
        v-model="params.userType"
        title="身份"
        :options="[{ value: '5', label: '高级经理订单' }, { value: '2', label: '普通用户订单' }]"
        class="mb-2 mx-2"
      />
      <!-- 公司 -->
      <base-dropdown v-model="params.companyId" title="公司" :options="companyOptions" class="mb-2 mx-2" />
      <!-- 订单号 -->
      <base-input
        v-model="params.orderId"
        title="订单号"
        class="mb-2 mx-2"
      />
      <!-- sku -->
      <base-input
        v-model="params.sku"
        title="sku"
        class="mb-2 mx-2"
      />
      <!-- 药品名称 -->
      <base-input
        v-model="params.stitle"
        :width="600"
        title="药品名称"
        class="mb-2 mx-2"
      />
      <!-- 物流单号 -->
      <base-input
        v-model="params.logisticsNum"
        title="物流单号"
        class="mb-2 mx-2"
      />
      <!-- 订单状态 -->
      <base-dropdown
        v-model="params.state"
        title="订单状态" 
        :options="[
          { value: '1', label: '待付款' },
          { value: '2', label: '待发货' },
          { value: '3', label: '待收货' },
          { value: '4', label: '正在派件' },
          { value: '5', label: '待评价' },
          { value: '6', label: '已评价' },
          { value: '7', label: '已取消' },
          { value: '8', label: '已退款' },
        ]" 
        class="mb-2 mx-2"
      />
      <!-- 起止日期 -->
      <base-datepicker @change="dateChange" @clear="clearDate" />
      <!-- 展示数量 -->
      <div class="flex items-center text-sm mb-2 mx-2">
        <p class="flex-shrink-0">展示数量：</p>
        <input
          v-model="size"
          type="number"
          placeholder="请输入数量"
          class="input input-sm input-bordered w-32 hover:border-gray-400 focus:border-gray-500 pr-0"
        />
      </div>
      <!-- 导出excel -->
      <button class="btn btn-accent mb-2 mx-2 btn-sm" :disabled="btnDisabled" @click="exportTable">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd" />
        </svg><span class="ml-1">导出excel</span>
      </button>
    </div>

    <base-pagination url="/home/getOrdersAllPage" :params="params" :size="size">
      <template #default="slotProps">
        <div class="w-full bg-white rounded-md shadow-lg shadow-indigo-200/50 overflow-x-scroll">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>账户ID</th>
                <th>用户名</th>
                <th>身份类别</th>
                <th>上级ID</th>
                <th>订单日期</th>
                <th>订单号</th>
                <th>SKU</th>
                <th>药品名</th>
                <th>数量</th>
                <th>单价（HK$）</th>
                <th>药品总价（HK$）</th>
                <th>订单总金额（HK$）</th>
                <th>汇率</th>
                <th>订单总金额（￥）</th>
                <th>客户收益</th>
                <th>物流公司</th>
                <th>物流单号</th>
                <th>订单状态</th>
              </tr>
            </thead>
            <tbody class="text-sm text-gray-500">
              <tr v-for="(item, index) in slotProps.list" :key="index">
                <!-- 账户ID -->
                <td>{{ item.userId }}</td>
                <!-- 用户名 -->
                <td>{{ item.userName }}</td>
                <!-- 身份类别 -->
                <td>{{ item.userType }}</td>
                <!-- 上级ID -->
                <td>{{ item.pid }}</td>
                <!-- 订单日期 -->
                <td>{{ item.inserttime }}</td>
                <!-- 订单号 -->
                <td>{{ item.orderId }}</td>
                <!-- SKU -->
                <td class="space-y-3">
                  <p v-for="(i, idx) in item.productInfoList" :key="idx">{{ i.sku }}</p>
                </td>
                <!-- 药品名 -->
                <td class="space-y-3">
                  <p v-for="(i, idx) in item.productInfoList" :key="idx">{{ i.stitle }}</p>
                </td>
                <!-- 数量 -->
                <td class="space-y-3">
                  <p v-for="(i, idx) in item.productInfoList" :key="idx">{{ i.num }}</p>
                </td>
                <!-- 药品单价（HK$）-->
                <td class="space-y-3">
                  <p v-for="(i, idx) in item.productInfoList" :key="idx">{{ i.iprice }}</p>
                </td>
                <!-- 药品总价（HK$）-->
                <td class="space-y-3">
                  <p v-for="(i, idx) in item.productInfoList" :key="idx">{{ i.totalPrice }}</p>
                </td>
                <!-- 订单总金额（HK$）-->
                <td>{{ item.orderPriceHK }}</td>
                <!-- 汇率 -->
                <td>{{ item.exchangeRates }}</td>
                <!-- 订单总金额（￥）-->
                <td>{{ item.orderPriceRMB }}</td>
                <!-- 客户收益 -->
                <td>{{ item.profit }}</td>
                <!-- 物流公司 -->
                <td>{{ item.logisticsCompany }}</td>
                <!-- 物流单号 -->
                <td>{{ item.logisticsNum }}</td>
                <!-- 订单状态 -->
                <td>{{ item.state }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </base-pagination>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '/src/api/index.js'
import { pickBy } from 'lodash'
import emitter from '/src/until/eventbus'
import downLoadXls from '/src/until/downLoadXls.js'
import Message from '/src/components/Message/Message.js'
import BaseDatepicker from '/src/components/BaseDatepicker.vue'
import BasePagination from '/src/components/BasePagination.vue'
export default {
  components: {
    BaseDatepicker,
    BasePagination
  },
  setup() {
    const route = useRoute()
    const companyOptions = ref([])
    api.get('/home/getAllCompany').then((res) => {
      companyOptions.value = res.data.data
    })
    const size = ref(7)
    const params = ref({
      userId: route.query.userId ? route.query.userId : '',
      userName: '',
      userType: '',
      companyId: '',
      sharedId: '',
      startTime: '',
      endTime: '',
      orderId: '',
      sku: '',
      stitle: '',
      logisticsNum: '',
      state: ''
    })
    const btnDisabled = ref(false)
    return {
      companyOptions,
      size,
      params,
      btnDisabled,
      dateChange(start, end) {
        params.value.startTime = start
        params.value.end = end
      },
      clearDate() {
        params.value.startTime = params.value.endTime = ''
      },
      exportTable() {
        btnDisabled.value = true
        emitter.emit('changeLoadingState', true)
        api.getBlob('/excel/getOrdersAllPage_ToExcel_Poi', pickBy(params.value)).then((res) => {
          downLoadXls(res)
          btnDisabled.value = false
          Message({ text: '导出成功!', type: 'success' })
          emitter.emit('changeLoadingState', false)
        })
      }
    }
  }
}
</script>

<style>
.table th:first-child {
  @apply relative
}
</style>