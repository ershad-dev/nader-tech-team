<template>
  <div class="min-h-screen bg-[#F9F7F2] flex justify-center items-center p-4" dir="rtl">
    <RaffleCard>
      
      <div class="flex justify-center mb-12">
        <div class="animate-spin-slow">
          <img src="/images/hourglass.png" alt="در انتظار قرعه‌کشی" class="w-[310px] h-[310px] object-contain" />
        </div>
      </div>

      <div class="bg-[#ebebeb] rounded-3xl p-8 text-center shadow-sm border border-gray-200">
        <p class="text-gray-500 text-sm mb-4">وضعیت شما</p>
        <h2 class="text-2xl font-bold text-[#2D7A6F] mb-4">در انتظار قرعه‌کشی</h2>
        <p class="text-gray-500 text-sm leading-relaxed">
          لطفاً منتظر بمانید<br>
          قرعه‌کشی به زودی آغاز می‌شود
        </p>
      </div>

    </RaffleCard>
  </div>
</template>

<style scoped>
/* تعریف انیمیشن چرخش برای ساعت شنی */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* اعمال انیمیشن به مدت ۵ ثانیه به صورت دورانی و بی‌نهایت */
.animate-spin-slow {
  animation: spin-slow 5s linear infinite;
}
</style>