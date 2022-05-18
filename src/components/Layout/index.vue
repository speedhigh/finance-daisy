<template>
  <div class="relative" :class="{'overflow-hidden': showLoadingPage}">
    <!-- loadingPage -->
    <base-loading-page
      v-show="showLoadingPage"
      class="fixed top-0 w-full h-screen z-50" 
    />
    <!-- body -->
    <div class="fixed top-0 inset-x-0" :class="{'max-h-screen overflow-hidden': showLoadingPage}">
      <div class="w-full min-h-screen bg-gradient-to-br from-indigo-200  to-indigo-300 p-4 backdrop-blur-lg">
        <div class="rounded-2xl bg-gray-50 w-full h-full py-4 pl-72 shadow-2xl opacity-90 relative min-h-[96vh]">
          <!-- nav -->
          <layout-menu />
          <!-- header -->
          <div class="py-2 pr-10 flex items-center">
            <!-- 面包屑 -->
            <layout-bredcrumb />
            <div class="ml-auto">
              <!-- avatar -->
              <div class="dropdown dropdown-hover dropdown-end">
                <div tabindex="0" class="flex items-center cursor-pointer pb-3">
                  <div class="avatar online">
                    <div class="w-10 rounded-full">
                      <img src="https://api.lorem.space/image/face?hash=28212" />
                    </div>
                  </div>
                  <div class="ml-3 space-y-0.5">
                    <p class="text-sm font-bold">财务</p>
                    <p class="text-gray-400 text-xs">财务-收纳</p>
                  </div>
                </div>
                <ul tabindex="0" class="dropdown-content menu p-1 shadow-lg bg-base-100 rounded-box w-40 text-sm">
                  <li>
                    <a @click="$router.push('/withdraw/todo')">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                      </svg>修改信息
                  </a>
                </li>
                  <li>
                    <a>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                      </svg>退出登录
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import emitter from '/src/until/eventbus'
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
    const showLoadingPage = ref(false)
    emitter.on('changeLoadingState', (state) => showLoadingPage.value = state)
    return {
      showLoadingPage
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