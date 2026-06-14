<script setup>
definePageMeta({ layout: 'auth' })

// تابعی برای نهایی کردن تغییر رمز
const handleConfirmPassword = () => {
  // منطق ارسال رمز عبور جدید به سرور
  console.log("Password updated successfully");
  // هدایت به صفحه اصلی یا لاگین
  navigateTo('/login') 
}
</script>

<template>
  <div class="text-center" dir="rtl">


    <h1 class="text-xl font-bold text-[#1a2333] mb-8">رمز عبور جدید خود را وارد کنید.</h1>
    
    <AuthInput 
      label="رمز عبور" 
      type="password"
      placeholder="••••••••"
    />

    <AuthInput 
      label="تکرار رمز عبور" 
      type="password"
      placeholder="••••••••"
    />
    
    <div class="mt-6">
      <AuthButton @click="handleConfirmPassword">تایید رمز</AuthButton>
    </div>
  </div>
</template>