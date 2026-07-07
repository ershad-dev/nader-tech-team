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
  birth_date: '', // جدید
  national_code: '', // جدید
  province: '', // جدید
  address: '', // جدید
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
  <div class="max-w-[1110px] mx-auto p-4 md:p-8">
    
    <div
      v-if="toast.message"
      :class="[
        'fixed top-5 left-5 right-5 sm:right-auto p-3 sm:p-4 rounded text-white z-50 text-[13px] sm:text-[15px]',
        toast.type === 'success'
          ? 'bg-green-500'
          : 'bg-red-500'
      ]"
    >
      {{ toast.message }}
    </div>

    <div class="bg-[#2C73792B] p-4 sm:p-6 md:p-10 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] shadow-sm">
      
      <div class="flex justify-center w-full">
        <div class="bg-[#ffffff]/10 p-4 sm:p-5 md:p-6 rounded-[20px] sm:rounded-[24px] md:rounded-[27px] mb-6 sm:mb-8 flex flex-row items-start sm:items-center justify-start sm:justify-center gap-4 sm:gap-5 md:gap-6 w-full max-w-[652px] h-auto sm:h-[187px] shadow-xl" dir="rtl">

          <img
            :src="userData.avatar || '/images/avater-man.jpg'"
            class="w-[70px] h-[70px] sm:w-[120px] sm:h-[120px] md:w-[143px] md:h-[143px] rounded-full border-4 border-white shadow-sm object-cover flex-shrink-0"
          />

          <div class="flex flex-col items-start sm:items-center gap-2">
            <span class="text-[#0F184B] font-bold text-[13px] sm:text-[15px] md:text-[16px] mb-1">
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
              class="bg-[#2C7379] w-[120px] sm:w-[143px] h-[32px] sm:h-[39px] text-white text-[11px] sm:text-[15px] font-normal py-2 px-3 sm:px-6 rounded-[12px] sm:rounded-[17px] hover:bg-[#235652] transition font-roboto whitespace-nowrap flex items-center justify-center mt-[6px] sm:mt-[10px]"
              @click="fileInput?.click()"
              :disabled="loading"
            >
              انتخاب تصویر جدید
            </button>

            <button
              class="text-[#747893] text-[11px] sm:text-[15px] font-normal mt-[6px] sm:mt-[10px] font-roboto"
              @click="deleteAvatar"
              :disabled="loading || !userData.avatar"
            >
              حذف عکس
            </button>
          </div>

        </div>
      </div>

      <div class="bg-[#ffffff]/10 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-[0.5px] border-[#D9D9D9] shadow-xl mt-6 sm:mt-8">

        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'" 
             class="grid grid-cols-2 md:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-1 gap-y-3 sm:gap-y-4 font-roboto justify-items-center" 
             dir="rtl">
          
          <div class="flex flex-col gap-2 w-full sm:w-fit">
            <label class="text-[12px] sm:text-[15px] font-normal text-black mr-1">نام کاربری</label>
            <input v-model="userData.username" class="w-full sm:w-[300px] h-11 sm:h-14 bg-white rounded-[12px] sm:rounded-[17px] px-3 sm:px-4 text-[13px] sm:text-[15px]" />
          </div>

          <div class="flex flex-col gap-2 w-full sm:w-fit">
            <label class="text-[12px] sm:text-[15px] font-normal text-black mr-1">نام و نام خانوادگی</label>
            <input v-model="userData.full_name" class="w-full sm:w-[300px] h-11 sm:h-14 bg-white rounded-[12px] sm:rounded-[17px] px-3 sm:px-4 text-[13px] sm:text-[15px]" />
          </div>

          <div class="flex flex-col gap-2 w-full sm:w-fit">
            <label class="text-[12px] sm:text-[15px] font-normal text-black mr-1">شماره موبایل</label>
            <input v-model="userData.mobile" class="w-full sm:w-[300px] h-11 sm:h-14 bg-white rounded-[12px] sm:rounded-[17px] px-3 sm:px-4 text-[13px] sm:text-[15px]" />
          </div>

          <div class="flex flex-col gap-2 w-full sm:w-fit">
            <label class="text-[12px] sm:text-[15px] font-normal text-black mr-1">ایمیل</label>
            <input v-model="userData.email" class="w-full sm:w-[300px] h-11 sm:h-14 bg-white rounded-[12px] sm:rounded-[17px] px-3 sm:px-4 text-[13px] sm:text-[15px]" />
          </div>

          <div class="flex flex-col gap-2 w-full sm:w-fit">
            <label class="text-[12px] sm:text-[15px] font-normal text-black mr-1">تاریخ تولد</label>
            <input v-model="userData.birth_date" placeholder="1370/01/01" class="w-full sm:w-[300px] h-11 sm:h-14 bg-white rounded-[12px] sm:rounded-[17px] px-3 sm:px-4 text-[13px] sm:text-[15px]" />
          </div>

          <div class="flex flex-col gap-2 w-full sm:w-fit">
            <label class="text-[12px] sm:text-[15px] font-normal text-black mr-1">کد ملی</label>
            <input v-model="userData.national_code" class="w-full sm:w-[300px] h-11 sm:h-14 bg-white rounded-[12px] sm:rounded-[17px] px-3 sm:px-4 text-[13px] sm:text-[15px]" />
          </div>

          <div class="flex flex-col gap-2 w-full sm:w-fit">
            <label class="text-[12px] sm:text-[15px] font-normal text-black mr-1">استان</label>
            <input v-model="userData.province" class="w-full sm:w-[300px] h-11 sm:h-14 bg-white rounded-[12px] sm:rounded-[17px] px-3 sm:px-4 text-[13px] sm:text-[15px]" />
          </div>

          <div class="flex flex-col gap-2 w-full sm:w-fit">
            <label class="text-[12px] sm:text-[15px] font-normal text-black mr-1">کد پستی</label>
            <input v-model="userData.postal_code" class="w-full sm:w-[300px] h-11 sm:h-14 bg-white rounded-[12px] sm:rounded-[17px] px-3 sm:px-4 text-[13px] sm:text-[15px]" />
          </div>

          <!-- فیلد آدرس: همیشه تمام عرض و یک ستونه (حتی در موبایل) -->
 <!-- فیلد آدرس: همیشه تمام عرض و یک ستونه (حتی در موبایل)، دقیقاً هم‌عرض با دو اینپوت کنار هم در دسکتاپ -->
