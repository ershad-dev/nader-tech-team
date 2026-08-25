<template>
  <div class="max-w-6xl 2xl:max-w-[1600px] mx-auto px-4 mt-2 sm:mt-14 md:mt-10 xl:mt-2 2xl:mt-2 relative" :dir="isRtl ? 'rtl' : 'ltr'">

    <div class="relative w-full">
      <!-- تصویر پس‌زمینه مخصوص حالت موبایل -->
      <img src="/images/bg-team-tall.svg" class="md:hidden -mr-[7px] max-aouto w-full h-full object-cover rounded-[1.5rem] sm:rounded-[2.2rem]" alt="Background" />
      <!-- تصویر پس‌زمینه مخصوص تبلت و دسکتاپ -->
      <img src="/images/bg-team.svg" class="hidden md:block -mr-[7px] max-aouto w-full h-auto object-cover rounded-[2.6rem] xl:rounded-[3rem] 2xl:rounded-[3.4rem]" alt="Background" />

      <!-- اسلایدر کارت‌های تیم برای حالت موبایل -->
      <div
        class="absolute inset-0 flex md:hidden items-center justify-center mt-[50px]"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <div
          v-for="item in mobileVisibleTeamMembers"
          :key="item.realIndex"
          @click="selectMember(item.realIndex)"
          class="absolute transition-all duration-500 ease-out cursor-pointer"
          :class="[
            item.pos === 0
              ? 'z-20 scale-100 opacity-100 translate-x-0'
              : item.pos === -1
                ? 'z-10 scale-75 opacity-40 -translate-x-[105px]'
                : 'z-10 scale-75 opacity-40 translate-x-[105px]'
          ]"
        >
          <div
            :class="[
              'relative bg-white dark:bg-dark-input rounded-[24px] h-[110px] w-[120px] shadow-lg dark:shadow-none dark:ring-1 dark:ring-dark-border transition-all duration-300 flex flex-col overflow-hidden',
              selectedIndex === item.realIndex && item.pos === 0
                ? 'scale-110 shadow-[0_0_16px_rgba(255,255,255,0.3)]'
                : ''
            ]"
          >
            <img
              :src="item.data.image"
              :alt="$t(`home.team.members.${item.data.id}.name`)"
              class="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              draggable="false"
            />

            <div
              class="mt-auto py-2 px-1.5 text-center relative z-10 backdrop-blur-md"
              style="background: linear-gradient(90deg, rgba(44, 115, 121, 0) 0%, rgba(44, 115, 121, 0.22) 100%);"
            >
              <p class="text-white dark:text-white font-bold text-[10px] font-roboto truncate">{{ $t(`home.team.members.${item.data.id}.name`) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- گرید کارت‌های تیم برای حالت تبلت و دسکتاپ -->
      <div class="hidden md:flex absolute inset-0 justify-center items-end pb-6 lg:pb-7 xl:pb-8 2xl:pb-10 px-4">

        <div class="flex justify-center items-end gap-2 sm:gap-3 md:gap-4 lg:gap-4 2xl:gap-5 w-[600px] lg:w-[730px] xl:w-[853px] 2xl:w-[1300px]">

          <div
            v-for="(member, index) in teamMembers"
            :key="member.id"
            :ref="el => { cardRefs[index] = el }"
            @click="selectMember(index)"
            :class="[
              'relative bg-white dark:bg-dark-input rounded-[14px] sm:rounded-[20px] md:rounded-[28px] lg:rounded-[34px] xl:rounded-[40px] 2xl:rounded-[48px] h-[74px] w-[68px] sm:h-[85px] sm:w-[90px] md:h-[140px] md:w-[140px] lg:h-[170px] lg:w-[170px] xl:h-[195px] xl:w-[200px] 2xl:h-[290px] 2xl:w-[305px] shadow-lg dark:shadow-none dark:ring-1 dark:ring-dark-border transition-all duration-300 ease-out cursor-pointer flex flex-col overflow-hidden hover:scale-110 hover:z-20 hover:mx-2 sm:hover:mx-2.5 md:hover:mx-3 xl:hover:mx-4 2xl:hover:mx-5',
              selectedIndex === index
                ? 'border-[1.5px] border-white/60 dark:border-white/30 scale-105 z-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                : ''
            ]"
          >
            <img
              :src="member.image"
              :alt="$t(`home.team.members.${member.id}.name`)"
              class="absolute inset-0 w-full h-full object-cover"
            />

            <div
              class="mt-auto py-1.5 sm:py-1.5 md:py-2.5 lg:py-3 xl:py-4 2xl:py-5 px-1 md:px-1.5 xl:px-2 2xl:px-2.5 text-center relative z-10 backdrop-blur-md"
              style="background: linear-gradient(90deg, rgba(44, 115, 121, 0) 0%, rgba(44, 115, 121, 0.22) 100%);"
            >
              <p class="text-[#ffffff] dark:text-[#ffffff] font-bold text-[8px] sm:text-[10px] md:text-[13px] lg:text-[14px] xl:text-[16px] 2xl:text-[19px] font-roboto truncate">{{ $t(`home.team.members.${member.id}.name`) }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- بخش نمایش جزئیات عضو انتخاب‌شده تیم -->
    <div v-if="selectedIndex !== null" class="mt-[40px] sm:mt-[60px] md:mt-24 md:mt-28 xl:mt-32 2xl:mt-36 relative text-center px-2 sm:px-4 md:px-8 xl:px-16 2xl:px-20 animate-fade-in">

      <!-- فلش نشانگر (notch) به سمت کارت انتخاب‌شده -->
      <div
        class="notch absolute -top-[18px] sm:-top-[24px] md:-top-[27px] xl:-top-[30px] 2xl:-top-[34px] transition-all duration-500 ease-out flex justify-center items-center z-10 mt-[18px] sm:mt-[24px] md:mt-[27px] xl:mt-[30px] 2xl:mt-[34px]"
        :style="{
          '--notch-color': notchColor,
          left: isMobile ? '50%' : indicatorLeft + 'px',
          width: notchWidth + 'px',
          transform: 'translateX(-50%) scaleY(-1)'
        }"
      >
        <img src="/images/arrow-on-team3.png" alt="arrow" class="notch-arrow mt-[8px] sm:mt-[24px] md:mt-[17px] xl:mt-[15px] 2xl:mt-[10px] h-[30px] sm:h-[40px] md:h-[45px] xl:h-[50px] 2xl:h-[56px]">
      </div>

      <div
        :class="[
          'w-full sm:w-[600px] md:w-[700px] xl:w-[875px] 2xl:w-[1300px] mx-auto bg-[#ABD7D8]/25 dark:bg-[#D9D9D9]/25 p-4 sm:p-6 md:p-7 xl:p-8 2xl:p-9 rounded-b-[28px] rounded-t-[10px] sm:rounded-b-[38px] sm:rounded-t-[14px] md:rounded-b-[44px] md:rounded-t-[15px] xl:rounded-b-[50px] xl:rounded-t-[17px] 2xl:rounded-b-[56px] 2xl:rounded-t-[19px] border border-[#ABD7D8]/30 dark:border-dark-border/40 mt-[40px] sm:-mt-[75px] md:-mt-[88px] xl:-mt-[100px] 2xl:-mt-[112px] shadow-[0px_3px_2px_0px_rgba(0,0,0,0.5)]',
          isRtl ? 'text-right' : 'text-left'
        ]"
      >

        <h3
          :class="[
            'text-[13px] sm:text-[15px] md:text-[17px] xl:text-[18px] 2xl:text-[27px] font-bold text-[#0F184B] dark:text-dark-text-deep mb-2 sm:mb-3 font-medium transition-all duration-300',
            isMobile ? 'mt-[5px]' : '-mt-[10px]',
            !isMobile && selectedIndex >= 1
              ? (isRtl ? 'mr-[5px] sm:mr-[45px] md:mr-[20px] xl:mr-[60px] 2xl:mr-[70px]' : 'ml-[5px] sm:ml-[45px] md:ml-[20px] xl:ml-[60px] 2xl:ml-[70px]')
              : !isMobile
                ? (isRtl ? 'mr-[80px] sm:mr-[130px] md:mr-[150px] xl:mr-[155px] 2xl:mr-[230px]' : 'ml-[80px] sm:ml-[130px] md:ml-[150px] xl:ml-[155px] 2xl:ml-[230px]')
                : ''
          ]"
        >
          {{ $t(`home.team.members.${teamMembers[selectedIndex].id}.role`) }}
        </h3>
        <p class="text-slate-700 dark:text-dark-text-deep/90 text-[14px] sm:text-[15px] md:text-[16px] xl:text-base 2xl:text-[24px] mx-auto font-roboto mt-2 sm:mt-[10px] xl:leading-loose md:leading-loose 2xl:leading-loose">
          {{ $t(`home.team.members.${teamMembers[selectedIndex].id}.bio`) }}
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import { useMobileSlider } from '@/composables/useMobileSlider'

