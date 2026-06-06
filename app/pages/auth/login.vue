<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'auth' })

const activeTab = ref('password')
</script>

<template>
  <div class="text-center">
    <h1 class="text-lg font-bold text-[#1a2333] mb-8">خوش آمدید، وارد حساب کاربری خود شوید.</h1>

    <div class="flex gap-6 mb-6 text-sm font-medium">
      <button 
        @click="activeTab = 'password'" 
        :class="activeTab === 'password' ? 'text-[#1a2333] border-b-2 border-[#1a2333]' : 'text-slate-400'"
      >
        ورود با رمز عبور
      </button>
      <button 
        @click="activeTab = 'otp'" 
        :class="activeTab === 'otp' ? 'text-[#1a2333] border-b-2 border-[#1a2333]' : 'text-slate-400'"
      >
        ورود با کد یک‌بار مصرف
      </button>
    </div>

    <div class="text-right">
      <AuthInput label="شماره تلفن همراه یا ایمیل" type="text" />
      <AuthInput v-if="activeTab === 'password'" label="رمز عبور" type="password" />
    </div>
    
    <div class="text-right mb-8">
      <NuxtLink 
        to="/auth/forgot-password" 
        class="text-sm font-bold text-[#1a2333] underline decoration-2 underline-offset-4"
      >
        فراموشی رمز
      </NuxtLink>
    </div>
    
    <AuthButton>ورود به حساب کاربری</AuthButton>
    
    <div class="mt-6 text-sm text-[#1a2333] font-medium cursor-pointer">
      <NuxtLink to="/auth/register">ثبت‌نام / حساب کاربری ندارم</NuxtLink>
    </div>
  </div>
</template>