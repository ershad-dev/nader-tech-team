<template>
  <!-- لایه بک‌گراند مخصوص موبایل/تبلت: کل صفحه را با dvh می‌گیرد و ثابت می‌ماند -->
  <div
    class="fixed inset-0 w-full h-[100dvh] bg-[url('/images/bg-lottery.png')] bg-cover bg-center bg-no-repeat -z-10 lg:hidden"
  ></div>

  <div
    class="lottery-scroll relative min-h-[100dvh] lg:min-h-screen lg:bg-[url('/images/bg-lottery.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:bg-fixed text-white flex flex-col p-4 sm:p-6 lg:p-8 min-[1920px]:p-12 transition-colors duration-700"
    dir="rtl"
  >


      <button
  @click="goBack"
  class="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg hover:bg-white/25 transition-colors"
  aria-label="بازگشت"
>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</button>

    <div v-if="loadingData" class="flex-1 flex items-center justify-center text-white/80">
      در حال بارگذاری اطلاعات قرعه‌کشی...
    </div>

    <div v-else-if="errorMsg" class="flex-1 flex items-center justify-center text-red-300 font-medium text-center px-4">
      {{ errorMsg }}
    </div>

    <template v-else>
      <div
        v-if="!showResults"
        class="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-[repeat(6,max-content)] justify-items-center lg:justify-center gap-2 sm:gap-3 lg:gap-4 min-[1920px]:gap-6 mb-6 sm:mb-8 lg:mb-10 min-[1920px]:mb-8 w-full lg:w-auto mx-auto"
        dir="ltr"
      >
        <div
          v-for="i in totalCircles"
          :key="i"
          class="circle-cut w-full aspect-[126/106] sm:aspect-[90/76] lg:w-[126px] lg:h-[106px] lg:aspect-auto rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] backdrop-blur-xl border shadow-[0_8px_32px_rgba(30,64,175,0.35)] relative transition-all duration-150"
          :class="winnerIndexes.includes(i - 1)
            ? 'bg-gradient-to-br from-yellow-300/80 via-yellow-400/70 to-amber-600/80 border-yellow-100 scale-105'
            : (highlightedIndex === i - 1
                ? 'bg-gradient-to-br from-white/60 via-[#6EA8FF]/40 to-[#1E40AF]/80 border-white/70 scale-105'
                : 'bg-gradient-to-br from-white/35 via-[#6EA8FF]/25 to-[#1E40AF]/70 border-white/30')"
        >
<span
  class="absolute inset-0 flex items-center justify-center text-white font-bold text-[16px] sm:text-[22px] lg:text-[36px] leading-none"
>
  {{ entries[i - 1]?.user_id ?? i }}
</span>
        </div>
      </div>

      <LotteryResults v-else :lottery-id="resolvedLotteryId" :winners="finalWinners" />

      <div v-if="!showResults" class="flex flex-col items-center gap-3 sm:gap-4 min-[1920px]:gap-6 px-2 sm:px-0">
        <p v-if="!canDraw" class="text-amber-200 text-sm font-medium text-center bg-black/20 rounded-xl px-4 py-2">
          این قرعه‌کشی تا تاریخ {{ formatDateTime(lottery?.ends_at) }} قابل برگزاری نیست.
        </p>
        <p v-if="drawError" class="text-red-300 text-sm font-medium text-center">{{ drawError }}</p>

        <button
          @click="startDraw"
          :disabled="isDrawing || !entries.length || !canDraw"
          class="w-full max-w-[478px] sm:w-[478px] bg-white text-[#3949ab] px-6 sm:px-10 py-3 rounded-full font-bold shadow-xl flex items-center justify-center gap-2 h-[44px] text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>{{ isDrawing ? 'در حال قرعه‌کشی...' : 'شروع قرعه‌کشی' }}</span>

<svg width="28" height="28" class="sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_773_1093)">
<path d="M26.668 18.6667L23.6146 21.72L19.7746 17.88L17.8813 19.7733L21.7213 23.6133L18.668 26.6667H26.668V18.6667ZM26.668 13.3333V5.33334H18.668L21.7213 8.38668L15.4546 14.6667H5.33463V17.3333H16.548L23.6146 10.28L26.668 13.3333Z" fill="#0F184B"/>
</g>
<defs>
<clipPath id="clip0_773_1093">
<rect width="32" height="32" fill="white" transform="matrix(0 1 -1 0 32 0)"/>
</clipPath>
</defs>
</svg>
        </button>

        <button 
          @click="showResults = true"
          :disabled="!finalWinners.length"
          class="w-full max-w-[283px] sm:w-[283px] h-[44px] bg-[#7e57c2] text-white px-6 sm:px-10 py-3 rounded-full font-bold shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>نتایج قرعه‌کشی</span>

