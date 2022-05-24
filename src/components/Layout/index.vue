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
      <div class="w-full h-screen bg-gradient-to-br from-indigo-200  to-indigo-300 p-4">
        <div class="rounded-box bg-[rgba(243,244,246,0.9)] backdrop-blur w-full h-full pb-6 pl-72 pr-6 shadow-xl shadow-secondary/20 min-h-[96vh] overflow-y-scroll">
          <!-- 头部 -->
          <layout-header />
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
import emitter from '/src/until/eventbus'
import LayoutMenu from './LayoutMenu.vue'
import LayoutHeader from './LayoutHeader.vue'
import BaseLoadingPage from '/src/components/BaseLoadingPage.vue'

export default {
  components: {
    BaseLoadingPage,
    LayoutMenu,
    LayoutHeader,
  },
  setup() {
    const showLoadingPage = ref(false)
    emitter.on('changeLoadingState', (state) => showLoadingPage.value = state)
    return {
      showLoadingPage
    }
  }
}
</script>