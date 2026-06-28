<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'auth' })

// وضعیت‌های ساده
const toast = ref({ message: '', type: '' })

const showToast = (message) => {
  toast.value = { message, type: 'error' }
  setTimeout(() => { toast.value = { message: '', type: '' } }, 4000)
}
</script>

<template>
  <div class="h[600px] w-full flex items-center justify-center p-4" dir="rtl">
    
    <div >
      <h1 class="text-center font-bold font-roboto text-lg mb-10 text-[#1a2333] ">اطلاعات خود را وارد کنید</h1>

      <div class="space-y-4 text-right w-[400px] ">
        <AuthInput label="شماره تلفن همراه یا ایمیل" type="text" class="[&>div>input]:h-[44px] [&>div>input]:py-4 font-roboto" />
        <AuthInput label="رمز عبور" type="password" class="[&>div>input]:h-[44px] [&>div>input]:py-4 font-roboto" />
        
        <AuthButton class="w-full mt-8 !bg-[#2d6a66]">
          ورود
        </AuthButton>
      </div>

    </div>

    <div 
      v-if="toast.message" 
      class="fixed top-5 left-5 p-4 rounded bg-red-500 text-white z-50"
    >
      {{ toast.message }}
    </div>
  </div>
</template>