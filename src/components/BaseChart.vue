<template>
  <div v-resize="resize" :id="id" class="w-full h-full" />
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    options: {
      required: true,
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    let i = 0
    const chart = ref(null)
    let myChart
    onMounted(() => {
      myChart = echarts.init(document.getElementById(props.id))
      myChart.setOption(props.options)
    })
    watch(() => props.options, (newOptions) => {
      myChart.setOption(newOptions)
    }, { deep: true })
    return {
      chart,
      resize() {
        console.log('aaa')
        i ? myChart.resize() : setTimeout(() => { myChart.resize() }, 800 )
        i += 1
      }
    }
  }
}
</script>