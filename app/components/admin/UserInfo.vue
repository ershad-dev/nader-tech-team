<template>
  <div class=" p-6 ">
    <div class="w-[812px] bg-[#F7F3EB] border-[1px] border-[#BFD1D5] text-[#0F184B] py-3 px-6 rounded-full  mx-auto mb-8 font-bold text-[24px] flex justify-center items-center ">
      اطلاعات کاربران
    </div>

    <div class="w-full text-black text-[20px] font-noto-light font-medium">
      <div class="grid grid-cols-4 bg-[#BFD1D5] py-4 px-6 rounded-t-2xl font-bold text-center">
        <div>کد کاربری</div>
        <div>نام و نام خانوادگی</div>
        <div>شماره موبایل</div>
        <div>ایمیل</div>

      </div>

      <div v-for="user in users" :key="user.id" class="border-b border-[#E5E5E5] last:border-none bg-[#F7F3EB]">
        <div 
          @click="toggleUser(user.id)"
          class="text-[24px] grid grid-cols-4 py-6 px-6 text-center cursor-pointer hover:bg-[#FDFBF7] transition-all"
        >
        <div class="font-bold">{{ user.id }}</div>
        <div>{{ user.name }}</div>
        <div>{{ user.mobile }}</div>
        <div>{{ user.email }}</div>

        </div>

<div
  v-if="expandedId === user.id"
  class="px-6 pb-6 bg-[#F7F3EB]"
>
  <div class="flex justify-center items-center gap-6">

    <img
      src="/images/user-avatar.jpg"
      class="w-[128px] h-[128px] rounded-full border-4 border-white shadow-lg object-cover shrink-0"
    />

    <div
      class="border border-[#BFD1D5] rounded-2xl bg-white/20 p-6 w-full max-w-[850px]"
    >
      <div class="grid grid-cols-3 gap-4">

        <div>
          <label class="block text-xs text-gray-500 mb-1">
            تاریخ تولد
          </label>
          <div class="h-11 px-3 flex items-center bg-[#BFD1D580] border rounded-[10px] text-sm">
            1370/05/10
          </div>
        </div>

        <div>
          <label class="block text-xs text-gray-500 mb-1">
            استان
          </label>
          <div class="h-11 px-3 flex items-center bg-[#BFD1D580] border rounded-[10px] text-sm">
            تهران
          </div>
        </div>

        <div>
          <label class="block text-xs text-gray-500 mb-1">
            کد ملی
          </label>
          <div class="h-11 px-3 flex items-center bg-[#BFD1D580] border rounded-[10px] text-sm">
            1234567890
          </div>
        </div>

        <div class="col-span-3">
          <label class="block text-xs text-gray-500 mb-1">
            آدرس و نشانی
          </label>
          <div class="min-h-[48px] px-3 py-3 bg-[#BFD1D580] border rounded-[10px] text-sm">
            تهران، خیابان ولیعصر، پلاک ۲۳
          </div>
        </div>

      </div>
    </div>

  </div>
</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const expandedId = ref(null)

const toggleUser = (id) => {
  expandedId.value = expandedId.value === id ? null : id
}

// داده‌های نمونه (در آینده از API می‌گیری)
const users = ref([
  { id: 1, name: 'ثمین زارعی', mobile: '09354578114', email: 'karbar@email.com' },
  { id: 2, name: 'ثمین زارعی', mobile: '09354578114', email: 'karbar@email.com' },
  { id: 3, name: 'ثمین زارعی', mobile: '09354578114', email: 'karbar@email.com' },
  { id: 4, name: 'ثمین زارعی', mobile: '09354578114', email: 'karbar@email.com' },
  { id: 5, name: 'ثمین زارعی', mobile: '09354578114', email: 'karbar@email.com' },
  { id: 6, name: 'ثمین زارعی', mobile: '09354578114', email: 'karbar@email.com' },

  // ... سایر کاربران
])
</script>