<template>
  <div class="min-h-screen py-6 sm:py-8 lg:py-10 bg-[#FAF9F6] dark:bg-dark-bg" dir="rtl">

    <section class="max-w-6xl mx-auto px-4 text-center mt-[50px]">
      <h1 class="text-[22px] sm:text-[26px] lg:text-[32px] font-bold text-[#0F184B] dark:text-dark-text mb-3 sm:mb-4 lg:mb-6">نمونه پروژه‌ها</h1>
      <p class="text-[#747893] dark:text-dark-text/80 text-[13px] sm:text-[14px] lg:text-base mb-6 sm:mb-8 lg:mb-10">مروری بر پروژه‌های اجرا شده و نمونه کارهای ما</p>

      <!--
        فیلتر واقعیه: با انتخاب هر تب، category_id متناظر به GET /api/resumes
        فرستاده می‌شه. «مشاهده همه» یعنی category_id اصلاً فرستاده نشه (لیست کامل).
      -->
      <div class="flex justify-center mb-8 lg:mb-10 px-2">
        <div class="w-full max-w-[846px] lg:w-[846px] h-auto lg:h-[59px] bg-white dark:bg-dark-input rounded-[30px] lg:rounded-[48px] p-1 shadow-sm border border-gray-100 dark:border-dark-border flex flex-nowrap items-center justify-center gap-1 sm:gap-2 overflow-hidden">
          <button
            v-for="category in ['مشاهده همه', ...categories]" :key="category"
            @click="activeCategory = category"
            :class="[
              'flex-1 min-w-0 px-1 sm:px-4 lg:px-8 py-1.5 lg:py-3 lg:w-[178px] h-auto lg:h-[43px] rounded-[14px] lg:rounded-[19px] text-[10px] xs:text-[11px] sm:text-[15px] lg:text-[18px] font-bold transition-all duration-300 truncate whitespace-nowrap',
              activeCategory === category
                ? 'bg-[#2C7379] dark:bg-dark-accent text-white dark:text-dark-text-deep shadow-md'
                : 'text-[#0F184B] dark:text-dark-text-deep hover:bg-slate-200 dark:hover:bg-dark-surface/40'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 pb-12 sm:pb-16 lg:pb-20">
      <h2 class="text-[17px] sm:text-[20px] lg:text-[28px] font-normal text-[#0F184B] dark:text-dark-text mb-5 sm:mb-6 lg:mb-8">پیش نمایش از پروژه ها</h2>

      <div v-if="pending" class="text-center py-20 text-[#747893] dark:text-dark-text">در حال بارگذاری...</div>
      <div v-else-if="error" class="text-center py-20 text-red-500 dark:text-red-400">خطا در دریافت اطلاعات پروژه‌ها</div>
      <div v-else-if="items.length === 0" class="text-center py-20 text-[#747893] dark:text-dark-text">پروژه‌ای یافت نشد</div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 min-h-0 lg:min-h-[700px]">
        <NuxtLink
          v-for="project in visibleProjects"
          :key="project.slug"
          :to="`/order/${project.slug}`"
          class="group relative w-full h-[160px] sm:h-[220px] lg:h-[350px] bg-white dark:bg-dark-input rounded-[20px] sm:rounded-[28px] lg:rounded-[48px] border border-gray-200 dark:border-dark-border shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          <img :src="resumeCover(project)" :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

          <div class="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/70 dark:bg-dark-input/70 p-2.5 sm:p-3.5 lg:p-5 border-t border-white/30 dark:border-dark-border/30 text-center">
            <h3 class="text-[#0F184B] dark:text-dark-text-deep font-bold text-[12px] sm:text-[15px] lg:text-[20px] truncate">{{ project.title }}</h3>
            <p class="text-[9px] sm:text-[11px] lg:text-[14px] text-gray-600 dark:text-dark-text-deep/80 truncate">توضیحات و نام پروژه</p>
          </div>
        </NuxtLink>
      </div>

      <div v-if="!pending && !error" class="flex items-center justify-between mt-8 sm:mt-10 lg:mt-12 px-4 max-w-6xl mx-auto">
        <div class="flex gap-2 sm:gap-3 lg:gap-4 z-20">
          <SliderButton direction="left" @click="prevSlide" />
          <SliderButton direction="right" @click="nextSlide" />
        </div>

        <div class="flex gap-1.5 sm:gap-2">
          <div v-for="i in (totalSlides || 1)" :key="i"
               @click="currentIndex = i - 1"
               :class="[
                 'h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer',
                 currentIndex === i - 1 ? 'w-7 sm:w-10 bg-[#0F184B] dark:bg-dark-accent' : 'w-2 sm:w-2.5 bg-slate-300 dark:bg-dark-border'
               ]">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { RESUME_CATEGORY_IDS } from '@/composables/useResumes'

// نگاشت عنوان تب به category_id واقعی که به API فرستاده می‌شه
const categoryMap = {
  'طراحی سایت': RESUME_CATEGORY_IDS.web,
  'تولید محتوا': RESUME_CATEGORY_IDS.content,
  'برگزاری ایونت': RESUME_CATEGORY_IDS.event,
}
const categories = Object.keys(categoryMap)

const activeCategory = ref('مشاهده همه')

// وقتی «مشاهده همه» انتخابه، null می‌فرستیم (یعنی بدون فیلتر)؛
// در غیر این صورت category_id متناظر با تب انتخاب‌شده
const activeCategoryId = computed(() =>
  activeCategory.value === 'مشاهده همه' ? null : categoryMap[activeCategory.value]
)

const { items, pending, error } = useResumes(activeCategoryId)

const currentIndex = ref(0)
const itemsPerPage = 12

// با تغییر دسته‌بندی، useResumes به‌صورت خودکار (چون activeCategoryId ریشه‌ی
// reactive داره) درخواست جدید می‌زنه؛ اینجا فقط اسلایدر رو ریست می‌کنیم
watch(activeCategory, () => {
  currentIndex.value = 0
})

const totalSlides = computed(() => Math.ceil(items.value.length / itemsPerPage))

const visibleProjects = computed(() => {
  const start = currentIndex.value * itemsPerPage
  return items.value.slice(start, start + itemsPerPage)
})

const nextSlide = () => {
  if (currentIndex.value < totalSlides.value - 1) currentIndex.value++
  else currentIndex.value = 0
}

const prevSlide = () => {
  if (currentIndex.value > 0) currentIndex.value--
  else currentIndex.value = totalSlides.value - 1
}
</script>