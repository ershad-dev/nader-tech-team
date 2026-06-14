<script setup>
// استفاده از لاوت auth که در پوشه layouts داری
definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <!-- فراخوانی کامپوننتِ لاگین ادمین -->
  <AdminLogin />
</template>