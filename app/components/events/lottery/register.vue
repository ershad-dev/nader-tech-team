<template>
  <div class="min-h-screen bg-[#F9F7F2] flex justify-center items-center p-4 md:p-8 " dir="rtl">
    
    <RaffleCard class="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden relative pb-8">
    
      <div class="w-full h-48 md:h-56 relative ">
        <img src="/images/lottery-header-reg.jpg" class="w-full h-full object-cover" />
      </div>
     
      <div class="px-6 md:px-10 ">
        <h1 class="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center mt-6">متن قرعه‌کشی</h1>
        <div class="w-16 h-1 bg-[#2D7A6F] rounded-full mx-auto mb-6"></div>
        
        <p class="text-gray-500 text-sm md:text-base leading-relaxed mb-8 text-center">
          متن توضیحات متن توضیحات متن توضیحات متن توضیحات متن توضیحات متن توضیحات متن توضیحات
        </p>

        <div class="bg-[#ebebeb] rounded-2xl border border-gray-200 shadow-sm mb-8 overflow-hidden">
          <div v-for="(item, key) in [{icon: 'calendar-days', label: 'تاریخ', model: 'date'}, {icon: 'clock', label: 'ساعت', model: 'time'}, {icon: 'map-pin', label: 'مکان', model: 'location'}]" :key="key" 
               class="flex items-center p-3 md:p-4 border-b border-gray-300 last:border-none">
            <Icon :name="'heroicons:' + item.icon" class="text-gray-500 ml-3 text-xl md:text-2xl" />
            <select v-model="selected[item.model]" class="w-full bg-transparent outline-none text-gray-700 cursor-pointer text-sm md:text-base">
              <option value="" disabled selected>{{ item.label }}</option>
              <option v-for="opt in options[item.model]" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
        </div>

        <p class="text-lg font-bold text-gray-800 mb-6 text-center">قیمت: [مبلغ]</p>
        <button class="w-full bg-[#2D7A6F] text-white py-3 md:py-4 rounded-2xl font-bold hover:bg-teal-800 transition shadow-lg text-sm md:text-base">
          ثبت‌نام در قرعه‌کشی
        </button>
      </div>
    </RaffleCard>
  </div>
</template>

<script setup>
const selected = ref({ date: '', time: '', location: '' })
const options = {
  date: ['۱۴۰۲/۱۲/۰۱', '۱۴۰۲/۱۲/۰۲'],
  time: ['۱۰:۰۰', '۱۴:۰۰'],
  location: ['شعبه مرکزی', 'شعبه شمال']
}
</script>