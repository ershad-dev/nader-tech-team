<template>
  <!-- نمایش لیست کارت‌ها با استفاده از v-for -->
  <div v-for="(service, index) in services" :key="index" 
       class="bg-white rounded-[49px] flex items-center shadow-sm overflow-hidden h-[180.11px] w-[860px]">
    
    <!-- تصویر سمت راست -->
    <div class="w-1/3 h-full shrink-0">
      <img :src="service.image" :alt="service.title" class="w-[209px] h-full object-cover rounded-[49px]" />
    </div>

    <!-- متن سمت چپ -->
<div class="flex-1 -mr-[40px] text-right">
        <h3 class="text-[24px] font-bold text-[#606792] mb-2 ">{{ service.title }}</h3>
      <p class="text-[20px] font-roboto text-[#606792] leading-relaxed mt-[20px]">{{ service.description }}</p>
    </div>
  </div>
</template>

<script setup>
// داده‌های ثابت کارت‌ها در اینجا تعریف شده‌اند
const services = [
  { 
    title: 'مدیریت و اجرای رویداد', 
    description: 'از برنامه‌ریزی و طراحی سناریو تا هماهنگی تیم اجرایی، ثبت‌نام شرکت‌کنندگان و مدیریت کامل فرآیند برگزاری رویداد.', 
    image: '/images/event-card-1.png' 
  },
  { 
    title: 'رویدادهای آموزشی و تخصصی', 
    description: 'برگزاری بوت‌کمپ‌ها، سمینارها و رویدادهای تخصصی در حوزه فناوری، برنامه‌نویسی، هوش مصنوعی، تولید محتوا و کارآفرینی.', 
    image: '/images/event-card-2.jpg' 
  },
  { 
    title: 'رسانه، شبکه‌سازی و توسعه کسب‌وکار', 
    description: 'ارائه خدمات رسانه‌ای و فنی، جذب حامی مالی، برگزاری جلسات B2B، شبکه‌سازی حرفه‌ای و ایجاد فرصت‌های همکاری و رشد کسب‌وکار.', 
    image: '/images/event-card-3.jpg' 
  }
];
</script>