<template>

  <footer v-if="!isLotteryPage" class="w-full" :dir="isRtl ? 'rtl' : 'ltr'">

  <!-- بخش سبز فوتر (تبلیغاتی) -->
  <div v-if="showGreenSection" class="relative w-full">

    <!-- نسخه دسکتاپ -->
    <div class="hidden lg:block relative w-full">

      <div class="bg-[#2C7379] dark:bg-[#407B80] h-[200px] w-full flex flex-col items-center justify-center gap-3">

        <div v-html="randomText"
     :class="[
       'text-white dark:text-dark-text text-[32px] font-bold text-center px-4',
       footerConfig?.titleMargin || ''
     ]">
</div>
      </div>

      <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-center items-center z-20">

  <div class="shape bg-[#2C7379] dark:bg-[#407B80] flex items-center justify-center">
    <NuxtLink :to="localePath('/order/requestProject')">
<button class="btn-cooperate bg-[#ECD0A0] dark:bg-dark-gold text-[#0F184B] dark:text-[#435056] text-[20px] font-bold px-12 py-2 rounded-[16px] shadow-lg relative z-30 transition-all duration-300 ease-out whitespace-nowrap flex items-center justify-center min-w-[270px] hover:shadow-2xl">
        {{ $t('footer.cooperateButton') }}
      </button>
    </NuxtLink>
  </div>

      </div>

    </div>

<!-- نسخه موبایل/تبلت -->
<div class="lg:hidden relative w-full">

  <div class="bg-[#2C7379] dark:bg-[#407B80] w-full min-h-[140px] sm:min-h-[170px] py-10 sm:py-12 px-4 flex flex-col items-center justify-center gap-2 sm:gap-3">

    <div v-html="randomText" class="text-white dark:text-dark-text text-[16px] sm:text-[22px] font-bold text-center leading-snug"></div>

  </div>

  <div class="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-center z-20">

    <div class=" shape-pill-mobile bg-[#2C7379] dark:bg-[#407B80]">
        <button
          type="button"
          @click="handleMobileCooperateClick"
          :class="['btn-cooperate-mobile bg-[#ECD0A0] dark:bg-dark-gold text-[#0F184B] dark:text-dark-text-deep text-[11px] sm:text-[14px] font-bold rounded-full shadow-md relative z-30 transition-all duration-300 ease-out flex items-center justify-center hover:shadow-xl', { 'btn-cooperate-mobile-clicked': isMobileButtonClicked }]"
        >
        {{ $t('footer.cooperateButton') }}
      </button> 
    </div>

  </div>

</div>

  </div>

<!-- بخش پایینی فوتر (لینک‌ها و اطلاعات تماس) -->
<div class="bg-[#BFD1D5] dark:bg-dark-footer w-full pt-8 sm:pt-10 lg:pt-16 transition-colors duration-300">

