<script setup>
definePageMeta({ layout: 'auth' })
</script>

<template>
  <div class="text-center">
    <h1 class="text-xl font-bold text-[#1a2333] mb-10">کد تأیید را وارد کنید</h1>

    <div class="flex justify-center gap-2 mb-6">
      <input 
        v-for="i in 6" :key="i"
        type="text" maxlength="1" 
        class="w-12 h-16 bg-[#cedce0] rounded-xl text-center text-2xl font-bold text-[#1a2333] focus:outline-none focus:ring-2 focus:ring-[#2d6a66]"
      />
    </div>

    <button class="block mx-auto text-sm text-[#1a2333] mb-4 hover:underline">
      ارسال مجدد کد تأیید
    </button>

    <div class="w-32 mx-auto bg-[#cedce0] rounded-full py-1 text-sm text-[#1a2333] font-medium mb-10">
      1:58
    </div>
    
    <AuthButton>تایید کد</AuthButton>

    <div class="mt-6 text-sm text-[#1a2333] font-medium cursor-pointer">
      <NuxtLink to="/auth/login">بازگشت به صفحه ورود</NuxtLink>
    </div>
  </div>
</template>