<template>
  <div class="min-h-screen bg-[#F9F7F2] dark:bg-dark-bg flex justify-center items-center p-4" :dir="isRtl ? 'rtl' : 'ltr'">

    <div ref="pdfTarget" class="w-full max-w-lg bg-white dark:bg-dark-surface rounded-3xl shadow-xl overflow-hidden relative pb-8">

      <div class="w-full h-48 md:h-56 relative">
        <img src="/images/lottery-header-reg.jpg" class="w-full h-full object-cover" />
      </div>

      <div class="px-6 md:px-10">

        <h2 class="text-green-600 dark:text-green-400 font-bold text-lg md:text-xl text-center my-6">{{ $t('events.lottery.register.successTitle') }}</h2>

        <div v-if="!registration" class="text-center text-gray-400 dark:text-dark-text/60 text-sm py-6">
          {{ $t('events.lottery.register.notFound') }}
        </div>

        <template v-else>
          <!-- کد قرعه‌کشی: طبق سند جدید Swagger، پاسخ register یه فیلد "code" واقعی داره
               که همون کد قرعه‌کشی/بلیط کاربره؛ دیگه نیازی به حدس زدن اسم فیلد نیست -->
          <div class="text-center mb-8">
            <div class="bg-[#C5E0E3] dark:bg-dark-accent/30 text-[#2D7A6F] dark:text-dark-highlight px-6 py-2 rounded-full inline-block font-bold mb-3 text-sm">{{ $t('events.lottery.register.lotteryCode') }}</div>
            <p v-if="registration.code" class="text-2xl font-bold text-[#2C7379] dark:text-dark-highlight font-roboto">{{ registration.code }}</p>
            <p v-else class="text-sm text-red-400 dark:text-red-300 font-roboto">{{ $t('events.lottery.register.fieldMissing') }}</p>
          </div>

          <p class="text-amber-600 dark:text-amber-400 text-xs text-center mb-4 leading-relaxed font-roboto">
            {{ $t('events.lottery.register.saveCodeHint') }}
          </p>

          <div class="bg-[#BFD1D580]/50 dark:bg-dark-input/40 border border-[#6F78B780] dark:border-dark-border rounded-2xl p-4 md:p-6 mb-8 w-full">
            <div class="space-y-4 text-gray-600 dark:text-dark-text-deep text-sm md:text-base">
              <div class="flex justify-between border-b dark:border-dark-border/50 pb-3 font-roboto">
                <span>{{ $t('events.lottery.register.fields.fullName') }}</span>
                <span class="font-medium text-gray-800 dark:text-dark-text-deep font-roboto">{{ registration.user.full_name }}</span>
              </div>

              <div class="flex justify-between border-b dark:border-dark-border/50 pb-3 font-roboto">
                <span>{{ $t('events.lottery.register.fields.username') }}</span>
                <span class="font-medium text-gray-800 dark:text-dark-text-deep font-roboto">{{ registration.user.username }}</span>
              </div>

              <div class="flex justify-between border-b dark:border-dark-border/50 pb-3 font-roboto">
                <span>{{ $t('events.lottery.register.fields.mobile') }}</span>
                <span class="font-medium text-gray-800 dark:text-dark-text-deep font-roboto">{{ registration.user.mobile }}</span>
              </div>

              <div class="flex justify-between border-b dark:border-dark-border/50 pb-3 font-roboto">
                <span>{{ $t('events.lottery.register.fields.email') }}</span>
                <span class="font-medium text-gray-800 dark:text-dark-text-deep font-roboto">{{ registration.user.email }}</span>
              </div>

              <div class="flex justify-between border-b dark:border-dark-border/50 pb-3 font-roboto">
                <span>{{ $t('events.lottery.register.fields.province') }}</span>
                <span class="font-medium text-gray-800 dark:text-dark-text-deep font-roboto">{{ registration.user.province }}</span>
              </div>

              <div class="flex justify-between font-roboto">
                <span>{{ $t('events.lottery.register.fields.amountPaid') }}</span>
                <span class="font-medium text-gray-800 dark:text-dark-text-deep font-roboto">{{ formatPrice(registration.lottery.price) }} {{ $t('events.lottery.register.currency') }}</span>
              </div>
            </div>
          </div>

          <div class="text-center mb-8">
            <div class="bg-[#C5E0E3] dark:bg-dark-accent/30 text-[#2D7A6F] dark:text-dark-highlight px-6 py-2 rounded-full inline-block font-bold mb-3 text-sm">{{ $t('events.lottery.register.lotteryLabel') }}</div>
            <p class="text-lg md:text-xl font-bold text-[#2C7379] dark:text-dark-highlight">{{ registration.lottery.title }}</p>
            <p class="text-gray-400 dark:text-dark-text/60 text-xs mt-2 font-roboto">{{ $t('events.lottery.register.registeredAt') }}: {{ formatDate(registration.registered_at) }}</p>
          </div>

          <p class="text-red-400 dark:text-red-300 text-xs text-center mb-8 leading-relaxed font-roboto">
            {{ $t('events.lottery.register.screenshotHint') }}
          </p>

          <div class="flex flex-col items-center w-full px-6 md:px-10 mb-8 gap-4">

            <button
              @click="downloadPDF"
              class="w-[95px] h-[21px] bg-[#ED8480]/50 flex justify-center items-center rounded-lg hover:bg-[#ED8480] transition shadow-lg"
            >
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </button>

            <NuxtLink :to="localePath('/events')" class="w-full max-w-[375px] h-[47px] bg-[#2D7A6F] dark:bg-dark-accent text-white dark:text-dark-text-deep flex justify-center items-center rounded-2xl font-bold hover:bg-teal-800 dark:hover:bg-dark-accent-hover transition shadow-lg">
              {{ $t('events.lottery.register.backHome') }}
            </NuxtLink>

          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pdfTarget = ref(null)

