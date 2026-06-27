<template>
  <section class="max-w-6xl mx-auto py-20 px-4 -mt-[110px]" dir="rtl">
    
    <div class="mb-12">
      <h2 class="text-3xl font-bold text-[#0F184B] mb-4">تجربه همکاری از زبان مشتری </h2>
    </div>

    <div 
      ref="scrollContainer" 
      class="flex gap-6 overflow-x-auto scroll-smooth pb-8"
      style="scrollbar-width: none; -ms-overflow-style: none;" 
    >
<div 
  v-for="customer in customers"
  :key="customer.id"
  class="min-w-[390px] h-[410px] border border-slate-300 rounded-[17px] overflow-hidden shadow-xl transition-all hover:shadow-xl"
  dir="rtl"
>
  <!-- بخش پروفایل -->
  <div class="bg-[#EDEDED] px-8 pt-8 pb-6 border-b border-slate-200 shadow-xl -mt-[20px]">
    <img
      :src="customer.image"
      :alt="customer.name"
      class="w-[246px] h-[210px] rounded-[20px] mx-auto mb-6 object-cover object-top"
    />

    <h3 class="text-[14px] font-extrabold text-[#0F184B] mb-1 rokh-bold text-center">
      {{ customer.name }}
    </h3>

    <p class="text-[#0F184B] font-roboto font-medium text-[14px] text-center">
      {{ customer.role }}
    </p>
  </div>

  <!-- بخش نظر -->
  <div class="bg-white p-8 h-[115px]">
    <p class="text-[#747893] text-[15px] leading-relaxed font-roboto text-right -mt-[20px]">
      {{ customer.comment }}
    </p>
  </div>
</div>
    </div>

    <div class="flex items-center justify-between mt-4 gap-5">


      <div class="flex gap-2">
        <HomeIconsSliderButtonFb 
          direction="left" 
          @click="scroll('right')" 
          class=" hover:text-gray transition" 
        />
        <HomeIconsSliderButtonFb 
          direction="right" 
          @click="scroll('left')" 
          class=" hover:text-gray transition" 
        />
      </div>
          <div class="flex gap-2">
  <div 
    v-for="(item, index) in customers" 
    :key="item.id"
    :class="[
      'h-2 rounded-full transition-all duration-300',
      activeIndex === index ? 'w-8 bg-[#2D7A6F]' : 'w-2 bg-slate-300'
    ]"
  ></div>
</div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const scrollContainer = ref(null);
const activeIndex = ref(0);
const cardWidth = 414; // عرض کارت (390) + گپ (24)

const scroll = (direction) => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth'
    });
  }
};

// محاسبه ایندکس فعال هنگام اسکرول
const updateIndex = () => {
  if (scrollContainer.value) {
    // استفاده از Math.abs برای هندل کردن RTL در مرورگرهای مختلف
    activeIndex.value = Math.round(Math.abs(scrollContainer.value.scrollLeft) / cardWidth);
  }
};

onMounted(() => {
  scrollContainer.value?.addEventListener('scroll', updateIndex);
});

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', updateIndex);
});

const customers = [
  { id: 1, name: 'سارا محمدی', role: 'مدیر بازرگانی', comment: 'همکاری با این مجموعه بسیار حرفه ای و منظم بود. کیفیت خدمات و پاسخگویی تیم فراتر از انتظار ما بود.', image: '/images/customer.jpg' },
  { id: 2, name: 'علی رضایی', role: 'مدیر مارکتینگ', comment: 'همکاری با این مجموعه بسیار حرفه ای و منظم بود. کیفیت خدمات و پاسخگویی تیم فراتر از انتظار ما بود.', image: '/images/customer2.jpg' },
  { id: 3, name: 'مریم حسینی', role: 'مدیر محصول', comment: 'همکاری با این مجموعه بسیار حرفه ای و منظم بود. کیفیت خدمات و پاسخگویی تیم فراتر از انتظار ما بود.', image: '/images/customer.jpg' },
  { id: 4, name: 'رضا امیری', role: 'مدیر فنی', comment: 'همکاری با این مجموعه بسیار حرفه ای و منظم بود. کیفیت خدمات و پاسخگویی تیم فراتر از انتظار ما بود.', image: '/images/customer.jpg' }
];
</script>