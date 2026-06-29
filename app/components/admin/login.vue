<script setup>
import { ref } from 'vue'
const router = useRouter()

// اطلاعات فرضی (Mock)
const MOCK_USER = {
  identifier: 'admin@test.com',
  password: '123'
}

const identifier = ref('')
const password = ref('')
const toast = ref({ message: '', type: '' })

const handleLogin = () => {
  if (identifier.value === MOCK_USER.identifier && password.value === MOCK_USER.password) {
    // ذخیره در localStorage
    localStorage.setItem('isAdminLoggedIn', 'true')
    router.push('/admin') // هدایت به پنل
  } else {
    toast.value = { message: 'ایمیل یا رمز عبور اشتباه است', type: 'error' }
    setTimeout(() => { toast.value = { message: '', type: '' } }, 4000)
  }
}
</script>

<template>
  <div class="h-[600px] w-full flex items-center justify-center p-4" dir="rtl">
    <div>
      <h1 class="text-center font-bold text-lg mb-10 text-[#1a2333] font-roboto"> اطلاعات خود را وارد کنید</h1>

      <div class="space-y-4 text-right w-[400px]">
        <AuthInput v-model="identifier" label="شماره تلفن و ایمیل " type="text"  class="[&>div>input]:h-[44px] [&>div>input]:py-4 font-roboto"/>
        <AuthInput v-model="password" label="رمز عبور" type="password"  class="[&>div>input]:h-[44px] [&>div>input]:py-4 font-roboto"/>
        
        <AuthButton @click="handleLogin" class="w-full mt-8 !bg-[#2d6a66]">
          ورود
        </AuthButton>
      </div>
    </div>
    
    <div v-if="toast.message" class="fixed top-5 left-5 p-4 rounded bg-red-500 text-white z-50">
      {{ toast.message }}
    </div>
  </div>
</template>