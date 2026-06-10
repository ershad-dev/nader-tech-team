<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'auth' })

const config = useRuntimeConfig()
const activeTab = ref('password')
const loading = ref(false) // ۱. متغیر جدید برای وضعیت لودینگ

const form = ref({
  login: '',
  password: ''
});

const errors = ref({});
const toast = ref({ message: '', type: '' });

const showToast = (message, type = 'error') => {
  toast.value = { message, type };
  setTimeout(() => { toast.value = { message: '', type: '' }; }, 4000);
};

const loginUser = async () => {
  errors.value = {};

  const loginValue = String(form.value.login || '').trim();

  if (loginValue.length !== 11) {
    showToast("لطفاً شماره موبایل را دقیقاً ۱۱ رقم وارد کنید");
    return;
  }
  
  if (!form.value.password || form.value.password.length < 6) {
    showToast("رمز عبور باید حداقل ۶ کاراکتر باشد");
    return;
  }

  loading.value = true; // ۲. شروع لودینگ

  try {
    const response = await $fetch('/api/auth/login', {
      baseURL: config.public.apiBase, 
      method: 'POST',
      body: { 
        login: form.value.login,
        password: form.value.password
      },
      headers: { 'Accept': 'application/json' }
    });

    if (response?.data?.login_token) {
// اصلاح در login.vue
localStorage.setItem('access_token', response.data.login_token);
      await navigateTo('/auth/verify'); 
    } else {
      showToast("نام کاربری یا رمز عبور اشتباه است");
    }
  } catch (err) {
    console.error("خطا:", err);
    showToast("خطایی در ارتباط با سرور رخ داد");
  } finally {
    loading.value = false; // ۳. پایان لودینگ (چه موفق چه خطا)
  }
};
</script>

<template>
  <div class="text-center" dir="rtl">
    <div v-if="toast.message" :class="['fixed top-5 left-5 p-4 rounded text-white z-50', toast.type === 'success' ? 'bg-green-500' : 'bg-red-500']">
      {{ toast.message }}
    </div>

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
      <AuthInput v-model="form.login" label="شماره تلفن همراه یا ایمیل" type="text" />
      <AuthInput v-if="activeTab === 'password'" v-model="form.password" label="رمز عبور" type="password" />
    </div>
    
    <div class="text-right mb-8">
      <NuxtLink to="/auth/forgot-password" class="text-sm font-bold text-[#1a2333] underline decoration-2 underline-offset-4">
        فراموشی رمز
      </NuxtLink>
    </div>
    
    <AuthButton @click="loginUser" :disabled="loading">
      {{ loading ? 'در حال انتقال...' : 'ورود به حساب کاربری' }}
    </AuthButton>
    
    <div class="mt-6 text-sm text-[#1a2333] font-medium cursor-pointer">
      <NuxtLink to="/auth/register">ثبت‌نام / حساب کاربری ندارم</NuxtLink>
    </div>
  </div>
</template>