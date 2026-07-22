<template>
  <div
    class="flex flex-col lg:flex-row h-screen overflow-hidden font-sans transition-colors duration-700 relative"
    :class="isGalaxyTheme ? 'bg-[#0f0c29]' : 'bg-white dark:bg-dark-bg'"
    dir="rtl"
  >
    <!-- Mobile / Tablet Top Bar -->
    <div
      class="flex lg:hidden items-center justify-between px-4 py-3 shadow-md z-20 transition-colors duration-700"
      :class="isGalaxyTheme ? 'bg-[#1a1a2e]' : 'bg-[#BFD1D5] dark:bg-dark-surface'"
    >
      <div class="flex items-center gap-3">
        <img
          src="/images/admin-avatar.jpg"
          alt="Profile"
          class="w-[42px] h-[42px] rounded-full object-cover shadow-lg"
        />
        <div class="text-right">
          <h2
            class="font-bold text-[14px] whitespace-nowrap"
            :class="isGalaxyTheme ? 'text-white' : 'text-[#0F184B] dark:text-dark-text'"
          >
            {{ admin?.full_name || 'مدیر سیستم' }}
          </h2>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <!-- دکمه‌ی تغییر تم (موبایل/تبلت) -->
        <button
          @click="toggleColorMode"
          class="p-1.5"
          :class="isGalaxyTheme ? 'text-white' : 'text-[#0F184B] dark:text-dark-text'"
          aria-label="تغییر حالت تاریک/روشن"
        >
          <svg v-if="colorMode.value === 'dark'" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0174 2.80157C6.37072 3.29221 2.75 7.22328 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C16.7767 21.25 20.7078 17.6293 21.1984 12.9826C19.8717 14.6669 17.8126 15.75 15.5 15.75C11.4959 15.75 8.25 12.5041 8.25 8.5C8.25 6.18738 9.33315 4.1283 11.0174 2.80157ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C12.7166 1.25 13.0754 1.82126 13.1368 2.27627C13.196 2.71398 13.0342 3.27065 12.531 3.57467C10.8627 4.5828 9.75 6.41182 9.75 8.5C9.75 11.6756 12.3244 14.25 15.5 14.25C17.5882 14.25 19.4172 13.1373 20.4253 11.469C20.7293 10.9658 21.286 10.804 21.7237 10.8632C22.1787 10.9246 22.75 11.2834 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="currentColor"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
            <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button
          @click="isMobileMenuOpen = true"
          class="p-2 rounded-lg"
          :class="isGalaxyTheme ? 'text-white' : 'text-[#0F184B] dark:text-dark-text'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="isMobileMenuOpen"
      @click="isMobileMenuOpen = false"
      class="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300"
    ></div>

    <!-- Sidebar -->
    <aside
      @mouseenter="isSidebarOpen = true"
      @mouseleave="isSidebarOpen = false"
      :class="[
        'flex flex-col py-8 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width] overflow-x-hidden overflow-y-auto hide-scrollbar',
        'fixed top-0 right-0 h-full w-[270px] max-w-[80vw] z-40 transform transition-transform duration-500',
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        'lg:static lg:top-auto lg:right-auto lg:h-auto lg:max-w-none lg:translate-x-0 lg:z-10',
        isGalaxyTheme ? 'bg-[#1a1a2e]' : 'bg-[#BFD1D5] dark:bg-dark-surface',
        isSidebarOpen ? 'lg:w-[253px] min-[1920px]:w-[300px]' : 'lg:w-[90px] min-[1920px]:w-[112px]'
      ]"
    >
      <!-- Close button (only mobile/tablet) -->
      <button
        @click="isMobileMenuOpen = false"
        class="lg:hidden self-start mr-[18px] mb-4 p-1"
        :class="isGalaxyTheme ? 'text-white' : 'text-[#0F184B] dark:text-dark-text'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Profile (دقیقاً حالت دسکتاپ قبلی، فقط زیر lg مخفی است) -->
      <div
        class="hidden lg:flex items-center mb-6 px-[18px] min-[1920px]:px-[24px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        :class="isSidebarOpen ? 'justify-start gap-4 mb-[30px] min-[1920px]:mb-[38px]' : 'justify-start mb-[30px] min-[1920px]:mb-[38px]'"
      >
        <div class="w-[45px] h-[45px] min-[1920px]:w-[56px] min-[1920px]:h-[56px] shrink-0 grow-0 flex items-center justify-center">
          <img
            src="/images/admin-avatar.jpg"
            alt="Profile"
            style="width: 70px; height: 70px; min-width: 70px; min-height: 70px;"
            class="block rounded-full shadow-lg object-cover shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center min-[1920px]:!w-[84px] min-[1920px]:!h-[84px] min-[1920px]:!min-w-[84px] min-[1920px]:!min-h-[84px]"
            :class="isSidebarOpen ? 'scale-100 mr-[20px] min-[1920px]:mr-[24px]' : 'scale-[0.611]'"
          />
        </div>

        <div
          class="text-right overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mr-[20px] min-[1920px]:mr-[24px]"
          :class="isSidebarOpen
            ? 'opacity-100 max-w-[180px] min-[1920px]:max-w-[220px] translate-x-0 delay-200'
            : 'opacity-0 max-w-0 -translate-x-2 delay-0'"
        >
          <h2 class="font-bold text-[#0F184B] dark:text-dark-text text-[14px] min-[1920px]:text-[17px] whitespace-nowrap">
            {{ admin?.full_name || 'مدیر سیستم' }}
          </h2>
          <p class="text-gray-500 dark:text-dark-text/70 text-[12px] min-[1920px]:text-[14px] mt-1 whitespace-nowrap font-roboto">
            {{ admin?.mobile || '' }}
          </p>
          <p class="w-[139px] min-[1920px]:w-[170px] text-gray-500 dark:text-dark-text/70 text-[9px] min-[1920px]:text-[11px] mt-1 whitespace-nowrap font-roboto">
            {{ admin?.email || '' }}
          </p>
        </div>
      </div>

      <!-- دکمه‌ی تغییر تم (دسکتاپ - داخل سایدبار) -->
      <button
        @click="toggleColorMode"
        class="hidden lg:flex items-center px-4 py-1.5 mb-3 min-[1920px]:mb-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] font-bold"
        :class="[
          isSidebarOpen ? 'justify-start gap-4' : 'justify-center',
          isGalaxyTheme ? 'text-white' : 'text-[#0F184B] dark:text-dark-text'
        ]"
        aria-label="تغییر حالت تاریک/روشن"
      >
        <span class="flex items-center justify-center flex-shrink-0 w-[22px] h-[22px] min-[1920px]:w-[26px] min-[1920px]:h-[26px] lg:w-[33px] lg:h-[33px] min-[1920px]:!w-[42px] min-[1920px]:!h-[42px]">
          <svg v-if="colorMode.value === 'dark'" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full max-w-[22px] max-h-[22px] min-[1920px]:max-w-[26px] min-[1920px]:max-h-[26px]">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0174 2.80157C6.37072 3.29221 2.75 7.22328 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C16.7767 21.25 20.7078 17.6293 21.1984 12.9826C19.8717 14.6669 17.8126 15.75 15.5 15.75C11.4959 15.75 8.25 12.5041 8.25 8.5C8.25 6.18738 9.33315 4.1283 11.0174 2.80157ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C12.7166 1.25 13.0754 1.82126 13.1368 2.27627C13.196 2.71398 13.0342 3.27065 12.531 3.57467C10.8627 4.5828 9.75 6.41182 9.75 8.5C9.75 11.6756 12.3244 14.25 15.5 14.25C17.5882 14.25 19.4172 13.1373 20.4253 11.469C20.7293 10.9658 21.286 10.804 21.7237 10.8632C22.1787 10.9246 22.75 11.2834 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z" fill="currentColor"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full max-w-[22px] max-h-[22px] min-[1920px]:max-w-[26px] min-[1920px]:max-h-[26px]">
            <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>

        <span
          class="flex-1 flex items-center overflow-hidden whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-[15px] min-[1920px]:text-[17px]"
          :class="isSidebarOpen
            ? 'opacity-100 max-w-[150px] min-[1920px]:max-w-[180px] mr-4'
            : 'opacity-0 max-w-0 lg:opacity-0 lg:max-w-0'"
        >
          {{ colorMode.value === 'dark' ? 'حالت روشن' : 'حالت تاریک' }}
        </span>
      </button>

      <!-- Menu -->
      <nav
        :class="[
          'flex flex-col gap-1 min-[1920px]:gap-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'w-full mt-[15px] min-[1920px]:mt-[20px]',
          isSidebarOpen ? 'lg:w-[252px] min-[1920px]:w-[299px]' : 'lg:w-full'
        ]"
      >
        <button
          v-for="(item, index) in navItems"
          :key="item.name"
          @click="selectItem(item.component)"
          :style="isSidebarOpen ? { transitionDelay: (200 + index * 50) + 'ms' } : { transitionDelay: '0ms' }"
          class="px-4 py-1.5 flex items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] font-bold border min-h-[48px] lg:min-h-[44px] min-[1920px]:min-h-[58px]"
          :class="getNavItemClasses(item)"
        >
          <!-- راست چین: آیکون -->
          <span
            class="flex items-center justify-end flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-[22px] h-[22px] min-[1920px]:w-[26px] min-[1920px]:h-[26px] lg:w-[33px] lg:h-[33px] min-[1920px]:!w-[42px] min-[1920px]:!h-[42px]"
          >
            <component
              :is="item.icon"
              class="w-full h-full max-w-full max-h-full"
              :class="isGalaxyTheme
                ? 'text-white'
                : (activeComponent === item.component ? 'text-[#2C7379] dark:text-dark-highlight' : 'text-[#454C6A] dark:text-dark-text')"
            />
          </span>

          <!-- وسط چین: متن -->
          <span
            class="flex-1 flex items-center justify-center overflow-hidden whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-[15px] lg:text-[15px] min-[1920px]:text-[17px]"
            :class="isSidebarOpen
              ? 'opacity-100 max-w-[150px] min-[1920px]:max-w-[180px] mr-4'
              : 'opacity-100 max-w-[150px] ml-0 lg:opacity-0 lg:max-w-0 min-[1920px]:opacity-0 min-[1920px]:max-w-0'"
          >
            {{ item.name }}
          </span>
        </button>

        <button
          @click="logout"
          class="px-4 py-1.5 flex items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] font-bold border min-h-[40px] lg:min-h-[40px] min-[1920px]:min-h-[54px]"
          :class="isSidebarOpen
            ? `bg-[#67A9A880] dark:bg-dark-input/30 hover:bg-[#8FB0B2] dark:hover:bg-dark-surface border border-white dark:border-dark-border gap-4 rounded-br-3xl rounded-tl-3xl justify-start text-right min-[1920px]:px-6 min-[1920px]:py-3  ${isGalaxyTheme ? 'text-white' : 'text-red-500 dark:text-red-400'}`
            : `bg-[#67A9A880] dark:bg-dark-input/30 hover:bg-[#8FB0B2] dark:hover:bg-dark-surface border border-white dark:border-dark-border gap-4 rounded-br-3xl rounded-tl-3xl justify-start text-right ${isGalaxyTheme ? 'text-white' : 'text-red-500 dark:text-red-400'} lg:bg-transparent lg:border-transparent lg:justify-center lg:hover:scale-110 lg:gap-0 lg:px-0 min-[1920px]:px-0 min-[1920px]:py-1.5`"
        >
          <span
            class="flex items-center justify-center flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-[22px] h-[22px] min-[1920px]:w-[26px] min-[1920px]:h-[26px] lg:w-[33px] lg:h-[33px] min-[1920px]:!w-[42px] min-[1920px]:!h-[42px]"
          >
            <admin-icons-logout
              class="w-full h-full max-w-full max-h-full"
              :class="isGalaxyTheme ? 'text-white' : 'text-red-500 dark:text-red-400'"
            />
          </span>

          <span
            class="overflow-hidden whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-[15px] min-[1920px]:text-[17px]"
            :class="isSidebarOpen
              ? 'opacity-100 max-w-[150px] min-[1920px]:max-w-[180px]'
              : 'opacity-100 max-w-[150px] lg:opacity-0 lg:max-w-0 min-[1920px]:opacity-0 min-[1920px]:max-w-0'"
          >
            خروج از پنل
          </span>
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main
      class="flex-1 overflow-y-auto transition-colors duration-700 hide-scrollbar"
      :class="isGalaxyTheme ? 'bg-[#0f0c29]' : 'bg-[#ECEDF4] dark:bg-dark-bg'"
    >
      <div v-if="!activeComponent" class="w-full h-full flex items-center justify-center p-4">
        <img src="/images/empty-page4.png" alt="Empty State" class="w-full max-w-[1200px] max-h-[260px] lg:max-h-[500px] object-contain " />
      </div>
      <component v-else :is="activeComponent" />
    </main>
  </div>
