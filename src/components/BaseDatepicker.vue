<template>
  <div class="flex items-center mb-2 mx-2">
    <p class="text-sm">起止日期：</p>
    <Datepicker
      placeholder="点击此处选择日期范围"
      v-model="date"
      ref="dp"
      format="yyyy/MM/dd"
      range multiCalendars
      :enableTimePicker="false"
      :inputClassName="date ? 'dp-custom-input-focus' : 'dp-custom-input'" 
      menuClassName="dp-custom-menu"
      :format="format"
      @update:modelValue="handleDate"
    >
      <!-- 自定义星期头部 -->
      <template #calendar-header="{ index, day }">
        <div>
          {{ dayText[index] }}
        </div>
      </template>
      <!-- 自定义显示月 -->
      <template #month="{ text, value }">
        <p>{{ value + 1 }} 月</p>
      </template>
      <!-- 自定义确认按钮 -->
        <template #action-select>
        <p class="cursor-pointer bg-primary-focus w-20 ml-auto text-center rounded-md text-white leading-7 hover:ring-2" @click="selectDate">确认</p>
      </template>
      <!-- 自定义月菜单 -->
      <template #month-overlay="{ text, value }">
        <p>{{ value + 1 }} 月</p>
      </template>
    </Datepicker>
  </div>
</template>

<script>
import { ref } from 'vue'
import dayjs from 'dayjs'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
export default {
  components: { 
    Datepicker
  },
  emits: ['change', 'clear'],
  setup(params, {emit}) {
    const date = ref()
    const dp = ref()
    const selectDate = () => {
      dp.value.selectDate()
    }
    const dayText = ['日', '一', '二', '三', '四', '五', '六']
    return {
      date,
      dp,
      dayText,
      selectDate,
      handleDate() {
        if(!date.value) {
          emit('clear')
          return
        }
        if(date.value[0] && date.value[1]) {
          emit('change', dayjs(date.value[0]).format('YYYY-MM-DD'), dayjs(date.value[1]).format('YYYY-MM-DD'))
          return
        }
        if(date.value[0] && !date.value[1]) {
          emit('change', dayjs(date.value[0]).format('YYYY-MM-DD'), '')
          return
        }
      },
    }
  }
}

</script>

<style>
.dp-custom-input {
  @apply w-72 rounded-lg text-sm placeholder:text-gray-300
}
.dp-custom-input-focus {
  @apply w-72 rounded-lg text-sm border-gray-300 shadow-sm shadow-indigo-400
}
.dp-custom-menu {
  @apply border-none rounded-xl shadow-lg shadow-purple-200
}
.dp__action_row {
  @apply rounded-xl
}
.dp__range_end, .dp__range_start {
  @apply bg-primary-focus text-white rounded-md
}
.dp__instance_calendar {
  @apply px-2
}
.dp__flex_display {
  @apply flex space-x-2
}
.dp__today {
  @apply border-primary-focus rounded-lg
}
.dp__overlay_cell_active {
  @apply bg-primary-focus text-white
}
.dp__selection_preview {
  @apply text-sm font-bold text-secondary opacity-60
}
</style>