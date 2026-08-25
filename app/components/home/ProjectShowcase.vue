<template>
  <div class="min-h-screen py-10 -mb-[50px]" :dir="isRtl ? 'rtl' : 'ltr'">

    <!-- بخش تب‌ها و گرید پروژه‌ها همراه با اسلایدر -->
    <section class="max-w-6xl min-[1920px]:max-w-[1600px] mx-auto py-8 lg:py-16 px-4">
      <div class="flex justify-center mb-8 lg:mb-10 px-2">
        <div class="w-full max-w-[846px] lg:w-[846px] min-[1920px]:w-[1000px] h-[52px] sm:h-[59px] min-[1920px]:h-[72px] bg-white dark:bg-dark-input rounded-[22px] lg:rounded-[48px] p-1.5 shadow-sm dark:shadow-none dark:ring-1 dark:ring-dark-border border border-gray-100 dark:border-transparent flex flex-nowrap items-center justify-center gap-1 sm:gap-2 overflow-hidden">

          <button 
            v-for="category in categories" :key="category.key"
            @click="activeCategory = category.key; currentIndex = 0"
            :class="[
              'flex-1 min-w-0 px-2 sm:px-4 lg:px-8 py-2 lg:py-3 lg:w-[178px] min-[1920px]:w-[210px] h-[44px] sm:h-auto lg:h-[43px] min-[1920px]:h-[54px] rounded-[16px] lg:rounded-[19px] text-[13px] xs:text-[14px] sm:text-[15px] lg:text-[18px] min-[1920px]:text-[20px] font-bold transition-all duration-300 truncate whitespace-nowrap',
              activeCategory === category.key
                ? 'bg-[#2C7379] dark:bg-[#407B80] text-white dark:text-white shadow-md'
                : ' text-[#0F184B] dark:text-white hover:bg-slate-200 dark:hover:bg-dark-accent/70'
            ]"
          >
            {{ $t(category.labelKey) }}
          </button>

        </div>
      </div>

      <div class="max-w-6xl min-[1920px]:max-w-[1600px] mx-auto px-4 py-4 lg:py-8 -mt-[20px]" :dir="isRtl ? 'rtl' : 'ltr'">
        <div class="flex flex-row items-center justify-between gap-2">

          <h2 class="text-[15px] sm:text-[20px] lg:text-[28px] min-[1920px]:text-[32px] font-roboto text-[#0F184B] dark:text-dark-text font-normal">
            {{ $t('home.projects.previewTitle') }}
          </h2>

          <NuxtLink
            :to="localePath('/order/moreProject')"
            class="bg-[#2C7379] dark:bg-dark-accent px-4 sm:w-[147px] min-[1920px]:w-[170px] h-[30px] sm:h-[45px] min-[1920px]:h-[52px] text-white dark:text-white rounded-[14px] sm:rounded-[19px] text-[11px] sm:text-[17px] min-[1920px]:text-[19px] font-medium transition-all hover:bg-[#2C7379] dark:hover:bg-dark-accent-hover flex items-center justify-center gap-2 shadow-md font-roboto whitespace-nowrap overflow-hidden"
          >
            <span>{{ $t('home.projects.viewMore') }}</span>

            <div
              class="w-4 h-4 flex items-center justify-center flex-shrink-0"
              :class="isRtl ? '' : 'scale-x-[-1]'"
            >
              <HomeIconsMoreArrow class="w-full h-full" />
            </div>
          </NuxtLink>

        </div>
      </div>

      <!-- گرید پروژه‌های نمایش داده‌شده در صفحه فعلی اسلایدر -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 min-[1920px]:gap-8">
        <div v-for="project in visibleProjects" :key="project.id" 
          class="relative w-full lg:max-w-[250px] min-[1920px]:max-w-[300px] mx-auto h-[220px] sm:h-[280px] lg:h-[350px] min-[1920px]:h-[420px] bg-white dark:bg-dark-input rounded-[24px] lg:rounded-[48px] border-[1px] border-gray-300 dark:border-dark-border shadow-lg dark:shadow-none hover:shadow-2xl dark:hover:ring-1 dark:hover:ring-dark-accent transition-all duration-300 overflow-hidden group">

          <NuxtLink :to="localePath(`/order/${project.slug}`)">
            <img
              :src="resumeCover(project)"
              :alt="resumeAlt(project)"
              class="w-full h-[214px] sm:h-[274px] lg:h-[344px] min-[1920px]:h-[414px] object-cover"
            />

            <div class="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/60 dark:bg-black/30 p-3 lg:p-5 min-[1920px]:p-6 border-t border-white/30 dark:border-dark-border/30 text-center">
              <h3 class="text-[#0F184B] dark:text-dark-text font-bold text-[14px] sm:text-[16px] lg:text-[20px] min-[1920px]:text-[22px]">{{ resumeTitle(project) }}</h3>
            </div>
          </NuxtLink>

        </div>
      </div>

      <!-- دکمه‌های ناوبری و نشانگرهای اسلایدر پروژه‌ها -->
      <div class="flex items-center justify-between mt-8 lg:mt-12 px-2">
        <div class="flex justify-center gap-3 lg:gap-4 z-20">
          <IconsSliderButton direction="left" @click="prevSlide" />
          <IconsSliderButton direction="right" @click="nextSlide" />
        </div>

        <div class="flex gap-2">
          <div v-for="i in totalSlides" :key="i" 
               :class="['h-2 rounded-full transition-all', currentIndex === i-1 ? 'w-8 bg-[#081035] dark:bg-dark-gold' : 'w-2 bg-slate-300 dark:bg-dark-border']">
          </div>
        </div>
      </div>
    </section>

    <!-- بخش شوکیس داینامیک بر اساس دسته‌بندی انتخاب‌شده -->
    <section class="max-w-6xl min-[1920px]:max-w-[1600px] mx-auto px-4 mb-12 lg:mb-20">
      <div class="relative rounded-[2rem] lg:rounded-[3rem] overflow-hidden p-6 lg:p-8 xl:p-12 min-[1920px]:p-16 bg-[#67A9A8] lg:bg-white/20 dark:lg:bg-dark-bg">

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
              class="w-full md:w-[420px] md:mx-auto lg:w-full lg:mx-0 xl:w-[560px] min-[1920px]:w-[650px] aspect-[1500/964] object-cover rounded-tl-[17px] rounded-br-[17px] rounded-tr-[65px] rounded-bl-[65px] shadow-xl dark:shadow-none dark:ring-1 dark:ring-dark-border transition-all duration-500" 
            />
          </div>
          
          <div
            :class="[
              'flex-1 min-w-0 lg:max-w-[50%] xl:max-w-none min-[1920px]:max-w-[620px] text-black dark:text-black text-center lg:mt-0',
              isRtl ? 'lg:mr-0 xl:mr-[50px] lg:text-right' : 'lg:ml-0 xl:ml-[50px] lg:text-left'
            ]"
          >
            <h2 class="text-[26px] lg:text-[30px] xl:text-[34px] min-[1920px]:text-[40px] font-bold mb-4 lg:mb-5 xl:mb-6 min-[1920px]:mb-8 text-[#0F184B] dark:text-black lg:mt-3">{{ currentContent.title }}</h2>

            <p class="leading-[30px] lg:leading-[36px] xl:leading-[44px] min-[1920px]:leading-[48px] mb-6 lg:mb-7 xl:mb-8 min-[1920px]:mb-10 opacity-90 text-[#0F184B] dark:text-black/90 font-roboto text-[16px] lg:text-[17px] xl:text-[18px] min-[1920px]:text-[24px]">{{ currentContent.description }}</p>

            <NuxtLink :to="localePath(currentContent.buttonLink)">
              <button
                :class="[
                  'bg-[#ECD0A0] dark:bg-dark-gold border-[0.5px] border-gray-300 dark:border-dark-border text-[#0F184B] dark:text-[#435056] w-full max-w-[268px] mx-auto lg:mx-0 lg:w-full lg:max-w-[240px] xl:w-[268px] min-[1920px]:w-[320px] h-[48px] min-[1920px]:h-[58px] font-bold px-8 rounded-[16px] hover:scale-105 transition-all shadow-lg mt-6 lg:mt-8 xl:mt-[50px] flex items-center justify-center whitespace-nowrap',
                  activeCategory === 'content'
                    ? 'text-[14px] lg:text-[15px] xl:text-[16px] min-[1920px]:text-[18px]'
                    : 'text-[20px] lg:text-[21px] xl:text-[22px] min-[1920px]:text-[24px]'
                ]"
              >
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

