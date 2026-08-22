<script setup>
import { computed } from 'vue'
import { useMobileSlider } from '@/composables/useMobileSlider'
import { RESUME_CATEGORY_IDS } from '@/composables/useResumes'

// --- i18n ---
const { locale, localeProperties, t } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

// این بخش فقط پروژه‌های دسته‌بندی «طراحی سایت» رو نشون می‌ده،
// پس category_id واقعی (1) مستقیم پاس داده می‌شه.
const { items: webProjects } = useResumes(RESUME_CATEGORY_IDS.web)

const {
  mobileVisibleItems: mobileVisibleProjects,
  visibleItems,
  nextSlide,
  prevSlide,
  onTouchStart,
  onTouchEnd,
} = useMobileSlider(webProjects, { swipeThreshold: 40 })

const visibleProjects = visibleItems(3)

// ── فرایند همکاری (steps) ────────────────────────────────────
// این مراحل قبلاً یک آرایه‌ی ثابت (hardcoded) بودن. الان از پنل ادمین
// (تب «سفارش» → آیتم key="workflow", type="json") مدیریت می‌شن، پس
// از همون endpoint عمومی صفحه‌ی order خونده می‌شن:
//   GET /api/page/order  ->  { data: [ { key: "workflow", value: "<json-string>", type: "json", ... } ] }
//
// برخلاف بقیه‌ی محتوای کلید-مقدار این پروژه (که نسخه‌ی انگلیسی یا ردیف
// جداست یا فیلد _en روی خودِ آبجکته)، اینجا چون value خودش یک آرایه‌ی
// JSON از چند آیتمه، نسخه‌ی انگلیسی هر آیتم داخل خودِ همون آیتم میاد:
//   { id, title, content, title_en, content_en }
// یعنی فقط یک ردیف "workflow" هست (نه "workflow_en")، و باید بر اساس
// زبان فعلی بین title/content و title_en/content_en هر آیتم سوییچ کنیم.
//
// content و content_en هر دو از ادیتور Tiptap در پنل ادمین ساخته می‌شن
// (HTML)، پس در تمپلیت با v-html رندر می‌شن.
//
// اگر fetch با خطا مواجه بشه، آیتم workflow خالی/نامعتبر باشه، یا برای
// یک آیتم نسخه‌ی en پر نشده باشه، به ترتیب: نسخه‌ی en آیتم → نسخه‌ی fa
// همون آیتم → (اگر کل workflow خالی/نامعتبر بود) fallbackSteps کاملاً
// ثابت و دوزبانه از i18n.
const API_BASE = 'https://nadertechnologyteam.ir/api'

const fallbackSteps = computed(() => ([
  { title: t('order.workflow.fallback.order.title'), desc: t('order.workflow.fallback.order.desc') },
  { title: t('order.workflow.fallback.analysis.title'), desc: t('order.workflow.fallback.analysis.desc') },
  { title: t('order.workflow.fallback.execution.title'), desc: t('order.workflow.fallback.execution.desc') },
  { title: t('order.workflow.fallback.delivery.title'), desc: t('order.workflow.fallback.delivery.desc') },
  { title: t('order.workflow.fallback.support.title'), desc: t('order.workflow.fallback.support.desc') },
]))

const { data: orderPageRes } = await useFetch(`${API_BASE}/page/order`)

const steps = computed(() => {
  const list = orderPageRes.value?.data ?? []
  const workflowItem = list.find(i => i.key === 'workflow')
  if (!workflowItem?.value) return fallbackSteps.value

  try {
    const parsed = JSON.parse(workflowItem.value)
    if (Array.isArray(parsed) && parsed.length) {
      const useEn = locale.value === 'en'
      return parsed.map(s => ({
        title: (useEn && s.title_en) ? s.title_en : s.title,
        desc: (useEn && s.content_en) ? s.content_en : s.content,
      }))
    }
  } catch {
    // مقدار JSON نامعتبر بود — سکوت و بازگشت به fallback
  }
  return fallbackSteps.value
})

// شماره‌ی مراحل بر اساس زبان فعلی با فرمت اعداد فارسی یا انگلیسی نمایش داده بشه
const formatStepNumber = (n) => n.toLocaleString(locale.value === 'fa' ? 'fa-IR' : 'en-US')
</script>

