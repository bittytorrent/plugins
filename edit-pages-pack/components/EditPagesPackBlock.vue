<template>
  <section class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
    <h2 class="text-lg font-bold text-gray-900">{{ title }}</h2>
    <p class="text-sm text-gray-600 mt-1">
      Injecté via le hook <strong>{{ hookName }}</strong
      >.
    </p>
    <p class="text-xs text-gray-400 mt-2 font-mono truncate">
      {{ route.path }}
    </p>
  </section>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
    hookName: string
  }>()

  const route = useRoute()
</script>