// --- i18n ---
const { locale, localeProperties, t } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

// نگاشت کلید پایدار تب به شناسه واقعی دسته‌بندی
const categoryMap = {
  web: RESUME_CATEGORY_IDS.web,
  content: RESUME_CATEGORY_IDS.content,
  event: RESUME_CATEGORY_IDS.event,
}

// تعریف تب‌های دسته‌بندی و کلید ترجمه هرکدوم
const categories = [
  { key: 'web', labelKey: 'home.services.categories.web' },
  { key: 'content', labelKey: 'home.services.categories.content' },
  { key: 'event', labelKey: 'home.services.categories.event' },
]

const activeCategory = ref('web')
// شناسه واقعی دسته‌بندی فعال برای پاس دادن به useResumes
const activeCategoryId = computed(() => categoryMap[activeCategory.value])
const { items, pending } = useResumes(activeCategoryId)

// انتخاب عنوان پروژه بر اساس زبان فعلی
const resumeTitle = (project) => {
  if (locale.value === 'en' && project.title_en) {
    return project.title_en
  }
  return project.title
}

// انتخاب متن جایگزین تصویر بر اساس زبان فعلی
const resumeAlt = (project) => {
  const cover = project.cover
  if (!cover) return resumeTitle(project)

  if (locale.value === 'en' && cover.alt_en) {
    return cover.alt_en
  }
  return cover.alt || resumeTitle(project)
}

