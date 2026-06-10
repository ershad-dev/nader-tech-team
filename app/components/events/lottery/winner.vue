<template>
  <div class="min-h-screen bg-[#9ED8A7] flex justify-center items-center p-4 -mt[100px]" dir="rtl">
    
    <div class="max-w-md w-full text-center">
      
      <div class="overflow-hidden absolute inset-0 w-full h-[232px] object-cover ">
        <img src="/images/kaghaz.jpg" class="w-full h-full object-cover" alt="پس‌زمینه" />
        
        <img src="/images/trophy.png" class="absolute inset-0 m-auto w-[200px] h-[200px] z-10" alt="کاپ برنده" />
      </div>
      
      <h1 class="text-3xl font-bold text-white mb-2 mt-[150px]">تبریک!</h1>
      <p class="text-white text-lg mb-8">شما برنده قرعه‌کشی هستید</p>

      <div class="bg-white rounded-[2rem] p-8 shadow-xl">
        <h2 class="text-[#2D7A6F] font-bold text-xl mb-6">شما برنده شدید</h2>
        
        <div class="space-y-6 text-right">
          <div class="border-b border-gray-100 pb-2">
            <p class="text-gray-400 text-xs mb-1">کد قرعه‌کشی</p>
            <p class="font-bold text-gray-800">X7M9K2P4R8T1Q6</p>
          </div>
          <div class="border-b border-gray-100 pb-2">
            <p class="text-gray-400 text-xs mb-1">نام و نام خانوادگی</p>
            <p class="font-bold text-gray-800">علی علوی</p>
          </div>
          <div>
            <p class="text-gray-400 text-xs mb-1">جایزه</p>
            <p class="font-bold text-gray-800">سفر به مشهد</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// وارد کردن کتابخانه افکت جشن (Confetti)
import confetti from 'canvas-confetti'

// اجرای خودکار افکت در لحظه لود شدن کامپوننت
onMounted(() => {
  // تنظیمات مربوط به ذرات کاغذ رنگی
  confetti({
    particleCount: 150,                       // تعداد ذرات
    spread: 70,                               // میزان پراکندگی
    origin: { y: 0.6 },                       // موقعیت شروع انیمیشن
    colors: ['#ffffff', '#2D7A6F', '#FFD700'] // پالت رنگی اختصاصی
  })
})
</script>