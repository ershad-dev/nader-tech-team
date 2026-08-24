<template>
  <section class="max-w-6xl 2xl:max-w-[1400px] mx-auto py-20 2xl:py-28 px-4 md:px-6 2xl:px-8" :dir="isRtl ? 'rtl' : 'ltr'">
    
    <div class="flex flex-col items-center mb-20 2xl:mb-24">
      <div class="bg-[#ABD7D887] dark:bg-dark-surface w-16 h-16 2xl:w-20 2xl:h-20 rounded-full border border-gray-300 dark:border-dark-border flex items-center justify-center mb-6 2xl:mb-8 ">
        <img src="/images/faq.png" :alt="$t('faq.iconAlt')" class="w-8 h-8 2xl:w-10 2xl:h-10 object-contain" />
      </div>
      <h2 class="text-3xl 2xl:text-[42px] font-bold text-[#0F184B] dark:text-dark-text">{{ $t('faq.heading') }}</h2>
    </div>

    <!-- حالت لودینگ -->
    <div v-if="pending" class="text-center text-[#616474] dark:text-dark-text/70 py-10">
      {{ $t('faq.loading') }}
    </div>

    <!-- حالت خطا -->
    <div v-else-if="error" class="text-center text-red-500 py-10">
      {{ $t('faq.error') }}
    </div>

    <!-- حالت خالی بودن لیست -->
    <div v-else-if="!faqs || faqs.length === 0" class="text-center text-[#616474] dark:text-dark-text/70 py-10">
      {{ $t('faq.empty') }}
    </div>

    <!-- لیست سوالات متداول با قابلیت باز/بسته شدن -->
    <div v-else class="flex flex-col gap-4 2xl:gap-5">
      <div 
        v-for="(item, index) in faqs" 
        :key="item.id" 
        class="faq-item bg-[#2C7379]/10 dark:bg-[#ADE9EA3B] rounded-2xl 2xl:rounded-[24px] overflow-hidden border border-[#BFD1D53B] dark:border-dark-border/40"
        :class="isOpen === index ? 'is-open shadow-lg' : ''"
      >
        
        <button 
            @click="toggle(index)" 
            class="w-full py-6 2xl:py-7 px-4 md:px-6 2xl:px-8 flex justify-between items-center hover:bg-[#2C7379]/5 dark:hover:bg-dark-surface/40 transition-colors duration-300"
            :class="isRtl ? 'text-right' : 'text-left'"
            >
            <!-- تغییر سایز فونت فقط برای موبایل -->
            <p 
              class="text-[16px] md:text-[20px] 2xl:text-[23px] font-noto-light leading-tight transition-colors duration-500"
              :class="isOpen === index ? 'text-[#2C7379] dark:text-[#ADE9EA] font-bold' : 'text-[#0F184B] dark:text-dark-text font-bold'"
            >
              {{ pickLocalized(item, 'question', 'question_en') }}
            </p> 
            
            <span 
              class="faq-icon-wrap w-6 h-6 2xl:w-7 2xl:h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-2 2xl:mr-3"
              :class="isOpen === index ? 'bg-[#2C7379] dark:bg-[#ADE9EA] scale-110' : 'bg-transparent scale-100'"
            >
              <svg 
                  class="faq-icon w-4 h-4 2xl:w-5 2xl:h-5" 
                  :class="isOpen === index ? 'rotate-180 text-white dark:text-[#0F184B]' : 'rotate-0 text-[#747893] dark:text-dark-text/70'"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
              >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
        </button>
        
        <!-- انیمیشن باز/بسته شدن پنل پاسخ -->
        <div class="faq-panel grid" :class="isOpen === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
          <div class="overflow-hidden">
            <div 
              class="faq-content px-4 md:px-6 2xl:px-8 pb-6 2xl:pb-8 pt-0 text-[#616474] dark:text-dark-text/70 text-[16px] md:text-[18px] 2xl:text-[20px] leading-[22px] md:leading-[30px] 2xl:leading-[34px] font-roboto"
              :class="isOpen === index ? 'translate-y-0 blur-0' : '-translate-y-3 blur-[2px]'"
            >
              <div class="pt-4 2xl:pt-5 border-t border-[#2C7379]/10 dark:border-dark-border/20">
                {{ pickLocalized(item, 'answer', 'answer_en') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

// تنظیمات زبان و جهت صفحه
const { locale, localeProperties, t } = useI18n();
const isRtl = computed(() => localeProperties.value.dir === 'rtl');

// مدیریت باز/بسته بودن هر آیتم FAQ
const isOpen = ref(null);
const toggle = (index) => { isOpen.value = isOpen.value === index ? null : index; };

// آدرس پایه API
const API_BASE = 'https://nadertechnologyteam.ir';

// دریافت لیست سوالات متداول از سرور
const { data, pending, error } = await useFetch(`${API_BASE}/api/faqs`, {
  key: 'faqs-list',
});

// مرتب‌سازی سوالات بر اساس ترتیب تعیین‌شده
const faqs = computed(() => {
  const list = data.value?.data?.faqs ?? [];
  return [...list].sort((a, b) => a.sort_order - b.sort_order);
});

// انتخاب متن فارسی یا انگلیسی هر فیلد بر اساس زبان فعلی
const pickLocalized = (item, faKey, enKey) => {
  const enVal = item?.[enKey];
  return (locale.value === 'en' && enVal) ? enVal : item?.[faKey];
};

// تنظیم عنوان و رنگ فوتر صفحه
const footerConfig = useState('footerConfig');
footerConfig.value = {
  title: t('faq.footerTitle'),
  bgColor: 'bg-purple-800'
};

// تنظیم رنگ اسکرول‌بار صفحه
const scrollbarConfig = useScrollbarConfig();
scrollbarConfig.value = {
  light: '#72A6A6',
  dark: '#72A6A6'
};
</script>

<style scoped>
.faq-item {
  transition: box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-panel {
  transition: grid-template-rows 0.55s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-content {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.faq-icon-wrap {
  transition: background-color 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.faq-icon {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
              color 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .faq-item, .faq-panel, .faq-content, .faq-icon-wrap, .faq-icon {
    transition-duration: 0.01ms !important;
  }
}
</style>