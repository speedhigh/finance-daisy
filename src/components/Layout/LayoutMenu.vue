<template>
  <div class="w-60 bg-white rounded-box shadow-2xl h-[92vh]">
    <div class="px-7 py-5 flex space-x-2">
      <img src="/src/assets/logo.png" alt="logo" class="flex-shrink-0 w-10 h-10">
      <div>
        <h1>香港木子网</h1>
        <p class="text-xs leading-none mt-1">muzimed.com</p>
      </div>
    </div>
    <ul class="menu bg-base-100 p-2 rounded-box px-2 text-gray-500 text-sm">
      <!-- 首页 -->
      <li>
        <a class="option" :class="{ 'option-sel': $route.name === 'Home' }" @click="$router.push('/')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>首页
        </a>
      </li>
      <!-- 订单数据 -->
      <li class="py-2 menu-title">
        <span>订单数据 ——</span>
      </li>
      <li>
        <a class="option" :class="{ 'option-sel': $route.name === 'OrderData' }" @click="$router.push('/order')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fill-rule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clip-rule="evenodd" />
          </svg>订单数据
        </a>
      </li>
      <!-- 提现管理 -->
      <li class="py-2 menu-title">
        <span>提现管理 ——</span>
      </li>
      <li>
        <a class="option" :class="{ 'option-sel': $route.name === 'WithdrawTodo' }"
          @click="$router.push('/withdraw/todo')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clip-rule="evenodd" />
          </svg>待办信息
        </a>
      </li>
      <li>
        <a class="option" :class="{ 'option-sel': $route.name === 'WithdrawData' }"
          @click="$router.push('/withdraw/data')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
          </svg>提现数据
        </a>
      </li>
      <!-- 客户数据 -->
      <li class="py-2 menu-title">
        <span>客户数据 ——</span>
      </li>
      <li>
        <a class="option" :class="{ 'option-sel': $route.name === 'CnewbList' }" @click="$router.push('/customer/cnewb')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>大客户数据
        </a>
      </li>
      <li>
        <a class="option" :class="{ 'option-sel': $route.name === 'NewbList' }" @click="$router.push('/customer/newb')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>高级经理数据
        </a>
      </li>
      <li>
        <a class="option" :class="{ 'option-sel': $route.name === 'UserList' }" @click="$router.push('/customer/user')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>普通用户数据
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.option:active {
  @apply text-primary-focus bg-gradient-to-r from-indigo-100 to-white
}
.option-sel {
  @apply text-primary-focus bg-gradient-to-r from-indigo-100 to-white font-bold
}
</style>