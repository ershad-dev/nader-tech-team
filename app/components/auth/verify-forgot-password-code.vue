<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

definePageMeta({ layout: 'auth' })

const config = useRuntimeConfig()

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
    errorMessage.value = 'خطا در ارسال مجدد کد'
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
    errorMessage.value = 'کد باید ۶ رقمی باشد'
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
    navigateTo('/auth/reset-password')
  } catch (error) {
    errorMessage.value =  'کد نامعتبر یا منقضی شده است'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="text-center" dir="rtl">
    <h1 class="text-xl font-bold text-[#0F184B] mb-20 font-roboto">کد تایید را وارد کنید.</h1>

    <!-- اینپوت‌های کد -->
    <div class="flex justify-center gap-3 mb-4" dir="ltr">
      <input
        v-for="(_, index) in otp" :key="index"
        :ref="el => inputRefs[index] = el"
        v-model="otp[index]"
        maxlength="1"
        type="text"
        inputmode="numeric"
        class="w-12 h-14 text-center text-xl font-bold rounded-xl border border-gray-300 bg-white focus:border-[#2d6a66] focus:outline-none"
        @input="handleInput(index)"
        @keydown="handleBackspace($event, index)"
      />
    </div>

    <!-- نمایش خطا -->
    <div class="h-6 mb-2">
      <p v-if="errorMessage" class="text-red-500 text-sm font-bold">
        {{ errorMessage }}
      </p>
    </div>

    <!-- باکس خاکستری تایمر -->
    <div class="bg-[#ebebeb] w-fit mx-auto px-4 py-2 rounded-lg mb-6 text-[#2d6a66] font-bold text-sm">
      زمان باقی مانده: {{ formattedTimer }}
    </div>

    <!-- دکمه تایید -->
    <AuthButton @click="verifyCode" :disabled="loading" class="mb-4">
      {{ loading ? 'در حال بررسی...' : 'تایید کد' }}
    </AuthButton>

    <!-- دکمه ارسال مجدد -->
    <div class="mt-2">
      <button 
        @click="resendCode" 
        :disabled="timer > 0"
        class="text-sm font-bold underline transition-colors"
        :class="timer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#2d6a66] cursor-pointer'"
      >
        ارسال مجدد کد
      </button>
    </div>
  </div>
</template>