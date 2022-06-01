<template>
  <div class="w-full bg-white shadow-xl rounded-box pt-2 px-4 pb-4">

    <!-- tabs -->
    <div class="tabs">
      <div
        class="tab tab-bordered"
        :class="{'tab-active': active === 0}"
        @click="active = 0"
      >
        大客户待办信息
      </div> 
      <div 
        class="tab tab-bordered"
        :class="{'tab-active': active === 1}"
        @click="active = 1"
      >
        高级经理待办信息
      </div> 
    </div>

    <!-- filter -->
    <div class="mt-4 flex flex-wrap w-full">
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
      <!-- 公司 -->
      <base-dropdown 
        v-model="params.companyId"
        title="所属公司" 
        :options="companyOptions" 
        class="mb-2 mx-2" 
      />
      <!-- 开户行 -->
      <base-input 
        v-model="params.banks"
        title="开户行"
        class="mb-2 mx-2"
      />
      <!-- 开户人 -->
      <base-input 
        v-model="params.cardUserName"
        title="开户人"
        class="mb-2 mx-2"
      />
      <!-- 账户/卡号 -->
      <base-input 
        v-model="params.accountNum"
        width="300"
        title="账户/卡号"
        class="mb-2 mx-2"
      />
      <!-- 起止日期 -->
      <base-datepicker  @change="dateChange" @clear="clearDate" />
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
                <th>开户人</th>
                <th>账户/卡号</th>
                <th>收益来源</th>
                <th>提现金额（HK$）</th>
                <th>当日汇率</th>
                <th>提现金额（￥）</th>
                <th>手续费（￥）</th>
                <th>代扣代缴个税（￥）</th>
                <th>实际到账（￥）</th>
                <th>申请日期</th>
                <th>当前状态</th>
                <th>备注（若要驳回申请，必须写备注）</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody class="text-sm text-gray-500">
              <tr v-for="(item, index) in slotProps.list" :key="index">
                <!-- 账户ID -->
                <td>{{ item.userId }}</td>
                <!-- 用户名 -->
                <td>{{ item.userName }}</td>
                <!-- 所属公司 -->
                <td>{{ item.company }}</td>
                <!-- 开户行 -->
                <td>{{ item.banks }}</td>
                <!-- 开户人 -->
                <td>{{ item.cardUserName }}</td>
                <!-- 账户/卡号 -->
                <td>{{ item.accountNum }}</td>
                <!-- 收益来源 -->
                <td>
                  <button 
                    class="btn btn-link text-primary-focus px-0 btn-xs font-normal underline hover:font-bold"
                    @click="$router.push({ path: '/withdraw/data', query: {id: item.id, shenfen: shenfenArr[active]} })"
                  >
                    查看详情
                  </button>
                </td>
                <!-- 提现金额（HK$）-->
                <td>{{ item.cashOutHK }}</td>
                <!-- 当日汇率 -->
                <td>{{ item.exchangeRates }}</td>
                <!-- 提现金额（￥）-->
                <td>{{ item.cashOutRMB }}</td>
                <!-- 手续费（￥）-->
                <td>{{ item.charge }}</td>
                <!-- 代扣代缴个税（￥）-->
                <td>{{ item.tax }}</td>
                <!-- 实际到账（￥）-->
                <td>{{ item.pay }}</td>
                <!-- 申请日期 -->
                <td>{{ item.insertTime }}</td>
                <!-- 当前状态 -->
                <td>{{ item.state }}</td>
                <!-- 备注（若要驳回申请，必须写备注）-->
                <td>
                  <input
                    v-model="item.content"
                    type="text"
                    placeholder="在此处填写备注"
                    class="input input-bordered hover:input-secondary focus:input-secondary w-[600px] input-sm text-xs"
                  />
                </td>
                <!-- 操作 -->
                <td class="flex items-center space-x-2">
                  <button
                    class="btn btn-primary btn-sm bg-indigo-600 text-white"
                    @click="confirm(item.id, shenfenArr[active])"
                  >
                    {{ confirmText }}
                  </button>
                  <button
                    class="btn btn-secondary btn-sm text-white"
                    @click="failed(item.id, item.content, shenfenArr[active])"
                  >
                    驳回申请
                  </button>
                </td>
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
import BaseDatepicker from '/src/components/BaseDatepicker.vue'
import BasePagination from '/src/components/BasePagination.vue'
import Dialog from '/src/components/Dialog/Dialog.js'
import Message from '/src/components/Message/Message.js'
export default {
  components: {
    BaseDatepicker,
    BasePagination
  },
  setup() {
    const paginationRef = ref()
    const companyOptions = ref([])
    api.get('/home/getAllCompany').then((res) => {
      companyOptions.value = res.data.data
    })
    const active = ref(1)
    const urlArr = ['/home/getToDoInformations_DKH', '/home/getToDoInformations_GJ']
    const shenfenArr = ['cnewb', 'newb']
    const size = ref(7)
    const params = ref({
      userId: '',
      userName: '',
      companyId: '',
      banks: '',
      cardUserName: '',
      accountNum: '',
      startTime: '',
      endTime: '',
      state: '',
      approver: ''
    })
    const confirmText = ref('')
    if(sessionStorage.getItem('usergroup') === '13') confirmText.value = '通过审核'
    if(sessionStorage.getItem('usergroup') === '14') confirmText.value = '打款完成'
    return {
      paginationRef,
      active,
      urlArr,
      shenfenArr,
      size,
      params,
      confirmText,
      companyOptions,
      dateChange(start, end) {
        params.value.startTime = start
        params.value.end = end
      },
      clearDate() {
        params.value.startTime = params.value.endTime = ''
      },
      // 通过审核
      confirm(id, shenfen) {
        Dialog({ text: '确定要通过申请吗？' }).then(() => {
          api.get('/home/getTiXianSUCCESS', { id: id, content: '', shenfen: shenfen }).then((res) => {
            if(res.data.code === 20000) {
              Message({ text: '已完成审批', type: 'success' })
              paginationRef.value.BasePaginationMitt.emit('refresh')
            }
          })
        })
      },
      // 驳回申请
      failed(id, content, shenfen) {
        if(!content) {
          Message({ text: '请填写未通过理由', type: 'warn' })
          return
        }
        Dialog({ text: '确定要驳回申请吗？' }).then(() => {
          api.get('/home/getTiXianFAIL', { id: id, content: content, shenfen: shenfen }).then((res) => {
            if(res.data.code === 20000) {
              Message({ text: '已完成审批', type: 'success' })
              paginationRef.value.BasePaginationMitt.emit('refresh')
            } else {
              Message({ text: res.data.msg, type: 'error' })
            }
          })
        })
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