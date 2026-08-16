<script setup>
import { useMobileSlider } from "@/composables/useMobileSlider";
import { RESUME_CATEGORY_IDS } from "@/composables/useResumes";

// --- i18n ---
const { localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

// این بخش فقط پروژه‌های دسته‌بندی «تولید محتوا» رو نشون می‌ده،
// پس category_id واقعی (8) مستقیم پاس داده می‌شه.
const { items: projects, pending, error } = useResumes(RESUME_CATEGORY_IDS.content);

const {
  mobileVisibleItems: mobileVisibleProjects,
  visibleItems,
  nextSlide,
  prevSlide,
  onTouchStart,
  onTouchEnd,
} = useMobileSlider(projects, { swipeThreshold: 40 });

const visibleProjects = visibleItems(4);

</script>

<template>
  <div
    class="bg-center py-10 md:py-14 xl:py-16 xl:-mt-[70px] min-[1920px]:py-20 min-[1920px]:-mt-[90px]"
    :dir="isRtl ? 'rtl' : 'ltr'"
  >
    <div class="max-w-6xl mx-auto px-4 xl:px-0 min-[1920px]:max-w-[1600px]">
      <h1
        class="ml-auto bg-[#BFD1D5] dark:bg-[#5C9E9E] w-[140px] h-[36px] text-[14px] md:w-[160px] md:h-[40px] md:text-[16px] xl:w-[178px] xl:h-[43px] xl:text-[18px] text-[#0F184B] dark:text-[#E9F1F2] rounded-[19px] shadow-sm flex items-center justify-center mt-[50px] md:mt-[70px] xl:mt-[100px] min-[1920px]:w-[200px] min-[1920px]:h-[48px] min-[1920px]:text-[20px] min-[1920px]:mt-[130px]"
      >
        {{ $t('order.contentOrder.badge') }}
      </h1>

      <!-- حالت لودینگ / خطا / خالی -->
      <div v-if="pending" class="text-center text-[#747893] mt-10">
        {{ $t('order.contentOrder.loading') }}
      </div>
      <div v-else-if="error" class="text-center text-red-500 mt-10">
        {{ $t('order.contentOrder.error') }}
      </div>
      <div
        v-else-if="projects.length === 0"
        class="text-center text-[#747893] mt-10"
      >
        {{ $t('order.contentOrder.empty') }}
      </div>

      <template v-else>
        <!-- موبایل: کارت وسط بزرگ + کارت‌های قبلی/بعدی نیمه‌پیدا + سواپ با انگشت -->
        <div
          class="relative flex md:hidden items-center justify-center h-[280px] mt-8 overflow-hidden touch-pan-y"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        >
          <div
            v-for="item in mobileVisibleProjects"
            :key="item.realIndex"
            class="absolute transition-all duration-500 ease-out"
            :class="[
              item.pos === 0
                ? 'z-20 scale-100 opacity-100 translate-x-0'
                : item.pos === -1
                  ? 'z-10 scale-75 opacity-40 -translate-x-[105px]'
                  : 'z-10 scale-75 opacity-40 translate-x-[105px]',
            ]"
          >
            <NuxtLink :to="localePath(`/order/${item.data.slug}`)">
              <img
                :src="resumeCover(item.data)"
                class="w-[220px] h-[252px] object-cover rounded-[30px] shadow-lg select-none pointer-events-none"
                :alt="item.data.title"
                draggable="false"
              />
            </NuxtLink>
          </div>
        </div>

        <!--
        تبلت و دسکتاپ: گرید نسبی (fr-based) به‌جای عرض ثابت پیکسلی.
        md/lg (۷۶۸ تا ۱۲۷۹ - iPad mini/Air/Pro در پرتره و لندسکیپ): ۳ ستون
        xl/2xl (۱۲۸۰ به بالا): ۴ ستون
        min-[1920px]: تنظیمات اختصاصی برای مانیتورهای Full HD (۱۹۲۰x۱۰۸۰ / ۱۹۲۰x۱۰۲۴)
      -->
<div
  class="hidden md:grid grid-cols-4 gap-4 md:gap-5 lg:gap-6 xl:gap-8 2xl:gap-[60px] justify-items-center mt-8 md:mt-10 xl:mt-[50px] min-[1920px]:gap-[80px] min-[1920px]:mt-[70px]"
>
  <div
    v-for="(item, index) in visibleProjects"
    :key="item.realIndex"
    class="w-full max-w-[200px] md:max-w-[220px] lg:max-w-[250px] xl:max-w-[280px] 2xl:max-w-[312px] min-[1920px]:max-w-[340px] aspect-[312/358] bg-white rounded-[30px] xl:rounded-[40px] shadow-lg cursor-pointer transition-all duration-300 hover:scale-105"
    :class="[
      index % 2 === 0
        ? 'md:-translate-y-4 xl:-translate-y-6 min-[1920px]:-translate-y-8'
        : 'md:translate-y-4 xl:translate-y-6 min-[1920px]:translate-y-8',
    ]"
  >
    <NuxtLink :to="localePath(`/order/${item.data.slug}`)">
      <img
        :src="resumeCover(item.data)"
        class="w-full h-full object-cover rounded-[30px] xl:rounded-[40px]"
        :alt="item.data.title"
      />
    </NuxtLink>
  </div>
</div>
      </template>

      <!-- دکمه‌های اسلایدر: فقط در تبلت و دسکتاپ نمایش داده می‌شن -->
      <div
        class="hidden md:flex justify-center gap-4 z-20 mt-8 md:mt-10 xl:mt-[130px] min-[1920px]:mt-[160px] min-[1920px]:gap-6"
      >
        <SliderButton :direction="isRtl ? 'left' : 'right'" @click="nextSlide" />
        <SliderButton :direction="isRtl ? 'right' : 'left'" @click="prevSlide" />
      </div>
    </div>
  </div>
</template>