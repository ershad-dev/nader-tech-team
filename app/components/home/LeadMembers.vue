<template>
  <div class="max-w-6xl 2xl:max-w-[1600px] mx-auto px-4 mt-2 sm:mt-14 md:mt-10 xl:mt-2 2xl:mt-2 relative">

    <div class="relative w-full">
      <img src="/images/bg-team.svg" class="-mr-[7px] max-aouto w-full h-full md:h-auto object-cover rounded-[1.5rem] sm:rounded-[2.2rem] md:rounded-[2.6rem] xl:rounded-[3rem] 2xl:rounded-[3.4rem] dark:brightness-[0.7] dark:contrast-125" alt="Background" />

      <!-- موبایل: کارت وسط بزرگ + کارت‌های قبلی/بعدی نیمه‌پیدا (لوپ + انیمیشن + سواپ با انگشت) -->
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
                ? 'z-10 scale-75 opacity-40 -translate-x-[80px]'
                : 'z-10 scale-75 opacity-40 translate-x-[80px]'
          ]"
        >
          <div
            :class="[
              'bg-white dark:bg-dark-input rounded-[20px] h-[110px] w-[100px] shadow-lg dark:shadow-none dark:ring-1 dark:ring-dark-border transition-all duration-300 flex flex-col overflow-hidden',
              selectedIndex === item.realIndex && item.pos === 0
                ? 'ring-3 ring-[#A36C53] dark:ring-dark-gold ring-inset'
                : ''
            ]"
          >
            <div class="w-full h-[72px] overflow-hidden">
              <img
                :src="item.data.image"
                :alt="item.data.name"
                class="w-full h-full object-scale-down select-none pointer-events-none"
                draggable="false"
              />
            </div>

            <div
              class="mt-auto py-1 px-1 text-center"
              style="background: linear-gradient(90deg, rgba(44, 115, 121, 0) 0%, rgba(44, 115, 121, 0.22) 100%);"
            >
              <p class="text-[#747893] dark:text-dark-text font-normal text-[8px] font-roboto truncate">{{ item.data.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- تبلت و دسکتاپ: گرید کارت‌ها (absolute روی همون کانتینر عکس، دیگه با margin منفی حدسی جدا نمی‌افته) -->
      <div class="hidden md:flex absolute inset-0 justify-center items-end pb-6 xl:pb-8 2xl:pb-10 px-4">

        <div class="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 2xl:gap-5 w-[600px] xl:w-[853px] 2xl:w-[1300px]">

          <div
            v-for="(member, index) in teamMembers"
            :key="member.id"
            :ref="el => { cardRefs[index] = el }"
            @click="selectMember(index)"
            :class="[
              'bg-white dark:bg-dark-input rounded-[14px] sm:rounded-[20px] md:rounded-[28px] xl:rounded-[40px] 2xl:rounded-[48px] h-[74px] w-[68px] sm:h-[85px] sm:w-[90px] md:h-[130px] md:w-[140px] xl:h-[185px] xl:w-[200px] 2xl:h-[280px] 2xl:w-[305px] shadow-lg dark:shadow-none dark:ring-1 dark:ring-dark-border transition-all duration-300 cursor-pointer flex flex-col overflow-hidden',
              selectedIndex === index ? 'ring-3 ring-[#A36C53] dark:ring-dark-gold ring-inset' : ''
            ]"
          >
            <div class="w-full h-[48px] sm:h-[62px] md:h-[105px] xl:h-[155px] 2xl:h-[235px] overflow-hidden">
              <img
                :src="member.image"
                :alt="member.name"
                class="w-full h-full object-scale-down"
              />
            </div>

            <div
              class="mt-auto py-1.5 sm:py-1.5 md:py-2.5 xl:py-4 2xl:py-5 px-1 md:px-1.5 xl:px-2 2xl:px-2.5 text-center relative"
              style="background: linear-gradient(90deg, rgba(44, 115, 121, 0) 0%, rgba(44, 115, 121, 0.22) 100%);"
            >
                <p class="text-[#747893] dark:text-dark-text font-normal text-[8px] sm:text-[10px] md:text-[13px] xl:text-[16px] 2xl:text-[19px] font-roboto truncate">{{ member.name }}</p>

                <div v-if="selectedIndex === index" class="absolute -top-3 left-1/2 -translate-x-1/2">
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div v-if="selectedIndex !== null" class="mt-[40px] sm:mt-[60px] md:mt-24 md:mt-28 xl:mt-32 2xl:mt-36 relative text-center px-2 sm:px-4 md:px-8 xl:px-16 2xl:px-20 animate-fade-in">

        <div
          class="notch absolute -top-[18px] sm:-top-[24px] md:-top-[27px] xl:-top-[30px] 2xl:-top-[34px] transition-all duration-500 ease-out flex justify-center items-center z-10 mt-[18px] sm:mt-[24px] md:mt-[27px] xl:mt-[30px] 2xl:mt-[34px]"
          :style="{
            '--notch-color': notchColor,
            left: isMobile ? '50%' : indicatorLeft + 'px',
            width: notchWidth + 'px',
            transform: 'translateX(-50%)'
          }"
        >
          <img src="/images/arrow-on-team3.png" alt="arrow" class="-mt-[18px] sm:-mt-[24px] md:-mt-[27px] xl:-mt-[30px] 2xl:-mt-[34px] h-[30px] sm:h-[40px] md:h-[45px] xl:h-[50px] 2xl:h-[56px] dark:brightness-90">
        </div>

      <div class="w-full sm:w-[600px] md:w-[700px] xl:w-[875px] 2xl:w-[1300px] mx-auto bg-[#ABD7D8]/25 dark:bg-dark-surface/40 p-4 sm:p-6 md:p-7 xl:p-8 2xl:p-9 rounded-b-[28px] rounded-t-[10px] sm:rounded-b-[38px] sm:rounded-t-[14px] md:rounded-b-[44px] md:rounded-t-[15px] xl:rounded-b-[50px] xl:rounded-t-[17px] 2xl:rounded-b-[56px] 2xl:rounded-t-[19px] border border-[#ABD7D8]/30 dark:border-dark-border/40 text-right mt-[40px] sm:-mt-[75px] md:-mt-[88px] xl:-mt-[100px] 2xl:-mt-[112px] shadow-[0px_3px_2px_0px_rgba(0,0,0,0.5)]">

