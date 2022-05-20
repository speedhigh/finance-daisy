<template>
  <header class="flex items-center py-4">
    <!-- 面包屑 -->
    <layout-bredcrumb />
    <!-- 搜索框 -->
    <div class="w-[400px] h-10 border rounded-full border-gray-300 bg-white ml-20 flex items-center px-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input type="text" class="ml-4 w-full h-full text-sm" placeholder="请输入您要索的订单信息">
    </div>
    <div class="ml-auto flex items-center space-x-8">
      <!-- music -->
      <div class="dropdown dropdown-end dropdown-hover">
        <div 
          class="w-12 h-12 rounded-full bg-gray-50 cursor-pointer text-center p-2.5 hover:text-secondary"
          :class="{'text-secondary shadow-pink-200 shadow-lg': isP}"
        >
          <svg tabindex="0" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer inline-block" viewBox="0 0 20 20" fill="currentColor">
            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
          </svg>
        </div>
        <div tabindex="0" class="dropdown-content card card-compact w-64 p-2 shadow-xl shadow-pink-100 bg-[rgba(255,255,255,0.5)] backdrop-blur text-primary-content">
          <AudioPlayer
            ref="audioRef"
            autoplay="autoplay"
            :option="{
              src: '/src/assets/music/岸部眞明 - The End of the World.mp3',
              title: 'The End of the World',
              coverImage: 'https://api.lorem.space/image/album?w=100&h=100',
              progressBarColor:'#F000B8',
              indicatorColor: '#F000B8'
            }"
            @play="audioPlay"
            @pause="audioPause"
          />
        </div>
      </div>
      <!-- avatar -->
      <div class="flex-shrink-0 dropdown dropdown-hover dropdown-end">
        <div 
          tabindex="0" 
          class="flex items-center cursor-pointer py-2 pl-3 pr-3 rounded-lg bg-gray-50 shadow-md hover:rounded-b-none hover:rounded-t-box hover:shadow-xl"
        >
          <div class="avatar online">
            <div class="w-10 rounded-full">
              <img src="https://api.lorem.space/image/face?hash=28212" />
            </div>
          </div>
          <div class="ml-3 space-y-0.5 w-20">
            <p class="text-sm font-bold line-1">财务</p>
            <p class="text-xs line-1 opacity-60">财务-收纳</p>
          </div>
          <div class="ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <ul tabindex="0" class="dropdown-content menu p-1 shadow-xl bg-gray-50 rounded-b-box w-48 text-sm">
          <li>
            <a @click="$router.push('/withdraw/todo')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>待办信息
          </a>
        </li>
          <li>
            <a @click="quit">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
              </svg>退出登录
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import LayoutBredcrumb from './LayoutBredcrumb.vue'
import Dialog from '/src/components/Dialog/Dialog.js'
import Message from '/src/components/Message/Message.js'
import AudioPlayer from 'vue3-audio-player'
import 'vue3-audio-player/dist/style.css'
import { computed } from '@vue/reactivity'
export default {
  components: {
    LayoutBredcrumb,
    AudioPlayer
  },
  setup() {
    const audioRef = ref()
    // const play = function() {
    //   audioRef.value.play()
    // }
    const isP = ref(0)
    onMounted(() => {
      audioRef.value.audioPlayer.autoplay = 'autoplay'
      audioRef.value.audioPlayer.loop = true
      // play()
    })
    const router = useRouter()
    return {
      audioRef,
      // play,
      isP,
      quit() {
        Dialog({ text: '您确定要退出登录吗？' }).then(() => {
          sessionStorage.removeItem('token')
          router.replace('/login')
          Message({ text: '您已成功退出登录', type: 'success' })
        })
      },
      audioPlay() {
        console.log('play---')
        isP.value = 1
        return
      },
      audioPause() {
        console.log('audioPause------')
        isP.value = 0
        return
      }
    }
  }
}
</script>

<style>
.audio__player-play {
  @apply cursor-pointer
}
</style>