const currentIndex = ref(0)
const itemsPerPage = ref(4)

// تنظیم تعداد آیتم در هر صفحه بر اساس عرض صفحه
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

// محتوای متنی و تصویری شوکیس برای هر دسته‌بندی
const contentMap = computed(() => ({
  web: {
    title: t('home.services.web.title'),
    description: t('home.services.web.description'),
    image: '/images/web-showcase.jpeg',
    buttonText: t('home.services.web.buttonText'),
    buttonLink: '/order/requestProject',
  },
  content: {
    title: t('home.services.content.title'),
    description: t('home.services.content.description'),
    image: '/images/content-showcase.png',
    buttonText: t('home.services.content.buttonText'),
    buttonLink: '/order/requestProject',
  },
  event: {
    title: t('home.services.event.title'),
    description: t('home.services.event.description'),
    image: '/images/event-showcase.png',
    buttonText: t('home.services.event.buttonText'),
    buttonLink: '/order/requestProject',
  },
}))

// محتوای شوکیس متناظر با دسته‌بندی فعال
const currentContent = computed(() => contentMap.value[activeCategory.value])

// تعداد کل صفحات اسلایدر پروژه‌ها
const totalSlides = computed(() => Math.ceil(items.value.length / itemsPerPage.value))

// پروژه‌های قابل نمایش در صفحه فعلی اسلایدر
const visibleProjects = computed(() => {
  const all = items.value
  if (all.length === 0) return []
  const start = currentIndex.value * itemsPerPage.value
  return all.slice(start, start + itemsPerPage.value)
})

// رفتن به صفحه بعدی اسلایدر پروژه‌ها
const nextSlide = () => {
  const total = Math.ceil(items.value.length / itemsPerPage.value)
  if (total > 0) currentIndex.value = (currentIndex.value + 1) % total
}
// رفتن به صفحه قبلی اسلایدر پروژه‌ها
const prevSlide = () => {
  const total = Math.ceil(items.value.length / itemsPerPage.value)
  if (total > 0) currentIndex.value = (currentIndex.value - 1 + total) % total
}

// ریست ایندکس اسلایدر با تغییر دسته‌بندی فعال
watch(activeCategory, () => {
  currentIndex.value = 0
})

// اصلاح ایندکس اسلایدر در صورت خارج شدن از رنج مجاز
watch(totalSlides, (newTotal) => {
  if (currentIndex.value > newTotal - 1) {
    currentIndex.value = 0
  }
})
</script>