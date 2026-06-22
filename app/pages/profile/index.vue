<script setup>
import { ref, onMounted } from 'vue'
import {
  LockClosedIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/solid'

definePageMeta({
  layout: 'default'
})

const config = useRuntimeConfig()

const activeTab = ref('profile')
const loading = ref(false)

const userData = ref({
  full_name: '',
  username: '',
  mobile: '',
  email: '',
  avatar: ''
})

const passwordData = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
})

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

onMounted(async () => {
  if (!token()) {
    navigateTo('/auth/login')
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

    userData.value = response.data.user
  } catch (error) {
    console.error(error)

    if (error?.response?.status === 401) {
      localStorage.removeItem('access_token')
      navigateTo('/auth/login')
    }
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
        mobile: userData.value.mobile
      }
    })

    userData.value = response.data.user

    showToast(
      response.message ||
      'اطلاعات با موفقیت ذخیره شد',
      'success'
    )
  } catch (error) {
    console.error(error)

    showToast(
      error?.response?._data?.message ||
      'خطا در ذخیره اطلاعات'
    )
  } finally {
    loading.value = false
  }
}

const changePassword = async () => {
  if (
    !passwordData.value.current_password ||
    !passwordData.value.new_password ||
    !passwordData.value.new_password_confirmation
  ) {
    showToast('تمام فیلدها را تکمیل کنید')
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
      'رمز عبور با موفقیت تغییر کرد',
      'success'
    )
  } catch (error) {
    console.error(error)

    showToast(
      error?.response?._data?.message ||
      'خطا در تغییر رمز عبور'
    )
  } finally {
    loading.value = false
  }
}

const fileInput = ref(null)
const uploadAvatar = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  const token = localStorage.getItem('access_token')
  if (!token) return navigateTo('/auth/login')

  const formData = new FormData()
  formData.append('avatar', file)

  try {
    const res = await $fetch('/profile/avatar', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })

    userData.value.avatar = res.data.avatar_url

    showToast('آپلود موفق', 'success')

  } catch (err) {
    console.log('UPLOAD ERROR:', err)

    showToast(
      err?.response?._data?.message ||
      err?.data?.message ||
      'خطا در آپلود عکس'
    )
  }
}

