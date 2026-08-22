<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'auth'
})

const { t, localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

const config = useRuntimeConfig()
const loading = ref(false)

// وضعیت فرم و خطاها
const form = ref({
  login: ''
})

const errors = ref({
  login: ''
})

// تابع ارسال کد
const sendResetCode = async () => {
  // پاک کردن خطاهای قبلی
  errors.value.login = ''

  // الگوی شماره موبایل: شروع با 09 و دقیقا 11 رقم
  const mobileRegex = /^09\d{9}$/

  // اعتبارسنجی اولیه
  if (!form.value.login.trim()) {
    errors.value.login = t('auth.forgotPassword.validation.required')
    return
  }

  if (!mobileRegex.test(form.value.login.trim())) {
    errors.value.login = t('auth.forgotPassword.validation.invalidMobile')
    return
  }

  loading.value = true

  try {
    await $fetch('/auth/forgot-password', {
      baseURL: config.public.apiBase,
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: {
        login: form.value.login.trim()
      }
    })

    localStorage.setItem('reset_login', form.value.login.trim())

    // هدایت به صفحه بعد
    await navigateTo(localePath('/auth/verify-forgot-password-code'))

  } catch (error) {
    const status = error?.response?.status ?? error?.status

    // پیام خطا رو کامل خودمون می‌نویسیم، به متن بک‌اند تکیه نمی‌کنیم
    if (status === 404) {
      errors.value.login = t('auth.forgotPassword.validation.mobileNotFound')
    } else if (status === 422) {
      errors.value.login = t('auth.forgotPassword.validation.invalidMobile')
    } else {
      errors.value.login = t('auth.forgotPassword.validation.serverError')
    }
  } finally {
    loading.value = false
  }
}

// تابع محدودکننده برای فقط عدد و حداکثر 11 رقم
const handleInput = () => {
  form.value.login = form.value.login.replace(/\D/g, '').slice(0, 11)
  errors.value.login = ''
}
</script>

<template>
  <div class="text-center" :dir="isRtl ? 'rtl' : 'ltr'">

<h1
  class="font-bold text-[#0F184B] dark:text-dark-text-deep mt-[30px] sm:mt-0 mb-8 font-roboto whitespace-nowrap"
  :class="isRtl ? 'text-[16px] sm:text-xl' : 'text-[17px] sm:text-xl'"
>
  {{ $t('auth.forgotPassword.welcome') }}
</h1>

    <h3
      class="w-fit whitespace-nowrap mx-auto font-roboto mb-4 text-[#0F184B] dark:text-dark-text-deep text-[16px] border-b border-[#0F184B] dark:border-dark-border"
      :class="isRtl ? 'text-right' : 'text-left'"
    >
      {{ $t('auth.forgotPassword.title') }}
    </h3>

    <form @submit.prevent="sendResetCode">
      <div class="mb-6">
        <AuthInput
          v-model="form.login"
          :label="$t('auth.forgotPassword.fields.phoneLabel')"
          :hint="$t('auth.forgotPassword.fields.phoneHint')"
          maxlength="11"
          class="[&>div>input]:h-[44px] [&>div>input]:py-4 font-roboto"
          @input="handleInput"
        />

<div
  v-if="errors.login"
  class="text-red-500 dark:text-red-400 text-[12px] mt-1 px-1 font-roboto"
  :class="isRtl ? 'text-right' : 'text-left'"
>
  {{ errors.login }}
</div>
      </div>

      <div class="mt-[10px] text-[18px] font-roboto">
        <AuthButton
          type="submit"
          :disabled="loading"
        >
          {{ loading ? $t('auth.forgotPassword.sending') : $t('auth.forgotPassword.submit') }}
        </AuthButton>
      </div>
    </form>

    <div class="mt-[10px] text-sm text-[#1a2333] dark:text-dark-text-deep font-medium cursor-pointer underline font-roboto">
      <NuxtLink :to="localePath('/auth/login')">
        {{ $t('auth.forgotPassword.backToLogin') }}
      </NuxtLink>
    </div>

  </div>
</template>