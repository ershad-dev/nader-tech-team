<script setup>
const props = defineProps({
  winners: { type: Array, default: () => [] },
})

const maskMobile = (mobile) => {
  if (!mobile || mobile.length < 7) return mobile
  return mobile.slice(0, 4) + '***' + mobile.slice(-4)
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center py-6 px-3 sm:py-8 sm:px-4 lg:py-12" dir="ltr">
    <div class="w-full max-w-[500px] sm:max-w-[600px] lg:max-w-[700px] bg-[#ffffff]/30 backdrop-blur-md border border-white/10 rounded-[20px] sm:rounded-[26px] lg:rounded-[30px] overflow-hidden shadow-2xl">
      <div class="bg-[#9A57B8]/80 py-3 sm:py-4 lg:py-5 text-center">
        <h2 class="text-white text-lg sm:text-xl lg:text-2xl font-bold">برندگان قرعه‌کشی</h2>
      </div>

      <div class="p-3 sm:p-5 lg:p-6">
        <div v-if="!winners.length" class="text-center text-white/70 py-6">
          برنده‌ای ثبت نشده است.
        </div>

        <div
          v-for="winner in winners"
          :key="winner.id"
          class="flex items-center justify-between gap-2 py-3 lg:py-4 border-b border-white/10 last:border-none text-white"
        >
          <span class="text-xs sm:text-base lg:text-lg font-medium truncate" dir="ltr">
            {{ maskMobile(winner.user?.mobile) }}
          </span>
          <span class="text-xs sm:text-base lg:text-lg font-medium truncate">
            {{ winner.user?.full_name }}
          </span>
          <span class="text-base sm:text-lg lg:text-xl font-bold w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center shrink-0">
            {{ winner.position }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>