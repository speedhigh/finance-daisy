<template>
  <div class="w-full bg-white shadow-xl rounded-box pt-2 px-4 pb-4">

    <!-- tabs -->
    <div class="tabs">
      <a
        class="tab tab-bordered"
        :class="{'tab-active': active === 0}"
        @click="active = 0"
      >
        大客户提现数据
      </a>
      <a 
        class="tab tab-bordered"
        :class="{'tab-active': active === 1}"
        @click="active = 1"
      >
        高级经理提现数据
      </a> 
    </div>

    <!-- filter -->
    <div class="mt-4 flex flex-wrap w-full">
      <!-- ID -->
      <base-input
        v-model="params.id"
        title="ID"
        class="mb-2 mx-2"
      />
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
      <!-- 所属公司 -->
      <base-dropdown 
        v-model="params.companyId"
        title="所属公司" 
        :options="companyOptions" 
        class="mb-2 mx-2" 
      />
      <!-- 审批人 -->
      <base-input 
        v-model="params.shenpiren"
        title="审批人"
        class="mb-2 mx-2"
      />
      <!-- 状态 -->
      <base-dropdown
        v-model="params.state"
        title="状态" 
        :options="[
          { value: 1, label: '待审核' },
          { value: 11, label: '已审核待提现' },
          { value: 12, label: '审核失败' },
          { value: 2, label: '已审核已提现' },
          { value: 21, label: '已审核提现失败' }
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
    </div>

    <!-- table -->
    <base-pagination
      ref="paginationRef"
      :url="urlArr[active]" 
      :params="params" 
      :size="size" 
      class="mt-2"
    >
      <template #default="slotProps">
        <div class="w-full bg-white rounded-md shadow-lg shadow-indigo-200/50 overflow-x-scroll">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>账户ID</th>
                <th>用户名</th>
                <th>所属公司</th>
                <th>开户行</th>
                <th>账户/卡号</th>
                <th>订单号</th>
                <th>订单日期</th>
                <th>提现金额（HK$）</th>
                <th>汇率</th>
                <th>实际到账金额（￥）</th>
                <th>手续费（￥）</th>
                <th>代扣代缴个税（￥）</th>
                <th>付款金额（￥）</th>
                <th>提现日期</th>
                <th>提现状态</th>
                <th>操作人</th>
                <th>操作时间</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody class="text-sm text-gray-500">
              <tr v-for="(item, index) in slotProps.list" :key="index">
                <!-- 账户ID -->
                <td>{{ item.userId }}</td>
                <!-- 用户名 -->
                <td>{{ item.userName }}</td>
                <!-- 公司名 -->
                <td>{{ item.company }}</td>
                <!-- 开户行 -->
                <td>{{ item.banks }}</td>
                <!-- 账户/卡号 -->
                <td>{{ item.accountNum }}</td>
                <!-- 订单号 -->
                <td class="space-y-3">
                  <p v-for="(i, idx) in item.incomeFromList" :key="idx">{{ i.orderNum }}</p>
                </td>
                <!-- 订单日期 -->
                <td class="space-y-3">
                  <p v-for="(i, idx) in item.incomeFromList" :key="idx">{{ i.orderTime }}</p>
                </td>
                <!-- 提现金额（HK$） -->
                <td>{{ item.cashOutHK }}</td>
                <!-- 汇率-->
                <td>{{ item.exchangeRates }}</td>
                <!-- 实际到账金额（￥） -->
                <td>{{ item.cashOutRMB }}</td>
                <!-- 手续费（￥） -->
                <td>{{ item.charge }}</td>
                <!-- 代扣代缴个税（￥） -->
                <td>{{ item.tax }}</td>
                <!-- 付款金额（￥） -->
                <td>{{ item.pay }}</td>
                <!-- 提现日期 -->
                <td>{{ item.insertTime }}</td>
                <!-- 提现状态 -->
                <td class="space-y-3">
                  <p v-for="(i, idx) in item.approvals" :key="idx">{{ i.des }}</p>
                </td>
                <!-- 操作人 -->
                <td class="space-y-3">
                  <p v-for="(i, idx) in item.approvals" :key="idx">{{ i.approver }}</p>
                </td>
                <!-- 操作时间 -->
                <td class="space-y-3">
                  <p v-for="(i, idx) in item.approvals" :key="idx">{{ i.updateTime }}</p>
                </td>
                <!-- 备注 -->
                <td>{{ item.content }}</td>
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
import api from '/src/api/index.js'
import { useRoute } from 'vue-router'
import BaseDatepicker from '/src/components/BaseDatepicker.vue'
import BasePagination from '/src/components/BasePagination.vue'
export default {
  components: {
    BaseDatepicker,
    BasePagination
  },
  setup() {
    const route= useRoute()
    const active = ref(1)
    const size = ref(7)
    const urlArr = ['/home/getTiXiansPage', '/home/getTiXiansPage_NewB']
    const companyOptions = ref([])
    api.get('/home/getAllCompany').then((res) => {
      companyOptions.value = res.data.data
    })
    const params = ref({
      id: route.query.id ? route.query.id : '',
      userId: '',
      startTime: '',
      endTime: '',
      userName: '',
      companyId: '',
      time: '',
      realname: '',
      shenpiren: '',
      state: ''
    })
    return {
      active,
      size,
      urlArr,
      companyOptions,
      params,
      dateChange(start, end) {
        params.value.startTime = start
        params.value.end = end
      },
      clearDate() {
        params.value.startTime = params.value.endTime = ''
      }
    }
  }
}
</script>

<style scoped>
  .tab-active {
    @apply border-primary-focus text-primary-focus font-bold
  }
</style>