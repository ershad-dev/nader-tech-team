<template>
  <div class="p-4 sm:p-6">
    <div
      class="w-full max-w-[812px] lg:w-[812px] bg-[#F7F3EB] text-[#0F184B] py-3 px-4 lg:px-6 rounded-full mx-auto mb-6 lg:mb-8 font-bold text-[18px] sm:text-[20px] lg:text-[24px] flex justify-center items-center shadow-xl"
    >
      اطلاعات کاربران
    </div>

    <div class="w-full text-black text-[14px] sm:text-[16px] lg:text-[20px] font-noto-light font-medium">
      <!-- Table Header (فقط دسکتاپ) -->
      <div class="hidden lg:grid grid-cols-4 bg-[#BFD1D5] py-4 px-6 rounded-t-2xl font-bold text-center">
        <div>کد کاربری</div>
        <div>نام و نام خانوادگی</div>
        <div>شماره موبایل</div>
        <div>ایمیل</div>
      </div>

      <div
        v-for="user in users"
        :key="user.id"
        class="border-b border-[#E5E5E5] last:border-none bg-[#F7F3EB] rounded-2xl lg:rounded-none mb-3 lg:mb-0 shadow-sm lg:shadow-none overflow-hidden"
      >
        <!-- Row: دسکتاپ همون گرید قبلی / موبایل و تبلت کارت عمودی -->
        <div
          @click="toggleUser(user.id)"
          class="cursor-pointer hover:bg-[#FDFBF7] transition-all
                 flex flex-col gap-2 py-4 px-4
                 lg:grid lg:grid-cols-4 lg:text-[24px] lg:py-6 lg:px-6 lg:text-center lg:gap-0"
        >
          <div class="flex justify-between items-center lg:block">
            <span class="text-xs text-gray-500 font-normal lg:hidden">کد کاربری</span>
            <span class="font-bold">{{ user.id }}</span>
          </div>

          <div class="flex justify-between items-center lg:block">
            <span class="text-xs text-gray-500 font-normal lg:hidden">نام و نام خانوادگی</span>
            <span>{{ user.name }}</span>
          </div>

          <div class="flex justify-between items-center lg:block">
            <span class="text-xs text-gray-500 font-normal lg:hidden">شماره موبایل</span>
            <span>{{ user.mobile }}</span>
          </div>

          <div class="flex justify-between items-center lg:block">
            <span class="text-xs text-gray-500 font-normal lg:hidden">ایمیل</span>
            <span class="truncate max-w-[60%] lg:max-w-none">{{ user.email }}</span>
          </div>
        </div>

        <!-- Expanded Details -->
        <div
          v-if="expandedId === user.id"
          class="px-4 pb-4 lg:px-6 lg:pb-6 bg-[#F7F3EB]"
        >
          <div class="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-6">

            <img
              src="/images/user-avatar.jpg"
              class="w-[90px] h-[90px] lg:w-[128px] lg:h-[128px] rounded-full shadow-lg object-cover shrink-0"
            />

            <div
              class="border border-[#BFD1D5] rounded-2xl bg-white/20 p-4 lg:p-6 w-full max-w-full lg:max-w-[850px]"
            >
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

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

                <div class="col-span-1 sm:col-span-2 lg:col-span-3">
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