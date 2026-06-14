<script setup>
import { ref, computed } from 'vue';

const projects = ref([
  { id: 1, title: 'پروژه ۱', img: '/images/content1.jpg', name: 'مشتری ۱', comment: '«همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود. از همان جلسات اولیه، نیازها و اهداف ما به‌خوبی درک شد و تمام مراحل پروژه با برنامه‌ریزی دقیق پیش رفت. کیفیت اجرای کار، سرعت پاسخگویی و توجه به جزئیات باعث شد نتیجه نهایی حتی بهتر از انتظارات ما باشد. از همکاری با این تیم بسیار رضایت داریم و قطعاً در پروژه‌های آینده نیز از خدمات آن‌ها استفاده خواهیم کرد.»' },
  { id: 2, title: 'پروژه ۲', img: '/images/content2.jpg', name: 'مشتری ۲', comment: 'بسیار خوب' },
  { id: 3, title: 'پروژه ۳', img: '/images/content3.jpg', name: 'مشتری ۳', comment: 'راضی هستم' },
  { id: 4, title: 'پروژه ۴', img: '/images/web-service.jpg', name: 'مشتری ۴', comment: 'حرفه‌ای' },
  { id: 5, title: 'پروژه ۵', img: '/images/content3.jpg', name: 'مشتری ۵', comment: 'خوب بود' },
]);

const currentIndex = ref(0);
const activeCard = ref(projects.value[0]);

const visibleProjects = computed(() => {
  return projects.value.slice(currentIndex.value, currentIndex.value + 4);
});

const nextSlide = () => { if (currentIndex.value < projects.value.length - 3) currentIndex.value++; };
const prevSlide = () => { if (currentIndex.value > 0) currentIndex.value--; };
</script>

<template>
  <div class="min-h-screen   bg-cover bg-center py-10 -mt-[70px]">
    
    <div class="max-w-6xl mx-auto">
      <h1 class="bg-[#BFD1D5] w-[200px] text-[#2d6a66] font-[18px] py-3 px-12 rounded-[19px]  shadow-sm hover:shadow-md transition-al mt-[100px]">تولید محتوا</h1>

      <div class="flex justify-center gap-6 mb-8 h-80 items-start  mt-[50px]">
        <div v-for="(card, index) in visibleProjects" :key="card.id"
             @click="activeCard = card"
             :class="['w-[312px] h-[355px] bg-white rounded-3xl shadow-lg cursor-pointer transition-all hover:scale-105', 
                      index % 2 !== 0 ? 'mt-12' : '']">
          <img :src="card.img" class="w-full h-full object-cover rounded-3xl " />
        </div>
      </div>

      <div class="flex justify-center gap-4 mb-16 mt-[100px]">
        <button @click="prevSlide" :disabled="currentIndex === 0" class=" text-white rounded-full disabled:opacity-30">
            <img src="/images/arrow-right.png" alt="">
        </button>
        <button @click="nextSlide" :disabled="currentIndex >= projects.length - 3" class="p-3  text-white rounded-full disabled:opacity-30">
            <img src="/images/left-arrow.png" alt="">

        </button>
      </div>

<div class="bg-[url('/images/bg-showcase.png')] rounded-[40px] p-8 flex items-center justify-between text-white shadow-2xl h-[607px] max-w-6xl mx-auto" dir="ltr">
    
    <div class="w-1/3 h-full flex items-center">
      <img :src="activeCard.img" class="w-full h-[450px] rounded-[30px] object-cover border-4 border-white/20 shadow-lg" />
    </div>

<!-- ستون دوم: بالون‌ها و اطلاعات مشتری -->
<div class="w-2/3 flex flex-col px-10">
  
  <!-- ۱. بالون‌های پیام (در وسط قرار دارند) -->
<div class="flex flex-col items-start gap-4 mb-10 w-full ">
  <div class="bg-white/20 px-6 py-3 rounded-full text-sm mr-8 mt-[90px]" >از سرعت پاسخگویی و کیفیت اجرای کار راضی هستیم</div>
  <div class="bg-white/20 px-6 py-3 rounded-full text-sm mr-6 -mt-[130px]">از برنامه ریزی تا اجرا همه چیز منظم پیش رفت</div>
</div>

  <!-- ۲. بخش عکس و متن رضایت (در سمت راست) -->
  <div class="flex flex-col items-end text-right mt-[100px]">
    <!-- عکس شخص (در سمت راستِ بالا) -->
    <img src="/images/hero-imgae.png" class="w-[200px] h-[200px] rounded-full border-4 border-white mb-4 -mt-[200px]" />
    
    <!-- متن رضایت (زیر عکس) -->
    <h4 class="font-bold text-[20px] mb-2">تجربه همکاری از زبان مشتری</h4>
    <p class="text-white/90 leading-relaxed text-sm max-w-lg">
      " {{ activeCard.comment }} "
    </p>
  </div>
  
</div>
    
  </div>
    </div>
  </div>
</template>