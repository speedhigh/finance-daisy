<template>
  <div 
    class="fixed inset-0 w-full h-full z-[1000]"
    :class="fade ? 'transition-all duration-300 bg-[rgba(0,0,0,0.7)]' : 'bg-[rgba(0,0,0,0.5)]'"
  >
    <div 
      class="w-[400px] p-6 bg-white rounded-2xl shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2"
      :class="fade ? 'transition-all duration-300  transform -translate-y-1/2 opacity-100' : ' transform -translate-y-[60%] opacity-0'"
    >
      <p class="font-bold text-2xl">{{ title }}</p>
      <p class="mt-4 text-lg">{{ text }}</p>
      <div class="mt-5 text-right space-x-2">
        <button 
          class="btn btn-outline border-gray-300 text-gray-500 hover:border-primary-focus hover:bg-primary hover:text-primary-focus"
          @click.stop="cancelCallback"
        >
          取消
        </button>
        <button 
          class="btn btn-primary bg-primary-focus text-white"
          @click.stop="submitCallback"
        >
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue"
export default {
  name: "Confirm",
  props: {
    title: {
      type: String,
      default: "提示"
    },
    text: {
      type: String,
      default: ""
    },
    submitCallback: {
      type: Function // 确认事件
    },
    cancelCallback: {
      type: Function // 取消事件
    }
  },
  setup(props) {
    const fade = ref(false)
     onMounted(() => {
      // 当元素渲染完毕立即过渡的动画不会触发
      setTimeout(() => {
        fade.value = true
      }, 0)
    })
    return {
      fade
    }
  }
}
</script>