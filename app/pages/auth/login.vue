<!-- pages/auth/login.vue -->
<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4 dir-rtl">
    <!-- نوکست به صورت خودکار پوشه components/auth را اسکن کرده و این تگ را می‌شناسد -->
    <AuthLoginForm />
  </div>
</template>

<script setup>
//middleware
definePageMeta({
  middleware: 'auth'
})
</script>