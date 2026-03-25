<template>
  <div class="space-y-4">
    <p class="text-sm text-gray-700 mb-4">
      Historique des derniers événements admin collectés par les hooks.
    </p>

    <div
      v-if="events.length === 0"
      class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-600 text-sm"
    >
      Aucun événement admin pour le moment.
    </div>

    <ul v-else class="space-y-2">
      <li
        v-for="event in events"
        :key="event"
        class="bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-2 text-sm text-gray-700 hover:shadow-md transition-shadow font-mono text-xs"
      >
        {{ event }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const events = ref<string[]>([])

  onMounted(() => {
    const raw = localStorage.getItem("administration-hooks.events")
    events.value = raw ? (JSON.parse(raw) as string[]) : []
  })
</script>
