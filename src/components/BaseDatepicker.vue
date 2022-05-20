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
      inputClassName="dp-custom-input" 
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
import { ref, onMounted } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
export default {
  components: { 
    Datepicker
  },
  setup() {
    const date = ref()
    const dp = ref()
    const selectDate = () => {
      dp.value.selectDate();
    }
    const dayText = ['日', '一', '二', '三', '四', '五', '六']
    onMounted(() => {
      // const startDate = new Date()
      // const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
      // date.value = [startDate, endDate]
    })
    return {
      date,
      dp,
      dayText,
      selectDate,
      handleDate(data) {
        console.log(date.value[0])
      }
    }
  }
}

</script>

<style>
.dp-custom-input {
  @apply w-72 rounded-lg text-sm
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