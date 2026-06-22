<template>
  <nav v-if="!isLotteryPage" class="sticky top-6 z-[999] w-[1110px] h-[70px] mx-auto bg-white rounded-full px-6 py-3 flex items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 transition-colors duration-300" dir="rtl">
    
    <!-- فضای خالی برای تراز‌بندی -->
    <div class="w-10"></div>

    <!-- لینک‌های ناوبری -->
    <div class="flex items-center gap-8 text-[#0F184B] font-roboto font-normal text-[16px]">
      
      <NuxtLink 
        to="/" 
        exact-active-class="!text-[#0F184B] !font-bold" 
        class="hover:text-teal-700 transition"
      >خانه</NuxtLink>

      <NuxtLink 
        to="/order" 
        exact-active-class="!text-[#0F184B] !font-bold" 
        class="hover:text-teal-700 transition flex items-center gap-1"
      >
        سفارش‌ پروژه
      </NuxtLink>

      <NuxtLink 
        to="/events" 
        exact-active-class="!text-[#0F184B] !font-bold" 
        class="hover:text-teal-700 transition"
      >برگزاری ایونت</NuxtLink>

      <NuxtLink 
        to="/articles" 
        exact-active-class="!text-[#0F184B] !font-bold" 
        class="hover:text-teal-700 transition"
      >مقالات</NuxtLink>

      <NuxtLink 
        to="/about" 
        exact-active-class="!text-[#0F184B] !font-bold" 
        class="hover:text-teal-700 transition"
      >درباره ما</NuxtLink>

      <NuxtLink 
        to="/faq" 
        exact-active-class="!text-[#0F184B] !font-bold" 
        class="hover:text-teal-700 transition"
      >سوالات متداول</NuxtLink>

    </div>

    <!-- بخش ورود و جستجو -->
    <div class="flex items-center gap-3" dir="ltr">
      <NuxtLink 
        v-if="!isLoggedIn"
        to="/auth/login"
        class="bg-[#2D7A6F] w-[184px] h-[44px] text-white px-6 py-2.5 font-roboto rounded-full text-[16px] font-bold hover:bg-teal-800 transition shadow-sm flex items-center justify-center"
      >
        <div class="flex items-center justify-center gap-4 ">
          <span>ورود / ثبت‌نام</span>
          <img src="/images/Vector-profile.svg" alt="">
        </div>
      </NuxtLink>

      <NuxtLink 
        v-else
        to="/profile"
        class="bg-[#2D7A6F] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-teal-800 transition shadow-sm"
      >
        <span> پروفایل</span>
        <Icon name="heroicons:user-solid" class="w-6 h-6" />
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const route = useRoute()
const { token, logout } = useAuth()

const isLoggedIn = computed(() => {
  return !!token.value
})

const lotteryRoutes = [
  '/events/lottery/register',
  '/events/lottery/login',
  '/events/lottery/success',
  '/events/lottery/waiting',
  '/events/lottery/winner',
  '/events/lottery/loser'
]

const isLotteryPage = computed(() => {
  return lotteryRoutes.includes(route.path)
})
</script>