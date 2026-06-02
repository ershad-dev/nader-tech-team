<!-- components/events/LiveWinner.vue -->
<template>
  <div class="w-full max-w-xl mx-auto mt-10 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-white">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-bold flex items-center gap-2">
        <span class="flex h-3 w-3 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        لیست برندگان قرعه‌کشی زنده
      </h3>
      
      <button 
        v-if="!isSimulating" 
        @click="startLiveSimulation"
        class="text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg transition"
      >
        شروع شبیه‌سازی لایو
      </button>
    </div>

    <!-- لیست برندگان -->
    <div class="space-y-3 max-h-64 overflow-y-auto pr-1">
      <TransitionGroup name="list">
        <div 
          v-for="(winner, index) in liveWinners" 
          :key="winner.id"
          class="flex items-center justify-between p-3 rounded-xl border text-sm transition-all duration-300"
          :class="index === 0 ? 'bg-emerald-500/10 border-emerald-500/30 ring-1 ring-emerald-500/20 scale-[1.02]' : 'bg-slate-950 border-slate-800'"
        >
          <div class="flex items-center gap-3">
            <!-- رتبه یا مدال -->
            <span class="w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs"
              :class="index === 0 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'">
              {{ liveWinners.length - index }}
            </span>
            <span class="font-medium text-slate-200">{{ winner.name }}</span>
          </div>

          <div class="flex items-center gap-4">
            <span class="text-xs font-mono text-slate-500">بلیت: {{ winner.ticket }}</span>
            <span class="font-bold text-emerald-400">{{ winner.prize }}</span>
          </div>
        </div>
      </TransitionGroup>

      <!-- وضعیت خالی بودن لیست -->
      <div v-if="liveWinners.length === 0" class="text-center py-8 text-slate-500 text-sm border border-dashed border-slate-800 rounded-xl">
        در انتظار شروع قرعه‌کشی و استخراج نام برندگان...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'

const liveWinners = ref([])
const isSimulating = ref(false)
let intervalId = null

// بانک دیتای فرضی برای شبیه‌سازی برنده‌ها (این دیتای اصلی بعداً از لاراول کسری می‌آید)
const poolOfWinners = [
  { name: 'محمد احمدی', ticket: 'NTT-8492', prize: 'جایزه ۱۰ میلیون تومانی' },
  { name: 'سارا رضایی', ticket: 'NTT-1045', prize: 'کارت هدیه ۵ میلیون تومانی' },
  { name: 'رضا کریمی', ticket: 'NTT-0394', prize: 'ربات تلگرام رایگان' },
  { name: 'مهسا علوی', ticket: 'NTT-5582', prize: 'تخفیف ۵۰٪ طراحی سایت' },
  { name: 'امیرحسین مرادی', ticket: 'NTT-7123', prize: 'جایزه ویژه ۵۰ میلیون تومانی' }
]

const startLiveSimulation = () => {
  if (isSimulating.value) return
  isSimulating.value = true
  liveWinners.value = []
  
  let counter = 0
  
  intervalId = setInterval(() => {
    if (counter < poolOfWinners.length) {
      // اضافه کردن برنده جدید به ابتدای آرایه (Unshift) برای ایجاد افکت ورود از بالا
      liveWinners.value.unshift({
        id: Date.now(),
        ...poolOfWinners[counter]
      })
      counter++
    } else {
      clearInterval(intervalId)
      isSimulating.value = false
    }
  }, 3000) // هر ۳ ثانیه یک برنده اعلام می‌شود
}

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
/* انیمیشن وو Vue برای ورود نرم برندگان جدید به لیست */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>