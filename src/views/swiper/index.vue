<template>
  <div class="carousel w-full" @mouseenter="stop" @mouseleave="autoPlayFn">
    <div v-for="(item, index) in list" :key="item.id" :id="'item' + (index + 1)" class="carousel-item w-full">
      <img :src="item.img" class="w-full" />
    </div>
  </div>
  <div class="flex justify-center w-full py-2 gap-2">
    <div v-for="i in list.length" class="btn btn-xs" @click.prevent="anchor(i)">{{ i }}</div>
  </div>
  <p class="text-center">{{ active }}</p>
</template>

<script setup>
import { ref, watch } from 'vue'

const active = ref(1)

const list = ref(
  [
    { img: 'https://api.lorem.space/image/car?w=800&h=200&hash=8B7BCDC2' },
    { img: 'https://api.lorem.space/image/car?w=800&h=200&hash=500B67FB' },
    { img: 'https://api.lorem.space/image/car?w=800&h=200&hash=A89D0DE6' },
    { img: 'https://api.lorem.space/image/car?w=800&h=200&hash=225E6693' },
  ]
)

watch(() => active.value, (value) => {
  const anchorElement = document.getElementById('item' + value)
  if (anchorElement) anchorElement.scrollIntoView()
})

watch(() => list.value, (value) => {
  if (value.length > 1) {
    alert('a')
    autoPlayFn()
  }
})

let timer = null

const autoPlayFn = function () {
  timer = setInterval(() => {
    active.value++
    if (active.value > list.value.length) {
      active.value = 1
    }
  }, 2000)
}

autoPlayFn()

const stop = function() {
  if (timer) clearInterval(timer)
}


const anchor = function (index) {
  active.value = index
}
</script>