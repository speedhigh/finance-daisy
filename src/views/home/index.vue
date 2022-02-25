<template>
  <main class="w-full h-full grid grid-cols-2 gap-4">
    <!-- 订单分析 -->
    <section-analyze />
    <section-order />
    <section></section>
  </main>
</template>

<script>
import SectionAnalyze from './components/SectionAnalyze.vue'
import SectionOrder from './components/SectionOrder.vue'
export default {
  components: {
    SectionAnalyze,
    SectionOrder
  }
}
</script>

<style scoped>
  section {
    @apply w-full h-full bg-base-100 rounded-lg py-5 px-6 shadow
  }
</style>