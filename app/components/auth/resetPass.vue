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

// تعریف آبجکت خطاها
const errors = ref({
  password: '',
  password_confirmation: ''
})

const resetPassword = async () => {
  // پاکسازی خطاهای قبلی
  errors.value = { password: '', password_confirmation: '' }

  const login = localStorage.getItem('reset_login')
  const resetToken = localStorage.getItem('reset_token')

  if (!login || !resetToken) {
    navigateTo('/auth/forgot-password')
    return
  }

  // اعتبارسنجی سمت کلاینت
  if (!form.value.password) {
    errors.value.password = 'رمز عبور را وارد کنید'
  } else if (form.value.password.length < 8) {
    errors.value.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد'
  }

  if (!form.value.password_confirmation) {
    errors.value.password_confirmation = 'تکرار رمز عبور را وارد کنید'
  } else if (form.value.password !== form.value.password_confirmation) {
    errors.value.password_confirmation = 'تکرار رمز عبور مطابقت ندارد'
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

    alert(response.message || 'رمز عبور با موفقیت تغییر کرد')
    navigateTo('/auth/login')

  } catch (error) {
    // نمایش خطای سرور برای رمز عبور
    errors.value.password = error?.response?._data?.message || 'خطا در تغییر رمز عبور'
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

    <form @submit.prevent="resetPassword">

      <!-- اینپوت رمز عبور -->
      <div class="mb-4">
        <AuthInput
          v-model="form.password"
          type="password"
          label="رمز عبور جدید"
          class="[&>div>input]:h-[44px] [&>div>input]:py-4"
          @input="errors.password = ''"
        />
        <p
          v-if="errors.password"
          class="text-red-500 text-[12px] text-right mt-1 px-1"
        >
          {{ errors.password }}
        </p>
      </div>

      <!-- اینپوت تکرار رمز عبور -->
      <div class="mb-4">
        <AuthInput
          v-model="form.password_confirmation"
          type="password"
          label="تکرار رمز عبور جدید"
          class="[&>div>input]:h-[44px] [&>div>input]:py-4"
          @input="errors.password_confirmation = ''"
        />
        <p
          v-if="errors.password_confirmation"
          class="text-red-500 text-[12px] text-right mt-1 px-1"
        >
          {{ errors.password_confirmation }}
        </p>
      </div>

      <div class="mt-8">
        <AuthButton
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'در حال ذخیره...' : 'ذخیره رمز عبور' }}
        </AuthButton>
      </div>

    </form>

  </div>
</template>