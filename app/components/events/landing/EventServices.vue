<template>
  <section class="relative bg-[#ABD7D8] dark:bg-[#96ACB1] p-5 sm:p-8 md:p-9 xl:p-10 min-[1920px]:p-12 rounded-[16px] md:rounded-[18px] xl:rounded-[20px] min-[1920px]:rounded-[24px] mt-8 mx-auto w-full xl:w-[1110px] min-[1920px]:w-[1400px] max-w-full" :dir="isRtl ? 'rtl' : 'ltr'">

    <!-- <img
      src="/images/texture.png"
      alt=""
      class="absolute w-[220px] sm:w-[380px] md:w-[550px] xl:w-[900px] min-[1920px]:w-[1050px] h-auto object-contain opacity-30 dark:opacity-15 pointer-events-none -mt-[60px] sm:-mt-[120px] md:-mt-[200px] xl:-mt-[350px] min-[1920px]:-mt-[420px] -mr-[20px] sm:-mr-[40px] md:-mr-[60px] xl:-mr-[100px] min-[1920px]:-mr-[130px] top-0 right-0 xl:top-auto xl:right-auto"
    /> -->

    <!-- بخش توضیحات -->
    <div
      :class="[
        'mb-8 md:mb-9 xl:mb-10 relative z-10',
        isRtl ? 'pr-0 sm:pr-[40px] md:pr-[60px] xl:pr-[90px] min-[1920px]:pr-[120px]' : 'pl-0 sm:pl-[40px] md:pl-[60px] xl:pl-[90px] min-[1920px]:pl-[120px]'
      ]"
    >

      <p class="max-w-full xl:max-w-[865px] min-[1920px]:max-w-[1100px] font-400 text-[#A36C53] dark:text-[#A36C53] text-[20px] sm:text-[22px] md:text-[24px] xl:text-[26px] min-[1920px]:text-[30px] leading-[26px] sm:leading-[32px] md:leading-[34px] xl:leading-[40px] min-[1920px]:leading-[44px]">
        {{ pageData.description_1 }}

        <br>
        <br>
      <p class="max-w-full xl:max-w-[865px] min-[1920px]:max-w-[1100px] font-roboto font-light text-[#0F184B] dark:text-dark-text-deep text-[14px] sm:text-[15px] md:text-[15px] xl:text-[16px] min-[1920px]:text-[18px] leading-[26px] sm:leading-[32px] md:leading-[34px] xl:leading-[40px] min-[1920px]:leading-[44px]">
        {{ pageData.description_2 }}
      </p>

      </p>
    </div>

    <h2
      :class="[
        'relative z-10 text-[20px] sm:text-[22px] md:text-[24px] xl:text-[26px] min-[1920px]:text-[30px] text-[#A36C53] dark:[#A36C53] font-bold mb-4 text-center',
        isRtl ? 'pr-0 sm:pr-[40px] md:pr-[60px] xl:pr-[90px] min-[1920px]:pr-[120px] sm:text-right' : 'pl-0 sm:pl-[40px] md:pl-[60px] xl:pl-[90px] min-[1920px]:pl-[120px] sm:text-left'
      ]"
    >{{ $t('events.landing.servicesTitle') }}</h2>

    <!-- لیست کارت‌ها (فراخوانی کامپوننت با ارسال services به عنوان prop) -->
    <div class="relative z-10 space-y-6 mb-10 md:mb-11 xl:mb-12 flex flex-col items-center text-center">
      <ServiceCard :services="services" />
    </div>

<!-- بخش سوالات (questions) -->
<div
  v-if="questions.length"
  :class="[
    'relative z-10 mb-10 md:mb-11 xl:mb-12',
    isRtl ? 'pr-0 sm:pr-[40px] md:pr-[60px] xl:pr-[90px] min-[1920px]:pr-[120px]' : 'pl-0 sm:pl-[40px] md:pl-[60px] xl:pl-[90px] min-[1920px]:pl-[120px]'
  ]"
