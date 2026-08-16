<template>
  <nav v-if="!isLotteryPage" class="sticky top-6 z-[999] w-[95%] sm:w-[92%] min-[1100px]:w-[92%] xl:w-[1110px] min-[1920px]:w-[1600px] h-auto min-[1100px]:h-[70px] min-[1920px]:h-[88px] mx-auto bg-white dark:bg-[#CECDCD] rounded-[1.75rem] sm:rounded-[2rem] min-[1100px]:rounded-full px-4 sm:px-6 min-[1920px]:px-10 py-2.5 sm:py-3 flex flex-col min-[1100px]:flex-row items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-dark-border/30 transition-all duration-300" dir="ltr" :class="isRtl ? 'nav-mobile-rtl' : 'nav-mobile-ltr'">

    <!-- Header (لوگو و همبرگر) -->
    <div
      class="relative flex w-full min-[1100px]:w-auto justify-between items-center px-1 min-[1100px]:px-0"
      :class="isRtl ? 'order-last' : 'order-first'"
    >

      <!-- آیکون همبرگر (سمت چپ) - انیمیشن تبدیل به ضربدر -->
      <button
        @click="isOpen = !isOpen"
        class="min-[1100px]:hidden relative z-10 w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center gap-[6px] p-1.5 sm:p-2 text-[#0F184B] dark:text-dark-text-deep"
        aria-label="منو"
      >
        <span
          class="block h-[2px] w-6 sm:w-7 bg-[#0F184B] dark:bg-dark-text-deep rounded-full transition-all duration-300 ease-in-out"
          :class="isOpen ? 'translate-y-[8px] rotate-45' : 'translate-y-0 rotate-0'"
        ></span>
        <span
          class="block h-[2px] w-6 sm:w-7 bg-[#0F184B] dark:bg-dark-text-deep rounded-full transition-all duration-300 ease-in-out"
          :class="isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'"
        ></span>
        <span
          class="block h-[2px] w-6 sm:w-7 bg-[#0F184B] dark:bg-dark-text-deep rounded-full transition-all duration-300 ease-in-out"
          :class="isOpen ? '-translate-y-[8px] -rotate-45' : 'translate-y-0 rotate-0'"
        ></span>
      </button>

      <!-- لینک‌های اصلی (بین لوگو و دکمه‌ی همبرگری) - فقط زیر breakpoint 1100 -->
      <div class="min-[1100px]:hidden flex items-center gap-3 sm:gap-4 text-[#0F184B] dark:text-dark-text-deep font-roboto font-normal text-[12px] sm:text-[13px] whitespace-nowrap">
        <NuxtLink :to="localePath('/')" exact-active-class="!font-bold" class="hover:text-teal-700 dark:hover:text-dark-accent transition" @click="isOpen = false">{{ $t('nav.home') }}</NuxtLink>
        <NuxtLink :to="localePath('/order')" exact-active-class="!font-bold" class="hover:text-teal-700 dark:hover:text-dark-accent transition" @click="isOpen = false">{{ $t('nav.order') }}</NuxtLink>
        <NuxtLink :to="localePath('/articles')" exact-active-class="!font-bold" class="hover:text-teal-700 dark:hover:text-dark-accent transition" @click="isOpen = false">{{ $t('nav.articles') }}</NuxtLink>
        <NuxtLink :to="localePath('/about')" exact-active-class="!font-bold" class="hover:text-teal-700 dark:hover:text-dark-accent transition" @click="isOpen = false">{{ $t('nav.about') }}</NuxtLink>
      </div>

      <!-- لوگو (سمت راست در موبایل / یک باکس مجزا در دسکتاپ) -->
<!-- لوگو (سمت راست در موبایل / یک باکس مجزا در دسکتاپ) -->
<div class="flex items-center">
  <NuxtLink :to="localePath('/')" @click="isOpen = false">
    <img src="/images/ntt-logo.png" alt="Logo" class="w-9 h-9 sm:w-10 sm:h-10 min-[1920px]:w-11 min-[1920px]:h-11 object-contain" />
  </NuxtLink>
