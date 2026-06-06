<!-- app.vue -->
<template>
  <div dir="rtl">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<!-- app.vue -->
<script setup>
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

// این خط باعث می‌شود با هر رفرش، پینیا چک کند آیا توکن در کوکی هست یا نه
authStore.checkPersistedAuth()
</script>