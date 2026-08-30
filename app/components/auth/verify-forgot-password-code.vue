<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

definePageMeta({ layout: 'auth' })

const config = useRuntimeConfig()

// تنظیمات چندزبانگی
const { t, localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

const otp = ref(new Array(6).fill(''))
const inputRefs = ref([])
const loading = ref(false)
const toast = ref({ message: '', type: '' })
const timer = ref(180)
let interval = null

onMounted(() => startTimer())
onBeforeUnmount(() => { if (interval) clearInterval(interval) })

// شروع شمارش معکوس زمان اعتبار کد
const startTimer = () => {
  timer.value = 180
  if (interval) clearInterval(interval)
  interval = setInterval(() => {
    if (timer.value > 0) timer.value--
    else clearInterval(interval)
  }, 1000)
}

// نمایش زمان باقی‌مانده به‌صورت دقیقه:ثانیه
const formattedTimer = computed(() => {
  const m = Math.floor(timer.value / 60)
  const s = timer.value % 60
  return `${m}:${s.toString().padStart(2, '0')}`
})

// نمایش پیام توست موقت
const showToast = (message, type = 'error') => {
  toast.value = { message, type }
  setTimeout(() => { toast.value = { message: '', type: '' } }, 4000)
}

// درخواست ارسال مجدد کد تایید
const resendCode = async () => {
  const login = localStorage.getItem('reset_login')

  try {
    await $fetch('/auth/forgot-password', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: { login }
    })
    startTimer()
  } catch (error) {
    showToast(t('auth.verifyForgotPassword.resendError'))
  }
}

// جابه‌جایی خودکار فوکوس بین اینپوت‌های کد
const handleInput = (index) => {
  otp.value[index] = otp.value[index].replace(/\D/g, '')
  if (otp.value[index] && index < 5) inputRefs.value[index + 1]?.focus()
}

// بازگشت فوکوس به اینپوت قبلی هنگام پاک کردن
const handleBackspace = (event, index) => {
  if (event.key === 'Backspace' && !otp.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
}

// بررسی و تایید کد وارد‌شده توسط کاربر
const verifyCode = async () => {
  const login = localStorage.getItem('reset_login')
  const codeValue = otp.value.join('')

  if (codeValue.length !== 6) {
    showToast(t('auth.verifyForgotPassword.incompleteCode'))
    return
  }

  loading.value = true
  try {
    const response = await $fetch('/auth/verify-forgot-password-code', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: { login, code: codeValue }
    })
    localStorage.setItem('reset_token', response.reset_token)
    navigateTo(localePath('/auth/reset-password'))
  } catch (error) {
    showToast(t('auth.verifyForgotPassword.invalidOrExpired'))
  } finally {
    loading.value = false
  }
}

  // تنظیم تایتل در سربرگ مرورگر
useHead({
  title: computed(() => t('auth.verifyForgotPassword.pageTitle'))
});
</script>

<template>
  <div class="text-center" :dir="isRtl ? 'rtl' : 'ltr'">

    <!-- پیام توست -->
    <div
      v-if="toast.message"
      :class="[
        'fixed top-5 p-4 rounded text-white z-50 transition-opacity font-roboto',
        isRtl ? 'left-5' : 'right-5',
        toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
      ]"
    >
      {{ toast.message }}
    </div>

    <h1 class="text-xl font-bold text-[#0F184B] dark:text-dark-text-deep mb-20 font-roboto">{{ $t('auth.verifyForgotPassword.title') }}</h1>

    <form @submit.prevent="verifyCode">
      <!-- اینپوت‌های کد تایید -->
      <div class="flex justify-center gap-2 mb-6" dir="ltr">
        <input
          v-for="(_, index) in otp"
          :key="index"
          :ref="el => inputRefs[index] = el"
          v-model="otp[index]"
          maxlength="1"
          type="text"
          inputmode="numeric"
          class="w-12 h-16 bg-[#cedce0] dark:bg-[#D9D9D9CC] rounded-xl text-center text-2xl font-bold text-[#1a2333] dark:text-dark-text-deep focus:outline-none focus:ring-2 focus:ring-[#2d6a66] dark:focus:ring-dark-accent"
          @input="handleInput(index)"
          @keydown="handleBackspace($event, index)"
        />
      </div>

      <!-- نمایش زمان باقی‌مانده -->
      <div class="mb-10 text-sm text-[#1a2333] dark:text-dark-text-deep font-medium">
        {{ formattedTimer }}
      </div>

      <!-- دکمه ارسال فرم -->
      <AuthButton
        type="submit"
        :disabled="loading"
      >
        {{ loading ? $t('auth.verifyForgotPassword.verifying') : $t('auth.verifyForgotPassword.submit') }}
      </AuthButton>
    </form>

  </div>
</template>