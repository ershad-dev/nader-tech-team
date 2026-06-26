<script setup>
import { ref, computed } from 'vue';

// ۱. فراخوانی داده‌ها از composable
const { getProjectsByType } = useProjects();

// ۲. فیلتر کردن پروژه‌های نوع content
const projects = computed(() => getProjectsByType('content'));

const currentIndex = ref(0);

// ۳. محاسبه پروژه‌های قابل نمایش در اسلایدر (۴ تایی)
const visibleProjects = computed(() => {
  return projects.value.slice(currentIndex.value, currentIndex.value + 4);
});

// ۴. منطق اسلایدر
const nextSlide = () => { 
  if (currentIndex.value < projects.value.length - 4) currentIndex.value++; 
};
const prevSlide = () => { 
  if (currentIndex.value > 0) currentIndex.value--; 
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