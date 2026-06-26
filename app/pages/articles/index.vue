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
  <div class=" img-wrap relative h-[220px] rounded-[25px] overflow-hidden">
    <img :src="post.image" class="inner-curve w-full h-full object-cover shadow-[0_8px_0_0_rgba(0,0,0,0.15)]" />

  </div>

</div>
<div class="absolute top-[190px] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center">
  <NuxtLink :to="`/articles/${post.id}`">
    <div class="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
      <ArrowUpRight class="w-[36px] h-[36px] text-[#2D7A6F]  hover:bg-white/50 rounded-full" />
    </div>
  </NuxtLink>
</div>
        <h3 class="mt-5 text-[#000000] font-bold text-right px-4 text-[16px] leading-6 mb-[40px]">
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
/* HTML: <img class="inner-curve" src="" alt=""> */
.inner-curve {
  --r: 10px;  /* control the rounded part */
  --s: 40px;  /* control the size of the cut */
  --a: 20deg; /* control the depth of the curvature */
  --p: 50%;   /* control the position */

  height: 207px;
  aspect-ratio: 3/2;
  background: #ED303C;
  border-radius: var(--r);
  --_m:calc(100% - var(--r)),#000 calc(100% - 1px),#0000;
  --_d:(var(--s) + var(--r))*cos(var(--a));
  mask:
    radial-gradient(var(--r) at calc(var(--p) + var(--_d)) var(--_m)),
    radial-gradient(var(--r) at calc(var(--p) - var(--_d)) var(--_m)),
    radial-gradient(var(--s) at var(--p) calc(100% + sin(var(--a))*var(--s)),
      #0000 100%,#000 calc(100% + 1px)) 0 calc(var(--r)*(sin(var(--a)) - 1)) no-repeat,
    linear-gradient(90deg,#000 calc(var(--p) - var(--_d)),#0000 0 calc(var(--p) + var(--_d)),#000 0);

}

.img-wrap {
  width: 100%;
  height: 220px;
  border-radius: 25px;
filter: drop-shadow(0 5px 0 rgba(0,0,0,0.12));}


</style>