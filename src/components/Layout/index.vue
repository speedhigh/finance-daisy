<template>
  <div class="w-full min-h-screen bg-gradient-to-br from-indigo-200  to-indigo-300 p-4 backdrop-blur-lg">
    <div class="rounded-2xl bg-gray-100 w-full h-full py-4 pl-72 shadow-lg opacity-90 relative min-h-[96vh]">
      <!-- nav -->
      <base-nav />
      <!-- header -->
      <div class="py-1">
        <base-bredcrumb />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import BaseNav from '/src/components/BaseNav.vue'
import BaseBredcrumb from '/src/components/BaseBredcrumb.vue'

export default {
  components: {
    BaseNav,
    BaseBredcrumb
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