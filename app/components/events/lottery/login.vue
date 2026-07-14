<template>
  <div class="min-h-screen bg-[#F9F7F2] flex justify-center items-center p-4" dir="rtl">

    <RaffleCard class="w-full max-w-md p-6 md:p-8">

      <div class="text-center mb-10">
        <h1 class="text-[20px] md:text-2xl font-bold text-[#0F184B] mb-2">ورود به قرعه‌کشی</h1>
        <p class="text-[#B2B4C2] text-[15px] font-600 font-roboto">برای شرکت در قرعه‌کشی، اطلاعات خود را وارد کنید.</p>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-4 mt-[100px]">
        <input
          type="text"
          placeholder="نام و نام خانوادگی"
          v-model="form.name"
          class="w-full h-[55px] p-4 rounded-[17px] border border-gray-200 outline-none bg-[#D9D9D92B] font-roboto focus:border-[#2D7A6F] transition"
        />
        <input
          type="tel"
          placeholder="شماره موبایل"
          v-model="form.phone"
          class="w-full h-[55px] p-4 rounded-[17px] border bg-[#D9D9D92B] border-gray-200 font-roboto outline-none focus:border-[#2D7A6F] transition text-right"
        />
        <input
          type="text"
          placeholder="کد قرعه‌کشی"
          v-model="form.code"
          class="w-full h-[55px] p-4 rounded-2xl border border-gray-200 outline-none bg-[#D9D9D92B] font-roboto focus:border-[#2D7A6F] transition"
        />

        <!-- پیام خطای استعلام (کد/موبایل اشتباه، قرعه‌کشی یافت نشد) -->
        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      </form>

      <button
        @click="handleLogin"
        :disabled="pending"
        class="w-full bg-[#2D7A6F] text-white py-4 rounded-[17px] font-bold mt-[150px] hover:bg-teal-800 transition shadow-lg mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {{ pending ? 'در حال بررسی...' : 'ورود به قرعه‌کشی' }}
      </button>

    </RaffleCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLotteryLogin } from '~/composables/useLotteryLogin'

const form = ref({ name: '', phone: '', code: '' })
const { pending, error, checkEntry } = useLotteryLogin()

const handleLogin = async () => {
  // توجه: API فقط mobile و code رو نیاز داره؛ name فقط سمت کلاینت نگه داشته میشه
  // تا تو صفحات بعدی (waiting/winner/loser) بدون نیاز به my-status نشون داده بشه
  try {
    const result = await checkEntry({
      mobile: form.value.phone,
      code: form.value.code,
      name: form.value.name
    })

    if (!result.lottery_finished) {
      await navigateTo('/events/lottery/waiting')
    } else if (result.is_winner) {
      await navigateTo('/events/lottery/winner')
    } else {
      await navigateTo('/events/lottery/loser')
    }
  } catch (err) {
    // پیام خطا در error.value از خود composable نمایش داده میشه
  }
}
</script>