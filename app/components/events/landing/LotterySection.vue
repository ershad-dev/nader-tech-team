<script setup>
const { token, initAuth } = useAuth()
const isLoggedIn = computed(() => !!token.value)

onMounted(() => {
  initAuth()
})

const router = useRouter()

function goToRegister() {
  router.push(isLoggedIn.value
    ? '/events/lottery/register'
    : '/auth/login?redirect=/events/lottery/register')
}

function goToLoginPage() {
  router.push(isLoggedIn.value
    ? '/events/lottery/login'
    : '/auth/login?redirect=/events/lottery/login')
}
</script>

<template>
  <div class="w-full px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 min-[1920px]:px-32">
    <section
      class="relative w-full max-w-[1400px] mx-auto
             aspect-[1110/629] rounded-2xl overflow-hidden mt-[50px]"
    >
      <!-- بک‌گراند -->
      <img
        src="/images/bglottery.png"
        alt="قرعه کشی"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />

      <!-- کانتینر بیرونی -->
      <div class="absolute inset-0 z-10 flex items-center justify-start px-[4%] text-white">
        <!-- بلوک محتوا -->
        <div class="flex flex-col items-center text-center">
          <img
            src="/images/rebon-lottery1.png"
            alt=""
            class="w-[42%] max-w-[420px] h-auto object-contain"
          />
          <div
            class="w-[55%] h-[2px] mt-[3%] mb-[3%]
                   bg-gradient-to-r from-white/75 to-gray-400"
          ></div>
          <p class="text-[clamp(14px,3vw,28px)] text-[#0F184B] font-roboto leading-snug">
            شانس خود را امتحان کنید<br />
            و برنده جوایز هیجان انگیز شوید
          </p>

          <button
            @click="goToRegister"
            class="mt-[4%] bg-white/90 text-[#333B6A]
                   px-5 sm:px-6 md:px-8 lg:px-10
                   py-2.5 sm:py-3 md:py-3.5
                   rounded-xl sm:rounded-2xl
                   text-[clamp(13px,1.8vw,20px)] font-bold
                   hover:bg-white transition whitespace-nowrap"
          >
            ثبت‌نام در قرعه‌کشی
          </button>
        </div>
      </div>
    </section>
  </div>
</template>