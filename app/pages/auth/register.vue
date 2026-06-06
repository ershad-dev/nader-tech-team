<script setup>
definePageMeta({ layout: 'auth' })
</script>

<template>
  <div class="text-center">
    <h1 class="text-lg font-bold text-[#1a2333] mb-8">برای ثبت‌نام، شماره همراه خود را وارد کنید</h1>

    <div class="grid grid-cols-2 gap-x-4">
      <AuthInput label="نام کاربری" type="text" />
      <AuthInput label="نام و نام خانوادگی" type="text" />
      <AuthInput label="ایمیل" type="email" />
      <AuthInput label="شماره تماس" type="tel" />
      <AuthInput label="آدرس" type="text" />
      <AuthInput label="کد ملی" type="text" />
    </div>

    <AuthInput 
      label="رمز عبور" 
      type="password" 
      labelClass="text-[#1a2333] font-bold" 
    />
    <AuthInput 
      label="تکرار رمز عبور" 
      type="password" 
      labelClass="text-[#1a2333] font-bold" 
    />
    
    <div class="mt-4">
      <AuthButton>ثبت‌نام</AuthButton>
    </div>
    
    <div class="mt-6 text-sm text-[#1a2333] font-medium cursor-pointer">
      <NuxtLink to="/auth/login">ورود / حساب کاربری دارم</NuxtLink>
    </div>
  </div>
</template>