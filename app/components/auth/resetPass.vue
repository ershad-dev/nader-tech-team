<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'auth'
})

const config = useRuntimeConfig()
const loading = ref(false)

// --- i18n ---
const { t, localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

const form = ref({
  password: '',
  password_confirmation: ''
})

// خطاهای زیر اینپوت‌ها
const errors = ref({
  password: '',
  password_confirmation: ''
})

// توست
const toast = ref({ message: '', type: '' })
const showToast = (message, type = 'error') => {
  toast.value = { message, type }
  setTimeout(() => { toast.value = { message: '', type: '' } }, 4000)
}

const resetPassword = async () => {
  // پاکسازی خطاهای قبلی
  errors.value = { password: '', password_confirmation: '' }

  const login = localStorage.getItem('reset_login')
  const resetToken = localStorage.getItem('reset_token')

  if (!login || !resetToken) {
    navigateTo(localePath('/auth/forgot-password'))
    return
  }

  // اعتبارسنجی سمت کلاینت
  if (!form.value.password) {
    errors.value.password = t('auth.resetPassword.validation.passwordRequired')
  } else if (form.value.password.length < 8) {
    errors.value.password = t('auth.resetPassword.validation.passwordMinLength')
  }

  if (!form.value.password_confirmation) {
    errors.value.password_confirmation = t('auth.resetPassword.validation.confirmRequired')
  } else if (form.value.password !== form.value.password_confirmation) {
    errors.value.password_confirmation = t('auth.resetPassword.validation.mismatch')
  }

  // اگر خطایی وجود دارد، متوقف شو
  if (errors.value.password || errors.value.password_confirmation) return

  loading.value = true

  try {
    const response = await $fetch('/auth/reset-password', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: {
        login,
        reset_token: resetToken,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation
      }
    })

    localStorage.removeItem('reset_login')
    localStorage.removeItem('reset_token')

    showToast(response.message || t('auth.resetPassword.successDefault'), 'success')
    navigateTo(localePath('/auth/login'))

  } catch (error) {
    const serverMessage = error?.response?._data?.message
    const serverErrors = error?.response?._data?.errors

    if (serverErrors?.password) {
      errors.value.password = serverErrors.password[0] ?? serverErrors.password
    } else if (serverErrors?.password_confirmation) {
      errors.value.password_confirmation = serverErrors.password_confirmation[0] ?? serverErrors.password_confirmation
    } else {
      showToast(serverMessage || t('auth.resetPassword.errorDefault'))
    }
  } finally {
    loading.value = false
  }
};

  // تنظیم تایتل در سربرگ مرورگر
useHead({
  title: computed(() => t('auth.resetPassword.pageTitle'))
});
</script>

<template>
  <div class="text-center font-roboto" :dir="isRtl ? 'rtl' : 'ltr'">

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

    <h1 class="text-xl font-bold text-[#1a2333] dark:text-dark-text-deep mb-8 font-roboto">
      {{ $t('auth.resetPassword.title') }}
    </h1>

    <form @submit.prevent="resetPassword">

      <!-- اینپوت رمز عبور -->
      <div class="mb-4">
        <AuthInput
          v-model="form.password"
          type="password"
          :label="$t('auth.resetPassword.fields.newPassword')"
          class="[&>div>input]:h-[44px] [&>div>input]:py-4 font-roboto"
          @input="errors.password = ''"
        />
        <p
          v-if="errors.password"
          :class="['text-red-500 dark:text-red-400 text-[12px] mt-1 px-1 font-roboto', isRtl ? 'text-right' : 'text-left']"
        >
          {{ errors.password }}
        </p>
      </div>

      <!-- اینپوت تکرار رمز عبور -->
      <div class="mb-4">
        <AuthInput
          v-model="form.password_confirmation"
          type="password"
          :label="$t('auth.resetPassword.fields.confirmPassword')"
          class="[&>div>input]:h-[44px] [&>div>input]:py-4 font-roboto"
          @input="errors.password_confirmation = ''"
        />
        <p
          v-if="errors.password_confirmation"
          :class="['text-red-500 dark:text-red-400 text-[12px] mt-1 px-1 font-roboto', isRtl ? 'text-right' : 'text-left']"
        >
          {{ errors.password_confirmation }}
        </p>
      </div>

      <div class="mt-8">
        <AuthButton
          type="submit"
          :disabled="loading"
          class="font-roboto"
        >
          {{ loading ? $t('auth.resetPassword.saving') : $t('auth.resetPassword.save') }}
        </AuthButton>
      </div>

    </form>

  </div>
</template>