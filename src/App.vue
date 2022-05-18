<template>
  <div class="text-base cursor-default">
    <router-view />
  </div>
</template>

<style>
input, button, select, textarea {
  outline: none !important
}
textarea { 
  resize: none !important
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>

