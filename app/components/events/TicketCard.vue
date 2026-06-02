<template>
  <div class="w-full max-w-4xl mx-auto mt-10">
    <h3 class="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
      <span class="w-2 h-6 bg-emerald-500 rounded-full"></span>
      بلیت‌های شرکت در قرعه‌کشی شما
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="ticket in tickets" 
        :key="ticket.id"
        class="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between"
      >
        <div class="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-950 rounded-full border border-slate-800"></div>
        <div class="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-950 rounded-full border border-slate-800"></div>

        <div class="flex items-start justify-between border-b border-dashed border-slate-800 pb-4 mb-4">
          <div>
            <h4 class="font-bold text-slate-100 mb-1">{{ ticket.eventName }}</h4>
            <span class="text-xs text-slate-500">تاریخ ثبت: {{ ticket.createdAt }}</span>
          </div>
          
          <span 
            class="text-xs font-bold px-2.5 py-1 rounded-md"
            :class="statusClasses(ticket.status)"
          >
            {{ statusText(ticket.status) }}
          </span>
        </div>

        <div class="flex items-center justify-between text-sm">
          <div class="flex flex-col">
            <span class="text-xs text-slate-500 mb-0.5">شماره بلیت</span>
            <span class="font-mono text-emerald-400 font-bold tracking-wider text-base">{{ ticket.code }}</span>
          </div>

          <div class="flex flex-col text-left">
            <span class="text-xs text-slate-500 mb-0.5">شانس قرعه‌کشی</span>
            <span class="font-bold text-slate-200 text-base">{{ ticket.chances }} شانس</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// آرایه دیتای فرضی بلیت‌های کاربر
const tickets = ref([
  {
    id: 1,
    eventName: 'قرعه‌کشی بزرگ ۱۰۰ میلیون تومانی نادر تک تیم',
    code: 'NTT-98432',
    createdAt: '۱۴۰۵/۰۳/۰۵',
    status: 'pending', // وضعیت‌ها: pending, won, lost
    chances: 5
  },
  {
    id: 2,
    eventName: 'رویداد پایان فصل بهار (تجهیزات هوشمند)',
    code: 'NTT-10254',
    createdAt: '۱۴۰۵/۰۲/۲۰',
    status: 'won',
    chances: 2
  },
  {
    id: 3,
    eventName: 'مسابقه هفتگی ربات تلگرام تیمی',
    code: 'NTT-04592',
    createdAt: '۱۴۰۵/۰۲/۱۵',
    status: 'lost',
    chances: 1
  }
])

// مدیریت استایل وضعیت‌ها بر اساس نوع وضعیت
const statusClasses = (status) => {
  switch (status) {
    case 'won': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    case 'lost': return 'bg-red-500/10 text-red-400 border border-red-500/20'
    default: return 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
  }
}

// مدیریت متن وضعیت‌ها
const statusText = (status) => {
  switch (status) {
    case 'won': return '🎉 برنده شده'
    case 'lost': return 'پوچ'
    default: return '⏳ در انتظار قرعه‌کشی'
  }
}
</script>