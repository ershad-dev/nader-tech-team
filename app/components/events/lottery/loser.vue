<template>
  <!-- کانتینر اصلی صفحه با پس‌زمینه تیره و چیدمان راست‌چین -->
  <div class="min-h-screen bg-[#35434E] flex justify-center items-center p-4" dir="rtl">

    <!-- تصویر پس‌زمینه که در بالای صفحه قرار گرفته است -->
    <img src="/images/not-this-time.png" class="absolute inset-0 w-full h-[232px] object-cover" alt="Not This Time" />

    <!-- بخش محتوای اصلی که کمی پایین‌تر از تصویر قرار دارد -->
    <div class="p-8 mt-[100px]">

      <!-- کارت شفاف با افکت بلور (شیشه‌ای) -->
      <div class="bg-white/20 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center border border-white/40 shadow-lg w-[450px]">

        <!-- آیکون غمگین -->
        <Icon name="heroicons:face-frown" class="w-12 h-12 text-white mb-4" />

        <!-- عنوان اصلی با استفاده از رنگ طلایی برای کلمه شانس -->
        <h2 class="text-xl font-bold text-white mb-4">
          این بار <span class="text-[#D4AF37]">شانس</span> با شما نبود
        </h2>

        <!-- متن توضیحات وضعیت -->
        <p class="text-white/90 text-sm leading-relaxed">
          <template v-if="status?.entry?.lottery?.title">
            متأسفیم در قرعه‌کشی «{{ status.entry.lottery.title }}» نام<br>
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
import { useLotteryStatus } from '~/composables/useLotteryStatus'

const { status, fetchStatus } = useLotteryStatus()

onMounted(async () => {
  try {
    await fetchStatus()
  } catch (err) {
    // در صورت خطا فقط متن پیش‌فرض نمایش داده میشه
  }
})
</script>