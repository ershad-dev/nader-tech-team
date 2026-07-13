<template>
    
    <div class="min-h-screen flex flex-col items-center py-6 px-3 sm:py-8 sm:px-4 lg:py-12" dir="ltr">
      
      <div class="w-full max-w-[500px] sm:max-w-[600px] lg:max-w-[700px] bg-[#ffffff]/30 backdrop-blur-md border border-white/10 rounded-[20px] sm:rounded-[26px] lg:rounded-[30px] overflow-hidden shadow-2xl">
        
        <div class="bg-[#9A57B8]/80 py-3 sm:py-4 lg:py-5 text-center">
          <h2 class="text-white text-lg sm:text-xl lg:text-2xl font-bold">برندگان قرعه‌کشی</h2>
        </div>
  
        <div class="p-3 sm:p-5 lg:p-6">
          <div v-if="loading" class="text-center py-8 text-white/80">در حال بارگذاری...</div>
          <div v-else-if="errorMsg" class="text-center py-8 text-red-200 font-medium">{{ errorMsg }}</div>
          <div v-else-if="!winnersList.length" class="text-center py-8 text-white/70">برنده‌ای ثبت نشده است</div>

          <div v-else v-for="winner in winnersList" :key="winner.id" 
               class="flex items-center justify-between gap-2 py-3 lg:py-4 border-b border-white/10 last:border-none text-white">
            <span class="text-xs sm:text-base lg:text-lg font-medium truncate" dir="ltr">{{ winner.phone }}</span>
            <span class="text-xs sm:text-base lg:text-lg font-medium truncate">{{ winner.name }}</span>
            <span class="text-base sm:text-lg lg:text-xl font-bold w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center shrink-0">
              {{ winner.number }}
            </span>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'

  const props = defineProps({
    // شناسه‌ی قرعه‌کشی؛ اگر پاس داده نشود از query param آدرس (?lottery=ID) خونده می‌شود
    lotteryId: { type: [String, Number], default: null },
    // اگر برندگان از قبل (مثلاً بلافاصله بعد از /draw) موجود باشند، نیازی به فراخوانی مجدد API نیست
    winners: { type: Array, default: null },
  })

  const route = useRoute()
  const resolvedLotteryId = computed(() => props.lotteryId ?? route.query.lottery)

  const { getWinners } = useLotteryApi()

  const winnersList = ref([])
  const loading = ref(false)
  const errorMsg = ref('')

  // شماره موبایل رو مثل نمونه‌ی طراحی، به‌صورت جزئی مخفی نمایش می‌دهیم
  const maskMobile = (mobile) => {
    if (!mobile || mobile.length < 6) return mobile || ''
    return mobile.slice(0, 4) + '***' + mobile.slice(-4)
  }

  const mapWinner = (w) => ({
    id: w.id ?? w.user?.id,
    name: w.user?.full_name,
    phone: maskMobile(w.user?.mobile),
    number: w.position,
  })

  const loadWinners = async () => {
    if (!resolvedLotteryId.value) {
      errorMsg.value = 'شناسه‌ی قرعه‌کشی مشخص نشده است'
      return
    }
    loading.value = true
    errorMsg.value = ''
    try {
      const res = await getWinners(resolvedLotteryId.value)
      winnersList.value = (res.data || []).map(mapWinner)
    } catch (err) {
      errorMsg.value = 'خطا در دریافت لیست برندگان'
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    if (props.winners && props.winners.length) {
      // برندگان از قبل (بلافاصله بعد از قرعه‌کشی) موجود هستند
      winnersList.value = props.winners.map(mapWinner)
    } else {
      // در غیر این صورت مستقیماً از API گرفته می‌شود (مثلاً وقتی این صفحه جدا باز شود)
      loadWinners()
    }
  })
  </script>