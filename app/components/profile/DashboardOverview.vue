<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-black text-slate-100 mb-2">سلام، ارشاد عزیز! 👋</h2>
      <p class="text-sm text-slate-400">خلاصه وضعیت حساب و فعالیت‌های شما در نادر تک تیم به شرح زیر است:</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div 
        v-for="(stat, index) in stats" 
        :key="index"
        class="p-5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between group hover:border-emerald-500/30 transition-all"
      >
        <div>
          <span class="text-xs text-slate-500 block mb-1">{{ stat.title }}</span>
          <span class="text-2xl font-black text-slate-100 font-mono">{{ stat.value }}</span>
        </div>
        <div class="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center text-xl border border-slate-800 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all">
          {{ stat.icon }}
        </div>
      </div>
    </div>

    <div class="p-5 bg-slate-950 border border-slate-800 rounded-xl">
      <h3 class="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
        <span class="w-1.5 h-4 bg-emerald-500 rounded-full"></span>
        آخرین اطلاعیه‌ها
      </h3>
      <div class="space-y-3">
        <div class="p-3 bg-slate-900 rounded-lg text-xs md:text-sm text-slate-400 flex items-center justify-between">
          <span>🎉 قرعه‌کشی بزرگ فصل بهار ۳ روز دیگر به صورت زنده برگزار می‌شود. بلیت‌های خود را بررسی کنید.</span>
          <span class="text-slate-600 font-mono text-xs">امروز</span>
        </div>
        <div class="p-3 bg-slate-900 rounded-lg text-xs md:text-sm text-slate-400 flex items-center justify-between">
          <span>🔒 امنیت حساب: پیشنهاد می‌کنیم جهت افزایش امنیت، رمز عبور خود را تغییر دهید.</span>
          <span class="text-slate-600 font-mono text-xs">۳ روز پیش</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// دیتای فرضی کارت‌های آمار که بعداً از لاراول کسری واکشی می‌شود
const stats = ref([
  { title: 'کل بلیت‌های فعال', value: '۳ بلیت', icon: '🎫' },
  { title: 'مجموع شانس‌ها', value: '۸ شانس', icon: '🔥' },
  { title: 'امتیاز باشگاه مشتریان', value: '۱,۴۵۰', icon: '💎' }
])
</script>