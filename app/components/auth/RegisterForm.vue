<script setup>
import { ref } from 'vue'
import { useForm, useField, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

definePageMeta({ layout: 'auth' })

// ==================== اسکیما ولیدیشن ====================
const schema = yup.object({

  username: yup
    .string()
    .matches(/^[a-zA-Z0-9_]+$/, 'نام کاربری فقط باید شامل حروف انگلیسی، عدد و _ باشد')
    .required('نام کاربری الزامی است'),

  full_name: yup
    .string()
    .matches(/^[\u0600-\u06FF\s]+$/, 'نام و نام خانوادگی باید فارسی باشد')
    .required('نام و نام خانوادگی الزامی است'),

  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
      'ایمیل معتبر نیست (باید شامل @ و دامنه معتبر باشد)'
    )
    .required('ایمیل الزامی است'),

  mobile: yup
    .string()
    .matches(/^\d+$/, 'شماره تماس باید فقط عدد باشد')
    .length(11, 'شماره تماس باید دقیقاً ۱۱ رقم باشد')
    .matches(/^09/, 'شماره تماس باید با ۰۹ شروع شود')
    .required('شماره تماس الزامی است'),

  national_code: yup
    .string()
    .matches(/^\d+$/, 'کد ملی باید فقط عدد باشد')
    .length(10, 'کد ملی باید دقیقاً ۱۰ رقم باشد')
    .required('کد ملی الزامی است'),

  // مقدار ورودی همچنان شمسی است (نمایش به کاربر)، اما هنگام ارسال به میلادی تبدیل می‌شود
  birth_date: yup
    .string()
    .matches(
      /^(1[3-4]\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/,
      'تاریخ تولد معتبر نیست (مثال: ۱۳۷۰/۰۱/۰۱)'
    )
    .required('تاریخ تولد الزامی است'),

  province: yup
    .string()
    .required('استان الزامی است'),

  postal_code: yup
    .string()
    .matches(/^\d+$/, 'کد پستی باید فقط عدد باشد')
    .length(10, 'کد پستی باید دقیقاً ۱۰ رقم باشد')
    .required('کد پستی الزامی است'),

  // FIX: نام فیلد از "adress" به "address" اصلاح شد تا با API مطابقت داشته باشد
  address: yup
    .string()
    .required('آدرس الزامی است'),

  password: yup
    .string()
    .min(8, 'رمز عبور حداقل ۸ کاراکتر باشد')
    .matches(/[A-Z]/, 'رمز عبور باید شامل حداقل یک حرف بزرگ باشد')
    .matches(/[a-z]/, 'رمز عبور باید شامل حداقل یک حرف کوچک باشد')
    .matches(/[0-9]/, 'رمز عبور باید شامل حداقل یک عدد باشد')
    .matches(/[@#$]/, 'رمز عبور باید شامل حداقل یکی از کاراکترهای @، # یا $ باشد')
    .required('رمز عبور الزامی است'),

  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'رمز عبور مطابقت ندارد')
    .required('تکرار رمز عبور الزامی است'),
})

const { handleSubmit, setErrors } = useForm({ validationSchema: schema })

// ==================== فیلدها ====================
const { value: username, errorMessage: usernameError } = useField('username')
const { value: full_name, errorMessage: fullNameError } = useField('full_name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: mobile, errorMessage: mobileError } = useField('mobile')
const { value: national_code, errorMessage: nationalCodeError } = useField('national_code')
const { value: birth_date, errorMessage: birthDateError } = useField('birth_date')
const { value: province, errorMessage: provinceError } = useField('province')
const { value: postal_code, errorMessage: postalCodeError } = useField('postal_code')
// FIX: adress -> address
const { value: address, errorMessage: addressError } = useField('address')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: password_confirmation, errorMessage: passwordConfirmError } = useField('password_confirmation')

const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const loading = ref(false)
const toast = ref({ message: '', type: '' })

const showToast = (message, type = 'error') => {
  toast.value = { message, type }
  setTimeout(() => { toast.value = { message: '', type: '' } }, 4000)
}

// ==================== هندلرهای input ====================

const handleUsernameInput = (e) => {
  const filtered = e.target.value.replace(/[^a-zA-Z0-9_]/g, '')
  username.value = filtered
  e.target.value = filtered
}

const handleFullNameKeydown = (e) => {
  const char = e.key
  if (char && char.length === 1 && /[a-zA-Z0-9!@#$%^&*()\-=\[\]{};':"\\|,.<>\/?]/.test(char)) {
    e.preventDefault()
  }
}

const handleMobileInput = (e) => {
  const digits = e.target.value.replace(/\D/g, '').slice(0, 11)
  mobile.value = digits
  e.target.value = digits
}

const handleNationalCodeInput = (e) => {
  const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
  national_code.value = digits
  e.target.value = digits
}

const handleBirthDateInput = (e) => {
  let raw = e.target.value.replace(/\D/g, '').slice(0, 8)
  let formatted = raw
  if (raw.length > 4) formatted = raw.slice(0, 4) + '/' + raw.slice(4)
  if (raw.length > 6) formatted = raw.slice(0, 4) + '/' + raw.slice(4, 6) + '/' + raw.slice(6)
  birth_date.value = formatted
  e.target.value = formatted
}

const handlePostalCodeInput = (e) => {
  const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
  postal_code.value = digits
  e.target.value = digits
}

const PERSIAN_REGEX = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/g

const handlePasswordInput = (e) => {
  const filtered = e.target.value.replace(PERSIAN_REGEX, '')
  password.value = filtered
  e.target.value = filtered
}

const handlePasswordKeydown = (e) => {
  if (e.key?.length === 1 && PERSIAN_REGEX.test(e.key)) e.preventDefault()
}

const handlePasswordConfirmInput = (e) => {
  const filtered = e.target.value.replace(PERSIAN_REGEX, '')
  password_confirmation.value = filtered
  e.target.value = filtered
}

const handlePasswordConfirmKeydown = (e) => {
  if (e.key?.length === 1 && PERSIAN_REGEX.test(e.key)) e.preventDefault()
}

// ==================== FIX: تبدیل تاریخ شمسی به میلادی ====================
// API فیلد birth_date را به فرمت میلادی YYYY-MM-DD می‌خواهد (طبق نمونه سواگر: "2000-05-15")
// در حالی که کاربر تاریخ را به صورت شمسی وارد می‌کند (مثلاً 1370/01/01)
// الگوریتم استاندارد تبدیل جلالی به میلادی (بدون نیاز به کتابخانه خارجی)
function jalaliToGregorian(jy, jm, jd) {
  let gy
  if (jy > 979) {
    gy = 1600
    jy -= 979
  } else {
    gy = 621
  }
  let days =
    365 * jy +
    Math.floor(jy / 33) * 8 +
    Math.floor(((jy % 33) + 3) / 4) +
    78 +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186)

  gy += 400 * Math.floor(days / 146097)
  days %= 146097

  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524)
    days %= 36524
    if (days >= 365) days++
  }

  gy += 4 * Math.floor(days / 1461)
  days %= 1461

  if (days > 365) {
    gy += Math.floor((days - 1) / 365)
    days = (days - 1) % 365
  }

  let gd = days + 1
  const isLeap = (gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0
  const gDaysInMonth = [0, 31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  let gm = 0
  for (gm = 1; gm <= 12; gm++) {
    if (gd <= gDaysInMonth[gm]) break
    gd -= gDaysInMonth[gm]
  }

  return { gy, gm, gd }
}

function convertJalaliStringToGregorianISO(jalaliStr) {
  // jalaliStr به فرمت "1370/01/01"
  const [jy, jm, jd] = jalaliStr.split('/').map(Number)
  const { gy, gm, gd } = jalaliToGregorian(jy, jm, jd)
  const pad = (n) => String(n).padStart(2, '0')
  return `${gy}-${pad(gm)}-${pad(gd)}`
}

// ==================== ثبت‌نام ====================
const registerUser = handleSubmit(async (values) => {
  loading.value = true
  try {
    // FIX: ساخت payload مطابق ساختار دقیق API (تبدیل تاریخ + نام فیلد address)
    const payload = {
      full_name: values.full_name,
      username: values.username,
      email: values.email,
      mobile: values.mobile,
      birth_date: convertJalaliStringToGregorianISO(values.birth_date),
      national_code: values.national_code,
      postal_code: values.postal_code,
      province: values.province,
      address: values.address,
      password: values.password,
      password_confirmation: values.password_confirmation,
    }

    const response = await $fetch('https://nadertechnologyteam.ir/api/auth/register', {
      method: 'POST',
      body: payload,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })

    // FIX: ریسپانس موفق طبق سواگر داخل response.data.login_token است، نه response.token
    const loginToken = response?.data?.login_token
    const expiresIn = response?.data?.expires_in

    if (loginToken) {
      // ذخیره login_token و expires_in برای مرحله تایید OTP
      localStorage.setItem('login_token', loginToken)
      if (expiresIn) localStorage.setItem('otp_expires_in', String(expiresIn))

      showToast(response?.message || 'ثبت‌نام با موفقیت انجام شد', 'success')
      navigateTo('/auth/verify')
    } else {
      showToast('پاسخ نامعتبر از سرور دریافت شد', 'error')
    }
  } catch (err) {
    // FIX: پوشش هر دو ساختار ممکن خطای ofetch/$fetch
    const status = err.response?.status ?? err.status
    const errors = err.response?._data?.errors ?? err.data?.errors

    if (status === 422 && errors) {
      setErrors(errors)
      showToast('لطفاً اطلاعات را اصلاح کنید', 'error')
    } else {
      showToast('خطایی رخ داده است. لطفاً بعداً تلاش کنید.', 'error')
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="text-center" dir="rtl">

    <!-- Toast -->
    <div
      v-if="toast.message"
      :class="['fixed top-5 left-5 p-4 rounded text-white z-50 transition-all', toast.type === 'success' ? 'bg-green-500' : 'bg-red-500']"
    >
      {{ toast.message }}
    </div>

    <h1 class="text-lg font-bold text-[#000000] dark:text-dark-text-deep mb-8 font-roboto">
      برای ثبت نام، اطلاعات خود را وارد کنید
    </h1>

    <form @submit.prevent="registerUser" novalidate>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5" dir="ltr">

        <!-- نام کاربری -->
        <div class="flex flex-col text-right">
          <label class="text-sm font-medium  text-[#3D3E41] dark:text-dark-text-deep mb-1 font-roboto">نام کاربری</label>
          <input
            v-model="username"
            type="text"
            dir="ltr"
            placeholder="username"
            autocomplete="username"
            class="h-[44px] px-3 rounded-[25px] border text-left text-sm font-roboto outline-none transition-colors"
            :class="usernameError
              ? 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-50/10 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-300'
              : 'border-gray-300 bg-white dark:border-dark-border dark:bg-[#D9D9D9CC] focus:border-[#0F184B] dark:focus:border-dark-accent focus:ring-2 focus:ring-[#0F184B]/20 dark:focus:ring-dark-accent/30'"
            @input="handleUsernameInput"
          />
          <p v-if="usernameError" class="text-red-500 dark:text-red-400 text-[11px] mt-1 text-right">{{ usernameError }}</p>
        </div>

        <!-- نام و نام خانوادگی -->
        <div class="flex flex-col text-right">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-1 font-roboto">نام و نام خانوادگی</label>
          <input
            v-model="full_name"
            type="text"
            dir="rtl"
            placeholder="نام و نام خانوادگی"
            autocomplete="name"
            class="h-[44px] px-3 rounded-[25px] border text-right text-sm font-roboto outline-none transition-colors"
            :class="fullNameError
              ? 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-50/10 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-300'
              : 'border-gray-300 bg-white dark:border-dark-border dark:bg-[#D9D9D9CC] focus:border-[#0F184B] dark:focus:border-dark-accent focus:ring-2 focus:ring-[#0F184B]/20 dark:focus:ring-dark-accent/30'"
            @keydown="handleFullNameKeydown"
          />
          <p v-if="fullNameError" class="text-red-500 dark:text-red-400 text-[11px] mt-1 text-right">{{ fullNameError }}</p>
        </div>

        <!-- ایمیل -->
        <div class="flex flex-col text-right">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-1 font-roboto">ایمیل</label>
          <input
            v-model="email"
            type="email"
            dir="ltr"
            placeholder="example@email.com"
            autocomplete="email"
            class="h-[44px] px-3 rounded-[25px] border text-left text-sm font-roboto outline-none transition-colors"
            :class="emailError
              ? 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-50/10 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-300'
              : 'border-gray-300 bg-white dark:border-dark-border dark:bg-[#D9D9D9CC] focus:border-[#0F184B] dark:focus:border-dark-accent focus:ring-2 focus:ring-[#0F184B]/20 dark:focus:ring-dark-accent/30'"
          />
          <p v-if="emailError" class="text-red-500 dark:text-red-400 text-[11px] mt-1 text-right">{{ emailError }}</p>
        </div>

        <!-- شماره تماس -->
        <div class="flex flex-col text-right">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-1 font-roboto">شماره تماس</label>
          <input
            v-model="mobile"
            type="text"
            dir="ltr"
            inputmode="numeric"
            maxlength="11"
            placeholder="09xxxxxxxxx"
            autocomplete="tel"
            class="h-[44px] px-3 rounded-[25px] border text-left text-sm font-roboto outline-none transition-colors"
            :class="mobileError
              ? 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-50/10 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-300'
              : 'border-gray-300 bg-white dark:border-dark-border dark:bg-[#D9D9D9CC] focus:border-[#0F184B] dark:focus:border-dark-accent focus:ring-2 focus:ring-[#0F184B]/20 dark:focus:ring-dark-accent/30'"
            @input="handleMobileInput"
          />
          <p v-if="mobileError" class="text-red-500 dark:text-red-400 text-[11px] mt-1 text-right">{{ mobileError }}</p>
        </div>

        <!-- کد ملی -->
        <div class="flex flex-col text-right">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-1 font-roboto">کد ملی</label>
          <input
            v-model="national_code"
            type="text"
            dir="ltr"
            inputmode="numeric"
            maxlength="10"
            placeholder="__________"
            class="h-[44px] px-3 rounded-[25px] border text-left text-sm font-roboto outline-none transition-colors"
            :class="nationalCodeError
              ? 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-50/10 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-300'
              : 'border-gray-300 bg-white dark:border-dark-border dark:bg-[#D9D9D9CC] focus:border-[#0F184B] dark:focus:border-dark-accent focus:ring-2 focus:ring-[#0F184B]/20 dark:focus:ring-dark-accent/30'"
            @input="handleNationalCodeInput"
          />
          <p v-if="nationalCodeError" class="text-red-500 dark:text-red-400 text-[11px] mt-1 text-right">{{ nationalCodeError }}</p>
        </div>

        <!-- تاریخ تولد شمسی -->
        <div class="flex flex-col text-right">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-1 font-roboto">تاریخ تولد (شمسی)</label>
          <input
            v-model="birth_date"
            type="text"
            dir="ltr"
            inputmode="numeric"
            maxlength="10"
            placeholder="1370/01/01"
            class="h-[44px] px-3 rounded-[25px] border text-left text-sm font-roboto outline-none transition-colors"
            :class="birthDateError
              ? 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-50/10 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-300'
              : 'border-gray-300 bg-white dark:border-dark-border dark:bg-[#D9D9D9CC] focus:border-[#0F184B] dark:focus:border-dark-accent focus:ring-2 focus:ring-[#0F184B]/20 dark:focus:ring-dark-accent/30'"
            @input="handleBirthDateInput"
          />
          <p v-if="birthDateError" class="text-red-500 dark:text-red-400 text-[11px] mt-1 text-right">{{ birthDateError }}</p>
        </div>

        <!-- استان -->
        <div class="flex flex-col text-right">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-1 font-roboto">استان</label>
          <input
            v-model="province"
            type="text"
            dir="rtl"
            placeholder="استان خود را وارد کنید"
            class="h-[44px] px-3 rounded-[25px] border text-right text-sm font-roboto outline-none transition-colors"
            :class="provinceError
              ? 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-50/10 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-300'
              : 'border-gray-300 bg-white dark:border-dark-border dark:bg-[#D9D9D9CC] focus:border-[#0F184B] dark:focus:border-dark-accent focus:ring-2 focus:ring-[#0F184B]/20 dark:focus:ring-dark-accent/30'"
          />
          <p v-if="provinceError" class="text-red-500 dark:text-red-400 text-[11px] mt-1 text-right">{{ provinceError }}</p>
        </div>

        <!-- کد پستی -->
        <div class="flex flex-col text-right">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-1 font-roboto">کد پستی</label>
          <input
            v-model="postal_code"
            type="text"
            dir="ltr"
            inputmode="numeric"
            maxlength="10"
            placeholder="__________"
            class="h-[44px] px-3 rounded-[25px] border text-left text-sm font-roboto outline-none transition-colors"
            :class="postalCodeError
              ? 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-50/10 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-300'
              : 'border-gray-300 bg-white dark:border-dark-border dark:bg-[#D9D9D9CC] focus:border-[#0F184B] dark:focus:border-dark-accent focus:ring-2 focus:ring-[#0F184B]/20 dark:focus:ring-dark-accent/30'"
            @input="handlePostalCodeInput"
          />
          <p v-if="postalCodeError" class="text-red-500 dark:text-red-400 text-[11px] mt-1 text-right">{{ postalCodeError }}</p>
        </div>

      </div>

      <!-- آدرس -->
      <div class="flex flex-col mt-5 text-right">
        <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-1 font-roboto">آدرس و نشانی</label>
        <textarea
          v-model="address"
          dir="rtl"
          rows="4"
          placeholder="آدرس کامل خود را وارد کنید..."
          class="px-3 py-3 rounded-[25px] border text-right text-sm font-roboto outline-none transition-colors resize-none leading-7"
          :class="addressError
            ? 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-50/10 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-300'
            : 'border-gray-300 bg-white dark:border-dark-border dark:bg-[#D9D9D9CC] focus:border-[#0F184B] dark:focus:border-dark-accent focus:ring-2 focus:ring-[#0F184B]/20 dark:focus:ring-dark-accent/30'"
        />
        <p v-if="addressError" class="text-red-500 dark:text-red-400 text-[11px] mt-1 text-right">{{ addressError }}</p>
      </div>

      <!-- رمز عبور -->
      <div class="flex flex-col mt-5 text-right">
        <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-1 font-roboto">رمز عبور</label>
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            dir="ltr"
            placeholder="••••••••"
            autocomplete="new-password"
            class="h-[44px] w-full pl-10 pr-3 rounded-[25px] border text-left text-sm font-roboto outline-none transition-colors"
            :class="passwordError
              ? 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-50/10 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-300'
              : 'border-gray-300 bg-white dark:border-dark-border dark:bg-[#D9D9D9CC] focus:border-[#0F184B] dark:focus:border-dark-accent focus:ring-2 focus:ring-[#0F184B]/20 dark:focus:ring-dark-accent/30'"
            @input="handlePasswordInput"
            @keydown="handlePasswordKeydown"
          />
          <!-- دکمه نمایش/مخفی رمز -->
          <button
            type="button"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-dark-text-deep/60 hover:text-[#0F184B] dark:hover:text-dark-accent transition-colors"
            @click="showPassword = !showPassword"
          >
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.938 6.938A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.978 9.978 0 01-1.38 2.62M3 3l18 18"/>
            </svg>
          </button>
        </div>
        <p v-if="passwordError" class="text-red-500 dark:text-red-400 text-[11px] mt-1">{{ passwordError }}</p>
        <p class="text-gray-400 dark:text-dark-text-deep/60 text-[11px] mt-1">
          حداقل ۸ کاراکتر، شامل حرف بزرگ، حرف کوچک، عدد و یکی از: @ # $
        </p>
      </div>

      <!-- تکرار رمز عبور -->
      <div class="flex flex-col mt-5 text-right">
        <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-1 font-roboto">تکرار رمز عبور</label>
        <div class="relative">
          <input
            v-model="password_confirmation"
            :type="showPasswordConfirm ? 'text' : 'password'"
            dir="ltr"
            placeholder="••••••••"
            autocomplete="new-password"
            class="h-[44px] w-full pl-10 pr-3 rounded-[25px] border text-left text-sm font-roboto outline-none transition-colors"
            :class="passwordConfirmError
              ? 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-50/10 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-300'
              : 'border-gray-300 bg-white dark:border-dark-border dark:bg-[#D9D9D9CC] focus:border-[#0F184B] dark:focus:border-dark-accent focus:ring-2 focus:ring-[#0F184B]/20 dark:focus:ring-dark-accent/30'"
            @input="handlePasswordConfirmInput"
            @keydown="handlePasswordConfirmKeydown"
          />
          <button
            type="button"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-dark-text-deep/60 hover:text-[#0F184B] dark:hover:text-dark-accent transition-colors"
            @click="showPasswordConfirm = !showPasswordConfirm"
          >
            <svg v-if="!showPasswordConfirm" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.938 6.938A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.978 9.978 0 01-1.38 2.62M3 3l18 18"/>
            </svg>
          </button>
        </div>
        <p v-if="passwordConfirmError" class="text-red-500 dark:text-red-400 text-[11px] mt-1">{{ passwordConfirmError }}</p>
      </div>

      <!-- دکمه ثبت‌نام -->
      <div class="mt-8">
        <AuthButton type="submit" :disabled="loading">
          {{ loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام' }}
        </AuthButton>
      </div>
    </form>

    <div class="mt-6 text-sm text-[#1a2333] dark:text-dark-text-deep font-bold cursor-pointer underline font-roboto">
      <NuxtLink to="/auth/login">ورود / حساب کاربری دارم</NuxtLink>
    </div>

  </div>
</template>