<script setup>
import { useMobileSlider } from '@/composables/useMobileSlider'

const { items: webProjects } = useResumes('web')

const {
  mobileVisibleItems: mobileVisibleProjects,
  visibleItems,
  nextSlide,
  prevSlide,
  onTouchStart,
  onTouchEnd,
} = useMobileSlider(webProjects, { swipeThreshold: 40 })

const visibleProjects = visibleItems(3)

// steps آرایه ثابت - بدون تغییر
const steps = [
  { title: 'سفارش', desc: 'سفارش نیازهای خود را با ما در میان بگذارید و سفارش پروژه را ثبت کنید.' },
  { title: 'تحلیل', desc: 'تحلیل نیازها و اهداف شما به دقت بررسی و تحلیل می‌شود.' },
  { title: 'اجرا', desc: 'اجرا تیم ما بر اساس برنامه‌ریزی انجام شده پروژه را با کیفیت اجرا می‌کند.' },
  { title: 'تحویل', desc: 'تحویل پروژه در موعد مقرر با کیفیت نهایی به شما تحویل داده می‌شود.' },
  { title: 'پشتیبانی', desc: 'پشتیبانی پس از تحویل، همراهی و پشتیبانی ما ادامه خواهد داشت.' },
]
</script>

<template>
<div class="relative z-0 min-h-[560px] md:min-h-[650px] xl:h-[900px] xxl:h-[1024px] py-10 -mt-[80px] md:-mt-[70px] xl:-mt-[80px] xxl:-mt-[90px] dark:bg-dark-bg">
    <!-- لایه‌ی پس‌زمینه، جدا از محتوا -->
    <div
      class="absolute inset-0 -z-10
      bg-[url('/images/order-bg.png')]
      bg-no-repeat bg-cover bg-center
      xl:bg-[length:1920px_100%]
      dark:brightness-[0.55] dark:contrast-125"
    ></div>
    <!-- لایه‌ی تیره‌ی مکمل، فقط روی دارک‌مود، فقط روی بک‌گراند -->

    <div class="relative z-10 max-w-[1054px] xxl:max-w-[1440px] mx-auto px-4 xl:px-0">
<h1
  class="ml-auto bg-[#fcfaf4] dark:bg-dark-input w-[140px] h-[36px] text-[14px] md:w-[160px] md:h-[40px] md:text-[16px] xl:w-[178px] xl:h-[43px] xl:text-[18px] xxl:w-[200px] xxl:h-[48px] xxl:text-[20px] text-[#2d6a66] dark:text-dark-text flex items-center justify-center rounded-[19px] shadow-sm dark:shadow-none dark:ring-1 dark:ring-dark-border mt-[80px] md:mt-[70px] xl:mt-[100px] xxl:mt-[120px]"
>
  طراحی سایت
</h1>

      <!-- موبایل: کارت وسط بزرگ + کارت‌های قبلی/بعدی نیمه‌پیدا + پشتیبانی از سواپ انگشت -->
      <div
        class="relative flex md:hidden items-center justify-center h-[280px] mt-8 overflow-hidden touch-pan-y"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <div
          v-for="item in mobileVisibleProjects"
          :key="item.realIndex"
          class="absolute transition-all duration-500 ease-out"
          :class="[
            item.pos === 0
              ? 'z-20 scale-100 opacity-100 translate-x-0'
              : item.pos === -1
                ? 'z-10 scale-75 opacity-40 -translate-x-[105px]'
                : 'z-10 scale-75 opacity-40 translate-x-[105px]'
          ]"
        >
          <NuxtLink :to="`/order/${item.data.slug}`">
            <img
              :src="resumeCover(item.data)"
              class="w-[220px] h-[252px] object-cover rounded-[30px] shadow-lg dark:shadow-none dark:ring-1 dark:ring-dark-border select-none pointer-events-none"
              :alt="item.data.title"
              draggable="false"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- تبلت و دسکتاپ: همون منطق قبلی (جاری به بعد) -->
<!-- اسلایدر ۳ کارته -->
<div class="hidden md:flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-4 xl:gap-[70px] xxl:gap-[100px] xl:h-80 xxl:h-[420px] mt-8 md:mt-10 xl:mt-[50px] xxl:mt-[70px]">
  <div
    v-for="(item, index) in visibleProjects"
    :key="item.data.id"
    class="w-full max-w-[312px] aspect-[312/358] md:w-[220px] md:h-[260px] md:aspect-auto xl:w-[312px] xl:h-[358px] xxl:w-[360px] xxl:h-[414px] bg-white dark:bg-dark-input rounded-[30px] xl:rounded-[40px] xxl:rounded-[45px] shadow-lg dark:shadow-none dark:ring-1 dark:ring-dark-border cursor-pointer transition-all hover:scale-105"
    :class="[
      index >= 2 ? 'md:hidden xl:block' : '',
      index % 2 !== 0 ? 'xl:mt-12 xxl:mt-14' : '',
    ]"
  >
<NuxtLink :to="`/order/${item.data.slug}`">
        <img
        :src="resumeCover(item.data)"
        class="w-full h-full object-cover rounded-[30px] xl:rounded-[40px] xxl:rounded-[45px]"
        :alt="item.data.title"
      />
    </NuxtLink>
  </div>
