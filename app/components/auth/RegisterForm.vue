<script setup>
import { ref } from 'vue'
import { useForm, useField, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

definePageMeta({ layout: 'auth' })

// ۱. به‌روزرسانی اسکیما برای شامل شدن تمام فیلدها
const schema = yup.object({
  username: yup.string().required('نام کاربری الزامی است'),
  full_name: yup.string().required('نام و نام خانوادگی الزامی است'),
  email: yup.string().email('ایمیل معتبر نیست').required('ایمیل الزامی است'),
  mobile: yup.string().min(11, 'شماره تماس باید ۱۱ رقم باشد').required('شماره تماس الزامی است'),
  national_code: yup.string().required('کد ملی الزامی است'),
  birth_date: yup.string().required('تاریخ تولد الزامی است'),
  province: yup.string().required('استان الزامی است'),
  postal_code: yup.string().required('کد پستی الزامی است'),
  adress: yup.string().required('آدرس الزامی است'),
  password: yup.string().min(6, 'رمز عبور حداقل ۶ کاراکتر باشد').required('رمز عبور الزامی است'),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password')], 'رمز عبور مطابقت ندارد')
    .required('تکرار رمز عبور الزامی است'),
})

const { handleSubmit, setErrors } = useForm({ validationSchema: schema })

// ۲. تعریف تمام فیلدها با useField
const { value: username } = useField('username')
const { value: full_name } = useField('full_name')
const { value: email } = useField('email')
const { value: mobile } = useField('mobile')
const { value: national_code } = useField('national_code')
const { value: birth_date } = useField('birth_date')
const { value: province } = useField('province')
const { value: postal_code } = useField('postal_code')
const { value: adress } = useField('adress')
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

    <h1 class="text-lg font-bold text-[#000000] mb-8 font-roboto"> برای ثبت نام ، شماره همراه خود را وارد کنید</h1>
<form @submit="registerUser">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" dir="ltr">
    
    <div class="flex flex-col font-roboto">
      <AuthInput v-model="username" label="نام کاربری" class="h-[44px] [&>div>input]:h-[44px]" />
      <ErrorMessage name="username" class="text-red-500 text-[10px] text-right mt-4" />
    </div>
    
    <div class="flex flex-col font-roboto">
      <AuthInput v-model="full_name" label="نام و نام خانوادگی" class="h-[44px] [&>div>input]:h-[44px]" />
      <ErrorMessage name="full_name" class="text-red-500 text-[10px] text-right mt-4" />
    </div>
    
    <div class="flex flex-col font-roboto">
      <AuthInput v-model="email" label="ایمیل" class="h-[44px] [&>div>input]:h-[44px]" />
      <ErrorMessage name="email" class="text-red-500 text-[10px] text-right mt-4" />
    </div>
    
    <div class="flex flex-col font-roboto">
      <AuthInput v-model="mobile" label="شماره تماس" class="h-[44px] [&>div>input]:h-[44px]" />
      <ErrorMessage name="mobile" class="text-red-500 text-[10px] text-right mt-4" />
    </div>

    <div class="flex flex-col font-roboto">
      <AuthInput v-model="national_code" label="کد ملی" class="h-[44px] [&>div>input]:h-[44px]" />
      <ErrorMessage name="national_code" class="text-red-500 text-[10px] text-right mt-4" />
    </div>
    
    <div class="flex flex-col font-roboto">
      <AuthInput v-model="birth_date" label="تاریخ تولد" class="h-[44px] [&>div>input]:h-[44px]" />
      <ErrorMessage name="birth_date" class="text-red-500 text-[10px] text-right mt-4" />
    </div>
    
    <div class="flex flex-col font-roboto">
      <AuthInput v-model="province" label="استان" class="h-[44px] [&>div>input]:h-[44px]" />
      <ErrorMessage name="province" class="text-red-500 text-[10px] text-right mt-4" />
    </div>
    
    <div class="flex flex-col font-roboto">
      <AuthInput v-model="postal_code" label="کد پستی" class="h-[44px] [&>div>input]:h-[44px]" />
      <ErrorMessage name="postal_code" class="text-red-500 text-[10px] text-right mt-4" />
    </div>
  </div>

  <div class="flex flex-col mt-6 font-roboto">
    <AuthInput v-model="adress" label="آدرس و نشانی" class="h-[106px] [&>div>input]:h-[106px] [&>div>input]:py-4" />
    <ErrorMessage name="adress" class="text-red-500 text-[10px] text-right mt-4" />
  </div>

  <div class="flex flex-col mt-6 font-roboto">
    <AuthInput v-model="password" label="رمز عبور" type="password" class="h-[44px] [&>div>input]:h-[44px]" />
    <ErrorMessage name="password" class="text-red-500 text-[10px] text-right mt-4" />
  </div>
  
  <div class="flex flex-col mt-6 font-roboto">
    <AuthInput v-model="password_confirmation" label="تکرار رمز عبور" type="password" class="h-[44px] [&>div>input]:h-[44px]" />
    <ErrorMessage name="password_confirmation" class="text-red-500 text-[10px] text-right mt-4" />
  </div>
  
  <div class="mt-8 ">
    <AuthButton type="submit" :disabled="loading" >
      {{ loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام' }}
    </AuthButton>
  </div>
</form>
    
    <div class="mt-6 text-sm text-[#1a2333] font-bold cursor-pointer underline font-roboto">
      <NuxtLink to="/auth/login">ورود / حساب کاربری دارم</NuxtLink>
    </div>
  </div>
</template>s