>
  <h3
    v-if="questionsTitle"
    :class="[
      'text-center text-[18px] sm:text-[20px] md:text-[22px] xl:text-[24px] min-[1920px]:text-[28px] font-bold text-[#A36C53] dark:text-[#A36C53] mb-4 md:mb-5 xl:mb-6',
      isRtl ? 'sm:text-right' : 'sm:text-left'
    ]"
  >
    {{ questionsTitle }}
  </h3>

  <ul class="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-4 xl:gap-x-8 xl:gap-y-5 min-[1920px]:gap-x-10 min-[1920px]:gap-y-6 max-w-full xl:max-w-[865px] min-[1920px]:max-w-[1100px]">
    <li
      v-for="(question, index) in questionsList"
      :key="index"
      class="flex items-start gap-2 text-[#0F184B] dark:text-dark-text-deep text-[14px] sm:text-[15px] md:text-[15px] xl:text-[16px] min-[1920px]:text-[18px] leading-[26px] sm:leading-[32px] md:leading-[34px] xl:leading-[40px]"
    >
      <span class="mt-1 flex-shrink-0">✔</span>
      <span>{{ question }}</span>
    </li>
  </ul>
</div>

    <!-- بخش دکمه و فلش -->
    <div class="relative z-10 flex flex-col xl:flex-row items-center xl:justify-between mt-6 md:mt-8 xl:mt-10 px-2 md:px-4 gap-6 md:gap-7 xl:gap-0">

      <!-- متن -->
      <div
        :class="[
          'text-center mt-0 xl:-mt-[100px] min-[1920px]:-mt-[115px] order-1 lg:mt-0.5',
          isRtl ? 'mr-0 xl:mr-[20px] min-[1920px]:mr-[35px]' : 'ml-0 xl:ml-[20px] min-[1920px]:ml-[35px]'
        ]"
      >
  <span class="whitespace-nowrap text-[18px] sm:text-[20px] md:text-[22px] xl:text-[24px] min-[1920px]:text-[28px] font-bold text-[#747893] dark:text-dark-text/80 block">{{ $t('events.landing.ctaLine1') }}</span>
  <span class="whitespace-nowrap text-[18px] sm:text-[20px] md:text-[22px] xl:text-[24px] min-[1920px]:text-[28px] font-bold text-[#747893] dark:text-dark-text/80 block">{{ $t('events.landing.ctaLine2') }}</span>
</div>

      <!-- فلش (وسط) - فقط در دسکتاپ واقعی نمایش داده می‌شود -->
      <div class="hidden xl:flex flex-1 justify-center px-4 order-2">
        <img
          src="/images/curved-arrow.png"
          :alt="$t('events.landing.arrowAlt')"
          class="min-w-[600px] lg:min-w-[650px] xl:min-w-[700px] min-[1920px]:min-w-[780px] -ml-[150px] lg:-ml-[175px] xl:-ml-[195px] min-[1920px]:-ml-[220px] object-contain dark:opacity-80"
          :class="isRtl ? '' : 'scale-x-[-1]'"
        />
      </div>

      <!-- دکمه ( درخواست همکاری) -->
      <NuxtLink :to="localePath('/order/requestProject')" class="order-3">
        <button class="bg-[#ECD0A0] dark:bg-dark-gold px-10 py-4 rounded-[16px] font-bold shadow-md hover:bg-[#dcc090] dark:hover:bg-dark-gold/80 dark:text-dark-text-deep transition w-full max-w-[263px] md:w-[263px] xl:w-[263px] min-[1920px]:w-[300px] h-[48px] min-[1920px]:h-[54px] mt-0 xl:mt-[90px] min-[1920px]:mt-[105px]">
          {{ $t('events.landing.cooperateButton') }}
        </button>
      </NuxtLink>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import ServiceCard from '@/components/events/landing/ServiceCard.vue'

