<template>
  <button 
    @click="$emit('click')" 
    class="p-3 hover:bg-gray-100 rounded-full transition-all duration-300 flex items-center justify-center"
  >
    <svg v-if="direction === 'right'" version="1.0" xmlns="http://www.w3.org/2000/svg"
         width="41" height="34" viewBox="0 0 41 34" fill="currentColor">
              <g transform="translate(0.000000,34.000000) scale(0.100000,-0.100000)">
        <path d="M70 225 c-55 -41 -57 -51 -13 -91 47 -43 86 -44 91 -1 3 24 7 27 42 27 54 0 60 18 8 22 -37 3 -43 6 -47 28 -6 46 -32 51 -81 15z m62 -46 c1 -28 -2 -55 -8 -60 -10 -8 -84 36 -84 52 0 11 60 59 75 59 9 0 14 -17 17 -51z"/>
      </g>


    </svg>

    <svg v-else version="1.0" xmlns="http://www.w3.org/2000/svg"
         width="41" height="34" viewBox="0 0 41 34" fill="currentColor">
      <g transform="translate(0.000000,34.000000) scale(0.100000,-0.100000)">
        <path d="M262 238 c-7 -7 -12 -22 -12 -35 0 -21 -5 -23 -46 -23 -27 0 -43 -4 -39 -10 3 -5 24 -10 45 -10 35 0 39 -3 42 -27 5 -41 43 -42 91 -3 20 17 37 38 37 45 0 16 -72 75 -92 75 -8 0 -19 -5 -26 -12z m65 -30 c18 -13 33 -28 33 -34 0 -14 -71 -65 -82 -58 -13 8 -10 114 4 114 6 0 27 -10 45 -22z"/>
      </g>
    </svg>
  </button>
</template>

<script setup>
defineProps({
  direction: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value)
  }
});
defineEmits(['click']);
</script>