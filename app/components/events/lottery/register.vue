<template>
  <!-- کانتینر اصلی صفحه با پس‌زمینه روشن و چیدمان راست‌چین -->
  <div class="min-h-screen bg-[#F9F7F2] flex justify-center items-center p-4" dir="rtl">
    <RaffleCard>
    
      <!-- تصویر بنر قرعه‌کشی -->
      <img src="/images/lottery-header-reg.jpg" class="absolute inset-0 w-full h-[232px] object-cover" />
     
      <!-- عنوان و خط جداکننده -->
      <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center mt-[250px]">متن قرعه‌کشی</h1>
      <div class="w-20 h-1 bg-[#2D7A6F] rounded-full mx-auto mb-6"></div>
      
      <!-- توضیحات -->
      <p class="text-gray-500 text-sm leading-relaxed mb-8 text-center">
        متن توضیحات متن توضیحات متن توضیحات متن توضیحات متن توضیحات متن توضیحات متن توضیحات
      </p>

      <!-- باکس انتخاب گزینه‌ها (تاریخ، ساعت، مکان) -->
      <div class="bg-[#ebebeb] rounded-2xl border border-gray-200 shadow-sm mb-8 overflow-hidden">
        
        <!-- انتخاب تاریخ -->
        <div class="flex items-center p-4 border-b border-gray-300">
          <Icon name="heroicons:calendar-days" class="text-gray-500 ml-3 text-2xl" />
          <select v-model="selected.date" class="w-full bg-transparent outline-none text-gray-700 cursor-pointer">
            <option value="" disabled selected>تاریخ</option>
            <option v-for="date in dates" :key="date" :value="date">{{ date }}</option>
          </select>
        </div>

        <!-- انتخاب ساعت -->
        <div class="flex items-center p-4 border-b border-gray-300">
          <Icon name="heroicons:clock" class="text-gray-500 ml-3 text-2xl" />
          <select v-model="selected.time" class="w-full bg-transparent outline-none text-gray-700 cursor-pointer">
            <option value="" disabled selected>ساعت</option>
            <option v-for="time in times" :key="time" :value="time">{{ time }}</option>
          </select>
        </div>

        <!-- انتخاب مکان -->
        <div class="flex items-center p-4">
          <Icon name="heroicons:map-pin" class="text-gray-500 ml-3 text-2xl" />
          <select v-model="selected.location" class="w-full bg-transparent outline-none text-gray-700 cursor-pointer">
            <option value="" disabled selected>مکان</option>
            <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
          </select>
        </div>
      </div>

      <!-- نمایش قیمت و دکمه ثبت‌نام -->
      <p class="text-lg font-bold text-gray-800 mb-6 text-center">قیمت: [مبلغ]</p>
      <button class="w-full bg-[#2D7A6F] text-white py-4 rounded-2xl font-bold hover:bg-teal-800 transition shadow-lg">
        ثبت‌نام در قرعه‌کشی
      </button>
    </RaffleCard>
  </div>
</template>

<script setup>
// مدیریت وضعیت انتخاب‌های کاربر
const selected = ref({ date: '', time: '', location: '' })

// لیست گزینه‌های قابل انتخاب
const dates = ['۱۴۰۲/۱۲/۰۱', '۱۴۰۲/۱۲/۰۲']
const times = ['۱۰:۰۰', '۱۴:۰۰']
const locations = ['شعبه مرکزی', 'شعبه شمال']
</script>