// --- i18n ---
const { locale, localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

// ── Image URL resolver ──────────────────────────────────────
const STORAGE_BASE = 'https://nadertechnologyteam.ir/storage/'

const resolveImageUrl = (value) => {
  if (!value) return value
  if (/^(https?:|blob:|data:)/.test(value)) return value
  return STORAGE_BASE + value.replace(/^\/+/, '')
}

// تصاویر پیش‌فرض (در صورتی که برای اون سرویس تصویر خاصی از API نیومده باشه)
const defaultImages = [
  '/images/event-card-1.png',
  '/images/event-card-2.jpg',
  '/images/event-card-3.jpg'
]

// =====================================================
// اتصال به API صفحه events + دوزبانه‌سازی
// -----------------------------------------------------
// آرایه‌ی خام رو نگه می‌داریم تا با تغییر locale، بدون فچ مجدد،
// دوباره محاسبه بشه. برای هر کلید متنی، اگه نسخه‌ی «key_en»
// وجود داشته و پر باشه و زبان فعلی en باشه، از اون استفاده میشه؛
// وگرنه fallback به نسخه‌ی فارسی همون کلید.
// =====================================================
const rawItems = ref([])

const { data: eventsRes, error: eventsError } = await useFetch(
  'https://nadertechnologyteam.ir/api/page/events'
)

if (eventsRes.value && eventsRes.value.data) {
  rawItems.value = eventsRes.value.data
} else if (eventsError.value) {
  console.error('خطا در دریافت اطلاعات صفحه events:', eventsError.value)
}

const rawMap = computed(() => {
  const map = {}
  rawItems.value.forEach((item) => {
    map[item.key] = item
  })
  return map
})

// کلید فارسی/انگلیسی رو می‌گیره و مقدار مناسب رو برمی‌گردونه
const pickValue = (key) => {
  const faEntry = rawMap.value[key]
  const enEntry = rawMap.value[`${key}_en`]
  const useEn = locale.value === 'en' && enEntry && enEntry.value
  return (useEn ? enEntry.value : faEntry?.value) || ''
}

// ── description_1 / description_2 ───────────────────────────
const pageData = computed(() => ({
  description_1: pickValue('description_1'),
  description_2: pickValue('description_2')
}))

// ── services (service_N / service_N_image) ──────────────────
// نکته: تصویر (service_N_image) دوزبانه نمیشه چون خودِ عکسه، نه متن؛
// پس همیشه از نسخه‌ی اصلی (بدون _en) خونده میشه.
const services = computed(() => {
  const serviceKeyRegex = /^service_(\d+)$/
  const serviceNumbers = new Set()

  rawItems.value.forEach((item) => {
    const match = item.key.match(serviceKeyRegex)
    if (match) serviceNumbers.add(Number(match[1]))
  })

  const sortedNumbers = Array.from(serviceNumbers).sort((a, b) => a - b)

  return sortedNumbers.map((n, index) => {
    const rawValue = pickValue(`service_${n}`)
    const lines = rawValue.split('\n')
    const title = lines[0] || ''
    const description = lines.slice(1).join('\n').trim()

    const imageFromApi = rawMap.value[`service_${n}_image`]?.value

    return {
      title,
      description,
      image: imageFromApi
        ? resolveImageUrl(imageFromApi)
        : defaultImages[index % defaultImages.length]
    }
  })
})

// ── questions (آرایه‌ی JSON، با fallback بین questions/questions_en) ─
const questions = computed(() => {
  const raw = pickValue('questions')
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.error('خطا در پارس کردن questions:', e)
    return []
  }
})

// اولین آیتم questions به عنوان تایتل و بقیه به عنوان لیست سوالات
const questionsTitle = computed(() => questions.value[0] || '')
const questionsList = computed(() => questions.value.slice(1))
</script>