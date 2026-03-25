<template>
  <div class="space-y-4">
    <p class="text-sm text-gray-700 mb-4">
      Raccourcis de navigation injectés par plugin.
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <a
        v-for="link in links"
        :key="link.url"
        :href="link.url"
        class="block bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50"
      >
        <p class="font-semibold text-gray-900">{{ link.label }}</p>
        <p class="text-xs text-gray-500">{{ link.url }}</p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  const links = [
    { label: "Accueil", url: "/" },
    { label: "Torrents", url: "/torrents" },
    { label: "Upload", url: "/upload" },
    { label: "Statistiques", url: "/stats" },
  ]
</script>
