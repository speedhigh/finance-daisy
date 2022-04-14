<template>
  <div class="w-full bg-white rounded-lg pt-2 pb-5 px-6 shadow">
    <div class="tabs">
      <a 
        class="tab tab-bordered" 
        :class="active === 0 ? 'tab-active text-primary font-bold' : 'hover:text-primary'"
        @click="active = 0"
      >
        大客户待办信息
      </a> 
      <a 
        class="tab tab-bordered" 
        :class="active === 1 ? 'tab-active text-primary font-bold' : 'hover:text-primary'"
        @click="active = 1"
      >
        高级经理待办信息
      </a>
    </div>
    <div>
      <div class="my-4 w-full h-56 bg-red-200">

      </div>
      <div class="flex justify-center">
        <base-pagination />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import BasePagination from '/src/components/BasePagination.vue'
export default {
  components: {
    BasePagination
  },
  setup() {
    const active = ref(0)
    return {
      active
    }
  }
}
</script>

<style scoped>
  .tab-active {
    @apply border-primary
  }
</style>