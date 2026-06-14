<script setup>
definePageMeta({ layout: 'auth' })

// تابعی که بعد از تایید کد اجرا می‌شود
const handleLogin = () => {
  // اینجا منطقِ چک کردن کد را قرار بده (مثلاً یک API کال)
  // اگر کد درست بود:
  navigateTo('/auth/reset-password') // این همان آدرسِ صفحه‌ی جدید است
}
</script>

<template>
  <div class="text-center" dir="rtl">
    <h1 class="text-xl font-bold text-[#1a2333] mb-8">بازیابی رمز عبور</h1>
    
    <AuthInput label="شماره تلفن یا ایمیل" hint="شماره موبایل یا ایمیل" />
    <AuthInput label="وارد کردن کد" hint="وارد کردن کد" />
    
    <div class="mt-4">
      <AuthButton @click="handleLogin">تایید کد و ادامه</AuthButton>
    </div>
    
    <div class="mt-6 text-sm text-[#1a2333] font-medium cursor-pointer underline">
      <NuxtLink to="/auth/register">ثبت‌نام / حساب کاربری ندارم</NuxtLink>
    </div>
  </div>
</template>