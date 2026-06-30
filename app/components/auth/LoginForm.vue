<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'auth' })

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
  // حذف هر چیزی غیر از رقم
  const digitsOnly = e.target.value.replace(/\D/g, '')
  // حداکثر ۱۱ رقم
  form.value.login = digitsOnly.slice(0, 11)
  // sync کردن مقدار input با مقدار فیلتر شده
  e.target.value = form.value.login
}

// ---- هندلر پسورد: جلوگیری از تایپ فارسی ----
const handlePasswordInput = (e) => {
  // حذف کاراکترهای فارسی/عربی (یونیکد U+0600 تا U+06FF)
  const filtered = e.target.value.replace(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, '')
  form.value.password = filtered
  e.target.value = filtered
}

const handlePasswordKeydown = (e) => {
  // بلاک کردن کلیدهای فارسی در لحظه فشردن
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
    errors.value.login = 'شماره موبایل را وارد کنید'
  } else if (!/^\d+$/.test(loginValue)) {
    errors.value.login = 'شماره موبایل باید فقط شامل عدد باشد'
  } else if (loginValue.length !== 11) {
    errors.value.login = 'شماره موبایل باید دقیقاً ۱۱ رقم باشد'
  } else if (!loginValue.startsWith('09')) {
    errors.value.login = 'شماره موبایل باید با ۰۹ شروع شود'
  }

  // ۳. اعتبارسنجی رمز عبور
  if (activeTab.value === 'password' && !form.value.password) {
    errors.value.password = 'رمز عبور را وارد کنید'
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
        showToast('ورود با موفقیت انجام شد', 'success')
        setTimeout(() => navigateTo('/profile'), 500)
      }
    }
    else if (activeTab.value === 'otp') {
      // در حالت OTP شماره موبایل قبلاً اعتبارسنجی شده
      const response = await $fetch('/auth/send-otp', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: { mobile: loginValue }
      })

      if (response?.data?.login_token) {
        localStorage.setItem('login_token', response.data.login_token)
        showToast('کد تأیید ارسال شد', 'success')
        setTimeout(() => navigateTo('/auth/verify'), 500)
      }
    }
  } catch (error) {
    // ۴. مدیریت خطاهای دریافتی از سرور
    const serverErrors = error?.response?._data?.errors
    if (serverErrors) {
      errors.value = { ...errors.value, ...serverErrors }
    } else {
      showToast(error?.response?._data?.message || 'خطا در ارتباط با سرور')
    }
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
        'fixed top-5 left-5 p-4 rounded text-white z-50 transition-opacity',
        toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
      ]"
    >
      {{ toast.message }}
    </div>

    <h1 class="text-lg font-bold text-[#0F184B] mb-[100px] font-roboto">
      خوش آمدید، وارد حساب کاربری خود شوید.
    </h1>

    <div class="flex gap-6 mb-6 text-[16px] font-medium font-roboto">
      <button
        type="button"
        @click="activeTab = 'password'"
        :class="[
          'text-[#0F184B]',
          activeTab === 'password' ? 'border-b-2 border-[#1a2333]' : ''
        ]"
      >
        ورود با رمز عبور
      </button>

      <button
        type="button"
        @click="activeTab = 'otp'"
        :class="[
          'text-[#0F184B]',
          activeTab === 'otp' ? 'border-b-2 border-[#1a2333]' : ''
        ]"
      >
        ورود با کد یک‌بار مصرف
      </button>
    </div>

    <form @submit.prevent="loginUser">
      <div class="text-right font-roboto">
        <div class="mb-4">
          <AuthInput
            v-model="form.login"
            label="شماره تلفن همراه"
            type="text"
            inputmode="numeric"
            pattern="\d*"
            maxlength="11"
            class="[&>div>input]:h-[44px] [&>div>input]:py-4"
            :class="{ '[&>div>input]:border-red-500 [&>div>input]:ring-red-300': errors.login }"
            @input="handleLoginInput"
          />

          <p
            v-if="errors.login"
            class="text-red-500 text-xs mt-1 pr-1"
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
            label="رمز عبور"
            type="password"
            class="[&>div>input]:h-[44px] [&>div>input]:py-4"
            :class="{ '[&>div>input]:border-red-500 [&>div>input]:ring-red-300': errors.password }"
            @input="handlePasswordInput"
            @keydown="handlePasswordKeydown"
          />

          <p
            v-if="errors.password"
            class="text-red-500 text-xs mt-1 pr-1"
          >
            {{ errors.password }}
          </p>
        </div>
      </div>

      <div class="text-right mb-[70px]">
        <NuxtLink
          to="/auth/forgot-password"
          class="text-sm font-bold text-[#1a2333] underline decoration-2 underline-offset-4 font-roboto"
        >
          فراموشی رمز
        </NuxtLink>
      </div>

<AuthButton
  type="submit"
  :disabled="loading"
  class="mb-[25px] text-[22px]"
>
  {{ loading ? 'در حال انتقال...' : 'ورود به حساب کاربری' }}
</AuthButton>
    </form>

    <div class="mt-6 text-[16px] text-[#0F184B] font-bold cursor-pointer font-roboto">
      <NuxtLink to="/auth/register">
        ثبت‌نام / حساب کاربری ندارم
      </NuxtLink>
    </div>
  </div>
</template>