</div>

      <!-- دکمه‌های اسلایدر: فقط از md به بالا نمایش داده می‌شن -->
      <div class="hidden md:flex justify-center gap-4 z-20 mt-8 md:mt-10 xl:mt-[115px] xxl:mt-[100px]">
        <SliderButton
          direction="left"
          @click="prevSlide"
        />

        <SliderButton
          direction="right"
          @click="nextSlide"
        />
      </div>
    </div>
  </div>

  <div
  class="relative z-20 -mt-20 md:-mt-20 xl:-mt-[150px] xxl:-mt-[190px] py-14 md:py-16 xl:py-20 xxl:py-24 px-4 w-full max-w-[1200px] xxl:max-w-[1600px] min-h-[420px] xxl:min-h-[480px]
  rounded-[50px] xxl:rounded-[60px] overflow-visible text-center mx-auto flex flex-col items-center"
  dir="rtl"
>
  <!-- لایه‌ی پس‌زمینه‌ی جدا -->
<div
  class="absolute inset-0 -z-10 rounded-[50px] xxl:rounded-[60px] overflow-hidden
  bg-[url('/images/bg-flow3.png')]
  bg-cover bg-top bg-no-repeat
  xl:bg-[length:100%_100%] xl:bg-center"
>
<img
  src="/images/firooze.png"
  alt=""
  class="mt-[45px] sm:mt-[45px] md:mt-[65px] md:absolute md:top-0 md:right-0 xl:mt-0"
/>
<div class="md:absolute md:top-[260px] md:left-0 md:flex md:items-center md:gap-4 md:-mt-[90px] xl:top-[350px] xl:mt-0">
  <img src="/images/line-flow.png" alt="" class="-mt-[130px] md:mt-0"/>
  <img src="/images/line-flow.png" alt="" class="mt-[110px] md:mt-0" />
</div>

  <img
    src="/images/firooze.png"
    alt=""
    class="md:absolute md:bottom-0 md:left-0 "
  />
</div>

<div class="relative z-10 max-w-6xl xxl:max-w-[1300px] mx-auto">
  <div class="flex flex-col items-center text-center mb-8 md:mb-10 xxl:mb-14">
    <h3 class="text-[#2d6a66] md:text-white dark:text-dark-text text-[18px] md:text-[22px] xl:text-[26px] xxl:text-[30px] xxl:mt-[50px] font-medium mb-2">فرایند همکاری</h3>
    <h1 class="text-[#0F184B] dark:text-dark-text text-[22px] md:text-[29px] xl:text-[32px] xxl:text-[38px] font-bold">از ایده تا نتیجه، در کنار شما هستیم</h1>
  </div>

<div class="flex flex-wrap xxl:flex-nowrap justify-center gap-3 sm:gap-4 md:gap-3 xl:gap-12 xxl:gap-10 items-start md:items-center xl:items-start">
  <div
    v-for="(step, index) in steps"
    :key="index"
    :class="[
      'relative bg-[#E4E6EB] dark:bg-dark-surface rounded-[1.5rem] md:rounded-[1.75rem] w-[105px] sm:w-[140px] md:w-[140px] xl:w-[182px] xxl:w-[210px] h-[160px] sm:h-[190px] md:h-[195px] xl:h-[235px] xxl:h-[270px] flex flex-col shadow-lg dark:shadow-none dark:ring-1 dark:ring-dark-border transition-transform duration-500 mt-[12px] sm:mt-[20px] md:mt-[20px] xl:mt-[50px] xxl:mt-[60px]',
      index % 2 !== 0 ? 'xl:translate-y-12 xxl:translate-y-14' : '',
    ]"
  >
      <div class="absolute -right-1 top-5 md:top-5 w-1.5 h-[28px] sm:h-[34px] md:h-[30px] xxl:h-[36px] bg-[#EAAA3C] dark:bg-dark-gold rounded-full -mt-[6px] md:-mt-[6px] xxl:-mt-[8px]"></div>

      <div class="bg-white dark:bg-dark-input p-2 sm:p-3 md:p-2.5 xxl:p-3 rounded-b-[1.5rem] rounded-t-[1.5rem] md:rounded-b-[1.75rem] md:rounded-t-[1.75rem] xxl:rounded-b-[2rem] xxl:rounded-t-[2rem] h-[48px] sm:h-[58px] md:h-[52px] xxl:h-[58px]">
        <div class="flex items-center h-full gap-1">
          <span class="text-[20px] sm:text-[26px] md:text-[26px] xl:text-[40px] xxl:text-[46px] font-extrabold ml-[8px] sm:ml-[12px] md:ml-[10px] xxl:ml-[14px] text-[#EAAA3C] dark:text-dark-gold rokh-bold-num mt-2">
            {{ (index + 1).toLocaleString('fa-IR') }}
          </span>
          <h3 class="text-[#EAAA3C] dark:text-dark-gold font-bold text-[12px] sm:text-[15px] md:text-[18px] xl:text-[22px] xxl:text-[25px] truncate rokh-bold-num">{{ step.title }}</h3>
        </div>
      </div>

      <div class="px-2 sm:px-3 pb-2 sm:pb-3 md:px-2.5 md:pb-2.5 flex-grow text-[#747893] dark:text-dark-text/80 text-[10px] sm:text-[12px] md:text-[16px] xl:text-[20px] xxl:text-[22px] font-normal font-roboto leading-relaxed md:leading-snug mt-1 md:mt-1 ">
        {{ step.desc }}
      </div>
    </div>
  </div>
</div>
  </div>
</template>