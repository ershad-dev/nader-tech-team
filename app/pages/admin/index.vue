<template>
  <div
    class="px-[12px] pt-[10px] pb-[10px] sm:px-[20px] md:px-[40px] lg:pr-[80px] lg:pl-[80px] lg:pt-[10px] lg:pb-[10px] h-screen transition-colors duration-700"
    :class="isGalaxyTheme ? 'bg-[#0f0c29]' : 'bg-[#ffffff]'"
  >
    <div
      class="flex flex-col lg:flex-row h-full rounded-[16px] lg:rounded-[30px] overflow-hidden shadow-xl font-sans transition-colors duration-700 relative"
      :class="isGalaxyTheme ? 'bg-[#0f0c29]' : 'bg-white'"
      dir="rtl"
    >
      <!-- Mobile / Tablet Top Bar -->
      <div
        class="flex lg:hidden items-center justify-between px-4 py-3 shadow-md z-20 transition-colors duration-700"
        :class="isGalaxyTheme ? 'bg-[#1a1a2e]' : 'bg-[#BFD1D5]'"
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
              :class="isGalaxyTheme ? 'text-white' : 'text-[#0F184B]'"
            >
              {{ admin?.full_name || 'مدیر سیستم' }}
            </h2>
          </div>
        </div>

        <button
          @click="isMobileMenuOpen = true"
          class="p-2 rounded-lg"
          :class="isGalaxyTheme ? 'text-white' : 'text-[#0F184B]'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
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
          isGalaxyTheme ? 'bg-[#1a1a2e]' : 'bg-[#BFD1D5]',
          isSidebarOpen ? 'lg:w-[253px] min-[1920px]:w-[300px]' : 'lg:w-[90px] min-[1920px]:w-[112px]'
        ]"
      >
        <!-- Close button (only mobile/tablet) -->
        <button
          @click="isMobileMenuOpen = false"
          class="lg:hidden self-start mr-[18px] mb-4 p-1"
          :class="isGalaxyTheme ? 'text-white' : 'text-[#0F184B]'"
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
            <h2 class="font-bold text-[#0F184B] text-[14px] min-[1920px]:text-[17px] whitespace-nowrap">
              {{ admin?.full_name || 'مدیر سیستم' }}
            </h2>
            <p class="text-gray-500 text-[12px] min-[1920px]:text-[14px] mt-1 whitespace-nowrap font-roboto">
              {{ admin?.mobile || '' }}
            </p>
            <p class="w-[139px] min-[1920px]:w-[170px] text-gray-500 text-[9px] min-[1920px]:text-[11px] mt-1 whitespace-nowrap font-roboto">
              {{ admin?.email || '' }}
            </p>
          </div>
        </div>

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
                  : (activeComponent === item.component ? 'text-[#2C7379]' : 'text-[#454C6A]')"
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
              ? `bg-[#67A9A880] hover:bg-[#8FB0B2] border border-white gap-4 rounded-br-3xl rounded-tl-3xl justify-start text-right min-[1920px]:px-6 min-[1920px]:py-3  ${isGalaxyTheme ? 'text-white' : 'text-red-500'}`
              : `bg-[#67A9A880] hover:bg-[#8FB0B2] border border-white gap-4 rounded-br-3xl rounded-tl-3xl justify-start text-right ${isGalaxyTheme ? 'text-white' : 'text-red-500'} lg:bg-transparent lg:border-transparent lg:justify-center lg:hover:scale-110 lg:gap-0 lg:px-0 min-[1920px]:px-0 min-[1920px]:py-1.5`"
          >
            <span
              class="flex items-center justify-center flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-[22px] h-[22px] min-[1920px]:w-[26px] min-[1920px]:h-[26px] lg:w-[33px] lg:h-[33px] min-[1920px]:!w-[42px] min-[1920px]:!h-[42px]"
            >
              <admin-icons-logout
                class="w-full h-full max-w-full max-h-full"
                :class="isGalaxyTheme ? 'text-white' : 'text-red-500'"
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
        class="flex-1 rounded-b-[16px] lg:rounded-b-none lg:rounded-l-[40px] mr-0 lg:mr-[-20px] overflow-y-auto transition-colors duration-700 hide-scrollbar"
        :class="isGalaxyTheme ? 'bg-[#0f0c29]' : 'bg-[#ECEDF4]'"
      >
        <div v-if="!activeComponent" class="w-full h-full flex items-center justify-center p-4">
          <img src="/images/empty-page4.png" alt="Empty State" class="w-full max-w-[1200px] max-h-[260px] lg:max-h-[500px] object-contain " />
        </div>
        <component v-else :is="activeComponent" />
      </main>
    </div>
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

// اطلاعات ادمین لاگین‌شده (همان دیتایی که هنگام لاگین از API گرفته و در composable ذخیره شد)
const { admin, initFromStorage, clearAuth } = useAdminAuth()

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

  // اگر کاربر روی "قرعه‌کشی" کلیک کند، تم کهکشانی فعال شود
  isGalaxyTheme.value = (component === LotteryDraw)

  // بعد از انتخاب آیتم، منوی موبایل بسته شود
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

// کلاس‌های آیتم‌های منو: در موبایل همیشه حالت "باز" نمایش داده می‌شود
// و در دسکتاپ (lg) دقیقاً همان رفتار قبلی هاور حفظ شده است
const getNavItemClasses = (item) => {
  const isActive = activeComponent.value === item.component

  const openClasses = isActive
    ? `bg-[#67A9A880] border-[#67A9A8] ${isGalaxyTheme.value ? 'text-white' : 'text-[#0F184B]'} gap-4 rounded-br-3xl rounded-tl-3xl justify-start text-right min-[1920px]:px-6 min-[1920px]:py-3`
    : `bg-[#67A9A880] ${isGalaxyTheme.value ? 'text-white' : 'text-[#0F184B]/80'} hover:bg-[#8FB0B2] border border-white gap-4 rounded-br-3xl rounded-tl-3xl justify-start text-right min-[1920px]:px-6 min-[1920px]:py-3`

  const closedClassesDesktop = isActive
    ? `lg:bg-transparent lg:border-transparent lg:justify-center lg:gap-0 lg:px-0 min-[1920px]:px-0 min-[1920px]:py-1.5 ${isGalaxyTheme.value ? 'lg:text-white' : 'lg:text-[#0F184B]'}`
    : `lg:bg-transparent lg:border-transparent lg:justify-center lg:hover:scale-110 lg:gap-0 lg:px-0 min-[1920px]:px-0 min-[1920px]:py-1.5 ${isGalaxyTheme.value ? 'lg:text-white' : 'lg:text-[#0F184B]/80'}`

  return isSidebarOpen.value ? openClasses : `${openClasses} ${closedClassesDesktop}`
}

const logout = () => {
  clearAuth() // پاک کردن توکن و اطلاعات ادمین از state و localStorage
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