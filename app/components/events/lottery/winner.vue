<template>
  <div class="min-h-screen bg-[#9ED8A7] flex justify-center items-center p-4" dir="rtl">
    
    <div class="w-full max-w-md">
      
      <!-- بخش هدر که تصویر و کاپ در آن قرار دارند -->
      <div class="relative w-full h-[250px] flex justify-center items-center mb-6">
        <img src="/images/kaghaz.jpg" class="absolute w-full h-full object-cover rounded-3xl" alt="پس‌زمینه" />
        <img src="/images/trophy.png" class="relative z-10 w-32 h-32 md:w-40 md:h-40 object-contain" alt="کاپ برنده" />
      </div>
      
      <!-- متن تبریک -->
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-white mb-2">تبریک!</h1>
        <p class="text-white text-[20px] fon-700">شما برنده قرعه‌کشی هستید</p>
      </div>

      <!-- کارت سفید مشخصات -->
      <div class="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl">
        <h2 class="text-[#1A5715] font-bold text-xl mb-6 text-center"> شما برنده شدید</h2>
        
        <div class="space-y-6">
          <div class="border-b border-gray-300 pb-2">
            <p class="text-gray-400 text-[14px] mb-1 font-roboto">کد قرعه‌کشی</p>
            <p class="font-bold text-gray-800 break-all">X7M9K2P4R8T1Q6</p>
          </div>
          <div class="border-b border-gray-300 pb-2">
            <p class="text-gray-400 text-[14px] mb-1 font-roboto ">نام و نام خانوادگی</p>
            <p class="font-bold text-gray-800">علی علوی</p>
          </div>
          <div>
            <p class="text-gray-400 text-[14px] mb-1 font-roboto">جایزه</p>
            <p class="font-bold text-gray-800">سفر به مشهد</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import confetti from 'canvas-confetti';

onMounted(() => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ffffff', '#2D7A6F', '#FFD700']
  });
});
</script>