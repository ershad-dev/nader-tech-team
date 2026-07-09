<template>
  <div class="max-w-[1106px] 2xl:max-w-[1600px] mx-auto py-12 md:py-20 px-4 2xl:px-12" dir="rtl">
    <h1 class="text-[18px] sm:text-[20px] md:text-[24px] 2xl:text-[28px] text-[#0F184B] font-bold mb-8 sm:mb-10 md:mb-16 2xl:mb-20 text-center leading-relaxed">
      دانش خود را به‌روز نگه دارید <span class="text-[#2C7379]">هر هفته</span> مقالات جدیدی در حوزه طراحی سایت، تولید محتوا منتشر می‌کنیم.
    </h1>

    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-y-8 md:gap-y-12 2xl:gap-y-16 gap-x-3 sm:gap-x-5 md:gap-x-8 2xl:gap-x-10 justify-items-center" dir="ltr">
      <NuxtLink
        v-for="post in articles"
        :key="post.id"

        class="w-full md:w-[281px] 2xl:w-[350px] h-[210px] sm:h-[260px] md:h-[379px] 2xl:h-[430px] bg-[#ABD7D8]/35 rounded-[16px] sm:rounded-[20px] md:rounded-[25px] 2xl:rounded-[28px] p-2 sm:p-3 md:p-4 2xl:p-5 flex flex-col relative transition-transform"
      >
        <!-- اصلاح شده: اضافه شدن flex, items-center, justify-center به کانتینرِ تصویر -->
        <div class="relative w-full">

          <!-- فقط سایه -->
          <!-- shadow-[0_10px_15px_-3px_rgba(0,0,0,0.35)] -->
          <div class="absolute inset-0 rounded-[16px] sm:rounded-[20px] md:rounded-[25px] 2xl:rounded-[28px]"></div>

          <!-- تصویر -->
          <div class="img-wrap relative h-[100px] sm:h-[140px] md:h-[220px] 2xl:h-[260px] rounded-[16px] sm:rounded-[20px] md:rounded-[25px] 2xl:rounded-[28px] overflow-hidden">
            <img :src="post.image" class="inner-curve w-full h-full object-cover shadow-[0_8px_0_0_rgba(0,0,0,0.15)]" />
          </div>

        </div>
        <div class="absolute top-[85px] sm:top-[120px] md:top-[190px] 2xl:top-[228px] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center">
          <NuxtLink :to="`/articles/${post.id}`">
            <div class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 2xl:w-12 2xl:h-12 rounded-full flex items-center justify-center cursor-pointer">
              <ArrowUpRight class="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] md:w-[36px] md:h-[36px] 2xl:w-[42px] 2xl:h-[42px] 2xl:mt-[40px] text-[#2D7A6F] hover:bg-white/50 rounded-full" />
            </div>
          </NuxtLink>
        </div>
<h3 class="mt-[20px] sm:mt-4 md:mt-5 2xl:mt-6 text-[#000000] font-bold text-right px-1 sm:px-2 md:px-4 text-[11px] sm:text-[13px] md:text-[16px] 2xl:text-[19px] leading-[16px] sm:leading-5 md:leading-6 2xl:leading-7 mb-[24px] sm:mb-[32px] md:mb-[40px] 2xl:mb-[48px]">
  {{ post.title }}
</h3>

        <div class="absolute bottom-2 sm:bottom-3 md:bottom-4 2xl:bottom-5 right-2 sm:right-3 md:right-4 2xl:right-5 flex items-center gap-1 sm:gap-2 2xl:gap-3 text-slate-500 text-[10px] sm:text-xs 2xl:text-sm mr-0 sm:mr-[10px] md:mr-[15px] 2xl:mr-[18px] mt-0 md:mt-[20px]">
          <span>{{ post.date }}</span>
          <DateVector class="w-[13px] h-[13px] sm:w-[15px] sm:h-[15px] md:w-[18px] md:h-[18px] 2xl:w-[20px] 2xl:h-[20px] text-[#2D7A6F]" />
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
  filter: drop-shadow(0 5px 0 rgba(0,0,0,0.12));
}

/* موبایل کوچیک: کارت‌ها با 2 ستون خیلی باریک می‌شن، پس بریدگی و شعاع باید کوچیک‌تر بشن */
@media (max-width: 639px) {
  .img-wrap {
    height: 100px;
    border-radius: 16px;
  }
  .inner-curve {
    --r: 5px;
    --s: 16px;
    --a: 16deg;
    height: 100px;
    border-radius: 16px;
  }
}

/* تبلت کوچیک / موبایل بزرگ: هنوز 2 ستونه ولی فضای بیشتری داریم */
@media (min-width: 640px) and (max-width: 767px) {
  .img-wrap {
    height: 140px;
    border-radius: 20px;
  }
  .inner-curve {
    --r: 7px;
    --s: 22px;
    --a: 18deg;
    height: 140px;
    border-radius: 20px;
  }
}

/* سایز 1920x1080 و بزرگ‌تر (2xl تیلویند): کارت‌ها بزرگ‌تر می‌شن */
@media (min-width: 1536px) {
  .img-wrap {
    height: 260px;
    border-radius: 28px;
  }
  .inner-curve {
    --r: 12px;
    --s: 46px;
    --a: 20deg;
    height: 260px;
    border-radius: 28px;
  }
}
</style>