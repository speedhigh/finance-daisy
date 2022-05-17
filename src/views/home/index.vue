<template>
  <main class="w-full h-full grid grid-cols-2 gap-4">
    <!-- 订单分析 -->
    <!-- <section-analyze />
    <section-order />
    <section-todo /> -->
  </main>
</template>

<script>
// import SectionAnalyze from './components/SectionAnalyze.vue'
// import SectionOrder from './components/SectionOrder.vue'
// import SectionTodo from './components/SectionTodo.vue'
import app from '/src/App.vue'
export default {
  components: {
    app,
    // SectionAnalyze,
    // SectionOrder,
    // SectionTodo
  },
  setup() {
    app.setup().showLoadingPage.value = false
    console.log('aa')
    return {

    }
  }
}
</script>

<style scoped>
  section {
    @apply w-full h-full bg-base-100 rounded-lg py-5 px-6 shadow
  }
</style>