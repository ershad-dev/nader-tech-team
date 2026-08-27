<template>
  <!-- کانتینر اصلی صفحه تک مقاله -->
  <div class="max-w-[1100px] mx-auto py-8 sm:py-12 md:py-16 px-4 sm:px-5 md:px-6 bg-[#ABD7D8]/25 dark:bg-[#ABD7D857] rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[3rem] mt-6 sm:mt-8 md:mt-10 mb-6 sm:mb-8 md:mb-10 shadow-xl" :dir="isRtl ? 'rtl' : 'ltr'">

    <!-- لودینگ -->
    <div v-if="pending" class="text-center py-16 text-slate-500 dark:text-dark-text/70">{{ $t('articles.loading') }}</div>

    <!-- خطا / 404 -->
    <div v-else-if="error" class="text-center py-16">
      <p class="text-red-500 text-lg mb-2">{{ $t('articles.notFound') }}</p>
      <NuxtLink :to="localePath('/articles')" class="text-[#2D7A6F] dark:text-dark-highlight underline">{{ $t('articles.backToArticles') }}</NuxtLink>
    </div>

    <!-- محتوای مقاله -->
    <template v-else-if="article">
      <!-- عنوان مقاله -->
      <h1 class="text-[20px] sm:text-[26px] md:text-[32px] font-bold text-center mb-5 sm:mb-6 md:mb-8 leading-snug dark:text-dark-text">
        {{ pickLocalized(article, 'title', 'title_en') }}
      </h1>

      <!-- تصویر شاخص مقاله -->
      <img
        :src="article.thumbnail"
        :alt="pickLocalized(article, 'thumbnail_alt', 'thumbnail_alt_en') || pickLocalized(article, 'title', 'title_en')"
        class="w-full h-[180px] sm:h-[280px] md:h-[400px] object-cover rounded-[1.2rem] sm:rounded-[1.6rem] md:rounded-[2rem] mb-4"
      />

      <!-- تاریخ انتشار -->
      <div class="flex justify-center items-center gap-4 mb-6 sm:mb-8">
        <div class="flex items-center gap-2 text-slate-500 dark:text-dark-text/70 text-sm">
          <svg width="16" height="16" class="sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6.75H4.5V8.25H3V6.75ZM13.5 3V13.5C13.5 14.325 12.825 15 12 15H1.5C0.6675 15 0 14.325 0 13.5L0.00749999 3C0.00749999 2.175 0.6675 1.5 1.5 1.5H2.25V0H3.75V1.5H9.75V0H11.25V1.5H12C12.825 1.5 13.5 2.175 13.5 3ZM1.5 4.5H12V3H1.5V4.5ZM12 13.5V6H1.5V13.5H12ZM9 8.25H10.5V6.75H9V8.25ZM6 8.25H7.5V6.75H6V8.25Z" :fill="dateIconFill"/>
          </svg>
          <span class="text-[13px] sm:text-[14px] md:text-[16px]">{{ formatDate(article.published_at) }}</span>
        </div>
        <!-- <span class="text-slate-400 dark:text-dark-text/50 text-xs">{{ article.views_count }} بازدید</span> -->
      </div>

      <!-- بدنه اصلی مقاله (HTML از سرور) -->
      <div
        class="prose prose-lg max-w-none space-y-4 sm:space-y-5 md:space-y-6 text-justify leading-[26px] sm:leading-[36px] md:leading-[50px] text-[14px] sm:text-[17px] md:text-[20px] text-[#0F184B] dark:text-dark-text font-noto-regular"
        v-html="pickLocalized(article, 'content', 'content_en')"
      ></div>
    </template>
  </div>
</template>

<script setup>
import { useFormatDate } from '~/composables/useFormatDate';
import { useAuth } from '~/composables/useAuth';

const route = useRoute();
const apiBase = 'https://nadertechnologyteam.ir'; // آدرس پایه API

const localePath = useLocalePath();
const { locale, localeProperties } = useI18n();
const isRtl = computed(() => localeProperties.value.dir === 'rtl');

const slug = computed(() => route.params.slug);

// آماده‌سازی توکن کاربر (اگه لاگین باشه) قبل از فچ مقاله
// چون بازدید همین fetch رو سمت بک‌اند افزایش می‌ده، توکن باید همینجا فرستاده بشه
const { token, initAuth } = useAuth();
if (import.meta.client) initAuth();

const { data, pending, error } = await useFetch(
  () => `${apiBase}/api/articles/${slug.value}`,
  {
    headers: computed(() => {
      return token.value ? { Authorization: `Bearer ${token.value}` } : {};
    }),
  }
);

const article = computed(() => data.value?.data ?? null);

function pickLocalized(item, faKey, enKey) {
  const enVal = item?.[enKey];
  return (locale.value === 'en' && enVal) ? enVal : item?.[faKey];
}

const colorMode = useColorMode();
const dateIconFill = computed(() => (colorMode.value === 'dark' ? '#E9F1F2' : '#747893'));

const { formatDate: formatDateShared } = useFormatDate();
function formatDate(dateStr) {
  return formatDateShared(dateStr, { locale: locale.value });
}
</script>