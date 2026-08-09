<template>
  <div
    class="max-w-6xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-[1700px] mx-auto mt-12 text-center px-4"
    dir="rtl"
  >
    <h1
      class="text-[20px] md:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[40px] font-bold text-[#0F184B] mb-8 leading-relaxed lg:mb-10 2xl:mb-12"
    >
      با دقت می اندیشیم ،با کیفیت میسازیم، با جسارت
      <span class="text-[#B18F55]">فتح </span> میکنیم
    </h1>

    <div
      v-if="slides.length"
      class="relative w-full max-w-[976px] lg:max-w-[1100px] xl:max-w-[1280px] 2xl:max-w-[1500px] aspect-[21/9] rounded-[17px] overflow-hidden mx-auto shadow-lg"
    >
      <Transition name="slide-fade">
        <div :key="currentSlide" class="absolute inset-0 w-full h-full">
          <NuxtLink to="/auth/login" class="block w-full h-full">
            <img
              :src="slides[currentSlide].image"
              :alt="slides[currentSlide].alt || slides[currentSlide].title"
              class="w-full h-full object-cover"
            />
          </NuxtLink>
        </div>
      </Transition>
    </div>

    <div
      v-if="slides.length > 1"
      class="flex justify-center gap-4 mt-6 lg:mt-8 2xl:mt-10 lg:gap-5 2xl:gap-6"
    >
      <SliderButton direction="left" @click="handleNext" />
      <SliderButton direction="right" @click="handlePrev" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const currentSlide = ref(0);
const slides = ref([]);

const config = useRuntimeConfig();

const { data, error } = await useFetch('https://nadertechnologyteam.ir/api/banners', {
  baseURL: config.public.apiBase,
});

if (error.value) {
  console.error('خطا در دریافت بنرها:', error.value);
} else {
  slides.value = data.value?.data || [];
}

const nextSlide = () => {
  if (!slides.value.length) return;
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const prevSlide = () => {
  if (!slides.value.length) return;
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

let autoplayTimer = null;

const startAutoplay = () => {
  stopAutoplay();
  if (slides.value.length <= 1) return;
  autoplayTimer = setInterval(() => {
    nextSlide();
  }, 4000);
};

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

const handleNext = () => {
  nextSlide();
  startAutoplay();
};

const handlePrev = () => {
  prevSlide();
  startAutoplay();
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});

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