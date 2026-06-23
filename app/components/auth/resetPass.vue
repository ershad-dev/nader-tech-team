<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'auth'
})

const config = useRuntimeConfig()

const loading = ref(false)

const form = ref({
  password: '',
  password_confirmation: ''
})

const resetPassword = async () => {
  const login =
    localStorage.getItem('reset_login')

  const resetToken =
    localStorage.getItem('reset_token')

  if (!login || !resetToken) {
    navigateTo('/auth/forgot-password')
    return
  }

  if (!form.value.password) {
    alert('رمز عبور را وارد کنید')
    return
  }

  if (form.value.password.length < 8) {
    alert('رمز عبور باید حداقل ۸ کاراکتر باشد')
    return
  }

  if (
    form.value.password !==
    form.value.password_confirmation
  ) {
    alert('تکرار رمز عبور مطابقت ندارد')
    return
  }

  loading.value = true

  try {
    const response = await $fetch(
      '/auth/reset-password',
      {
        baseURL: config.public.apiBase,
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: {
          login,
          reset_token: resetToken,
          password: form.value.password,
          password_confirmation:
            form.value.password_confirmation
        }
      }
    )

    localStorage.removeItem('reset_login')
    localStorage.removeItem('reset_token')

    form.value = {
      password: '',
      password_confirmation: ''
    }

    alert(
      response.message ||
      'رمز عبور با موفقیت تغییر کرد'
    )

    navigateTo('/auth/login')

  } catch (error) {
    alert(
      error?.response?._data?.message ||
      'خطا در تغییر رمز عبور'
    )
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="text-center" dir="rtl">

    <h1 class="text-xl font-bold text-[#1a2333] mb-8">
      تعیین رمز عبور جدید
    </h1>

    <AuthInput
      v-model="form.password"
      type="password"
      label="رمز عبور جدید"
      class="[&>div>input]:h-[44px] [&>div>input]:py-4"

    />

    <AuthInput
      v-model="form.password_confirmation"
      type="password"
      label="تکرار رمز عبور جدید"
      class="[&>div>input]:h-[44px] [&>div>input]:py-4"

    />

    <div class="mt-4">
      <AuthButton
        @click="resetPassword"
        :disabled="loading"
      >
        ذخیره رمز عبور
      </AuthButton>
    </div>

  </div>
</template>