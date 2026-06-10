<template>
  <!-- نمایش لیست کارت‌ها با استفاده از v-for -->
  <div v-for="(service, index) in services" :key="index" 
       class="bg-white rounded-[49px] flex items-center shadow-sm border border-gray-100 overflow-hidden h-[180.11px] w-[860px]">
    
    <!-- تصویر سمت راست -->
    <div class="w-1/3 h-full shrink-0">
      <img :src="service.image" :alt="service.title" class="w-[209px] h-full object-cover rounded-[49px]" />
    </div>

    <!-- متن سمت چپ -->
    <div class="flex-1 px-8 text-right">
      <h3 class="text-xl font-bold text-gray-800 mb-2">{{ service.title }}</h3>
      <p class="text-sm text-gray-600 leading-relaxed">{{ service.description }}</p>
    </div>
  </div>
</template>

<script setup>
// داده‌های ثابت کارت‌ها در اینجا تعریف شده‌اند
const services = [
  { 
    title: 'مدیریت و اجرای رویداد', 
    description: 'از برنامه‌ریزی و طراحی سناریو تا هماهنگی تیم اجرایی، ثبت‌نام شرکت‌کنندگان و مدیریت کامل فرآیند برگزاری رویداد.', 
    image: '/images/about-img.png' 
  },
  { 
    title: 'رویدادهای آموزشی و تخصصی', 
    description: 'برگزاری بوت‌کمپ‌ها، سمینارها و رویدادهای تخصصی در حوزه فناوری، برنامه‌نویسی، هوش مصنوعی، تولید محتوا و کارآفرینی.', 
    image: '/images/man-about.png' 
  },
  { 
    title: 'رسانه، شبکه‌سازی و توسعه کسب‌وکار', 
    description: 'ارائه خدمات رسانه‌ای و فنی، جذب حامی مالی، برگزاری جلسات B2B، شبکه‌سازی حرفه‌ای و ایجاد فرصت‌های همکاری و رشد کسب‌وکار.', 
    image: '/images/eventheader.jpg' 
  }
];
</script>