<script setup>
// پراپ‌های نوع و غیرفعال بودن دکمه
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <!-- دکمه عمومی قابل استفاده مجدد -->
  <button
    :type="type"
    :disabled="disabled"
    class="w-full h-[57px] bg-[#2C7379] dark:bg-dark-accent text-white dark:text-dark-text-deep rounded-[30px] font-bold hover:bg-[#245450] dark:hover:bg-dark-accent-hover transition disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <slot />
  </button>
</template>