</div>

    </div>

    <!-- بدنه اصلی منو -->
    <div
      class="w-full flex flex-col overflow-hidden transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-500
             min-[1100px]:flex min-[1100px]:items-center min-[1100px]:overflow-visible min-[1100px]:max-h-none min-[1100px]:opacity-100 min-[1100px]:translate-y-0 min-[1100px]:mt-0 min-[1100px]:gap-6"
      :class="[
        isOpen
          ? 'max-h-[600px] opacity-100 translate-y-0 mt-3 sm:mt-4 gap-4 sm:gap-5'
          : 'max-h-0 opacity-0 -translate-y-2 mt-0 gap-0',
        isRtl ? 'min-[1100px]:flex-row' : 'min-[1100px]:flex-row-reverse'
      ]"
    >

      <!-- ۱. دکمه‌ی ورود/ثبت‌نام یا پروفایل (سمت راست‌ترین آیتم در دسکتاپ) -->
      <div class="hidden min-[1100px]:flex items-center justify-end shrink-0">
        <ClientOnly>
          <NuxtLink
            v-if="!isLoggedIn"
            :to="localePath('/auth/login')"
            class="bg-[#2D7A6F] dark:bg-dark-accent h-[44px] min-[1920px]:h-[54px] text-white dark:text-dark-text-deep px-6 min-[1920px]:px-8 py-2.5 font-roboto rounded-full text-[16px] min-[1920px]:text-[19px] font-bold hover:bg-teal-800 dark:hover:bg-dark-accent-hover transition shadow-sm flex items-center justify-center whitespace-nowrap"
          >
            <div class="flex items-center justify-center gap-2 min-[1920px]:gap-3">
              <img src="/images/Vector-profile.svg" alt="" class="w-4 h-4 min-[1920px]:w-5 min-[1920px]:h-5" />
              <span>{{ $t('nav.loginRegister') }}</span>
            </div>
          </NuxtLink>

          <NuxtLink
            v-else
            :to="localePath('/profile')"
            class="bg-[#2D7A6F] dark:bg-dark-accent text-white dark:text-dark-text-deep px-6 min-[1920px]:px-8 py-2.5 min-[1920px]:py-3 rounded-full text-sm min-[1920px]:text-[19px] font-bold hover:bg-teal-800 dark:hover:bg-dark-accent-hover transition shadow-sm whitespace-nowrap"
          >
            <div class="flex items-center justify-center gap-2 min-[1920px]:gap-3">
              <CommonIconsUserAvatar class="w-5 h-5 min-[1920px]:w-6 min-[1920px]:h-6" />
              <span class="mt-[5px]">{{ $t('nav.profile') }}</span>
            </div>
          </NuxtLink>

          <template #fallback>
            <NuxtLink
              :to="localePath('/auth/login')"
              class="bg-[#2D7A6F] dark:bg-dark-accent h-[44px] min-[1920px]:h-[54px] text-white dark:text-dark-text-deep px-6 min-[1920px]:px-8 py-2.5 font-roboto rounded-full text-[16px] min-[1920px]:text-[19px] font-bold hover:bg-teal-800 dark:hover:bg-dark-accent-hover transition shadow-sm flex items-center justify-center whitespace-nowrap"
            >
              <div class="flex items-center justify-center gap-2 min-[1920px]:gap-3">
                <img src="/images/Vector-profile.svg" alt="" class="w-4 h-4 min-[1920px]:w-5 min-[1920px]:h-5" />
                <span>{{ $t('nav.register') }}</span>
              </div>
            </NuxtLink>
          </template>
        </ClientOnly>
      </div>

<!-- ۲. آیکون تم + دکمه EN/FA (بین دکمه‌ی ثبت‌نام و لینک‌ها) -->
<div
  class="hidden min-[1100px]:flex items-center gap-2 border-gray-200 dark:border-dark-border/40 shrink-0"
  :class="isRtl ? 'pl-4 border-l' : 'pr-4 border-r'"
