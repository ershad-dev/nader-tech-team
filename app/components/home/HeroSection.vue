<template>
  <div class="max-w-6xl mx-auto mt-12 text-center" dir="rtl">
    
    <h1 class="text-[32px] font-bold text-[#0F184B] mb-8">
با قدرت می اندیشیم ،با کیفیت میسازیم، با جسارت <span class="text-[#B18F55]">فتح </span> میکنیم
    </h1>

    <div class="relative z-10 w-[976px] h-[406px] rounded-[17px] overflow-hidden mx-auto">
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        v-show="currentSlide === index"
        class="w-full h-full transition-opacity duration-500"
      >
        <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover " />
      </div>
    </div>

    <div class="flex justify-center gap-4 z-20 ">
      <HomeIconsSliderButton 
        direction="left" 
        @click="nextSlide" 
      />

      <HomeIconsSliderButton 
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