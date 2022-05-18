import {
  createVNode,
  render
} from "vue"

import dialog from './Dialog.vue'

// 创建一个dom节点
const div = document.createElement('div')
div.setAttribute('class', 'dialog-container')
// 挂载到body就可以在最顶层直接控制显示隐藏
document.body.appendChild(div)

export default ({
  title,
  text
}) => {
  /**
   * dialog有两种状态, 确认和取消
   *  确认: 返回reslove(), 给dialog组件添加确认时方法
   *  取消: reject()
   */
  return new Promise((reslove, reject) => {
  
    // 封装组件属性方法
    const submitCallback = () => {
      //调用完毕后应该清空节点
      render(null, div)
      reslove()
    }

    // 封装组件属性方法
    const cancelCallback = () => {
      //清空节点
      render(null, div)
      reject()
    }

    // 在此处才创建节点并挂载属性
    const VNode = createVNode(dialog, {
      title,
      text,
      submitCallback,
      cancelCallback
    })

    // 渲染节点到指定dom 
    render(VNode, div)
  })
}