<template>
  <section class="max-w-6xl mx-auto py-20 px-6" dir="rtl">
    
    <div class="flex flex-col items-center mb-20">
      <div class="bg-[#ABD7D8] w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center mb-6 ">
        <img src="/images/faq.png" alt="FAQ" class="w-8 h-8 object-contain" />
      </div>
      <h2 class="text-3xl font-bold text-[#0F184B]">پرسش‌های متداول</h2>
    </div>

    <div class="bg-[#F9F7F2] rounded-2xl p-2">
      <div v-for="(item, index) in faqs" :key="index" class="border-b-2 border-[#2C7379] last:border-0">
        
        <button 
            @click="toggle(index)" 
            class="w-full py-8 px-4 flex justify-between items-center text-right hover:bg-black/5 transition-colors rounded-lg"
            >
            <p class="text-[#0F184B] font-[200] text-[24px] font-roboto">{{ item.question }}</p> 
            
            <svg 
                class="w-6 h-6 text-[#747893] transition-transform duration-300 flex-shrink-0" 
                :class="{ 'rotate-180': isOpen === index }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        
        <div v-if="isOpen === index" class="px-4 pb-8 pt-2 text-[#616474] text-[24px]leading-[32px] font-roboto">
          {{ item.answer }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(null); 

const toggle = (index) => { 
  isOpen.value = isOpen.value === index ? null : index; 
};

const faqs = [
  { 
    question: 'فرآیند کار از ابتدا تا انتها به چه صورت است؟', 
    answer: 'فرآیند کار ما از ابتدا تا انتها در ۶ مرحله‌ی شفاف و منظم انجام می‌شود تا شما در هر لحظه از پیشرفت پروژه خود مطلع باشید.' 
  },
  { question: 'تولید محتوا فقط متنی است یا تصویر و ویدیو هم شامل می‌شود؟', answer: 'خیر، خدمات ما شامل تولید محتوای متنی، تصویری، ویدئویی و گرافیک‌های اختصاصی می‌باشد.' },
  { question: 'سایت من با چه سیستمی (وردپرس، کدنویسی اختصاصی یا ...) طراحی می‌شود؟', answer: 'بسته به نیاز و اهداف شما، ما از بهترین تکنولوژی‌ها استفاده می‌کنیم.' },
  { question: 'طراحی سایت و تولید محتوا را با هم انجام می‌دهید یا جداگانه؟', answer: 'هر دو سرویس هم به صورت پکیج جامع و هم به صورت جداگانه قابل ارائه هستند.' },
    { question: 'تولید محتوا فقط متنی است یا تصویر و ویدیو هم شامل می‌شود؟', answer: 'خیر، خدمات ما شامل تولید محتوای متنی، تصویری، ویدئویی و گرافیک‌های اختصاصی می‌باشد.' },
    { question: 'تولید محتوا فقط متنی است یا تصویر و ویدیو هم شامل می‌شود؟', answer: 'خیر، خدمات ما شامل تولید محتوای متنی، تصویری، ویدئویی و گرافیک‌های اختصاصی می‌باشد.' },
    { question: 'تولید محتوا فقط متنی است یا تصویر و ویدیو هم شامل می‌شود؟', answer: 'خیر، خدمات ما شامل تولید محتوای متنی، تصویری، ویدئویی و گرافیک‌های اختصاصی می‌باشد.' },
    { question: 'تولید محتوا فقط متنی است یا تصویر و ویدیو هم شامل می‌شود؟', answer: 'خیر، خدمات ما شامل تولید محتوای متنی، تصویری، ویدئویی و گرافیک‌های اختصاصی می‌باشد.' },
];

  const footerConfig = useState('footerConfig');
footerConfig.value = {
  title: ' شروع یک تجربه متفاوت ',
  bgColor: 'bg-purple-800'
};
</script>