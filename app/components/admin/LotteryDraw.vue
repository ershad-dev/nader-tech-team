<template>
  <!-- لایه بک‌گراند مخصوص موبایل/تبلت: کل صفحه را با dvh می‌گیرد و ثابت می‌ماند -->
  <div
    class="fixed inset-0 w-full h-[100dvh] bg-[url('/images/bg-lottery.png')] bg-cover bg-center bg-no-repeat -z-10 lg:hidden"
  ></div>

  <div
    class="lottery-scroll relative min-h-[100dvh] lg:min-h-screen lg:bg-[url('/images/bg-lottery.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:bg-fixed text-white flex flex-col p-4 sm:p-6 lg:p-8 transition-colors duration-700"
    dir="rtl"
  >
    
    <div
      v-if="!showResults"
      class="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-[repeat(6,max-content)] justify-items-center lg:justify-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 lg:mb-10 w-full lg:w-auto mx-auto"
      dir="ltr"
    >
      <div
        v-for="i in 36"
        :key="i"
        class="circle-cut w-full aspect-[126/106] sm:aspect-[90/76] lg:w-[126px] lg:h-[106px] lg:aspect-auto rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] bg-gradient-to-br from-white/35 via-[#6EA8FF]/25 to-[#1E40AF]/70 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(30,64,175,0.35)] relative"
      >
        <span
          class="absolute inset-0 flex items-center justify-center text-white font-bold text-[16px] sm:text-[22px] lg:text-[36px] leading-none"
        >
          {{ i }}
        </span>
      </div>
    </div>

    <LotteryResults v-else />

    <div v-if="!showResults" class="flex flex-col items-center gap-3 sm:gap-4 px-2 sm:px-0">
      <button class="w-full max-w-[478px] sm:w-[478px] bg-white text-[#3949ab] px-6 sm:px-10 py-3 rounded-full font-bold shadow-xl flex items-center justify-center gap-2 h-[44px] text-sm sm:text-base">
        <span>شروع قرعه‌کشی</span>

<svg width="28" height="28" class="sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_773_1093)">
<path d="M26.668 18.6667L23.6146 21.72L19.7746 17.88L17.8813 19.7733L21.7213 23.6133L18.668 26.6667H26.668V18.6667ZM26.668 13.3333V5.33334H18.668L21.7213 8.38668L15.4546 14.6667H5.33463V17.3333H16.548L23.6146 10.28L26.668 13.3333Z" fill="#0F184B"/>
</g>
<defs>
<clipPath id="clip0_773_1093">
<rect width="32" height="32" fill="white" transform="matrix(0 1 -1 0 32 0)"/>
</clipPath>
</defs>
</svg>
      </button>

      <button 
        @click="showResults = true"
        class="w-full max-w-[283px] sm:w-[283px] h-[44px] bg-[#7e57c2] text-white px-6 sm:px-10 py-3 rounded-full font-bold shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        <span>نتایج قرعه‌کشی</span>

<svg width="28" height="28" class="sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_773_1087)">
<path d="M15.9987 6C9.33203 6 3.6387 10.1467 1.33203 16C3.6387 21.8533 9.33203 26 15.9987 26C22.6654 26 28.3587 21.8533 30.6654 16C28.3587 10.1467 22.6654 6 15.9987 6ZM15.9987 22.6667C12.3187 22.6667 9.33203 19.68 9.33203 16C9.33203 12.32 12.3187 9.33333 15.9987 9.33333C19.6787 9.33333 22.6654 12.32 22.6654 16C22.6654 19.68 19.6787 22.6667 15.9987 22.6667ZM15.9987 12C13.7854 12 11.9987 13.7867 11.9987 16C11.9987 18.2133 13.7854 20 15.9987 20C18.212 20 19.9987 18.2133 19.9987 16C19.9987 13.7867 18.212 12 15.9987 12Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_773_1087">
<rect width="32" height="32" fill="white"/>
</clipPath>
</defs>
</svg>
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

@media (max-width: 1023px) {
  .circle-cut {
    --r: 8px;
    width: 100%;
    height: auto;
  }
}

.lottery-scroll::-webkit-scrollbar {
  width: 10px;
}

.lottery-scroll::-webkit-scrollbar-track {
  background: #0f0c29;
}

.lottery-scroll::-webkit-scrollbar-thumb {
  background: linear-gradient(#67A9A8, #2C7379);
  border-radius: 9999px;
}

.lottery-scroll::-webkit-scrollbar-thumb:hover {
  background: #4d9aa0;
}

.lottery-scroll {
  scrollbar-width: thin;
  scrollbar-color: #67A9A8 #0f0c29;
}


.circle-cut span {
  transform: translateY(2px);
}
</style>