<svg width="28" height="28" class="sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_773_1087)">
<path d="M15.9987 6C9.33203 6 3.6387 10.1467 1.33203 16C3.6387 21.8533 9.33203 26 15.9987 26C22.6654 26 28.3587 21.8533 30.6654 16C28.3587 10.1467 22.6654 6 15.9987 6ZM15.9987 22.6667C12.3187 22.6667 9.33203 19.68 9.33203 16C9.33203 12.32 12.3187 9.33333 15.9987 9.33333C19.6787 9.33333 22.6654 12.32 22.6654 16C22.6654 19.68 19.6787 22.6667 15.9987 22.6667ZM15.9987 12C13.7854 12 11.9987 13.7867 11.9987 16C11.9987 18.2133 13.7854 20 15.9987 20C18.212 20 19.9987 18.2133 19.9987 16C19.9987 13.7867 18.212 12 15.9987 12Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_773_1087">
<rect width="32" height="32" fill="white"/>
</clipPath>
</defs>
</svg>
        </button>
      </div>
    </template>
  </div>
</template>




<script setup>
import { ref, computed, onMounted, onUnmounted, inject, defineAsyncComponent } from 'vue';
// وارد کردن کامپوننت نتایج که قبلاً ساختیم
const LotteryResults = defineAsyncComponent(() => import('./LotteryResults.vue'));

const props = defineProps({
  lotteryId: { type: [String, Number], default: null },
})

const emit = defineEmits(['back'])

// اگر lotteryId به‌عنوان prop پاس داده نشده باشد، از query param آدرس خونده می‌شود
const route = useRoute()
const resolvedLotteryId = computed(() => props.lotteryId ?? route.query.lottery)

const { getEntries, getLottery, drawLottery } = useLotteryApi()

const showResults = ref(false);

const entries = ref([])
const lottery = ref(null)
const loadingData = ref(true)
const errorMsg = ref('')

const isDrawing = ref(false)
const drawError = ref('')
const highlightedIndex = ref(null) // ایندکس (0-based) شماره‌ای که الان در حال چرخش، هایلایت شده
const winnerIndexes = ref([])       // ایندکس‌های (0-based) شماره‌هایی که به‌عنوان برنده قفل شده‌اند
const finalWinners = ref([])        // [{ user, position }]

// تعداد دایره‌ها = تعداد شرکت‌کنندگان واقعی (تا زمانی که دیتا لود نشده، ۳۶ تای پیش‌فرض نمایش داده می‌شود)
const totalCircles = computed(() => entries.value.length || 36)

// طبق مستندات API: قرعه‌کشی فقط بعد از رسیدن به تاریخ پایان (ends_at) قابل برگزاری‌ست
const canDraw = computed(() => {
  if (!lottery.value?.ends_at) return true // اگر تاریخ پایان مشخص نبود، اجازه بده و بذار خود سرور تصمیم بگیرد
  return new Date(lottery.value.ends_at).getTime() <= Date.now()
})

const formatDateTime = (value) => {
  if (!value) return ''
  try {
    return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
  } catch {
    return value
  }
}

