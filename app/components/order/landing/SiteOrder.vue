<script setup>
import { ref, computed } from 'vue';

const { getProjectsByType } = useProjects();
const webProjects = computed(() => getProjectsByType('web'));
const currentIndex = ref(0);

// آیتم‌های دسکتاپ/تبلت (جاری به بعد - همون منطق قبلی)
const visibleProjects = computed(() => {
  const items = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex.value + i) % webProjects.value.length;
    items.push(webProjects.value[index]);
  }
  return items;
});

// آیتم‌های موبایل (قبلی - جاری - بعدی) برای نمایش کارت وسط بزرگ و کناری‌ها نیمه‌پیدا
const mobileVisibleProjects = computed(() => {
  const items = [];
  const len = webProjects.value.length;
  for (let i = -1; i <= 1; i++) {
    const index = (currentIndex.value + i + len) % len;
    items.push(webProjects.value[index]);
  }
  return items;
});

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % webProjects.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + webProjects.value.length) % webProjects.value.length;
};

const steps = [
  { title: 'سفارش', desc: 'سفارش نیازهای خود را با ما در میان بگذارید و سفارش پروژه را ثبت کنید.' },
  { title: 'تحلیل', desc: 'تحلیل نیازها و اهداف شما به دقت بررسی و تحلیل می‌شود.' },
  { title: 'اجرا', desc: 'اجرا تیم ما بر اساس برنامه‌ریزی انجام شده پروژه را با کیفیت اجرا می‌کند.' },
  { title: 'تحویل', desc: 'تحویل پروژه در موعد مقرر با کیفیت نهایی به شما تحویل داده می‌شود.' },
  { title: 'پشتیبانی', desc: 'پشتیبانی پس از تحویل، همراهی و پشتیبانی ما ادامه خواهد داشت.' }
];
</script>

<template>
<div class="relative z-0 min-h-[560px] md:min-h-[650px] xl:h-[900px] bg-[url('/images/order-bg.png')] bg-cover bg-center py-10 -mt-[80px] md:-mt-[50px] xl:-mt-[70px]">
    <div class="max-w-[1054px] mx-auto px-4 xl:px-0">
<h1
  class="ml-auto bg-[#fcfaf4] w-[140px] h-[36px] text-[14px] md:w-[160px] md:h-[40px] md:text-[16px] xl:w-[178px] xl:h-[43px] xl:text-[18px] text-[#2d6a66] flex items-center justify-center rounded-[19px] shadow-sm mt-[80px] md:mt-[70px] xl:mt-[100px]"
>
  طراحی سایت
</h1>

      <!-- موبایل: کارت وسط بزرگ + کارت‌های قبلی/بعدی نیمه‌پیدا -->
      <div class="relative flex md:hidden items-center justify-center h-[280px] mt-8 overflow-hidden">
        <div
          v-for="(card, index) in mobileVisibleProjects"
          :key="card.id"
          class="absolute transition-all duration-500 ease-out"
          :class="[
            index === 1
              ? 'z-20 scale-100 opacity-100 translate-x-0'
              : index === 0
                ? 'z-10 scale-75 opacity-40 -translate-x-[105px]'
                : 'z-10 scale-75 opacity-40 translate-x-[105px]'
          ]"
        >
          <NuxtLink :to="`/order/${card.id}`">
            <img
              :src="card.images[0]"
              class="w-[220px] h-[252px] object-cover rounded-[30px] shadow-lg"
              :alt="card.title"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- تبلت و دسکتاپ: همون منطق قبلی (جاری به بعد) -->
