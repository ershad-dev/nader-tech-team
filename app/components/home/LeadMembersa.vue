<template>
  <div class="max-w-6xl mx-auto -mt-20 relative z-30 px-4 mt-10">
    
    <div 
      class="relative rounded-[3rem] p-8 shadow-2xl overflow-hidden bg-cover bg-center"
      style="background-image: url('/images/Subtract.png');" 
    >
      <div class="absolute inset-0 "></div>

      <div class="relative z-10">
        
        <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-white p-2 rounded-full shadow-md">
          <svg class="w-4 h-7 text-[#2D7A6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
          <div 
            v-for="i in 4" 
            :key="i" 
            class="bg-white rounded-3xl p-4 flex flex-col items-center shadow-lg hover:shadow-xl transition-all"
          >
            <div class="w-20 h-20 bg-slate-100 rounded-full mb-4 flex items-center justify-center ">
              <svg class="w-10 h-10 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <p class="text-slate-800 font-bold text-sm">مشخصات شخص</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 text-center px-4 md:px-16">
      <p class="text-slate-700 leading-relaxed text-sm md:text-base font-medium">
        تیم ما متشکل از متخصصان باتجربه در حوزه طراحی سایت، تولید محتوا و برگزاری رویدادها است. با تمرکز بر کیفیت، خلاقیت و ارائه راهکارهای مؤثر، تلاش می‌کنیم بهترین نتیجه را برای مشتریان خود رقم بزنیم. همکاری تیمی، نوآوری و توجه به جزئیات از مهم‌ترین ارزش‌های ما هستند.
      </p>
    </div>
  </div>
</template>