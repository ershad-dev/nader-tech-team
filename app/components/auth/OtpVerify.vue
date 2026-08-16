<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'

definePageMeta({ layout: 'auth' })

const { t, localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

const config = useRuntimeConfig()

const otp = ref(['', '', '', '', '', ''])
const loginToken = ref('')
const timer = ref(120)
const inputRefs = ref([])

let interval = null

onMounted(() => {
  const storedToken = localStorage.getItem('login_token')

  if (!storedToken) {
    navigateTo(localePath('/auth/login'))
    return
  }

  loginToken.value = storedToken
  startTimer()
})

onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval)
  }
})

// تایمر
const startTimer = () => {
  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      clearInterval(interval)
    }
  }, 1000)
}

// نمایش تایمر
const formattedTimer = computed(() => {
  const m = Math.floor(timer.value / 60)
  const s = timer.value % 60

  return `${m}:${s.toString().padStart(2, '0')}`
})

// مدیریت ورود اعداد و فوکوس خودکار
const handleInput = (index) => {
  otp.value[index] = otp.value[index].replace(/\D/g, '')

  if (otp.value[index] && index < 5) {
    inputRefs.value[index + 1]?.focus()
  }
}

// تایید OTP
const verifyCode = async () => {
  const code = otp.value.join('')

  if (code.length !== 6) {
    alert(t('auth.verify.errors.incompleteCode'))
    return
  }

  if (!loginToken.value) {
    alert(t('auth.verify.errors.tokenNotFound'))
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

    console.log('VERIFY RESPONSE =>', response)

    const accessToken = response?.data?.access_token
    const user = response?.data?.user

    if (!accessToken) {
      alert(t('auth.verify.errors.noAccessToken'))
      return
    }

    localStorage.setItem('access_token', accessToken)

    if (user) {
      localStorage.setItem(
        'user',
        JSON.stringify(user)
      )
    }

    localStorage.removeItem('login_token')

    await navigateTo(localePath('/profile'))
  } catch (error) {
    console.error('VERIFY OTP ERROR =>', error)

    alert(
      error?.data?.message ||
      error?.response?._data?.message ||
      t('auth.verify.errors.invalidOrExpired')
    )
  }
}
</script>

<template>
  <div class="text-center" :dir="isRtl ? 'rtl' : 'ltr'">
    <h1 class="text-xl font-bold text-[#1a2333] dark:text-dark-text-deep mb-10">
      {{ $t('auth.verify.title') }}
    </h1>

    <form @submit.prevent="verifyCode">
      <!-- جعبه‌های OTP همیشه چپ‌به‌راست می‌مونن (ترتیب رقم‌ها نباید با تغییر زبان برعکس بشه) -->
      <div class="flex justify-center gap-2 mb-6" dir="ltr">
        <input
          v-for="i in 6"
          :key="i"
          v-model="otp[i - 1]"
          :ref="el => inputRefs[i - 1] = el"
          @input="handleInput(i - 1)"
          type="text"
          inputmode="numeric"
          maxlength="1"
          class="w-12 h-16 bg-[#cedce0] dark:bg-[#D9D9D9CC] rounded-xl text-center text-2xl font-bold text-[#1a2333] dark:text-dark-text-deep focus:outline-none focus:ring-2 focus:ring-[#2d6a66] dark:focus:ring-dark-accent"
        />
      </div>

      <div class="mb-10 text-sm text-[#1a2333] dark:text-dark-text-deep font-medium">
        {{ formattedTimer }}
      </div>

      <AuthButton type="submit">
        {{ $t('auth.verify.submit') }}
      </AuthButton>
    </form>

    <div class="mt-6 text-sm text-[#1a2333] dark:text-dark-text-deep font-medium cursor-pointer">
      <NuxtLink :to="localePath('/auth/login')">
        {{ $t('auth.verify.backToLogin') }}
      </NuxtLink>
    </div>
  </div>
</template>