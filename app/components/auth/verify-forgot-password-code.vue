<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

definePageMeta({ layout: 'auth' })

const config = useRuntimeConfig()

// --- i18n ---
const { t, localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

const otp = ref(new Array(6).fill(''))
const inputRefs = ref([])
const loading = ref(false)
const errorMessage = ref('') 
const timer = ref(180)
let interval = null

onMounted(() => startTimer())
onBeforeUnmount(() => { if (interval) clearInterval(interval) })

const startTimer = () => {
  timer.value = 180
  if (interval) clearInterval(interval)
  interval = setInterval(() => {
    if (timer.value > 0) timer.value--
    else clearInterval(interval)
  }, 1000)
}

const formattedTimer = computed(() => {
  const m = Math.floor(timer.value / 60)
  const s = timer.value % 60
  return `${m}:${s.toString().padStart(2, '0')}`
})

// تابع ارسال مجدد کد
const resendCode = async () => {
  errorMessage.value = ''
  const login = localStorage.getItem('reset_login')
  
  try {
    await $fetch('/auth/forgot-password', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: { login }
    })
    startTimer()
  } catch (error) {
    errorMessage.value = t('auth.verifyForgotPassword.resendError')
  }
}

const handleInput = (index) => {
  errorMessage.value = ''
  otp.value[index] = otp.value[index].replace(/\D/g, '')
  if (otp.value[index] && index < 5) inputRefs.value[index + 1]?.focus()
}

const handleBackspace = (event, index) => {
  if (event.key === 'Backspace' && !otp.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
}

const verifyCode = async () => {
  errorMessage.value = ''
  const login = localStorage.getItem('reset_login')
  const codeValue = otp.value.join('')

  if (codeValue.length !== 6) {
    errorMessage.value = t('auth.verifyForgotPassword.incompleteCode')
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
    errorMessage.value = t('auth.verifyForgotPassword.invalidOrExpired')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="text-center" :dir="isRtl ? 'rtl' : 'ltr'">
    <h1 class="text-xl font-bold text-[#0F184B] dark:text-dark-text-deep mb-20 font-roboto">{{ $t('auth.verifyForgotPassword.title') }}</h1>

    <!-- اینپوت‌های کد -->
   <form @submit.prevent="verifyCode">
  <!-- اینپوت‌های کد -->
  <!-- توجه: dir="ltr" اینجا عمداً ثابت نگه داشته شده، چون ترتیب ورود ارقام
       کد تایید طبق قرارداد رایج فرم‌های OTP همیشه چپ‌به‌راست است، مستقل
       از جهت رابط کاربری -->
  <div class="flex justify-center gap-3 mb-4" dir="ltr">
    <input
      v-for="(_, index) in otp"
      :key="index"
      :ref="el => inputRefs[index] = el"
      v-model="otp[index]"
      maxlength="1"
      type="text"
      inputmode="numeric"
      class="w-12 h-14 text-center text-xl font-bold rounded-xl border border-gray-300 dark:border-dark-border bg-white dark:bg-[#D9D9D9CC] focus:border-[#2d6a66] dark:focus:border-dark-accent focus:outline-none"
      @input="handleInput(index)"
      @keydown="handleBackspace($event, index)"
    />
  </div>

  <!-- نمایش خطا -->
  <div class="h-6 mb-2">
    <p
      v-if="errorMessage"
      class="text-red-500 dark:text-red-400 text-sm font-bold"
    >
      {{ errorMessage }}
    </p>
  </div>

  <!-- باکس خاکستری تایمر -->
  <div class="bg-[#ebebeb] dark:bg-dark-input w-fit mx-auto px-4 py-2 rounded-lg mb-6 text-[#2d6a66] dark:text-dark-text-deep font-bold text-sm">
    {{ $t('auth.verifyForgotPassword.timeRemaining') }}: {{ formattedTimer }}
  </div>

  <!-- دکمه تایید -->
  <AuthButton
    type="submit"
    :disabled="loading"
    class="mb-4"
  >
    {{ loading ? $t('auth.verifyForgotPassword.verifying') : $t('auth.verifyForgotPassword.submit') }}
  </AuthButton>
</form>
  </div>
</template>