<template>
  <div class=" min-h-screen py-10 " dir="rtl">

    <!-- ۲. بخش تب‌ها و پروژه‌ها با منطق اسلایدر -->
    <section class="max-w-6xl min-[1920px]:max-w-[1600px] mx-auto py-8 lg:py-16 px-4">
<div class="flex justify-center mb-8 lg:mb-10 px-2">
  <div class="w-full max-w-[846px] lg:w-[846px] min-[1920px]:w-[1000px] h-auto lg:h-[59px] min-[1920px]:h-[72px] bg-white dark:bg-dark-input rounded-[30px] lg:rounded-[48px] p-1 shadow-sm dark:shadow-none dark:ring-1 dark:ring-dark-border border border-gray-100 dark:border-transparent flex flex-nowrap items-center justify-center gap-1 sm:gap-2 overflow-hidden">

    <button 
      v-for="category in categories" :key="category"
      @click="activeCategory = category; currentIndex = 0"
      :class="[
        'flex-1 min-w-0 px-1 sm:px-4 lg:px-8 py-1.5 lg:py-3 lg:w-[178px] min-[1920px]:w-[210px] h-auto lg:h-[43px] min-[1920px]:h-[54px] rounded-[14px] lg:rounded-[19px] text-[10px] xs:text-[11px] sm:text-[15px] lg:text-[18px] min-[1920px]:text-[20px] font-bold transition-all duration-300 truncate whitespace-nowrap',
        activeCategory === category 
          ? 'bg-[#2C7379] dark:bg-dark-accent text-white dark:text-dark-text-deep shadow-md'
          : ' text-[#0F184B] dark:text-dark-text-deep hover:bg-slate-200 dark:hover:bg-dark-accent/20'
      ]"
    >
      {{ category }}
    </button>

  </div>
</div>

<div class="max-w-6xl min-[1920px]:max-w-[1600px] mx-auto px-4 py-4 lg:py-8 -mt-[20px]" dir="rtl">
  <div class="flex flex-row items-center justify-between gap-2">

    <h2 class="text-[15px] sm:text-[20px] lg:text-[28px] min-[1920px]:text-[32px] font-roboto text-[#0F184B] dark:text-dark-text font-normal">
      پیش نمایش از پروژه ها
    </h2>

<NuxtLink
  to="/order/moreProject"
  class="bg-[#2C7379] dark:bg-dark-accent px-4 sm:w-[147px] min-[1920px]:w-[170px] h-[30px] sm:h-[45px] min-[1920px]:h-[52px] text-white dark:text-dark-text-deep rounded-[14px] sm:rounded-[19px] text-[11px] sm:text-[17px] min-[1920px]:text-[19px] font-medium transition-all hover:bg-[#2C7379] dark:hover:bg-dark-accent-hover flex items-center justify-center gap-2 shadow-md font-roboto whitespace-nowrap overflow-hidden"
>
  <span>مشاهده بیشتر</span>

  <div class="w-4 h-4 flex items-center justify-center flex-shrink-0">
    <HomeIconsMoreArrow class="w-full h-full" />
  </div>
</NuxtLink>

  </div>
</div>
      <!-- گرید پروژه‌ها -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 min-[1920px]:gap-8">
  <div v-for="project in visibleProjects" :key="project.id" 
       class="relative w-full lg:w-[250px] min-[1920px]:w-[300px] h-[220px] sm:h-[280px] lg:h-[350px] min-[1920px]:h-[420px] bg-white dark:bg-dark-input rounded-[24px] lg:rounded-[48px] border-[1px] border-gray-300 dark:border-dark-border shadow-lg dark:shadow-none hover:shadow-2xl dark:hover:ring-1 dark:hover:ring-dark-accent transition-all duration-300 overflow-hidden group">

      <NuxtLink :to="`/order/${project.slug}`">
      <img :src="resumeCover(project)" class="w-full h-[214px] sm:h-[274px] lg:w-[250px] lg:h-[344px] min-[1920px]:w-[300px] min-[1920px]:h-[414px] object-cover" />
      
      <div class="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/60 dark:bg-dark-surface/70 p-3 lg:p-5 min-[1920px]:p-6 border-t border-white/30 dark:border-dark-border/30 text-center">
        <h3 class="text-[#0F184B] dark:text-dark-text font-bold text-[14px] sm:text-[16px] lg:text-[20px] min-[1920px]:text-[22px]">{{ project.title }}</h3>
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
               :class="['h-2 rounded-full transition-all', currentIndex === i-1 ? 'w-8 bg-[#081035] dark:bg-dark-gold' : 'w-2 bg-slate-300 dark:bg-dark-border']">
          </div>
        </div>
      </div>
    </section>

    <!-- ۱. بخش شوکیس (Showcase) داینامیک -->
