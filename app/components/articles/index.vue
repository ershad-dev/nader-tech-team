<template>
  <!-- کانتینر اصلی صفحه مقالات -->
  <div class="max-w-[1106px] 2xl:max-w-[1600px] mx-auto py-12 md:py-20 px-4 2xl:px-12" :dir="isRtl ? 'rtl' : 'ltr'">
    <!-- عنوان اصلی صفحه -->
    <h1 class="text-[18px] sm:text-[20px] md:text-[24px] 2xl:text-[28px] text-[#0F184B] dark:text-dark-text font-bold mb-8 sm:mb-10 md:mb-16 2xl:mb-20 text-center leading-relaxed">
      {{ $t('articles.heroTitle.part1') }}
      <span class="text-[#2C7379] dark:text-dark-highlight">{{ $t('articles.heroTitle.highlight') }}</span>
      {{ $t('articles.heroTitle.part2') }}
    </h1>

    <!-- حالت لودینگ -->
    <div v-if="pending" class="text-center text-slate-500 dark:text-dark-text/70 py-10">{{ $t('articles.loading') }}</div>

    <!-- حالت خطا -->
    <div v-else-if="error" class="text-center text-red-500 py-10">{{ $t('articles.error') }}</div>

    <!-- حالت خالی -->
    <div v-else-if="!articles.length" class="text-center text-slate-500 dark:text-dark-text/70 py-10">{{ $t('articles.empty') }}</div>

    <!-- گرید کارت‌های مقالات -->
    <div v-else class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-y-8 md:gap-y-12 2xl:gap-y-16 gap-x-3 sm:gap-x-5 md:gap-x-8 2xl:gap-x-10 justify-items-center" dir="ltr">
      <!-- لینک به صفحه هر مقاله -->
      <NuxtLink
        v-for="post in articles"
        :key="post.id"
        :to="localePath(`/articles/${post.slug}`)"
        class="w-full md:w-[281px] 2xl:w-[350px] h-[210px] sm:h-[260px] md:h-[379px] 2xl:h-[430px] bg-[#ABD7D8]/35 dark:bg-dark-[#ABD7D857] rounded-[16px] sm:rounded-[20px] md:rounded-[25px] 2xl:rounded-[28px] p-2 sm:p-3 md:p-4 2xl:p-5 flex flex-col relative transition-transform"
      >
        <div class="relative w-full">
          <div class="absolute inset-0 rounded-[16px] sm:rounded-[20px] md:rounded-[25px] 2xl:rounded-[28px]"></div>

          <!-- تصویر بندانگشتی مقاله -->
          <div class="img-wrap relative h-[100px] sm:h-[140px] md:h-[220px] 2xl:h-[260px] rounded-[16px] sm:rounded-[20px] md:rounded-[25px] 2xl:rounded-[28px] overflow-hidden">
            <img
              :src="post.thumbnail"
              :alt="pickLocalized(post, 'thumbnail_alt', 'thumbnail_alt_en') || pickLocalized(post, 'title', 'title_en')"
              class="inner-curve w-full h-full object-cover shadow-[0_8px_0_0_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>

        <!-- دکمه/آیکون رفتن به مقاله -->
        <div class="absolute top-[85px] sm:top-[120px] md:top-[190px] 2xl:top-[228px] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center">
          <div class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 2xl:w-12 2xl:h-12 rounded-full flex items-center justify-center cursor-pointer">
            <ArrowUpRight class="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] md:w-[36px] md:h-[36px] 2xl:w-[42px] 2xl:h-[42px] 2xl:mt-[40px] text-[#2D7A6F] dark:text-dark-highlight hover:bg-white/50 dark:hover:bg-dark-bg/40 rounded-full" />
          </div>
        </div>

        <!-- عنوان مقاله -->
        <h3 class="mt-[20px] sm:mt-4 md:mt-5 2xl:mt-6 text-[#000000] dark:text-dark-text-deep font-bold text-right px-1 sm:px-2 md:px-4 text-[11px] sm:text-[13px] md:text-[16px] 2xl:text-[19px] leading-[16px] sm:leading-5 md:leading-6 2xl:leading-7 mb-[24px] sm:mb-[32px] md:mb-[40px] 2xl:mb-[48px]">
          {{ pickLocalized(post, 'title', 'title_en') }}
        </h3>

        <!-- تاریخ انتشار مقاله -->
        <div class="absolute bottom-2 sm:bottom-3 md:bottom-4 2xl:bottom-5 right-2 sm:right-3 md:right-4 2xl:right-5 flex items-center gap-1 sm:gap-2 2xl:gap-3 text-slate-500 dark:text-dark-text-deep/80 text-[10px] sm:text-xs 2xl:text-sm mr-0 sm:mr-[10px] md:mr-[15px] 2xl:mr-[18px] mt-0 md:mt-[20px]">
          <span>{{ formatDate(post.published_at) }}</span>
          <DateVector class="w-[13px] h-[13px] sm:w-[15px] sm:h-[15px] md:w-[18px] md:h-[18px] 2xl:w-[20px] 2xl:h-[20px] text-[#2D7A6F] dark:text-dark-highlight" />
        </div>
      </NuxtLink>
    </div>

    <!-- بخش صفحه‌بندی -->
    <div v-if="meta && meta.last_page > 1" class="flex items-center justify-center gap-4 mt-10" dir="ltr">
      <!-- دکمه صفحه قبلی -->
      <button
        :disabled="page <= 1"
        @click="goToPage(page - 1)"
        class="px-4 py-2 rounded-full bg-[#ABD7D8]/40 dark:bg-dark-surface/50 text-[#0F184B] dark:text-dark-text-deep disabled:opacity-40 whitespace-nowrap"
      >
        {{ $t('articles.pagination.previous') }}
      </button>
      <span class="text-sm text-[#0F184B] dark:text-dark-text">{{ meta.current_page }} / {{ meta.last_page }}</span>
      <!-- دکمه صفحه بعدی -->
      <button
        :disabled="page >= meta.last_page"
        @click="goToPage(page + 1)"
        class="px-4 py-2 rounded-full bg-[#ABD7D8]/40 dark:bg-dark-surface/50 text-[#0F184B] dark:text-dark-text-deep disabled:opacity-40 whitespace-nowrap"
      >
        {{ $t('articles.pagination.next') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import ArrowUpRight from './icons/ArrowUpRight.vue';
import DateVector from './icons/DateVector.vue';

const config = useRuntimeConfig();
const apiBase = 'https://nadertechnologyteam.ir'; // آدرس پایه API

const route = useRoute();
const router = useRouter();
// شماره صفحه فعلی از کوئری استرینگ
const page = computed(() => parseInt(route.query.page) || 1);

const localePath = useLocalePath();
const { locale, localeProperties } = useI18n();
// جهت چیدمان بر اساس زبان
const isRtl = computed(() => localeProperties.value.dir === 'rtl');

// دریافت لیست مقالات از API
const { data, pending, error, refresh } = await useFetch(
  () => `${apiBase}/api/articles`,
  {
    query: { page },
    watch: [page],
  }
);

// لیست مقالات دریافت‌شده
const articles = computed(() => data.value?.data ?? []);
// اطلاعات صفحه‌بندی
const meta = computed(() => data.value?.meta ?? null);

// انتخاب فیلد فارسی یا انگلیسی بر اساس زبان فعلی
function pickLocalized(item, faKey, enKey) {
  const enVal = item?.[enKey];
  return (locale.value === 'en' && enVal) ? enVal : item?.[faKey];
}

// تغییر صفحه در کوئری استرینگ
function goToPage(newPage) {
  router.push({ query: { ...route.query, page: newPage } });
}

// فرمت‌دهی تاریخ بر اساس زبان
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString(locale.value === 'fa' ? 'fa-IR' : 'en-US');
  } catch {
    return dateStr;
  }
}

