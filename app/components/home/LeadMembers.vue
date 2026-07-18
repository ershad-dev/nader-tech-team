<template>
  <div class="max-w-6xl 2xl:max-w-[1600px] mx-auto px-4 mt-2 sm:mt-14 md:mt-10 xl:mt-2 2xl:mt-2 relative">

    <div class="relative w-full">
      <img src="/images/bg-team.svg" class="-mr-[7px] max-aouto w-full h-full md:h-auto object-cover rounded-[1.5rem] sm:rounded-[2.2rem] md:rounded-[2.6rem] xl:rounded-[3rem] 2xl:rounded-[3.4rem]" alt="Background" />

      <!-- موبایل: ۲ کارت فعال همیشه وسط (بزرگ+پررنگ) + ۲ کارت کناری کوچیک‌وکمرنگ دو طرف + لوپ + autoplay + سواپ -->
      <div
        class="absolute inset-0 flex md:hidden items-end justify-center gap-2 mt-[140px]"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <div
          v-for="(member, index) in teamMembers"
          :key="member.id"
          :ref="el => { mobileCardRefs[index] = el }"
          @click="selectMember(index)"
          class="cursor-pointer transition-all duration-500 ease-out"
          :style="{ order: getCardOrder(index) }"
          :class="isCardActive(index) ? 'opacity-100 scale-100 z-20' : 'opacity-40 scale-75 z-10'"
        >
          <div
            :class="[
              'bg-white rounded-[20px] shadow-lg transition-all duration-500 flex flex-col overflow-hidden',
              isCardActive(index) ? 'h-[110px] w-[100px]' : 'h-[80px] w-[70px]',
              selectedIndex === index ? 'ring-3 ring-[#A36C53] ring-inset' : ''
            ]"
          >
            <div :class="['w-full overflow-hidden', isCardActive(index) ? 'h-[72px]' : 'h-[50px]']">
              <img
                :src="member.image"
                :alt="member.name"
                class="w-full h-full object-scale-down select-none pointer-events-none"
                draggable="false"
              />
            </div>

            <div
              class="mt-auto py-1 px-1 text-center"
              style="background: linear-gradient(90deg, rgba(44, 115, 121, 0) 0%, rgba(44, 115, 121, 0.22) 100%);"
            >
              <p class="text-[#747893] font-normal text-[7px] font-roboto truncate">{{ member.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- تبلت و دسکتاپ: گرید کارت‌ها (طرح اصلی) -->
      <div class="hidden md:flex justify-center w-full px-4 -mt-[170px] xl:-mt-[230px] 2xl:-mt-[290px]">

        <div class="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 2xl:gap-5 w-[600px] xl:w-[853px] 2xl:w-[1300px]">

          <div
            v-for="(member, index) in teamMembers"
            :key="member.id"
            :ref="el => { cardRefs[index] = el }"
            @click="selectMember(index)"
            :class="[
              'bg-white rounded-[14px] sm:rounded-[20px] md:rounded-[28px] xl:rounded-[40px] 2xl:rounded-[48px] h-[74px] w-[68px] sm:h-[85px] sm:w-[90px] md:h-[130px] md:w-[140px] xl:h-[185px] xl:w-[200px] 2xl:h-[280px] 2xl:w-[305px] shadow-lg transition-all duration-300 cursor-pointer flex flex-col overflow-hidden'
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
                <p class="text-[#747893] font-normal text-[8px] sm:text-[10px] md:text-[13px] xl:text-[16px] 2xl:text-[19px] font-roboto truncate">{{ member.name }}</p>

                <div v-if="selectedIndex === index" class="absolute -top-3 left-1/2 -translate-x-1/2">
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div v-if="selectedIndex !== null" ref="contentWrapperRef" class="mt-[40px] sm:mt-[60px] md:mt-24 md:mt-28 xl:mt-32 2xl:mt-36 relative text-center px-2 sm:px-4 md:px-8 xl:px-16 2xl:px-20 animate-fade-in">

        <div
          class="notch absolute -top-[18px] sm:-top-[24px] md:-top-[27px] xl:-top-[30px] 2xl:-top-[34px] bg-[#F7F3EB] transition-all duration-500 ease-out flex justify-center items-center z-10 mt-[18px] sm:mt-[24px] md:mt-[27px] xl:mt-[30px] 2xl:mt-[34px]"
          :style="{ left: indicatorLeft + 'px', width: notchWidth + 'px', transform: 'translateX(-50%)' }"
        >
          <img src="/images/arrow-on-team3.png" alt="arrow" class="-mt-[18px] sm:-mt-[24px] md:-mt-[27px] xl:-mt-[30px] 2xl:-mt-[34px] h-[30px] sm:h-[40px] md:h-[45px] xl:h-[50px] 2xl:h-[56px]">
        </div>

      <div class="w-full sm:w-[600px] md:w-[700px] xl:w-[875px] 2xl:w-[1300px] mx-auto bg-[#ABD7D8]/25 p-4 sm:p-6 md:p-7 xl:p-8 2xl:p-9 rounded-b-[28px] rounded-t-[10px] sm:rounded-b-[38px] sm:rounded-t-[14px] md:rounded-b-[44px] md:rounded-t-[15px] xl:rounded-b-[50px] xl:rounded-t-[17px] 2xl:rounded-b-[56px] 2xl:rounded-t-[19px] border border-[#ABD7D8]/30 text-right mt-[40px] sm:-mt-[75px] md:-mt-[88px] xl:-mt-[100px] 2xl:-mt-[112px] shadow-[0px_3px_2px_0px_rgba(0,0,0,0.5)]">

<h3
  :class="[
    'text-[10px] sm:text-[13px] md:text-[15px] xl:text-[16px] 2xl:text-[24px] font-normal text-[#0F184B] mb-2 sm:mb-3 font-medium  transition-all duration-300  -mt-[10px]',
    !isMobile && selectedIndex >= 1
      ? 'mr-[5px] sm:mr-[45px] md:mr-[70px] xl:mr-[60px] 2xl:mr-[70px]'
      : !isMobile
        ? 'mr-[80px] sm:mr-[130px] md:mr-[190px] xl:mr-[175px] 2xl:mr-[200px]'
        : ''
  ]"
>
  {{ teamMembers[selectedIndex].name }}
</h3>
        <p class="text-slate-700 text-[12px] sm:text-[13px] md:text-[14px] xl:text-base 2xl:text-[22px] text-rught mx-auto font-roboto mt-2 sm:mt-[10px]">
          {{ teamMembers[selectedIndex].bio }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue';

const selectedIndex = ref(null);
const cardRefs = ref([]);
const mobileCardRefs = ref([]);
const contentWrapperRef = ref(null);
const indicatorLeft = ref(0);
const notchWidth = ref(100);
const isMobile = ref(false);

const teamMembers = [
  { id: 1, name: 'مشخصات شخص', bio: 'تیم ما با تکیه بر تخصص، خلاقیت و کیفیت، بهترین راهکارها را در زمینه طراحی سایت، تولید محتوا و برگزاری رویدادها ارائه می‌دهد.', image: '/images/icon-team.jpg' },
  { id: 2, name: ' مشخصات شخص', bio: 'تیم ما متشکل از متخصصان باتجربه در حوزه طراحی سایت، تولید محتوا و برگزاری رویدادها است. ما با تمرکز بر کیفیت، خلاقیت و ارائه راهکارهای مؤثر، تلاش می‌کنیم بهترین نتیجه را برای مشتریان خود رقم بزنیم. همکاری تیمی، نوآوری و توجه به جزئیات از مهم‌ترین ارزش‌های ما هستند..', image: '/images/icon-team.jpg' },
  { id: 3, name: 'مشخصات شخص', bio: 'تیم ما متشکل از متخصصان باتجربه در حوزه طراحی سایت، تولید محتوا و برگزاری رویدادها است. ما با تمرکز بر کیفیت، خلاقیت و ارائه راهکارهای مؤثر، تلاش می‌کنیم بهترین نتیجه را برای مشتریان خود رقم بزنیم. همکاری تیمی، نوآوری و توجه به جزئیات از مهم‌ترین ارزش‌های ما هستند.', image: '/images/icon-team.jpg' },
  { id: 4, name: 'مشخصات شخص', bio: 'تیم ما متشکل از متخصصان باتجربه در حوزه طراحی سایت، تولید محتوا و برگزاری رویدادها است. ما با تمرکز بر کیفیت، خلاقیت و ارائه راهکارهای مؤثر، تلاش می‌کنیم بهترین نتیجه را برای مشتریان خود رقم بزنیم. همکاری تیمی، نوآوری و توجه به جزئیات از مهم‌ترین ارزش‌های ما هستند.', image: '/images/icon-team.jpg' }
];

const total = teamMembers.length;

// --- گروه‌بندی موبایل: هر گروه ۲ کارت فعال ---
const GROUP_SIZE = 2;
const numGroups = Math.ceil(total / GROUP_SIZE);
const currentGroupIndex = ref(0);

const isCardActive = (index) => {
  const groupStart = currentGroupIndex.value * GROUP_SIZE;
  return index >= groupStart && index < groupStart + GROUP_SIZE;
};

// چیدمان: گروه فعال همیشه وسط (order 2 و 3)، گروه غیرفعال دو طرف (order 1 و 4)
const getCardOrder = (index) => {
  const groupOfIndex = Math.floor(index / GROUP_SIZE);
  const positionInGroup = index % GROUP_SIZE; // 0 یا 1

  if (groupOfIndex === currentGroupIndex.value) {
    // گروه فعال -> وسط (order 2, 3)
    return positionInGroup === 0 ? 2 : 3;
  } else {
    // گروه غیرفعال -> یکی سمت راست (order 1) یکی سمت چپ (order 4)
    return positionInGroup === 0 ? 1 : 4;
  }
};

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

let resizeHandler = null;

// ---- Autoplay ----
const AUTOPLAY_DELAY = 7000; // هر ۷ ثانیه
let autoplayTimer = null;

const startAutoplay = () => {
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    nextGroup();
  }, AUTOPLAY_DELAY);
};

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

