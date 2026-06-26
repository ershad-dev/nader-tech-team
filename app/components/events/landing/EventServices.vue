<template>
<section class="relative bg-[#ABD7D8] p-10 rounded-[20px] mt-8 mx-auto w-[1110px] max-w-full">

<img
  src="/images/texture.png"
  alt=""
  class="absolute w-[900px] h-auto object-contain opacity-30 pointer-events-none -mt-[350px] -mr-[100px]"
/>

    <!-- بخش توضیحات -->
    <div class="mb-10 ">
      
      <p class="max-w-[865ox] font-400  text-[#0F184B] text-[16px] leading-[40px]">
          ما با ارائه خدمات تخصصی در برنامه‌ریزی، مدیریت و اجرای رویدادها، از ایده‌پردازی تا برگزاری نهایی در کنار شما هستیم.

        <br>
        <br>
      <p class="max-w-[865ox] font-roboto font-light  text-[#0F184B] text-[16px] leading-[40px]">
                  برگزاری انواع همایش‌ها، سمینارها، کنفرانس‌ها، بوت‌کمپ‌ها و کارگاه‌های آموزشی در حوزه‌های فناوری، برنامه‌نویسی، هوش مصنوعی، تولید محتوا، رسانه‌های دیجیتال و کارآفرینی، همراه با خدمات اجرایی، آموزشی، رسانه‌ای، فنی، تبلیغاتی، شبکه‌سازی حرفه‌ای و جذب سرمایه‌گذار، بخشی از راهکارهای ما برای خلق رویدادهای اثرگذار و ماندگار است.
      </p>

       </p>
    </div>

        <h2 class="text-[26px] text-[#A36C53] font-bold mb-4 pr-[90px] ">خدمات ایونت</h2>

    <!-- لیست کارت‌ها (فراخوانی کامپوننت) -->
    <div class="space-y-6 mb-12 flex flex-col items-center text-center">
      <ServiceCard />
    </div>

    <!-- بخش دکمه و فلش -->
<div class="flex items-center justify-between mt-10 px-4">
  

      <!-- متن (سمت راست) -->
  <div class="text-right mr-[20px] -mt-[100px]">
    <span class="text-[24px] font-bold text-[#747893] block">رویداد بعدی خود را</span>
    <span class="text-[24px] font-bold text-[#747893] block">حرفه‌ای برگزار کنید</span>
  </div>




  <!-- فلش (وسط) -->
<div class="flex-1 flex justify-center px-4">
  <img src="/images/curved-arrow.png" alt="فلش" class="min-w-[700px] -ml-[195px] object-contain" />
</div>


    <!-- دکمه ( درخواست همکاری) -->
    <NuxtLink to="/order/requestProject">
      <button class="bg-[#ECD0A0] px-10 py-4 rounded-[16px] font-bold shadow-md hover:bg-[#dcc090] transition w-[263px] h-[48px] mt-[90px]">
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