<div class="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 lg:gap-12 text-center pb-8 sm:pb-10 lg:pb-12 px-4 lg:px-6 xl:px-8">

  <!-- لینک‌های فوتر -->
  <div class="flex flex-col items-center leading-[26px] sm:leading-[32px] lg:leading-[32px] xl:leading-[40px] font-roboto">

    <h3 class="!mt-[20px] lg:!mt-0 text-[#2D4745] dark:text-dark-text text-[16px] sm:text-[18px] lg:text-[16px] xl:text-[20px] mb-4 whitespace-nowrap">{{ $t('footer.linksTitle') }}</h3>

    <ul class="space-y-2 sm:space-y-3">
      <li v-for="link in links" :key="link.path" class="flex items-center gap-2 whitespace-nowrap text-[#2D4745] dark:text-dark-text/80 text-[14px] sm:text-[15px] lg:text-[13px] xl:text-[16px]">
        <span class="w-2 h-2 bg-[#2D7A6F] dark:bg-dark-accent rounded-full flex-shrink-0"></span>
        <NuxtLink :to="localePath(link.path)" class="hover:text-[#2D7A6F] dark:hover:text-dark-accent transition-colors">
          {{ $t(link.nameKey) }}
        </NuxtLink>
      </li>

      <li class="flex items-center gap-2 whitespace-nowrap text-[#2D4745] dark:text-dark-text/80 text-[14px] sm:text-[15px] lg:text-[13px] xl:text-[16px]">
        <span class="w-2 h-2 bg-[#2D7A6F] dark:bg-dark-accent rounded-full flex-shrink-0"></span>
        <button
          type="button"
          @click="showTermsModal = true"
          class="hover:text-[#2D7A6F] dark:hover:text-dark-accent transition-colors cursor-pointer"
        >
          {{ $t('footer.terms') }}
        </button>
      </li>
    </ul>
  </div>

  <!-- تگ‌لاین و اطلاعات تماس -->
  <div class="flex flex-col items-center gap-4 sm:gap-5 lg:gap-6">

    <p class="text-[#0F184B] dark:text-dark-text font-bold text-[13px] sm:text-[15px] lg:text-[14px] xl:text-[18px] whitespace-normal lg:whitespace-nowrap px-2 lg:px-0">
      {{ $t('footer.tagline') }}
    </p>

    <a
      href="mailto:info@nadertech.com"
      dir="ltr"
      class="text-[#2D4745] dark:text-dark-text/80 text-[13px] sm:text-[15px] lg:text-[13px] xl:text-[16px] hover:text-[#2D7A6F] dark:hover:text-dark-accent transition-colors font-roboto"
    >
      nadertechteam@protonmail.com
    </a>

    <div class="flex justify-center gap-2 sm:gap-3 flex-wrap">
      <img
        v-for="icon in socialIcons"
        :key="icon"
        :src="`/images/${icon}.png`"
        alt="social"
        class="w-7 h-7 sm:w-8 sm:h-8 lg:w-8 lg:h-8 xl:w-10 xl:h-10 object-contain hover:opacity-80 transition cursor-pointer dark:opacity-90 dark:hover:opacity-100"
      />
    </div>

  </div>

  <!-- نمادهای اعتماد -->
  <div class="flex flex-row lg:flex-col gap-3 sm:gap-4 lg:gap-4 items-center">
    <img src="/images/enamad2.png" alt="Enamad" class="w-[80px] h-[82px] sm:w-[100px] sm:h-[103px] lg:w-[110px] lg:h-[113px] xl:w-[153px] xl:h-[157px] object-contain" />
    <img src="/images/zarrinpall.png" alt="Zarrinpal" class="w-[80px] h-[82px] sm:w-[100px] sm:h-[103px] lg:w-[110px] lg:h-[113px] xl:w-[153px] xl:h-[157px] object-contain" />
  </div>

  </div>