</template>

<script setup>
import { ref, shallowRef, defineAsyncComponent, provide, onMounted } from 'vue'
import HomeIcon from '~/components/admin/icons/home.vue'
import UserAvatarIcon from '~/components/admin/icons/userAvatar.vue'
import BannerEditIcon from '~/components/admin/icons/bannerEdit.vue'
import UserRequestIcon from '~/components/admin/icons/userRequest.vue'
import ResumeIcon from '~/components/admin/icons/rezume.vue'
import LotteryIcon from '~/components/admin/icons/lottery.vue'
import ArticlesIcon from '~/components/admin/icons/articles.vue'
import FaqIcon from '~/components/admin/icons/faq.vue'
import PageContentIcon from '~/components/admin/icons/pageContent.vue'

definePageMeta({
  layout: false
})

const UserInfo = defineAsyncComponent(() =>
  import('~/components/admin/UserInfo.vue')
)
const BannerEdit = defineAsyncComponent(() =>
  import('~/components/admin/BannerEdit.vue')
)
const UserRequests = defineAsyncComponent(() =>
  import('~/components/admin/UserRequests.vue')
)
const ResumeControl = defineAsyncComponent(() =>
  import('~/components/admin/ResumeControl.vue')
)
const Lottery = defineAsyncComponent(() =>
  import('~/components/admin/Lottery.vue')
)
const LotteryDraw = defineAsyncComponent(() =>
  import('~/components/admin/LotteryDraw.vue')
)
const Articles = defineAsyncComponent(() =>
  import('~/components/admin/Articles.vue')
)
const Faq = defineAsyncComponent(() =>
  import('~/components/admin/faq.vue')
)
const StaticContent = defineAsyncComponent(() =>
  import('~/components/admin/StaticContent.vue')
)