onMounted(() => {
  updateNotchWidth();
  resizeHandler = () => {
    updateNotchWidth();
    if (selectedIndex.value !== null) selectMember(selectedIndex.value, false);
  };
  window.addEventListener('resize', resizeHandler);
  selectMember(0);
  startAutoplay();
});

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
  stopAutoplay();
});

// محاسبه موقعیت notch نسبت به کارت انتخاب‌شده (چه موبایل چه دسکتاپ)
const updateIndicatorPosition = () => {
  const activeRef = isMobile.value ? mobileCardRefs.value[selectedIndex.value] : cardRefs.value[selectedIndex.value];
  if (!activeRef || !contentWrapperRef.value) return;

  const cardRect = activeRef.getBoundingClientRect();
  const wrapperRect = contentWrapperRef.value.getBoundingClientRect();

  indicatorLeft.value = (cardRect.left + cardRect.width / 2) - wrapperRect.left;
};

// changeGroup: اگه false باشه یعنی فقط ری‌الاین (بدون تغییر گروه) - برای resize
const selectMember = async (index, changeGroup = true) => {
  selectedIndex.value = index;
  if (changeGroup) {
    currentGroupIndex.value = Math.floor(index / GROUP_SIZE);
  }
  // صبر برای اتمام ترنزیشن سایز/چیدمان کارت‌ها قبل از محاسبه موقعیت notch
  await nextTick();
  updateIndicatorPosition();
  setTimeout(updateIndicatorPosition, isMobile.value ? 520 : 0);
};

