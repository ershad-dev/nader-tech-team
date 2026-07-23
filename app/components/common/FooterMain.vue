<template>

  <footer v-if="!isLotteryPage" class="w-full" dir="rtl">

  <div v-if="showGreenSection" class="relative w-full">

   
    <div class="hidden lg:block relative w-full">

      <div class="bg-[#2C7379] dark:bg-[#407B80] h-[200px] w-full pt-10 pb-20 flex flex-col items-center">

        <div class="flex justify-center items-center">
          <svg viewBox="0 0 700 150" class="w-[500px] h-auto">
            <path id="curve-path-desktop" d="M 50,120 Q 350,50 650,120" fill="transparent" />
            <text font-size="50" font-weight="bold" fill="white">
              <textPath href="#curve-path-desktop" startOffset="50%" text-anchor="middle">
                {{ title }}
              </textPath>
            </text>
          </svg>

        </div>

        <div v-html="title1" 
     :class="[
       'text-white dark:text-dark-text text-[32px] font-bold text-center px-4',
       footerConfig?.titleMargin || 'mt-4'
     ]">
</div>
      </div>

      <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-center items-center z-20">

  <div class="shape bg-[#2C7379] dark:bg-[#407B80]">
    <NuxtLink to="/order/requestProject">
      <button class="btn-cooperate bg-[#ECD0A0] dark:bg-dark-gold text-[#0F184B] dark:text-[#435056] text-[20px] font-bold px-12 py-4 rounded-[16px] shadow-lg relative z-30 transition-all h-[48px] w-[263px] flex items-center justify-center inline-block mr-[55px] mt-[10px] ">
        درخواست همکاری
      </button>
    </NuxtLink>
  </div>

      </div>

    </div>

    <!-- ===================== نسخه موبایل/تبلت - ارتفاع کاهش‌یافته ===================== -->
    <div class="lg:hidden relative w-full">

      <div class="bg-[#2C7379] dark:bg-[#407B80] w-full pt-4 pb-8 sm:pt-6 sm:pb-10 px-4 flex flex-col items-center gap-1.5 sm:gap-2">

        <h2 class="text-white dark:text-dark-text text-[16px] sm:text-[22px] font-bold text-center leading-snug">
          {{ title }}
        </h2>

        <div v-html="title1" class="text-white dark:text-dark-text text-[12px] sm:text-[15px] font-bold text-center leading-snug"></div>

      </div>

      <div class="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-center z-20">

        <div class="shape shape-mobile bg-[#2C7379] dark:bg-[#3D676B]">
          <NuxtLink to="/order/requestProject">
            <button class="btn-cooperate btn-cooperate-mobile bg-[#ECD0A0] dark:bg-dark-gold text-[#0F184B] dark:text-dark-text-deep text-[11px] sm:text-[14px] font-bold relative z-30 h-[32px] sm:h-[42px] w-[150px] sm:w-[230px] flex items-center justify-center">
              درخواست همکاری
            </button>
          </NuxtLink>
        </div>

      </div>

    </div>

  </div>

