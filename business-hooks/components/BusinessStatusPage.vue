<template>
  <div class="space-y-4">
    <p class="text-sm text-gray-700 mb-4">
      Indicateurs métier collectés par les hooks utilisateurs et torrents.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="item in metrics"
        :key="item.label"
        class="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
      >
        <p class="text-xs font-medium text-gray-500 mb-2">{{ item.label }}</p>
        <p class="text-base font-semibold text-indigo-600 break-all">
          {{ item.value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const uploads = ref("0")
  const downloads = ref("0")
  const logins = ref("-")
  const lastUpload = ref("-")

  const metrics = computed(() => [
    { label: "Uploads validés", value: uploads.value },
    { label: "Téléchargements lancés", value: downloads.value },
    { label: "Dernière connexion", value: logins.value },
    { label: "Dernier torrent uploadé", value: lastUpload.value },
  ])

  onMounted(() => {
    uploads.value = localStorage.getItem("business-hooks.upload-count") ?? "0"
    downloads.value =
      localStorage.getItem("business-hooks.download-count") ?? "0"
    logins.value = localStorage.getItem("business-hooks.last-login") ?? "-"
    lastUpload.value =
      localStorage.getItem("business-hooks.last-upload-name") ?? "-"
  })
</script>
