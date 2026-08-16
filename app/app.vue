<!-- app.vue -->
<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
// این خط باعث می‌شود با هر رفرش، پینیا چک کند آیا توکن در کوکی هست یا نه
authStore.checkPersistedAuth()

const head = useLocaleHead()
</script>