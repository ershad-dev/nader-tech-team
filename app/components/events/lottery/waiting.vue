<template>
  <div class="min-h-screen bg-[#F9F7F2] flex justify-center items-center p-4" dir="rtl">
    
    <!-- محدود کردن عرض با max-w-sm برای حفظ تناسب در دسکتاپ -->
    <RaffleCard class="w-full max-w-sm bg-white p-6 md:p-8 rounded-3xl shadow-xl">
      
      <!-- تصویر ساعت شنی با سایز منعطف -->
      <div class="flex justify-center mb-8 md:mb-12">
        <div class="animate-spin-slow w-48 h-48 md:w-[310px] md:h-[310px]">
          <img src="/images/hourglass.png" alt="در انتظار قرعه‌کشی" class="w-full h-full object-contain" />
        </div>
      </div>

      <!-- باکس وضعیت -->
      <div class="bg-[#ebebeb] rounded-3xl p-6 md:p-8 text-center shadow-sm border border-gray-200">
        <p class="text-gray-500 text-sm mb-2">وضعیت شما</p>
        <h2 class="text-xl md:text-2xl font-bold text-[#2D7A6F] mb-4">در انتظار قرعه‌کشی</h2>
        <p class="text-gray-500 text-sm md:text-base leading-relaxed">
          لطفاً منتظر بمانید<br>
          قرعه‌کشی به زودی آغاز می‌شود
        </p>
      </div>

    </RaffleCard>
  </div>
</template>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 5s linear infinite;
}
</style>