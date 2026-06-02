<template>
  <div class="w-full max-w-md p-8 space-y-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-slate-100">ثبت‌نام در نادر تک</h2>
    </div>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="block text-sm text-slate-300 mb-1">نام و نام خانوادگی</label>
        <input v-model="name" type="text" class="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200" required />
      </div>
      <div>
        <label class="block text-sm text-slate-300 mb-1">شماره تلفن</label>
        <input v-model="phone" type="tel" dir="ltr" class="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200" required />
      </div>
      <div>
        <label class="block text-sm text-slate-300 mb-1">رمز عبور</label>
        <input v-model="password" type="password" class="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200" required />
      </div>

      <button type="submit" :disabled="isLoading" class="w-full py-2.5 bg-emerald-500 rounded-xl font-bold text-slate-950 hover:bg-emerald-400">
        {{ isLoading ? 'در حال ثبت...' : 'ثبت‌نام و ورود' }}
      </button>
    </form>

    <div class="text-center text-sm text-slate-400">
      قبلاً ثبت‌نام کرده‌اید؟ 
      <NuxtLink to="/auth/login" class="text-emerald-500">وارد شوید</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const name = ref('')
const phone = ref('')
const password = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
  isLoading.value = true
  // شبیه‌سازی ثبت‌نام
  await new Promise(r => setTimeout(r, 1000))
  
  authStore.registerUser({ name: name.value, phone: phone.value }, 'new-token-123')
  navigateTo('/profile')
}
</script>