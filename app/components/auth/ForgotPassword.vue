<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'auth'
})

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
  // پاک کردن خطاهای قبلی قبل از شروع عملیات
  errors.value.login = ''

  // اعتبارسنجی اولیه
  if (!form.value.login.trim()) {
    errors.value.login = 'شماره موبایل  را وارد کنید'
    return
  }

  loading.value = true

  try {
    const response = await $fetch('/auth/forgot-password', {
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
    await navigateTo('/auth/verify-forgot-password-code')

  } catch (error) {
    console.error('FORGOT PASSWORD ERROR:', error)
    
    // دریافت پیام خطا از سرور و نمایش در زیر اینپوت
    errors.value.login = error?.data?.message || 
                         error?.response?._data?.message || 
                         'خطا در ارتباط با سرور'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="text-center" dir="rtl">

    <h1 class="text-xl font-bold text-[#0F184B] mb-8 font-roboto">
      خوش آمدید، وارد حساب کاربری خود شوید.
    </h1>

    <h3 class="w-[130px] font-roboto text-right mb-4 text-[#0F184B] text-[16px] border-b border-[#0F184B]">
      فراموشی رمز عبور
    </h3>

    <!-- بخش اینپوت -->
    <div class="mb-6">
      <AuthInput
        v-model="form.login"
        label="شماره تلفن"
        hint="شماره موبایل"
        class="[&>div>input]:h-[44px] [&>div>input]:py-4 font-roboto"
        @input="errors.login = ''" 
      />
      <!-- نمایش خطا زیر اینپوت -->
      <div v-if="errors.login" class="text-red-500 text-[12px] text-right mt-1 px-1">
        {{ errors.login }}
      </div>
    </div>

    <div class="mt-16 text-[18px] font-roboto">
      <AuthButton
        @click="sendResetCode"
        :disabled="loading"
      >
        {{ loading ? 'در حال ارسال...' : 'ارسال کد بازیابی' }}
      </AuthButton>
    </div>

    <div class="mt-6 text-sm text-[#1a2333] font-medium cursor-pointer underline font-roboto">
      <NuxtLink to="/auth/login">
        بازگشت به ورود
      </NuxtLink>
    </div>

  </div>
</template>