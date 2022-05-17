<template>
  <div class="w-full bg-white rounded-lg pt-2 pb-5 px-6 shadow">
    <div class="tabs">
      <a
        class="tab tab-bordered"
        :class="active === 0 ? 'tab-active text-primary font-bold' : 'hover:text-primary'"
        @click="active = 0"
      >
        大客户待办信息
      </a> 
      <a
        class="tab tab-bordered"
        :class="active === 1 ? 'tab-active text-primary font-bold' : 'hover:text-primary'"
        @click="active = 1"
      >
        高级经理待办信息
      </a>
    </div>
    <div>
      <div class="my-4 w-full">

      </div>
      <div class="flex justify-center">
        <base-pagination 
          :url="urlArr[active]"
          :params="params"
        >
          <template #default="slotProps">
            <div class="overflow-x-auto w-[1600px]">
              <table class="table table-fixed table-zebra w-full text-sm">
                <!-- head -->
                <thead>
                  <tr>
                    <th class="w-24">账户ID</th>
                    <th class="w-32">用户名</th>
                    <th class="w-48">所属公司</th>
                    <th class="w-56">开户行</th>
                    <th class="w-32">开户人</th>
                    <th class="w-64">账户/卡号</th>
                    <th class="w-32">收益来源</th>
                    <th class="w-32">提现金额（HK$）</th>
                    <th class="w-32">当日汇率</th>
                    <th class="w-32">提现金额（￥）</th>
                    <th class="w-32">手续费（￥）</th>
                    <th class="w-32">代扣代缴个税（￥）</th>
                    <th class="w-32">实际到账（￥）</th>
                    <th class="w-32">申请日期</th>
                    <th class="w-32">当前状态</th>
                    <th class="w-[600px]">备注（若要驳回申请，必须写备注）</th>
                    <th class="w-60">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- row 1 -->
                  <tr v-for="(item, index) in slotProps.list" :key="index">
                    <td>{{ item.userId }}</td>
                    <td>{{ item.userName }}</td>
                    <td>{{ item.company }}</td>
                    <td>{{ item.banks }}</td>
                    <td>{{ item.cardUserName }}</td>
                    <td>{{ item.accountNum }}</td>
                    <td class="cursor-pointer text-primary underline hover:font-bold text-sm">查看详情</td>
                    <td>{{ item.cashOutHK }}{{ item.cashOutHK }}{{ item.cashOutHK }}{{ item.cashOutHK }}</td>
                    <td>{{ item.exchangeRates }}</td>
                    <td>{{ item.cashOutRMB }}</td>
                    <td>{{ item.charge }}</td>
                    <td>{{ item.tax }}</td>
                    <td>{{ item.pay }}</td>
                    <td>{{ item.insertTime }}</td>
                    <td>{{ item.state }}</td>
                    <td class="relative">
                      <input 
                        type="text" 
                        placeholder="请输入备注" 
                        class="absolute w-11/12 h-4/5 input input-bordered focus:input-primary top-[0.3rem]"
                      >
                    </td>
                    <td class="relative">
                      <div class="absolute flex items-center space-x-3 top-[0.3rem] h-4/5">
                        <button class="btn btn-success btn-sm">通过审核</button>
                        <button class="btn btn-error btn-sm">驳回申请</button>
                      </div>
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
import { ref } from 'vue'
import BasePagination from '/src/components/BasePagination.vue'
export default {
  components: {
    BasePagination
  },
  setup() {
    const active = ref(0)
    const urlArr = ref(['/home/getToDoInformations_DKH', '/home/getToDoInformations_GJ'])
    const params = ref({
      userId: '',
      userName: '',
      company: '',
      banks: '',
      cardUserName: '',
      accountNum: '',
      startTime: '',
      endTime: '',
      state: '',
      approver: ''
    })
    return {
      active,
      urlArr,
      params
    }
  }
}
</script>

<style scoped>
  td {
    word-break:break-all;
  }
  .tab-active {
    @apply border-primary
  }
</style>