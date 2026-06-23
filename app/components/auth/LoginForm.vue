<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'auth' })

const config = useRuntimeConfig()

const activeTab = ref('password')
const loading = ref(false)
const errors = ref({})
const toast = ref({ message: '', type: '' })

const form = ref({
  login: '',
  password: ''
})

const showToast = (message, type = 'error') => {
  toast.value = { message, type }

  setTimeout(() => {
    toast.value = { message: '', type: '' }
  }, 4000)
}

const loginUser = async () => {
  errors.value = {}

  const loginValue = String(form.value.login || '').trim()

  if (!loginValue) {
    showToast('ایمیل یا شماره موبایل را وارد کنید')
    return
  }

  loading.value = true

  try {
    // ورود با رمز عبور
    if (activeTab.value === 'password') {
      if (!form.value.password) {
        showToast('رمز عبور را وارد کنید')
        return
      }

      const response = await $fetch('/auth/login', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: {
          login: loginValue,
          password: form.value.password
        }
      })

      if (response?.data?.access_token) {
        localStorage.setItem(
          'access_token',
          response.data.access_token
        )

        showToast('ورود با موفقیت انجام شد', 'success')

        setTimeout(() => {
          navigateTo('/profile')
        }, 500)

        return
      }

      showToast('توکن دریافت نشد')
      return
    }

    // ورود با OTP
    if (activeTab.value === 'otp') {
      const isMobile = /^09\d{9}$/.test(loginValue)

      if (!isMobile) {
        showToast('برای ورود با کد تأیید شماره موبایل معتبر وارد کنید')
        return
      }

      const response = await $fetch('/auth/send-otp', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: {
          mobile: loginValue
        }
      })

      if (response?.data?.login_token) {
        localStorage.setItem(
          'login_token',
          response.data.login_token
        )

        showToast('کد تأیید ارسال شد', 'success')

        setTimeout(() => {
          navigateTo('/auth/verify')
        }, 500)

        return
      }

      showToast('توکن ورود دریافت نشد')
    }

  } catch (error) {
    console.log('LOGIN ERROR =>', error)

    showToast(
      error?.response?._data?.message ||
      error?.data?.message ||
      'خطا در ارتباط با سرور'
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
      :class="['fixed top-5 left-5 p-4 rounded text-white z-50 transition-opacity', toast.type === 'success' ? 'bg-green-500' : 'bg-red-500']"
    >
      {{ toast.message }}
    </div>

    <h1 class="text-lg font-bold text-[#0F184B] mb-[100px] font-roboto">خوش آمدید، وارد حساب کاربری خود شوید.</h1>

<div class="flex gap-6 mb-6 text-[16px] font-medium font-roboto">
  <button
    @click="activeTab = 'password'"
    :class="[
      'text-[#0F184B]',
      activeTab === 'password' ? 'border-b-2 border-[#1a2333]' : ''
    ]"
  >
    ورود با رمز عبور
  </button>

  <button
    @click="activeTab = 'otp'"
    :class="[
      'text-[#0F184B]',
      activeTab === 'otp' ? 'border-b-2 border-[#1a2333]' : ''
    ]"
  >
    ورود با کد یک‌بار مصرف
  </button>
</div>  

    <div class="text-right font-roboto [&>div>input]:h-[44px] [&>div>input]:py-4">
        <AuthInput
          v-model="form.login"
          label="شماره تلفن همراه یا ایمیل"
          type="text"
          class="[&>div>input]:h-[44px] [&>div>input]:py-4"
        />

          <AuthInput 
            v-if="activeTab === 'password'" 
            v-model="form.password" 
            label="رمز عبور" 
            type="password" 
          class="[&>div>input]:h-[44px] [&>div>input]:py-4"

          />
    </div>
    
    <div class="text-right mb-[70px]">
      <NuxtLink to="/auth/forgot-password" class="text-sm font-bold text-[#1a2333] underline decoration-2 underline-offset-4 font-roboto">
        فراموشی رمز
      </NuxtLink>
    </div>
    
    <AuthButton @click="loginUser" :disabled="loading" class="mb-[25px] text-[22px]">
      {{ loading ? 'در حال انتقال...' : 'ورود به حساب کاربری' }}
    </AuthButton>
    
    <div class="mt-6 text-[16px] text-[#0F184B] font-bold cursor-pointer font-roboto ">
      <NuxtLink to="/auth/register">ثبت‌نام / حساب کاربری ندارم</NuxtLink>
    </div>
  </div>
</template>