</div>

  <!-- مودال قوانین و مقررات -->
  <TermsModal v-model="showTermsModal" />

  </footer>

  </template>

  <script setup>
  import TermsModal from '~/components/Terms/TermsModal.vue'
  import promoTexts from '~/assets/data/promoTexts.json'

  const route = useRoute();
  const footerConfig = useState('footerConfig');

  const { locale, localeProperties } = useI18n()
  const localePath = useLocalePath()
  const isRtl = computed(() => localeProperties.value.dir === 'rtl')

  // لیست لینک‌های فوتر (کلید ترجمه به‌جای متن ثابت)
  const links = [
  // { nameKey: 'footer.links.home', path: '/' },
  { nameKey: 'footer.links.order', path: '/order' },
  { nameKey: 'footer.links.events', path: '/events' },
  { nameKey: 'footer.links.about', path: '/about' },
  { nameKey: 'footer.links.moreProjects', path: '/order/moreProject' },
];
  const socialIcons = ['telegram', 'instagram', 'whatsapp', 'x', 'linkedin'];

  const showTermsModal = ref(false);

  // انیمیشن کوتاه کلیک دکمه همکاری در موبایل و سپس رفتن به صفحه درخواست
  const isMobileButtonClicked = ref(false);
  const router = useRouter();

  function handleMobileCooperateClick() {
    if (isMobileButtonClicked.value) return;
    isMobileButtonClicked.value = true;
    setTimeout(() => {
      isMobileButtonClicked.value = false;
      router.push(localePath('/order/requestProject'));
    }, 220);
  }

  // متن‌های رندوم نمایش‌داده‌شده در بخش سبز فوتر
  const randomTitle = ref('');
  const randomText = ref('');

  const currentPromoTexts = computed(() => promoTexts?.[locale.value] || promoTexts?.fa || []);

  // انتخاب یک ایندکس تصادفی از استخر متن‌ها با حذف مقادیر تکراری
  function getRandomIndex(pool, excludeValues = []) {
    if (!pool?.length) return -1;
    let idx = Math.floor(Math.random() * pool.length);
    if (pool.length > excludeValues.length) {
      while (excludeValues.includes(pool[idx])) {
        idx = Math.floor(Math.random() * pool.length);
      }
    }
    return idx;
  }

  // انتخاب متن رندوم جدید برای عنوان و زیرعنوان
  function pickRandomText() {
    const pool = currentPromoTexts.value;
    if (!pool?.length) return;

    const titleIdx = getRandomIndex(pool, [randomTitle.value]);
    randomTitle.value = pool[titleIdx];

    const subtitleIdx = getRandomIndex(pool, [randomTitle.value, randomText.value]);
    randomText.value = pool[subtitleIdx];
  }

  // انتخاب متن رندوم فقط سمت کلاینت (جلوگیری از hydration mismatch)
  onMounted(() => {
    pickRandomText();
  });

  // به‌روزرسانی متن رندوم هنگام تغییر مسیر یا زبان
  watch(() => route.path, () => {
    pickRandomText();
  });
  watch(locale, () => {
    pickRandomText();
  });

  // نام پایه مسیر مستقل از زبان
  const routeBaseName = computed(() => route.name?.toString().split('___')[0]);

  const lotteryRouteNames = [
    'events-lottery-register',
    'events-lottery-login',
    'events-lottery-success',
    'events-lottery-waiting',
    'events-lottery-winner',
    'events-lottery-loser'
  ];

  const hiddenGreenSectionBaseNames = [
    'order-request'
  ];

  // بررسی اینکه آیا صفحه فعلی متعلق به قرعه‌کشی است
  const isLotteryPage = computed(() => lotteryRouteNames.includes(routeBaseName.value));

  // تعیین نمایش یا عدم نمایش بخش سبز فوتر
  const showGreenSection = computed(() => {
    return !hiddenGreenSectionBaseNames.some(name => routeBaseName.value?.startsWith(name));
  });

  defineProps({
    title: String,
    title1: String
  });
  </script>

 <style scoped>
  .shape {
    --r: 26px;
    margin-bottom: -27px;
    width: 379px;
    height: 60px;
    color: #fff;
    transform: scaleY(-1);
    clip-path: shape(
      from 0 100%,
      curve by var(--r) calc(-1*var(--r)) with var(--r) 0,
      vline to var(--r),
      curve by var(--r) calc(-1*var(--r)) with 0 calc(-1*var(--r)),
      hline to calc(100% - 2*var(--r)),
      curve by var(--r) var(--r) with var(--r) 0,
      vline to calc(100% - var(--r)),
      curve by var(--r) var(--r) with 0 var(--r)
    );
  }

.shape-pill-mobile {
  width: 150px;
  height: 40px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.btn-cooperate-mobile {
  width: 130px;
  height: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-cooperate-mobile:hover {
  transform: scale(1.06);
}

.btn-cooperate-mobile:active {
  transform: scale(0.95);
}

.btn-cooperate-mobile-clicked {
  animation: cooperate-tap 0.22s ease-out;
}

@keyframes cooperate-tap {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.88);
    box-shadow: 0 0 0 6px rgba(236, 208, 160, 0.35);
  }
  100% {
    transform: scale(1.05);
  }
}

@media (min-width: 640px) {
  .shape-pill-mobile {
    width: 220px;
    height: 52px;
  }
  .btn-cooperate-mobile {
    width: 195px;
    height: 40px;
  }
}

/* دکمه دسکتاپ به‌صورت پیش‌فرض scaleY(-1) دارد چون داخل .shape که برعکس شده قرار گرفته؛
   برای همین اسکیل هاور هم باید داخل همین transform اضافه شود، نه جداگانه */
.btn-cooperate {
  transform: scaleY(-1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.btn-cooperate:hover {
  transform: scaleY(-1) scale(1.08);
}

.btn-cooperate:active {
  transform: scaleY(-1) scale(0.97);
}

</style>