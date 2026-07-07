<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-6 sm:py-8 md:py-9 lg:py-10">

    <!-- باکس فرم که روی عکس قرار می‌گیرد -->
    <div class="relative z-10 w-full max-w-[701px] bg-[#ABD7D880]/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 shadow-xl border border-white">
      
      <!-- آیکون بازگشت -->
      <button @click="router.back()" class="mb-4 sm:mb-5 md:mb-5 lg:mb-6 block text-[#1a2333] hover:opacity-70 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
      
      <slot />
    </div>
  </div>
</template>

<script setup>
// استفاده از useRouter برای کنترلِ مسیرها
const router = useRouter()
</script>