<template>
<div class="relative z-0 min-h-[560px] md:min-h-[650px] xl:h-[900px] xxl:h-[1024px] py-10 -mt-[80px] md:-mt-[70px] xl:-mt-[80px] xxl:-mt-[90px] dark:bg-dark-bg" :dir="isRtl ? 'rtl' : 'ltr'">
    <!-- لایه‌ی پس‌زمینه، جدا از محتوا -->
    <div
      class="absolute inset-0 -z-10
      bg-[url('/images/order-bg.png')]
      bg-no-repeat bg-cover bg-center
      xl:bg-[length:1920px_100%]
      dark:brightness-[0.55] dark:contrast-125"
    ></div>
    <!-- لایه‌ی تیره‌ی مکمل، فقط روی دارک‌مود، فقط روی بک‌گراند -->

    <div class="relative z-10 max-w-[1054px] xxl:max-w-[1440px] mx-auto px-4 xl:px-0">
<h1
  class="ml-auto bg-[#fcfaf4] dark:bg-[#ADE9EA] w-[140px] h-[36px] text-[14px] md:w-[160px] md:h-[40px] md:text-[16px] xl:w-[178px] xl:h-[43px] xl:text-[18px] xxl:w-[200px] xxl:h-[48px] xxl:text-[20px] text-[#2d6a66] dark:text-[#407B80] flex items-center justify-center rounded-[19px] shadow-sm dark:shadow-none dark:ring-1 dark:ring-dark-border mt-[80px] md:mt-[70px] xl:mt-[100px] xxl:mt-[120px]"
>
  <span class="mt-[5px]">{{ $t('order.siteOrder.badge') }}</span>
</h1>

      <!-- موبایل: کارت وسط بزرگ + کارت‌های قبلی/بعدی نیمه‌پیدا + پشتیبانی از سواپ انگشت -->
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
                : 'z-10 scale-75 opacity-40 translate-x-[105px]'
          ]"
        >
          <NuxtLink :to="localePath(`/order/${item.data.slug}`)">
            <img
              :src="resumeCover(item.data)"
              class="w-[220px] h-[252px] object-cover rounded-[30px] shadow-lg dark:shadow-none dark:ring-1 dark:ring-dark-border select-none pointer-events-none"
              :alt="item.data.title"
              draggable="false"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- تبلت و دسکتاپ: همون منطق قبلی (جاری به بعد) -->
<!-- اسلایدر ۳ کارته -->
<div class="hidden md:flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-4 xl:gap-[70px] xxl:gap-[100px] xl:h-80 xxl:h-[420px] mt-8 md:mt-10 xl:mt-[50px] xxl:mt-[70px]">
  <div
    v-for="(item, index) in visibleProjects"
    :key="item.data.id"
    class="w-full max-w-[312px] aspect-[312/358] md:w-[220px] md:h-[260px] md:aspect-auto xl:w-[312px] xl:h-[358px] xxl:w-[360px] xxl:h-[414px] bg-white dark:bg-dark-input rounded-[30px] xl:rounded-[40px] xxl:rounded-[45px] shadow-lg dark:shadow-none dark:ring-1 dark:ring-dark-border cursor-pointer transition-all hover:scale-105"
    :class="[
      index >= 2 ? 'md:hidden xl:block' : '',
      index % 2 !== 0 ? 'xl:mt-12 xxl:mt-14' : '',
    ]"
  >
<NuxtLink :to="localePath(`/order/${item.data.slug}`)">
        <img
        :src="resumeCover(item.data)"
        class="w-full h-full object-cover rounded-[30px] xl:rounded-[40px] xxl:rounded-[45px]"
        :alt="item.data.title"
      />
    </NuxtLink>
  </div>
</div>

      <!-- دکمه‌های اسلایدر: فقط از md به بالا نمایش داده می‌شن -->
      <div class="hidden md:flex justify-center gap-4 z-20 mt-8 md:mt-10 xl:mt-[115px] xxl:mt-[100px]">
        <IconsSliderButton
direction="left"
          @click="nextSlide"
        />

        <IconsSliderButton
direction="right"
          @click="prevSlide"
        />
      </div>


    </div>
  </div>

  <div
  class="relative z-20 -mt-20 md:-mt-20 xl:-mt-[150px] xxl:-mt-[190px] py-14 md:py-16 xl:py-20 xxl:py-24 px-4 w-full max-w-[1200px] xxl:max-w-[1600px] min-h-[420px] xxl:min-h-[480px]
  rounded-[50px] xxl:rounded-[60px] overflow-visible text-center mx-auto flex flex-col items-center"
  :dir="isRtl ? 'rtl' : 'ltr'"
>
  <!-- لایه‌ی پس‌زمینه‌ی جدا -->
<div
  class="absolute inset-0 -z-10 rounded-[50px] xxl:rounded-[60px] overflow-hidden
  bg-[url('/images/bg-flow3.png')]
  bg-cover bg-top bg-no-repeat
  xl:bg-[length:100%_100%] xl:bg-center"
>
<img
  src="/images/firooze.png"
  alt=""
  class="mt-[45px] sm:mt-[45px] md:mt-[65px] md:absolute md:top-0 md:right-0 xl:mt-0"