>
  <button
    @click="toggleLang"
    class="text-[#0F184B] dark:text-dark-text-deep font-roboto font-medium text-[14px] min-[1920px]:text-[18px] hover:opacity-70 transition"
  >
    {{ langLabel }}
  </button>

  <span class="flex items-center text-gray-300 dark:text-black">
    <svg viewBox="-6.5 0 32 32" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 min-[1920px]:w-4 min-[1920px]:h-4" fill="currentColor">
      <path d="M3.625 27.094l9.563-26.688h2.406l-9.563 26.688h-2.406z"></path>
    </svg>
  </span>

  <button
    @click="toggleColorMode"
    class="flex items-center justify-center text-[#0F184B] dark:text-dark-text-deep hover:opacity-70 transition"
    aria-label="تغییر حالت تاریک/روشن"
  >
    <svg v-if="colorMode.value === 'dark'" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 min-[1920px]:w-6 min-[1920px]:h-6">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0174 2.80157C6.37072 3.29221 2.75 7.22328 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C16.7767 21.25 20.7078 17.6293 21.1984 12.9826C19.8717 14.6669 17.8126 15.75 15.5 15.75C11.4959 15.75 8.25 12.5041 8.25 8.5C8.25 6.18738 9.33315 4.1283 11.0174 2.80157ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C12.7166 1.25 13.0754 1.82126 13.1368 2.27627C13.196 2.71398 13.0342 3.27065 12.531 3.57467C10.8627 4.5828 9.75 6.41182 9.75 8.5C9.75 11.6756 12.3244 14.25 15.5 14.25C17.5882 14.25 19.4172 13.1373 20.4253 11.469C20.7293 10.9658 21.286 10.804 21.7237 10.8632C22.1787 10.9246 22.75 11.2834 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="currentColor"/>
    </svg>
    <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 min-[1920px]:w-6 min-[1920px]:h-6">
      <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</div>

      <!-- ۳. لینک‌های وسط (چپ‌ترین گروه در دسکتاپ) -->
      <div
        class="flex flex-col items-center justify-center gap-3 sm:gap-5 min-[1100px]:gap-8 min-[1920px]:gap-10 text-[#0F184B] dark:text-dark-text-deep font-roboto font-normal text-[14px] sm:text-[15px] min-[1100px]:text-[16px] min-[1920px]:text-[24px] w-full min-[1100px]:flex-1 min-[1100px]:whitespace-nowrap"
        :class="isRtl ? 'min-[1100px]:flex-row-reverse' : 'min-[1100px]:flex-row'"
      >
        <NuxtLink :to="localePath('/')" exact-active-class="!text-[#0F184B] dark:!text-dark-text-deep !font-bold" class="hidden min-[1100px]:block hover:text-teal-700 dark:hover:text-dark-accent transition" @click="isOpen = false">{{ $t('nav.home') }}</NuxtLink>
        <NuxtLink :to="localePath('/order')" exact-active-class="!text-[#0F184B] dark:!text-dark-text-deep !font-bold" class="hidden min-[1100px]:block hover:text-teal-700 dark:hover:text-dark-accent transition" @click="isOpen = false">{{ $t('nav.order') }}</NuxtLink>
        <NuxtLink :to="localePath('/events')" exact-active-class="!text-[#0F184B] dark:!text-dark-text-deep !font-bold" class="hover:text-teal-700 dark:hover:text-dark-accent transition" @click="isOpen = false">{{ $t('nav.events') }}</NuxtLink>
        <NuxtLink :to="localePath('/articles')" exact-active-class="!text-[#0F184B] dark:!text-dark-text-deep !font-bold" class="hidden min-[1100px]:block hover:text-teal-700 dark:hover:text-dark-accent transition" @click="isOpen = false">{{ $t('nav.articles') }}</NuxtLink>
        <NuxtLink :to="localePath('/about')" exact-active-class="!text-[#0F184B] dark:!text-dark-text-deep !font-bold" class="hidden min-[1100px]:block hover:text-teal-700 dark:hover:text-dark-accent transition" @click="isOpen = false">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink :to="localePath('/faq')" exact-active-class="!text-[#0F184B] dark:!text-dark-text-deep !font-bold" class="hover:text-teal-700 dark:hover:text-dark-accent transition" @click="isOpen = false">{{ $t('nav.faq') }}</NuxtLink>

        <!-- نمونه پروژه ها - فقط داخل منوی همبرگری -->
        <NuxtLink :to="localePath('/order/moreProject')" exact-active-class="!text-[#0F184B] dark:!text-dark-text-deep !font-bold" class="min-[1100px]:hidden hover:text-teal-700 dark:hover:text-dark-accent transition" @click="isOpen = false">{{ $t('nav.moreProjects') }}</NuxtLink>

        <!-- قوانین و مقررات (بازکننده مودال) - فقط داخل منوی همبرگری -->
        <button
          type="button"
          class="min-[1100px]:hidden hover:text-teal-700 dark:hover:text-dark-accent transition"
          @click="showTermsModal = true; isOpen = false"
        >
          {{ $t('nav.terms') }}
        </button>

        <!-- دکمه‌ی تغییر حالت روشن/تاریک + EN/FA (موبایل) -->
        <div class="min-[1100px]:hidden flex items-center gap-4 mt-1">
          <button
            @click="toggleLang"
            class="text-[#0F184B] dark:text-dark-text-deep font-medium"
          >
            {{ langLabel }}
          </button>

          <span class="flex items-center text-gray-300 dark:text-black">
            <svg viewBox="-6.5 0 32 32" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="currentColor">
              <path d="M3.625 27.094l9.563-26.688h2.406l-9.563 26.688h-2.406z"></path>
            </svg>
          </span>

          <button
            @click="toggleColorMode"
            class="flex items-center gap-2 text-[#0F184B] dark:text-dark-text-deep"
          >
            <svg v-if="colorMode.value === 'dark'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0174 2.80157C6.37072 3.29221 2.75 7.22328 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C16.7767 21.25 20.7078 17.6293 21.1984 12.9826C19.8717 14.6669 17.8126 15.75 15.5 15.75C11.4959 15.75 8.25 12.5041 8.25 8.5C8.25 6.18738 9.33315 4.1283 11.0174 2.80157ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C12.7166 1.25 13.0754 1.82126 13.1368 2.27627C13.196 2.71398 13.0342 3.27065 12.531 3.57467C10.8627 4.5828 9.75 6.41182 9.75 8.5C9.75 11.6756 12.3244 14.25 15.5 14.25C17.5882 14.25 19.4172 13.1373 20.4253 11.469C20.7293 10.9658 21.286 10.804 21.7237 10.8632C22.1787 10.9246 22.75 11.2834 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="currentColor"/>
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
              <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <ClientOnly>
          <div v-if="!isLoggedIn" class="flex flex-col gap-2 w-full min-[1100px]:hidden mt-2">
            <NuxtLink :to="localePath('/auth/login')" class="w-full text-center py-2 sm:py-2.5 text-[#2D7A6F] dark:text-dark-accent font-bold border border-[#2D7A6F] dark:border-dark-accent rounded-full text-[14px] sm:text-[16px]" @click="isOpen = false">{{ $t('nav.login') }}</NuxtLink>
            <NuxtLink :to="localePath('/auth/register')" class="w-full text-center py-2 sm:py-2.5 bg-[#2D7A6F] dark:bg-dark-accent text-white dark:text-dark-text-deep font-bold rounded-full text-[14px] sm:text-[16px]" @click="isOpen = false">{{ $t('nav.register') }}</NuxtLink>
          </div>

          <div v-else class="w-full min-[1100px]:hidden mt-2">
            <NuxtLink
              :to="localePath('/profile')"
              class="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 bg-[#2D7A6F] dark:bg-dark-accent text-white dark:text-dark-text-deep font-bold rounded-full text-[14px] sm:text-[16px] hover:bg-teal-800 dark:hover:bg-dark-accent-hover transition shadow-sm"
              @click="isOpen = false"
            >
              <span>{{ $t('nav.profile') }}</span>
              <CommonIconsUserAvatar class="w-5 h-5 sm:w-6 sm:h-6" />
            </NuxtLink>
          </div>

          <template #fallback>
            <div class="flex flex-col gap-2 w-full min-[1100px]:hidden mt-2">
              <NuxtLink :to="localePath('/auth/login')" class="w-full text-center py-2 sm:py-2.5 text-[#2D7A6F] dark:text-dark-accent font-bold border border-[#2D7A6F] dark:border-dark-accent rounded-full text-[14px] sm:text-[16px]" @click="isOpen = false">{{ $t('nav.login') }}</NuxtLink>
              <NuxtLink :to="localePath('/auth/register')" class="w-full text-center py-2 sm:py-2.5 bg-[#2D7A6F] dark:bg-dark-accent text-white dark:text-dark-text-deep font-bold rounded-full text-[14px] sm:text-[16px]" @click="isOpen = false">{{ $t('nav.register') }}</NuxtLink>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </nav>

  <!-- مودال قوانین و مقررات (همون کامپوننت مشترک فوتر) -->
  <TermsModal v-model="showTermsModal" />
