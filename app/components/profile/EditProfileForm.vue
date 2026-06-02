<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-black text-slate-100 mb-2">ویرایش اطلاعات حساب کاربری</h2>
      <p class="text-sm text-slate-400">اطلاعات فردی و رمز عبور خود را در این بخش بروزرسانی کنید.</p>
    </div>

    <form @submit.prevent="handleUpdateProfile" class="space-y-6 mb-10 pb-10 border-b border-slate-800">
      <h3 class="text-sm font-bold text-emerald-400 flex items-center gap-2">
        <span>👤</span> مشخصات فردی
      </h3>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium mb-1 text-slate-400">نام و نام خانوادگی</label>
          <input 
            v-model="profileData.name" 
            type="text" 
            class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 transition text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-slate-500">شماره موبایل (غیرقابل تغییر)</label>
          <input 
            v-model="profileData.phone" 
            type="text" 
            disabled
            class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-500 text-sm cursor-not-allowed text-left dir-ltr"
          />
        </div>
      </div>

      <button 
        type="submit" 
        :disabled="isProfileLoading"
        class="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800 text-slate-950 font-bold rounded-lg text-sm transition"
      >
        <span v-if="isProfileLoading">در حال ذخیره‌سازی...</span>
        <span v-else>ذخیره تغییرات فردی</span>
      </button>
    </form>

    <form @submit.prevent="handleChangePassword" class="space-y-6">
      <h3 class="text-sm font-bold text-emerald-400 flex items-center gap-2">
        <span>🔒</span> تغییر رمز عبور
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium mb-1 text-slate-400">کلمه عبور فعلی</label>
          <input 
            v-model="passwordData.currentPassword" 
            type="password" 
            class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 transition text-sm"
          />
          <p v-if="passwordErrors.currentPassword" class="text-xs text-red-500 mt-1">{{ passwordErrors.currentPassword }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-slate-400">کلمه عبور جدید</label>
          <input 
            v-model="passwordData.newPassword" 
            type="password" 
            class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 transition text-sm"
          />
          <p v-if="passwordErrors.newPassword" class="text-xs text-red-500 mt-1">{{ passwordErrors.newPassword }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-slate-400">تکرار کلمه عبور جدید</label>
          <input 
            v-model="passwordData.confirmPassword" 
            type="password" 
            class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 transition text-sm"
          />
          <p v-if="passwordErrors.confirmPassword" class="text-xs text-red-500 mt-1">{{ passwordErrors.confirmPassword }}</p>
        </div>
      </div>

      <button 
        type="submit" 
        :disabled="isPasswordLoading"
        class="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:bg-slate-900 text-slate-200 font-bold rounded-lg text-sm transition"
      >
        <span v-if="isPasswordLoading">در حال تغییر رمز...</span>
        <span v-else>بروزرسانی رمز عبور</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const isProfileLoading = ref(false)
const isPasswordLoading = ref(false)

// دیتای پروفایل (اطلاعات اولیه از سرور لود خواهند شد)
const profileData = reactive({
  name: 'ارشاد خادمی',
  phone: '09123456789'
})

// دیتای پسورد
const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordErrors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// ۱. متد ثبت مشخصات فردی
const handleUpdateProfile = async () => {
  if (!profileData.name.trim()) return alert('نام نمی‌تواند خالی باشد.')
  
  isProfileLoading.value = true
  try {
    console.log('ارسال نام جدید به لاراول کسری:', profileData.name)
    await new Promise(resolve => setTimeout(resolve, 1500))
    alert('مشخصات فردی شما با موفقیت بروزرسانی شد.')
  } catch (err) {
    console.error(err)
  } finally {
    isProfileLoading.value = false
  }
}

// ۲. متد تغییر رمز عبور با ولیدیشن دقیق
const handleChangePassword = async () => {
  let isValid = true
  passwordErrors.currentPassword = ''
  passwordErrors.newPassword = ''
  passwordErrors.confirmPassword = ''

  if (!passwordData.currentPassword) {
    passwordErrors.currentPassword = 'رمز عبور فعلی الزامی است.'
    isValid = false
  }
  if (!passwordData.newPassword) {
    passwordErrors.newPassword = 'رمز عبور جدید الزامی است.'
    isValid = false
  } else if (passwordData.newPassword.length < 8) {
    passwordErrors.newPassword = 'رمز عبور جدید باید حداقل ۸ کاراکتر باشد.'
    isValid = false
  }
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    passwordErrors.confirmPassword = 'تکرار رمز عبور با رمز عبور جدید مطابقت ندارد.'
    isValid = false
  }

  if (!isValid) return

  isPasswordLoading.value = true
  try {
    console.log('ارسال پسوردهای جدید به سمت بک‌اندر...')
    await new Promise(resolve => setTimeout(resolve, 2000))
    alert('رمز عبور شما با موفقیت تغییر کرد.')
    
    // ریست کردن فرم پسورد
    passwordData.currentPassword = ''
    passwordData.newPassword = ''
    passwordData.confirmPassword = ''
  } catch (err) {
    console.error(err)
  } finally {
    isPasswordLoading.value = false
  }
}
</script>