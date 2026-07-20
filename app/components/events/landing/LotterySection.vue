<script setup>
const { token, initAuth } = useAuth()

const isLoggedIn = computed(() => !!token.value)

onMounted(() => {
  initAuth()
})

const router = useRouter()

function goToRegister() {
  if (isLoggedIn.value) {
    router.push('/events/lottery/register')
  } else {
    router.push('/auth/login?redirect=/events/lottery/register')
  }
}

function goToLoginPage() {
  if (isLoggedIn.value) {
    router.push('/events/lottery/login')
  } else {
    router.push('/auth/login?redirect=/events/lottery/login')
  }
}
</script>

<template>
  <section
    class="relative w-full md:w-[1110px] min-[1920px]:w-[1400px] max-w-full mx-auto
           h-auto min-h-[380px] sm:min-h-[420px] md:h-[629px] min-[1920px]:h-[700px]
           rounded-[12px] sm:rounded-[17px] min-[1920px]:rounded-[20px]
           overflow-hidden
           p-5 sm:p-8 md:p-12 min-[1920px]:p-16
           mt-[30px] sm:mt-[60px] md:mt-[75px] min-[1920px]:mt-[90px]"
  >
    <!-- تصویر پس‌زمینه -->
    <img
      src="/images/bglottery.png"
      alt="قرعه کشی"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- لایه شفاف -->
    <div class="absolute inset-0 bg-white/10"></div>

    <!-- بخش متن‌ها (بالا) -->
    <div class="relative z-10 text-white text-right flex flex-col items-start">
      <img
        src="/images/rebon-lottery1.png"
        alt=""
        class="w-[160px] h-[60px] xs:w-[190px] xs:h-[72px] sm:w-[300px] sm:h-[114px] md:w-[380px] md:h-[144px]"
      />

      <div
        class="w-[50%] sm:w-[45%] md:w-[35%] mr-1 sm:mr-4 md:mr-[20px]
               mt-2 sm:mt-4 md:mt-[20px] mb-4 sm:mb-8 lg:mb-10
               h-[1.5px] bg-gradient-to-r from-white/75 to-gray-400"
      ></div>

      <p
        class="text-[12px] sm:text-[18px] md:text-[20px]
               text-[#0F184B] font-roboto
               mr-1 sm:mr-8 md:mr-[70px] leading-snug sm:leading-relaxed text-center"
      >
        شانس خود را امتحان کنید<br />
        و برنده جوایز هیجان انگیز شوید
      </p>
    </div>

    <!-- بخش دکمه‌ها (پوزیشن مطلق، سمت راست) -->
    <div
      class="absolute right-5 sm:right-8 md:right-12 min-[1920px]:right-16
             bottom-5 sm:bottom-8 md:bottom-24 min-[1920px]:bottom-32
             left-5 sm:left-auto
             z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 min-[1920px]:gap-6
             w-auto"
    >
      <button
        @click="goToRegister"
        class="bg-white/90 text-[#333B6A] px-4 sm:px-8 md:px-4 min-[1920px]:px-6 py-3
               rounded-[12px] sm:rounded-[17px] min-[1920px]:rounded-[20px]
               text-[14px] sm:text-[18px] md:text-[15px] min-[1920px]:text-[20px]
               font-bold hover:bg-white transition whitespace-nowrap
               w-full sm:w-[220px] md:w-[190px] min-[1920px]:w-[260px]
               h-[44px] sm:h-[56px] md:h-[48px] min-[1920px]:h-[84px]"
      >
        ثبت‌نام در قرعه‌کشی
      </button>

      <button
        @click="goToLoginPage"
        class="bg-white/90 text-[#333B6A] px-4 sm:px-8 md:px-4 min-[1920px]:px-6 py-3
               rounded-[12px] sm:rounded-[17px] min-[1920px]:rounded-[20px]
               text-[14px] sm:text-[18px] md:text-[15px] min-[1920px]:text-[20px]
               font-bold hover:bg-white transition whitespace-nowrap
               w-full sm:w-[220px] md:w-[190px] min-[1920px]:w-[260px]
               h-[44px] sm:h-[56px] md:h-[48px] min-[1920px]:h-[84px]"
      >
        ورود به قرعه‌کشی
      </button>
    </div>
  </section>
</template>