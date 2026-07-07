<script setup>
import { ref } from 'vue';
import LotteryDraw from './LotteryDraw.vue'; // فرض بر این است که فایل LotteryDraw.vue در همین مسیر است

// این متغیر مشخص می‌کند که آیا صفحه برگزاری قرعه‌کشی باید نمایش داده شود یا خیر
const showLotteryPage = ref(false);
</script>

<template>
  <div v-if="!showLotteryPage" class="max-w-full lg:max-w-[1000px] mx-auto p-4 sm:p-6 lg:p-8" dir="rtl">
    
    <div class="bg-white text-center py-3 lg:py-4 rounded-2xl mb-6 lg:mb-8 font-bold text-[#1a2333] shadow-sm text-sm sm:text-base">
      اطلاعات قرعه‌کشی
    </div>

    <!-- دسکتاپ: جدول اصلی (بدون تغییر) -->
    <div class="hidden lg:block bg-[#F5F3ED] rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
      <table class="w-full text-center">
        <thead class="bg-[#BFCFD3]">
          <tr class="text-[#1a2333] font-bold">
            <th class="py-5">کد کاربری</th>
            <th class="py-5">کد قرعه‌کشی</th>
            <th class="py-5">نام و نام خانوادگی</th>
            <th class="py-5">شماره موبایل</th>
            <th class="py-5">وضعیت حضور</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr v-for="i in 8" :key="i" class="border-b border-gray-200 last:border-none">
            <td class="py-6">{{ i }}</td>
            <td class="py-6">X7M9K2P4R8T1Q6</td>
            <td class="py-6">ثمین زارعی</td>
            <td class="py-6">0945123987445</td>
            <td class="py-6 flex justify-center">
              <span v-if="i !== 3 && i !== 5" class="text-green-500 text-2xl">✅</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- موبایل و تبلت: کارت‌های عمودی -->
    <div class="lg:hidden flex flex-col gap-3 sm:gap-4">
      <div
        v-for="i in 8"
        :key="i"
        class="bg-[#F5F3ED] rounded-2xl border border-gray-200 shadow-sm p-4"
      >
        <div class="flex justify-between items-center py-1.5 border-b border-gray-200">
          <span class="text-xs text-gray-500 font-bold">کد کاربری</span>
          <span class="text-sm text-gray-700">{{ i }}</span>
        </div>
        <div class="flex justify-between items-center py-1.5 border-b border-gray-200">
          <span class="text-xs text-gray-500 font-bold">کد قرعه‌کشی</span>
          <span class="text-sm text-gray-700 break-all">X7M9K2P4R8T1Q6</span>
        </div>
        <div class="flex justify-between items-center py-1.5 border-b border-gray-200">
          <span class="text-xs text-gray-500 font-bold">نام و نام خانوادگی</span>
          <span class="text-sm text-gray-700">ثمین زارعی</span>
        </div>
        <div class="flex justify-between items-center py-1.5 border-b border-gray-200">
          <span class="text-xs text-gray-500 font-bold">شماره موبایل</span>
          <span class="text-sm text-gray-700" dir="ltr">0945123987445</span>
        </div>
        <div class="flex justify-between items-center py-1.5">
          <span class="text-xs text-gray-500 font-bold">وضعیت حضور</span>
          <span v-if="i !== 3 && i !== 5" class="text-green-500 text-xl">✅</span>
          <span v-else class="text-gray-300 text-xl">—</span>
        </div>
      </div>
    </div>

    <div class="mt-6 lg:mt-8 flex justify-center">
      <button 
        @click="showLotteryPage = true" 
        class="bg-[#286463] text-white px-8 sm:px-10 lg:px-12 py-2.5 sm:py-3 rounded-xl font-bold hover:bg-[#1e4a49] transition shadow-lg cursor-pointer text-sm sm:text-base w-full sm:w-auto"
      >
        برگزاری قرعه‌کشی
      </button>
    </div>
  </div>

  <LotteryDraw v-else />
</template>