<!-- اسلایدر ۳ کارته: کارت‌ها از 240px به 220px کاهش یافت -->
<div class="hidden md:flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-4 xl:gap-[70px] xl:h-80 mt-8 md:mt-10 xl:mt-[50px]">
  <div
    v-for="(card, index) in visibleProjects"
    :key="card.id"
    class="w-full max-w-[312px] aspect-[312/358] md:w-[220px] md:h-[260px] md:aspect-auto xl:w-[312px] xl:h-[358px] bg-white rounded-[30px] xl:rounded-[40px] shadow-lg cursor-pointer transition-all hover:scale-105"
    :class="[
      index >= 2 ? 'md:hidden xl:block' : '',
      index % 2 !== 0 ? 'xl:mt-12' : '',
    ]"
  >
    <NuxtLink :to="`/order/${card.id}`">
      <img
        :src="card.images[0]"
        class="w-full h-full object-cover rounded-[30px] xl:rounded-[40px]"
        :alt="card.title"
      />
    </NuxtLink>
  </div>
</div>

      <div class="flex justify-center gap-4 z-20 mt-8 md:mt-10 xl:mt-[115px]">
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
    class="relative z-20 mt-4 md:-mt-24 xl:-mt-[150px] py-14 md:py-16 xl:py-20 px-4 w-full max-w-[1200px] min-h-[420px] md:min-h-[500px] xl:min-h-[600px]
           bg-[#67A9A8] bg-none
           md:bg-transparent md:bg-[url('/images/bg-flow-2.png')] md:bg-cover md:bg-center md:bg-no-repeat
           rounded-tl-[50px] rounded-tr-[50px] md:rounded-tl-[70px] md:rounded-tr-[70px] xl:rounded-tl-[90px] xl:rounded-tr-[90px] overflow-hidden text-center mx-auto flex flex-col items-center"
    dir="rtl"
  >
<div class="max-w-6xl mx-auto">
  <div class="flex flex-col items-center text-center mb-8 md:mb-10">
    <h3 class="text-[#2d6a66] md:text-white text-[18px] md:text-[22px] xl:text-[26px] font-medium mb-2">فرایند همکاری</h3>
    <h1 class="text-[#0F184B] text-[22px] md:text-[29px] xl:text-[32px] font-bold">از ایده تا نتیجه، در کنار شما هستیم</h1>
  </div>

<div class="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-3 xl:gap-12 items-start md:items-center xl:items-start">
  <div
    v-for="(step, index) in steps"
    :key="index"
    :class="[
      'relative bg-[#E4E6EB] rounded-[1.5rem] md:rounded-[1.75rem] w-[105px] sm:w-[140px] md:w-[140px] xl:w-[182px] h-[160px] sm:h-[190px] md:h-[195px] xl:h-[235px] flex flex-col shadow-lg transition-transform duration-500 mt-[12px] sm:mt-[20px] md:mt-[20px] xl:mt-[50px]',
      index % 2 !== 0 ? 'xl:translate-y-12' : '',
    ]"
  >
      <div class="absolute -right-1 top-5 md:top-5 w-1.5 h-[28px] sm:h-[34px] md:h-[30px] bg-[#EAAA3C] rounded-full -mt-[6px] md:-mt-[6px]"></div>

      <div class="bg-white p-2 sm:p-3 md:p-2.5 rounded-b-[1.5rem] rounded-t-[1.5rem] md:rounded-b-[1.75rem] md:rounded-t-[1.75rem] h-[48px] sm:h-[58px] md:h-[52px]">
        <div class="flex items-center h-full gap-1">
          <span class="text-[20px] sm:text-[26px] md:text-[26px] xl:text-[40px] font-extrabold ml-[8px] sm:ml-[12px] md:ml-[10px] text-[#EAAA3C] rokh-bold-num mt-2">
            {{ (index + 1).toLocaleString('fa-IR') }}
          </span>
          <h3 class="text-[#EAAA3C] font-bold text-[12px] sm:text-[15px] md:text-[18px] xl:text-[22px] truncate rokh-bold-num">{{ step.title }}</h3>
        </div>
      </div>

      <div class="px-2 sm:px-3 pb-2 sm:pb-3 md:px-2.5 md:pb-2.5 flex-grow text-[#747893] text-[10px] sm:text-[12px] md:text-[16px] xl:text-[20px] font-normal font-roboto leading-relaxed md:leading-snug mt-1 md:mt-1 ">
        {{ step.desc }}
      </div>
    </div>
  </div>
</div>
  </div>
</template>