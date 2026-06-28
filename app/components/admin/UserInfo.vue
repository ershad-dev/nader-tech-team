<template>
  <div class="bg-white p-6 rounded-[30px] shadow-sm">
    <div class="bg-[#FDFBF7] border-2 border-[#BFD1D5] text-[#0F184B] py-3 px-6 rounded-full w-fit mx-auto mb-8 font-bold text-lg">
      اطلاعات کاربران
    </div>

    <div class="w-full text-[#0F184B]">
      <div class="grid grid-cols-4 bg-[#BFD1D5] py-4 px-6 rounded-t-2xl font-bold text-center">
        <div>کد کاربری</div>
        <div>نام و نام خانوادگی</div>
        <div>شماره موبایل</div>
        <div>ایمیل</div>

      </div>

      <div v-for="user in users" :key="user.id" class="border-b border-[#E5E5E5] last:border-none">
        <div 
          @click="toggleUser(user.id)"
          class="grid grid-cols-4 py-6 px-6 text-center cursor-pointer hover:bg-[#FDFBF7] transition-all"
        >
        <div class="font-bold">{{ user.id }}</div>
        <div>{{ user.name }}</div>
        <div>{{ user.mobile }}</div>
        <div>{{ user.email }}</div>

        </div>

        <div v-if="expandedId === user.id" class="px-6 pb-6 bg-[#FDFBF7] animate-in slide-in-from-top-2">
          <div class="flex items-center gap-6 p-4 border border-[#BFD1D5] rounded-2xl bg-white">
            <img src="/images/admin-avatar.jpg" class="w-20 h-20 rounded-full border-2 border-[#BFD1D5]" />
            <div class="grid grid-cols-3 gap-4 flex-1">
              <div class="bg-[#ebebeb] p-2 rounded-lg text-xs text-right">تاریخ تولد: ...</div>
              <div class="bg-[#ebebeb] p-2 rounded-lg text-xs text-right">استان: ...</div>
              <div class="bg-[#ebebeb] p-2 rounded-lg text-xs text-right">کد ملی: ...</div>
              <div class="col-span-3 bg-[#ebebeb] p-3 rounded-lg text-xs text-right mt-1">آدرس و نشانی: ...</div>
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
  { id: 3, name: 'ثمین زارعی', mobile: '09354578114', email: 'karbar@email.com' },
  { id: 4, name: 'ثمین زارعی', mobile: '09354578114', email: 'karbar@email.com' },
  { id: 5, name: 'ثمین زارعی', mobile: '09354578114', email: 'karbar@email.com' },
  { id: 6, name: 'ثمین زارعی', mobile: '09354578114', email: 'karbar@email.com' },

  // ... سایر کاربران
])
</script>