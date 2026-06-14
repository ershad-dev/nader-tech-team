<script setup>
/**
 * کامپوننت لاگین : مدیریت احراز هویت کاربران
 * شامل دو حالت ورود: رمز عبور و کد یک‌بار مصرف
 */
import { ref } from 'vue'

definePageMeta({ layout: 'auth' })

const config = useRuntimeConfig()

// State: مدیریت وضعیت‌های رابط کاربری
const activeTab = ref('password') // تعیین تب فعال (رمز عبور یا OTP)
const loading = ref(false)         // مدیریت وضعیت لودینگ دکمه
const errors = ref({})             // ذخیره‌سازی خطاهای اعتبارسنجی
const toast = ref({ message: '', type: '' }) // مدیریت پیام‌های هشدار

// مدل فرم ورود
const form = ref({
  login: '',
  password: ''
});

/**
 * نمایش پیام‌های Toast به کاربر
 * @param {string} message - متن پیام
 * @param {string} type - نوع پیام (success یا error)
 */
const showToast = (message, type = 'error') => {
  toast.value = { message, type };
  setTimeout(() => { toast.value = { message: '', type: '' }; }, 4000);
};

/**
 * عملیات لاگین: اعتبارسنجی ورودی‌ها و ارسال درخواست به سرور
 */
const loginUser = async () => {
  errors.value = {};
  const loginValue = String(form.value.login || '').trim();

  // اعتبارسنجی پایه
  if (loginValue.length !== 11) {
    showToast("لطفاً شماره موبایل را دقیقاً ۱۱ رقم وارد کنید");
    return;
  }
  
  if (activeTab.value === 'password' && (!form.value.password || form.value.password.length < 6)) {
    showToast("رمز عبور باید حداقل ۶ کاراکتر باشد");
    return;
  }

  loading.value = true;

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
      localStorage.setItem('access_token', response.data.login_token);
      await navigateTo('/auth/verify'); 
    } else {
      showToast("نام کاربری یا رمز عبور اشتباه است");
    }
  } catch (err) {
    console.error("Auth Error:", err);
    showToast("خطایی در ارتباط با سرور رخ داد");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="text-center" dir="rtl">
    <div 
      v-if="toast.message" 
      :class="['fixed top-5 left-5 p-4 rounded text-white z-50 transition-opacity', toast.type === 'success' ? 'bg-green-500' : 'bg-red-500']"
    >
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
      <AuthInput v-model="form.login" label="شماره تلفن همراه" type="text" />
      <AuthInput 
        v-if="activeTab === 'password'" 
        v-model="form.password" 
        label="رمز عبور" 
        type="password" 
      />
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