<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'auth'
})

const config = useRuntimeConfig()

const loading = ref(false)

const form = ref({
  login: ''
})

const toast = ref({
  message: '',
  type: ''
})

const showToast = (
  message,
  type = 'error'
) => {
  toast.value = {
    message,
    type
  }

  setTimeout(() => {
    toast.value = {
      message: '',
      type: ''
    }
  }, 4000)
}

const sendResetCode = async () => {
  if (!form.value.login.trim()) {
    showToast(
      'شماره موبایل یا ایمیل را وارد کنید'
    )
    return
  }

  loading.value = true

  try {
    const response = await $fetch(
      '/auth/forgot-password',
      {
        baseURL: config.public.apiBase,
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: {
          login: form.value.login.trim()
        }
      }
    )

    localStorage.setItem(
      'reset_login',
      form.value.login.trim()
    )

    showToast(
      response.message ||
      'کد بازیابی ارسال شد',
      'success'
    )

    setTimeout(() => {
      navigateTo(
        '/auth/verify-forgot-password-code'
      )
    }, 1000)

  } catch (error) {
    console.error(
      'FORGOT PASSWORD ERROR:',
      error
    )

    showToast(
      error?.data?.message ||
      error?.response?._data?.message ||
      'خطا در ارسال کد بازیابی'
    )
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="text-center" dir="rtl">

    <div
      v-if="toast.message"
      :class="[
        'fixed top-5 left-5 p-4 rounded text-white z-50',
        toast.type === 'success'
          ? 'bg-green-500'
          : 'bg-red-500'
      ]"
    >
      {{ toast.message }}
    </div>

    <h1 class="text-xl font-bold text-[#1a2333] mb-8">
      بازیابی رمز عبور
    </h1>

    <AuthInput
      v-model="form.login"
      label="شماره تلفن یا ایمیل"
      hint="شماره موبایل یا ایمیل"
    />

    <div class="mt-4">
      <AuthButton
        @click="sendResetCode"
        :disabled="loading"
      >
        {{
          loading
            ? 'در حال ارسال...'
            : 'ارسال کد بازیابی'
        }}
      </AuthButton>
    </div>

    <div
      class="mt-6 text-sm text-[#1a2333] font-medium cursor-pointer underline"
    >
      <NuxtLink to="/auth/login">
        بازگشت به ورود
      </NuxtLink>
    </div>

  </div>
</template>