const loadData = async () => {
  if (!resolvedLotteryId.value) {
    errorMsg.value = 'شناسه‌ی قرعه‌کشی در آدرس مشخص نشده است (؟lottery=ID)'
    loadingData.value = false
    return
  }
  loadingData.value = true
  errorMsg.value = ''
  try {
    const [entriesRes, lotteryRes] = await Promise.all([
      getEntries(resolvedLotteryId.value, 1, 100),
      getLottery(resolvedLotteryId.value),
    ])
    entries.value = entriesRes.data || []
    lottery.value = lotteryRes.data || null
  } catch (err) {
    errorMsg.value = 'خطا در دریافت اطلاعات قرعه‌کشی'
  } finally {
    loadingData.value = false
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// یک دور اسپین: بین شماره‌های باقی‌مانده به‌صورت نامنظم/رندوم می‌چرخد
// و در قدم‌های پایانی سرعتش کم می‌شود تا روی یک شماره بایستد
const spinToWinner = async (availableIndexes) => {
  const totalSteps = 18 + Math.floor(Math.random() * 6)
  let delay = 45
  for (let step = 0; step < totalSteps; step++) {
    highlightedIndex.value = availableIndexes[Math.floor(Math.random() * availableIndexes.length)]
    await sleep(delay)
    // در ۶ قدم آخر، سرعت رو به کندی می‌رود (افکت ایستادن روی شماره)
    delay += step > totalSteps - 6 ? 35 : 6
  }
  const finalPick = availableIndexes[Math.floor(Math.random() * availableIndexes.length)]
  highlightedIndex.value = finalPick
  await sleep(500)
  return finalPick
}

const startDraw = async () => {
  if (isDrawing.value || loadingData.value || !entries.value.length) return
  if (!canDraw.value) {
    drawError.value = `این قرعه‌کشی تا تاریخ ${formatDateTime(lottery.value?.ends_at)} قابل برگزاری نیست.`
    return
  }

  drawError.value = ''
  isDrawing.value = true
  winnerIndexes.value = []
  finalWinners.value = []

  // تعداد جایزه‌ها از خود قرعه‌کشی خونده می‌شود، اگر نبود پیش‌فرض ۱
  const winnerCount = Math.min(lottery.value?.winner_count || 1, entries.value.length)
  let available = entries.value.map((_, idx) => idx)

  // برای هر جایزه، یک اسپین جدا انجام می‌شود تا شماره‌ی برنده مشخص شود
  for (let position = 1; position <= winnerCount; position++) {
    const picked = await spinToWinner(available)
    winnerIndexes.value.push(picked)
    available = available.filter((idx) => idx !== picked)
  }

  highlightedIndex.value = null

  finalWinners.value = winnerIndexes.value.map((idx, i) => ({
    user: entries.value[idx].user,
    position: i + 1,
  }))

  try {
    await drawLottery(
      resolvedLotteryId.value,
      finalWinners.value.map((w) => ({ user_id: w.user.id, position: w.position }))
    )
    showResults.value = true
  } catch (err) {
    const serverMsg = err?.data?.message
    if (serverMsg?.toLowerCase().includes('end time has not been reached')) {
      drawError.value = `این قرعه‌کشی تا تاریخ ${formatDateTime(lottery.value?.ends_at)} قابل برگزاری نیست.`
    } else {
      drawError.value = serverMsg || 'خطا در ثبت نتیجه‌ی قرعه‌کشی. لطفاً دوباره تلاش کنید.'
    }
    // چون قرعه‌کشی توسط سرور رد شد، وضعیت انتخاب برنده‌ها رو هم پاک می‌کنیم
    winnerIndexes.value = []
    finalWinners.value = []
    highlightedIndex.value = null
  } finally {
    isDrawing.value = false
  }
}

const setGalaxyTheme = inject('setGalaxyTheme')

onMounted(() => {
  setGalaxyTheme(true)
  loadData()
})

onUnmounted(() => {
  setGalaxyTheme(false)
})


const router = useRouter()
const goBack = () => {
  emit('back')
}
</script>


<style scoped> 

/* HTML: <div class="circle-cut"></div> */
.circle-cut {
  --r: 13px; /* cut size */
  height: 90px;
  width: 100px;
  mask: radial-gradient(var(--r) at var(--r),#0000 calc(100% - 1px),#000) calc(-1*var(--r));
}

@media (max-width: 1023px) {
  .circle-cut {
    --r: 8px;
    width: 100%;
    height: auto;
  }
}

.lottery-scroll::-webkit-scrollbar {
  width: 10px;
}

.lottery-scroll::-webkit-scrollbar-track {
  background: #0f0c29;
}

.lottery-scroll::-webkit-scrollbar-thumb {
  background: linear-gradient(#67A9A8, #2C7379);
  border-radius: 9999px;
}

.lottery-scroll::-webkit-scrollbar-thumb:hover {
  background: #4d9aa0;
}

.lottery-scroll {
  scrollbar-width: thin;
  scrollbar-color: #67A9A8 #0f0c29;
}


.circle-cut span {
  transform: translateY(2px);
}
</style>