const colorMode = useColorMode();
// رنگ notch متناسب با پس‌زمینه سایت در حالت روشن/تاریک
const notchColor = computed(() => (colorMode.value === 'dark' ? '#435056' : '#F7F3EB'));

// --- i18n ---
const { localeProperties } = useI18n()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

const selectedIndex = ref(null);
const cardRefs = ref([]);
const indicatorLeft = ref(0);
const notchWidth = ref(100);
const isMobile = ref(false);

// لیست اعضای تیم؛ متن‌ها (نام/نقش/بیوگرافی) از i18n خونده میشه
const teamMembers = [
  { id: 1, image: '/images/Idrisipourr.png' },
  { id: 2, image: '/images/sahami.png' },
  { id: 3, image: '/images/naviani.png' },
  { id: 4, image: '/images/mohammadi.png' }
];

// تعیین عرض notch و حالت موبایل بر اساس عرض صفحه
const updateNotchWidth = () => {
  const w = window.innerWidth;
  if (w < 640) {
    notchWidth.value = 60;
    isMobile.value = true;
  } else if (w < 768) {
    notchWidth.value = 100;
    isMobile.value = true;
  } else if (w < 1024) {
    notchWidth.value = 90;
    isMobile.value = false;
  } else if (w < 1280) {
    notchWidth.value = 110;
    isMobile.value = false;
  } else if (w < 1536) {
    notchWidth.value = 150;
    isMobile.value = false;
  } else {
    notchWidth.value = 200;
    isMobile.value = false;
  }
};

