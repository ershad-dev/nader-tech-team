<script setup>
import { ref, computed } from 'vue'
import * as yup from 'yup'
import TermsAgreement from '~/components/Terms/TermsAgreement.vue'

// تنظیم لایوت صفحات احراز هویت
definePageMeta({ layout: 'auth' })

const { t, localeProperties } = useI18n()
const localePath = useLocalePath()
// جهت چیدمان بر اساس زبان
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

const config = useRuntimeConfig()

const activeTab = ref('password') // تب فعال (پسورد یا OTP)
const loading = ref(false)        // وضعیت لودینگ دکمه
const toast = ref({ message: '', type: '' }) // پیام toast

const errors = ref({    // خطاهای فرم
  login: '',
  password: ''
})

const form = ref({       // مقادیر فرم
  login: '',
  password: ''
})

// نمایش پیام toast
const showToast = (message, type = 'error') => {
  toast.value = { message, type }
  setTimeout(() => { toast.value = { message: '', type: '' } }, 4000)
}

// فیلتر کردن ورودی شماره موبایل (فقط عدد، حداکثر 11 رقم)
const handleLoginInput = (e) => {
  const digitsOnly = e.target.value.replace(/\D/g, '')
  form.value.login = digitsOnly.slice(0, 11)
  e.target.value = form.value.login
}

// فیلتر کردن کاراکترهای فارسی از پسورد
const handlePasswordInput = (e) => {
  const filtered = e.target.value.replace(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, '')
  form.value.password = filtered
  e.target.value = filtered
}

// جلوگیری از تایپ کاراکتر فارسی در پسورد
const handlePasswordKeydown = (e) => {
  const char = e.key
  if (char && char.length === 1 && /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(char)) {
    e.preventDefault()
  }
}

// اسکیمای اعتبارسنجی فرم
const loginSchema = computed(() => yup.object({
  login: yup
    .string()
    .required(t('auth.login.validation.required'))
    .matches(/^\d+$/, t('auth.login.validation.digitsOnly'))
    .length(11, t('auth.login.validation.length'))
    .matches(/^09/, t('auth.login.validation.prefix')),
  password:
    activeTab.value === 'password'
      ? yup.string().required(t('auth.login.validation.passwordRequired'))
      : yup.string().notRequired(),
}))

// اعتبارسنجی فرم قبل از ارسال
const validateForm = async () => {
  errors.value = { login: '', password: '' }
  try {
    await loginSchema.value.validate(form.value, { abortEarly: false })
    return true
  } catch (validationError) {
    validationError.inner.forEach((err) => {
      if (err.path && !errors.value[err.path]) {
        errors.value[err.path] = err.message
      }
    })
    return false
  }
}

// ارسال فرم لاگین (پسورد یا OTP)
const loginUser = async () => {
  const isValid = await validateForm()
  if (!isValid) return

  loading.value = true

  try {
    if (activeTab.value === 'password') {
      const response = await $fetch('/auth/login', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: {
          login: form.value.login,
          password: form.value.password
        }
      })

      if (response?.data?.access_token) {
        localStorage.setItem('access_token', response.data.access_token)
        showToast(t('auth.login.toast.loginSuccess'), 'success')
        setTimeout(() => {
          window.location.href = localePath('/profile')
        }, 500)
      }
    }
    else if (activeTab.value === 'otp') {
      const response = await $fetch('/auth/send-otp', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: { mobile: form.value.login }
      })

      if (response?.data?.login_token) {
        localStorage.setItem('login_token', response.data.login_token)
        showToast(t('auth.login.toast.otpSent'), 'success')
        setTimeout(() => {
          window.location.href = localePath('/auth/verify')
        }, 500)
      }
    }
  } catch (error) {
    const status = error?.response?.status ?? error?.status
    const serverErrors = error?.response?._data?.errors

    if (status === 401 || (status === 422 && serverErrors)) {
      errors.value.login = t('auth.login.validation.credentialsInvalid')
      if (activeTab.value === 'password') {
        errors.value.password = t('auth.login.validation.credentialsInvalid')
      }
    } else {
      showToast(t('auth.login.toast.serverError'))
    }
  } finally {
    loading.value = false
  }
}

  // تنظیم تایتل در سربرگ مرورگر
useHead({
  title: computed(() => t('auth.login.pageTitle'))
});
</script>

<template>
  <div class="text-center" :dir="isRtl ? 'rtl' : 'ltr'">
    <!-- پیام toast -->
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

    <!-- عنوان -->
    <h1
      class="font-bold text-[#0F184B] dark:text-dark-text-deep mt-[30px] sm:mt-0 mb-8 font-roboto whitespace-nowrap"
      :class="isRtl ? 'text-[16px] sm:text-xl' : 'text-[17px] sm:text-xl'"
    >
      {{ $t('auth.forgotPassword.welcome') }}
    </h1>

    <!-- تب‌های ورود -->
    <div
      class="flex gap-6 mb-6 font-medium font-roboto w-full justify-center sm:justify-start"
      :class="locale === 'en' ? 'text-[13px]' : 'text-[16px]'"
    >
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

    <!-- فرم لاگین -->
    <form @submit.prevent="loginUser">
      <div class="font-roboto" :class="isRtl ? 'text-right' : 'text-left'">
        <!-- فیلد موبایل -->
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

        <!-- فیلد پسورد (فقط تب پسورد) -->
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

      <!-- لینک فراموشی رمز -->
      <div class="mb-6" :class="isRtl ? 'text-right' : 'text-left'">
        <NuxtLink
          :to="localePath('/auth/forgot-password')"
          class="text-sm font-bold text-[#1a2333] dark:text-dark-text-deep underline decoration-2 underline-offset-4 font-roboto"
        >
          {{ $t('auth.login.forgotPassword') }}
        </NuxtLink>
      </div>

      <!-- پذیرش قوانین -->
      <div class="mb-[12px] mt-[30px]" :class="isRtl ? 'text-right' : 'text-left'">
        <TermsAgreement />
      </div>

      <!-- دکمه ارسال -->
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

    <!-- لینک ثبت‌نام -->
    <div class="mt-[20px] text-[16px] text-[#0F184B] dark:text-dark-text-deep font-bold cursor-pointer font-roboto underline underline-offset-2">
      <NuxtLink :to="localePath('/auth/register')">
        {{ $t('auth.login.registerLink') }}
      </NuxtLink>
    </div>
  </div>
</template>