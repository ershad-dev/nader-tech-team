<template>
  <div class="p-[20px] bg-[#ffffff] h-screen">
    <div
      class="flex h-full bg-white rounded-[30px] overflow-hidden shadow-xl font-sans"
      dir="rtl"
    >
      <!-- Sidebar -->
      <aside
        :class="[
          'bg-[#BFD1D5] flex flex-col py-8 z-10 shadow-2xl transition-all duration-300',
          isSidebarOpen ? 'w-[253px]' : 'w-[90px]'
        ]"
      >
        <!-- Profile -->
        <div
          :class="[
            'flex mb-10',
            isSidebarOpen
              ? 'items-center justify-end gap-4 px-6'
              : 'justify-center'
          ]"
        >
          <img
            src="/images/admin-avatar.jpg"
            alt="Profile"
            :class="[
              'rounded-full border-4 border-white shadow-lg object-cover',
              isSidebarOpen
                ? 'w-[90px] h-[90px]'
                : 'w-[55px] h-[55px]'
            ]"
          />

          <div v-if="isSidebarOpen" class="text-right">
            <h2 class="font-bold text-[#0F184B] text-[16px]">
              ثمین زارعی
            </h2>
            <p class="text-gray-500 text-[13px] mt-1">
              0912 123 4567
            </p>
            <p class="text-gray-500 text-[14px] mt-1">
              samin@example.com
            </p>
          </div>
        </div>

        <!-- Menu -->
        <nav
          :class="[
            'flex flex-col gap-2',
            isSidebarOpen ? 'w-[252px] pr-4' : 'w-full px-2'
          ]"
        >
          <button
            v-for="item in navItems"
            :key="item.name"
            @click="selectItem(item.component)"
            :class="[
              'p-4 flex items-center transition-all font-bold border',
              activeComponent === item.component
                ? 'bg-[#67A9A880] border-[#67A9A8] text-[#0F184B]'
                : 'bg-[#67A9A8] text-[#0F184B]/80 hover:bg-[#8FB0B2]',
              isSidebarOpen
                ? 'gap-4 rounded-br-3xl rounded-tl-3xl text-right'
                : 'justify-center rounded-2xl'
            ]"
          >
                      <component :is="item.icon" class="w-6 h-6 flex-shrink-0" />

            <span v-if="isSidebarOpen">
              {{ item.name }}
            </span>
          </button>
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
            src="/images/empty-page.jpg"
            alt="Empty State"
            class="max-w-[900px] max-h-full object-contain"
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
import {
  UserIcon,
  PhotoIcon,
  DocumentTextIcon,
  FolderIcon,
  GiftIcon,
  DocumentIcon
} from '@heroicons/vue/24/outline'

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

/* در ابتدا هیچ کامپوننتی انتخاب نشده */
const activeComponent = shallowRef(null)

const selectItem = (component) => {
  activeComponent.value = component
  isSidebarOpen.value = true
}

const navItems = [
  {
    name: 'اطلاعات کاربران',
    component: UserInfo,
    icon: UserIcon
  },
  {
    name: 'تغییر عکس بنر',
    component: BannerEdit,
    icon: PhotoIcon
  },
  {
    name: 'درخواست کاربران',
    component: UserRequests,
    icon: DocumentTextIcon
  },
  {
    name: 'کنترل رزومه',
    component: ResumeControl,
    icon: FolderIcon
  },
  {
    name: 'قرعه کشی',
    component: Lottery,
    icon: GiftIcon
  },
  {
    name: 'مقالات',
    component: Articles,
    icon: DocumentIcon
  }
]
</script>