// --- Swipe + Autoplay group navigation ---
const touchStartX = ref(0);
const touchEndX = ref(0);
const SWIPE_THRESHOLD = 50;

const nextGroup = () => {
  currentGroupIndex.value = (currentGroupIndex.value + 1) % numGroups;
  const firstIndexOfGroup = currentGroupIndex.value * GROUP_SIZE;
  selectMember(firstIndexOfGroup);
};

const prevGroup = () => {
  currentGroupIndex.value = (currentGroupIndex.value - 1 + numGroups) % numGroups;
  const firstIndexOfGroup = currentGroupIndex.value * GROUP_SIZE;
  selectMember(firstIndexOfGroup);
};

const handleTouchStart = (e) => {
  stopAutoplay();
  touchStartX.value = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX;
  const diff = touchStartX.value - touchEndX.value;

  if (Math.abs(diff) >= SWIPE_THRESHOLD) {
    // چون در RTL هستیم، جهت سواپ رو معکوس در نظر می‌گیریم
    if (diff > 0) {
      prevGroup();
    } else {
      nextGroup();
    }
  }

  startAutoplay();
};
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
  background: #F7F3EB;

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
  box-shadow: 10px -10px 0 #F7F3EB;
}

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
    box-shadow: 5px -5px 0 #F7F3EB;
    border-top-right-radius: 11px;
  }
  .notch::after {
    right: -11px;
    box-shadow: -5px -5px 0 #F7F3EB;
    border-top-left-radius: 11px;
  }
}

@media (min-width: 1536px) {
  .notch {
    height: 30px;
  }
}
</style>