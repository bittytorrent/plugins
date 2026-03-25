<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
    <p class="text-sm font-semibold text-indigo-600 mb-2">{{ title }}</p>
    <p class="text-sm text-gray-700">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
    message: string
  }>()
</script>
