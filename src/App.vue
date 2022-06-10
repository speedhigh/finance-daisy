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
  @apply h-3 rounded-b-md bg-indigo-50
}
::-webkit-scrollbar-thumb {
  @apply bg-indigo-300 rounded cursor-pointer hover:bg-indigo-400
}
::-webkit-scrollbar:vertical {
  @apply hidden
}
</style>

