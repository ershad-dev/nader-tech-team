<template>
  <section class="relative bg-[#ABD7D8] p-5 sm:p-8 md:p-9 xl:p-10 rounded-[16px] md:rounded-[18px] xl:rounded-[20px] mt-8 mx-auto w-full xl:w-[1110px] max-w-full">

    <img
      src="/images/texture.png"
      alt=""
      class="absolute w-[220px] sm:w-[380px] md:w-[550px] xl:w-[900px] h-auto object-contain opacity-30 pointer-events-none -mt-[60px] sm:-mt-[120px] md:-mt-[200px] xl:-mt-[350px] -mr-[20px] sm:-mr-[40px] md:-mr-[60px] xl:-mr-[100px] top-0 right-0 xl:top-auto xl:right-auto"
    />

    <!-- بخش توضیحات -->
    <div class="mb-8 md:mb-9 xl:mb-10 relative z-10">

      <p class="max-w-full xl:max-w-[865px] font-400 text-[#0F184B] text-[14px] sm:text-[15px] md:text-[15px] xl:text-[16px] leading-[26px] sm:leading-[32px] md:leading-[34px] xl:leading-[40px]">
        ما با ارائه خدمات تخصصی در برنامه‌ریزی، مدیریت و اجرای رویدادها، از ایده‌پردازی تا برگزاری نهایی در کنار شما هستیم.

        <br>
        <br>
      <p class="max-w-full xl:max-w-[865px] font-roboto font-light text-[#0F184B] text-[14px] sm:text-[15px] md:text-[15px] xl:text-[16px] leading-[26px] sm:leading-[32px] md:leading-[34px] xl:leading-[40px]">
        برگزاری انواع همایش‌ها، سمینارها، کنفرانس‌ها، بوت‌کمپ‌ها و کارگاه‌های آموزشی در حوزه‌های فناوری، برنامه‌نویسی، هوش مصنوعی، تولید محتوا، رسانه‌های دیجیتال و کارآفرینی، همراه با خدمات اجرایی، آموزشی، رسانه‌ای، فنی، تبلیغاتی، شبکه‌سازی حرفه‌ای و جذب سرمایه‌گذار، بخشی از راهکارهای ما برای خلق رویدادهای اثرگذار و ماندگار است.
      </p>

      </p>
    </div>

    <h2 class="relative z-10 text-[20px] sm:text-[22px] md:text-[24px] xl:text-[26px] text-[#A36C53] font-bold mb-4 pr-0 sm:pr-[40px] md:pr-[60px] xl:pr-[90px] text-center sm:text-right">خدمات ایونت</h2>

    <!-- لیست کارت‌ها (فراخوانی کامپوننت) -->
    <div class="relative z-10 space-y-6 mb-10 md:mb-11 xl:mb-12 flex flex-col items-center text-center">
      <ServiceCard />
    </div>

    <!-- بخش دکمه و فلش -->
    <div class="relative z-10 flex flex-col xl:flex-row items-center xl:justify-between mt-6 md:mt-8 xl:mt-10 px-2 md:px-4 gap-6 md:gap-7 xl:gap-0">

      <!-- متن (سمت راست) -->
      <div class="text-center xl:text-right mr-0 xl:mr-[20px] mt-0 xl:-mt-[100px] order-1 lg:mt-0.5">
        <span class="text-[18px] sm:text-[20px] md:text-[22px] xl:text-[24px] font-bold text-[#747893] block">رویداد بعدی خود را</span>
        <span class="text-[18px] sm:text-[20px] md:text-[22px] xl:text-[24px] font-bold text-[#747893] block">حرفه‌ای برگزار کنید</span>
      </div>

      <!-- فلش (وسط) - فقط در دسکتاپ واقعی نمایش داده می‌شود -->
      <div class="hidden xl:flex flex-1 justify-center px-4 order-2">
        <img src="/images/curved-arrow.png" alt="فلش" class="min-w-[600px] lg:min-w-[650px] xl:min-w-[700px] -ml-[150px] lg:-ml-[175px] xl:-ml-[195px] object-contain" />
      </div>

      <!-- دکمه ( درخواست همکاری) -->
      <NuxtLink to="/order/requestProject" class="order-3">
        <button class="bg-[#ECD0A0] px-10 py-4 rounded-[16px] font-bold shadow-md hover:bg-[#dcc090] transition w-full max-w-[263px] md:w-[263px] xl:w-[263px] h-[48px] mt-0 xl:mt-[90px]">
          درخواست همکاری
        </button>
      </NuxtLink>

    </div>
  </section>
</template>

<script setup>
// وارد کردن کامپوننت کارت خدمات
import ServiceCard from '@/components/events/landing/ServiceCard.vue'

// لیست خدمات (قابل استفاده برای رندر کردن پویا در کارت‌ها)
const services = [
  { 
    title: 'مدیریت و اجرای رویداد', 
    description: 'از برنامه‌ریزی و طراحی سناریو تا هماهنگی تیم اجرایی، ثبت‌نام شرکت‌کنندگان و مدیریت کامل فرآیند برگزاری رویداد.',
    image: '/images/about-img.jpg' 
  },
  { 
    title: 'رویدادهای آموزشی و تخصصی', 
    description: 'برگزاری بوت‌کمپ‌ها، سمینارها و رویدادهای تخصصی در حوزه فناوری، برنامه‌نویسی، هوش مصنوعی، تولید محتوا و کارآفرینی.',
    image: '/images/man-about.jpg' 
  },
  { 
    title: 'رسانه، شبکه‌سازی و توسعه کسب‌وکار', 
    description: 'ارائه خدمات رسانه‌ای و فنی، جذب حامی مالی، برگزاری جلسات B2B، شبکه‌سازی حرفه‌ای و ایجاد فرصت‌های همکاری و رشد کسب‌وکار.',
    image: '/images/about-img.jpg' 
  }
];
</script>