<template>
  <div v-if="$route.meta['breadcrumb']" class="flex items-center">
    <div 
      v-for="(item, index) in $route.meta['breadcrumb']" 
      :key="index"
      class="flex items-center"
    >
      <div
        :class="$route.meta['breadcrumb']['length'] - index === 1 ? 'cursor-default text-2xl font-bold -mt-1' : 'cursor-pointer hover:font-bold hover:underline hover:text-primary-focus'"
        @click="$router.push(item['url'])"
      >
        {{ item['text'] }}
      </div>
      <div v-if="index < $route.meta['breadcrumb']['length'] - 1" class="mx-2">></div>
    </div>
  </div>
</template>