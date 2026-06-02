<template>
  <div class="min-h-screen bg-slate-950 p-6">
    <div class="max-w-6xl mx-auto flex gap-6 items-start">
      
      <!-- سایدبار پروفایل (Sidebar) -->
      <aside class="w-64 shrink-0">
        <ProfileSidebar />
      </aside>

      <!-- محتوای اصلی پروفایل (Main Content) -->
      <main class="flex-1">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <!-- هدر پروفایل -->
          <div class="flex items-center gap-4 mb-8 pb-8 border-b border-slate-800">
            <div class="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 text-2xl font-bold border border-emerald-500/20">
              {{ authStore.user?.name?.charAt(0) || 'ک' }}
            </div>
            <div>
              <h1 class="text-2xl font-bold text-slate-100">سلام، {{ authStore.getUserName }}</h1>
              <p class="text-slate-400">به پنل کاربری «نادر تک» خوش آمدید.</p>
            </div>
          </div>

          <!-- جزئیات اطلاعات کاربر -->
          <div class="space-y-6">
            <h2 class="text-lg font-semibold text-slate-200">اطلاعات حساب</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span class="text-xs text-slate-500 block mb-1">نام و نام خانوادگی</span>
                <span class="text-slate-200 font-medium">{{ authStore.user?.name }}</span>
              </div>
              
              <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span class="text-xs text-slate-500 block mb-1">شماره تلفن</span>
                <span class="text-slate-200 font-mono">{{ authStore.user?.phone }}</span>
              </div>
            </div>

            <!-- دکمه خروج -->
            <div class="pt-6">
              <button 
                @click="authStore.logoutUser"
                class="px-6 py-2.5 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all"
              >
                خروج از حساب
              </button>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
</script>