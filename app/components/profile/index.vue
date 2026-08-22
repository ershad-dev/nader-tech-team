<script setup>
import { ref, onMounted, computed } from 'vue'
import {
  LockClosedIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  DevicePhoneMobileIcon,
  PhoneIcon
} from '@heroicons/vue/24/solid'

definePageMeta({
  layout: 'default'
})

const config = useRuntimeConfig()
const { t, locale, localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

const activeTab = ref('profile') // 'profile' | 'security' | 'changeMobile'
const loading = ref(false)
const loadingAvatar = ref(false)

const isEditing = ref(false)

const userData = ref({
  full_name: '',
  username: '',
  mobile: '',
  email: '',
  birth_date: '',
  national_code: '',
  postal_code: '',
  province: '',
  address: '',
  avatar: ''
})

const passwordData = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
})

// فیلد شماره‌ی جدید برای فرم «تغییر شماره موبایل»
const newMobile = ref('')

const toast = ref({
  message: '',
  type: ''
})

const showToast = (message, type = 'error') => {
  toast.value = {
    message,
    type
  }

  setTimeout(() => {
    toast.value = {
      message: '',
      type: ''
    }
  }, 4000)
}

const token = () => localStorage.getItem('access_token')

const getAvatarUrl = (path) => {
  if (!path) return '/images/avater-man.jpg'
  if (/^https?:\/\//.test(path)) return path

  const root = (config.public.apiBase || '').replace(/\/api\/?$/, '')
  return root + path
}

onMounted(async () => {
  if (!token()) {
    navigateTo(localePath('/auth/login'))
    return
  }

  await getProfile()
})

const getProfile = async () => {
  try {
    const response = await $fetch('/profile', {
      baseURL: config.public.apiBase,
      headers: {
        Authorization: `Bearer ${token()}`,
        Accept: 'application/json'
      }
    })

    userData.value = { ...userData.value, ...response.data }
  } catch (error) {
    console.error(error)

    if (error?.response?.status === 401) {
      localStorage.removeItem('access_token')
      navigateTo(localePath('/auth/login'))
    }
  } finally {
    isEditing.value = false
  }
}

const updateProfile = async () => {
  loading.value = true

  try {
    const response = await $fetch('/profile', {
      baseURL: config.public.apiBase,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token()}`,
        Accept: 'application/json'
      },
      body: {
        full_name: userData.value.full_name,
        username: userData.value.username,
        email: userData.value.email,
        mobile: userData.value.mobile,
        birth_date: userData.value.birth_date,
        national_code: userData.value.national_code,
        postal_code: userData.value.postal_code,
        province: userData.value.province,
        address: userData.value.address
      }
    })

    userData.value = { ...userData.value, ...response.data }

    showToast(
      response.message ||
      t('profile.messages.profileSaved'),
      'success'
    )

    isEditing.value = false
  } catch (error) {
    console.error(error)

    showToast(
      error?.response?._data?.message ||
      t('profile.messages.profileSaveError')
    )
  } finally {
    loading.value = false
  }
}

const cancelEdit = async () => {
  await getProfile()
}

// تغییر شماره موبایل (بدون OTP)
// طبق Swagger، PUT /api/profile هر ۴ فیلد رسمی (full_name, username,
// email, mobile) را با هم می‌خواهد، برای همین بقیه‌ی فیلدها از مقادیر
// فعلی userData پر می‌شوند و فقط mobile عوض می‌شود.
const changeMobile = async () => {
  if (!newMobile.value.trim()) {
    showToast(t('profile.changeMobile.enterNewMobile'))
    return
  }

  loading.value = true

  try {
    const response = await $fetch('/profile', {
      baseURL: config.public.apiBase,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token()}`,
        Accept: 'application/json'
      },
      body: {
        full_name: userData.value.full_name,
        username: userData.value.username,
        email: userData.value.email,
        mobile: newMobile.value.trim()
      }
    })

    userData.value = { ...userData.value, ...response.data }

    showToast(
      response.message ||
      t('profile.messages.mobileChanged'),
      'success'
    )

    newMobile.value = ''
    activeTab.value = 'profile'
  } catch (error) {
    console.error(error)

    const errors = error?.response?._data?.errors
    const mobileError = errors?.mobile?.[0]

    showToast(
      mobileError ||
      error?.response?._data?.message ||
      t('profile.messages.mobileChangeError')
    )
  } finally {
    loading.value = false
  }
}

