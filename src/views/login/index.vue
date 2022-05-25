<template>
  <section class="min-h-screen flex items-stretch text-white ">
    <div class="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
      style="background-image: url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80);">
      <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div class="w-full px-24 z-10">
        <h1 class="text-5xl font-bold text-left tracking-wide leading-10">欢迎登录</h1>
        <p class="text-3xl my-4 leading-10">Created for financial personnel If you have any questions, please contact the technical department in time</p>
      </div>
    </div>
    <div class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
      style="background-color: #161616;">
      <div class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
        style="background-image: url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80);">
        <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
      </div>
      <div class="w-full py-6 z-20">
        <h1 class="my-6 text-3xl">木子网财务后台</h1>
        <p class="text-xl font-bold py-6 tracking-[0.3em]">LOGIN</p>
        <form action="" class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
          <div class="pb-2 pt-4">
            <input v-model="form.phone" type="text" placeholder="请输入账号" class="block w-full p-4 text-lg rounded-sm bg-black">
          </div>
          <div class="pb-2 pt-4">
            <input v-model="form.password" class="block w-full p-4 text-lg rounded-sm bg-black" type="password" name="password" id="password" autocomplete="on" placeholder="请输入密码">
          </div>
          <div class="text-right text-gray-400 hover:underline hover:text-gray-100 py-1">
            忘记密码请及时联系技术部
          </div>
          <div class="px-4 pb-2 pt-4">
            <button
              :disabled="loginDisabled"
              class="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
              @click="login"
            >
              登 录
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api/index.js'
import Encrypt from '/src/until/crypto.js'
import Message from '/src/components/Message/Message.js'
export default {
  setup() {
    const router = useRouter()
    const form = reactive({
      phone: localStorage.getItem('account') ? localStorage.getItem('account') : '',
      password: ''
    })
    const loginDisabled = ref(false)
    return {
      form,
      loginDisabled,
      login() {
        loginDisabled.value = true
        if(!form.phone || !form.password) {
          Message({ text: '请输入账号或密码' })
          setTimeout(() => { loginDisabled.value = false }, 1000 )
          return
        }
        let postData = {}
        postData = Object.assign(postData, form)
        postData.password = Encrypt.Encrypt(postData.password)
        api.post('/open/login', postData).then((res) => {
          if(res.data.code === 20000) {
            localStorage.setItem('account', form.phone)
            sessionStorage.setItem('token', res.data.data.token)
            sessionStorage.setItem('name', res.data.data.user.realname)
            sessionStorage.setItem('usergroup', res.data.data.user.usergroup)
            Message({ text: '登录成功!', type: 'success' })
            router.push('/')
          } else {
            Message({ text: '登录失败', type: 'error' })
          }
          setTimeout(() => { loginDisabled.value = false }, 1000 )
        })
      }
    }
  }
}
</script>