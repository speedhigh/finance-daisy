<template>
  <div class="relative" :class="{'overflow-hidden': showLoadingPage}">
    <!-- 加载页 -->
    <base-loading-page
      v-show="showLoadingPage"
      class="fixed top-0 w-full h-screen z-50"
    />
    <!-- 侧边栏(定位) -->
    <layout-menu class="fixed left-9 top-9 z-20"/>
    <!-- 主体 -->
    <div class="fixed top-0 inset-x-0 h-screen" :class="{'max-h-screen overflow-hidden': showLoadingPage}">
      <div class="w-full h-screen bg-gradient-to-br from-indigo-200  to-indigo-300 p-4 backdrop-blur-lg">
        <div class="rounded-box bg-[rgba(243,244,246,0.8)] backdrop-blur-lg w-full h-full pb-6 pl-72 pr-6 shadow-inner min-h-[96vh] overflow-y-scroll">
          <!-- 头部 -->
          <header class="flex items-center py-4">
            <!-- 面包屑 -->
            <layout-bredcrumb />
            <!-- 搜索框 -->
            <div class="w-[400px] h-10 border rounded-full border-gray-300 bg-white ml-20 flex items-center px-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" class="ml-4 w-full h-full text-sm" placeholder="请输入您要索的订单信息">
            </div>
            <div class="ml-auto flex items-center">
              <!-- avatar -->
              <div class="flex-shrink-0 dropdown dropdown-hover dropdown-end">
                <div 
                  tabindex="0" 
                  class="flex items-center cursor-pointer py-2 pl-3 pr-4 rounded-lg bg-gray-100 shadow-sm hover:rounded-b-none hover:rounded-t-box hover:shadow-xl"
                >
                  <div class="avatar online">
                    <div class="w-10 rounded-full">
                      <img src="https://api.lorem.space/image/face?hash=28212" />
                    </div>
                  </div>
                  <div class="ml-3 space-y-0.5">
                    <p class="text-sm font-bold">财务</p>
                    <p class="text-gray-400 text-xs">财务-收纳</p>
                  </div>
                  <div class="ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <ul tabindex="0" class="dropdown-content menu p-1 shadow-xl bg-gray-100 rounded-b-box w-[169.2px] text-sm">
                  <li>
                    <a @click="$router.push('/withdraw/todo')">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                      </svg>待办信息
                  </a>
                </li>
                  <li>
                    <a @click="layout">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                      </svg>退出登录
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <!-- content -->
          <div>
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import emitter from '/src/until/eventbus'
import Dialog from '/src/components/Dialog/Dialog.js'
import Message from '/src/components/Message/Message.js'
import LayoutMenu from './LayoutMenu.vue'
import LayoutBredcrumb from './LayoutBredcrumb.vue'
import BaseLoadingPage from '/src/components/BaseLoadingPage.vue'

export default {
  components: {
    BaseLoadingPage,
    LayoutMenu,
    LayoutBredcrumb
  },
  setup() {
    const router = useRouter()
    const showLoadingPage = ref(false)
    emitter.on('changeLoadingState', (state) => showLoadingPage.value = state)
    return {
      showLoadingPage,
      // 退出登录
      layout() {
        Dialog({ text: '您确定要退出登录吗？' }).then(() => {
          sessionStorage.removeItem('token')
          router.replace('/login')
          Message({ text: '您已成功退出登录', type: 'success' })
        })
      }
    }
  }
}
// import { useRouter, useRoute } from 'vue-router'
// export default {
//   setup() {
//     const router = useRouter()
//     const route = useRoute()
//     return {

//     }
//   }
// }
// import { reactive, ref, toRefs, watch } from 'vue'
// import { useRouter, useRoute } from 'vue-router'
// import { changeFullScreen, listenerEvent } from '../../until/fullScreen.js'
// export default {
//   setup() {
//     const router = useRouter()
//     const route = useRoute()
//     const path = ref(route.path)

//     watch(() => route.path,(value) => {
//       path.value = value
//     })

//     const isCollapse = ref(false)
//     // 全屏切换
//     const data = reactive({
//       fullscreen: false
//     })
//     listenerEvent(() => {
//       data.fullscreen = !data.fullscreen
//     }, data)
//     const handleFullScreen = () => changeFullScreen(data)
//     const params = toRefs(data)
//     return {
//       path,
//       isCollapse,
//       handleFullScreen,
//       ...params,
//       jumpTo(link) {
//         router.push(link)
//       }
//     }
//   }
// }
</script>