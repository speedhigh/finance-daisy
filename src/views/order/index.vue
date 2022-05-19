<template>
  <div class="w-full bg-[rgba(255,255,255,0.5)] shadow-lg rounded-box p-4 h-96">
    <!-- 筛选区 -->
    <div class="flex flex-wrap w-full">
      <!-- 账户ID： -->
      <div class="flex items-center text-sm mb-2 mx-2">
        <p class="flex-shrink-0">账户ID：</p>
        <input type="text" placeholder="请输入查询" class="input input-sm input-bordered w-48 hover:border-gray-400 focus:border-gray-500" />
      </div>
      <!-- 用户名 -->
      <div class="flex items-center text-sm mb-2 mx-2">
        <p class="flex-shrink-0">用户名：</p>
        <input type="text" placeholder="请输入查询" class="input input-sm input-bordered w-48 hover:border-gray-400 focus:border-gray-500" />
      </div>
      <!-- 身份 -->
      <base-dropdown 
        title="身份" 
        :options="[{ value: '5', label: '高级经理订单' },{ value: '2', label: '普通用户订单' }]"
        class="mb-2 mx-2"
      />
      <!-- 公司 -->
      <base-dropdown 
        title="身份" 
        :options="companyOptions"
        class="mb-2 mx-2"
      />
      <!-- 订单号 -->
      <div class="flex items-center text-sm mb-2 mx-2">
        <p class="flex-shrink-0">订单号：</p>
        <input type="text" placeholder="请输入查询" class="input input-sm input-bordered w-48 hover:border-gray-400 focus:border-gray-500" />
      </div>
      <!-- sku -->
      <div class="flex items-center text-sm mb-2 mx-2">
        <p class="flex-shrink-0">sku：</p>
        <input type="text" placeholder="请输入查询" class="input input-sm input-bordered w-48 hover:border-gray-400 focus:border-gray-500" />
      </div>
      <!-- 药品名称 -->
      <div class="flex items-center text-sm mb-2 mx-2">
        <p class="flex-shrink-0">药品名称：</p>
        <input type="text" placeholder="请输入查询" class="input input-sm input-bordered w-[600px] hover:border-gray-400 focus:border-gray-500" />
      </div>
      <!-- 物流单号 -->
      <div class="flex items-center text-sm mb-2 mx-2">
        <p class="flex-shrink-0">物流单号：</p>
        <input type="text" placeholder="请输入查询" class="input input-sm input-bordered w-48 hover:border-gray-400 focus:border-gray-500" />
      </div>
      <!-- 订单状态 -->
      <base-dropdown 
        title="订单状态" 
        :options="[
          { value: 1, label: '待付款' },
          { value: 2, label: '待发货' },
          { value: 3, label: '待收货' },
          { value: 4, label: '正在派件' },
          { value: 5, label: '待评价' },
          { value: 6, label: '已评价' },
          { value: 7, label: '已取消' },
          { value: 8, label: '已退款' },
        ]"
        class="mb-2 mx-2"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import api from '/src/api/index.js'
export default {
  setup() {
    const companyOptions = ref([])
    api.get('/home/getAllCompany').then((res) => {
      companyOptions.value = res.data.data
    })
    return {
      companyOptions
    }
  }
}
</script>

<style>

</style>