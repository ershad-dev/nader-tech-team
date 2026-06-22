<template>
  <div class="max-w-[1106px] mx-auto py-20 px-4" dir="rtl">
    <h1 class="text-[24px] text-[#0F184B] font-bold mb-16 text-center">دانش خود را به‌روز نگه دارید <span class="text-[#2C7379]">هر هفته</span> مقالات جدیدی در حوزه طراحی سایت، تولید محتوا منتشر می‌کنیم.</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 justify-items-center" dir="ltr">
      <NuxtLink 
        v-for="post in articles" 
        :key="post.id" 

        class="w-[281px] h-[379px] bg-[#ABD7D8]/35 rounded-[25px] p-4 flex flex-col relative transition-transform "
      >
        <!-- اصلاح شده: اضافه شدن flex, items-center, justify-center به کانتینرِ تصویر -->
<div class="relative w-full">
  
  <!-- فقط سایه -->
   <!-- shadow-[0_10px_15px_-3px_rgba(0,0,0,0.35)] -->
  <div class="absolute inset-0 rounded-[25px] "></div>

  <!-- تصویر -->
  <div class="relative h-[220px] rounded-[25px] overflow-hidden bg-white">
    <img :src="post.image" class="w-full h-full object-cover" />

    <div
      class="notch absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] pointer-events-none"
    ></div>
  </div>

</div>
<div class="absolute top-[190px] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center">
  <NuxtLink :to="`/articles/${post.id}`">
    <div class="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
      <ArrowUpRight class="w-[32px] h-[32px] text-[#2D7A6F] mt-[15px]" />
    </div>
  </NuxtLink>
</div>
        <h3 class="mt-10 text-slate-800 font-bold text-right px-4 text-[16px] leading-6 mb-[40px]">
          {{ post.title }}
        </h3>
        
        <div class="absolute bottom-4 right-4 flex items-center gap-2 text-slate-500 text-xs mr-[15px] mt-[20px]">
        <span>{{ post.date }}</span>
        <DateVector class="w-[18px] h-[18px] text-[#2D7A6F]" />
        </div>
      </NuxtLink>
    </div>

  </div>
</template>

<script setup>
import ArrowUpRight from './icons/ArrowUpRight.vue';
import DateVector from './icons/DateVector.vue';

const route = useRoute();
const router = useRouter();
const page = computed(() => parseInt(route.query.page) || 1);

const articles = ref([
  { id: 1, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', date: '1405/03/26', image: '/images/article1.jpg' },
  { 
    id: 2, 
    title: 'تفاوت طراحی سایت اختصاصی با قالب آماده',
    date: '1405/03/28', 
    image: '/images/article2.jpg' 
  },
  { 
    id: 3, 
    title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', 
    date: '1405/04/01', 
    image: '/images/article3.jpg' 
  },
  { 
    id: 4, 
    title: 'تفاوت طراحی سایت اختصاصی با قالب آماده',
    date: '1405/03/28', 
    image: '/images/article5.jpg' 
  },
  { 
    id: 5, 
    title: 'تفاوت طراحی سایت اختصاصی با قالب آماده',
    date: '1405/04/01', 
    image: '/images/article4.jpg' 
  },
  { 
    id: 6, 
    title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', 
    date: '1405/03/28', 
    image: '/images/article3.jpg' 
  }
]);


</script>


<style scoped>

.notch {
  position: absolute;
  /* ارتفاع را کم می‌کنیم چون اکنون قوس رو به بالاست */
  height: 33px; 
  background: #dbf3f4;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  /* box-shadow: inset 0 10px 10px rgba(0,0,0,0.2); */
}

.notch::before, .notch::after {
  content: "";
  position: absolute;
  bottom: 0; /* تغییر از top به bottom */
  width: 20px;
  height: 20px;
  background: transparent;
}

/* قوس چپ معکوس */
.notch::before {
  left: -16px;
  border-bottom-right-radius: 20px;
  box-shadow: 10px 10px 0 #dbf3f4; /* تغییر جهت سایه به سمت پایین */
  
}

/* قوس راست معکوس */
.notch::after {
  right: -16px;
  border-bottom-left-radius: 20px;
  box-shadow: -10px 10px 0 #dbf3f4,
  inset 0 10px 10px rgba(0,0,0,0.2)
   /* تغییر جهت سایه به سمت پایین */
}

</style>