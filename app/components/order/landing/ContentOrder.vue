<script setup>
import { ref, computed } from 'vue'

const { items: projects, pending, error } = useResumes('content')
const currentIndex = ref(0)

const visibleProjects = computed(() => {
  const total = projects.value.length
  if (total === 0) return []
  const items = []
  for (let i = 0; i < 4; i++) items.push(projects.value[(currentIndex.value + i) % total])
  return items
})

const mobileVisibleProjects = computed(() => {
  const total = projects.value.length
  if (total === 0) return []
  const items = []
  for (let i = -1; i <= 1; i++) items.push(projects.value[(currentIndex.value + i + total) % total])
  return items
})

const nextSlide = () => {
  if (projects.value.length > 0) currentIndex.value = (currentIndex.value + 1) % projects.value.length
}
const prevSlide = () => {
  if (projects.value.length > 0) currentIndex.value = (currentIndex.value - 1 + projects.value.length) % projects.value.length
}

// --- Swipe support (mobile) ---
const touchStartX = ref(0)
const touchEndX = ref(0)
const SWIPE_THRESHOLD = 50 // حداقل جابجایی (px) برای تشخیص سواپ

const handleTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX
  const diff = touchStartX.value - touchEndX.value

  if (Math.abs(diff) < SWIPE_THRESHOLD) return

  // چون در RTL هستیم، جهت سواپ رو معکوس در نظر می‌گیریم
  if (diff > 0) {
    prevSlide()
  } else {
    nextSlide()
  }
}
</script>

<template>
  <div class="bg-center py-10 md:py-14 xl:py-16 xl:-mt-[70px] min-[1920px]:py-20 min-[1920px]:-mt-[90px]">
    <div class="max-w-6xl mx-auto px-4 xl:px-0 min-[1920px]:max-w-[1600px]">
      <h1
        class="ml-auto bg-[#BFD1D5] w-[140px] h-[36px] text-[14px] md:w-[160px] md:h-[40px] md:text-[16px] xl:w-[178px] xl:h-[43px] xl:text-[18px] text-[#0F184B] rounded-[19px] shadow-sm flex items-center justify-center mt-[50px] md:mt-[70px] xl:mt-[100px] min-[1920px]:w-[200px] min-[1920px]:h-[48px] min-[1920px]:text-[20px] min-[1920px]:mt-[130px]"
      >
        تولید محتوا
      </h1>

      <!-- حالت لودینگ / خطا / خالی -->
      <div v-if="pending" class="text-center text-[#747893] mt-10">در حال بارگذاری...</div>
      <div v-else-if="error" class="text-center text-red-500 mt-10">خطا در دریافت پروژه‌ها</div>
      <div v-else-if="projects.length === 0" class="text-center text-[#747893] mt-10">پروژه‌ای یافت نشد</div>

      <template v-else>
      <!-- موبایل: کارت وسط بزرگ + کارت‌های قبلی/بعدی نیمه‌پیدا + سواپ با انگشت -->
      <div
        class="relative flex md:hidden items-center justify-center h-[280px] mt-8 overflow-hidden touch-pan-y"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <div
          v-for="(card, index) in mobileVisibleProjects"
          :key="card.slug"
          class="absolute transition-all duration-500 ease-out"
          :class="[
            index === 1
              ? 'z-20 scale-100 opacity-100 translate-x-0'
              : index === 0
                ? 'z-10 scale-75 opacity-40 -translate-x-[105px]'
                : 'z-10 scale-75 opacity-40 translate-x-[105px]'
          ]"
        >
          <NuxtLink :to="`/order/${card.slug}`">
            <img
              :src="resumeCover(card)"
              class="w-[220px] h-[252px] object-cover rounded-[30px] shadow-lg select-none pointer-events-none"
              :alt="card.title"
              draggable="false"
            />
          </NuxtLink>
        </div>
      </div>

      <!--
        تبلت و دسکتاپ: گرید نسبی (fr-based) به‌جای عرض ثابت پیکسلی.
        md/lg (۷۶۸ تا ۱۲۷۹ - iPad mini/Air/Pro در پرتره و لندسکیپ): ۳ ستون
        xl/2xl (۱۲۸۰ به بالا): ۴ ستون
        min-[1920px]: تنظیمات اختصاصی برای مانیتورهای Full HD (۱۹۲۰x۱۰۸۰ / ۱۹۲۰x۱۰۲۴)
      -->
      <div
        class="hidden md:grid grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 xl:gap-8 2xl:gap-[60px] justify-items-center mt-8 md:mt-10 xl:mt-[50px] min-[1920px]:gap-[80px] min-[1920px]:mt-[70px]"
      >
<div
  v-for="(card, index) in visibleProjects"
  :key="card.slug"
  class="w-full max-w-[200px] md:max-w-[220px] lg:max-w-[250px] xl:max-w-[280px] 2xl:max-w-[312px] min-[1920px]:max-w-[340px] aspect-[312/358] bg-white rounded-[30px] xl:rounded-[40px] shadow-lg cursor-pointer transition-all duration-300 hover:scale-105"
  :class="[
    index >= 3 ? 'hidden xl:block' : '',
    index % 2 === 0
      ? 'md:-translate-y-4 xl:-translate-y-6 min-[1920px]:-translate-y-8'
      : 'md:translate-y-4 xl:translate-y-6 min-[1920px]:translate-y-8'
  ]"
>
  <NuxtLink :to="`/order/${card.slug}`">
    <img
      :src="resumeCover(card)"
      class="w-full h-full object-cover rounded-[30px] xl:rounded-[40px]"
      :alt="card.title"
    />
  </NuxtLink>
</div>
      </div>
      </template>

      <!-- دکمه‌های اسلایدر: فقط در تبلت و دسکتاپ نمایش داده می‌شن -->
      <div class="hidden md:flex justify-center gap-4 z-20 mt-8 md:mt-10 xl:mt-[130px] min-[1920px]:mt-[160px] min-[1920px]:gap-6">
        <SliderButton direction="left" @click="prevSlide" />
        <SliderButton direction="right" @click="nextSlide" />
      </div>
    </div>
  </div>
</template>