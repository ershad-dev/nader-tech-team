<script setup>
import { ref } from 'vue';
import LotteryDraw from './LotteryDraw.vue'; // فرض بر این است که فایل LotteryDraw.vue در همین مسیر است

// این متغیر مشخص می‌کند که آیا صفحه برگزاری قرعه‌کشی باید نمایش داده شود یا خیر
const showLotteryPage = ref(false);
</script>

<template>
  <div v-if="!showLotteryPage" class="max-w-[1000px] mx-auto p-8" dir="rtl">
    
    <div class="bg-white text-center py-4 rounded-2xl mb-8 font-bold text-[#1a2333] shadow-sm">
      اطلاعات قرعه‌کشی
    </div>

    <div class="bg-[#F5F3ED] rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
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

    <div class="mt-8 flex justify-center">
      <button 
        @click="showLotteryPage = true" 
        class="bg-[#286463] text-white px-12 py-3 rounded-xl font-bold hover:bg-[#1e4a49] transition shadow-lg cursor-pointer"
      >
        برگزاری قرعه‌کشی
      </button>
    </div>
  </div>

  <LotteryDraw v-else />
</template>