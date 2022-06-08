<template>
  <div class="w-full bg-white shadow-xl rounded-box pt-2 px-4 pb-4">

    <!-- filter -->
    <div class="mt-4 flex flex-wrap w-full">
      <!-- 高级经理ID -->
      <base-input 
        v-model="params.userId"
        title="高级经理ID"
        class="mb-2 mx-2"
      />
      <!-- 高级经理用户名 -->
      <base-input 
        v-model="params.userName"
        title="高级经理用户名"
        class="mb-2 mx-2"
      />
      <!-- 联系方式 -->
      <base-input 
        v-model="params.imobile"
        title="联系方式"
        class="mb-2 mx-2"
      />
      <!-- 上级ID -->
      <base-input 
        v-model="params.pid"
        title="上级ID"
        class="mb-2 mx-2"
      />
      <!-- 起止日期 -->
      <base-datepicker  @change="dateChange" @clear="clearDate" />
    </div>

    <!-- table -->
    <base-pagination
      url="/home/getGaoJiJingLiPage" 
      :params="params" 
      :size="10" 
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
                <th>身份证号</th>
                <th>注册日期</th>
                <th>上级ID</th>
                <th>累计订单数量</th>
                <th>累计订单金额(元)</th>
                <th>累计订单收益(元)</th>
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
                <!-- 身份证号 -->
                <td>{{ item.shenfenzhenghao }}</td>
                <!-- 注册日期 -->
                <td>{{ item.zhuceriqi }}</td>
                <!-- 上级ID -->
                <td>{{ item.shangjiid }}</td>
                <!-- 累计订单数量 -->
                <td>{{ item.leijidingdanshuliang }}</td>
                <!-- 累计订单金额(元) -->
                <td>{{ item.leijidingdanjine }}</td>
                <!-- 累计订单收益(元) -->
                <td>{{ item.leijidingdanshouyi }}</td>
                <!-- 操作/查看信息 -->
                <td>
                  <button 
                    class="btn btn-link text-primary-focus px-0 btn-xs font-normal underline hover:font-bold"
                    @click="$router.push('/customer/newb/detail/' + item.id)"
                  >
                    查看详情
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
import BaseDatepicker from '/src/components/BaseDatepicker.vue'
import BasePagination from '/src/components/BasePagination.vue'
export default {
  components: {
    BaseDatepicker,
    BasePagination
  },
  setup() {
    const params = ref({
      userId: '',
      userName: '',
      imobile: '',
      startTime: '',
      endTime: '',
      pid: ''
    })
    return {
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