<script setup>
import { ref, computed } from 'vue';

const { getProjectsByType } = useProjects();
const projects = computed(() => getProjectsByType('content'));

const currentIndex = ref(0);

// محاسبه ۴ آیتم قابل نمایش به صورت چرخشی
const visibleProjects = computed(() => {
  const items = [];
  const total = projects.value.length;
  
  // اگر دیتایی وجود نداشت، آرایه خالی برگردان
  if (total === 0) return [];

  for (let i = 0; i < 4; i++) {
    // فرمول چرخشی: (ایندکس فعلی + i) تقسیم بر تعداد کل پروژه‌ها
    const index = (currentIndex.value + i) % total;
    items.push(projects.value[index]);
  }
  return items;
});

// منطق اسلایدر برای لوپ
const nextSlide = () => {
  if (projects.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % projects.value.length;
  }
};

const prevSlide = () => {
  if (projects.value.length > 0) {
    // برای جلوگیری از مقدار منفی، طول آرایه را اضافه می‌کنیم
    currentIndex.value = (currentIndex.value - 1 + projects.value.length) % projects.value.length;
  }
};
</script>

<template>
  <div class="min-h-screen bg-cover bg-center py-10 -mt-[70px]">
    <div class="max-w-6xl mx-auto">
      <h1 class="bg-[#BFD1D5] w-[178px] h-[43px] text-[#0F184B] text-[18px] rounded-[19px] shadow-sm flex items-center justify-center mt-[100px]">
        تولید محتوا
      </h1>
      
      <!-- نمایش لیست داینامیک -->
      <div class="flex justify-center gap-[70px] h-80 mt-[50px]">
        <div v-for="(card, index) in visibleProjects" :key="card.id"
             class="w-[312px] h-[358px] bg-white rounded-[40px] shadow-lg cursor-pointer transition-all hover:scale-105"
             :class="[index % 2 !== 0 ? 'mt-12' : '']">
             
          <!-- هدایت به صفحه جزئیات با استفاده از ID -->
          <NuxtLink :to="`/order/${card.id}`">
            <!-- نمایش اولین عکس از آرایه تصاویر پروژه -->
            <img :src="card.images[1]" 
                 class="w-[312px] h-[358px] object-cover rounded-[40px]" 
                 :alt="card.title" />
          </NuxtLink>
        </div>
      </div>

      <!-- دکمه‌های اسلایدر -->
      <div class="flex justify-center gap-4 z-20 mt-[130px]">
        <SliderButton direction="left" @click="prevSlide" />
        <SliderButton direction="right" @click="nextSlide" />
      </div>
    </div>
  </div>
</template>