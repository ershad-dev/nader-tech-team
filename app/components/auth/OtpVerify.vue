<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'

// تنظیم لایوت صفحات احراز هویت
definePageMeta({ layout: 'auth' })

const { t, localeProperties } = useI18n()
const localePath = useLocalePath()
// جهت چیدمان بر اساس زبان
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

const config = useRuntimeConfig()

const otp = ref(['', '', '', '', '', '']) // 6 رقم کد OTP
const loginToken = ref('')                // توکن موقت لاگین
const timer = ref(120)                    // شمارش معکوس اعتبار کد (ثانیه)
const inputRefs = ref([])                 // رفرنس اینپوت‌های OTP برای مدیریت فوکوس
const toast = ref({ message: '', type: '' })

let interval = null

// چک کردن وجود login_token و شروع تایمر
onMounted(() => {
  const storedToken = localStorage.getItem('login_token')

  if (!storedToken) {
    navigateTo(localePath('/auth/login'))
    return
  }

  loginToken.value = storedToken
  startTimer()
})

// پاک کردن تایمر هنگام خروج از صفحه
onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval)
  }
})

// شروع شمارش معکوس تایمر
const startTimer = () => {
  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      clearInterval(interval)
    }
  }, 1000)
}

// فرمت نمایش تایمر به صورت mm:ss
const formattedTimer = computed(() => {
  const m = Math.floor(timer.value / 60)
  const s = timer.value % 60

  return `${m}:${s.toString().padStart(2, '0')}`
})

// نمایش پیام toast
const showToast = (message, type = 'error') => {
  toast.value = { message, type }
  setTimeout(() => { toast.value = { message: '', type: '' } }, 4000)
}

// فیلتر کردن ورودی غیرعددی و فوکوس خودکار به اینپوت بعدی
const handleInput = (index) => {
  otp.value[index] = otp.value[index].replace(/\D/g, '')

  if (otp.value[index] && index < 5) {
    inputRefs.value[index + 1]?.focus()
  }
}

// برگشت به اینپوت قبلی با بک‌اسپیس روی خونه‌ی خالی
const handleKeydown = (index, event) => {
  if (event.key === 'Backspace' && !otp.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
}

// ارسال و بررسی کد OTP
const verifyCode = async () => {
  const code = otp.value.join('')

  if (code.length !== 6) {
    showToast(t('auth.verify.errors.incompleteCode'))
    return
  }

  if (!loginToken.value) {
    showToast(t('auth.verify.errors.tokenNotFound'))
    await navigateTo(localePath('/auth/login'))
    return
  }

  try {
    const response = await $fetch('/auth/verify-otp', {
      baseURL: config.public.apiBase,
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: {
        login_token: loginToken.value,
        code
      }
    })

    const accessToken = response?.data?.access_token
    const user = response?.data?.user

    if (!accessToken) {
      showToast(t('auth.verify.errors.noAccessToken'))
      return
    }

    localStorage.setItem('access_token', accessToken)

    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }

    localStorage.removeItem('login_token')

    // رفرش کامل صفحه بعد از ورود موفق
    window.location.href = localePath('/profile')
  } catch (error) {
    // پیام خطا رو کامل خودمون می‌نویسیم، به متن بک‌اند تکیه نمی‌کنیم
    showToast(t('auth.verify.errors.invalidOrExpired'))
  }
}

  // تنظیم تایتل در سربرگ مرورگر
useHead({
  title: computed(() => t('auth.verify.pageTitle'))
});
</script>

<template>
  <div class="text-center" :dir="isRtl ? 'rtl' : 'ltr'">

    <!-- پیام toast -->
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

    <!-- عنوان صفحه -->
    <h1 class="text-xl font-bold text-[#1a2333] dark:text-dark-text-deep mb-10">
      {{ $t('auth.verify.title') }}
    </h1>

    <!-- فرم وارد کردن کد تایید -->
    <form @submit.prevent="verifyCode">
      <!-- جعبه‌های OTP همیشه چپ‌به‌راست می‌مونن (ترتیب رقم‌ها نباید با تغییر زبان برعکس بشه) -->
      <div class="flex justify-center gap-2 mb-6" dir="ltr">
        <input
          v-for="i in 6"
          :key="i"
          v-model="otp[i - 1]"
          :ref="el => inputRefs[i - 1] = el"
          @input="handleInput(i - 1)"
          @keydown="handleKeydown(i - 1, $event)"
          type="text"
          inputmode="numeric"
          maxlength="1"
          class="w-12 h-16 bg-[#cedce0] dark:bg-[#D9D9D9CC] rounded-xl text-center text-2xl font-bold text-[#1a2333] dark:text-dark-text-deep focus:outline-none focus:ring-2 focus:ring-[#2d6a66] dark:focus:ring-dark-accent"
        />
      </div>

      <!-- نمایش تایمر شمارش معکوس -->
      <div class="mb-10 text-sm text-[#1a2333] dark:text-dark-text-deep font-medium">
        {{ formattedTimer }}
      </div>

      <!-- دکمه تایید کد -->
      <AuthButton type="submit">
        {{ $t('auth.verify.submit') }}
      </AuthButton>
    </form>

    <!-- لینک بازگشت به صفحه ورود -->
    <div class="mt-6 text-sm text-[#1a2333] dark:text-dark-text-deep font-medium cursor-pointer">
      <NuxtLink :to="localePath('/auth/login')">
        {{ $t('auth.verify.backToLogin') }}
      </NuxtLink>
    </div>
  </div>
</template>