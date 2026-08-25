<template>
  <!-- کانتینر اصلی بخش خدمات رویدادها -->
  <section class="relative bg-[#ABD7D8] dark:bg-[#96ACB1] p-5 sm:p-8 md:p-9 xl:p-10 min-[1920px]:p-12 rounded-[16px] md:rounded-[18px] xl:rounded-[20px] min-[1920px]:rounded-[24px] mt-8 mx-auto w-full xl:w-[1110px] min-[1920px]:w-[1400px] max-w-full" :dir="isRtl ? 'rtl' : 'ltr'">


    <!-- بخش توضیحات -->
    <div
      :class="[
        'mb-8 md:mb-9 xl:mb-10 relative z-10',
        isRtl ? 'pr-0 sm:pr-[40px] md:pr-[60px] xl:pr-[90px] min-[1920px]:pr-[120px]' : 'pl-0 sm:pl-[40px] md:pl-[60px] xl:pl-[90px] min-[1920px]:pl-[120px]'
      ]"
    >

      <!-- description_1 و description_2 از فیلدهای RichTextEditor پنل ادمین می‌آیند،
           بنابراین با v-html رندر می‌شوند نه {{ }}. قبلاً این دو با <br><br> از هم جدا
           می‌شدند؛ چون خروجی RichTextEditor خودش پاراگراف‌بندی (margin) دارد، آن <br>ها
           حذف شدند و به‌جایش یک فاصله‌ی ثابت (mt-4) بین دو بلوک گذاشته شده. -->
      <div
        class="tiptap-render max-w-full xl:max-w-[865px] min-[1920px]:max-w-[1100px] font-400 text-[#A36C53] dark:text-[#A36C53] text-[20px] sm:text-[22px] md:text-[24px] xl:text-[26px] min-[1920px]:text-[30px] leading-[26px] sm:leading-[32px] md:leading-[34px] xl:leading-[40px] min-[1920px]:leading-[44px]"
        v-html="pageData.description_1"
      ></div>

      <div
        class="tiptap-render mt-4 max-w-full xl:max-w-[865px] min-[1920px]:max-w-[1100px] font-roboto font-light text-[#0F184B] dark:text-dark-text-deep text-[14px] sm:text-[15px] md:text-[15px] xl:text-[16px] min-[1920px]:text-[18px] leading-[26px] sm:leading-[32px] md:leading-[34px] xl:leading-[40px] min-[1920px]:leading-[44px]"
        v-html="pageData.description_2"
      ></div>
    </div>

    <!-- عنوان بخش خدمات -->
    <h2
      :class="[
        'relative z-10 text-[20px] sm:text-[22px] md:text-[24px] xl:text-[26px] min-[1920px]:text-[30px] text-[#A36C53] dark:[#A36C53] font-bold mb-4 text-center',
        isRtl ? 'pr-0 sm:pr-[40px] md:pr-[60px] xl:pr-[90px] min-[1920px]:pr-[120px] sm:text-right' : 'pl-0 sm:pl-[40px] md:pl-[60px] xl:pl-[90px] min-[1920px]:pl-[120px] sm:text-left'
      ]"
    >{{ $t('events.landing.servicesTitle') }}</h2>

    <!-- لیست کارت‌های خدمات -->
    <div class="relative z-10 space-y-6 mb-10 md:mb-11 xl:mb-12 flex flex-col items-center text-center">
      <ServiceCard :services="services" />
    </div>

<!-- بخش سوالات (در صورت وجود) -->
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

    <!-- بخش دعوت به همکاری (متن + فلش + دکمه) -->
    <div class="relative z-10 flex flex-col xl:flex-row items-center xl:justify-between mt-6 md:mt-8 xl:mt-10 px-2 md:px-4 gap-6 md:gap-7 xl:gap-0">

      <!-- متن دعوت به همکاری -->
      <div
        :class="[
          'text-center mt-0 xl:-mt-[100px] min-[1920px]:-mt-[115px] order-1 lg:mt-0.5',
          isRtl ? 'mr-0 xl:mr-[20px] min-[1920px]:mr-[35px]' : 'ml-0 xl:ml-[20px] min-[1920px]:ml-[35px]'
        ]"
      >
  <span class="whitespace-nowrap text-[18px] sm:text-[20px] md:text-[22px] xl:text-[24px] min-[1920px]:text-[28px] font-bold text-[#747893] dark:text-dark-text/80 block">{{ $t('events.landing.ctaLine1') }}</span>
  <span class="whitespace-nowrap text-[18px] sm:text-[20px] md:text-[22px] xl:text-[24px] min-[1920px]:text-[28px] font-bold text-[#747893] dark:text-dark-text/80 block">{{ $t('events.landing.ctaLine2') }}</span>
</div>

      <!-- فلش تزئینی، فقط دسکتاپ -->
      <div class="hidden xl:flex flex-1 justify-center px-4 order-2">
        <img
          src="/images/curved-arrow.png"
          :alt="$t('events.landing.arrowAlt')"
          class="min-w-[600px] lg:min-w-[650px] xl:min-w-[700px] min-[1920px]:min-w-[780px] -ml-[150px] lg:-ml-[175px] xl:-ml-[195px] min-[1920px]:-ml-[220px] object-contain dark:opacity-80"
          :class="isRtl ? '' : 'scale-x-[-1]'"
        />
      </div>

      <!-- دکمه درخواست همکاری -->
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