<section class="max-w-6xl min-[1920px]:max-w-[1600px] mx-auto px-4 mb-12 xl:mb-20">
  <div class="relative rounded-[2rem] xl:rounded-[3rem] overflow-hidden p-6 xl:p-12 min-[1920px]:p-16 bg-[#67A9A8] dark:bg-dark-bg xl:bg-white/20 dark:xl:bg-dark-bg">

    <!-- عکس پس‌زمینه فقط در دسکتاپ -->
    <img src="/images/bg-services.png" class="hidden xl:block absolute inset-0 w-[1105px] min-[1920px]:w-full object-cover z-0" />

    <div class="relative z-10 flex flex-col xl:flex-row items-center gap-6 xl:gap-12 min-[1920px]:gap-16 min-[1920px]:flex-nowrap">
      <div class="flex-1 w-full">
        <img 
            :key="currentContent.image" 
            :src="currentContent.image" 
            :alt="currentContent.title"
            class="w-full h-[220px] xl:w-[506px] xl:h-[386px] min-[1920px]:w-[650px] min-[1920px]:h-[480px] object-cover rounded-tl-[17px] rounded-br-[17px] rounded-tr-[65px] rounded-bl-[65px] shadow-xl dark:shadow-none dark:ring-1 dark:ring-dark-border transition-all duration-500" 
          />
      </div>
      
      <div class="flex-1 min-w-0 min-[1920px]:max-w-[620px] text-black dark:text-dark-text xl:mr-[50px] text-center xl:text-right">
        <h2 class="text-[20px] xl:text-[26px] min-[1920px]:text-[32px] font-bold mb-4 xl:mb-6 min-[1920px]:mb-8 text-[#0F184B] dark:text-dark-text lg:mt-3">{{ currentContent.title }}</h2>
        <p class="leading-[26px] xl:leading-[40px] min-[1920px]:leading-[42px] mb-6 xl:mb-8 min-[1920px]:mb-10 opacity-90 text-[#0F184B] dark:text-dark-text/90 font-roboto text-[13px] xl:text-[14px] min-[1920px]:text-[20px] min-[1920px]:font-bold">{{ currentContent.description }}</p>
        <NuxtLink :to="currentContent.buttonLink">
          <button class="bg-[#ECD0A0] dark:bg-dark-gold border-[0.5px] border-gray-300 dark:border-dark-border text-[#0F184B] dark:text-dark-text-deep w-full max-w-[268px] mx-auto xl:mx-0 xl:w-[268px] min-[1920px]:w-[320px] h-[48px] min-[1920px]:h-[58px] font-bold px-8 rounded-[16px] hover:scale-105 transition-allshadow-lg text-[18px] xl:text-[20px] min-[1920px]:text-[22px] mt-6 xl:mt-[50px] flex items-center justify-center">
            {{ currentContent.buttonText }}
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const categoryMap = {
  'طراحی سایت': 'web',
  'تولید محتوا': 'content',
  'برگزاری ایونت': 'event', // <-- جدید
}
const categories = Object.keys(categoryMap)

const activeCategory = ref('طراحی سایت')
const activeType = computed(() => categoryMap[activeCategory.value])
const { items, pending } = useResumes(activeType)

const currentIndex = ref(0)
const itemsPerPage = ref(4)

