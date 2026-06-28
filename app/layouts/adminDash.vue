<template>
  <div class="flex h-screen bg-[#FDFBF7] font-sans overflow-hidden" dir="rtl">
    <!-- سایدبار همان استایل قبلی -->
    <aside class="w-72 bg-[#A9C4C5] flex flex-col items-center py-8 shadow-xl z-10">
      <div class="text-center mb-10">
        <div class="w-24 h-24 bg-gray-300 rounded-full mb-3 border-4 border-white shadow-md"></div>
        <h2 class="font-bold text-[#0F184B]">ثمین زارعی</h2>
      </div>
      
      <!-- Slot برای دکمه‌های ناوبری یا منوی اختصاصی -->
      <slot name="sidebar" />
    </aside>

    <!-- محتوای اصلی -->
    <main class="flex-1 bg-[#ebebeb] rounded-l-[40px] p-10 mr-[-20px] z-0 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>