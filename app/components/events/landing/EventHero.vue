<template>
  <!-- بخش هیرو صفحه رویدادها -->
  <div class="relative w-full h-[380px] sm:h-[500px] md:h-[634px] xxl:h-[800px] overflow-hidden -mt-[90px]" :dir="isRtl ? 'rtl' : 'ltr'">
    <!-- تصویر اصلی (تمام عرض) -->
    <img
      src="/images/event-hero.jpg"
      alt="Event"
      class="w-full h-full object-cover"
    />

    <!-- لایه شیشه‌ای پایین با متن زیرعنوان -->
    <div class="absolute bottom-0 w-full h-[110px] sm:h-[130px] md:h-[154px] bg-white/20 dark:bg-dark-bg/40 backdrop-blur-md flex items-center justify-center border-t border-white/20 dark:border-dark-border/30 px-4 sm:px-6 md:px-4">
      <p class="text-white text-[15px] sm:text-[20px] md:text-[32px] font-bold text-center leading-snug sm:leading-normal">
        {{ $t('events.hero.subtitle') }}
      </p>
    </div>
  </div>
</template>

<script setup>
const { localeProperties } = useI18n()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')
</script>