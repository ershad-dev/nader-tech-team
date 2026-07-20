<template>
  <!-- کانتینر اصلی بخش رضایت‌مندی -->
  <section class="max-w-6xl min-[1920px]:max-w-[1600px] mx-auto py-8 sm:py-10 md:py-12 min-[1920px]:py-16 px-4 min-[1920px]:px-8">

    <!-- عنوان بخش -->
    <div class="mb-8 sm:mb-10 md:mb-12 min-[1920px]:mb-14 flex flex-col items-center">
      <h2 class="bg-white px-4 sm:px-6 md:px-8 min-[1920px]:px-10 py-3 sm:py-4 min-[1920px]:py-5 rounded-t-[16px] sm:rounded-t-[20px] rounded-b-[4px] shadow-xl border-[0.5px] font-bold text-[#0F184B] border w-[220px] sm:w-[250px] md:w-[266px] min-[1920px]:w-[300px] h-[64px] sm:h-[72px] md:h-[78px] min-[1920px]:h-[90px] text-[15px] sm:text-[18px] md:text-[20px] min-[1920px]:text-[22px] flex items-center justify-center text-center whitespace-normal sm:whitespace-nowrap leading-snug">
        رضایت از ایونت‌های برگزار شده
      </h2>
    </div>

<!-- موبایل: کارت وسط بزرگ + کارت‌های قبلی/بعدی نیمه‌پیدا (لوپ + انیمیشن + سواپ با انگشت) -->
<div
  class="relative flex md:hidden items-center justify-center h-[300px] mb-6 overflow-hidden touch-pan-y"
  @touchstart="onTouchStart"
  @touchend="onTouchEnd"
>
  <div
    v-for="item in mobileVisibleTestimonials"
    :key="item.realIndex"
    @click="goToSlide(item.realIndex)"
    class="absolute transition-all duration-500 ease-out cursor-pointer"
    :class="[
      item.pos === 0
        ? 'z-20 scale-100 opacity-100 translate-x-0'
        : item.pos === -1
          ? 'z-10 scale-75 opacity-40 -translate-x-[95px]'
          : 'z-10 scale-75 opacity-40 translate-x-[95px]'
    ]"
  >
    <img
      :src="item.data.image"
      :alt="'testimonial-' + item.realIndex"
      :class="[
        'w-[190px] h-[224px] object-cover rounded-[32px] transition-all duration-300 select-none pointer-events-none',
        selectedIndex === item.realIndex && item.pos === 0
          ? 'ring-3 ring-[#A36C53] ring-inset'
          : ''
      ]"
      draggable="false"
    />
  </div>
</div>

    <!-- تبلت و دسکتاپ: لیست کارت‌های تصاویر (طرح اصلی، لوپ) -->
    <div class="relative w-full hidden md:flex flex-col items-center gap-6 min-[1920px]:gap-10 mb-6">
      <div class="flex gap-3 sm:gap-4 md:gap-6 min-[1920px]:gap-10 overflow-hidden w-full justify-center">
        <div
          v-for="(item, index) in visibleTestimonials"
          :key="item.realIndex"
          :ref="el => { cardRefs[item.realIndex] = el }"
          @click="selectCard(item.realIndex)"
          class="relative flex flex-col items-center"
        >
          <img
            :src="item.data.image"
            :alt="'testimonial-' + item.realIndex"
            :class="[
              'cursor-pointer w-[230px] h-[271px] sm:w-[220px] sm:h-[259px] md:w-[266px] md:h-[313px] min-[1920px]:w-[320px] min-[1920px]:h-[376px] object-cover rounded-[32px] sm:rounded-[38px] md:rounded-[49px] min-[1920px]:rounded-[56px] transition-all duration-300',
              selectedIndex === item.realIndex
                ? 'opacity-100 ring-3 sm:ring-4 ring-[#A36C53] ring-inset'
                : 'opacity-95 hover:opacity-100'
            ]"
          />
        </div>
      </div>
    </div>

    <!-- دکمه‌های اسلایدر: فقط در تبلت و دسکتاپ نمایش داده می‌شن -->
    <div class="hidden md:flex justify-center items-center gap-2 mt-6 sm:mt-8 min-[1920px]:mt-10">
      <SliderButton
        direction="left"
        @click="prevSlide"
      />

      <SliderButton
        direction="right"
        @click="nextSlide"
      />
    </div>

    <!-- بخش نمایش متن انتخاب شده (در صورت انتخاب یک کارت) -->
    <div
      v-if="selectedIndex !== null"
      class="testimonial-box relative bg-[#ABD7D840] w-full sm:w-[85%] md:w-[919px] min-[1920px]:w-[1100px] min-h-[180px] sm:min-h-[210px] md:min-h-[239px] min-[1920px]:min-h-[280px] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] min-[1920px]:rounded-[48px] p-4 sm:p-6 md:p-8 min-[1920px]:p-10 mt-8 sm:mt-10 md:mt-12 min-[1920px]:mt-14 mx-auto transition-all duration-500"
    >

      <!-- نشانگر زبانه (Indicator) - در موبایل ثابت و وسط، در تبلت/دسکتاپ داینامیک -->
      <div 
        class="notch absolute -top-[20px] sm:-top-[26px] md:-top-[30px] min-[1920px]:-top-[34px] w-[90px] sm:w-[110px] md:w-[120px] bg-[#F7F3EB] transition-all duration-500 ease-out flex justify-center items-center z-10 mt-[20px] sm:mt-[26px] md:mt-[30px] min-[1920px]:mt-[34px]"
        :style="isMobile 
          ? { left: '50%', width: notchWidth + 'px', transform: 'translateX(-50%)' } 
          : { left: indicatorLeft + 'px', width: notchWidth + 'px', transform: 'translateX(-50%)' }"
      >
        <img src="/images/arrow-on-team3.png" alt="arrow" class="-mt-[22px] sm:-mt-[28px] md:-mt-[35px] min-[1920px]:-mt-[40px] h-[44px] sm:h-[56px] md:h-[69px] min-[1920px]:h-[78px]">
      </div>

      <!-- متن نظرات -->
      <h1 class="font-bold text-[#0F184B] text-[18px] sm:text-[22px] md:text-[26px] min-[1920px]:text-[30px] mt-[30px] sm:mt-[40px] md:mt-[50px] min-[1920px]:mt-[56px] text-center">
        تجربه همکاری از زبان مشتری 
      </h1>
      <p class="text-[#616474] text-right text-[12px] sm:text-[13px] md:text-[14px] min-[1920px]:text-[16px] font-light leading-[26px] sm:leading-[36px] md:leading-[50px] min-[1920px]:leading-[56px] pt-4 text-center font-roboto">
        {{ testimonials[selectedIndex].text }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useMobileSlider } from '@/composables/useMobileSlider'

