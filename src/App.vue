<template>
  <div 
    class="text-base leading-none relative"
    :class="{'overflow-hidden': showLoadingPage}"
  >
    <base-loading-page
      v-show="showLoadingPage"
      class="fixed top-0 w-full h-screen z-50" 
    />
    <div class="fixed top-0 inset-x-0" :class="{'max-h-screen overflow-hidden': showLoadingPage}">
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import BaseLoadingPage from './components/BaseLoadingPage.vue'
export default {
  components: {
    BaseLoadingPage
  },
  setup() {
    const showLoadingPage = ref(true)
    return {
      showLoadingPage
    }
  },
}
</script>

<style>
input, button, select, textarea {
  outline: none !important
}
textarea { 
  resize: none !important
}
</style>

