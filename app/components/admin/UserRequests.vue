<script setup>
import { ref, computed } from 'vue'

// تب‌ها
const activeTab = ref('design')
const tabs = [
  { id: 'design', label: 'درخواست طراحی سایت' },
  { id: 'content', label: 'درخواست تولید محتوا' },
  { id: 'event', label: 'درخواست برگزاری ایونت' },
  { id: 'collab', label: 'درخواست همکاری' },
  { id: 'feedback', label: 'انتقادات و پیشنهادات' }
]

// داده‌های نمونه - فیلد avatar به هر کاربر اضافه شد
const users = ref([
  { id: 1, name: 'ثمین زارعی', phone: '09546825114', email: 'karbar22@gmail.com', category: 'design', details: 'توضیحات کاربر', avatar: '/images/admin-avatar.jpg' },
  { id: 2, name: 'ثمین زارعی', phone: '09123456789', email: 'ali@test.com', category: 'design', details: 'توضیحات کاربر', avatar: '/images/avater-man.jpg' },
  { id: 3, name: 'ثمین زارعی', phone: '09123456789', email: 'ali@test.com', category: 'design', details: 'توضیحات کاربر', avatar: '/images/user-avatar.jpg' },
  { id: 4, name: 'ثمین زارعی', phone: '09123456789', email: 'ali@test.com', category: 'design', details: 'توضیحات کاربر', avatar: '/images/icon-team.jpg' },
  { id: 5, name: 'ثمین زارعی', phone: '09123456789', email: 'ali@test.com', category: 'design', details: 'توضیحات کاربر', avatar: '/images/user-avatar.jpg' },
  { id: 6, name: 'ثمین زارعی', phone: '09123456789', email: 'sara@test.com', category: 'content', details: '   ...', avatar: '/images/avater-man.jpg' },
  { id: 7, name: 'ثمین زارعی', phone: '09123456789', email: 'reza@test.com', category: 'event', details: 'توضیحات کاربر', avatar: '/images/user-avatar.jpg' },
  { id: 8, name: 'ثمین زارعی', phone: '09123456789', email: 'maryam@test.com', category: 'collab', details: 'توضیحات کاربر', avatar: '/images/avater-man.jpg' },
  { id: 9, name: 'ثمین زارعی', phone: '09123456789', email: 'hamid@test.com', category: 'feedback', details: 'توضیحات کاربر', avatar: '/images/user-avatar.jpg' },
])

// فیلتر کردن بر اساس تب انتخاب شده
const filteredUsers = computed(() => 
  users.value.filter(u => u.category === activeTab.value)
)

// مدیریت آکاردئون
const openUserId = ref(null)
const toggleAccordion = (id) => {
  openUserId.value = openUserId.value === id ? null : id
}
</script>

<template>
  <div class="p-4 sm:p-5 lg:p-6" dir="rtl">

    <div class="flex flex-wrap justify-center items-center gap-2 mb-6 lg:mb-8 bg-[#F7F3EB] py-3 lg:py-0 lg:h-[78px] rounded-[27px] px-2 lg:px-0">
      <button 
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-3 sm:px-4 lg:px-5 py-2 rounded-full transition-all text-[12px] sm:text-[13px] lg:text-[14px] font-medium h-[36px] sm:h-[38px] lg:h-[41px]',
          activeTab === tab.id
            ? 'bg-[#67A9A8] text-[#0F184B] shadow-md'
            : 'text-[] hover:bg-gray-200'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="space-y-4">
      <div v-for="user in filteredUsers" :key="user.id" 
           class="bg-[#FFFFFF3B] p-4 sm:p-5 lg:p-6 rounded-2xl border border-gray-300 transition-all duration-300">
        
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-3 sm:gap-4">
            <!-- استفاده از avatar هر کاربر -->
            <img
              :src="user.avatar"
              :alt="user.name"
              class="w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] lg:w-[114px] lg:h-[114px] rounded-full border border-gray-200 object-cover shrink-0"
            />
            <div>
              <h3 class="font-bold text-[15px] sm:text-[17px] lg:text-[20px] text-[#000000] font-roboto lg:-mt-[40px]">{{ user.name }}</h3>
              <p class="text-black mt-1 lg:mt-2 font-roboto text-[13px] sm:text-[15px] lg:text-[20px]">{{ user.phone }}</p>
              <p v-if="openUserId === user.id" class="text-[13px] sm:text-[15px] lg:text-[20px] text-black font-roboto break-all">{{ user.email }}</p>
            </div>
          </div>
        </div>

        <div v-if="openUserId === user.id" class="mt-4 lg:mt-6 pt-4 lg:pt-6">
          <div class="w-full h-28 sm:h-32 p-3 sm:p-4 border border-[#2C7379] rounded-[5px] bg-white/17 text-balck text-[13px] sm:text-[14px] mb-4 font-roboto">
            {{ user.details }}
          </div>
        </div>

        <div :class="`font-roboto ${openUserId === user.id ? '' : 'lg:mr-[120px]'}`">
          <button
            @click="toggleAccordion(user.id)"
            :class="[
              'text-gray-600 text-xs sm:text-sm flex items-center gap-1 hover:text-[#2d6a66] transition-colors mt-2 lg:mt-0',
              openUserId === user.id ? 'lg:mt-0' : 'lg:-mt-[30px]'
            ]"
          >
            {{ openUserId === user.id ? 'بستن اطلاعات' : 'دیدن کامل اطلاعات' }}
            <span :class="{'rotate-180': openUserId === user.id}" class="transition-transform duration-300">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.41 7.41L0 6L6 0L12 6L10.59 7.41L6 2.83L1.41 7.41Z" fill="#747893"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
      
      <p v-if="filteredUsers.length === 0" class="text-center text-gray-400 mt-10">موردی برای نمایش وجود ندارد.</p>
    </div>
  </div>
</template>