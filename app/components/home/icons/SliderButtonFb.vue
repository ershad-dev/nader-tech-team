<template>
  <button 
    @click="$emit('click')" 
    class="w-[40px] h-[40px] flex items-center justify-center "
  >
    <img 
      :src="direction === 'left' ? '/images/arrow-right.png' : '/images/left-arrow.png'" 
      :alt="direction"
      class="w-[40px] h-[33px] -gap-[7px]"
    />
  </button>
</template>

<script setup>
defineProps({
  direction: {
    type: String,
    required: true,
    validator: (value) => ['left', 'right'].includes(value)
  }
});

defineEmits(['click']);
</script>