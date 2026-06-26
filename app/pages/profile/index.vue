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
        'fixed top-5 left-5 p-4 rounded text-white z-50',
        toast.type === 'success'
          ? 'bg-green-500'
          : 'bg-red-500'
      ]"
    >
      {{ toast.message }}
    </div>

    <div class="bg-[#2C73792B] p-6 md:p-10 rounded-[40px] shadow-sm">
      
   <div class="flex justify-center w-full">
  <div class="bg-[#ffffff]/10 p-6 rounded-[27px] mb-8 flex flex-row items-center justify-center gap-6 w-[652px] h-[187px] shadow-xl">

    <img
      :src="userData.avatar || '/images/avater-man.jpg'"
      class="w-[143px] h-[143px] rounded-full border-4 border-white shadow-sm object-cover"
    />

    <div class="flex flex-col items-center gap-2">
      <span class="text-[#0F184B] font-bold text-[16px] mb-1">
        عکس پروفایل
      </span>

      <input
        type="file"
        ref="fileInput"
        class="hidden w-[143px] h-[143px]"
        accept="image/*"
        @change="uploadAvatar"
      />

<button
  class="bg-[#2C7379] w-[143px] h-[39px] text-white text-[15px] font-normal py-2 px-6 rounded-[17px] hover:bg-[#235652] transition font-roboto whitespace-nowrap flex items-center justify-center mt-[10px]"
  @click="fileInput?.click()"
  :disabled="loading"
>
  انتخاب تصویر جدید
</button>

      <button
        class="text-[#747893] text-[15px] font-normal mt-[10px] font-roboto"
        @click="deleteAvatar"
        :disabled="loading || !userData.avatar"
      >
        حذف عکس
      </button>
    </div>

  </div>
</div>

      <div class="bg-[#ffffff]/10 p-8 rounded-3xl border-[0.5px] border-[#D9D9D9] shadow-xl mt-8">

        <!-- Profile Tab -->
<div v-if="activeTab === 'profile'" 
     class="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-4 font-roboto justify-items-center" 
     dir="rtl">
  
  <div class="flex flex-col gap-2 w-fit"> <label class="text-[15px] font-normal text-black mr-1">نام کاربری</label>
    <input v-model="userData.username" class="w-[300px] h-14 bg-white rounded-[17px] px-4" />
  </div>

  <div class="flex flex-col gap-2 w-fit">
    <label class="text-[15px] font-normal text-black mr-1">نام و نام خانوادگی</label>
    <input v-model="userData.full_name" class="w-[300px] h-14 bg-white rounded-[17px] px-4" />
  </div>

  <div class="flex flex-col gap-2 w-fit">
    <label class="text-[15px] font-normal text-black mr-1">شماره موبایل</label>
    <input v-model="userData.mobile" class="w-[300px] h-14 bg-white rounded-[17px] px-4" />
  </div>

  <div class="flex flex-col gap-2 w-fit">
    <label class="text-[15px] font-normal text-black mr-1">ایمیل</label>
    <input v-model="userData.email" class="w-[300px] h-14 bg-white rounded-[17px] px-4" />
  </div>

  <div class="flex flex-col gap-2 w-fit">
    <label class="text-[15px] font-normal text-black mr-1">تاریخ تولد</label>
    <input v-model="userData.birth_date" placeholder="1370/01/01" class="w-[300px] h-14 bg-white rounded-[17px] px-4" />
  </div>

  <div class="flex flex-col gap-2 w-fit">
    <label class="text-[15px] font-normal text-black mr-1">کد ملی</label>
    <input v-model="userData.national_code" class="w-[300px] h-14 bg-white rounded-[17px] px-4" />
  </div>

  <div class="flex flex-col gap-2 w-fit">
    <label class="text-[15px] font-normal text-black mr-1">استان</label>
    <input v-model="userData.province" class="w-[300px] h-14 bg-white rounded-[17px] " />
  </div>

  <div class="flex flex-col gap-2 w-fit">
    <label class="text-[15px] font-normal text-black mr-1">کد پستی</label>
    <input v-model="userData.postal_code" class="w-[300px] h-14 bg-white rounded-[17px] " />
  </div>

  <div class="flex flex-col gap-2 w-[625px] md:col-span-2"> <label class="text-[15px] font-normal text-black mr-1">آدرس و نشانی</label>
    <textarea v-model="userData.address" class="w-[689px] h-24 bg-white rounded-[17px] px-4 py-4"></textarea>
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