const { admin, initFromStorage, clearAuth } = useAdminAuth()

// تم روشن/تاریک (مشترک با navbar سمت کاربر، چون colorMode سراسریه)
const colorMode = useColorMode()
function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
  initFromStorage()
})

const isSidebarOpen = ref(false)
const isMobileMenuOpen = ref(false)
const activeComponent = shallowRef(null)
const isGalaxyTheme = ref(false)

provide('setGalaxyTheme', (value) => {
  isGalaxyTheme.value = value
})

const selectItem = (component) => {
  activeComponent.value = component
  isGalaxyTheme.value = (component === LotteryDraw)
  isMobileMenuOpen.value = false
}

const navItems = [
  { name: 'خانه', path: '/', icon: HomeIcon },
  { name: 'اطلاعات کاربران', component: UserInfo, icon: UserAvatarIcon },
  { name: 'تغییر عکس بنر', component: BannerEdit, icon: BannerEditIcon },
  { name: 'درخواست کاربران', component: UserRequests, icon: UserRequestIcon },
  { name: 'کنترل رزومه', component: ResumeControl, icon: ResumeIcon },
  { name: 'قرعه کشی', component: Lottery, icon: LotteryIcon },
  { name: 'مقالات', component: Articles, icon: ArticlesIcon },
  { name: 'سوالات متداول', component: Faq, icon: FaqIcon },
  { name: 'مدیریت محتوای صفحات', component: StaticContent, icon: PageContentIcon }
]

