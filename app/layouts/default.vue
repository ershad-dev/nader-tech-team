<template>
  <div class="min-h-screen bg-[#F8F5F0]">
    <CommonNavbar />
    <main class="flex-grow">
      <slot />
    </main>
    <CommonFooterMain 
      :title="footerConfig.title" 
      :title1="footerConfig.title1"
    />
  </div>
</template>

<script setup>
// استفاده از یک state برای کنترل فوتر از داخل هر صفحه
const footerConfig = useState('footerConfig', () => ({
  title: 'یک ایده، یک تیم، یک اثر',
  title1: ''
 
}));
</script>