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
      left:55,// 调整这个属性
      right:30,
      bottom:30,
    },
    series: [
      {
        type: 'line',
        smooth: true,
        data: yData,
        itemStyle:{
          color: '#F000B8'
        },
        label: {
          show: true,
          position: 'top',
          valueAnimation: true
        }
      }
    ]
  }
}