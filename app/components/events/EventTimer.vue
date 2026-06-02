<template>
  <div class="w-full max-w-xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl text-white text-center">
    <h3 class="text-lg font-bold text-slate-400 mb-6">زمان باقی‌مانده تا بزرگ‌ترین قرعه‌کشی نادر تک تیم</h3>

    <div v-if="!isTimeUp" class="flex items-center justify-center gap-4 dir-ltr">
      <div class="flex flex-col items-center bg-slate-950 p-4 rounded-xl min-w-[70px] border border-slate-800">
        <span class="text-3xl font-black text-emerald-400">{{ timeLeft.days }}</span>
        <span class="text-xs text-slate-500 mt-1">روز</span>
      </div>
      
      <span class="text-2xl font-bold text-slate-700">:</span>

      <div class="flex flex-col items-center bg-slate-950 p-4 rounded-xl min-w-[70px] border border-slate-800">
        <span class="text-3xl font-black text-emerald-400">{{ timeLeft.hours }}</span>
        <span class="text-xs text-slate-500 mt-1">ساعت</span>
      </div>

      <span class="text-2xl font-bold text-slate-700">:</span>

      <div class="flex flex-col items-center bg-slate-950 p-4 rounded-xl min-w-[70px] border border-slate-800">
        <span class="text-3xl font-black text-emerald-400">{{ timeLeft.minutes }}</span>
        <span class="text-xs text-slate-500 mt-1">دقیقه</span>
      </div>

      <span class="text-2xl font-bold text-slate-700">:</span>

      <div class="flex flex-col items-center bg-slate-950 p-4 rounded-xl min-w-[70px] border border-slate-800/80 ring-1 ring-emerald-500/20">
        <span class="text-3xl font-black text-emerald-400 animate-pulse">{{ timeLeft.seconds }}</span>
        <span class="text-xs text-slate-500 mt-1">ثانیه</span>
      </div>
    </div>

    <div v-else class="py-4">
      <div class="inline-block px-4 py-2 bg-red-500/10 text-red-400 font-bold rounded-lg mb-3 border border-red-500/20 animate-bounce">
        🔴 قرعه‌کشی در حال برگزاری است!
      </div>
      <p class="text-sm text-slate-400">صفحه را رفرش نکنید، برندگان به زودی در همین صفحه اعلام می‌شوند.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

// تعیین تاریخ هدف (مثلاً برای ۳ روز آینده - این دیتا بعداً از سمت کسری می‌آید)
// فرمت استاندارد: YYYY-MM-DDTHH:mm:ss
const targetDate = new Date()
targetDate.setDate(targetDate.getDate() + 3) // به عنوان تست ۳ روز به زمان فعلی اضافه می‌کنیم

const isTimeUp = ref(false)
let timerInterval = null

// آبجکت تفکیک‌شده زمان
const timeLeft = reactive({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00'
})

const calculateTimeLeft = () => {
  const now = new Date().getTime()
  const difference = targetDate.getTime() - now

  if (difference <= 0) {
    isTimeUp.value = true
    clearInterval(timerInterval)
    return
  }

  // محاسبات ریاضی تبدیل میلی‌ثانیه به روز، ساعت، دقیقه و ثانیه
  const d = Math.floor(difference / (1000 * 60 * 60 * 24))
  const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const s = Math.floor((difference % (1000 * 60)) / 1000)

  // پدینگ زدن برای تک‌رقمی‌ها (مثلاً تبدیل ۵ به ۰۵)
  timeLeft.days = d.toString().padStart(2, '0')
  timeLeft.hours = h.toString().padStart(2, '0')
  timeLeft.minutes = m.toString().padStart(2, '0')
  timeLeft.seconds = s.toString().padStart(2, '0')
}

onMounted(() => {
  calculateTimeLeft() // اجرای اولیه برای اینکه لودینگ صفر ثانیه‌ای نداشته باشیم
  timerInterval = setInterval(calculateTimeLeft, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timerInterval)
})
</script>