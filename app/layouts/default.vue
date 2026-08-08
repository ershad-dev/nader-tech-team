<template>
  <div class="min-h-screen flex flex-col bg-[#F8F5F0] dark:bg-dark-bg transition-colors duration-300">
    <CommonNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <CommonFooterMain 
      :title="footerConfig.title" 
      :title1="footerConfig.title1"
    />
  </div>
</template>

<script setup>
const footerConfig = useState('footerConfig', () => ({
  title: 'یک ایده، یک تیم، یک اثر',
  title1: ''
}));

const scrollbarConfig = useScrollbarConfig();

if (import.meta.client) {
  watch(
    scrollbarConfig,
    (config) => {
      const root = document.documentElement;
      if (config.light) {
        root.style.setProperty('--scrollbar-thumb', config.light);
      } else {
        root.style.removeProperty('--scrollbar-thumb');
      }
    },
    { immediate: true, deep: true }
  );
}
</script>