</template>

<script setup>
import TermsModal from '~/components/TermsModal.vue'

const route = useRoute()
const { token } = useAuth()
const isOpen = ref(false)
const showTermsModal = ref(false)
const isLoggedIn = computed(() => !!token.value)

// روت‌بیس‌نیم مستقل از پیشوند زبان (چون با strategy: prefix_except_default
// مسیر انگلیسی چیزی مثل events-lottery-register___en میشه)
const routeBaseName = computed(() => route.name?.toString().split('___')[0])
const isLotteryPage = computed(() => [
  'events-lottery-register',
  'events-lottery-login',
  'events-lottery-success',
  'events-lottery-waiting',
  'events-lottery-winner',
  'events-lottery-loser',
].includes(routeBaseName.value))

const colorMode = useColorMode()
function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  isOpen.value = false
}

// --- i18n ---
const { locale, localeProperties } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const isRtl = computed(() => localeProperties.value.dir === 'rtl')
const langLabel = computed(() => (locale.value === 'fa' ? 'EN' : 'FA'))

async function toggleLang() {
  const target = locale.value === 'fa' ? 'en' : 'fa'
  await navigateTo(switchLocalePath(target))
  isOpen.value = false
}
</script>

<style scoped>
@media (max-width: 1099px) {
  nav.nav-mobile-rtl {
    direction: rtl;
  }
  nav.nav-mobile-ltr {
    direction: ltr;
  }
}
</style>