<script setup>
import { ref, onMounted, computed } from 'vue'
import LotteryDraw from './LotteryDraw.vue'
import LotteryInfoModal from './LotteryInfoModal.vue'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useAdminPermissions } from '~/composables/useAdminPermissions'

const API_BASE = 'https://nadertechnologyteam.ir/api'
const { authHeader, initFromStorage } = useAdminAuth()
const { isReadOnly } = useAdminPermissions()

const colorMode = useColorMode()

const showLotteryPage = ref(false)
const entries = ref([])
const loading = ref(true)
const errorMsg = ref('')
const currentLottery = ref(null) // آبجکت کامل قرعه‌کشی جاری
const lotteryId = ref(null)

const showInfoModal = ref(false)

// رنگ اسکرول‌بار بر اساس حالت رنگی (دارک/لایت)
const scrollbarThumbColor = computed(() =>
  colorMode.value === 'dark' ? '#72A6A6' : '#67A9A8'
)
const scrollbarThumbHoverColor = computed(() =>
  colorMode.value === 'dark' ? '#ADE9EA' : '#4d9aa0'
)

// پیدا کردن قرعه‌کشی جاری: اول فعال‌ترین، اگر نبود آخرین مورد کلی
const resolveCurrentLottery = async () => {
  try {
    // تلاش اول: قرعه‌کشی فعال
    const activeRes = await $fetch(`${API_BASE}/admin/lotteries`, {
      headers: authHeader(),
      query: { page: 1, per_page: 1, status: 'active' },
    })

    if (activeRes.data?.length) {
      return activeRes.data[0]
    }

    // fallback: بدون فیلتر status، آخرین قرعه‌کشی موجود
    const allRes = await $fetch(`${API_BASE}/admin/lotteries`, {
      headers: authHeader(),
      query: { page: 1, per_page: 1 },
    })

    return allRes.data?.[0] || null
  } catch (err) {
    console.error(err)
    return null
  }
}

const fetchEntries = async () => {
  loading.value = true
  errorMsg.value = ''

  const lottery = await resolveCurrentLottery()

  if (!lottery) {
    errorMsg.value = 'قرعه‌کشی‌ای یافت نشد.'
    loading.value = false
    return
  }

  currentLottery.value = lottery
  lotteryId.value = lottery.id

  try {
    const res = await $fetch(
      `${API_BASE}/admin/lotteries/${lotteryId.value}/entries`,
      {
        method: 'GET',
        headers: authHeader(),
        query: { page: 1, per_page: 50 },
      }
    )
    entries.value = res.data || []
  } catch (err) {
    console.error(err)
    if (err?.response?.status === 401) errorMsg.value = 'احراز هویت نشده است.'
    else if (err?.response?.status === 403) errorMsg.value = 'دسترسی مجاز نیست.'
    else if (err?.response?.status === 404) errorMsg.value = 'قرعه‌کشی یافت نشد.'
    else errorMsg.value = 'خطا در دریافت اطلاعات.'
  } finally {
    loading.value = false
  }
}

// وقتی اطلاعات قرعه‌کشی از مودال ویرایش شد، هدر همین صفحه هم آپدیت بشه
const onLotteryUpdated = (updatedLottery) => {
  if (isReadOnly.value) return
  currentLottery.value = { ...currentLottery.value, ...updatedLottery }
}

// ورود به صفحه‌ی برگزاری قرعه‌کشی؛ برای کاربر فقط-نمایش مسدود است
// چون LotteryDraw.vue عملیات نوشتنی (اجرای واقعی قرعه‌کشی) انجام می‌دهد.
const openLotteryDraw = () => {
  if (isReadOnly.value) return
  showLotteryPage.value = true
}

onMounted(() => {
  initFromStorage()
  fetchEntries()
})
</script>

<template>
  <div v-if="!showLotteryPage" class="max-w-full lg:max-w-[1000px] min-[1920px]:max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 min-[1920px]:p-12" dir="rtl">

    <!-- بنر اطلاع‌رسانی حالت فقط-نمایش -->
    <div
      v-if="isReadOnly"
      class="mb-5 text-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 font-bold py-2.5 px-4 rounded-xl text-sm"
    >
      شما فقط دسترسی مشاهده دارید و امکان برگزاری یا ویرایش قرعه‌کشی وجود ندارد.
    </div>

    <div class="bg-white dark:bg-dark-input flex items-center justify-center gap-3 py-3 lg:py-4 min-[1920px]:py-6 rounded-2xl mb-6 lg:mb-8 min-[1920px]:mb-10 font-bold text-[#1a2333] dark:text-dark-text-deep shadow-sm text-sm sm:text-base min-[1920px]:text-lg relative">
      <div class="text-center">
        اطلاعات قرعه‌کشی
        <span v-if="currentLottery" class="block text-xs font-normal text-gray-500 dark:text-dark-text-deep/70 mt-1">
          {{ currentLottery.title }}
        </span>
      </div>

      <button
        v-if="currentLottery"
        @click="showInfoModal = true"
        class="bg-[#67A9A880] dark:bg-dark-accent/60 text-black dark:text-dark-text-deep px-3 sm:px-5 lg:px-6 py-2 rounded-full text-xs sm:text-sm hover:bg-[#235754] dark:hover:bg-dark-accent-hover transition-all whitespace-nowrap absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-bold "
      >
        جزئیات بیشتر
      </button>
    </div>

    <div v-if="loading" class="text-center py-10 text-gray-500 dark:text-dark-text/70">در حال بارگذاری...</div>
    <div v-else-if="errorMsg" class="text-center py-10 text-red-500 dark:text-red-400 font-bold">{{ errorMsg }}</div>

    <template v-else>
