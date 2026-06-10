<script setup>
import { ref, onMounted, computed } from 'vue';

definePageMeta({ layout: 'auth' })

const config = useRuntimeConfig();
const otp = ref(['', '', '', '', '', '']); // آرایه ۶ تایی برای کدها
const token = ref('');
const timer = ref(120); // تایمر ۲ دقیقه‌ای
const inputRefs = ref([]);

onMounted(() => {
  // خواندن توکنی که در مرحله قبل ذخیره کردیم
  token.value = localStorage.getItem('login_token');
  startTimer();
});

// مدیریتِ تایمر
const startTimer = () => {
  const interval = setInterval(() => {
    if (timer.value > 0) timer.value--;
    else clearInterval(interval);
  }, 1000);
};

const formattedTimer = computed(() => {
  const m = Math.floor(timer.value / 60);
  const s = timer.value % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
});

// مدیریت فوکوس برای تجربه کاربری بهتر
const handleInput = (index) => {
  if (otp.value[index].length === 1 && index < 5) {
    inputRefs.value[index + 1].focus();
  }
};

const verifyCode = async () => {
  const code = otp.value.join('');

  // ۱. بررسیِ اینکه آیا کد کامل وارد شده یا نه
  if (code.length !== 6) {
    alert("لطفاً کد ۶ رقمی را کامل وارد کنید");
    return; // اجازه نمی‌دهد درخواست به سرور برود
  }
  
  // ۲. (اختیاری) اگر می‌خواهی فعلاً تست کنی کدِ فرضیِ "123456" درست است:
  /*
  if (code !== "123456") {
    alert("کد وارد شده اشتباه است (تست)");
    return;
  }
  */

  try {
    const response = await $fetch('/api/auth/verify', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: { token: token.value, code: code }
    });
    
    // حالا فقط در صورت دریافتِ توکنِ نهایی وارد شو
    if (response && response.token) {
        localStorage.setItem('access_token', response.token);
        navigateTo('/profile');
    } else {
        alert("سرور پاسخ درستی نداد.");
    }
  } catch (err) {
    alert("کد وارد شده صحیح نیست.");
  }
};
</script>

<template>
  <div class="text-center" dir="rtl">
    <h1 class="text-xl font-bold text-[#1a2333] mb-10">کد تأیید را وارد کنید</h1>

    <div class="flex justify-center gap-2 mb-6">
      <input 
        v-for="i in 6" :key="i"
        v-model="otp[i-1]"
        :ref="el => inputRefs[i-1] = el"
        @input="handleInput(i-1)"
        type="text" maxlength="1" 
        class="w-12 h-16 bg-[#cedce0] rounded-xl text-center text-2xl font-bold text-[#1a2333] focus:outline-none focus:ring-2 focus:ring-[#2d6a66]"
      />
    </div>

    <div class="mb-10 text-sm text-[#1a2333] font-medium">
      {{ formattedTimer }}
    </div>
    
    <AuthButton @click="verifyCode">تایید کد</AuthButton>

    <div class="mt-6 text-sm text-[#1a2333] font-medium cursor-pointer">
      <NuxtLink to="/auth/login">بازگشت به صفحه ورود</NuxtLink>
    </div>
  </div>
</template>