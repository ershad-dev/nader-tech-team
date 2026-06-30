<template>
  <div class="pr-[80px] pl-[80px] pt-[10px] pb-[10px] bg-[#ffffff] h-screen">
    <div
      class="flex h-full bg-white rounded-[30px] overflow-hidden shadow-xl font-sans"
      dir="rtl"
    >
      <!-- Sidebar -->
      <aside
  @mouseenter="isSidebarOpen = true"
  @mouseleave="isSidebarOpen = false"
  :class="[
    'bg-[#BFD1D5] flex flex-col py-8 z-10 shadow-2xl transition-all duration-500 ease-out ',
    isSidebarOpen ? 'w-[253px] ' : 'w-[90px]'
  ]"
>
  <!-- Profile -->
  <div
    :class="[
      'flex mb-10',
      isSidebarOpen
        ? 'items-center justify-end gap-4 px-6 mb-[35px]'
        : 'justify-center mb-[80px]'
    ]"
  >
    <img
      src="/images/admin-avatar.jpg"
      alt="Profile"
      :class="[
        'rounded-full shadow-lg object-cover transition-all duration-500 ease-out',
        isSidebarOpen
          ? 'w-[90px] h-[90px] rotate-0'
          : 'w-[55px] h-[55px] '
      ]"
    />

    <div
      :class="[
        'text-right overflow-hidden transition-all duration-500 ease-out ',
        isSidebarOpen
          ? 'opacity-100 max-w-[180px] translate-x-0'
          : 'opacity-0 max-w-0 translate-x-4'
      ]"
    >
      <h2 class="font-bold text-[#0F184B] text-[16px] whitespace-nowrap">
        ثمین زارعی
      </h2>

      <p class="text-gray-500 text-[13px] mt-1 whitespace-nowrap font-roboto">
        09121234567
      </p>

      <p class="w-[139px] text-gray-500 text-[10px] mt-1 whitespace-nowrap font-roboto  ">
        samin@example.com
      </p>
    </div>
  </div>

  <!-- Menu -->
  <nav
    :class="[
      'flex flex-col gap-1 transition-all duration-500 ',
      isSidebarOpen ? 'w-[252px] h-[78px]  ' : 'w-full'
    ]"
  >
<button
  v-for="item in navItems"
  :key="item.name"
  @click="selectItem(item.component)"
  :class="[
    'px-4 py-2 flex items-center transition-all duration-300 hover:scale-[1.03] font-bold border min-h-[62px]',
    // استایل‌های پس‌زمینه و شکل دکمه
    isSidebarOpen
      ? (activeComponent === item.component
          ? 'bg-[#67A9A880] border-[#67A9A8] text-[#0F184B] gap-4 rounded-br-3xl rounded-tl-3xl text-right'
          : 'bg-[#67A9A880] text-[#0F184B]/80 hover:bg-[#8FB0B2] border-transparent gap-4 rounded-br-3xl rounded-tl-3xl text-right border border-white')
      : (activeComponent === item.component
          ? 'bg-transparent border-transparent text-[#0F184B] justify-center'
          : 'bg-transparent border-transparent text-[#0F184B]/80 justify-center hover:scale-110')
  ]"
>
  <component
    :is="item.icon"
    :class="[
      'flex-shrink-0 transition-all duration-300',
      isSidebarOpen ? 'w-[25px] h-[25px]' : 'w-[28px] h-[28px] -mt-[90px]',
      // تغییر رنگ آیکون فقط در صورت انتخاب شدن
      activeComponent === item.component 
        ? 'text-[#2C7379]' // رنگ آیکون فعال (تیره)
        : 'text-[#454C6A]'  // رنگ آیکون غیرفعال
    ]"
  />

  <span
    :class="[
      'overflow-hidden whitespace-nowrap transition-all duration-500 ease-out text-[20px]',
      isSidebarOpen ? 'opacity-100 max-w-[150px]' : 'opacity-0 max-w-0'
    ]"
  >
    {{ item.name }}
  </span>
</button>
<button @click="logout" class="text-red-500">خروج از پنل</button>
  </nav>
  
</aside>

      <!-- Main Content -->
      <main
        class="flex-1 bg-[#ECEDF4] rounded-l-[40px] p-10 mr-[-20px] overflow-y-auto"
      >
        <!-- Empty State -->
        <div
          v-if="!activeComponent"
          class="w-full h-full flex items-center justify-center"
        >
          <img
            src="/images/empty-page1.png"
            alt="Empty State"
            class="w-[1200px] max-h-[700px] object-contain"
          />
        </div>

        <!-- Selected Component -->
        <component
          v-else
          :is="activeComponent"
        />


      </main>
    </div>
  </div>
</template>

<script setup>

import { ref, shallowRef, defineAsyncComponent } from 'vue'
import HomeIcon from '~/components/admin/icons/home.vue'
import UserAvatarIcon from '~/components/admin/icons/userAvatar.vue'
import BannerEditIcon from '~/components/admin/icons/bannerEdit.vue'
import UserRequestIcon from '~/components/admin/icons/userRequest.vue'
import ResumeIcon from '~/components/admin/icons/rezume.vue'
import LotteryIcon from '~/components/admin/icons/lottery.vue'
import ArticlesIcon from '~/components/admin/icons/articles.vue'

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

const Articles = defineAsyncComponent(() =>
  import('~/components/admin/Articles.vue')
)

const isSidebarOpen = ref(false)

const activeComponent = shallowRef(null)

const selectItem = (component) => {
  activeComponent.value = component
}

const navItems = [
  {
    name: 'خانه',
    path: '/',
    icon: HomeIcon
  },

  {
    name: 'اطلاعات کاربران',
    component: UserInfo,
    icon: UserAvatarIcon
  },
  {
    name: 'تغییر عکس بنر',
    component: BannerEdit,
    icon: BannerEditIcon
  },
  {
    name: 'درخواست کاربران',
    component: UserRequests,
    icon: UserRequestIcon
  },
  {
    name: 'کنترل رزومه',
    component: ResumeControl,
    icon: ResumeIcon
  },
  {
    name: 'قرعه کشی',
    component: Lottery,
    icon: LotteryIcon
  },
  {
    name: 'مقالات',
    component: Articles,
    icon: ArticlesIcon
  }
]
//logout
const logout = () => {
  localStorage.removeItem('isAdminLoggedIn')
  navigateTo('/admin/ntt20119')
}
</script>