const selectedIndex = ref(0); // کارت اول به صورت پیش‌فرض انتخاب شده است
const cardRefs = ref([]);
const indicatorLeft = ref(0);
const notchWidth = ref(140);
const isMobile = ref(false);
const visibleCount = ref(3);

const testimonials = [
  { image: '/images/img-services.png', text: '«همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود. از همان جلسات اولیه، نیازها و اهداف ما به‌خوبی درک شد و تمام مراحل پروژه با برنامه‌ریزی دقیق پیش رفت. کیفیت اجرای کار، سرعت پاسخگویی و توجه به جزئیات باعث شد نتیجه نهایی حتی بهتر از انتظارات ما باشد. از همکاری با این تیم بسیار رضایت داریم و قطعاً در پروژه‌های آینده نیز از خدمات آن‌ها استفاده خواهیم کرد.»' },
  { image: '/images/eventheader.jpg', text: '«همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود. از همان جلسات اولیه، نیازها و اهداف ما به‌خوبی درک شد و تمام مراحل پروژه با برنامه‌ریزی دقیق پیش رفت. کیفیت اجرای کار، سرعت پاسخگویی و توجه به جزئیات باعث شد نتیجه نهایی حتی بهتر از انتظارات ما باشد. از همکاری با این تیم بسیار رضایت داریم و قطعاً در پروژه‌های آینده نیز از خدمات آن‌ها استفاده خواهیم کرد.»' },
  { image: '/images/img-services.png', text: '«همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود. از همان جلسات اولیه، نیازها و اهداف ما به‌خوبی درک شد و تمام مراحل پروژه با برنامه‌ریزی دقیق پیش رفت. کیفیت اجرای کار، سرعت پاسخگویی و توجه به جزئیات باعث شد نتیجه نهایی حتی بهتر از انتظارات ما باشد. از همکاری با این تیم بسیار رضایت داریم و قطعاً در پروژه‌های آینده نیز از خدمات آن‌ها استفاده خواهیم کرد.»' },
  { image: '/images/eventheader.jpg', text: '«همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود. از همان جلسات اولیه، نیازها و اهداف ما به‌خوبی درک شد و تمام مراحل پروژه با برنامه‌ریزی دقیق پیش رفت. کیفیت اجرای کار، سرعت پاسخگویی و توجه به جزئیات باعث شد نتیجه نهایی حتی بهتر از انتظارات ما باشد. از همکاری با این تیم بسیار رضایت داریم و قطعاً در پروژه‌های آینده نیز از خدمات آن‌ها استفاده خواهیم کرد.»' },
  { image: '/images/eventheader.jpg', text: '«همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود. از همان جلسات اولیه، نیازها و اهداف ما به‌خوبی درک شد و تمام مراحل پروژه با برنامه‌ریزی دقیق پیش رفت. کیفیت اجرای کار، سرعت پاسخگویی و توجه به جزئیات باعث شد نتیجه نهایی حتی بهتر از انتظارات ما باشد. از همکاری با این تیم بسیار رضایت داریم و قطعاً در پروژه‌های آینده نیز از خدمات آن‌ها استفاده خواهیم کرد.»' }
];

