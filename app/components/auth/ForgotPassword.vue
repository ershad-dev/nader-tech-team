<template>
  <div class="w-full max-w-md p-6 bg-slate-900 border border-slate-800 rounded-xl text-white">
    
    <div v-if="step === 'request'">
      <h2 class="text-xl font-bold mb-2 text-center">بازیابی رمز عبور</h2>
      <p class="text-sm text-slate-400 text-center mb-6">
        شماره موبایل خود را وارد کنید تا کد بازیابی برای شما ارسال شود.
      </p>

      <form @submit.prevent="handleRequestOtp">
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1 text-slate-400">شماره موبایل</label>
          <input 
            v-model="phone" 
            type="tel" 
            placeholder="09123456789"
            class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 transition text-left dir-ltr"
          />
          <p v-if="error" class="text-xs text-red-500 mt-1">{{ error }}</p>
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800 text-slate-950 font-bold rounded-lg transition"
        >
          <span v-if="isLoading">در حال ارسال کد...</span>
          <span v-else>ارسال کد بازیابی</span>
        </button>

        <div class="mt-6 text-center text-sm">
          <NuxtLink to="/auth/login" class="text-slate-400 hover:text-white transition">
            بازگشت به صفحه ورود
          </NuxtLink>
        </div>
      </form>
    </div>

    <div v-else-if="step === 'otp'">
      <AuthOtpVerify 
        :phone="phone" 
        @back="step = 'request'" 
        @success="step = 'reset'" 
      />
    </div>

    <div v-else-if="step === 'reset'">
      <h2 class="text-xl font-bold mb-2 text-center">تعیین رمز عبور جدید</h2>
      <p class="text-sm text-slate-400 text-center mb-6">رمز عبور جدید خود را وارد کنید.</p>

      <form @submit.prevent="handleResetPassword">
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1 text-slate-400">رمز عبور جدید</label>
          <input 
            v-model="newPassword" 
            type="password" 
            placeholder="••••••••"
            class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 transition text-left dir-ltr"
          />
          <p v-if="passwordError" class="text-xs text-red-500 mt-1">{{ passwordError }}</p>
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800 text-slate-950 font-bold rounded-lg transition"
        >
          <span v-if="isLoading">در حال تغییر رمز...</span>
          <span v-else>ذخیره رمز عبور جدید</span>
        </button>
      </form>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// مراحل شامل: 'request' (درخواست) و 'otp' (تایید کد) و 'reset' (تغییر رمز)
const step = ref('request')
const phone = ref('')
const newPassword = ref('')
const isLoading = ref(false)
const error = ref('')
const passwordError = ref('')

// درخواست ارسال پیامک بازیابی
const handleRequestOtp = async () => {
  error.value = ''
  const phoneRegex = /^09\d{9}$/
  
  if (!phone.value) {
    error.value = 'وارد کردن شماره موبایل الزامی است.'
    return
  } else if (!phoneRegex.test(phone.value)) {
    error.value = 'فرمت شماره موبایل معتبر نیست.'
    return
  }

  isLoading.value = true
  try {
    console.log('درخواست پیامک فراموشی رمز برای:', phone.value)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // سوییچ به مرحله ورود کد تأیید
    step.value = 'otp'
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

// ثبت رمز عبور جدید
const handleResetPassword = async () => {
  passwordError.value = ''
  
  if (!newPassword.value) {
    passwordError.value = 'وارد کردن رمز عبور جدید الزامی است.'
    return
  } else if (newPassword.value.length < 6) {
    passwordError.value = 'رمز عبور جدید باید حداقل ۶ کاراکتر باشد.'
    return
  }

  isLoading.value = true
  try {
    console.log('ارسال رمز عبور جدید به لاراول کسری:', newPassword.value)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert('رمز عبور شما با موفقیت تغییر کرد!')
    // اینجا بعداً کاربر را با useRouter هدایت می‌کنیم به صفحه لاگین
    navigateTo('/auth/login')
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>