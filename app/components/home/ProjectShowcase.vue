<template>
  <div class=" min-h-screen py-10 " dir="rtl">

    <!-- ۲. بخش تب‌ها و پروژه‌ها با منطق اسلایدر -->
    <section class="max-w-6xl mx-auto py-8 lg:py-16 px-4">
<div class="flex justify-center mb-8 lg:mb-10 px-2">
  <div class="w-full max-w-[846px] lg:w-[846px] h-auto lg:h-[59px] bg-white rounded-[30px] lg:rounded-[48px] p-1 shadow-sm border border-gray-100 flex flex-nowrap items-center justify-center gap-1 sm:gap-2 overflow-hidden">

    <button 
      v-for="category in categories" :key="category"
      @click="activeCategory = category; currentIndex = 0"
      :class="[
        'flex-1 min-w-0 px-1 sm:px-4 lg:px-8 py-1.5 lg:py-3 lg:w-[178px] h-auto lg:h-[43px] rounded-[14px] lg:rounded-[19px] text-[10px] xs:text-[11px] sm:text-[15px] lg:text-[18px] font-bold transition-all duration-300 truncate whitespace-nowrap',
        activeCategory === category 
          ? 'bg-[#2C7379] text-white shadow-md'
          : ' text-[#0F184B] hover:bg-slate-200'
      ]"
    >
      {{ category }}
    </button>

  </div>
</div>

<div class="max-w-6xl mx-auto px-4 py-4 lg:py-8 -mt-[20px]" dir="rtl">
  <div class="flex flex-row items-center justify-between gap-2">

    <h2 class="text-[15px] sm:text-[20px] lg:text-[28px] font-roboto text-[#0F184B] font-normal">
      پیش نمایش از پروژه ها
    </h2>

<NuxtLink
  to="/order/moreProject"
  class="bg-[#2C7379] px-4 sm:w-[147px] h-[30px] sm:h-[45px] text-white rounded-[14px] sm:rounded-[19px] text-[11px] sm:text-[17px] font-medium transition-all hover:bg-[#2C7379] flex items-center justify-center gap-2 shadow-md font-roboto whitespace-nowrap overflow-hidden"
>
  <span>مشاهده بیشتر</span>

  <div class="w-4 h-4 flex items-center justify-center flex-shrink-0">
    <HomeIconsMoreArrow class="w-full h-full" />
  </div>
</NuxtLink>

  </div>
</div>
      <!-- گرید پروژه‌ها -->
<!-- گرید پروژه‌ها -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
  <div v-for="project in visibleProjects" :key="project.id" 
       class="relative w-full lg:w-[250px] h-[220px] sm:h-[280px] lg:h-[350px] bg-white rounded-[24px] lg:rounded-[48px] border-[1px] border-gray-300 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">

    <NuxtLink :to="`/order/${project.id}`">
      <img :src="project.image" class="w-full h-[214px] sm:h-[274px] lg:w-[250px] lg:h-[344px] object-cover" />
      
      <div class="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/60 p-3 lg:p-5 border-t border-white/30 text-center">
        <h3 class="text-[#0F184B] font-bold text-[14px] sm:text-[16px] lg:text-[20px]">{{ project.title }}</h3>
      </div>
    </NuxtLink>

  </div>
</div>

      <!-- کنترل‌های اسلایدر -->
      <div class="flex items-center justify-between mt-8 lg:mt-12 px-2">
        <div class="flex justify-center gap-3 lg:gap-4 z-20">
          <HomeIconsSliderButton direction="left" @click="prevSlide" />
          <HomeIconsSliderButton direction="right" @click="nextSlide" />
        </div>

        <div class="flex gap-2">
          <div v-for="i in totalSlides" :key="i" 
               :class="['h-2 rounded-full transition-all', currentIndex === i-1 ? 'w-8 bg-[#081035]' : 'w-2 bg-slate-300']">
          </div>
        </div>
      </div>
    </section>

    <!-- ۱. بخش شوکیس (Showcase) داینامیک -->
<section class="max-w-6xl mx-auto px-4 mb-12 xl:mb-20">
  <div class="relative rounded-[2rem] xl:rounded-[3rem] overflow-hidden p-6 xl:p-12 bg-[#67A9A8] xl:bg-white/20">

    <!-- عکس پس‌زمینه فقط در دسکتاپ -->
    <img src="/images/bg-services.png" class="hidden xl:block absolute inset-0 w-[1105px] object-cover z-0 " />

    <div class="relative z-10 flex flex-col xl:flex-row items-center gap-6 xl:gap-12">
      <div class="flex-1 w-full">
        <img 
            :key="currentContent.image" 
            :src="currentContent.image" 
            :alt="currentContent.title"
            class="w-full h-[220px] xl:w-[506px] xl:h-[386px] object-cover rounded-tl-[17px] rounded-br-[17px] rounded-tr-[65px] rounded-bl-[65px] shadow-xl transition-all duration-500" 
          />
      </div>
      
      <div class="flex-1 text-black xl:mr-[50px] text-center xl:text-right">
        <h2 class="text-[20px] xl:text-[26px] font-bold mb-4 xl:mb-6 text-[#0F184B]">{{ currentContent.title }}</h2>
        <p class="leading-[26px] xl:leading-[40px] mb-6 xl:mb-8 opacity-90 text-[#0F184B] font-roboto text-[13px] xl:text-[14px]">{{ currentContent.description }}</p>
        <NuxtLink to="/order/requestProject">
          <button class="bg-[#ECD0A0] border-[0.5px] border-gray-300 text-[#0F184B] w-full max-w-[268px] mx-auto xl:mx-0 xl:w-[268px] h-[48px] font-bold px-8 rounded-[16px] hover:scale-105 transition-allshadow-lg text-[18px] xl:text-[20px] mt-6 xl:mt-[50px] flex items-center justify-center">
            درخواست همکاری
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

