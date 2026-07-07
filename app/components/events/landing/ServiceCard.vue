<template>
  <!-- نمایش لیست کارت‌ها با استفاده از v-for -->
  <div v-for="(service, index) in services" :key="index" 
       class="bg-white rounded-[24px] sm:rounded-[35px] md:rounded-[40px] xl:rounded-[49px] flex items-center shadow-sm overflow-hidden h-[110px] sm:h-[150px] md:h-[160px] xl:h-[180.11px] w-full xl:w-[860px]">
    
    <!-- تصویر سمت راست -->
    <div class="w-[35%] sm:w-[30%] md:w-[32%] xl:w-1/3 h-full shrink-0 self-stretch">
      <img :src="service.image" :alt="service.title" class="w-full h-full xl:w-[209px] object-cover rounded-[24px] sm:rounded-[35px] md:rounded-[40px] xl:rounded-[49px]" />
    </div>

    <!-- متن سمت چپ -->
    <div class="flex-1 mr-0 xl:-mr-[40px] text-right px-3 sm:px-4 md:px-5 xl:px-0 py-2 sm:py-3 md:py-3 xl:py-0 min-w-0">
        <h3 class="text-[13px] sm:text-[18px] md:text-[19px] xl:text-[24px] font-bold text-[#606792] mb-1 sm:mb-2 line-clamp-2 xl:line-clamp-none leading-tight sm:leading-normal">{{ service.title }}</h3>
      <p class="text-[10px] sm:text-[13px] md:text-[13px] xl:text-[16px] font-roboto text-[#606792] leading-[15px] sm:leading-relaxed md:leading-relaxed mt-1 sm:mt-2 md:mt-2 xl:mt-[20px] line-clamp-3 sm:line-clamp-4 md:line-clamp-4 xl:line-clamp-none">{{ service.description }}</p>
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