const cancelChangeMobile = () => {
  newMobile.value = ''
  activeTab.value = 'profile'
}

const changePassword = async () => {
  if (
    !passwordData.value.current_password ||
    !passwordData.value.new_password ||
    !passwordData.value.new_password_confirmation
  ) {
    showToast(t('profile.messages.fillAllFields'))
    return
  }

  loading.value = true

  try {
    const response = await $fetch(
      '/profile/change-password',
      {
        baseURL: config.public.apiBase,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token()}`,
          Accept: 'application/json'
        },
        body: {
          current_password:
            passwordData.value.current_password,

          new_password:
            passwordData.value.new_password,

          new_password_confirmation:
            passwordData.value
              .new_password_confirmation
        }
      }
    )

    passwordData.value = {
      current_password: '',
      new_password: '',
      new_password_confirmation: ''
    }

    showToast(
      response.message ||
      t('profile.messages.passwordChanged'),
      'success'
    )
  } catch (error) {
    console.error(error)

    const errors = error?.response?._data?.errors
    const fieldError =
      errors?.current_password?.[0] ||
      errors?.new_password?.[0] ||
      errors?.new_password_confirmation?.[0]

    showToast(
      fieldError ||
      error?.response?._data?.message ||
      t('profile.messages.passwordChangeError')
    )
  } finally {
    loading.value = false
  }
}

const fileInput = ref(null)
const uploadAvatar = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  if (!token()) return navigateTo(localePath('/auth/login'))

  const formData = new FormData()
  formData.append('avatar', file)

  loadingAvatar.value = true

  try {
    const res = await $fetch('/profile/avatar', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token()}`,
        Accept: 'application/json'
      }
    })

    userData.value.avatar = res.data.avatar_url

    showToast(res.message || t('profile.messages.uploadSuccess'), 'success')

  } catch (err) {
    console.error('UPLOAD ERROR:', err)

    const avatarError = err?.response?._data?.errors?.avatar?.[0]

    showToast(
      avatarError ||
      err?.response?._data?.message ||
      err?.data?.message ||
      t('profile.messages.uploadError')
    )
  } finally {
    loadingAvatar.value = false
  }
}

