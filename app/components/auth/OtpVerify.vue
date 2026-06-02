<!-- components/auth/OtpVerify.vue -->
<template>
  <div>
    <h2 class="text-xl font-bold mb-2 text-center">تایید شماره موبایل</h2>
    <p class="text-sm text-slate-400 text-center mb-6">
      کد ۵ رقمی فرستاده شده به شماره {{ phone }} را وارد کنید.
    </p>
    
    <form @submit.prevent="handleVerifyOtp">
      <div class="mb-6">
        <input 
          v-model="otpCode" 
          type="text" 
          maxlength="5"
          placeholder="• • • • •"
          class="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 transition text-center tracking-[1em] text-lg font-bold"
        />
        <p v-if="error" class="text-xs text-red-500 mt-1 text-center">{{ error }}</p>
      </div>

      <!-- بخش تایمر معکوس -->
      <div class="text-center mb-6 text-sm text-slate-400">
        <span v-if="timer > 0">زمان باقی‌مانده: {{ formatTime(timer) }}</span>
        <button 
          v-else 
          type="button" 
          @click="resendOtp" 
          class="text-emerald-400 hover:underline font-medium"
        >
          ارسال مجدد کد تایید
        </button>
      </div>

      <button 
        type="submit" 
        :disabled="isLoading"
        class="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800 text-slate-950 font-bold rounded-lg transition"
      >
        <span v-if="isLoading">در حال بررسی...</span>
        <span v-else>تایید و تکمیل</span>
      </button>

      <!-- دکمه بازگشت به مرحله قبل -->
      <div class="mt-6 text-center text-sm">
        <button 
          type="button" 
          @click="$emit('back')" 
          class="text-slate-400 hover:text-white transition"
        >
          ← ویرایش شماره تلفن
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'

// گرفتن شماره موبایل از کامپوننت مادر
const props = defineProps({
  phone: {
    type: String,
    required: true
  }
})

// فرستادن رویدادها به کامپوننت مادر
const emit = defineEmits(['success', 'back'])

const otpCode = ref('')
const isLoading = ref(false)
const error = ref('')
const timer = ref(120) // ۲ دقیقه
let timerInterval = null

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

const startTimer = () => {
  timer.value = 120
  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      clearInterval(timerInterval)
    }
  }, 1000)
}

// شروع خودکار تایمر هنگام لود شدن کامپوننت
startTimer()

const handleVerifyOtp = async () => {
  error.value = ''
  if (otpCode.value.length !== 5) {
    error.value = 'کد تایید باید ۵ رقمی باشد.'
    return
  }

  isLoading.value = true
  try {
    console.log('ارسال کد OTP به لاراول:', otpCode.value)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // اگر تایید موفق بود، به مادر خبر بده
    emit('success')
  } catch (err) {
    console.error(err)
    error.value = 'کد وارد شده اشتباه است.'
  } {
    isLoading.value = false
  }
}

const resendOtp = () => {
  console.log('درخواست مجدد پیامک برای شماره:', props.phone)
  startTimer()
}

onBeforeUnmount(() => {
  clearInterval(timerInterval)
})
</script>