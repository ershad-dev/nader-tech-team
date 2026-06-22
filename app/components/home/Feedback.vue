<template>
  <section class="max-w-6xl mx-auto py-20 px-4 -mt-[110px]" dir="rtl">
    
    <div class="mb-12">
      <h2 class="text-3xl font-bold text-[#0F184B] mb-4">تجربه همکاری از زبان مشتری </h2>
    </div>

    <div 
      ref="scrollContainer" 
      class="flex gap-6 overflow-x-auto scroll-smooth pb-8"
      style="scrollbar-width: none; -ms-overflow-style: none;" dir="ltr"
    >
      <div 
        v-for="customer in customers" :key="customer.id"
        class="min-w-[400px] h-[500px]  border border-slate-300 rounded-[2.5rem] p-8 text-center shadow-sm transition-all hover:shadow-xl" dir="rtl"
      >
        <img :src="customer.image" :alt="customer.name" class="w-[246px] h-[210px] rounded-[20px] mx-auto mb-6 object-cover object-top" />
        <h3 class="text-[20px] font-extrabold text-[#0F184B] mb-1 rokh-bold">{{ customer.name }}</h3>
        <p class="text-[#0F184B] font-normal text-[20px] mb-4 font-roboto">{{ customer.role }}</p>
        <p class="text-[#747893] text-[20px] leading-relaxed font-roboto text-right">{{ customer.comment }}</p>
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
          <div class="w-8 h-2 bg-[#2D7A6F] rounded-full"></div>
          <div class="w-2 h-2 bg-slate-200 rounded-full"></div>
          <div class="w-2 h-2 bg-slate-200 rounded-full"></div>
        </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// ارجاع به کانتینر اسکرول برای کنترل مستقیم DOM
const scrollContainer = ref(null);

// تابع پیمایش افقی در لیست کارت‌ها
const scroll = (direction) => {
  if (scrollContainer.value) {
    const scrollAmount = 320; // میزان حرکت در هر کلیک (عرض کارت + گپ)
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth' // حرکت نرم و روان
    });
  }
};

// داده‌های نمونه اعضای تیم
const customers = [
  { id: 1, name: ' سارا محمدی  ', role: ' مدیر بازرگانی', comment: ' همکاری با این مجموعه بسیار حرفه ای و منظم بود. کیفیت خدمات و پاسخگویی تیم فراتر از انتظار ما بود. ', image: '/images/customer.jpg' },
  { id: 2, name: ' سارا محمدی  ', role: ' مدیر بازرگانی', comment: ' همکاری با این مجموعه بسیار حرفه ای و منظم بود. کیفیت خدمات و پاسخگویی تیم فراتر از انتظار ما بود. ', image: '/images/customer2.jpg' },
  { id: 3, name: ' سارا محمدی  ', role: ' مدیر بازرگانی', comment: ' همکاری با این مجموعه بسیار حرفه ای و منظم بود. کیفیت خدمات و پاسخگویی تیم فراتر از انتظار ما بود. ', image: '/images/customer.jpg' },
  { id: 4, name: ' سارا محمدی  ', role: ' مدیر بازرگانی', comment: ' همکاری با این مجموعه بسیار حرفه ای و منظم بود. کیفیت خدمات و پاسخگویی تیم فراتر از انتظار ما بود. ', image: '/images/customer.jpg' }
];
</script>