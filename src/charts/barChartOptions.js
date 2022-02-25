import * as echarts from 'echarts'
export default function barChartOptions(xData, yData) {
  return {
    xAxis: {
      type: 'category',
      data: xData,
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid:{
      top:30,
      left:45,// 调整这个属性
      right:30,
      bottom:30,
    },
    series: [
      {
        type: 'bar',
        data: yData,
        itemStyle:{
          color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#a991f7'
          }, {
            offset: 1,
            color: 'rgba(169, 145, 247,0.3)'
          }]),
        },
        label: {
          show: true,
          position: 'top'
        }
      }
    ]
  }
}