<!-- components/auth/LoginForm.vue -->
<template>
  <div class="w-full max-w-md p-8 space-y-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl">
    <!-- تیتر فرم -->
    <div class="text-center">
      <h2 class="text-2xl font-bold text-slate-100">ورود به حساب کاربری</h2>
      <p class="mt-2 text-sm text-slate-400">خوش آمدید! لطفاً اطلاعات خود را وارد کنید.</p>
    </div>

    <!-- فرم لاگین -->
    <form @submit.prevent="handleLogin" class="space-y-4">
      <!-- فیلد شماره تلفن -->
      <div>
        <label for="phone" class="block text-sm font-medium text-slate-300 mb-1.5">شماره تلفن</label>
        <div class="relative">
          <input
            id="phone"
            v-model="phone"
            type="tel"
            dir="ltr"
            placeholder="09123456789"
            class="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-left"
            required
          />
        </div>
      </div>

      <!-- فیلد رمز عبور -->
      <div>
        <label for="password" class="block text-sm font-medium text-slate-300 mb-1.5">رمز عبور</label>
        <div class="relative">
          <input
            id="password"
            v-model="password"
            type="password"
            dir="ltr"
            placeholder="••••••••"
            class="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-left"
            required
          />
        </div>
      </div>

      <!-- گزینه‌های اضافی (فراموشی رمز عبور) -->
      <div class="flex items-center justify-end text-sm">
        <NuxtLink to="/auth/forgot-password" class="font-medium text-emerald-500 hover:text-emerald-400 transition-colors">
          رمز عبور را فراموش کرده‌اید؟
        </NuxtLink>
      </div>

      <!-- دکمه سابمیت -->
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-slate-950 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-emerald-500 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isLoading" class="flex items-center gap-2">
          <!-- اسپینر لودینگ لینوکسی/تیلوندی -->
          <svg class="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          در حال بررسی...
        </span>
        <span v-else>ورود به پنل</span>
      </button>
    </form>

    <!-- لینک ثبت‌نام -->
    <div class="text-center text-sm text-slate-400">
      حساب کاربری ندارید؟
      <NuxtLink to="/auth/register" class="font-medium text-emerald-500 hover:text-emerald-400 transition-colors">
        ثبت‌نام کنید
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

// ابتدا تمام ری‌اکتیو پراپرتی‌ها را پشت سر هم تعریف می‌کنیم
const authStore = useAuthStore()
const phone = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  if (!phone.value || !password.value) {
    alert('لطفاً اطلاعات فرم را به طور کامل وارد کنید.')
    return
  }

  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = { name: 'ارشاد خادمی', phone: phone.value }
    const mockToken = 'secret-jwt-token-from-laravel'

    authStore.loginUser(mockUser, mockToken)
    navigateTo('/profile')
    
  } catch (error) {
    console.error('خطا در فرآیند لاگین:', error)
    alert('ورود ناموفق بود. دوباره تلاش کنید.')
  } finally {
    isLoading.value = false
  }
}


</script>