<template>
  <!-- کانتینر اصلی با تراز بندی بالا و راست -->
  <section class="relative w-full md:w-[1110px] min-[1920px]:w-[1400px] max-w-full mx-auto h-[420px] sm:h-[480px] md:h-[629px] min-[1920px]:h-[700px] rounded-[12px] sm:rounded-[17px] min-[1920px]:rounded-[20px] overflow-hidden flex flex-col justify-between p-6 sm:p-8 md:p-12 min-[1920px]:p-16 mt-[50px] sm:mt-[60px] md:mt-[75px] min-[1920px]:mt-[90px]">
    
    <!-- تصویر پس‌زمینه -->
    <img src="/images/lottery-bg.png" alt="قرعه کشی" class="absolute inset-0 w-full h-full object-cover" />
    
    <!-- لایه تیره برای خوانایی بهتر -->
    <div class="absolute inset-0 bg-white/10"></div>

    <!-- بخش متن‌ها (بالا سمت راست) -->
    <div class="relative z-10 text-white text-right">
      <h2 class="text-[24px] sm:text-[28px] md:text-[36px] min-[1920px]:text-[42px] font-bold mb-2">قرعه‌کشی ایونت</h2>
      <p class="text-[16px] sm:text-[20px] md:text-[24px] min-[1920px]:text-[28px] font-normal opacity-90 font-roboto mt-[10px] sm:mt-[15px] md:mt-[20px] min-[1920px]:mt-[24px]">توضیحات قرعه‌کشی</p>
    </div>

    <!-- بخش دکمه‌ها (پایین و وسط‌چین) -->
    <div class="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 min-[1920px]:gap-6 self-center w-full sm:w-auto items-center">
      <NuxtLink to="/events/lottery/register" class="w-full sm:w-auto">
        <button class="bg-white/90 text-[#333B6A] px-6 sm:px-8 py-3 rounded-[12px] sm:rounded-[17px] min-[1920px]:rounded-[20px] text-[16px] sm:text-[20px] md:text-[24px] min-[1920px]:text-[26px] font-bold hover:bg-white transition w-full sm:w-[260px] md:w-[313px] min-[1920px]:w-[350px] h-[52px] sm:h-[62px] md:h-[75px] min-[1920px]:h-[84px]">
          ثبت‌نام در قرعه‌کشی
        </button>
      </NuxtLink>

      <NuxtLink to="/events/lottery/login" class="w-full sm:w-auto">
        <button class="bg-white/90 text-[#333B6A] px-6 sm:px-8 py-3 rounded-[12px] sm:rounded-[17px] min-[1920px]:rounded-[20px] text-[16px] sm:text-[20px] md:text-[24px] min-[1920px]:text-[26px] font-bold hover:bg-white transition w-full sm:w-[260px] md:w-[313px] min-[1920px]:w-[350px] h-[52px] sm:h-[62px] md:h-[75px] min-[1920px]:h-[84px]">
          ورود به ایونت
        </button>
      </NuxtLink>
    </div>

  </section>
</template>