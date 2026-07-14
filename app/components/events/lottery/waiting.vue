<template>
  <div class="min-h-screen bg-[#F9F7F2] flex justify-center items-center p-4" dir="rtl">

    <!-- محدود کردن عرض با max-w-sm برای حفظ تناسب در دسکتاپ -->
    <RaffleCard class="w-full max-w-sm bg-white p-6 md:p-8 rounded-3xl shadow-xl">

      <!-- تصویر ساعت شنی با سایز منعطف -->
      <div class="flex justify-center mb-8 md:mb-12">
        <div class="animate-spin-slow w-48 h-48 md:w-[310px] md:h-[310px]">
          <img src="/images/hourglass.png" alt="در انتظار قرعه‌کشی" class="w-full h-full object-contain" />
        </div>
      </div>

      <!-- باکس وضعیت -->
      <div class="bg-[#ebebeb] rounded-3xl p-6 md:p-8 text-center shadow-sm border border-gray-200">
        <p class="text-gray-500 text-sm mb-2">وضعیت شما</p>
        <h2 class="text-xl md:text-2xl font-bold text-[#2D7A6F] mb-4">در انتظار قرعه‌کشی</h2>
        <p class="text-gray-500 text-sm md:text-base leading-relaxed">
          <template v-if="error">{{ error }}</template>
          <template v-else>
            لطفاً منتظر بمانید<br>
            قرعه‌کشی به زودی آغاز می‌شود
          </template>
        </p>
      </div>

    </RaffleCard>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useLotteryStatus } from '~/composables/useLotteryStatus'

const { status, error, fetchStatus } = useLotteryStatus()

let pollTimer = null
const POLL_INTERVAL_MS = 10000 // هر ۱۰ ثانیه وضعیت رو از my-status چک می‌کنیم

async function checkStatus() {
  try {
    const data = await fetchStatus()

    // وقتی قرعه‌کشی برگزار شده (نتیجه مشخص شده)، کاربر رو به صفحه مربوطه هدایت می‌کنیم
    if (data?.lottery?.status === 'completed' || data?.lottery?.drawn_at) {
      stopPolling()
      if (data.is_winner) {
        await navigateTo('/winner')
      } else {
        await navigateTo('/loser')
      }
    }
  } catch (err) {
    // خطا (مثلاً 401) در status.value ذخیره شده و در قالب نمایش داده میشه
  }
}

function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

onMounted(() => {
  checkStatus()
  pollTimer = setInterval(checkStatus, POLL_INTERVAL_MS)
})

onUnmounted(() => {
  stopPolling()
})
</script>

<style scoped>
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 5s linear infinite;
}
</style>