// ── تبدیل مسیر تصویر نسبی به URL کامل استوریج ──────────────
const STORAGE_BASE = 'https://nadertechnologyteam.ir/storage/'

const resolveImageUrl = (value) => {
  if (!value) return value
  if (/^(https?:|blob:|data:)/.test(value)) return value
  return STORAGE_BASE + value.replace(/^\/+/, '')
}

// تصاویر پیش‌فرض برای سرویس‌هایی که تصویر خاصی از API ندارن
const defaultImages = [
  '/images/event-card-1.png',
  '/images/event-card-2.jpg',
  '/images/event-card-3.jpg'
]

// دریافت داده‌های خام صفحه events از API
const rawItems = ref([])

const { data: eventsRes, error: eventsError } = await useFetch(
  'https://nadertechnologyteam.ir/api/page/events'
)

if (eventsRes.value && eventsRes.value.data) {
  rawItems.value = eventsRes.value.data
} else if (eventsError.value) {
  console.error('خطا در دریافت اطلاعات صفحه events:', eventsError.value)
}

// نگاشت کلید به آیتم برای دسترسی سریع
const rawMap = computed(() => {
  const map = {}
  rawItems.value.forEach((item) => {
    map[item.key] = item
  })
  return map
})

// انتخاب مقدار مناسب بر اساس زبان فعلی (fallback به فارسی)
const pickValue = (key) => {
  const faEntry = rawMap.value[key]
  const enEntry = rawMap.value[`${key}_en`]
  const useEn = locale.value === 'en' && enEntry && enEntry.value
  return (useEn ? enEntry.value : faEntry?.value) || ''
}

// متن‌های توضیحات صفحه
const pageData = computed(() => ({
  description_1: pickValue('description_1'),
  description_2: pickValue('description_2')
}))

// ── جدا کردن «عنوان» از «توضیحات» در خروجی HTML یک فیلد RichTextEditor ──
// قبلاً این کار با split('\n') انجام می‌شد چون ادیتور ساده بود و هر Enter
// یک '\n' واقعی می‌ساخت. الان خروجی RichTextEditor به‌جای \n از تگ‌های
// بلاک (<p>, <h2>, <h3>, <ul>, <ol>, <blockquote>) استفاده می‌کند، پس باید
// بر همین اساس جدا کنیم: اولین بلوک = عنوان، بقیه‌ی بلوک‌ها = توضیحات.
const splitTitleAndDescription = (html) => {
  if (!html) return { title: '', description: '' }

  const blockRegex = /<(p|h2|h3|ul|ol|blockquote)[^>]*>[\s\S]*?<\/\1>/gi
  const blocks = html.match(blockRegex)

  // اگر هیچ تگ بلاکی پیدا نشد (مثلاً یک متن ساده‌ی قدیمی بدون HTML)،
  // کل مقدار را به‌عنوان عنوان در نظر می‌گیریم تا داده‌ی قدیمی از دست نرود
  if (!blocks || !blocks.length) {
    return { title: html, description: '' }
  }

  return {
    title: blocks[0],
    description: blocks.slice(1).join(''),
  }
}

// ساخت لیست سرویس‌ها از کلیدهای service_N
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
    const { title, description } = splitTitleAndDescription(rawValue)

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

// پارس آرایه سوالات از JSON خام
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

// آیتم اول به عنوان تایتل، بقیه به عنوان لیست سوالات
const questionsTitle = computed(() => questions.value[0] || '')
const questionsList = computed(() => questions.value.slice(1))
</script>

<style scoped>
/* استایل‌های محتوای HTML که از RichTextEditor پنل ادمین می‌آید،
   هماهنگ با استایل خودِ ادیتور تا آنچه ادمین می‌نویسد همان‌طور نمایش داده شود.
   font-size/line-height/font-weight به‌صورت صریح inherit شده‌اند تا اندازه‌ی
   متن از کلاس‌های بیرونی (text-[..px]) پیروی کند نه از پیش‌فرض مرورگر. */
.tiptap-render :deep(p) {
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  margin: 0 0 0.6em 0;
}
.tiptap-render :deep(p:last-child) {
  margin-bottom: 0;
}
.tiptap-render :deep(h2) {
  font-size: 1.15em;
  font-weight: 700;
  margin: 0.6em 0 0.3em 0;
}
.tiptap-render :deep(h3) {
  font-size: 1.05em;
  font-weight: 700;
  margin: 0.5em 0 0.3em 0;
}
.tiptap-render :deep(ul) {
  list-style: disc;
  padding-inline-start: 1.25rem;
  margin: 0.4em 0;
}
.tiptap-render :deep(ol) {
  list-style: decimal;
  padding-inline-start: 1.25rem;
  margin: 0.4em 0;
}
.tiptap-render :deep(blockquote) {
  border-inline-start: 3px solid #2d6a66;
  padding-inline-start: 0.75rem;
  margin: 0.5em 0;
  opacity: 0.85;
}
.tiptap-render :deep(a) {
  color: #2d6a66;
  text-decoration: underline;
}
.tiptap-render :deep(strong) {
  font-weight: 700;
}
</style>