// --- i18n ---
const { locale, localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

// این مقدار در pages/register.vue بعد از موفقیت‌آمیز بودن
// POST /api/lotteris/{lottery}/register داخل useState('lottery-registration', ...) ذخیره شده
// طبق سند جدید Swagger، پاسخ register یه فیلد "code" واقعی داره که همون کد قرعه‌کشی/بلیط کاربره
const registration = useState('lottery-registration', () => null)

function formatDate(value) {
  if (!value) return '-'
  const localeCode = locale.value === 'fa' ? 'fa-IR' : 'en-US'
  return new Date(value).toLocaleDateString(localeCode, { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatPrice(value) {
  if (value == null) return '-'
  const localeCode = locale.value === 'fa' ? 'fa-IR' : 'en-US'
  return new Intl.NumberFormat(localeCode).format(value)
}

const downloadPDF = async () => {
  const html2canvas = (await import('html2canvas')).default
  const { jsPDF } = await import('jspdf')

  const el = pdfTarget.value
  if (!el) return

  // جهت و زبان سند خروجی PDF باید مطابق زبان فعلی کاربر باشه، نه همیشه فارسی،
  // چون این عکس/PDF دقیقاً نمای همون صفحه‌ایه که کاربر می‌بینه
  const pdfDir = isRtl.value ? 'rtl' : 'ltr'
  const pdfLang = locale.value

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    windowWidth: el.scrollWidth,
    windowHeight: el.scrollHeight,
    onclone: (clonedDoc) => {
      clonedDoc.documentElement.setAttribute('dir', pdfDir)
      clonedDoc.documentElement.setAttribute('lang', pdfLang)
      clonedDoc.body.setAttribute('dir', pdfDir)
      clonedDoc.body.classList.remove('dark')
    }
  })

  const imgData = canvas.toDataURL('image/jpeg', 0.98)

  // سایز PDF رو دقیقاً از روی ابعاد خود canvas می‌سازیم (نه گرد کردن px->mm جدا)
  const pxToMm = (px) => (px * 25.4) / 96 / 2 // تقسیم بر scale چون canvas دو برابر شده
  const widthMm = pxToMm(canvas.width)
  const heightMm = pxToMm(canvas.height)

  const pdf = new jsPDF({
    orientation: widthMm > heightMm ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [widthMm, heightMm]
  })

  // تصویر رو دقیقاً به اندازه کل صفحه می‌چسبونیم - بدون مارجین و بدون کسری که باعث صفحه دوم بشه
  pdf.addImage(imgData, 'JPEG', 0, 0, widthMm, heightMm, undefined, 'FAST')

  pdf.save('Lottery-Registration.pdf')
}
</script>