<h3
  :class="[
    'text-[12px] sm:text-[13px] md:text-[15px] xl:text-[16px] 2xl:text-[24px] font-normal text-[#0F184B] dark:text-dark-text mb-2 sm:mb-3 font-medium  transition-all duration-300  -mt-[10px]',
    !isMobile && selectedIndex >= 1
      ? 'mr-[5px] sm:mr-[45px] md:mr-[70px] xl:mr-[60px] 2xl:mr-[70px]'
      : !isMobile
        ? 'mr-[80px] sm:mr-[130px] md:mr-[190px] xl:mr-[175px] 2xl:mr-[200px]'
        : ''
  ]"
>
  {{ teamMembers[selectedIndex].name }}
</h3>
        <p class="text-slate-700 dark:text-dark-text/90 text-[12px] sm:text-[13px] md:text-[14px] xl:text-base 2xl:text-[22px] text-rught mx-auto font-roboto mt-2 sm:mt-[10px]">
          {{ teamMembers[selectedIndex].bio }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import { useMobileSlider } from '@/composables/useMobileSlider'

const colorMode = useColorMode();
// notch باید هم‌رنگ پس‌زمینه‌ی اصلی سایت باشه: dark-bg در دارک، #F7F3EB در روشن
const notchColor = computed(() => (colorMode.value === 'dark' ? '#435056' : '#F7F3EB'));

const selectedIndex = ref(null);
const cardRefs = ref([]);
const indicatorLeft = ref(0);
const notchWidth = ref(100);
const isMobile = ref(false);

const teamMembers = [
  { id: 1, name: 'مشخصات شخص', bio: 'تیم ما با تکیه بر تخصص، خلاقیت و کیفیت، بهترین راهکارها را در زمینه طراحی سایت، تولید محتوا و برگزاری رویدادها ارائه می‌دهد.', image: '/images/icon-team.jpg' },
  { id: 2, name: ' مشخصات شخص', bio: 'تیم ما متشکل از متخصصان باتجربه در حوزه طراحی سایت، تولید محتوا و برگزاری رویدادها است. ما با تمرکز بر کیفیت، خلاقیت و ارائه راهکارهای مؤثر، تلاش می‌کنیم بهترین نتیجه را برای مشتریان خود رقم بزنیم. همکاری تیمی، نوآوری و توجه به جزئیات از مهم‌ترین ارزش‌های ما هستند..', image: '/images/icon-team.jpg' },
  { id: 3, name: 'مشخصات شخص', bio: 'تیم ما متشکل از متخصصان باتجربه در حوزه طراحی سایت، تولید محتوا و برگزاری رویدادها است. ما با تمرکز بر کیفیت، خلاقیت و ارائه راهکارهای مؤثر، تلاش می‌کنیم بهترین نتیجه را برای مشتریان خود رقم بزنیم. همکاری تیمی، نوآوری و توجه به جزئیات از مهم‌ترین ارزش‌های ما هستند.', image: '/images/icon-team.jpg' },
  { id: 4, name: 'مشخصات شخص', bio: 'تیم ما متشکل از متخصصان باتجربه در حوزه طراحی سایت، تولید محتوا و برگزاری رویدادها است. ما با تمرکز بر کیفیت، خلاقیت و ارائه راهکارهای مؤثر، تلاش می‌کنیم بهترین نتیجه را برای مشتریان خود رقم بزنیم. همکاری تیمی، نوآوری و توجه به جزئیات از مهم‌ترین ارزش‌های ما هستند.', image: '/images/icon-team.jpg' }
];

const updateNotchWidth = () => {
  const w = window.innerWidth;
  if (w < 640) {
    notchWidth.value = 45;
    isMobile.value = true;
  } else if (w < 768) {
    notchWidth.value = 60;
    isMobile.value = true;
  } else if (w < 1280) {
    notchWidth.value = 85;
    isMobile.value = false;
  } else if (w < 1536) {
    notchWidth.value = 100;
    isMobile.value = false;
  } else {
    notchWidth.value = 120;
    isMobile.value = false;
  }
};

// محاسبه موقعیت نشانگر برای یک ایندکس مشخص (فقط در تبلت/دسکتاپ)
const updateIndicatorPosition = async (index) => {
  await nextTick();

  if (isMobile.value) return;

  if (cardRefs.value[index]) {
    const card = cardRefs.value[index];
    indicatorLeft.value = card.offsetLeft + (card.offsetWidth / 2);
  }
};

let resizeHandler = null;

// --- اسلایدر موبایل + دکمه‌های next/prev + سواپ لمسی (composable مشترک) ---
// انتخاب هر عضو (چه از موبایل، چه از دسکتاپ) هم پنجره‌ی اسلایدر رو جابه‌جا می‌کنه هم selectedIndex/indicator رو آپدیت می‌کنه
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

onMounted(() => {
  updateNotchWidth();
  resizeHandler = () => {
    updateNotchWidth();
    if (selectedIndex.value !== null && !isMobile.value) updateIndicatorPosition(selectedIndex.value);
  };
  window.addEventListener('resize', resizeHandler);
  selectMember(0);
});

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

  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

.notch::before {
  content: "";
  position: absolute;
  left: -20px;
  top: 0;
  width: 20px;
  height: 20px;

  border-top-right-radius: 20px;
  box-shadow: 10px -10px 0 var(--notch-color, #F7F3EB);
}

.notch::after {
  content: "";
  position: absolute;
  right: -20px;
  top: 0;
  width: 20px;
  height: 20px;
  border-top-left-radius: 20px;
  box-shadow: -10px -10px 0 var(--notch-color, #F7F3EB);
}

@media (max-width: 767px) {
  .notch {
    height: 14px;
  }
  .notch::before,
  .notch::after {
    width: 11px;
    height: 11px;
  }
  .notch::before {
    left: -11px;
    box-shadow: 5px -5px 0 var(--notch-color, #F7F3EB);
    border-top-right-radius: 11px;
  }
  .notch::after {
    right: -11px;
    box-shadow: -5px -5px 0 var(--notch-color, #F7F3EB);
    border-top-left-radius: 11px;
  }
}

@media (min-width: 1536px) {
  .notch {
    height: 30px;
  }
}
</style>