/>
<div class="md:absolute md:top-[260px] md:left-0 md:flex md:items-center md:gap-4 md:-mt-[90px] xl:top-[350px] xl:mt-0">
  <img src="/images/line-flow.png" alt="" class="-mt-[130px] md:mt-0"/>
  <img src="/images/line-flow.png" alt="" class="mt-[110px] md:mt-0" />
</div>

  <img
    src="/images/firooze.png"
    alt=""
    class="md:absolute md:bottom-0 md:left-0 "
  />
</div>

<div class="relative z-10 max-w-6xl xxl:max-w-[1300px] mx-auto">
  <div class="flex flex-col items-center text-center mb-8 md:mb-10 xxl:mb-14">
    <h3 class="text-[#2d6a66] md:text-white dark:text-dark-text text-[18px] md:text-[22px] xl:text-[26px] xxl:text-[30px] xxl:mt-[50px] font-medium mb-2">{{ $t('order.workflow.smallTitle') }}</h3>
    <h1 class="text-[#0F184B] dark:text-dark-text text-[22px] md:text-[29px] xl:text-[32px] xxl:text-[38px] font-bold">{{ $t('order.workflow.title') }}</h1>
  </div>

<div class="flex flex-wrap xxl:flex-nowrap justify-center gap-3 sm:gap-4 md:gap-3 xl:gap-12 xxl:gap-10 items-start md:items-center xl:items-start">
<div
  v-for="(step, index) in steps"
  :key="index"
  :class="[
    'relative bg-[#E4E6EB] dark:bg-[#96ACB1] rounded-[1.5rem] md:rounded-[1.75rem] w-[105px] sm:w-[140px] md:w-[140px] xl:w-[182px] xxl:w-[210px] flex flex-col shadow-lg dark:shadow-none dark:ring-1 dark:ring-dark-border transition-transform duration-500 mt-[12px] sm:mt-[20px] md:mt-[20px] xl:mt-[50px] xxl:mt-[60px]',
    isRtl
      ? 'h-[160px] sm:h-[190px] md:h-[195px] xl:h-[235px] xxl:h-[270px]'
      : 'h-[160px] sm:h-[190px] md:h-[220px] xl:h-[270px] xxl:h-[310px]',
    index % 2 !== 0 ? 'xl:translate-y-12 xxl:translate-y-14' : '',
  ]"
>
  <div
    :class="[
      'absolute top-5 md:top-5 w-1.5 h-[28px] sm:h-[34px] md:h-[40px] xxl:h-[45px] bg-[#EAAA3C] dark:bg-dark-gold rounded-full -mt-[6px] md:-mt-[6px] xxl:-mt-[8px]',
      isRtl ? '-right-1' : '-left-1'
    ]"
  ></div>

  <div class="bg-white dark:bg-[#435157] p-2 sm:p-3 md:p-2.5 xxl:p-3 rounded-b-[1.5rem] rounded-t-[1.5rem] md:rounded-b-[1.75rem] md:rounded-t-[1.75rem] xxl:rounded-b-[2rem] xxl:rounded-t-[2rem] min-h-[48px] sm:min-h-[58px] md:min-h-[52px] xxl:min-h-[58px]">
    <div class="relative flex items-center py-1 mt-[6px]">
      <span
        :class="[
          'absolute top-1/2 -translate-y-1/2 text-[20px] sm:text-[26px] md:text-[26px] xl:text-[40px] xxl:text-[46px] font-extrabold text-[#EAAA3C] dark:text-dark-gold',
          isRtl ? 'right-1 rokh-bold-num' : 'left-1 font-roboto'
        ]"
      >
        {{ formatStepNumber(index + 1) }}
      </span>
      <h3
        class="w-full text-center text-[#EAAA3C] dark:text-dark-gold font-bold text-[12px] sm:text-[15px] md:text-[18px] xl:text-[22px] xxl:text-[25px] line-clamp-2 px-6 sm:px-8 leading-tight"
        :class="isRtl ? 'rokh-bold-num' : 'font-roboto'"
      >
        {{ step.title }}
      </h3>
    </div>
  </div>

  <div
    class="px-2 sm:px-3 pb-2 sm:pb-3 md:px-2.5 md:pb-2.5 flex-grow flex items-center justify-center text-center text-[#747893] dark:text-black text-[10px] sm:text-[12px] md:text-[16px] xl:text-[20px] xxl:text-[22px] font-normal font-roboto leading-relaxed md:leading-snug mt-1 md:mt-1 [&_p]:m-0 [&_p]:text-center"
    v-html="step.desc"
  ></div>
</div>
  </div>
</div>
  </div>
</template>