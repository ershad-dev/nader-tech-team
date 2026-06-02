<!-- pages/profile/edit.vue -->
<template>
  <div class="p-6">
    <h1 class="text-2xl text-white">صفحه ویرایش اطلاعات</h1>
    <!-- اینجا در آینده کامپوننت EditProfileForm را صدا می‌زنیم -->
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: 'profile' // یا هر لی‌اوتی که استفاده می‌کنی
})
</script>