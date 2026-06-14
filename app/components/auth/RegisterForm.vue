<script setup>
import { ref } from 'vue'
import { useForm, useField, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

definePageMeta({ layout: 'auth' })

// قوانین اعتبارسنجی
const schema = yup.object({
  username: yup.string().required('نام کاربری الزامی است'),
  full_name: yup.string().required('نام و نام خانوادگی الزامی است'),
  email: yup.string().email('ایمیل معتبر نیست').required('ایمیل الزامی است'),
  mobile: yup.string().min(11, 'شماره تماس باید ۱۱ رقم باشد').required('شماره تماس الزامی است'),
  password: yup.string().min(6, 'رمز عبور حداقل ۶ کاراکتر باشد').required('رمز عبور الزامی است'),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password')], 'رمز عبور مطابقت ندارد')
    .required('تکرار رمز عبور الزامی است'),
})

// تنظیمات فرم
const { handleSubmit, setErrors } = useForm({
  validationSchema: schema,
})

// تعریف فیلدها
const { value: username } = useField('username')
const { value: full_name } = useField('full_name')
const { value: email } = useField('email')
const { value: mobile } = useField('mobile')
const { value: password } = useField('password')
const { value: password_confirmation } = useField('password_confirmation')

const loading = ref(false)
const toast = ref({ message: '', type: '' })

const showToast = (message, type = 'error') => {
  toast.value = { message, type }
  setTimeout(() => { toast.value = { message: '', type: '' } }, 4000)
}

// تابع ثبت‌نام
const registerUser = handleSubmit(async (values) => {
  loading.value = true
  try {
    const response = await $fetch('https://nadertechnologyteam.ir/api/auth/register', {
      method: 'POST',
      body: values,
      headers: { 'Accept': 'application/json' }
    })
    
    // مدیریت مسیردهی بر اساس پاسخ سرور
    if (response?.token) {
      localStorage.setItem('token', response.token)
      navigateTo('/profile')
    } else {
      navigateTo('/auth/verify')
    }
} catch (err) {
  loading.value = false;
  
  // بررسی اینکه آیا بک‌اِند خطای اعتبارسنجی (422) فرستاده یا نه
  if (err.response?.status === 422) {
    const backendErrors = err.response._data.errors;
    // این دستور جادویی است؛ خطاها را می‌گیرد و زیرِ فیلدها می‌چسباند
    setErrors(backendErrors); 
    showToast("لطفاً اطلاعات را اصلاح کنید", "error");
  } else {
    // برای سایر خطاها (مثل 500)
    showToast("خطایی رخ داده است. لطفاً بعداً تلاش کنید.", "error");
  }
}
})
</script>

<template>
  <div class="text-center" dir="rtl">
    <div v-if="toast.message" :class="['fixed top-5 left-5 p-4 rounded text-white z-50', toast.type === 'success' ? 'bg-green-500' : 'bg-red-500']">
      {{ toast.message }}
    </div>

    <h1 class="text-lg font-bold text-[#1a2333] mb-8">اطلاعات خود را وارد کنید</h1>

    <form @submit="registerUser">
      <div class="grid grid-cols-2 gap-x-4">
        <div class="flex flex-col mb-2">
          <AuthInput v-model="username" label="نام کاربری" />
          <ErrorMessage name="username" class="text-red-500 text-[10px] text-right" />
        </div>
        
        <div class="flex flex-col mb-2">
          <AuthInput v-model="full_name" label="نام و نام خانوادگی" />
          <ErrorMessage name="full_name" class="text-red-500 text-[10px] text-right" />
        </div>
        
        <div class="flex flex-col mb-2">
          <AuthInput v-model="email" label="ایمیل" />
          <ErrorMessage name="email" class="text-red-500 text-[10px] text-right" />
        </div>
        
        <div class="flex flex-col mb-2">
          <AuthInput v-model="mobile" label="شماره تماس" />
          <ErrorMessage name="mobile" class="text-red-500 text-[10px] text-right" />
        </div>
      </div>

      <div class="flex flex-col mb-2">
        <AuthInput v-model="password" label="رمز عبور" type="password" />
        <ErrorMessage name="password" class="text-red-500 text-[10px] text-right" />
      </div>
      
      <div class="flex flex-col mb-2">
        <AuthInput v-model="password_confirmation" label="تکرار رمز عبور" type="password" />
        <ErrorMessage name="password_confirmation" class="text-red-500 text-[10px] text-right" />
      </div>
      
      <div class="mt-4">
        <AuthButton type="submit" :disabled="loading">
          {{ loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام' }}
        </AuthButton>
      </div>
    </form>
    
    <div class="mt-6 text-sm text-[#1a2333] font-medium cursor-pointer underline">
      <NuxtLink to="/auth/login">ورود / حساب کاربری دارم</NuxtLink>
    </div>
  </div>
</template>s