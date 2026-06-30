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

// داده‌های نمونه (در پروژه اصلی از API دریافت می‌کنید)
const users = ref([
  { id: 1, name: 'ثمین زارعی', phone: '09546825114', email: 'karbar22@gmail.com', category: 'design', details: 'توضیحات طراحی سایت کاربر...' },
  { id: 2, name: 'علی احمدی', phone: '09123456789', email: 'ali@test.com', category: 'design', details: 'اطلاعات مربوط به پروژه دوم...' },
  { id: 3, name: 'علی احمدی', phone: '09123456789', email: 'ali@test.com', category: 'content', details: 'اطلاعات مربوط به پروژه دوم...' },
  { id: 4, name: 'علی احمدی', phone: '09123456789', email: 'ali@test.com', category: 'event', details: 'اطلاعات مربوط به پروژه دوم...' },
  { id: 5, name: 'علی احمدی', phone: '09123456789', email: 'ali@test.com', category: 'collab', details: 'اطلاعات مربوط به پروژه دوم...' },
  { id: 6, name: 'علی احمدی', phone: '09123456789', email: 'ali@test.com', category: 'feedback', details: 'اطلاعات مربوط به پروژه دوم...' },




  // ... سایر کاربران
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
  <div class="p-6" dir="rtl">
    <div class="flex flex-wrap gap-2 mb-8">
      <button 
        v-for="tab in tabs" :key="tab.id"
        @click="activeTab = tab.id"
        :class="['px-5 py-2 rounded-full transition-all text-sm font-medium', 
                 activeTab === tab.id ? 'bg-[#2d6a66] text-white shadow-md' : 'bg-[#e5e5e5] text-gray-700 hover:bg-gray-200']"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="space-y-4">
      <div v-for="user in filteredUsers" :key="user.id" 
           class="bg-[#fcfaf5] p-6 rounded-2xl border border-gray-200 transition-all duration-300">
        
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-4">
            <img src="https://i.pravatar.cc/100" class="w-[114px] h-[114px] rounded-full border border-gray-200" />
            <div>
              <h3 class="font-bold text-lg text-[#1a2333]">{{ user.name }}</h3>
              <p class="text-gray-600 mt-4">{{ user.phone }}</p>
              <p v-if="openUserId === user.id" class="text-sm text-gray-500">{{ user.email }}</p>
            </div>
          </div>
        </div>

        <div v-if="openUserId === user.id" class="mt-6 pt-6 border-t border-gray-200">
          <div class="w-full h-32 p-4 border border-[#a8a29e] rounded-xl bg-white text-gray-500 text-sm mb-4">
            توضیحات: {{ user.details }}
          </div>
        </div>

        <div class=" font-roboto mr-[120px]">
          <button @click="toggleAccordion(user.id)"
                  class="text-gray-600 text-sm flex items-center gap-1 hover:text-[#2d6a66] transition-colors">
            {{ openUserId === user.id ? 'بستن اطلاعات' : 'دیدن کامل اطلاعات' }}
            <span :class="{'rotate-180': openUserId === user.id}" class="transition-transform duration-300">▲</span>
          </button>
        </div>
      </div>
      
      <p v-if="filteredUsers.length === 0" class="text-center text-gray-400 mt-10">موردی برای نمایش وجود ندارد.</p>
    </div>
  </div>
</template>