const deleteAvatar = async () => {
  if (!token()) return navigateTo(localePath('/auth/login'))

  loadingAvatar.value = true

  try {
    const res = await $fetch('/profile/avatar', {
      baseURL: config.public.apiBase,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token()}`,
        Accept: 'application/json'
      }
    })

    userData.value.avatar = ''

    showToast(res.message || t('profile.messages.avatarDeleted'), 'success')

  } catch (err) {
    console.error(err)
    showToast(
      err?.response?._data?.message || t('profile.messages.avatarDeleteError')
    )
  } finally {
    loadingAvatar.value = false
  }
}

const logout = () => {
  localStorage.removeItem('access_token')
  navigateTo(localePath('/auth/login'))
}
</script>

<template>
  <div class="max-w-[1110px] 2xl:max-w-[1400px] mx-auto p-4 md:p-8 2xl:p-12 mt-30">

    <div
      v-if="toast.message"
      :class="[
        'fixed top-20 sm:top-24 left-5 right-5 sm:right-auto p-3 sm:p-4 2xl:p-5 rounded text-white z-[9999] text-[13px] sm:text-[15px] 2xl:text-[17px]',
        toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
      ]"
    >
      {{ toast.message }}
    </div>

    <div class="bg-[#2C73792B] p-4 sm:p-6 md:p-10 2xl:p-14 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] 2xl:rounded-[48px] shadow-sm mt-[50px]">

      <div class="flex justify-center w-full">
        <div class="bg-[#ffffff]/10 p-4 sm:p-5 md:p-6 2xl:p-8 rounded-[20px] sm:rounded-[24px] md:rounded-[27px] 2xl:rounded-[32px] mb-6 sm:mb-8 2xl:mb-10 flex flex-row items-start sm:items-center justify-start sm:justify-center gap-4 sm:gap-5 md:gap-6 2xl:gap-8 w-full max-w-[652px] 2xl:max-w-[760px] h-auto sm:h-[187px] 2xl:h-[210px] shadow-xl" :dir="isRtl ? 'rtl' : 'ltr'">

          <img
            :src="getAvatarUrl(userData.avatar)"
            class="w-[70px] h-[70px] sm:w-[120px] sm:h-[120px] md:w-[143px] md:h-[143px] 2xl:w-[165px] 2xl:h-[165px] rounded-full border-4 border-white shadow-sm object-cover flex-shrink-0"
          />

          <div class="flex flex-col items-start sm:items-center gap-2 2xl:gap-3">
            <span class="text-[#0F184B] font-bold text-[13px] sm:text-[15px] md:text-[16px] 2xl:text-[18px] mb-1">
              {{ $t('profile.avatar.title') }}
            </span>

            <input
              type="file"
              ref="fileInput"
              class="hidden"
              accept="image/*"
              @change="uploadAvatar"
            />

            <button
              class="bg-[#2C7379] w-[120px] sm:w-[143px] 2xl:w-[165px] h-[32px] sm:h-[39px] 2xl:h-[46px] text-white text-[11px] sm:text-[15px] 2xl:text-[17px] font-normal py-2 px-3 sm:px-6 rounded-[12px] sm:rounded-[17px] hover:bg-[#235652] transition font-roboto whitespace-nowrap flex items-center justify-center mt-[6px] sm:mt-[10px]"
              @click="fileInput?.click()"
              :disabled="loadingAvatar"
            >
              {{ $t('profile.avatar.selectNew') }}
            </button>

            <button
              class="text-[#747893] text-[11px] sm:text-[15px] 2xl:text-[17px] font-normal mt-[6px] sm:mt-[10px] font-roboto whitespace-nowrap"
              @click="deleteAvatar"
              :disabled="loadingAvatar || !userData.avatar"
            >
              {{ $t('profile.avatar.delete') }}
            </button>
          </div>

        </div>
      </div>

      <div class="bg-[#ffffff]/10 p-4 sm:p-6 md:p-8 2xl:p-12 rounded-2xl sm:rounded-3xl 2xl:rounded-[40px] border-[0.5px] border-[#D9D9D9] shadow-xl mt-6 sm:mt-8 2xl:mt-10">

<!-- Profile Tab -->
<div v-if="activeTab === 'profile'"
     class="flex flex-col lg:grid lg:grid-cols-2 2xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-x-6 2xl:gap-x-10 lg:gap-y-5 2xl:gap-y-8 font-roboto items-center lg:justify-items-center w-full"
     :dir="isRtl ? 'rtl' : 'ltr'">

  <div class="flex flex-col gap-2 2xl:gap-3 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-none lg:w-fit">
    <label class="text-[12px] sm:text-[15px] 2xl:text-[17px] font-normal text-black mr-1">{{ $t('profile.fields.username') }}</label>
    <input
      v-model="userData.username"
      :readonly="!isEditing"
      :class="[
        'w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:w-[300px] 2xl:w-[340px] h-11 sm:h-14 2xl:h-16 rounded-[12px] sm:rounded-[17px] 2xl:rounded-[20px] px-3 sm:px-4 2xl:px-5 text-[13px] sm:text-[15px] 2xl:text-[17px] text-black',
        isEditing ? 'bg-white' : 'bg-white/70 cursor-not-allowed'
      ]"
    />
  </div>

  <div class="flex flex-col gap-2 2xl:gap-3 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-none lg:w-fit">
    <label class="text-[12px] sm:text-[15px] 2xl:text-[17px] font-normal text-black mr-1">{{ $t('profile.fields.fullName') }}</label>
    <input
      v-model="userData.full_name"
      :readonly="!isEditing"
      :class="[
        'w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:w-[300px] 2xl:w-[340px] h-11 sm:h-14 2xl:h-16 rounded-[12px] sm:rounded-[17px] 2xl:rounded-[20px] px-3 sm:px-4 2xl:px-5 text-[13px] sm:text-[15px] 2xl:text-[17px] text-black',
        isEditing ? 'bg-white' : 'bg-white/70 cursor-not-allowed'
      ]"
    />
  </div>

  <!-- شماره موبایل همیشه readonly است؛ تغییرش فقط از تب
       «تغییر شماره موبایل» ممکن است -->
  <div class="flex flex-col gap-2 2xl:gap-3 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-none lg:w-fit">
    <label class="text-[12px] sm:text-[15px] 2xl:text-[17px] font-normal text-black mr-1">{{ $t('profile.fields.mobile') }}</label>
    <input
      v-model="userData.mobile"
      readonly
      class="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:w-[300px] 2xl:w-[340px] h-11 sm:h-14 2xl:h-16 bg-white/70 rounded-[12px] sm:rounded-[17px] 2xl:rounded-[20px] px-3 sm:px-4 2xl:px-5 text-[13px] sm:text-[15px] 2xl:text-[17px] cursor-not-allowed text-black"
    />
  </div>

  <div class="flex flex-col gap-2 2xl:gap-3 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-none lg:w-fit">
    <label class="text-[12px] sm:text-[15px] 2xl:text-[17px] font-normal text-black mr-1">{{ $t('profile.fields.email') }}</label>
    <input
      v-model="userData.email"
      :readonly="!isEditing"
      :class="[
        'w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:w-[300px] 2xl:w-[340px] h-11 sm:h-14 2xl:h-16 rounded-[12px] sm:rounded-[17px] 2xl:rounded-[20px] px-3 sm:px-4 2xl:px-5 text-[13px] sm:text-[15px] 2xl:text-[17px] text-black',
        isEditing ? 'bg-white' : 'bg-white/70 cursor-not-allowed'
      ]"
    />
  </div>

  <div class="flex flex-col gap-2 2xl:gap-3 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-none lg:w-fit">
    <label class="text-[12px] sm:text-[15px] 2xl:text-[17px] font-normal text-black mr-1">{{ $t('profile.fields.birthDate') }}</label>
    <input
      v-model="userData.birth_date"
      placeholder="1370/01/01"
      :readonly="!isEditing"
      :class="[
        'w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:w-[300px] 2xl:w-[340px] h-11 sm:h-14 2xl:h-16 rounded-[12px] sm:rounded-[17px] 2xl:rounded-[20px] px-3 sm:px-4 2xl:px-5 text-[13px] sm:text-[15px] 2xl:text-[17px] text-black',
        isEditing ? 'bg-white' : 'bg-white/70 cursor-not-allowed'
      ]"
    />
  </div>

  <div class="flex flex-col gap-2 2xl:gap-3 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-none lg:w-fit">
    <label class="text-[12px] sm:text-[15px] 2xl:text-[17px] font-normal text-black mr-1">{{ $t('profile.fields.nationalCode') }}</label>
    <input
      v-model="userData.national_code"
      :readonly="!isEditing"
      :class="[
        'w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:w-[300px] 2xl:w-[340px] h-11 sm:h-14 2xl:h-16 rounded-[12px] sm:rounded-[17px] 2xl:rounded-[20px] px-3 sm:px-4 2xl:px-5 text-[13px] sm:text-[15px] 2xl:text-[17px] text-black',
        isEditing ? 'bg-white' : 'bg-white/70 cursor-not-allowed'
      ]"
    />
  </div>

  <div class="flex flex-col gap-2 2xl:gap-3 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-none lg:w-fit">
    <label class="text-[12px] sm:text-[15px] 2xl:text-[17px] font-normal text-black mr-1">{{ $t('profile.fields.province') }}</label>
    <input
      v-model="userData.province"
      :readonly="!isEditing"
      :class="[
        'w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:w-[300px] 2xl:w-[340px] h-11 sm:h-14 2xl:h-16 rounded-[12px] sm:rounded-[17px] 2xl:rounded-[20px] px-3 sm:px-4 2xl:px-5 text-[13px] sm:text-[15px] 2xl:text-[17px] text-black',
        isEditing ? 'bg-white' : 'bg-white/70 cursor-not-allowed'
      ]"
    />
  </div>

  <div class="flex flex-col gap-2 2xl:gap-3 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-none lg:w-fit">
    <label class="text-[12px] sm:text-[15px] 2xl:text-[17px] font-normal text-black mr-1">{{ $t('profile.fields.postalCode') }}</label>
    <input
      v-model="userData.postal_code"
      :readonly="!isEditing"
      :class="[
        'w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:w-[300px] 2xl:w-[340px] h-11 sm:h-14 2xl:h-16 rounded-[12px] sm:rounded-[17px] 2xl:rounded-[20px] px-3 sm:px-4 2xl:px-5 text-[13px] sm:text-[15px] 2xl:text-[17px] text-black',
        isEditing ? 'bg-white' : 'bg-white/70 cursor-not-allowed'
      ]"
    />
  </div>

  <div class="flex flex-col gap-2 2xl:gap-3 w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-none lg:col-span-2 2xl:col-span-1 lg:w-[604px] 2xl:w-[340px]">
    <label class="text-[12px] sm:text-[15px] 2xl:text-[17px] font-normal text-black mr-1">{{ $t('profile.fields.address') }}</label>
    <textarea
      v-model="userData.address"
      :readonly="!isEditing"
      :class="[
        'w-full max-w-[420px] sm:max-w-[480px] md:max-w-[560px] lg:w-[604px] 2xl:w-[340px] h-20 sm:h-24 2xl:h-28 rounded-[12px] sm:rounded-[17px] 2xl:rounded-[20px] px-3 sm:px-4 2xl:px-5 py-3 sm:py-4 2xl:py-5 text-[13px] sm:text-[15px] 2xl:text-[17px] text-black',
        isEditing ? 'bg-white' : 'bg-white/70 cursor-not-allowed'
      ]"
    ></textarea>
  </div>

</div>

        <!-- Security Tab -->
        <div v-else-if="activeTab === 'security'" class="space-y-5 sm:space-y-6 2xl:space-y-8 max-w-[500px] 2xl:max-w-[600px] mx-auto">
          <AuthInput
            :label="$t('profile.security.currentPassword')"
            type="password"
            v-model="passwordData.current_password"
            class="[&>div>input]:h-[44px] 2xl:[&>div>input]:h-[54px] [&>div>input]:py-4 2xl:[&>label]:text-[17px]"
          />

          <AuthInput
            :label="$t('profile.security.newPassword')"
            type="password"
            v-model="passwordData.new_password"
            class="[&>div>input]:h-[44px] 2xl:[&>div>input]:h-[54px] [&>div>input]:py-4 2xl:[&>label]:text-[17px]"
          />

          <AuthInput
            :label="$t('profile.security.confirmNewPassword')"
            type="password"
            v-model="passwordData.new_password_confirmation"
            class="[&>div>input]:h-[44px] 2xl:[&>div>input]:h-[54px] [&>div>input]:py-4 2xl:[&>label]:text-[17px]"
          />

          <AuthButton
            class="h-12 2xl:h-14 !rounded-[15px] 2xl:text-[17px] whitespace-nowrap"
            @click="changePassword"
            :disabled="loading"
          >
            {{
              loading
                ? $t('profile.security.changing')
                : $t('profile.security.changeButton')
            }}
          </AuthButton>
        </div>

<!-- Change Mobile Tab -->
<div v-else-if="activeTab === 'changeMobile'" class="space-y-6 sm:space-y-10 2xl:space-y-12 mt-10 mb-16 sm:mt-[100px] sm:mb-[100px] px-4 sm:px-0" :dir="isRtl ? 'rtl' : 'ltr'">
  <div class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 2xl:gap-6 w-full">
    <label class="text-[13px] sm:text-[15px] 2xl:text-[17px] font-normal text-black whitespace-nowrap font-roboto">
      {{ $t('profile.changeMobile.label') }}
    </label>

    <div class="relative w-full sm:w-[570px] 2xl:w-[650px]">
      <input
        v-model="newMobile"
        placeholder="09xxxxxxxxx"
        :class="[
          'w-full h-11 sm:h-14 2xl:h-16 bg-white rounded-[17px] 2xl:rounded-[20px] px-4 2xl:px-5 text-[13px] sm:text-[15px] 2xl:text-[17px] shadow-sm text-black',
          isRtl ? 'pr-11 2xl:pr-12' : 'pl-11 2xl:pl-12'
        ]"
      />
      <PhoneIcon
        class="w-5 h-5 2xl:w-6 2xl:h-6 text-[#1a2333] absolute top-1/2 -translate-y-1/2"
        :class="isRtl ? 'right-4' : 'left-4'"
      />
    </div>

    <span class="hidden sm:inline-block text-[15px] 2xl:text-[17px] invisible whitespace-nowrap" aria-hidden="true">
      {{ $t('profile.changeMobile.label') }}
    </span>
  </div>

  <AuthButton
    class="h-12 2xl:h-14 !rounded-full w-full sm:w-[420px] 2xl:w-[480px] 2xl:text-[17px] mx-auto block whitespace-nowrap"
    @click="changeMobile"
    :disabled="loading"
  >
    {{
      loading
        ? $t('profile.changeMobile.saving')
        : $t('profile.changeMobile.submit')
    }}
  </AuthButton>
</div>

<!-- Bottom Menu -->
<div
  class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 md:gap-12 2xl:gap-16 mt-8 2xl:mt-12 text-[#1a2333] dark:text-white font-bold text-[14px] sm:text-[16px] 2xl:text-[18px]"
>
  <button
    @click="activeTab = activeTab === 'profile' ? 'security' : 'profile'"
    class="flex items-center gap-2 2xl:gap-3 hover:text-[#2d6a66] dark:hover:text-[#7fd1c9] transition whitespace-nowrap"
  >
    {{
      activeTab === 'profile'
        ? $t('profile.menu.security')
        : $t('profile.menu.profile')
    }}

    <ShieldCheckIcon
      v-if="activeTab === 'profile'"
      class="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7"
    />

    <UserCircleIcon
      v-else
      class="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7"
    />
  </button>

  <button
    @click="activeTab = 'changeMobile'; newMobile = ''"
    class="flex items-center gap-2 2xl:gap-3 hover:text-[#2d6a66] dark:hover:text-[#7fd1c9] transition whitespace-nowrap"
  >
    {{ $t('profile.menu.changeMobile') }}

    <DevicePhoneMobileIcon class="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7" />
  </button>

  <button
    @click="logout"
    class="flex items-center gap-2 2xl:gap-3 hover:text-[#2d6a66] dark:hover:text-[#7fd1c9] transition whitespace-nowrap"
  >
    {{ $t('profile.menu.logout') }}

    <ArrowRightOnRectangleIcon class="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7" />
  </button>
</div>

        <!-- Profile Actions -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 2xl:gap-6 mt-8 sm:mt-10 2xl:mt-14 max-w-[700px] 2xl:max-w-[820px] mx-auto"
          v-if="activeTab === 'profile'"
        >
          <template v-if="!isEditing">
            <button
              class="bg-[#2C7379] text-white py-2 rounded-[15px] 2xl:rounded-[18px] font-bold h-12 2xl:h-14 text-[14px] sm:text-[16px] 2xl:text-[18px] col-span-1 md:col-span-2 hover:bg-[#235652] transition whitespace-nowrap"
              @click="isEditing = true"
            >
              {{ $t('profile.actions.edit') }}
            </button>
          </template>

          <template v-else>
            <button
              class="bg-[#BFD1D5] border-2 border-[#1a2333] text-[#1a2333] py-2 rounded-[15px] 2xl:rounded-[18px] font-bold h-12 2xl:h-14 text-[14px] sm:text-[16px] 2xl:text-[18px] whitespace-nowrap"
              @click="cancelEdit"
              :disabled="loading"
            >
              {{ $t('profile.actions.cancel') }}
            </button>

            <AuthButton
              class="h-12 2xl:h-14 !rounded-[15px] 2xl:text-[18px] whitespace-nowrap"
              @click="updateProfile"
              :disabled="loading"
            >
              {{
                loading
                  ? $t('profile.actions.saving')
                  : $t('profile.actions.save')
              }}
            </AuthButton>
          </template>
        </div>

      </div>
    </div>
  </div>
</template>