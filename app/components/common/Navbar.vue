<template>
  <nav v-if="!isLotteryPage" class="sticky top-6 z-[999] w-[95%] sm:w-[92%] xl:w-[1110px] h-auto xl:h-[70px] mx-auto bg-white rounded-[1.75rem] sm:rounded-[2rem] xl:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col xl:flex-row items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 transition-all duration-300" dir="rtl">
    
    <!-- Header (لوگو و همبرگر) -->
    <div class="relative flex w-full xl:w-auto justify-between items-center px-1 xl:px-0">
      
      <!-- آیکون همبرگر (سمت چپ) - انیمیشن تبدیل به ضربدر -->
      <button
        @click="isOpen = !isOpen"
        class="xl:hidden relative z-10 w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center gap-[6px] p-1.5 sm:p-2 text-[#0F184B]"
        aria-label="منو"
      >
        <span
          class="block h-[2px] w-6 sm:w-7 bg-[#0F184B] rounded-full transition-all duration-300 ease-in-out"
          :class="isOpen ? 'translate-y-[8px] rotate-45' : 'translate-y-0 rotate-0'"
        ></span>
        <span
          class="block h-[2px] w-6 sm:w-7 bg-[#0F184B] rounded-full transition-all duration-300 ease-in-out"
          :class="isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'"
        ></span>
        <span
          class="block h-[2px] w-6 sm:w-7 bg-[#0F184B] rounded-full transition-all duration-300 ease-in-out"
          :class="isOpen ? '-translate-y-[8px] -rotate-45' : 'translate-y-0 rotate-0'"
        ></span>
      </button>

      <!-- متن وسط (موبایل و تبلت) - نادر تکنولوژی -->
      <span class="xl:hidden absolute left-1/2 -translate-x-1/2 text-[#0F184B] font-bold text-[20px] sm:text-[16px] whitespace-nowrap">
        نادر تکنولوژی
      </span>
      
      <!-- لوگو (سمت راست) -->
      <div class="xl:hidden">
        <img src="/images/ntt-logo.jpg" alt="Logo" class="w-9 h-9 sm:w-10 sm:h-10 object-contain" />
      </div> 

    </div>

    <!-- بدنه اصلی منو -->
    <div
      class="w-full flex flex-col overflow-hidden transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-500
             xl:flex xl:flex-row xl:items-center xl:overflow-visible xl:max-h-none xl:opacity-100 xl:translate-y-0 xl:mt-0 xl:gap-6"
      :class="isOpen
        ? 'max-h-[600px] opacity-100 translate-y-0 mt-3 sm:mt-4 gap-4 sm:gap-5'
        : 'max-h-0 opacity-0 -translate-y-2 mt-0 gap-0'"
    >
      
      <!-- ۱. فضای خالی در سمت چپ (برای حفظ توازنِ مرکز بودنِ لینک‌ها) -->
      <div class="hidden xl:block w-[90px]"></div>

      <!-- ۲. لینک‌های وسط (کاملاً مستقل) -->
      <div class="flex flex-col xl:flex-row items-center justify-center gap-3 sm:gap-5 xl:gap-8 text-[#0F184B] font-roboto font-normal text-[14px] sm:text-[15px] xl:text-[16px] w-full xl:flex-1 xl:whitespace-nowrap">
        <NuxtLink to="/" exact-active-class="!text-[#0F184B] !font-bold" class="hover:text-teal-700 transition" @click="isOpen = false">خانه</NuxtLink>
        <NuxtLink to="/order" exact-active-class="!text-[#0F184B] !font-bold" class="hover:text-teal-700 transition" @click="isOpen = false">سفارش‌ پروژه</NuxtLink>
        <NuxtLink to="/events" exact-active-class="!text-[#0F184B] !font-bold" class="hover:text-teal-700 transition" @click="isOpen = false">برگزاری ایونت</NuxtLink>
        <NuxtLink to="/articles" exact-active-class="!text-[#0F184B] !font-bold" class="hover:text-teal-700 transition" @click="isOpen = false">مقالات</NuxtLink>
        <NuxtLink to="/about" exact-active-class="!text-[#0F184B] !font-bold" class="hover:text-teal-700 transition" @click="isOpen = false">درباره ما</NuxtLink>
        <NuxtLink to="/faq" exact-active-class="!text-[#0F184B] !font-bold" class="hover:text-teal-700 transition" @click="isOpen = false">سوالات متداول</NuxtLink>
        
        <!-- دکمه‌های موبایل/تبلت (زیر xl دیده می‌شوند) -->
        <div v-if="!isLoggedIn" class="flex flex-col gap-2 w-full xl:hidden mt-2">
          <NuxtLink to="/auth/login" class="w-full text-center py-2 sm:py-2.5 text-[#2D7A6F] font-bold border border-[#2D7A6F] rounded-full text-[14px] sm:text-[16px]" @click="isOpen = false">ورود</NuxtLink>
          <NuxtLink to="/auth/register" class="w-full text-center py-2 sm:py-2.5 bg-[#2D7A6F] text-white font-bold rounded-full text-[14px] sm:text-[16px]" @click="isOpen = false">ثبت‌نام</NuxtLink>
        </div>

        <div v-else class="w-full xl:hidden mt-2">
          <NuxtLink
            to="/profile"
            class="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 bg-[#2D7A6F] text-white font-bold rounded-full text-[14px] sm:text-[16px] hover:bg-teal-800 transition shadow-sm"
            @click="isOpen = false"
          >
            <span>پروفایل</span>
            <Icon name="heroicons:user-solid" class="w-5 h-5 sm:w-6 sm:h-6" />
          </NuxtLink>
        </div>
      </div>
      
      <!-- ۳. دکمه ورود و ثبت‌نام (سمت راست - کاملاً جدا شده) -->
      <div class="hidden xl:flex justify-end w-[184px]" dir="ltr">
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
          <span>پروفایل</span>
          <Icon name="heroicons:user-solid" class="w-6 h-6" />
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
const route = useRoute()
const { token } = useAuth()
const isOpen = ref(false)
const isLoggedIn = computed(() => !!token.value)
const isLotteryPage = computed(() => ['/events/lottery/register', '/events/lottery/login', '/events/lottery/success', '/events/lottery/waiting', '/events/lottery/winner', '/events/lottery/loser'].includes(route.path))
</script>