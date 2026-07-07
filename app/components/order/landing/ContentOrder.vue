<script setup>
import { ref, computed } from 'vue';
const { getProjectsByType } = useProjects();
const projects = computed(() => getProjectsByType('content'));
const currentIndex = ref(0);

// محاسبه ۴ آیتم قابل نمایش به صورت چرخشی (تبلت/دسکتاپ)
const visibleProjects = computed(() => {
  const items = [];
  const total = projects.value.length;
  if (total === 0) return [];
  for (let i = 0; i < 4; i++) {
    const index = (currentIndex.value + i) % total;
    items.push(projects.value[index]);
  }
  return items;
});

// آیتم‌های موبایل (قبلی - جاری - بعدی)
const mobileVisibleProjects = computed(() => {
  const total = projects.value.length;
  if (total === 0) return [];
  const items = [];
  for (let i = -1; i <= 1; i++) {
    const index = (currentIndex.value + i + total) % total;
    items.push(projects.value[index]);
  }
  return items;
});

const nextSlide = () => {
  if (projects.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % projects.value.length;
  }
};
const prevSlide = () => {
  if (projects.value.length > 0) {
    currentIndex.value = (currentIndex.value - 1 + projects.value.length) % projects.value.length;
  }
};
</script>

<template>
<div class=" bg-center py-10 md:py-14 xl:py-16 xl:-mt-[70px]">
      <div class="max-w-6xl mx-auto px-4 xl:px-0">
      <h1
        class="ml-auto bg-[#BFD1D5] w-[140px] h-[36px] text-[14px] md:w-[160px] md:h-[40px] md:text-[16px] xl:w-[178px] xl:h-[43px] xl:text-[18px] text-[#0F184B] rounded-[19px] shadow-sm flex items-center justify-center mt-[50px] md:mt-[70px] xl:mt-[100px]"
      >
        تولید محتوا
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
              :src="card.images[1]"
              class="w-[220px] h-[252px] object-cover rounded-[30px] shadow-lg"
              :alt="card.title"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- تبلت و دسکتاپ: نمایش لیست داینامیک (طرح اصلی) -->
      <div
        class="hidden md:flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-6 xl:gap-[70px] xl:h-80 mt-8 md:mt-10 xl:mt-[50px]"
      >
        <div
          v-for="(card, index) in visibleProjects"
          :key="card.id"
          class="w-full max-w-[312px] aspect-[312/358] md:w-[240px] md:h-[280px] md:aspect-auto xl:w-[312px] xl:h-[358px] bg-white rounded-[30px] xl:rounded-[40px] shadow-lg cursor-pointer transition-all hover:scale-105"
          :class="[
            index >= 3 ? 'md:hidden xl:block' : '',
            index % 2 !== 0 ? 'xl:mt-12' : '',
          ]"
        >
          <NuxtLink :to="`/order/${card.id}`">
            <img
              :src="card.images[1]"
              class="w-full h-full object-cover rounded-[30px] xl:rounded-[40px]"
              :alt="card.title"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- دکمه‌های اسلایدر -->
      <div class="flex justify-center gap-4 z-20 mt-8 md:mt-10 xl:mt-[130px]">
        <SliderButton direction="left" @click="prevSlide" />
        <SliderButton direction="right" @click="nextSlide" />
      </div>
    </div>
  </div>
</template>