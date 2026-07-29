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
          ? 'bg-[#2C7379] dark:bg-[#407B80] text-white dark:text-white shadow-md'
          : ' text-[#0F184B] dark:text-white hover:bg-slate-200 dark:hover:bg-dark-accent/70'
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
  class="bg-[#2C7379] dark:bg-dark-accent px-4 sm:w-[147px] min-[1920px]:w-[170px] h-[30px] sm:h-[45px] min-[1920px]:h-[52px] text-white dark:text-white rounded-[14px] sm:rounded-[19px] text-[11px] sm:text-[17px] min-[1920px]:text-[19px] font-medium transition-all hover:bg-[#2C7379] dark:hover:bg-dark-accent-hover flex items-center justify-center gap-2 shadow-md font-roboto whitespace-nowrap overflow-hidden"
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
      
      <div class="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/60 dark:bg-black/30 p-3 lg:p-5 min-[1920px]:p-6 border-t border-white/30 dark:border-dark-border/30 text-center">
        <h3 class="text-[#0F184B] dark:text-dark-text font-bold text-[14px] sm:text-[16px] lg:text-[20px] min-[1920px]:text-[22px]">{{ project.title }}</h3>
      </div>
    </NuxtLink>

  </div>
</div>

      <!-- کنترل‌های اسلایدر -->
      <div class="flex items-center justify-between mt-8 lg:mt-12 px-2">
<div v-if="totalSlides > 1" class="flex justify-center gap-3 lg:gap-4 z-20">
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
<!-- ۱. بخش شوکیس (Showcase) داینامیک -->
<!-- ۱. بخش شوکیس (Showcase) داینامیک -->
<section class="max-w-6xl min-[1920px]:max-w-[1600px] mx-auto px-4 mb-12 lg:mb-20">
  <div class="relative rounded-[2rem] lg:rounded-[3rem] overflow-hidden p-6 lg:p-8 xl:p-12 min-[1920px]:p-16 bg-[#67A9A8] lg:bg-white/20 dark:lg:bg-dark-bg">

    <!-- عکس پس‌زمینه فقط در دسکتاپ - حالا کاملا فلوئید -->
<!-- عکس پس‌زمینه از ۱۰۲۴ به بعد نمایش داده می‌شه، ولی کاملاً ریسپانسیو -->
<img 
  src="/images/bg-services.png" 
  class="hidden min-[1024px]:block absolute inset-0 w-full h-full object-cover z-0" 
/>
    <div class="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-8 xl:gap-12 min-[1920px]:gap-16 min-[1920px]:flex-nowrap">
      <div class="flex-1 w-full lg:max-w-[45%] xl:max-w-none">
        <img 
            :key="currentContent.image" 
            :src="currentContent.image" 
            :alt="currentContent.title"
            class="w-full h-[220px] lg:h-[280px] xl:w-[506px] xl:h-[386px] min-[1920px]:w-[650px] min-[1920px]:h-[480px] object-cover rounded-tl-[17px] rounded-br-[17px] rounded-tr-[65px] rounded-bl-[65px] shadow-xl dark:shadow-none dark:ring-1 dark:ring-dark-border transition-all duration-500" 
          />
      </div>
      
      <div class="flex-1 min-w-0 lg:max-w-[50%] xl:max-w-none min-[1920px]:max-w-[620px] text-black dark:text-black lg:mr-0 xl:mr-[50px] text-center lg:text-right">
        <h2 class="text-[20px] lg:text-[22px] xl:text-[26px] min-[1920px]:text-[32px] font-bold mb-4 lg:mb-5 xl:mb-6 min-[1920px]:mb-8 text-[#0F184B] dark:text-black lg:mt-3">{{ currentContent.title }}</h2>
        <p class="leading-[26px] lg:leading-[32px] xl:leading-[40px] min-[1920px]:leading-[42px] mb-6 lg:mb-7 xl:mb-8 min-[1920px]:mb-10 opacity-90 text-[#0F184B] dark:text-black/90 font-roboto text-[13px] lg:text-[13px] xl:text-[14px] min-[1920px]:text-[20px] min-[1920px]:font-bold">{{ currentContent.description }}</p>
        <NuxtLink :to="currentContent.buttonLink">
          <button class="bg-[#ECD0A0] dark:bg-[#CCAE7A] border-[0.5px] border-gray-300 dark:border-dark-border text-[#0F184B] dark:text-[#435056] w-full max-w-[268px] mx-auto lg:mx-0 lg:w-full lg:max-w-[240px] xl:w-[268px] min-[1920px]:w-[320px] h-[48px] min-[1920px]:h-[58px] font-bold px-8 rounded-[16px] hover:scale-105 transition-allshadow-lg text-[18px] lg:text-[18px] xl:text-[20px] min-[1920px]:text-[22px] mt-6 lg:mt-8 xl:mt-[50px] flex items-center justify-center">
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
import { RESUME_CATEGORY_IDS } from '@/composables/useResumes'

// نگاشت عنوان تب (برای نمایش و برای contentMap) به شناسه‌ی واقعی دسته‌بندی
// که به API فرستاده می‌شه (category_id)
const categoryMap = {
  'طراحی سایت': RESUME_CATEGORY_IDS.web,
  'تولید محتوا': RESUME_CATEGORY_IDS.content,
  'برگزاری ایونت': RESUME_CATEGORY_IDS.event,
}
const categories = Object.keys(categoryMap)

const activeCategory = ref('طراحی سایت')
// این computed یه رفرنس واکنشی از category_id واقعیه که به useResumes پاس داده می‌شه
const activeCategoryId = computed(() => categoryMap[activeCategory.value])
const { items, pending } = useResumes(activeCategoryId)

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

// --- نسخه دیباگ: totalSlides رو تازه و مستقیم داخل خود تابع محاسبه می‌کنیم
// تا مطمئن بشیم به مقدار stale computed وابسته نیست. لاگ‌ها موقتی‌ان،
// بعد از پیدا کردن علت باگ می‌تونی حذفشون کنی.
const nextSlide = () => {
  const total = Math.ceil(items.value.length / itemsPerPage.value)
  console.log('[nextSlide] before:', currentIndex.value, 'total:', total, 'items:', items.value.length, 'perPage:', itemsPerPage.value)
  if (total > 0) currentIndex.value = (currentIndex.value + 1) % total
  console.log('[nextSlide] after:', currentIndex.value)
}
const prevSlide = () => {
  const total = Math.ceil(items.value.length / itemsPerPage.value)
  console.log('[prevSlide] before:', currentIndex.value, 'total:', total, 'items:', items.value.length, 'perPage:', itemsPerPage.value)
  if (total > 0) currentIndex.value = (currentIndex.value - 1 + total) % total
  console.log('[prevSlide] after:', currentIndex.value)
}

watch(activeCategory, () => {
  currentIndex.value = 0
})

// وقتی totalSlides عوض بشه (چه با تغییر دسته‌بندی، چه با resize که itemsPerPage
// رو تغییر می‌ده)، اگه currentIndex از رنج جدید خارج شده باشه، ریستش می‌کنیم.
watch(totalSlides, (newTotal) => {
  if (currentIndex.value > newTotal - 1) {
    currentIndex.value = 0
  }
})
</script>