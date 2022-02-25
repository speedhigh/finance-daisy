<template>
  <div class="hero min-h-screen" style="background-image:url(https://picsum.photos/id/1005/1600/1400)">
    <div class="hero-overlay bg-opacity-60" />
    <div class="text-center hero-content text-neutral-content">
      <div class="max-w-md">
        <div v-show="showHero">
          <h1 class="mb-5 text-5xl font-bold"> 你好呀 </h1> 
          <p class="mb-5">欢迎进入木子网财务后台，有任何问题请及时和技术部联系哦！</p> 
          <button class="btn btn-primary" @click="showHero = false">开始使用</button>
        </div>
        <div v-show="!showHero" class="card w-full shadow-2xl bg-base-100">
          <div class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">账号</span>
              </label> 
              <input
                v-model="form.phone"
                type="text"
                placeholder="请输入账号"
                autocomplete="phone"
                class="input input-bordered text-gray-600" 
              >
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">密码</span>
              </label> 
              <form>
                <input
                  v-model="form.password"
                  type="password"
                  placeholder="请输入密码"
                  autocomplete="current-password"
                  class="input input-bordered text-gray-600"
                > 
              </form>
              <label class="label">
                <p class="label-text-alt text-gray-500">忘记密码请及时联系技术部</p>
              </label>
            </div> 
            <div class="form-control mt-6">
              <input type="button" value="登录" class="btn btn-primary" :disabled="loginDisabled" @click="login">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '../../api/index.js'
import Encrypt from '/src/until/crypto.js'
import Message from '/src/components/Message/Message.js'
export default {
  setup() {
    const showHero = ref(true)
    const router = useRouter()
    const form = reactive({
      phone: localStorage.getItem('account') ? localStorage.getItem('account') : '',
      password: ''
    })
    const loginDisabled = ref(false)
    return {
      showHero,
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