<template>
  <div v-if="totalPages > 0" class="btn-group">
    <!-- 上一页 -->
    <button
      :disabled="currentNo === 1"
      class="btn"
      :class="currentNo === 1 ? 'btn-disabled' : ''"
      @click="go('-1')"
    >
      «
    </button>
     <!-- 第一页 -->
    <button
      v-show="startEnd.start >= 2"
      class="btn"
      @click="go(1)"
    >
      1
    </button>
    <!-- 省略号//连续页码向前 -->
    <div 
      v-show="startEnd.start >= 3 && !arrow.showLast" 
      class="btn" 
      @mouseenter="arrow.showLast = true"
    >
      ...
    </div>
    <div
      v-show="startEnd.start >= 3 && arrow.showLast"
      class="btn font-bold text-lg"
      @mouseleave="arrow.showLast = false"
      @click="changeArrow('last')"
    >
      «
    </div>
    <!-- 中间连续页码 -->
    <button
      v-for="(item, index) in startEnd.end" :key="index"
      v-show="item >= startEnd.start"
      class="btn"
      :class="item === currentNo ? 'btn-active' : 'btn'"
      @click="go(item)"
    >
      {{ item }}
    </button>
    <!-- 省略号//连续页码向后 -->
    <div 
      v-show="startEnd.end <= totalPages - 2 && !arrow.showNext" 
      class="btn"
      @mouseenter="arrow.showNext = true"
    >
      ...
    </div>
    <div
      v-show="startEnd.end <= totalPages - 2 && arrow.showNext"
      class="btn font-bold text-lg"
      @mouseleave="arrow.showNext = false"
      @click="changeArrow('next')"
    >
      »
    </div>
    <!-- 最后一页 -->
    <button v-show="startEnd.end < totalPages" class="btn" @click="go(totalPages)">{{ totalPages }}</button>
    <!-- 下一页 -->
    <button
      :disabled="currentNo === totalPages"
      class="btn"
      :class="currentNo === totalPages ? 'btn-disabled' : ''"
      @click="go('+1')"
    >
      »
    </button>
    <!-- Go -->
    <div class="ml-2 flex items-center space-x-2">
      <div class="bg-white text-sm text-gray-600">前往</div>
      <input
        v-model="goValue"
        type="number"
        class="input input-bordered w-14 h-8 focus:border-primary"
        @keyup.enter="enter"
      >
      <div class="bg-white text-sm text-gray-600">页</div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
export default {
  emits: ['change'],
  props: {
    // 总数量
    total: {
      type: Number,
      default: 1
    },
    // 每页的数量
    size: {
      type: Number,
      default: 8
    },
    // 中间连续页码数量
    continues: {
      type: Number,
      default: 5
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  setup(props, { emit }) {
    const goValue = ref('')
    const totalPages = computed(() => Math.ceil(props.total / props.size))
    // 当前页码
    const currentNo = ref(props.currentPage)
    // 计算中间连续页码的开始、结束位置
    const startEnd = computed(() => {
      let start = 0, end = 0
      // 总页数不够，那么就不存在中间连续页码的问题了
      if(totalPages.value < props.continues) {
        start = 1
        end = totalPages.value
      } else {
        // 连续页码数量的一半
        const dx = Math.floor(props.continues / 2)
        start = currentNo.value - dx
        end = currentNo.value + dx
        // 判断边界（假如有20页）
        if(start < 1) {
          start = 1
          // 1 2 3 4 5 ... 20
          end = props.continues
        }
        if(end > totalPages.value) {
          end = totalPages.value
          // 1 ... 16 17 18 19 20
          start = totalPages.value - props.continues + 1
        }
      }
      return {start, end}
    })
    // 中间连续页码切换
    const arrow = reactive({
      showLast: false,
      showNext: false
    })
    return {
      goValue,
      totalPages,
      currentNo,
      startEnd,
      arrow,
      // 点击鼠标跳转
      go(goIndex) {
        if(['-1', '+1'].includes(goIndex)) {
          currentNo.value = goIndex - 0 + currentNo.value
          if(currentNo.value < 1) currentNo.value = 1
          if(currentNo.value > totalPages.value) currentNo.value = totalPages.value
        } else {
          currentNo.value = goIndex - '0'
        }
        emit('change', currentNo.value)
      },
      // 回车跳转
      enter() {
        if(goValue.value <= 0) goValue.value = 1
        if(goValue.value > totalPages.value) goValue.value = totalPages.value
        currentNo.value = goValue.value
        emit('change', currentNo.value)
      },
      // 切换中间页
      changeArrow(state) {
        if(state === 'next') {
          currentNo.value += props.continues
          if(currentNo.value > totalPages.value) currentNo.value = totalPages.value
        }
        if(state === 'last') {
          currentNo.value -= props.continues
          if(currentNo.value < 1) currentNo.value = 1
        }
        emit('change', currentNo.value)
      }
    }
  }
}
</script>

<style scoped>
  .btn { 
    @apply bg-white text-gray-800 border-white font-normal hover:text-primary-focus hover:font-bold
  }
  .btn-active {
    @apply bg-white text-primary-focus font-extrabold
  }
  .btn-disabled {
    @apply text-gray-400 cursor-default
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
</style>