const activeCategory = ref('طراحی سایت');
const currentIndex = ref(0);
const categories = ['طراحی سایت', 'تولید محتوا', 'برگزاری ایونت'];

// --- تعداد آیتم در هر اسلاید بر اساس سایز صفحه ---
const itemsPerPage = ref(4);

const updateItemsPerPage = () => {
  itemsPerPage.value = window.innerWidth < 1024 ? 2 : 4;
};

onMounted(() => {
  updateItemsPerPage();
  window.addEventListener('resize', updateItemsPerPage);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerPage);
});

const contentMap = {
  'طراحی سایت': { 
    title: 'طراحی سایت', 
    description: 'با برگزاری ایونت‌های حرفه‌ای و هدفمند، فضایی برای ایجاد ارتباطات ارزشمند، یادگیری، تعامل و تجربه‌ای متفاوت فراهم می‌کنیم. از ایده‌پردازی و برنامه‌ریزی اولیه گرفته تا هماهنگی جزئیات و اجرای نهایی، هدف ما خلق رویدادهایی منظم، جذاب و تأثیرگذار است که علاوه بر پاسخ‌گویی به اهداف برگزارکنندگان، تجربه‌ای به‌یادماندنی و لذت‌بخش برای شرکت‌کنندگان رقم بزنند و زمینه‌ساز شکل‌گیری ارتباطات و فرصت‌های جدید باشند.', 
    image: '/images/img-services.png' 
  },
  'تولید محتوا': { 
    title: 'تولید محتوا', 
    description: 'با برگزاری ایونت‌های حرفه‌ای و هدفمند، فضایی برای ایجاد ارتباطات ارزشمند، یادگیری، تعامل و تجربه‌ای متفاوت فراهم می‌کنیم. از ایده‌پردازی و برنامه‌ریزی اولیه گرفته تا هماهنگی جزئیات و اجرای نهایی، هدف ما خلق رویدادهایی منظم، جذاب و تأثیرگذار است که علاوه بر پاسخ‌گویی به اهداف برگزارکنندگان، تجربه‌ای به‌یادماندنی و لذت‌بخش برای شرکت‌کنندگان رقم بزنند و زمینه‌ساز شکل‌گیری ارتباطات و فرصت‌های جدید باشند.', 
    image: '/images/img-services.png' 
  },
  'برگزاری ایونت': { 
    title: 'برگزاری ایونت', 
    description: 'با برگزاری ایونت‌های حرفه‌ای و هدفمند، فضایی برای ایجاد ارتباطات ارزشمند، یادگیری، تعامل و تجربه‌ای متفاوت فراهم می‌کنیم. از ایده‌پردازی و برنامه‌ریزی اولیه گرفته تا هماهنگی جزئیات و اجرای نهایی، هدف ما خلق رویدادهایی منظم، جذاب و تأثیرگذار است که علاوه بر پاسخ‌گویی به اهداف برگزارکنندگان، تجربه‌ای به‌یادماندنی و لذت‌بخش برای شرکت‌کنندگان رقم بزنند و زمینه‌ساز شکل‌گیری ارتباطات و فرصت‌های جدید باشند.', 
    image: '/images/img-services.png' 
  }
};

const projects = [
  { id: 1, title: 'نام پروژه ۱', category: 'طراحی سایت', image: '/images/preview3.jpg' },
  { id: 2, title: 'نام پروژه ۲', category: 'طراحی سایت', image: '/images/preview2.jpg' },
  { id: 3, title: 'نام پروژه ۳', category: 'طراحی سایت', image: '/images/preview.jpg' },
  { id: 4, title: 'نام پروژه ۴', category: 'طراحی سایت', image: '/images/content1.jpg' },
  { id: 5, title: 'نام پروژه ۵', category: 'طراحی سایت', image: '/images/content2.jpg' },
  { id: 6, title: 'نام پروژه ۶', category: 'تولید محتوا', image: '/images/hero-imgae.png' },
  { id: 7, title: 'نام پروژه ۷', category: 'تولید محتوا', image: '/images/hero-imgae.png' },
  { id: 8, title: 'نام پروژه ۸', category: 'تولید محتوا', image: '/images/hero-imgae.png' },
  { id: 9, title: 'نام پروژه ۹', category: 'تولید محتوا', image: '/images/content2.jpg' },
  { id: 10, title: 'نام پروژه ۱۰', category: 'تولید محتوا', image: '/images/content2.jpg' },
  { id: 11, title: 'نام پروژه ۱۱', category: 'برگزاری ایونت', image: '/images/hero-imgae.png' },
];

const currentContent = computed(() => contentMap[activeCategory.value]);
const filteredProjects = computed(() => projects.filter(p => p.category === activeCategory.value));

// محاسبه تعداد صفحات بر اساس itemsPerPage پویا
const totalSlides = computed(() => Math.ceil(filteredProjects.value.length / itemsPerPage.value));

// منطق چرخشی (Loop) برای نمایش پروژه‌ها در صفحه جاری
const visibleProjects = computed(() => {
  const all = filteredProjects.value;
  if (all.length === 0) return [];
  
  const start = currentIndex.value * itemsPerPage.value;
  const result = [];
  
  for (let i = 0; i < itemsPerPage.value; i++) {
    const index = (start + i) % all.length;
    result.push(all[index]);
  }
  return result;
});

const nextSlide = () => {
  if (totalSlides.value > 0) {
    currentIndex.value = (currentIndex.value + 1) % totalSlides.value;
  }
};

const prevSlide = () => {
  if (totalSlides.value > 0) {
    currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value;
  }
};

watch(activeCategory, () => {
  currentIndex.value = 0;
});
</script>