<div class="bg-[#BFD1D5] dark:bg-dark-footer w-full pt-8 sm:pt-10 lg:pt-16 transition-colors duration-300">

  <div class="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 lg:gap-12 text-center pb-8 sm:pb-10 lg:pb-12 px-4 lg:px-0">

  <div class="flex flex-col items-center leading-[26px] sm:leading-[32px] lg:leading-[40px] font-roboto">

  <h3 class="text-[#2D4745] dark:text-dark-text text-[16px] sm:text-[18px] lg:text-[20px] mb-4">لینک های مهم</h3>

  <ul class="space-y-2 sm:space-y-3">
  <li v-for="link in links" :key="link" class="flex items-center gap-2 text-[#2D4745] dark:text-dark-text/80 text-[14px] sm:text-[15px] lg:text-[16px]">
  <span class="w-2 h-2 bg-[#2D7A6F] dark:bg-dark-accent rounded-full flex-shrink-0"></span>
  <span>{{ link }}</span>
  </li>
  </ul>

  </div>

  <div class="flex flex-col items-center gap-4 sm:gap-5 lg:gap-6">

  <p class="text-[#0F184B] dark:text-dark-text font-bold text-[13px] sm:text-[15px] lg:text-[18px] whitespace-normal lg:whitespace-nowrap px-2 lg:px-0">
  نادر تکنولوژی، ارائه دهنده راهکارهای نوین فناوری، توسعه نرم‌افزار و خدمات دیجیتال
  </p>

  <div class="flex justify-center gap-2 sm:gap-3 flex-wrap">
  <img
  v-for="icon in socialIcons"
  :key="icon"
  :src="`/images/${icon}.png`"
  alt="social"
  class="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain hover:opacity-80 transition cursor-pointer dark:opacity-90 dark:hover:opacity-100"
  />
  </div>

  </div>

  <div class="flex flex-row lg:flex-col gap-3 sm:gap-4 lg:gap-4 items-center">
  <img src="/images/enamad2.png" alt="Enamad" class="w-[80px] h-[82px] sm:w-[100px] sm:h-[103px] lg:w-[153px] lg:h-[157px] object-contain" />
  <img src="/images/zarrinpall.png" alt="Zarrinpal" class="w-[80px] h-[82px] sm:w-[100px] sm:h-[103px] lg:w-[153px] lg:h-[157px] object-contain" />
  </div>

  </div>

  </div>

  </footer>

  </template>

  <script setup>
  const route = useRoute();
  const footerConfig = useState('footerConfig');
  const links = ['خانه', 'سفارش گیری پروژه', 'برگزاری ایونت', 'درباره ما'];
  const socialIcons = ['telegram', 'instagram', 'whatsapp', 'x', 'linkedin'];

  const lotteryRoutes = [
    '/events/lottery/register',
    '/events/lottery/login',
    '/events/lottery/success',
    '/events/lottery/waiting',
    '/events/lottery/winner',
    '/events/lottery/loser'
  ];

  const hiddenGreenSectionRoutes = [
    '/order/request'
  ];

  const isLotteryPage = computed(() => lotteryRoutes.includes(route.path));

  const showGreenSection = computed(() => {
    return !hiddenGreenSectionRoutes.some(path => route.path.startsWith(path));
  });

  // توجه: رنگ shape دیگر با JS ref (colorMode.value) کنترل نمی‌شود.
  // چون colorMode.value یک ref واکنش‌گرای Vue است و مقدار درستش تا قبل از
  // hydration کامل (mount شدن Vue) sync نمی‌شود. کلاس "dark" روی <html>
  // توسط اسکریپت no-flash قبل از mount ست می‌شود، اما inline :style که به
  // colorMode.value وابسته بود، این تغییر را نمی‌دید تا یک toggle دستی رخ بدهد.
  // با استفاده از کلاس‌های Tailwind (`dark:bg-dark-shape`) رنگ‌گیری کاملاً
  // توسط CSS/کلاس html انجام می‌شود و از همان رفرش اول درست است.

  defineProps({
    title: String,
    title1: String
  });
  </script>

  <style scoped>
  :nth-child(1 of .shape) {
    clip-path: shape(
      from 0 100%,
      arc by var(--r) calc(-1*var(--r)) of var(--r),
      vline to var(--r),
      arc by var(--r) calc(-1*var(--r)) of var(--r) cw,
      hline to calc(100% - 2*var(--r)),
      arc by var(--r) var(--r) of var(--r) cw,
      vline to calc(100% - var(--r)),
      arc by var(--r) var(--r) of var(--r)
    )
  }

  :nth-child(2 of .shape) {
    clip-path: shape(
      from 0 100%,
      curve by var(--r) calc(-1*var(--r)) with var(--r) 0,
      vline to var(--r),
      curve by var(--r) calc(-1*var(--r)) with 0 calc(-1*var(--r)),
      hline to calc(100% - 2*var(--r)),
      curve by var(--r) var(--r) with var(--r) 0,
      vline to calc(100% - var(--r)),
      curve by var(--r) var(--r) with 0 var(--r)
    )
  }

  .shape {
    --r: 26px;
    margin-bottom: -27px;
    width: 379px;
    height: 60px;
    color: #fff;
    transform: scaleY(-1);
  }

  .shape-mobile {
    --r: 14px;
    margin-bottom: -15px;
    width: 150px;
    height: 32px;
  }

  @media (min-width: 640px) {
    .shape-mobile {
      --r: 18px;
      width: 230px;
      height: 42px;
      margin-bottom: -19px;
    }
  }

  .btn-cooperate {
    transform: scaleY(-1);
  }
  .btn-cooperate:hover {
    transform: scaleY(-1) scale(1.05);
  }
  </style>