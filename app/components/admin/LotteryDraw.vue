<template>
  <div class="min-h-screen bg-[url('/images/bg-lottery.png')] bg-cover bg-center bg-no-repeat bg-fixed] text-white flex flex-col  p-8 transition-colors duration-700" dir="rtl">
    
    <div v-if="!showResults" class="grid grid-cols-[repeat(6,max-content)] justify-center gap-4 mb-10" dir="ltr">
  <div v-for="i in 36" :key="i" class="circle-cut w-[126px] h-[106px] rounded-[20px] bg-gradient-to-br from-white/35 via-[#6EA8FF]/25 to-[#1E40AF]/70 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(30,64,175,0.35)] flex items-center justify-center text-white font-bold text-[36px]">
    {{ i }}
  </div>
</div>

    <LotteryResults v-else />

    <div v-if="!showResults" class="flex flex-col items-center gap-4">
      <button class="w-[478px] bg-white text-[#3949ab] px-10 py-3 rounded-full font-bold shadow-xl flex items-center justify-center gap-2">
        <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 4v16m8-8H4"
      />
    </svg>
        <span>شروع قرعه‌کشی</span>
      </button>

      <button 
        @click="showResults = true"
        class="w-[283px] bg-[#7e57c2] text-white px-10 py-3 rounded-full font-bold shadow-xl flex items-center justify-center gap-2"
      >
      <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
        <span>نتایج قرعه‌کشی</span>
      </button>
    </div>
  </div>
</template>




<script setup>
import { ref, defineAsyncComponent } from 'vue';
// وارد کردن کامپوننت نتایج که قبلاً ساختیم
const LotteryResults = defineAsyncComponent(() => import('./LotteryResults.vue'));

const showResults = ref(false);

import { inject, onMounted, onUnmounted } from 'vue'

const setGalaxyTheme = inject('setGalaxyTheme')

onMounted(() => {
  setGalaxyTheme(true)
})

onUnmounted(() => {
  setGalaxyTheme(false)
})
</script>


<style scoped> 

/* HTML: <div class="circle-cut"></div> */
.circle-cut {
  --r: 13px; /* cut size */
  height: 90px;
  width: 100px;
  mask: radial-gradient(var(--r) at var(--r),#0000 calc(100% - 1px),#000) calc(-1*var(--r));
}

</style>