// محاسبه موقعیت افقی notch بر اساس کارت انتخاب‌شده
const updateIndicatorPosition = async (index) => {
  await nextTick();

  if (isMobile.value) return;

  if (cardRefs.value[index]) {
    const card = cardRefs.value[index];
    indicatorLeft.value = card.offsetLeft + (card.offsetWidth / 2);
  }
};

let resizeHandler = null;

// اتصال به کامپوزبل اسلایدر موبایل برای مدیریت انتخاب و سواپ
const {
  mobileVisibleItems: mobileVisibleTeamMembers,
  goToSlide: selectMember,
  nextSlide,
  prevSlide,
  onTouchStart,
  onTouchEnd,
} = useMobileSlider(teamMembers, {
  swipeThreshold: 50,
  onChange: (idx) => {
    selectedIndex.value = idx;
    updateIndicatorPosition(idx);
  },
})

// مقداردهی اولیه و ثبت گوش‌دهنده تغییر سایز صفحه
onMounted(() => {
  updateNotchWidth();
  resizeHandler = () => {
    updateNotchWidth();
    if (selectedIndex.value !== null && !isMobile.value) updateIndicatorPosition(selectedIndex.value);
  };
  window.addEventListener('resize', resizeHandler);
  selectMember(0);
});

// حذف گوش‌دهنده تغییر سایز صفحه هنگام از بین رفتن کامپوننت
onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

 .notch {
  position: absolute;
  height: 25px;
  background: var(--notch-color, #F7F3EB);
  --r: 16px;
  clip-path: shape(
    from 0 100%,
    arc by var(--r) calc(-1 * var(--r)) of var(--r),
    vline to var(--r),
    arc by var(--r) calc(-1 * var(--r)) of var(--r) cw,
    curve by calc(100% - 4 * var(--r)) 0 with calc((100% - 4 * var(--r)) / 2) calc(-1 * var(--r) / 2),
    arc by var(--r) var(--r) of var(--r) cw,
    vline to calc(100% - var(--r)),
    arc by var(--r) var(--r) of var(--r)
  );
}

.notch-arrow {
  transform: scaleY(-1);
}

@media (max-width: 767px) {
  .notch {
    height: 14px;
    --r: 8px;
  }
}

@media (min-width: 1536px) {
  .notch {
    height: 30px;
    --r: 19px;
  }
}
</style>