const getNavItemClasses = (item) => {
  const isActive = activeComponent.value === item.component

  const openClasses = isActive
    ? `bg-[#67A9A880] dark:bg-dark-accent/30 border-[#67A9A8] dark:border-dark-accent ${isGalaxyTheme.value ? 'text-white' : 'text-[#0F184B] dark:text-dark-text'} gap-4 rounded-br-3xl rounded-tl-3xl justify-start text-right min-[1920px]:px-6 min-[1920px]:py-3`
    : `bg-[#67A9A880] dark:bg-dark-input/30 ${isGalaxyTheme.value ? 'text-white' : 'text-[#0F184B]/80 dark:text-dark-text/80'} hover:bg-[#8FB0B2] dark:hover:bg-dark-surface border border-white dark:border-dark-border gap-4 rounded-br-3xl rounded-tl-3xl justify-start text-right min-[1920px]:px-6 min-[1920px]:py-3`

  const closedClassesDesktop = isActive
    ? `lg:bg-transparent lg:border-transparent lg:justify-center lg:gap-0 lg:px-0 min-[1920px]:px-0 min-[1920px]:py-1.5 ${isGalaxyTheme.value ? 'lg:text-white' : 'lg:text-[#0F184B] lg:dark:text-dark-text'}`
    : `lg:bg-transparent lg:border-transparent lg:justify-center lg:hover:scale-110 lg:gap-0 lg:px-0 min-[1920px]:px-0 min-[1920px]:py-1.5 ${isGalaxyTheme.value ? 'lg:text-white' : 'lg:text-[#0F184B]/80 lg:dark:text-dark-text/80'}`

  return isSidebarOpen.value ? openClasses : `${openClasses} ${closedClassesDesktop}`
}

const logout = () => {
  clearAuth()
  navigateTo('/admin/ntt20119')
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>