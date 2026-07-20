<template>
  <div class="max-w-6xl [@media(min-width:1920px)_and_(min-height:1024px)]:max-w-[1600px] mx-auto mt-12 text-center px-4 [@media(min-width:1920px)_and_(min-height:1024px)]:px-0" dir="rtl">
    <h1 class="text-[20px] md:text-[32px] [@media(min-width:1920px)_and_(min-height:1024px)]:text-[40px] font-bold text-[#0F184B] mb-8 leading-relaxed [@media(min-width:1920px)_and_(min-height:1024px)]:mb-12 [@media(min-width:1920px)_and_(min-height:1024px)]:text-[44px]">
      با دقت می اندیشیم ،با کیفیت میسازیم، با جسارت <span class="text-[#B18F55]">فتح </span> میکنیم
    </h1>

    <div
      v-if="slides.length"
      class="relative w-full max-w-[976px] [@media(min-width:1920px)_and_(min-height:1024px)]:max-w-[1600px] h-[200px] md:h-[406px] [@media(min-width:1920px)_and_(min-height:1024px)]:h-[700px] rounded-[17px] overflow-hidden mx-auto shadow-lg"
    >
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        v-show="currentSlide === index"
        class="w-full h-full transition-opacity duration-500"
      >
        <NuxtLink to="/auth/login" class="block w-full h-full">
          <img :src="slide.image" :alt="slide.alt || slide.title" class="w-full h-full object-cover" />
        </NuxtLink>
      </div>
    </div>

    <div
      v-if="slides.length > 1"
      class="flex justify-center gap-4 mt-6 [@media(min-width:1920px)_and_(min-height:1024px)]:mt-10 [@media(min-width:1920px)_and_(min-height:1024px)]:gap-6"
    >
      <HomeIconsSliderButton direction="left" @click="nextSlide" />
      <HomeIconsSliderButton direction="right" @click="prevSlide" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentSlide = ref(0);
const slides = ref([]);

const config = useRuntimeConfig();

// استفاده مستقیم از useFetch در setup (نه داخل onMounted)
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
</script>