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
    class="relative w-[360px] md:w-[1110px] min-[1920px]:w-[1400px] max-w-full mx-auto
           h-auto min-h-[380px] sm:min-h-[420px] md:h-[629px] lg:h-[560px] xl:h-[600px] min-[1920px]:h-[700px]
           rounded-[12px] sm:rounded-[17px] min-[1920px]:rounded-[20px]
           overflow-hidden
           p-5 sm:p-8 md:p-12 min-[1920px]:p-16
           -mt-[50px] sm:mt-[60px] md:mt-[25px] min-[1920px]:mt-[90px]  "
  >
    <!-- تصویر پس‌زمینه -->
<img
  src="/images/bglottery.png"
  alt="قرعه کشی"
  class="absolute inset-0 w-full h-full object-contain min-[900px]:object-cover object-center"
/>

    <!-- لایه شفاف -->

    <!-- بخش متن‌ها (بالا) -->
    <div class="relative z-10 text-white text-right flex flex-col items-start min-[1920px]:-mt-[100px] md:-mt-[50px]">
<img
  src="/images/rebon-lottery1.png"
  alt=""
  class="w-[120px] h-[50px] mt-[85px]
         xs:w-[190px] xs:h-[72px]
         sm:w-[300px] sm:h-[114px]
         md:w-[300px] md:h-[100px] md:mt-[110px] md:mr-[35px] 
         lg:w-[380px] lg:h-[144px]
         min-[1920px]:mr-[50px] 
         mr-[26px] object-cover"
/>
      

<div
  class="w-[50%] sm:w-[45%] md:w-[35%] mr-1 sm:mr-4 md:mr-[70px] lg:mr-[20px]
         mt-2 sm:mt-4 md:mt-[20px] mb-4 sm:mb-8 lg:mb-10
         h-[1.5px] bg-gradient-to-r from-white/75 to-gray-400 dark:from-dark-highlight/70 dark:to-dark-border "
></div>

      <p
        class="text-[10px] sm:text-[18px] md:text-[20px]
               text-[#0F184B] dark:text-[#0F184B] font-roboto
                mr-[20px] sm:mr-8 md:mr-[70px] leading-snug sm:leading-relaxed text-center min-[1920px]:text-[28px] "
      >
        شانس خود را امتحان کنید<br />
        و برنده جوایز هیجان انگیز شوید
      </p>
    </div>

    <!-- بخش دکمه‌ها (پوزیشن مطلق، سمت راست) -->
<div
  class="absolute right-5 sm:right-8 md:right-12 min-[1920px]:right-16
         top-auto md:top-[380px] min-[1920px]:top-[600px]
         left-5 sm:left-auto
         z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 min-[1920px]:gap-6
         w-auto"
>
<button
  @click="goToRegister"
  class="bg-white/90 dark:bg-[#435056] text-[#333B6A] dark:text-white px-4 sm:px-8 md:px-4 min-[1920px]:px-6
         flex items-center justify-center leading-none
         rounded-[12px] sm:rounded-[17px] min-[1920px]:rounded-[20px]
         text-[9px] sm:text-[18px] md:text-[15px] min-[1920px]:text-[20px]
         font-bold hover:bg-white dark:hover:bg-dark-accent-hover/50 transition whitespace-nowrap
         w-[100px] mt-[20px] mr-[30px] sm:w-[220px] md:w-[220px] md:mr-[85px] md:mb-[70px] min-[1920px]:w-[260px]
         h-[26px] sm:h-[56px] md:h-[58px] min-[1920px]:h-[84px] min-[1920px]:mr-[110px] min-[1920px]:-mt-[100px] md:mt-[20px]
         "
>
  ثبت‌نام در قرعه‌کشی
</button>
    </div>
  </section>
</template>