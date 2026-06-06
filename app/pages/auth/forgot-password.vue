<script setup>
definePageMeta({ layout: 'auth' })

// تابعی برای هدایت به صفحه کد تایید
const handleLogin = () => {
  // اینجا منطق ارسال کد به سرور قرار می‌گیرد
  navigateTo('/auth/verify') 
}
</script>

<template>
  <div class="text-center">
    <h1 class="text-xl font-bold text-[#1a2333] mb-8">بازیابی رمز عبور</h1>

    <AuthInput 
      label="فراموشی رمز عبور" 
      hint="شماره موبایل یا ایمیل" 
    />

    <AuthInput 
      hint="وارد کردن کد" 
    />
    
    <div class="mt-4">
      <AuthButton @click="handleLogin">ورود</AuthButton>
    </div>
    
    <div class="mt-6 text-sm text-[#1a2333] font-medium cursor-pointer underline">
      <NuxtLink to="/auth/register">ثبت‌نام / حساب کاربری ندارم</NuxtLink>
    </div>
  </div>
</template>