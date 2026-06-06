<script setup>
import { LockClosedIcon } from '@heroicons/vue/24/solid'
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  ShieldCheckIcon, 
  UserCircleIcon, 
  ArrowRightOnRectangleIcon 
} from '@heroicons/vue/24/solid'

definePageMeta({ layout: 'default' })
const activeTab = ref('profile')
const passwordData = ref({
  'رمز عبور فعلی': '',
  'تکرار رمز عبور': '',
  'تکرار رمز عبور جدید': ''
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 md:p-8">
    <div class="bg-[#BFD1D5]/50 p-6 md:p-10 rounded-[40px] shadow-sm">
      
      <!-- بخش عکس پروفایل (ثابت در هر دو حالت) -->
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

      <!-- محتوای متغیر (پروفایل یا امنیت) -->
      <div class="bg-[#BFD1D5] p-8 rounded-3xl mt-8">
        
        <!-- ۱. حالت پروفایل -->
<div v-if="activeTab === 'profile'" class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
  
  <!-- تعریف فیلدها همراه با آیکون مربوطه -->
  <div v-for="field in [
    { label: 'نام کاربری', icon: UserIcon },
    { label: 'نام و نام خانوادگی', icon: UserIcon },
    { label: 'شماره موبایل', icon: PhoneIcon },
    { label: 'ایمیل', icon: EnvelopeIcon }
  ]" :key="field.label" class="flex flex-col gap-2">
    
    <label class="text-sm font-bold text-[#1a2333] mr-1">{{ field.label }}</label>
    
    <div class="relative">
      <!-- Input -->
      <input 
        :type="field.label === 'ایمیل' ? 'email' : 'text'" 
        class="w-full h-14 bg-[#ffffff] rounded-[17px] px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#2d6a66]"
      >
      
      <!-- آیکون داینامیک -->
      <div class="absolute right-4 top-4 text-[#1a2333]">
        <component :is="field.icon" class="w-5 h-5"/>
      </div>
    </div>
  </div>
</div>

        <!-- ۲. حالت امنیت -->
<div v-else class="space-y-6">
  <AuthInput 
    v-for="field in ['رمز عبور فعلی', 'تکرار رمز عبور', 'تکرار رمز عبور جدید']" 
    :key="field"
    :label="field"
    type="password"
    v-model="passwordData[field]" 
  >
    <template #icon>
      <LockClosedIcon class="w-5 h-5"/>
    </template>
  </AuthInput>
</div>

        <!-- دکمه‌ها -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10" v-if="activeTab === 'profile'">
               <button class="bg-[#BFD1D5] text-[#1a2333] py-2 rounded-[15px] font-bold h-12">ویرایش اطلاعات</button>
          <AuthButton class="h-12 !rounded-[15px]">ذخیره اطلاعات</AuthButton>

        </div>

        <!-- لینک‌های پایین (سوئیچ تب‌ها) -->
      <div class="flex justify-center gap-12 mt-8 text-[#1a2333] font-bold">
  
  <!-- دکمه سوئیچ پروفایل/امنیت -->
  <button @click="activeTab = (activeTab === 'profile' ? 'security' : 'profile')" 
          class="flex items-center gap-2 hover:text-[#2d6a66] transition">
    
    {{ activeTab === 'profile' ? 'امنیت حساب کاربری' : 'پروفایل کاربری' }}
    
    <!-- استفاده از کامپوننت‌های کتابخانه -->
    <ShieldCheckIcon v-if="activeTab === 'profile'" class="w-6 h-6" />
    <UserCircleIcon v-else class="w-6 h-6" />
  </button>

  <!-- دکمه خروج -->
  <button class="flex items-center gap-2 hover:text-[#2d6a66] transition">
    خروج از حساب کاربری
    <ArrowRightOnRectangleIcon class="w-6 h-6" />
  </button>

</div>
      </div>
    </div>
  </div>
</template>