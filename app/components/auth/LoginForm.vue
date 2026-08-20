<script setup>
import { ref, computed } from 'vue'
import TermsAgreement from '~/components/TermsAgreement.vue'

definePageMeta({ layout: 'auth' })

const { t, localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

const config = useRuntimeConfig()

const activeTab = ref('password')
const loading = ref(false)
const toast = ref({ message: '', type: '' })

// تعریف وضعیت خطاها برای هر فیلد
const errors = ref({
  login: '',
  password: ''
})

const form = ref({
  login: '',
  password: ''
})

// تابع نمایش پیام‌های عمومی (Toast)
const showToast = (message, type = 'error') => {
  toast.value = { message, type }
  setTimeout(() => { toast.value = { message: '', type: '' } }, 4000)
}

// ---- هندلر شماره تلفن: فقط عدد قبول می‌کند ----
const handleLoginInput = (e) => {
  const digitsOnly = e.target.value.replace(/\D/g, '')
  form.value.login = digitsOnly.slice(0, 11)
  e.target.value = form.value.login
}

// ---- هندلر پسورد: جلوگیری از تایپ فارسی ----
const handlePasswordInput = (e) => {
  const filtered = e.target.value.replace(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, '')
  form.value.password = filtered
  e.target.value = filtered
}

const handlePasswordKeydown = (e) => {
  const char = e.key
  if (char && char.length === 1 && /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(char)) {
    e.preventDefault()
  }
}

const loginUser = async () => {
  // ۱. ریست کردن خطاهای قبلی قبل از ارسال مجدد
  errors.value = { login: '', password: '' }

  const loginValue = String(form.value.login || '').trim()

  // ۲. اعتبارسنجی شماره تلفن
  if (!loginValue) {
    errors.value.login = t('auth.login.validation.required')
  } else if (!/^\d+$/.test(loginValue)) {
    errors.value.login = t('auth.login.validation.digitsOnly')
  } else if (loginValue.length !== 11) {
    errors.value.login = t('auth.login.validation.length')
  } else if (!loginValue.startsWith('09')) {
    errors.value.login = t('auth.login.validation.prefix')
  }

  // ۳. اعتبارسنجی رمز عبور
  if (activeTab.value === 'password' && !form.value.password) {
    errors.value.password = t('auth.login.validation.passwordRequired')
  }

  // اگر خطای کلاینت وجود داشت، عملیات متوقف شود
  if (errors.value.login || errors.value.password) return

  loading.value = true

  try {
    if (activeTab.value === 'password') {
      const response = await $fetch('/auth/login', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: {
          login: loginValue,
          password: form.value.password
        }
      })

      if (response?.data?.access_token) {
        localStorage.setItem('access_token', response.data.access_token)
        showToast(t('auth.login.toast.loginSuccess'), 'success')
        setTimeout(() => navigateTo(localePath('/profile')), 500)
      }
    }
    else if (activeTab.value === 'otp') {
      const response = await $fetch('/auth/send-otp', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: { mobile: loginValue }
      })

      if (response?.data?.login_token) {
        localStorage.setItem('login_token', response.data.login_token)
        showToast(t('auth.login.toast.otpSent'), 'success')
        setTimeout(() => navigateTo(localePath('/auth/verify')), 500)
      }
    }
  } catch (error) {
    const serverErrors = error?.response?._data?.errors
    if (serverErrors) {
      errors.value = { ...errors.value, ...serverErrors }
    } else {
      showToast(error?.response?._data?.message || t('auth.login.toast.serverError'))
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="text-center" :dir="isRtl ? 'rtl' : 'ltr'">
    <div
      v-if="toast.message"
      :class="[
        'fixed top-5 p-4 rounded text-white z-50 transition-opacity',
        isRtl ? 'left-5' : 'right-5',
        toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
      ]"
    >
      {{ toast.message }}
    </div>

<h1 class="text-[17px] sm:text-xl font-bold text-[#0F184B] dark:text-dark-text-deep mt-[30px] sm:mt-0 mb-8 font-roboto whitespace-nowrap">
  {{ $t('auth.forgotPassword.welcome') }}
</h1>

<div class="flex gap-6 mb-6 font-medium font-roboto" :class="locale === 'en' ? 'text-[15px]' : 'text-[16px]'">
  <button
    type="button"
    @click="activeTab = 'password'"
    :class="[
      'text-[#0F184B] dark:text-dark-text-deep whitespace-nowrap',
      activeTab === 'password' ? 'border-b-2 border-[#1a2333] dark:border-dark-border' : ''
    ]"
  >
    {{ $t('auth.login.tabs.password') }}
  </button>

  <button
    type="button"
    @click="activeTab = 'otp'"
    :class="[
      'text-[#0F184B] dark:text-dark-text-deep whitespace-nowrap',
      activeTab === 'otp' ? 'border-b-2 border-[#1a2333] dark:border-dark-border' : ''
    ]"
  >
    {{ $t('auth.login.tabs.otp') }}
  </button>
