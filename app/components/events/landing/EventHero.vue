<template>
  <div class="relative w-full h-[380px] sm:h-[500px] md:h-[814px] overflow-hidden -mt-[90px]">
    <!-- تصویر اصلی (تمام عرض) -->
    <img
      src="/images/eventheader.jpg"
      alt="Event"
      class="w-full h-full object-cover"
    />

    <!-- لایه شیشه‌ای پایین (Glassmorphism) -->
    <div class="absolute bottom-0 w-full h-[110px] sm:h-[130px] md:h-[154px] bg-white/20 backdrop-blur-md flex items-center justify-center border-t border-white/20 px-4 sm:px-6 md:px-4">
      <p class="text-white text-[15px] sm:text-[20px] md:text-[32px] font-bold text-center leading-snug sm:leading-normal">
        از ایده‌پردازی تا اجرای نهایی، تمام مراحل رویداد را به‌صورت حرفه‌ای مدیریت می‌کنیم.
      </p>
    </div>

    <!-- هلال پایین (به همراه خط داخل آن) -->
    <!-- <div
      class="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-[#F5F3EF] rounded-t-full flex items-center justify-center"
      style="clip-path: ellipse(100% 100% at 50% 100%);"
    >

    </div> -->
  </div>
</template>

