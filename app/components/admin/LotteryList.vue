<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import LotteryForm from './LotteryForm.vue';

// اگر این کامپوننت داخل یک والد استفاده می‌شود (مثل Lottery.vue)، با انتخاب یک قرعه‌کشی
// رویداد select-lottery با شناسه‌ی همان قرعه‌کشی emit می‌شود تا والد بتواند نمایش را عوض کند.
const emit = defineEmits(['select-lottery'])

const route = useRoute()
const { getLotteries } = useLotteryApi()

const lotteries = ref([])
const loadingData = ref(true)
const errorMsg = ref('')

const page = ref(1)
const perPage = ref(10)
const statusFilter = ref('') // '' یعنی همه‌ی وضعیت‌ها

const lastPage = ref(1)
const totalCount = ref(0)

const statusOptions = [
  { value: '', label: 'همه' },
  { value: 'draft', label: 'پیش‌نویس' },
  { value: 'active', label: 'فعال' },
  { value: 'inactive', label: 'غیرفعال' },
  { value: 'drawn', label: 'برگزار شده' },
]

const statusLabel = (status) => statusOptions.find((s) => s.value === status)?.label || status

const statusBadgeClass = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700'
    case 'draft':
      return 'bg-gray-200 text-gray-600'
    case 'inactive':
      return 'bg-red-100 text-red-600'
    case 'drawn':
      return 'bg-purple-100 text-purple-700'
    default:
      return 'bg-gray-200 text-gray-600'
  }
}

const formatDate = (value) => {
  if (!value) return '—'
  try {
    return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
  } catch {
    return value
  }
}

// صفحه‌بندی از روی meta واقعی سرور (current_page / last_page / total)
const hasNextPage = computed(() => page.value < lastPage.value)
const hasPrevPage = computed(() => page.value > 1)

const loadLotteries = async () => {
  loadingData.value = true
  errorMsg.value = ''
  try {
    const res = await getLotteries(page.value, perPage.value, statusFilter.value || undefined)
    lotteries.value = res.data || []
    lastPage.value = res.meta?.last_page || 1
    totalCount.value = res.meta?.total ?? lotteries.value.length
  } catch (err) {
    errorMsg.value = 'خطا در دریافت لیست قرعه‌کشی‌ها'
  } finally {
    loadingData.value = false
  }
}

const goToPage = (delta) => {
  const next = page.value + delta
  if (next < 1) return
  page.value = next
}

watch([page, statusFilter], loadLotteries)

const selectLottery = (item) => {
  emit('select-lottery', item.id)
  // دیپ‌لینک: شناسه‌ی انتخاب‌شده در آدرس هم ثبت می‌شود (بدون تغییر مسیر فعلی)
  navigateTo({ path: route.path, query: { ...route.query, lottery: item.id } })
}

const showCreateForm = ref(false)

const handleCreated = () => {
  showCreateForm.value = false
  if (page.value === 1) {
    loadLotteries()
  } else {
    page.value = 1 // این تغییر خودش باعث فراخوانی مجدد loadLotteries توسط watch می‌شود
  }
}

onMounted(() => {
  loadLotteries()
})
</script>

