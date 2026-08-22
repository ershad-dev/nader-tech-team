<template>
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="30" height="30" rx="15" :stroke="strokeColor" stroke-width="2"/>
    <path d="M9.25 21.75L21.75 9.25M21.75 18.625V9.25H12.375" :stroke="strokeColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script setup>
const colorMode = useColorMode();
const strokeColor = computed(() => (colorMode.value === 'dark' ? '#E9F1F2' : '#747893'));
</script>