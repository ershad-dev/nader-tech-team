<script setup>
import { ref, computed } from 'vue';

const projects = ref([
  { id: 1, title: 'پروژه ۱', img: '/images/content1.jpg', name: 'مشتری ۱', comment: '«همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود. از همان جلسات اولیه، نیازها و اهداف ما به‌خوبی درک شد و تمام مراحل پروژه با برنامه‌ریزی دقیق پیش رفت. کیفیت اجرای کار، سرعت پاسخگویی و توجه به جزئیات باعث شد نتیجه نهایی حتی بهتر از انتظارات ما باشد. از همکاری با این تیم بسیار رضایت داریم و قطعاً در پروژه‌های آینده نیز از خدمات آن‌ها استفاده خواهیم کرد.»' },
  { id: 2, title: 'پروژه ۲', img: '/images/content2.jpg', name: 'مشتری ۲', comment: 'بسیار خوب' },
  { id: 3, title: 'پروژه ۳', img: '/images/content-service.jpg', name: 'مشتری ۳', comment: 'راضی هستم' },
  { id: 4, title: 'پروژه ۴', img: '/images/content3.jpg', name: 'مشتری ۴', comment: 'حرفه‌ای' },
  { id: 5, title: 'پروژه ۵', img: '/images/content3.jpg', name: 'مشتری ۵', comment: 'خوب بود' },
]);

const currentIndex = ref(0);
const activeCard = ref(projects.value[0]);

const visibleProjects = computed(() => {
  return projects.value.slice(currentIndex.value, currentIndex.value + 4);
});

const nextSlide = () => { if (currentIndex.value < projects.value.length - 4) currentIndex.value++; };
const prevSlide = () => { if (currentIndex.value > 0) currentIndex.value--; };
</script>

<template>
  <div class="min-h-screen  bg-cover bg-center py-10 -mt-[70px]">
    
    <div class="max-w-6xl mx-auto">
      <h1 class="bg-[#BFD1D5] w-[178px] h-[68px] text-[#0F184B] text-[18px] rounded-[19px] shadow-sm hover:shadow-md transition-all mt-[100px] flex items-center justify-center">
        تولید محتوا
      </h1>

      <div class="flex justify-center gap-6 mb-8 h-80 items-start  mt-[50px]">
        <div v-for="(card, index) in visibleProjects" :key="card.id"
             @click="activeCard = card"
             :class="['w-[312px] h-[355px] bg-white rounded-[48px] shadow-lg border-[2px] border-gray-300 cursor-pointer transition-all hover:scale-105 ', 
                      index % 2 !== 0 ? 'mt-12' : '']">
          <img :src="card.img" class="w-full h-full object-cover rounded-[48px] " />
        </div>
      </div>

    <div class="flex justify-center gap-4 z-20 mt-[130px] ">
      <SliderButton 
        direction="left" 
        @click="prevSlide" 
      />

      <SliderButton 
        direction="right" 
        @click="nextSlide" 
      />
    </div>

    </div>
  </div>
</template>