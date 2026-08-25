<template>
  <div
    class="max-w-6xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-[1700px] mx-auto mt-12 text-center px-4"
    :dir="isRtl ? 'rtl' : 'ltr'"
  >
    <!-- عنوان اصلی بخش هیرو صفحه -->
    <h1
      class="font-bold text-[#0F184B] dark:text-white mb-5 leading-relaxed lg:mb-[15px] 2xl:mb-3 break-words w-full max-w-full"
      style="font-size: clamp(13px, 2.5vw, 40px);"
    >
      {{ $t('home.hero.titlePart1') }}
      <span class="text-[#B18F55]">{{ $t('home.hero.titleHighlight') }}</span>
      {{ $t('home.hero.titlePart2') }}
    </h1>

    <!-- اسلایدر بنرهای تبلیغاتی -->
    <div
      v-if="slides.length"
      class="relative w-full max-w-[976px] lg:max-w-[1100px] xl:max-w-[1280px] 2xl:max-w-[1500px] aspect-[21/9] rounded-[17px] overflow-hidden mx-auto shadow-lg"
    >
      <Transition name="slide-fade">
        <div :key="currentSlide" class="absolute inset-0 w-full h-full">
          <NuxtLink :to="localePath('/order/requestProject')" class="block w-full h-full">
            <img
              :src="slides[currentSlide].image"
              :alt="slides[currentSlide].alt || slides[currentSlide].title"
              class="w-full h-full object-cover"
            />
          </NuxtLink>
        </div>
      </Transition>
    </div>

    <!-- دکمه‌های کنترل قبلی و بعدی اسلایدر -->
    <div
      v-if="slides.length > 1"
      class="flex justify-center gap-4 mt-6 lg:mt-8 2xl:mt-10 lg:gap-5 2xl:gap-6"
    >
      <IconsSliderButton direction="left" @click="handlePrev" />
      <IconsSliderButton direction="right" @click="handleNext" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

// وضعیت اسلاید فعلی و لیست اسلایدها
const currentSlide = ref(0);
const slides = ref([]);

const config = useRuntimeConfig();

// --- i18n ---
const { localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

// دریافت داده بنرها از API
const { data, error } = await useFetch('https://nadertechnologyteam.ir/api/banners', {
  baseURL: config.public.apiBase,
});

if (error.value) {
  console.error('خطا در دریافت بنرها:', error.value);
} else {
  slides.value = data.value?.data || [];
}

// رفتن به اسلاید بعدی
const nextSlide = () => {
  if (!slides.value.length) return;
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

// رفتن به اسلاید قبلی
const prevSlide = () => {
  if (!slides.value.length) return;
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

let autoplayTimer = null;

// شروع پخش خودکار اسلایدها
const startAutoplay = () => {
  stopAutoplay();
  if (slides.value.length <= 1) return;
  autoplayTimer = setInterval(() => {
    nextSlide();
  }, 8000);
};

// توقف پخش خودکار اسلایدها
const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

// کلیک روی دکمه بعدی به همراه ری‌استارت پخش خودکار
const handleNext = () => {
  nextSlide();
  startAutoplay();
};

// کلیک روی دکمه قبلی به همراه ری‌استارت پخش خودکار
const handlePrev = () => {
  prevSlide();
  startAutoplay();
};

// شروع پخش خودکار هنگام مانت شدن کامپوننت
onMounted(() => {
  startAutoplay();
});

// توقف پخش خودکار هنگام از بین رفتن کامپوننت
onUnmounted(() => {
  stopAutoplay();
});

// ری‌استارت پخش خودکار با تغییر تعداد اسلایدها
watch(
  () => slides.value.length,
  () => {
    startAutoplay();
  }
);
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: scale(1.04);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
.slide-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>