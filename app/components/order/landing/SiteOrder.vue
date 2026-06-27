<script setup>
import { ref, computed } from 'vue';

const { getProjectsByType } = useProjects();
const webProjects = computed(() => getProjectsByType('web'));
const currentIndex = ref(0);

// محاسبه آیتم‌های قابل نمایش (با استفاده از عملگر باقی‌مانده %)
const visibleProjects = computed(() => {
  const items = [];
  for (let i = 0; i < 3; i++) {
    // فرمول کلیدی برای لوپ: (ایندکس فعلی + i) تقسیم بر کل تعداد آیتم‌ها
    const index = (currentIndex.value + i) % webProjects.value.length;
    items.push(webProjects.value[index]);
  }
  return items;
});

// منطق اسلایدر برای لوپ
const nextSlide = () => {
  // افزایش ایندکس و بازگشت به صفر در صورت عبور از طول آرایه
  currentIndex.value = (currentIndex.value + 1) % webProjects.value.length;
};

const prevSlide = () => {
  // کاهش ایندکس و پرش به انتهای آرایه در صورت منفی شدن
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
  <div class="relative z-0 h-[900px] bg-[url('/images/order-bg.png')] bg-cover bg-center py-10 -mt-[70px]">
    <div class="max-w-[1054px] mx-auto">
 <h1
  class="bg-[#fcfaf4] w-[178px] h-[43px] text-[#2d6a66] text-[18px] flex items-center justify-center rounded-[19px] shadow-sm mt-[100px]"
>
  طراحی سایت
</h1>

      <div class="flex justify-center gap-[70px] h-80 mt-[50px]">
<div v-for="(card, index) in visibleProjects" :key="card.id"
       class="w-[312px] h-[358px] bg-white rounded-[40px] shadow-lg cursor-pointer transition-all hover:scale-105"
       :class="[index % 2 !== 0 ? 'mt-12' : '']">
       
    <!-- استفاده از NuxtLink برای هدایت به صفحه جزئیات -->
<NuxtLink :to="`/order/${card.id}`">
  <img :src="card.images[0]" 
       class="w-[312px] h-[358px] object-cover rounded-[40px]" 
       :alt="card.title" />
</NuxtLink>
    
  </div>
      </div>

          <div class="flex justify-center gap-4 z-20 mt-[115px] ">
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

  <div class="relative z-20 -mt-[150px] py-20 px-4 w-[1200px] min-h-[600px] bg-[url('/images/bg-flow-2.png')] bg-cover bg-center bg-no-repeat rounded-tl-[90px] rounded-tr-[90px] overflow-hidden text-center mx-auto flex flex-col items-center" dir="rtl">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col items-center text-center mb-10">
        <h3 class="text-white text-[26px] font-medium mb-2">فرایند همکاری</h3>
        <h1 class="text-[#0F184B] text-[32px] font-bold">از ایده تا نتیجه، در کنار شما هستیم</h1>
      </div>

      <div class="flex flex-wrap justify-center gap-12 items-start">
        <div v-for="(step, index) in steps" :key="index"
             :class="['relative bg-[#E4E6EB] rounded-[2rem] w-full sm:w-[182px] h-[235px] flex flex-col shadow-lg transition-transform duration-500 mt-[50px]',
                      index % 2 !== 0 ? 'sm:translate-y-12' : '']">
          
          <div class="absolute -right-1 top-6 w-1.5 h-[41px] bg-[#EAAA3C] rounded-full -mt-[7.5px]"></div>
          
          <div class="bg-white p-4 rounded-b-[2rem] rounded-t-[2rem] h-[70px] ">
            <div class="flex items-center gap-1">
              <span class="text-[40px] font-extrabold ml-[20px] text-[#EAAA3C] rokh-bold-num ">
                {{ (index + 1).toLocaleString('fa-IR') }}
              </span>
              <h3 class="text-[#EAAA3C] font-bold text-[22px] truncate rokh-bold-num mb-[15 px]">{{ step.title }}</h3>
            </div>
          </div>
          
          <div class="p-4 flex-grow text-[#747893] text-[20px] font-normal font-roboto -mt-[15px]">
            {{ step.desc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>