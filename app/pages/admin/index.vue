<script setup>
import { 
  UserIcon, PhotoIcon, DocumentTextIcon, 
  FolderIcon, GiftIcon, DocumentIcon 
} from '@heroicons/vue/24/outline';

// تعریف کامپوننت‌های فرعی (Lazy Loading)
const UserInfo = defineAsyncComponent(() => import('~/components/admin/UserInfo.vue'));
const BannerEdit = defineAsyncComponent(() => import('~/components/admin/BannerEdit.vue'));

definePageMeta({
  layout: 'admin-dash'
})

const activeComponent = shallowRef(UserInfo)

const navItems = [
  { name: 'اطلاعات کاربران', component: UserInfo, icon: UserIcon },
  { name: 'تغییر عکس بنر', component: BannerEdit, icon: PhotoIcon },
  { name: 'درخواست کاربران', component: UserInfo, icon: DocumentTextIcon },
  { name: 'کنترل روزمه', component: UserInfo, icon: FolderIcon },
  { name: 'قرعه کشی', component: UserInfo, icon: GiftIcon },
  { name: 'مقالات', component: UserInfo, icon: DocumentIcon },
]
</script>

<template>
  <NuxtLayout name="admin-dash">
    <!-- جای‌گذاری منو در سایدبار -->
    <template #sidebar>
      <nav class="w-full space-y-4 pr-4">
        <button 
          v-for="item in navItems" 
          :key="item.name"
          @click="activeComponent = item.component"
          :class="[
            'w-full p-4 flex items-center gap-3 transition-all duration-300 font-bold border-l-0 shadow-sm',
            activeComponent === item.component 
              ? 'bg-[#ebebeb] text-[#0F184B] rounded-r-3xl rounded-l-none border-2 border-white' 
              : 'text-[#0F184B] hover:bg-[#8FB0B2] rounded-r-3xl rounded-l-none'
          ]"
        >
          <component :is="item.icon" class="w-6 h-6" />
          {{ item.name }}
        </button>
      </nav>
    </template>

    <!-- نمایش محتوای اصلی -->
    <component :is="activeComponent" />
  </NuxtLayout>
</template>