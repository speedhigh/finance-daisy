<template>
  <div class="btn-group">
    <button class="btn" :class="active === 1 ? 'btn-disabled' : ''">«</button>
    <button class="btn" :class="active === 1 ? 'btn-active' : ''">1</button>
    <button class="btn">...</button>
    <button class="btn">5</button>
    <button class="btn">6</button>
    <button class="btn">7</button>
    <button class="btn">8</button>
    <button class="btn">9</button>
    <button class="btn">...</button>
    <button class="btn">n</button>
    <button class="btn">»</button>
  </div>
</template>

<script>
import { computed, ref } from "vue"
export default {
  props: {
    size: {
      type: Number,
      default: 7
    },
  },
  setup(props) {
    const total = ref(55)
    const active = ref(1)
    // 分页数
    const totalPages = computed(() => {
      Math.ceil(total.value / props.size)
    })
    // 当前页码
    const currentNo = ref((totalPages.value > 0) ? 1 : 0)
    return {
      total,
      active,
      totalPages,
      currentNo
    }
  }
}
</script>

<style scoped>
  
</style>