<template>
  <section id="contact-section" class="w-full py-20 px-4 bg-slate-950 text-white">
    <div class="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10">
      
      <div class="text-center mb-10">
        <h2 class="text-2xl md:text-3xl font-black mb-3">ثبت درخواست پروژه / مشاوره</h2>
        <p class="text-sm text-slate-400">
          مشخصات خود و ایده‌تان را بنویسید؛ ما در کوتاه‌ترین زمان برای بررسی جزییات با شما تماس می‌گیریم.
        </p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label class="block text-sm font-medium mb-1 text-slate-400">نام و نام خانوادگی</label>
            <input 
              v-model="formData.name" 
              type="text" 
              placeholder="مثال: علی علوی"
              class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 transition"
            />
            <p v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 text-slate-400">شماره موبایل</label>
            <input 
              v-model="formData.phone" 
              type="tel" 
              placeholder="09123456789"
              class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 transition text-left dir-ltr"
            />
            <p v-if="errors.phone" class="text-xs text-red-500 mt-1">{{ errors.phone }}</p>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium mb-1 text-slate-400">موضوع یا نوع پروژه</label>
          <select 
            v-model="formData.projectType"
            class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 transition appearance-none cursor-pointer"
          >
            <option value="">انتخاب کنید...</option>
            <option value="web">وب‌سایت یا اپلیکیشن تحت وب</option>
            <option value="telegram_bot">ربات اختصاصی تلگرام</option>
            <option value="lottery_system">سامانه قرعه‌کشی و ایونت</option>
            <option value="consulting">مشاوره فنی</option>
          </select>
          <p v-if="errors.projectType" class="text-xs text-red-500 mt-1">{{ errors.projectType }}</p>
        </div>

        <div class="mb-8">
          <label class="block text-sm font-medium mb-1 text-slate-400">توضیحات تکمیلی پروژه</label>
          <textarea 
            v-model="formData.description" 
            rows="5"
            placeholder="خلاصه‌ای از ایده و امکاناتی که مد نظر دارید را بنویسید..."
            class="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-emerald-500 transition resize-none"
          ></textarea>
          <p v-if="errors.description" class="text-xs text-red-500 mt-1">{{ errors.description }}</p>
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800 text-slate-950 font-bold rounded-lg transition shadow-lg shadow-emerald-500/10 flex items-center justify-center"
        >
          <span v-if="isLoading">در حال ثبت اطلاعات...</span>
          <span v-else>ارسال درخواست به نادر تک تیم</span>
        </button>
      </form>

    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const isLoading = ref(false)

const formData = reactive({
  name: '',
  phone: '',
  projectType: '',
  description: ''
})

const errors = reactive({
  name: '',
  phone: '',
  projectType: '',
  description: ''
})

const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.phone = ''
  errors.projectType = ''
  errors.description = ''

  if (!formData.name.trim()) {
    errors.name = 'وارد کردن نام و نام خانوادگی الزامی است.'
    isValid = false
  }

  const phoneRegex = /^09\d{9}$/
  if (!formData.phone) {
    errors.phone = 'وارد کردن شماره موبایل الزامی است.'
    isValid = false
  } else if (!phoneRegex.test(formData.phone)) {
    errors.phone = 'فرمت شماره موبایل معتبر نیست.'
    isValid = false
  }

  if (!formData.projectType) {
    errors.projectType = 'لطفاً نوع درخواست خود را مشخص کنید.'
    isValid = false
  }

  if (!formData.description.trim()) {
    errors.description = 'وارد کردن توضیحات پروژه الزامی است.'
    isValid = false
  } else if (formData.description.length < 15) {
    errors.description = 'توضیحات باید حداقل شامل ۱۵ کاراکتر باشد.'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true
  try {
    console.log('فرم سفارش آماده ارسال به لاراول کسری:', { ...formData })
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('درخواست شما با موفقیت ثبت شد! به زودی با شما تماس می‌گیریم.')
    
    // ریست کردن فرم پس از ارسال موفق
    formData.name = ''
    formData.phone = ''
    formData.projectType = ''
    formData.description = ''
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>