<template>
  <div class="flex items-center text-sm">
    <p class="flex-shrink-0">{{ title }}：</p>
    <div class="relative">
      <input 
        v-model="inputValue" 
        clearable 
        type="text" 
        :placeholder="placeholder"
        class="input input-sm input-bordered hover:border-gray-400 focus:border-gray-500 placeholder:text-gray-300"
        :class="{ 'shadow-sm shadow-indigo-400': inputValue }"
        :style="{width: width + 'px'}"
        @input="change"
      />
      <!-- 清除按钮 -->
      <svg
        v-show="inputValue"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-300 absolute right-2 top-1.5 cursor-pointer hover:text-gray-400"
        viewBox="0 0 20 20" 
        fill="currentColor"
        @click.stop="clear"
      >
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入查询'
    },
    width: {
      type: Number,
      default: 192
    }
  },
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue)
    return {
      inputValue,
      change() {
        emit('update:modelValue', inputValue.value)
      },
      clear() {
        inputValue.value = ''
        emit('update:modelValue', '')
      }
    }
  }
}
</script>