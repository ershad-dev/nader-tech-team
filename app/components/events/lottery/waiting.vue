<template>
  <div class="min-h-screen bg-[#F9F7F2] flex justify-center items-center p-4" dir="rtl">

    <RaffleCard class="w-full max-w-sm bg-white p-6 md:p-8 rounded-3xl shadow-xl">

      <div class="flex justify-center mb-8 md:mb-12">
        <div class="animate-spin-slow w-48 h-48 md:w-[310px] md:h-[310px]">
          <img src="/images/hourglass.png" alt="در انتظار قرعه‌کشی" class="w-full h-full object-contain" />
        </div>
      </div>

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
import { onMounted, onUnmounted } from 'vue'
import { useLotteryLogin } from '~/composables/useLotteryLogin'

// اطلاعات موبایل/کد از login.vue تو همین state ذخیره شده
const { loginCheck, error, checkEntry } = useLotteryLogin()

let pollTimer = null
const POLL_INTERVAL_MS = 10000 // هر ۱۰ ثانیه دوباره وضعیت رو با همون موبایل/کد چک می‌کنیم

async function checkStatus() {
  if (!loginCheck.value?.mobile || !loginCheck.value?.code) {
    error.value = 'اطلاعات ورود یافت نشد. لطفاً دوباره از صفحه ورود اقدام کنید.'
    stopPolling()
    return
  }

  try {
    const result = await checkEntry({
      mobile: loginCheck.value.mobile,
      code: loginCheck.value.code,
      name: loginCheck.value.name
    })

    if (result.lottery_finished) {
      stopPolling()
      if (result.is_winner) {
        await navigateTo('/winner')
      } else {
        await navigateTo('/loser')
      }
    }
  } catch (err) {
    // پیام خطا در error.value ذخیره و نمایش داده میشه
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