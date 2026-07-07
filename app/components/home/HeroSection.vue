<template>
  <div class="max-w-6xl mx-auto mt-12 text-center px-4" dir="rtl">
    
    <h1 class="text-[20px] md:text-[32px] font-bold text-[#0F184B] mb-8 leading-relaxed">
      با قدرت می اندیشیم ،با کیفیت میسازیم، با جسارت <span class="text-[#B18F55]">فتح </span> میکنیم
    </h1>

    <div class="relative w-full max-w-[976px] h-[200px] md:h-[406px] rounded-[17px] overflow-hidden mx-auto shadow-lg">
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        v-show="currentSlide === index"
        class="w-full h-full transition-opacity duration-500"
      >
        <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />
      </div>
    </div>

    <div class="flex justify-center gap-4 mt-6">
      <HomeIconsSliderButton direction="left" @click="nextSlide" />
      <HomeIconsSliderButton direction="right" @click="prevSlide" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentSlide = ref(0);

const slides = [
  { image: '/images/hero-imgae.png', title: 'تیم حرفه‌ای' },
  { image: '/images/bg-services.jpg', title: 'محیط کاری' }
];

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};
</script> 