<template>
  <div class="min-h-screen bg-[#F9F7F2] dark:bg-dark-bg flex justify-center items-center p-4 md:p-8 " :dir="isRtl ? 'rtl' : 'ltr'">

    <RaffleCard class="w-full max-w-lg bg-white dark:bg-dark-surface rounded-3xl shadow-xl overflow-hidden relative pb-8">

      <div class="w-full h-48 md:h-56 relative ">
        <img src="/images/lottery-header-reg.jpg" class="w-full h-full object-cover" />
      </div>

      <div class="px-6 md:px-10 ">

        <!-- حالت لودینگ اولیه (در حال گرفتن اطلاعات قرعه‌کشی) -->
        <div v-if="pending" class="py-10 text-center text-gray-400 dark:text-dark-text/60 text-sm">
          {{ $t('events.lottery.registerForm.loading') }}
        </div>

        <!-- خطای دریافت اطلاعات قرعه‌کشی -->
        <div v-else-if="loadError" class="py-10 text-center text-red-500 dark:text-red-400 text-sm">
          {{ loadError }}
        </div>

        <template v-else-if="lottery">
          <h1 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-dark-text mb-4 text-center mt-6">{{ lottery.title }}</h1>
          <div class="w-16 h-1 bg-[#2D7A6F] dark:bg-dark-accent rounded-full mx-auto mb-6"></div>

          <p class="text-gray-500 dark:text-dark-text/70 text-sm md:text-base leading-relaxed mb-8 text-center">
            {{ lottery.description }}
          </p>

          <!-- اطلاعات قرعه‌کشی که از API واقعی میاد (تاریخ شروع، پایان و ظرفیت) -->
          <div class="bg-[#ebebeb] dark:bg-dark-input rounded-2xl border border-gray-200 dark:border-dark-border shadow-sm mb-8 overflow-hidden">
            <div class="flex items-center p-3 md:p-4 border-b border-gray-300 dark:border-dark-border/60">
              <Icon name="heroicons:calendar-days" class="text-gray-500 dark:text-dark-text-deep/70 ml-3 text-xl md:text-2xl" />
              <span class="w-full text-gray-700 dark:text-dark-text-deep text-sm md:text-base">{{ $t('events.lottery.registerForm.starts') }}: {{ formatDate(lottery.starts_at) }}</span>
            </div>
            <div class="flex items-center p-3 md:p-4 border-b border-gray-300 dark:border-dark-border/60">
              <Icon name="heroicons:clock" class="text-gray-500 dark:text-dark-text-deep/70 ml-3 text-xl md:text-2xl" />
              <span class="w-full text-gray-700 dark:text-dark-text-deep text-sm md:text-base">{{ $t('events.lottery.registerForm.ends') }}: {{ formatDate(lottery.ends_at) }}</span>
            </div>
            <div class="flex items-center p-3 md:p-4">
              <Icon name="heroicons:users" class="text-gray-500 dark:text-dark-text-deep/70 ml-3 text-xl md:text-2xl" />
              <span class="w-full text-gray-700 dark:text-dark-text-deep text-sm md:text-base">{{ $t('events.lottery.registerForm.capacity') }}: {{ lottery.capacity }} {{ $t('events.lottery.registerForm.people') }}</span>
            </div>
          </div>

          <p class="text-lg font-bold text-gray-800 dark:text-dark-text mb-2 text-center">{{ $t('events.lottery.registerForm.price') }}: {{ formatPrice(lottery.price) }} {{ $t('events.lottery.register.currency') }}</p>

          <!-- پیام خطای ثبت‌نام (ظرفیت تکمیل، قبلاً ثبت‌نام شده، عدم احراز هویت و ...) -->
          <p v-if="submitError" class="text-red-500 dark:text-red-400 text-sm text-center mb-4">{{ submitError }}</p>

          <button
            @click="handleRegister"
            :disabled="submitting"
            class="w-full bg-[#2D7A6F] dark:bg-dark-accent text-white dark:text-dark-text-deep py-3 md:py-4 rounded-2xl font-bold hover:bg-teal-800 dark:hover:bg-dark-accent-hover transition shadow-lg text-sm md:text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ submitting ? $t('events.lottery.registerForm.submitting') : $t('events.lottery.registerForm.submit') }}
          </button>
        </template>
      </div>
    </RaffleCard>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { apiFetch, LOTTERIES_PATH } from '~/composables/useApi'
import { useActiveLottery } from '~/composables/useActiveLottery'

// --- i18n ---
const { locale, localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

const { lottery, pending, fetchActiveLottery } = useActiveLottery()

const loadError = ref('')
const submitting = ref(false)
const submitError = ref('')

onMounted(async () => {
  try {
    await fetchActiveLottery()
  } catch (err) {
    loadError.value = err.message
  }
})

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

async function handleRegister() {
  if (!lottery.value) return
  submitting.value = true
  submitError.value = ''

  try {
    // POST /api/lotteris/{lottery}/register  (مسیر واقعی سرور، نه lotteries)
    const res = await apiFetch(`${LOTTERIES_PATH}/${lottery.value.id}/register`, {
      method: 'POST'
    })

    // اطلاعات ثبت‌نام (کاربر، قرعه‌کشی، تاریخ ثبت‌نام) رو برای صفحه رسید نگه می‌داریم
    const registration = useState('lottery-registration', () => null)
    registration.value = res.data

    await navigateTo(localePath('/events/lottery/success'))
  } catch (err) {
    // بر اساس کدهای پاسخ سند Swagger: 400 (ظرفیت تکمیل)، 401 (عدم احراز هویت)،
    // 409 (قبلاً ثبت‌نام کرده)، 422 (قرعه‌کشی فعال نیست)
    submitError.value = err.data?.message || err.message
  } finally {
    submitting.value = false
  }
}
</script>