const deleteAvatar = async () => {
  const token = localStorage.getItem('access_token')
  if (!token) return navigateTo('/auth/login')

  loadingAvatar.value = true

  try {
    await $fetch('/profile/avatar', {
      baseURL: config.public.apiBase,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    userData.value.avatar = ''

    showToast('عکس پروفایل حذف شد', 'success')

  } catch (err) {
    console.error(err)
    showToast(
      err?.response?._data?.message || 'خطا در حذف عکس'
    )
  } finally {
    loadingAvatar.value = false
  }
}

const logout = () => {
  localStorage.removeItem('access_token')
  navigateTo('/auth/login')
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 md:p-8">
    
    <div
      v-if="toast.message"
      :class="[
        'fixed top-5 left-5 p-4 rounded text-white z-50',
        toast.type === 'success'
          ? 'bg-green-500'
          : 'bg-red-500'
      ]"
    >
      {{ toast.message }}
    </div>

    <div class="bg-[#BFD1D5]/50 p-6 md:p-10 rounded-[40px] shadow-sm">
      
   <div class="flex justify-center w-full">
  <div class="bg-[#BFD1D5] p-6 rounded-3xl mb-8 flex items-center justify-end gap-6 w-fit">

    <img
      :src="userData.avatar || '/images/hero-imgae.png'"
      class="w-20 h-20 rounded-full border-4 border-white shadow-sm object-cover"
    />

    <div class="flex flex-col items-center gap-2">
      <span class="text-[#1a2333] font-bold text-sm mb-1">
        عکس پروفایل
      </span>

      <input
        type="file"
        ref="fileInput"
        class="hidden"
        accept="image/*"
        @change="uploadAvatar"
      />

      <button
        class="bg-[#2d6a66] text-white text-sm font-bold py-2 px-6 rounded-xl hover:bg-[#235652] transition"
        @click="fileInput?.click()"
        :disabled="loading"
      >
        انتخاب تصویر جدید
      </button>

      <button
        class="text-red-500 text-xs font-bold mt-1"
        @click="deleteAvatar"
        :disabled="loading || !userData.avatar"
      >
        حذف عکس
      </button>
    </div>

  </div>
</div>

      <div class="bg-[#BFD1D5] p-8 rounded-3xl mt-8">

        <!-- Profile Tab -->
        <div
          v-if="activeTab === 'profile'"
          class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
        >
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold text-[#1a2333] mr-1">
              نام کاربری
            </label>

            <div class="relative">
              <input
                v-model="userData.username"
                class="w-full h-14 bg-white rounded-[17px] px-4 pr-12"
              >

              <div class="absolute right-4 top-4">
                <UserIcon class="w-5 h-5" />
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold text-[#1a2333] mr-1">
              نام و نام خانوادگی
            </label>

            <div class="relative">
              <input
                v-model="userData.full_name"
                class="w-full h-14 bg-white rounded-[17px] px-4 pr-12"
              >

              <div class="absolute right-4 top-4">
                <UserIcon class="w-5 h-5" />
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold text-[#1a2333] mr-1">
              شماره موبایل
            </label>

            <div class="relative">
              <input
                v-model="userData.mobile"
                class="w-full h-14 bg-white rounded-[17px] px-4 pr-12"
              >

              <div class="absolute right-4 top-4">
                <PhoneIcon class="w-5 h-5" />
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold text-[#1a2333] mr-1">
              ایمیل
            </label>

            <div class="relative">
              <input
                v-model="userData.email"
                class="w-full h-14 bg-white rounded-[17px] px-4 pr-12"
              >

              <div class="absolute right-4 top-4">
                <EnvelopeIcon class="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <!-- Security Tab -->
        <div v-else class="space-y-6">
          <AuthInput
            label="رمز عبور فعلی"
            type="password"
            v-model="passwordData.current_password"
          >
            <template #icon>
              <LockClosedIcon class="w-5 h-5" />
            </template>
          </AuthInput>

          <AuthInput
            label="رمز عبور جدید"
            type="password"
            v-model="passwordData.new_password"
          >
            <template #icon>
              <LockClosedIcon class="w-5 h-5" />
            </template>
          </AuthInput>

          <AuthInput
            label="تکرار رمز عبور جدید"
            type="password"
            v-model="passwordData.new_password_confirmation"
          >
            <template #icon>
              <LockClosedIcon class="w-5 h-5" />
            </template>
          </AuthInput>

          <AuthButton
            class="h-12 !rounded-[15px]"
            @click="changePassword"
            :disabled="loading"
          >
            {{
              loading
                ? 'در حال تغییر رمز عبور...'
                : 'تغییر رمز عبور'
            }}
          </AuthButton>
        </div>

        <!-- Profile Actions -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10"
          v-if="activeTab === 'profile'"
        >
          <button
            class="bg-[#BFD1D5] border-2 border-[#1a2333] text-[#1a2333] py-2 rounded-[15px] font-bold h-12"
            @click="getProfile"
          >
            بازنشانی اطلاعات
          </button>

          <AuthButton
            class="h-12 !rounded-[15px]"
            @click="updateProfile"
            :disabled="loading"
          >
            {{
              loading
                ? 'در حال ذخیره...'
                : 'ذخیره اطلاعات'
            }}
          </AuthButton>
        </div>

        <!-- Bottom Menu -->
        <div
          class="flex justify-center gap-12 mt-8 text-[#1a2333] font-bold"
        >
          <button
            @click="activeTab = activeTab === 'profile' ? 'security' : 'profile'"
            class="flex items-center gap-2 hover:text-[#2d6a66] transition"
          >
            {{
              activeTab === 'profile'
                ? 'امنیت حساب کاربری'
                : 'پروفایل کاربری'
            }}

            <ShieldCheckIcon
              v-if="activeTab === 'profile'"
              class="w-6 h-6"
            />

            <UserCircleIcon
              v-else
              class="w-6 h-6"
            />
          </button>

          <button
            @click="logout"
            class="flex items-center gap-2 hover:text-[#2d6a66] transition"
          >
            خروج از حساب کاربری

            <ArrowRightOnRectangleIcon class="w-6 h-6" />
          </button>
        </div>

      </div>
    </div>
  </div>
</template>