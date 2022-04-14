<template>
  <div class="w-full min-h-screen flex">

    <!-- left 侧边栏 -->
    <div 
      class="border-r border-gray-200 flex-shrink-0"
      :class="isCollapse ? 'w-20' : 'w-56'"
    >
      <div class="p-4 cursor-default">
        <h1 v-show="!isCollapse" class="text-primary text-center text-2xl font-bold">木子网<span class="text-neutral-focus">财务后台</span></h1>
        <p v-show="!isCollapse" class="text-center mt-1 text-gray-500 text-sm">v 1.0.0</p>
        <div v-show="isCollapse" class="text-white text-3xl font-bold bg-primary w-10 h-10 rounded-2xl text-center leading-10 mx-auto">木</div>
      </div>
      <ul class="menu p-3 bg-base-100 space-y-2">

        <!-- 首页 -->
        <li :class="{'bg-primary-focus text-primary-content rounded-lg' : path === '/home'}">
          <a @click="jumpTo('/home')">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <p v-show="!isCollapse" class="ml-2">首页</p>
            </div>
          </a>
        </li>
        
        <!-- 提现管理 -->
        <li>
          <a 
            class="active:bg-base-100 active:text-base-content"
            :class="{'bg-primary-focus text-primary-content rounded-lg' : ['/withdraw/todo', '/withdraw/data'].includes(path)}"
          >
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <p v-show="!isCollapse" class="ml-2">提现管理</p>
            </div>
          </a>
          <!-- 提现管理的子选项 -->
          <ul class="bg-base-100 z-50 shadow">
            <!-- 待办信息 -->
            <li :class="{'bg-primary text-base-100' : path === '/withdraw/todo'}">
              <a @click="jumpTo('/withdraw/todo')">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current mr-2 inline-block">          
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>                
                  </svg>
                  <span>待办信息</span>
                </div>
              </a>
            </li>
            <!-- 提现数据 -->
            <li :class="{'bg-primary text-base-100' : path === '/withdraw/data'}">
              <a @click="jumpTo('/withdraw/data')">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 stroke-current mr-2 inline-block">          
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>                
                  </svg>
                  <span>提现数据</span>
                </div>
              </a>
            </li>
          </ul>
        </li>

        <!-- 订单数据 -->
        <li :class="{'bg-primary-focus text-primary-content rounded-lg' : path === '/order/data'}">
          <a @click="jumpTo('/order/data')">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <p v-show="!isCollapse" class="ml-2">订单数据</p>
            </div>
          </a>
        </li>
        
        <!-- 客户资料 -->
        <li>
          <a 
            class="active:bg-base-100 active:text-base-content"
            :class="{'bg-primary-focus text-primary-content rounded-lg' : ['/customer/newb', '/customer/cnewb'].includes(path)}"
          >
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p v-show="!isCollapse" class="ml-2">客户资料</p>
            </div>
          </a>
          <ul class="bg-base-100 z-50 shadow">
            <!-- 大客户数据 -->
            <li :class="{'bg-primary-focus text-primary-content rounded-lg' : path === '/customer/cnewb'}">
              <a @click="jumpTo('/customer/cnewb')">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-5 h-5 stroke-current mr-2">          
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>                
                  </svg>
                  <p>大客户资料</p>
                </div>
              </a>
            </li>
            <!-- 高级经理数据 -->
            <li :class="{'bg-primary-focus text-primary-content rounded-lg' : path === '/customer/newb'}">
              <a @click="jumpTo('/customer/newb')">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-5 h-5 stroke-current mr-2">          
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>                
                  </svg>
                  <p>高级经理资料</p>
                </div>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- right 主体 -->
    <div class="flex-grow w-full h-screen flex flex-col">
      <!-- header 头部 -->
      <div class="flex-shrink-0">
        <div class="w-full p-6 border-b border-gray-100 flex items-center">
          <div class="pr-4 mr-6 border-r border-gray-300 cursor-pointer" @click="isCollapse = !isCollapse">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isCollapse ? ' M4 6h16M4 12h16M4 18h16' : 'M4 6h16M4 12h8m-8 6h16'" />
            </svg>
          </div>
          <!-- 全屏显示 -->
          <div class="ml-auto tooltip tooltip-bottom cursor-pointer" :data-tip="!fullscreen ? '全屏' : '退出全屏'">
            <label class="swap" @click="handleFullScreen">
              <input type="checkbox"/>
              <!-- volume on icon -->
              <svg class="swap-on fill-current" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="23" height="23"><path d="M298.667 298.667V85.333H384V384H85.333v-85.333h213.334zM725.333 85.333v213.334h213.334V384H640V85.333h85.333zM298.667 938.667V725.333H85.333V640H384v298.667h-85.333zm426.666 0H640V640h298.667v85.333H725.333v213.334z"/></svg>
              <!-- volume off icon -->
              <svg class="swap-off fill-current" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="23" height="23"><path d="M170.667 170.667V384H85.333V85.333H384v85.334H170.667zM853.333 384V170.667H640V85.333h298.667V384h-85.334zM170.667 640v213.333H384v85.334H85.333V640h85.334zm682.666 0h85.334v298.667H640v-85.334h213.333V640z" /></svg>
            </label>
          </div>
        </div>
        <!-- breadcrumb 面包屑 -->
        <div class="w-full h-12 border-b border-base-300 shadow flex items-center px-6 bg-base-100">
          <div
            v-for="(item, index) in $route.meta.breadcrumb"
            :key="index"
            class="flex items-center"
          >
            <div 
              :class="$route.meta.breadcrumb.length - index === 1 ? 'text-primary cursor-default font-bold' : index > 0 ? 'cursor-pointer hover:text-primary' : 'cursor-default'"
              @click="jump(item.url, item.text)"
            >
              {{ item.text }}
            </div>
            <div v-if="index < $route.meta.breadcrumb.length - 1" class="mx-2 text-gray-500">></div>
          </div>
        </div>
      </div>
      <!-- body -->
      <div class="flex-grow w-full bg-base-300 p-5">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { changeFullScreen, listenerEvent } from '../../until/fullScreen.js'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const path = ref(route.path)

    watch(() => route.path,(value) => {
      path.value = value
    })

    const isCollapse = ref(false)
    // 全屏切换
    const data = reactive({
      fullscreen: false
    })
    listenerEvent(() => {
      data.fullscreen = !data.fullscreen
    }, data)
    const handleFullScreen = () => changeFullScreen(data)
    const params = toRefs(data)
    return {
      path,
      isCollapse,
      handleFullScreen,
      ...params,
      jumpTo(link) {
        router.push(link)
      }
    }
  }
}
</script>

<style>

</style>