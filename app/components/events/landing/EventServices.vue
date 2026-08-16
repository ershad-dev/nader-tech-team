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
const { localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

// ── Image URL resolver ──────────────────────────────────────
// Images uploaded via the admin panel (image_path type) come back from the
// backend as a RELATIVE path (e.g. "pages/events/xxx.jpg"), not a full URL.
// This must be prefixed with the storage base before use in <img :src>.
// Kept in sync with the same helper used in the admin panel component.
const STORAGE_BASE = 'https://nadertechnologyteam.ir/storage/'

const resolveImageUrl = (value) => {
  if (!value) return value
  if (/^(https?:|blob:|data:)/.test(value)) return value
  return STORAGE_BASE + value.replace(/^\/+/, '')
}

const pageData = ref({
  description_1: '',
  description_2: ''
})

// تصاویر پیش‌فرض (در صورتی که برای اون سرویس تصویر خاصی از API نیومده باشه)
const defaultImages = [
  '/images/event-card-1.png',
  '/images/event-card-2.jpg',
  '/images/event-card-3.jpg'
]

const services = ref([])
const questions = ref([])

// اولین آیتم questions به عنوان تایتل و بقیه به عنوان لیست سوالات
const questionsTitle = computed(() => questions.value[0] || '')
const questionsList = computed(() => questions.value.slice(1))

const { data: eventsRes, error: eventsError } = await useFetch(
  'https://nadertechnologyteam.ir/api/page/events'
)

if (eventsRes.value && eventsRes.value.data) {
  const items = eventsRes.value.data
  const findValue = (key) => items.find((i) => i.key === key)?.value || ''

  pageData.value.description_1 = findValue('description_1')
  pageData.value.description_2 = findValue('description_2')

  // 1) پیدا کردن همه‌ی شماره‌هایی که کلید service_N دارن (به‌صورت داینامیک)
  const serviceNumbers = new Set()
  const serviceKeyRegex = /^service_(\d+)$/

  items.forEach((item) => {
    const match = item.key.match(serviceKeyRegex)
    if (match) {
      serviceNumbers.add(Number(match[1]))
    }
  })

  // 2) مرتب‌سازی شماره‌ها تا ترتیب کارت‌ها درست باشه (1، 2، 3، 4، ...)
  const sortedNumbers = Array.from(serviceNumbers).sort((a, b) => a - b)

  // 3) ساخت آرایه‌ی services: خط اول service_N = عنوان، بقیه‌ی خطوط = توضیحات
  //    و تصویر از کلید جدا service_N_image (اگر ادمین آپلود کرده باشه)
  //    مقدار خام از بک‌اند یه مسیر نسبیه (مثل "pages/events/xxx.jpg") پس
  //    قبل از استفاده باید از resolveImageUrl رد بشه، وگرنه مرورگر نمی‌تونه
  //    لودش کنه و عکس نمایش داده نمیشه.
  services.value = sortedNumbers.map((n, index) => {
    const rawValue = findValue(`service_${n}`)
    const lines = rawValue.split('\n')
    const title = lines[0] || ''
    const description = lines.slice(1).join('\n').trim()

    const imageFromApi = findValue(`service_${n}_image`)

    return {
      title,
      description,
      image: imageFromApi
        ? resolveImageUrl(imageFromApi)
        : defaultImages[index % defaultImages.length]
    }
  })

  // 4) پردازش کلید questions (یک رشته‌ی JSON که آرایه‌ای از رشته‌هاست)
  const questionsRaw = findValue('questions')
  if (questionsRaw) {
    try {
      const parsed = JSON.parse(questionsRaw)
      questions.value = Array.isArray(parsed) ? parsed : []
    } catch (e) {
      console.error('خطا در پارس کردن questions:', e)
      questions.value = []
    }
  }
} else if (eventsError.value) {
  console.error('خطا در دریافت اطلاعات صفحه events:', eventsError.value)
}
</script>