// تابع محاسبه موقعیت نشانگر (فقط برای تبلت/دسکتاپ استفاده می‌شود)
const updateIndicator = async () => {
  await nextTick()

  // در موبایل نشانگر همیشه وسط و ثابت است، نیازی به محاسبه نیست
  if (isMobile.value) return

  const card = cardRefs.value[selectedIndex.value]

  if (!card) {
    indicatorLeft.value = 70
    return
  }

  const detailsBox = document.querySelector('.testimonial-box')

  if (!detailsBox) return

  const cardRect = card.getBoundingClientRect()
  const detailsRect = detailsBox.getBoundingClientRect()

  const halfNotch = notchWidth.value / 2

  indicatorLeft.value = Math.max(
    halfNotch,
    Math.min(
      cardRect.left - detailsRect.left + cardRect.width / 2,
      detailsRect.width - halfNotch
    )
  )
}

// تشخیص سایز صفحه و تعیین تعداد کارت‌های قابل نمایش
const updateResponsiveValues = () => {
  const w = window.innerWidth;

  if (w < 640) {
    visibleCount.value = 1;
    notchWidth.value = 90;
    isMobile.value = true;
  } else if (w < 768) {
    visibleCount.value = 2;
    notchWidth.value = 110;
    isMobile.value = false;
  } else if (w < 1920) {
    visibleCount.value = 3;
    notchWidth.value = 140;
    isMobile.value = false;
  } else {
    visibleCount.value = 3;
    notchWidth.value = 160;
    isMobile.value = false;
  }
};

let resizeHandler = null;

// اجرای محاسبه موقعیت در لحظه لود شدن صفحه
onMounted(() => {
  updateResponsiveValues();
  updateIndicator();

  resizeHandler = () => {
    updateResponsiveValues();
    updateIndicator();
  };

  window.addEventListener('resize', resizeHandler);
});

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
});

// انتخاب کارت در دسکتاپ/تبلت: فقط هایلایت می‌کنه، بدون جابه‌جایی پنجره‌ی اسلایدر
const selectCard = (index) => { 
  selectedIndex.value = index; 
  updateIndicator();
};

// --- اسلایدر موبایل + دکمه‌های next/prev + سواپ لمسی (composable مشترک) ---
// هر بار اسلاید عوض بشه (سواپ، دکمه، یا کلیک روی کارت موبایل)، هم selectedIndex هم indicator آپدیت می‌شن
const {
  mobileVisibleItems: mobileVisibleTestimonials,
  visibleItems,
  goToSlide,
  nextSlide,
  prevSlide,
  onTouchStart,
  onTouchEnd,
} = useMobileSlider(testimonials, {
  swipeThreshold: 50,
  onChange: (idx) => {
    selectedIndex.value = idx
    updateIndicator()
  },
})

const visibleTestimonials = visibleItems(visibleCount)
</script>

<style scoped>

.notch {
  position: absolute;
  height: 15px;
  background: #F7F3EB;

  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

/* قوس چپ */
.notch::before {
  content: "";
  position: absolute;
  left: -20px;
  top: 0;
  width: 20px;
  height: 20px;

  border-top-right-radius: 20px;
  box-shadow: 10px -10px 0 #F7F3EB; 
}

/* قوس راست */
.notch::after {
  content: "";
  position: absolute;
  right: -20px;
  top: 0;
  width: 20px;
  height: 20px;
  border-top-left-radius: 20px;
  box-shadow: -10px -10px 0 #F7F3EB;
}

@media (max-width: 767px) {
  .notch::before,
  .notch::after {
    width: 14px;
    height: 14px;
  }
  .notch::before {
    left: -14px;
    box-shadow: 7px -7px 0 #F7F3EB;
    border-top-right-radius: 14px;
  }
  .notch::after {
    right: -14px;
    box-shadow: -7px -7px 0 #F7F3EB;
    border-top-left-radius: 14px;
  }
}

@media (min-width: 1920px) {
  .notch::before,
  .notch::after {
    width: 24px;
    height: 24px;
  }
  .notch::before {
    left: -24px;
    box-shadow: 12px -12px 0 #F7F3EB;
    border-top-right-radius: 24px;
  }
  .notch::after {
    right: -24px;
    box-shadow: -12px -12px 0 #F7F3EB;
    border-top-left-radius: 24px;
  }
}

</style>