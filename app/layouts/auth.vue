<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-6 sm:py-8 md:py-9 lg:py-10" :dir="isRtl ? 'rtl' : 'ltr'">

    <!-- باکس فرم که روی عکس قرار می‌گیرد -->
    <div class="relative z-10 w-full max-w-[701px] bg-[#ABD7D880]/50 dark:bg-dark-input/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 shadow-xl border border-white dark:border-dark-border">
      
      <!-- آیکون بازگشت -->
      <button @click="handleBack" class="mb-4 sm:mb-5 md:mb-5 lg:mb-6 block text-[#1a2333] dark:text-dark-text-deep hover:opacity-70 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" :class="isRtl ? '' : 'scale-x-[-1]'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
      
      <slot />
    </div>
  </div>
</template>

<script setup>
// استفاده از useRouter و useRoute برای کنترلِ مسیرها
const router = useRouter()
const route = useRoute()

// --- i18n ---
const { localeProperties } = useI18n()
const localePath = useLocalePath()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

// روت‌بیس‌نیم مستقل از پیشوند زبان (چون با strategy: prefix_except_default
// مسیر انگلیسی چیزی مثل auth-login___en میشه و با route.path دیگه match نمیشه)
const routeBaseName = computed(() => route.name?.toString().split('___')[0])

// مسیرهایی که باید به جای بازگشت، به صفحه اصلی برن
// این‌ها الان route name هستن (بدون پیشوند زبان)، نه route.path
const goHomeRouteNames = ['admin-ntt20119', 'auth-login']

function handleBack() {
  if (goHomeRouteNames.includes(routeBaseName.value)) {
    router.push(localePath('/'))
  } else {
    router.back()
  }
}
</script>