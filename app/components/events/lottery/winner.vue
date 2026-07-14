<template>
  <div class="min-h-screen bg-[#9ED8A7] flex justify-center items-center p-4" dir="rtl">

    <div class="w-full max-w-md">

      <div class="relative w-full h-[250px] flex justify-center items-center mb-6">
        <img src="/images/kaghaz.jpg" class="absolute w-full h-full object-cover rounded-3xl" alt="پس‌زمینه" />
        <img src="/images/trophy.png" class="relative z-10 w-32 h-32 md:w-40 md:h-40 object-contain" alt="کاپ برنده" />
      </div>

      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-white mb-2">تبریک!</h1>
        <p class="text-white text-[20px] fon-700">شما برنده قرعه‌کشی هستید</p>
      </div>

      <div class="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl">
        <h2 class="text-[#1A5715] font-bold text-xl mb-6 text-center"> شما برنده شدید</h2>

        <div class="space-y-6">
          <div class="border-b border-gray-300 pb-2">
            <p class="text-gray-400 text-[14px] mb-1 font-roboto">قرعه‌کشی</p>
            <p class="font-bold text-gray-800">{{ lottery?.title || '-' }}</p>
          </div>
          <div v-if="loginCheck?.name" class="border-b border-gray-300 pb-2">
            <p class="text-gray-400 text-[14px] mb-1 font-roboto">نام و نام خانوادگی</p>
            <p class="font-bold text-gray-800">{{ loginCheck.name }}</p>
          </div>
          <div v-if="loginCheck?.code">
            <p class="text-gray-400 text-[14px] mb-1 font-roboto">کد قرعه‌کشی</p>
            <p class="font-bold text-gray-800">{{ loginCheck.code }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'
import { useLotteryLogin } from '~/composables/useLotteryLogin'
import { useActiveLottery } from '~/composables/useActiveLottery'

// اطلاعات از همون استعلام موبایل+کد که تو login.vue/waiting.vue انجام شده میاد
// (name سمت کلاینت نگه داشته میشه چون API برش نمی‌گردونه)
const { loginCheck } = useLotteryLogin()
const { lottery, fetchActiveLottery } = useActiveLottery()

// توجه: API این endpoint فقط lottery_finished و is_winner برمی‌گردونه،
// نه رتبه‌ی برندگی (winner_position) یا جایزه. اگه این اطلاعات لازمه،
// باید از بک‌اند خواسته بشه به پاسخ /login هم اضافه بشه.

onMounted(async () => {
  if (!lottery.value) {
    try { await fetchActiveLottery() } catch (err) { /* عنوان قرعه‌کشی نمایش داده نمیشه */ }
  }

  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ffffff', '#2D7A6F', '#FFD700']
  })
})
</script>