</div>

    <form @submit.prevent="loginUser">
      <div class="font-roboto" :class="isRtl ? 'text-right' : 'text-left'">
        <div class="mb-4">
          <AuthInput
            v-model="form.login"
            :label="$t('auth.login.fields.mobile')"
            type="num"
            inputmode="numeric"
            pattern="\d*"
            maxlength="11"
            class="[&>div>input]:h-[44px] [&>div>input]:py-4"
            :class="{ '[&>div>input]:border-red-500 [&>div>input]:ring-red-300 dark:[&>div>input]:border-red-400 dark:[&>div>input]:ring-red-300': errors.login }"
            @input="handleLoginInput"
          />

          <p
            v-if="errors.login"
            class="text-red-500 dark:text-red-400 text-xs mt-1"
            :class="isRtl ? 'pr-1' : 'pl-1'"
          >
            {{ errors.login }}
          </p>
        </div>

        <div
          v-if="activeTab === 'password'"
          class="mb-4"
        >
          <AuthInput
            v-model="form.password"
            :label="$t('auth.login.fields.password')"
            type="password"
            class="[&>div>input]:h-[44px] [&>div>input]:py-4"
            :class="{ '[&>div>input]:border-red-500 [&>div>input]:ring-red-300 dark:[&>div>input]:border-red-400 dark:[&>div>input]:ring-red-300': errors.password }"
            @input="handlePasswordInput"
            @keydown="handlePasswordKeydown"
          />

          <p
            v-if="errors.password"
            class="text-red-500 dark:text-red-400 text-xs mt-1"
            :class="isRtl ? 'pr-1' : 'pl-1'"
          >
            {{ errors.password }}
          </p>
        </div>
      </div>

      <div class="mb-6" :class="isRtl ? 'text-right' : 'text-left'">
        <NuxtLink
          :to="localePath('/auth/forgot-password')"
          class="text-sm font-bold text-[#1a2333] dark:text-dark-text-deep underline decoration-2 underline-offset-4 font-roboto"
        >
          {{ $t('auth.login.forgotPassword') }}
        </NuxtLink>
      </div>

      <!-- اطلاع‌رسانی پذیرش قوانین و مقررات (بدون الزام تیک زدن) -->
      <div class="mb-[40px]" :class="isRtl ? 'text-right' : 'text-left'">
        <TermsAgreement />
      </div>

<AuthButton
  type="submit"
  :disabled="loading"
  class="mb-[5px] text-[22px] flex items-center justify-center text-center"
>
  <span class="mt-[3px]">
    {{ loading ? $t('auth.login.submitting') : $t('auth.login.submit') }}
  </span>
</AuthButton>
    </form>

<div class="mt-[20px] text-[16px] text-[#0F184B] dark:text-dark-text-deep font-bold cursor-pointer font-roboto underline underline-offset-2">
  <NuxtLink :to="localePath('/auth/register')">
    {{ $t('auth.login.registerLink') }}
  </NuxtLink>
</div>
  </div>
</template>