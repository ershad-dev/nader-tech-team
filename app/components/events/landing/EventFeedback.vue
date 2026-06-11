<template>
  <!-- کانتینر اصلی بخش رضایت‌مندی -->
  <section class="max-w-6xl mx-auto py-12 px-4">

    <!-- عنوان بخش -->
    <div class="mb-12 flex flex-col items-center">
      <h2 class="bg-white px-8 py-4 rounded-t-[20px] rounded-b-[4px] shadow-xl border-[0.5px] font-bold text-gray-800 border w-[266px]">
        رضایت از ایونت‌های برگزار شده
      </h2>
    </div>

    <!-- لیست کارت‌های تصاویر -->
    <div class="relative flex flex-col items-center gap-6 mb-6">
      <div class="flex gap-6 overflow-hidden w-full justify-center">
        <!-- حلقه برای نمایش تصاویر نظرات -->
        <div 
          v-for="(item, index) in testimonials" 
          :key="index" 
          :ref="el => { cardRefs[index] = el }" 
          class="relative flex flex-col items-center"
        >
          <img 
            :src="item.image" 
            @click="selectCard(index)"
            :class="[
              'cursor-pointer transition-all duration-300 rounded-[40px] object-cover w-64 h-80',
              // نمایش استایل فعال (Ring) برای کارت انتخاب شده
              selectedIndex === index ? 'opacity-100 ring-4 ring-[#A36C53] ring-inset' : 'opacity-95 hover:opacity-100'
            ]"
          />
        </div>
      </div>
    </div>

    <!-- بخش نمایش متن انتخاب شده (در صورت انتخاب یک کارت) -->
    <div v-if="selectedIndex !== null" class="relative bg-[#ABD7D840] w-full min-h-[496px] rounded-[40px] p-8 mt-12 transition-all duration-500">
      
      <!-- نشانگر زبانه (Indicator) که به سمت کارت انتخاب شده اشاره می‌کند -->
      <div 
        class="absolute -top-[1px] h-10 bg-[#F7F3EB] transition-all duration-500 flex justify-center items-center"
        :style="{ left: indicatorLeft + 'px', width: '120px' }"
        style="border-radius: 0 0 70% 70% / 0 0 100% 100%; transform: translateX(-50%);"
      >
        <img src="/images/arrow-on-team2.png" alt="">
      </div>

      <!-- متن نظرات -->
      <p class="text-gray-700 text-lg leading-relaxed pt-4 text-center">
        {{ testimonials[selectedIndex].text }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, nextTick } from 'vue';

// مدیریت وضعیت انتخاب کارت و رفرنس‌ها
const selectedIndex = ref(null);
const cardRefs = ref([]);        // نگهداری ارجاع به هر کارت برای محاسبه موقعیت
const indicatorLeft = ref(0);    // محاسبه موقعیت افقی نشانگر

// داده‌های اولیه (نظرات)
const testimonials = [
  { image: '/images/eventheader.jpg', text: 'متن اول...' },
  { image: '/images/heroImage.jpg', text: 'متن دوم...' },
  { image: '/images/heroImage.jpg', text: 'متن سوم...' }
];

// تابع محاسبه موقعیت دقیق نشانگر بالای باکس متن
const updateIndicator = async () => {
  await nextTick(); // اطمینان از اینکه المان‌ها در DOM رندر شده‌اند
  if (selectedIndex.value !== null && cardRefs.value[selectedIndex.value]) {
    const card = cardRefs.value[selectedIndex.value];
    // محاسبه موقعیت مرکزی کارت نسبت به المان والد
    indicatorLeft.value = card.offsetLeft + (card.offsetWidth / 2);
  }
};

// انتخاب کارت و بروزرسانی نشانگر
const selectCard = (index) => { 
  selectedIndex.value = index; 
  updateIndicator();
};

// عملکردهای اسلایدر (قبلی و بعدی)
const slidePrev = () => { 
  if (selectedIndex.value === null) selectedIndex.value = 0;
  else if (selectedIndex.value > 0) selectedIndex.value--; 
  updateIndicator();
};

const slideNext = () => { 
  if (selectedIndex.value === null) selectedIndex.value = 0;
  else if (selectedIndex.value < testimonials.length - 1) selectedIndex.value++; 
  updateIndicator();
};
</script>