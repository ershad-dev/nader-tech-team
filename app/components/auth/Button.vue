<script setup>
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
  <button
    :type="type"
    :disabled="disabled"
    class="w-full h-[57px] bg-[#2C7379] text-white rounded-[30px] font-bold hover:bg-[#245450] transition disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <slot />
  </button>
</template>