<template>
  <div class="max-w-full lg:max-w-[1000px] min-[1920px]:max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 min-[1920px]:p-12" dir="rtl">

    <div class="bg-white flex flex-col sm:flex-row items-center justify-between gap-3 py-3 lg:py-4 min-[1920px]:py-6 px-4 sm:px-6 rounded-2xl mb-6 lg:mb-8 min-[1920px]:mb-10 font-bold text-[#1a2333] shadow-sm text-sm sm:text-base min-[1920px]:text-lg">
      <span>لیست قرعه‌کشی‌ها</span>

      <div class="flex items-center gap-3">
        <select
          v-model="statusFilter"
          class="bg-[#F5F3ED] border border-gray-200 rounded-lg py-1.5 px-3 text-xs sm:text-sm font-normal text-[#1a2333] focus:outline-none"
        >
          <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>

        <button
          @click="showCreateForm = true"
          class="bg-[#286463] text-white px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold hover:bg-[#1e4a49] transition whitespace-nowrap"
        >
          + افزودن قرعه‌کشی
        </button>
      </div>
    </div>

    <LotteryForm v-if="showCreateForm" @close="showCreateForm = false" @created="handleCreated" />

    <div v-if="loadingData" class="bg-[#F5F3ED] rounded-3xl py-12 text-center text-gray-500 shadow-sm">
      در حال بارگذاری لیست قرعه‌کشی‌ها...
    </div>

    <div v-else-if="errorMsg" class="bg-[#F5F3ED] rounded-3xl py-12 text-center text-red-500 font-medium shadow-sm px-4">
      {{ errorMsg }}
    </div>

    <div v-else-if="!lotteries.length" class="bg-[#F5F3ED] rounded-3xl py-12 text-center text-gray-500 shadow-sm">
      قرعه‌کشی‌ای یافت نشد
    </div>

    <template v-else>
      <!-- دسکتاپ: جدول -->
      <div class="hidden lg:block bg-[#F5F3ED] rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
        <table class="w-full text-center">
          <thead class="bg-[#BFCFD3]">
            <tr class="text-[#1a2333] font-bold min-[1920px]:text-lg">
              <th class="py-5 min-[1920px]:py-7">عنوان</th>
              <th class="py-5 min-[1920px]:py-7">تاریخ شروع</th>
              <th class="py-5 min-[1920px]:py-7">تاریخ پایان</th>
              <th class="py-5 min-[1920px]:py-7">تعداد برندگان</th>
              <th class="py-5 min-[1920px]:py-7">وضعیت</th>
              <th class="py-5 min-[1920px]:py-7"></th>
            </tr>
          </thead>
          <tbody class="text-gray-600 min-[1920px]:text-lg">
            <tr v-for="item in lotteries" :key="item.id" class="border-b border-gray-200 last:border-none">
              <td class="py-6 min-[1920px]:py-8 font-medium text-[#1a2333]">{{ item.title }}</td>
              <td class="py-6 min-[1920px]:py-8 text-sm">{{ formatDate(item.starts_at) }}</td>
              <td class="py-6 min-[1920px]:py-8 text-sm">{{ formatDate(item.ends_at) }}</td>
              <td class="py-6 min-[1920px]:py-8">{{ item.winner_count }}</td>
              <td class="py-6 min-[1920px]:py-8">
                <span class="px-3 py-1 rounded-full text-xs font-bold" :class="statusBadgeClass(item.status)">
                  {{ statusLabel(item.status) }}
                </span>
              </td>
              <td class="py-6 min-[1920px]:py-8">
                <button
                  @click="selectLottery(item)"
                  class="bg-[#286463] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#1e4a49] transition"
                >
                  مشاهده
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- موبایل و تبلت: کارت‌ها -->
      <div class="lg:hidden flex flex-col gap-3 sm:gap-4">
        <div
          v-for="item in lotteries"
          :key="item.id"
          class="bg-[#F5F3ED] rounded-2xl border border-gray-200 shadow-sm p-4"
        >
          <div class="flex justify-between items-center py-1.5 border-b border-gray-200">
            <span class="text-xs text-gray-500 font-bold">عنوان</span>
            <span class="text-sm text-gray-700 font-medium">{{ item.title }}</span>
          </div>
          <div class="flex justify-between items-center py-1.5 border-b border-gray-200">
            <span class="text-xs text-gray-500 font-bold">تاریخ شروع</span>
            <span class="text-xs text-gray-700">{{ formatDate(item.starts_at) }}</span>
          </div>
          <div class="flex justify-between items-center py-1.5 border-b border-gray-200">
            <span class="text-xs text-gray-500 font-bold">تاریخ پایان</span>
            <span class="text-xs text-gray-700">{{ formatDate(item.ends_at) }}</span>
          </div>
          <div class="flex justify-between items-center py-1.5 border-b border-gray-200">
            <span class="text-xs text-gray-500 font-bold">تعداد برندگان</span>
            <span class="text-sm text-gray-700">{{ item.winner_count }}</span>
          </div>
          <div class="flex justify-between items-center py-1.5 border-b border-gray-200">
            <span class="text-xs text-gray-500 font-bold">وضعیت</span>
            <span class="px-3 py-1 rounded-full text-xs font-bold" :class="statusBadgeClass(item.status)">
              {{ statusLabel(item.status) }}
            </span>
          </div>
          <div class="pt-3">
            <button
              @click="selectLottery(item)"
              class="w-full bg-[#286463] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#1e4a49] transition"
            >
              مشاهده
            </button>
          </div>
        </div>
      </div>

      <!-- صفحه‌بندی -->
      <div class="mt-6 flex items-center justify-center gap-3">
        <button
          @click="goToPage(-1)"
          :disabled="!hasPrevPage"
          class="px-4 py-2 rounded-lg bg-[#F5F3ED] border border-gray-200 text-sm font-bold text-[#1a2333] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          قبلی
        </button>
        <span class="text-sm text-gray-600">صفحه {{ page }} از {{ lastPage }} ({{ totalCount }} مورد)</span>
        <button
          @click="goToPage(1)"
          :disabled="!hasNextPage"
          class="px-4 py-2 rounded-lg bg-[#F5F3ED] border border-gray-200 text-sm font-bold text-[#1a2333] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          بعدی
        </button>
      </div>
    </template>
  </div>
</template>