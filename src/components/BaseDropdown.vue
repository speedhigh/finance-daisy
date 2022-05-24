<template>
  <div
    class="flex items-center text-sm"
    @click="hover = !hover"
    @mouseleave="hover = false"
  >
    <p class="flex-shrink-0">{{ title }}：</p>
    <div class="relative">
      <input
        v-model="selValue"
        type="text" 
        readonly
        placeholder="请选择"
        class="cursor-pointer input input-sm input-bordered w-48 hover:border-gray-400 placeholder:text-gray-300"
        :class="{'border-gray-400': hover === true && !selValue, 'shadow-sm shadow-indigo-400': selValue}"
      />
      <!-- 清除按钮 -->
      <svg
        v-show="selValue"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-300 absolute right-2 top-1.5 cursor-pointer hover:text-gray-400"
        viewBox="0 0 20 20" 
        fill="currentColor"
        @click.stop="clear"
      >
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>
      <!-- 箭头 -->
      <svg
        v-show="!selValue"
        xmlns="http://www.w3.org/2000/svg" 
        class="h-5 w-5 text-gray-400 absolute right-2 top-1.5 cursor-pointer transition duration-300"
        :class="{'text-gray-700 rotate-180': hover === true}"
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
      <!-- option -->
      <div v-show="hover" class="absolute top-8 pt-2 z-40">
        <ul class="w-48 bg-white rounded-lg shadow text-sm p-2">
          <li
            v-for="(item, index) in options"
            :key="index"
            class="p-2 rounded-md cursor-pointer"
            :class="index === active ? 'text-white bg-indigo-500' : 'hover:bg-gray-200'"
            @click="confirm(item.label, item.value, index)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
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
    options: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  // emits: ['change'],
  setup(props, { emit }) {
    const active = ref(-1)
    const hover = ref(false)
    const selValue = ref('')
    return {
      active,
      hover,
      selValue,
      confirm(label, value, index) {
        active.value = index
        selValue.value = label
        emit('update:modelValue', value)
        setTimeout(() => hover.value = false, 50)
      },
      clear() {
        active.value = -1
        selValue.value = ''
        emit('update:modelValue', '')
      }
    }
  }
}
</script>