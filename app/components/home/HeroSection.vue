<template>
  <div class="max-w-6xl mx-auto mt-12 text-center" dir="rtl">
    
    <h1 class="text-4xl font-bold text-slate-900 mb-8">
      از یک جرقه، تا یک <span class="text-[#2D7A6F]">کسب و کار</span> ماندگار!
    </h1>

    <div class="relative z-10 w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        v-show="currentSlide === index"
        class="w-full h-full transition-opacity duration-500"
      >
        <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />
      </div>
    </div>

    <div class="flex justify-center gap-4 mt-6 z-20">
      <SliderButton 
        direction="left" 
        @click="nextSlide" 
      />

      <SliderButton 
        direction="right" 
        @click="prevSlide" 
      />
    </div>
  </div>
</template>

<script setup>
// مدیریت ایندکس اسلاید فعلی
const currentSlide = ref(0);

// داده‌های مربوط به تصاویر اسلایدر
const slides = [
  { image: '/images/hero-imgae.png', title: 'تیم حرفه‌ای' },
  { image: '/images/bg-services.jpg', title: 'محیط کاری' }
];

// تابع رفتن به اسلاید بعدی (با استفاده از باقیمانده تقسیم برای چرخش حلقوی)
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

// تابع رفتن به اسلاید قبلی
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};
</script>