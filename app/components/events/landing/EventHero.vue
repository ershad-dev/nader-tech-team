<template>
<div class="relative w-full h-[700px] overflow-hidden -mt-[67px]">
    
    <img 
      src="/images/eventheader.jpg" 
      alt="Event" 
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- لایه شیشه‌ای پایین  -->
    <div class="absolute bottom-0 w-full h-40 bg-white/10 backdrop-blur-md flex items-center justify-center border-t border-white/20">
      <p class="text-white text-xl font-medium shadow-sm">
        از ایده‌پردازی تا اجرای نهایی، تمام مراحل رویداد را به‌صورت حرفه‌ای مدیریت می‌کنیم.
      </p>
    </div>

    <!-- هلال پایین (به همراه خط داخل آن) -->
    <div 
      class="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-[#F5F3EF] rounded-t-full flex items-center justify-center"
      style="clip-path: ellipse(100% 100% at 50% 100%);"
    >
      <!-- خط عمودی داخل هلال -->
      <div class="w-[2px] h-6 bg-gray-400 mt-2"></div>
    </div>
  </div>
</template>

