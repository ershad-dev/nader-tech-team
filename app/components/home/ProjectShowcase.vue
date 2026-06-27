<template>
  <div class=" min-h-screen py-10 -mt-[50px]" dir="rtl">
    


    <!-- ۲. بخش تب‌ها و پروژه‌ها با منطق اسلایدر -->
    <section class="max-w-6xl mx-auto py-16 px-4">
<div class="flex justify-center mb-10">
  <div class="w-[846px] h-[59px] bg-white rounded-[48px] p-1 shadow-sm border border-gray-100 flex items-center justify-center gap-2">
    
    <button 
  v-for="category in categories" :key="category"
  @click="activeCategory = category; currentIndex = 0"
  :class="[
    'px-8 py-3 w-[178px] h-[43px] rounded-[19px] text-[18px] font-bold transition-all duration-300',
    activeCategory === category 
      ? 'bg-[#2C7379] text-white shadow-md'           // حالت انتخاب شده
      : ' text-[#0F184B] hover:bg-slate-200' // حالت عادی (غیرانتخابی)
  ]"
>
  {{ category }}
</button>
    
  </div>
</div>

      <div class="max-w-6xl mx-auto px-4 py-8" dir="rtl">
    <div class="flex items-center justify-between">
      
      <h2 class="text-[28px] font-roboto text-[#0F184B] font-normal">
        پیش نمایش از پروژه ها
      </h2>

      <NuxtLink 
          to="/order" 
          class="bg-[#2C7379] w-[147px] h-[45px] text-white rounded-[19px] text-[17px] font-medium hover:bg-[#2C7379] transition-all flex items-center justify-center gap-2 shadow-md font-roboto whitespace-nowrap"
        >
          <span>مشاهده بیشتر</span>
          <HomeIconsMoreArrow/>
      </NuxtLink>
      
    </div>
  </div>

      <!-- گرید پروژه‌ها (اسلایدشونده) -->
<!-- گرید پروژه‌ها -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <div v-for="project in visibleProjects" :key="project.id" 
       class="relative w-[250px] h-[350px] bg-white rounded-[48px] border-[1px] border-gray-300 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
    
    <!-- افزودن NuxtLink برای هدایت به صفحه جزئیات -->
    <NuxtLink :to="`/order/${project.id}`">
      <img :src="project.image" class="w-[250px] h-[344px] object-cover" />
      
      <div class="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/60 p-5 border-t border-white/30 text-center">
        <h3 class="text-[#0F184B] font-bold text-[20px]">{{ project.title }}</h3>
      </div>
    </NuxtLink>

  </div>
</div>

      <!-- کنترل‌های اسلایدر -->
      <div class="flex items-center justify-between mt-12 px-2">
    <div class="flex justify-center gap-4 z-20 ">
      <HomeIconsSliderButton 
        direction="left" 
        @click="prevSlide" 
      />

      <HomeIconsSliderButton 
        direction="right" 
        @click="nextSlide" 
      />
    </div>
        
        <!-- دات‌های نشانگر اسلاید -->
        <div class="flex gap-2">
          <div v-for="i in totalSlides" :key="i" 
               :class="['h-2 rounded-full transition-all', currentIndex === i-1 ? 'w-8 bg-[#081035]' : 'w-2 bg-slate-300']">
          </div>
        </div>
      </div>
    </section>

        <!-- ۱. بخش شوکیس (Showcase) داینامیک -->
    <section class="max-w-6xl mx-auto px-4 mb-20">
      <div class="relative rounded-[3rem] overflow-hidden p-12 bg-white/20">
        <img src="/images/bg-services.png" class="absolute inset-0 w-[1105px] object-cover z-0 " />

        <div class="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div class="flex-1 w-full">
            <img 
                :key="currentContent.image" 
                :src="currentContent.image" 
                :alt="currentContent.title"
                class="w-[506px] h-[386px] object-cover rounded-tl-[17px] rounded-br-[17px] rounded-tr-[65px] rounded-bl-[65px] shadow-xl transition-all duration-500" 
              />
          </div>
          
          <div class="flex-1 text-black mr-[50px]">
            <h2 class="text-[26px] font-bold mb-6 text-[#0F184B]">{{ currentContent.title }}</h2>
            <p class="leading-[40px] mb-8 opacity-90 text-[#0F184B] font-roboto text-[14px]">{{ currentContent.description }}</p>
            <NuxtLink to="/order/requestProject">
              <button class="bg-[#ECD0A0] border-[0.5px] border-gray-300 text-[#0F184B] w-[268px] h-[48px] font-bold px-8 rounded-[16px] hover:scale-105 transition-allshadow-lg text-[20px] mt-[50px] flex items-center justify-center">
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
import { ref, computed, watch } from 'vue';

// --- وضعیت‌های اصلی ---
const activeCategory = ref('طراحی سایت');
const currentIndex = ref(0);
const categories = ['طراحی سایت', 'تولید محتوا', 'برگزاری ایونت'];

// --- محتوای متنی و تصویری (Dynamic Content) ---
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

// --- لیست پروژه‌ها ---
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

// --- کامپیوتدها ---
const currentContent = computed(() => contentMap[activeCategory.value]);
const filteredProjects = computed(() => projects.filter(p => p.category === activeCategory.value));

// محاسبه تعداد صفحات بر اساس ۴ آیتم در هر اسلاید
const totalSlides = computed(() => Math.ceil(filteredProjects.value.length / 4));

// منطق چرخشی (Loop) برای نمایش پروژه‌ها در صفحه جاری
const visibleProjects = computed(() => {
  const all = filteredProjects.value;
  if (all.length === 0) return [];
  
  const start = currentIndex.value * 4;
  const result = [];
  
  for (let i = 0; i < 4; i++) {
    const index = (start + i) % all.length;
    result.push(all[index]);
  }
  return result;
});

// --- توابع اسلایدر ---
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

// ریست کردن ایندکس در هنگام تغییر دسته بندی
watch(activeCategory, () => {
  currentIndex.value = 0;
});
</script>