const updateItemsPerPage = () => {
  itemsPerPage.value = window.innerWidth < 1024 ? 2 : 4
}
onMounted(() => {
  updateItemsPerPage()
  window.addEventListener('resize', updateItemsPerPage)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerPage)
})

// محتوای متنی شوکیس - استاتیک، بخشی از UI نه دیتای رزومه
const contentMap = {
  'طراحی سایت': {
    title: 'طراحی سایت',
    description: 'با برگزاری ایونت‌های حرفه‌ای و هدفمند، فضایی برای ایجاد ارتباطات ارزشمند، یادگیری، تعامل و تجربه‌ای متفاوت فراهم می‌کنیم. از ایده‌پردازی و برنامه‌ریزی اولیه گرفته تا هماهنگی جزئیات و اجرای نهایی، هدف ما خلق رویدادهایی منظم، جذاب و تأثیرگذار است که علاوه بر پاسخ‌گویی به اهداف برگزارکنندگان، تجربه‌ای به‌یادماندنی و لذت‌بخش برای شرکت‌کنندگان رقم بزنند و زمینه‌ساز شکل‌گیری ارتباطات و فرصت‌های جدید باشند.',
    image: '/images/img-services.png',
    buttonText: 'درخواست طراحی سایت',
    buttonLink: '/order/requestProject',
  },
  'تولید محتوا': {
    title: 'تولید محتوا',
    description: 'با برگزاری ایونت‌های حرفه‌ای و هدفمند، فضایی برای ایجاد ارتباطات ارزشمند، یادگیری، تعامل و تجربه‌ای متفاوت فراهم می‌کنیم. از ایده‌پردازی و برنامه‌ریزی اولیه گرفته تا هماهنگی جزئیات و اجرای نهایی، هدف ما خلق رویدادهایی منظم، جذاب و تأثیرگذار است که علاوه بر پاسخ‌گویی به اهداف برگزارکنندگان، تجربه‌ای به‌یادماندنی و لذت‌بخش برای شرکت‌کنندگان رقم بزنند و زمینه‌ساز شکل‌گیری ارتباطات و فرصت‌های جدید باشند.',
    image: '/images/img-services.png',
    buttonText: 'درخواست تولید محتوا',
    buttonLink: '/order/requestProject',
  },
  'برگزاری ایونت': { 
    title: 'برگزاری ایونت',
    description: 'با برگزاری ایونت‌های حرفه‌ای و هدفمند، فضایی برای ایجاد ارتباطات ارزشمند، یادگیری، تعامل و تجربه‌ای متفاوت فراهم می‌کنیم. از ایده‌پردازی و برنامه‌ریزی اولیه گرفته تا هماهنگی جزئیات و اجرای نهایی، هدف ما خلق رویدادهایی منظم، جذاب و تأثیرگذار است که علاوه بر پاسخ‌گویی به اهداف برگزارکنندگان، تجربه‌ای به‌یادماندنی و لذت‌بخش برای شرکت‌کنندگان رقم بزنند و زمینه‌ساز شکل‌گیری ارتباطات و فرصت‌های جدید باشند.',
    image: '/images/img-services.png',
    buttonText: 'درخواست برگزاری ایونت',
    buttonLink: '/order/requestProject',
  },
}

const currentContent = computed(() => contentMap[activeCategory.value])

const totalSlides = computed(() => Math.ceil(items.value.length / itemsPerPage.value))

const visibleProjects = computed(() => {
  const all = items.value
  if (all.length === 0) return []
  const start = currentIndex.value * itemsPerPage.value
  const result = []
  for (let i = 0; i < itemsPerPage.value; i++) {
    result.push(all[(start + i) % all.length])
  }
  return result
})

const nextSlide = () => {
  if (totalSlides.value > 0) currentIndex.value = (currentIndex.value + 1) % totalSlides.value
}
const prevSlide = () => {
  if (totalSlides.value > 0) currentIndex.value = (currentIndex.value - 1 + totalSlides.value) % totalSlides.value
}

watch(activeCategory, () => {
  currentIndex.value = 0
})
</script>