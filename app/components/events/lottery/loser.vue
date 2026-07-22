<template>
  <div class="min-h-screen bg-[#35434E] dark:bg-dark-bg flex justify-center items-center p-4" dir="rtl">

    <img src="/images/not-this-time.png" class="absolute inset-0 w-full h-[232px] object-cover" alt="Not This Time" />

    <div class="p-8 mt-[100px]">

      <div class="bg-white/20 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center border border-white/40 shadow-lg w-[450px]">

        <Icon name="heroicons:face-frown" class="w-12 h-12 text-white mb-4" />

        <h2 class="text-xl font-bold text-white mb-4">
          این بار <span class="text-[#D4AF37] dark:text-dark-gold">شانس</span> با شما نبود
        </h2>

        <p class="text-white/90 text-sm leading-relaxed">
          <template v-if="lottery?.title">
            متأسفیم در قرعه‌کشی «{{ lottery.title }}» نام<br>
            شما در میان برندگان قرار نگرفت.
          </template>
          <template v-else>
            متأسفیم در این دوره قرعه‌کشی نام<br>
            شما در میان برندگان قرار نگرفت.
          </template>
        </p>
      </div>

    </div>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useActiveLottery } from '~/composables/useActiveLottery'

// اطلاعات برد/باخت از login.vue/waiting.vue (استعلام موبایل+کد) میاد
// اینجا فقط عنوان قرعه‌کشی رو از endpoint عمومی جزئیات قرعه‌کشی می‌گیریم
const { lottery, fetchActiveLottery } = useActiveLottery()

onMounted(async () => {
  if (!lottery.value) {
    try { await fetchActiveLottery() } catch (err) { /* عنوان نمایش داده نمیشه */ }
  }
})
</script>