<!-- دسکتاپ -->
<div class="hidden lg:block bg-[#F5F3ED] dark:bg-dark-surface rounded-3xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-sm">
  <div class="max-h-[360px] min-[1920px]:max-h-[440px] overflow-y-auto entries-scroll">
    <table class="w-full text-center">
      <thead class="bg-[#BFCFD3] dark:bg-dark-input sticky top-0 z-10">
        <tr class="text-[#1a2333] dark:text-dark-text-deep font-bold min-[1920px]:text-lg">
          <th class="py-5 min-[1920px]:py-7">کد کاربری</th>
          <th class="py-5 min-[1920px]:py-7">کد قرعه‌کشی</th>
          <th class="py-5 min-[1920px]:py-7">نام و نام خانوادگی</th>
          <th class="py-5 min-[1920px]:py-7">شماره موبایل</th>
        </tr>
      </thead>
      <tbody class="text-gray-600 dark:text-dark-text min-[1920px]:text-lg">
        <tr v-for="entry in entries" :key="entry.id" class="border-b border-gray-200 dark:border-dark-border last:border-none">
          <td class="py-6 min-[1920px]:py-8">{{ entry.user_id }}</td>
          <td class="py-6 min-[1920px]:py-8">{{ entry.code ?? '—' }}</td>
          <td class="py-6 min-[1920px]:py-8">{{ entry.user?.full_name }}</td>
          <td class="py-6 min-[1920px]:py-8" dir="ltr">{{ entry.user?.mobile }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

      <!-- موبایل و تبلت -->
<div class="lg:hidden max-h-[420px] overflow-y-auto entries-scroll flex flex-col gap-3 sm:gap-4 pr-1">
  <div
    v-for="entry in entries"
    :key="entry.id"
    class="bg-[#F5F3ED] dark:bg-dark-input rounded-2xl border border-gray-200 dark:border-dark-border shadow-sm p-4"
  >
          <div class="flex justify-between items-center py-1.5 border-b border-gray-200 dark:border-dark-border">
            <span class="text-xs text-gray-500 dark:text-dark-text-deep/70 font-bold">کد کاربری</span>
            <span class="text-sm text-gray-700 dark:text-dark-text-deep">{{ entry.user_id }}</span>
          </div>
          <div class="flex justify-between items-center py-1.5 border-b border-gray-200 dark:border-dark-border">
            <span class="text-xs text-gray-500 dark:text-dark-text-deep/70 font-bold">کد قرعه‌کشی</span>
            <span class="text-sm text-gray-700 dark:text-dark-text-deep break-all">{{ entry.code ?? '—' }}</span>
          </div>
          <div class="flex justify-between items-center py-1.5 border-b border-gray-200 dark:border-dark-border">
            <span class="text-xs text-gray-500 dark:text-dark-text-deep/70 font-bold">نام و نام خانوادگی</span>
            <span class="text-sm text-gray-700 dark:text-dark-text-deep">{{ entry.user?.full_name }}</span>
          </div>
          <div class="flex justify-between items-center py-1.5">
            <span class="text-xs text-gray-500 dark:text-dark-text-deep/70 font-bold">شماره موبایل</span>
            <span class="text-sm text-gray-700 dark:text-dark-text-deep" dir="ltr">{{ entry.user?.mobile }}</span>
          </div>
        </div>
      </div>
    </template>

    <div class="mt-6 lg:mt-8 min-[1920px]:mt-12 flex justify-center">
      <button
        @click="openLotteryDraw"
        :disabled="isReadOnly"
        :title="isReadOnly ? 'شما فقط دسترسی مشاهده دارید' : ''"
        class="bg-[#286463] dark:bg-dark-accent text-white dark:text-dark-text-deep px-8 sm:px-10 lg:px-12 min-[1920px]:px-16 py-2.5 sm:py-3 min-[1920px]:py-4 rounded-xl font-bold hover:bg-[#1e4a49] dark:hover:bg-dark-accent-hover transition shadow-lg cursor-pointer text-sm sm:text-base min-[1920px]:text-lg w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#286463] dark:disabled:hover:bg-dark-accent"
      >
        برگزاری قرعه‌کشی
      </button>
    </div>

    <LotteryInfoModal
      v-if="lotteryId"
      :show="showInfoModal"
      :lottery-id="lotteryId"
      :read-only="isReadOnly"
      @close="showInfoModal = false"
      @updated="onLotteryUpdated"
    />
  </div>

<LotteryDraw v-else :lottery-id="lotteryId" :read-only="isReadOnly" @back="showLotteryPage = false" />
</template>

<style scoped>
.entries-scroll::-webkit-scrollbar {
  width: 8px;
}
.entries-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.entries-scroll::-webkit-scrollbar-thumb {
  background: v-bind(scrollbarThumbColor);
  border-radius: 9999px;
}
.entries-scroll::-webkit-scrollbar-thumb:hover {
  background: v-bind(scrollbarThumbHoverColor);
}
.entries-scroll {
  scrollbar-width: thin;
  scrollbar-color: v-bind(scrollbarThumbColor) transparent;
}
</style>