import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'

const app = createApp(App)

import BaseChart from './components/BaseChart.vue'
import BaseDropdown from './components/BaseDropdown.vue'
import EmptyData from './components/Empty/EmptyData.vue'
import EmptyOrder from './components/Empty/EmptyOrder.vue'

app.component('BaseChart', BaseChart)
app.component('BaseDropdown', BaseDropdown)
app.component('EmptyData', EmptyData)
app.component('EmptyOrder', EmptyOrder)

app.directive('resize', {
  // 当被绑定的元素挂载到 DOM 中时……
  mounted(el, binding) {
   function debounce(fn, delay = 16) {
     let t = null
     return function () {
       if (t) {clearTimeout(t)}
       const context = this
       const args = arguments
       t = setTimeout(function() {
         fn.apply(context, args)
       }, delay)
     }
   }
   el._resizer = new window.ResizeObserver(debounce(binding.value, Number(binding.arg) || 16))
   el._resizer.observe(el)
  },
  unmounted(el) {
    el._resizer.disconnect()
  }
})

app.use(router)
app.mount('#app')