<div class="flex flex-col gap-2 w-full col-span-2 md:col-span-2 md:w-[604px]">
  <label class="text-[12px] sm:text-[15px] font-normal text-black mr-1">آدرس و نشانی</label>
  <textarea v-model="userData.address" class="w-full md:w-[604px] h-20 sm:h-24 bg-white rounded-[12px] sm:rounded-[17px] px-3 sm:px-4 py-3 sm:py-4 text-[13px] sm:text-[15px]"></textarea>
</div>

        </div>

        <!-- Security Tab -->
        <div v-else class="space-y-5 sm:space-y-6">
          <AuthInput
            label="رمز عبور فعلی"
            type="password"
            v-model="passwordData.current_password"
            class="[&>div>input]:h-[44px] [&>div>input]:py-4"
          >
            <template #icon>
              <LockClosedIcon class="w-5 h-5" />
            </template>
          </AuthInput>

          <AuthInput
            label="رمز عبور جدید"
            type="password"
            v-model="passwordData.new_password"
            class="[&>div>input]:h-[44px] [&>div>input]:py-4"
          >
            <template #icon>
              <LockClosedIcon class="w-5 h-5" />
            </template>
          </AuthInput>

          <AuthInput
            label="تکرار رمز عبور جدید"
            type="password"
            v-model="passwordData.new_password_confirmation"
            class="[&>div>input]:h-[44px] [&>div>input]:py-4"
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
          class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-10"
          v-if="activeTab === 'profile'"
        >
          <button
            class="bg-[#BFD1D5] border-2 border-[#1a2333] text-[#1a2333] py-2 rounded-[15px] font-bold h-12 text-[14px] sm:text-[16px]"
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
          class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 md:gap-12 mt-8 text-[#1a2333] font-bold text-[14px] sm:text-[16px]"
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
              class="w-5 h-5 sm:w-6 sm:h-6"
            />

            <UserCircleIcon
              v-else
              class="w-5 h-5 sm:w-6 sm:h-6"
            />
          </button>

          <button
            @click="logout"
            class="flex items-center gap-2 hover:text-[#2d6a66] transition"
          >
            خروج از حساب کاربری

            <ArrowRightOnRectangleIcon class="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

      </div>
    </div>
  </div>
</template>