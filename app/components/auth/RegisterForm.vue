<script setup>
import { ref, computed } from 'vue'
import { useForm, useField, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

import TermsAgreement from '~/components/Terms/TermsAgreement.vue'

definePageMeta({ layout: 'auth' })

const { t, localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

// ==================== اسکیما ولیدیشن ====================
const schema = yup.object({

  username: yup
    .string()
    .matches(/^[a-zA-Z0-9_]+$/, t('auth.register.validation.usernameFormat'))
    .required(t('auth.register.validation.usernameRequired')),

  // نکته: این فیلد طبق قانون سیستم همیشه باید فارسی باشد (تطبیق با مدارک هویتی)،
  // مستقل از زبان نمایش سایت — این یک محدودیت واقعی است، نه صرفاً زبان رابط کاربری
  full_name: yup
    .string()
    .matches(/^[\u0600-\u06FF\s]+$/, t('auth.register.validation.fullNameFormat'))
    .required(t('auth.register.validation.fullNameRequired')),

  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
      t('auth.register.validation.emailFormat')
    )
    .required(t('auth.register.validation.emailRequired')),

  mobile: yup
    .string()
    .matches(/^\d+$/, t('auth.register.validation.mobileDigitsOnly'))
    .length(11, t('auth.register.validation.mobileLength'))
    .matches(/^09/, t('auth.register.validation.mobilePrefix'))
    .required(t('auth.register.validation.mobileRequired')),

  national_code: yup
    .string()
    .matches(/^\d+$/, t('auth.register.validation.nationalCodeDigitsOnly'))
    .length(10, t('auth.register.validation.nationalCodeLength'))
    .required(t('auth.register.validation.nationalCodeRequired')),

  // مقدار ورودی همچنان شمسی است (نمایش به کاربر)، اما هنگام ارسال به میلادی تبدیل می‌شود
  birth_date: yup
    .string()
    .matches(
      /^(1[3-4]\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/,
      t('auth.register.validation.birthDateFormat')
    )
    .required(t('auth.register.validation.birthDateRequired')),

  province: yup
    .string()
    .required(t('auth.register.validation.provinceRequired')),

  postal_code: yup
    .string()
    .matches(/^\d+$/, t('auth.register.validation.postalCodeDigitsOnly'))
    .length(10, t('auth.register.validation.postalCodeLength'))
    .required(t('auth.register.validation.postalCodeRequired')),

  address: yup
    .string()
    .required(t('auth.register.validation.addressRequired')),

  password: yup
    .string()
    .min(8, t('auth.register.validation.passwordMinLength'))
    .matches(/[A-Z]/, t('auth.register.validation.passwordUppercase'))
    .matches(/[a-z]/, t('auth.register.validation.passwordLowercase'))
    .matches(/[0-9]/, t('auth.register.validation.passwordDigit'))
    .matches(/[@#$]/, t('auth.register.validation.passwordSpecialChar'))
    .required(t('auth.register.validation.passwordRequired')),

  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], t('auth.register.validation.passwordMismatch'))
    .required(t('auth.register.validation.passwordConfirmRequired')),
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
  const [jy, jm, jd] = jalaliStr.split('/').map(Number)
  const { gy, gm, gd } = jalaliToGregorian(jy, jm, jd)
  const pad = (n) => String(n).padStart(2, '0')
  return `${gy}-${pad(gm)}-${pad(gd)}`
}

// ==================== ثبت‌نام ====================
const registerUser = handleSubmit(async (values) => {
  loading.value = true
  try {
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

    const loginToken = response?.data?.login_token
    const expiresIn = response?.data?.expires_in

    if (loginToken) {
      localStorage.setItem('login_token', loginToken)
      if (expiresIn) localStorage.setItem('otp_expires_in', String(expiresIn))

      showToast(response?.message || t('auth.register.toast.success'), 'success')
      navigateTo(localePath('/auth/verify'))
    } else {
      showToast(t('auth.register.toast.invalidResponse'), 'error')
    }
  } catch (err) {
    const status = err.response?.status ?? err.status
    const errors = err.response?._data?.errors ?? err.data?.errors

    if (status === 422 && errors) {
      setErrors(errors)
      showToast(t('auth.register.toast.fixFields'), 'error')
    } else {
      showToast(t('auth.register.toast.genericError'), 'error')
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="text-center" :dir="isRtl ? 'rtl' : 'ltr'">

    <!-- Toast -->
    <div
      v-if="toast.message"
      :class="['fixed top-5 p-4 rounded text-white z-50 transition-all', isRtl ? 'left-5' : 'right-5', toast.type === 'success' ? 'bg-green-500' : 'bg-red-500']"
    >
      {{ toast.message }}
    </div>

    <h1 class="text-lg font-bold text-[#000000] dark:text-dark-text-deep mb-8 font-roboto">
      {{ $t('auth.register.heading') }}
    </h1>

    <form @submit.prevent="registerUser" novalidate>
      <!-- نکته: این گرید عمداً dir="ltr" ثابت مونده (نه isRtl) چون نیمی از فیلدها محتوای لاتین/عددی
           دارن و نیمی فارسی؛ ترتیب فیلدها رو مستقل از زبان صفحه پایدار نگه می‌داریم -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5" dir="ltr">

        <!-- نام کاربری -->
        <div class="flex flex-col" :class="isRtl ? 'text-right' : 'text-left'">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-2 font-roboto">{{ $t('auth.register.fields.username') }}</label>
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
          <p v-if="usernameError" class="text-red-500 dark:text-red-400 text-[11px] mt-1" :class="isRtl ? 'text-right' : 'text-left'">{{ usernameError }}</p>
        </div>

        <!-- نام و نام خانوادگی (باید همیشه فارسی باشد - محدودیت واقعی سیستم) -->
        <div class="flex flex-col" :class="isRtl ? 'text-right' : 'text-left'">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-2 font-roboto">{{ $t('auth.register.fields.fullName') }}</label>
          <input
            v-model="full_name"
            type="text"
            dir="rtl"
            :placeholder="$t('auth.register.fields.fullNamePlaceholder')"
            autocomplete="name"
            class="h-[44px] px-3 rounded-[25px] border text-right text-sm font-roboto outline-none transition-colors"
            :class="fullNameError
              ? 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-50/10 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-300'
              : 'border-gray-300 bg-white dark:border-dark-border dark:bg-[#D9D9D9CC] focus:border-[#0F184B] dark:focus:border-dark-accent focus:ring-2 focus:ring-[#0F184B]/20 dark:focus:ring-dark-accent/30'"
            @keydown="handleFullNameKeydown"
          />
          <p v-if="fullNameError" class="text-red-500 dark:text-red-400 text-[11px] mt-1" :class="isRtl ? 'text-right' : 'text-left'">{{ fullNameError }}</p>
        </div>

        <!-- ایمیل -->
        <div class="flex flex-col" :class="isRtl ? 'text-right' : 'text-left'">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-2 font-roboto">{{ $t('auth.register.fields.email') }}</label>
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
          <p v-if="emailError" class="text-red-500 dark:text-red-400 text-[11px] mt-1" :class="isRtl ? 'text-right' : 'text-left'">{{ emailError }}</p>
        </div>

        <!-- شماره تماس -->
        <div class="flex flex-col" :class="isRtl ? 'text-right' : 'text-left'">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-2 font-roboto">{{ $t('auth.register.fields.mobile') }}</label>
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
          <p v-if="mobileError" class="text-red-500 dark:text-red-400 text-[11px] mt-1" :class="isRtl ? 'text-right' : 'text-left'">{{ mobileError }}</p>
        </div>

        <!-- کد ملی -->
        <div class="flex flex-col" :class="isRtl ? 'text-right' : 'text-left'">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-2 font-roboto">{{ $t('auth.register.fields.nationalCode') }}</label>
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
          <p v-if="nationalCodeError" class="text-red-500 dark:text-red-400 text-[11px] mt-1" :class="isRtl ? 'text-right' : 'text-left'">{{ nationalCodeError }}</p>
        </div>

        <!-- تاریخ تولد شمسی -->
        <div class="flex flex-col" :class="isRtl ? 'text-right' : 'text-left'">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-2 font-roboto">{{ $t('auth.register.fields.birthDate') }}</label>
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
          <p v-if="birthDateError" class="text-red-500 dark:text-red-400 text-[11px] mt-1" :class="isRtl ? 'text-right' : 'text-left'">{{ birthDateError }}</p>
        </div>

        <!-- استان -->
        <div class="flex flex-col" :class="isRtl ? 'text-right' : 'text-left'">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-2 font-roboto">{{ $t('auth.register.fields.province') }}</label>
          <input
            v-model="province"
            type="text"
            dir="rtl"
            :placeholder="$t('auth.register.fields.provincePlaceholder')"
            class="h-[44px] px-3 rounded-[25px] border text-right text-sm font-roboto outline-none transition-colors"
            :class="provinceError
              ? 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-50/10 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-300'
              : 'border-gray-300 bg-white dark:border-dark-border dark:bg-[#D9D9D9CC] focus:border-[#0F184B] dark:focus:border-dark-accent focus:ring-2 focus:ring-[#0F184B]/20 dark:focus:ring-dark-accent/30'"
          />
          <p v-if="provinceError" class="text-red-500 dark:text-red-400 text-[11px] mt-1" :class="isRtl ? 'text-right' : 'text-left'">{{ provinceError }}</p>
        </div>

        <!-- کد پستی -->
        <div class="flex flex-col" :class="isRtl ? 'text-right' : 'text-left'">
          <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-2 font-roboto">{{ $t('auth.register.fields.postalCode') }}</label>
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
          <p v-if="postalCodeError" class="text-red-500 dark:text-red-400 text-[11px] mt-1" :class="isRtl ? 'text-right' : 'text-left'">{{ postalCodeError }}</p>
        </div>

      </div>

      <!-- آدرس -->
      <div class="flex flex-col mt-5" :class="isRtl ? 'text-right' : 'text-left'">
        <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-2 font-roboto">{{ $t('auth.register.fields.address') }}</label>
        <textarea
          v-model="address"
          dir="rtl"
          rows="4"
          :placeholder="$t('auth.register.fields.addressPlaceholder')"
          class="px-3 py-3 rounded-[25px] border text-right text-sm font-roboto outline-none transition-colors resize-none leading-7"
          :class="addressError
            ? 'border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-50/10 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-300'
            : 'border-gray-300 bg-white dark:border-dark-border dark:bg-[#D9D9D9CC] focus:border-[#0F184B] dark:focus:border-dark-accent focus:ring-2 focus:ring-[#0F184B]/20 dark:focus:ring-dark-accent/30'"
        />
        <p v-if="addressError" class="text-red-500 dark:text-red-400 text-[11px] mt-1" :class="isRtl ? 'text-right' : 'text-left'">{{ addressError }}</p>
      </div>

      <!-- رمز عبور -->
      <div class="flex flex-col mt-5" :class="isRtl ? 'text-right' : 'text-left'">
        <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-2 font-roboto">{{ $t('auth.register.fields.password') }}</label>
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
          {{ $t('auth.register.fields.passwordHint') }}
        </p>
      </div>

      <!-- تکرار رمز عبور -->
      <div class="flex flex-col mt-5" :class="isRtl ? 'text-right' : 'text-left'">
        <label class="text-sm font-medium text-[#3D3E41] dark:text-dark-text-deep mb-2 font-roboto">{{ $t('auth.register.fields.passwordConfirm') }}</label>
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

      <!-- اطلاع‌رسانی پذیرش قوانین و مقررات -->
      <div class="mt-[30px]" :class="isRtl ? 'text-right' : 'text-left'">
        <TermsAgreement />
      </div>

      <!-- دکمه ثبت‌نام -->
      <div class="mt-[10px]">
        <AuthButton type="submit" :disabled="loading">
          <span class="mt-[8px] block text-[22px]">
            {{ loading ? $t('auth.register.submitting') : $t('auth.register.submit') }}
          </span>
        </AuthButton>
      </div>
    </form>

    <div class="mt-[20px] text-sm text-[#1a2333] dark:text-dark-text-deep font-bold cursor-pointer underline font-roboto">
      <NuxtLink :to="localePath('/auth/login')">{{ $t('auth.register.loginLink') }}</NuxtLink>
    </div>

  </div>
</template>