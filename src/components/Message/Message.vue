<template>
  <Transition name="down">
    <div 
      v-show='isShow' 
      class="alert shadow-lg w-96 h-14 fixed z-[9999] top-7 left-1/2 -ml-48"
      :class="[{ 'alert-warning' : type === 'warn' }, { 'alert-success' : type === 'success' }, { 'alert-error' : type === 'error' }]"
    >
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="d[type]" /></svg>
        <span>{{ text }}</span>
      </div>
    </div>
  </Transition>
</template>
<script>
import { onMounted, reactive, ref } from 'vue'
export default {
  name: 'myMessage',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      // warn 警告  error 错误  success 成功
      default: 'warn'
    }
  },
  setup () {
    const isShow = ref(false)
    onMounted(() => {
      isShow.value = true
    })
    const d = reactive({
      warn: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
      success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    })
    return { 
      isShow, 
      d 
    }
  }
}
</script>
<style scoped>
.down-enter-from {
  transform: translate3d(0, -75px, 0);
  opacity: 0;
}
.down-enter-active {
  transition: all 0.5s;
}
.down-enter-to {
  transform: none;
  opacity: 1;
}
</style>