// تنظیم رنگ اسکرول‌بار سفارشی
const scrollbarConfig = useScrollbarConfig();
scrollbarConfig.value = {
  light: '#ECD0A0',
  dark: '#ECD0A0'
};

</script>



<style scoped>
/* استایل برش گوشه‌های تصویر بندانگشتی */
.inner-curve {
  --r: 10px;
  --s: 40px;
  --a: 20deg;
  --p: 50%;

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

/* استایل کانتینر تصویر */
.img-wrap {
  width: 100%;
  height: 220px;
  border-radius: 25px;
  filter: drop-shadow(0 5px 0 rgba(0,0,0,0.12));
}

/* حالت‌های ریسپانسیو در سایزهای مختلف صفحه */
@media (max-width: 639px) {
  .img-wrap { height: 100px; border-radius: 16px; }
  .inner-curve { --r: 5px; --s: 16px; --a: 16deg; height: 100px; border-radius: 16px; }
}

@media (min-width: 640px) and (max-width: 767px) {
  .img-wrap { height: 140px; border-radius: 20px; }
  .inner-curve { --r: 7px; --s: 22px; --a: 18deg; height: 140px; border-radius: 20px; }
}

@media (min-width: 1536px) {
  .img-wrap { height: 260px; border-radius: 28px; }
  .inner-curve { --r: 12px; --s: 46px; --a: 20deg; height: 260px; border-radius: 28px; }
}
</style>