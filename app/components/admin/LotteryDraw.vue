<template>
  <div class="min-h-screen bg-[#0f0c29] text-white flex flex-col items-center justify-center p-8 transition-colors duration-700" dir="rtl">
    
    <div class="grid grid-cols-6 gap-4 mb-10">
      <div v-for="i in 36" :key="i" 
           class="circle-cut w-16 h-16 bg-gradient-to-b from-[#ffffff]/50 to-[#3768B6]/50 rounded-[20px] flex items-center justify-center font-bold text-[20px] shadow-lg border border-white/10">
        {{ i }}
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <button class="bg-white text-[#3949ab] px-10 py-3 rounded-full font-bold shadow-xl">
        شروع قرعه‌کشی
      </button>
      <button class="bg-[#7e57c2] text-white px-10 py-3 rounded-full font-bold shadow-xl flex items-center gap-2">
        <span>👁</span> نتایج قرعه‌کشی
      </button>
    </div>
  </div>
</template>
<style scoped> 

/* HTML: <div class="circle-cut"></div> */
.circle-cut {
  --r: 20px; /* cut size */
  height: 106px;
  width: 126px;
  background-color: #3768B6;
  mask: radial-gradient(var(--r) at var(--r),#0000 calc(100% - 1px),#000) calc(-1*var(--r));
}

</style>