<script setup>
import { ref, onMounted } from 'vue'
import { LockClosedIcon, UserIcon, EnvelopeIcon, PhoneIcon, ShieldCheckIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid'

definePageMeta({ layout: 'default' })

const config = useRuntimeConfig()
const activeTab = ref('profile')
const userData = ref({
  username: '',
  fullname: '',
  phone: '',
  email: ''
})

const passwordData = ref({
  'رمز عبور فعلی': '',
  'تکرار رمز عبور': '',
  'تکرار رمز عبور جدید': ''
})

// دریافت اطلاعات پروفایل هنگام لود شدن صفحه
onMounted(async () => {
  const token = localStorage.getItem('access_token');
  if (!token) return navigateTo('/auth/login');

  try {
    const response = await $fetch('/api/user/profile', {
      baseURL: config.public.apiBase,
      headers: { 'Authorization': `Bearer ${token}` }
    });
    userData.value = response.data;
  } catch (err) {
    console.error("خطا در دریافت پروفایل", err);
  }
});

// خروج از حساب
const logout = () => {
  localStorage.removeItem('access_token');
  navigateTo('/auth/login');
};
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 md:p-8">
    <div class="bg-[#BFD1D5]/50 p-6 md:p-10 rounded-[40px] shadow-sm">
      
      <div class="flex justify-center w-full">
        <div class="bg-[#BFD1D5] p-6 rounded-3xl mb-8 flex items-center justify-end gap-6 w-fit">
          <img src="/images/hero-imgae.png" class="w-20 h-20 rounded-full border-4 border-white shadow-sm" />
          <div class="flex flex-col items-center gap-2">
            <span class="text-[#1a2333] font-bold text-sm mb-1">عکس پروفایل</span>
            <button class="bg-[#2d6a66] text-white text-sm font-bold py-2 px-6 rounded-xl hover:bg-[#235652] transition">انتخاب تصویر جدید</button>
            <button class="text-[#1a2333]/60 text-xs font-bold mt-1">حذف عکس</button>
          </div>
        </div>
      </div>

      <div class="bg-[#BFD1D5] p-8 rounded-3xl mt-8">
        
        <div v-if="activeTab === 'profile'" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold text-[#1a2333] mr-1">نام کاربری</label>
            <div class="relative"><input v-model="userData.username" class="w-full h-14 bg-white rounded-[17px] px-4 pr-12"><div class="absolute right-4 top-4"><UserIcon class="w-5 h-5"/></div></div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold text-[#1a2333] mr-1">نام و نام خانوادگی</label>
            <div class="relative"><input v-model="userData.fullname" class="w-full h-14 bg-white rounded-[17px] px-4 pr-12"><div class="absolute right-4 top-4"><UserIcon class="w-5 h-5"/></div></div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold text-[#1a2333] mr-1">شماره موبایل</label>
            <div class="relative"><input v-model="userData.phone" class="w-full h-14 bg-white rounded-[17px] px-4 pr-12"><div class="absolute right-4 top-4"><PhoneIcon class="w-5 h-5"/></div></div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-bold text-[#1a2333] mr-1">ایمیل</label>
            <div class="relative"><input v-model="userData.email" class="w-full h-14 bg-white rounded-[17px] px-4 pr-12"><div class="absolute right-4 top-4"><EnvelopeIcon class="w-5 h-5"/></div></div>
          </div>
        </div>

        <div v-else class="space-y-6">
          <AuthInput v-for="field in ['رمز عبور فعلی', 'تکرار رمز عبور', 'تکرار رمز عبور جدید']" :key="field" :label="field" type="password" v-model="passwordData[field]">
            <template #icon><LockClosedIcon class="w-5 h-5"/></template>
          </AuthInput>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10" v-if="activeTab === 'profile'">
          <button class="bg-[#BFD1D5] border-2 border-[#1a2333] text-[#1a2333] py-2 rounded-[15px] font-bold h-12">ویرایش اطلاعات</button>
          <AuthButton class="h-12 !rounded-[15px]">ذخیره اطلاعات</AuthButton>
        </div>

        <div class="flex justify-center gap-12 mt-8 text-[#1a2333] font-bold">
          <button @click="activeTab = (activeTab === 'profile' ? 'security' : 'profile')" class="flex items-center gap-2 hover:text-[#2d6a66] transition">
            {{ activeTab === 'profile' ? 'امنیت حساب کاربری' : 'پروفایل کاربری' }}
            <ShieldCheckIcon v-if="activeTab === 'profile'" class="w-6 h-6" />
            <UserCircleIcon v-else class="w-6 h-6" />
          </button>
          <button @click="logout" class="flex items-center gap-2 hover:text-[#2d6a66] transition">
            خروج از حساب کاربری
            <ArrowRightOnRectangleIcon class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>