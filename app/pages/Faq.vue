<template>
  <section class="max-w-6xl 2xl:max-w-[1400px] mx-auto py-20 2xl:py-28 px-4 md:px-6 2xl:px-8" dir="rtl">
    
    <div class="flex flex-col items-center mb-20 2xl:mb-24">
      <div class="bg-[#ABD7D887] dark:bg-dark-surface w-16 h-16 2xl:w-20 2xl:h-20 rounded-full border border-gray-300 dark:border-dark-border flex items-center justify-center mb-6 2xl:mb-8 ">
        <img src="/images/faq.png" alt="FAQ" class="w-8 h-8 2xl:w-10 2xl:h-10 object-contain" />
      </div>
      <h2 class="text-3xl 2xl:text-[42px] font-bold text-[#0F184B] dark:text-dark-text">پرسش‌های متداول</h2>
    </div>

    <!-- حالت لودینگ -->
    <div v-if="pending" class="text-center text-[#616474] dark:text-dark-text/70 py-10">
      در حال بارگذاری...
    </div>

    <!-- حالت خطا -->
    <div v-else-if="error" class="text-center text-red-500 py-10">
      خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.
    </div>

    <!-- حالت خالی بودن لیست -->
    <div v-else-if="!faqs || faqs.length === 0" class="text-center text-[#616474] dark:text-dark-text/70 py-10">
      در حال حاضر سوالی ثبت نشده است.
    </div>

    <!-- لیست FAQ ها -->
    <div v-else class="flex flex-col gap-4 2xl:gap-5">
      <div v-for="(item, index) in faqs" :key="item.id" 
           class="bg-[#2C7379]/10 dark:bg-dark-surface/60 rounded-2xl 2xl:rounded-[24px] overflow-hidden border border-[#BFD1D53B] dark:border-dark-border/40 transition-all">
        
        <button 
            @click="toggle(index)" 
            class="w-full py-6 2xl:py-7 px-4 md:px-6 2xl:px-8 flex justify-between items-center text-right hover:bg-[#2C7379]/5 dark:hover:bg-dark-surface/40 transition-colors"
            >
            <!-- تغییر سایز فونت فقط برای موبایل -->
            <p class="text-[#0F184B] dark:text-dark-text font-bold text-[16px] md:text-[20px] 2xl:text-[23px] font-noto-light leading-tight">
              {{ item.question }}
            </p> 
            
            <svg 
                class="w-6 h-6 2xl:w-7 2xl:h-7 text-[#747893] dark:text-dark-text/70 transition-transform duration-300 flex-shrink-0 mr-2 2xl:mr-3" 
                :class="{ 'rotate-180': isOpen === index }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        
        <div v-if="isOpen === index" class="px-4 md:px-6 2xl:px-8 pb-6 2xl:pb-8 pt-0 text-[#616474] dark:text-dark-text/70 text-[16px] md:text-[18px] 2xl:text-[20px] leading-[22px] md:leading-[30px] 2xl:leading-[34px] font-roboto">
          <div class="pt-4 2xl:pt-5">
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const isOpen = ref(null);
const toggle = (index) => { isOpen.value = isOpen.value === index ? null : index; };

// آدرس پایه API - در صورت نیاز می‌توانید آن را در runtimeConfig یا .env قرار دهید
const API_BASE = 'https://nadertechnologyteam.ir';

// دریافت لیست FAQ های فعال از API
const { data, pending, error } = await useFetch(`${API_BASE}/api/faqs`, {
  key: 'faqs-list',
});

// استخراج و مرتب‌سازی بر اساس sort_order (طبق توضیح مستندات: ordered by sort order)
const faqs = computed(() => {
  const list = data.value?.data?.faqs ?? [];
  return [...list].sort((a, b) => a.sort_order - b.sort_order);
});

const footerConfig = useState('footerConfig');
footerConfig.value = {
  title: ' شروع یک تجربه متفاوت ',
  bgColor: 'bg-purple-800'
};
</script>