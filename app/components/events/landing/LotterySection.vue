<script setup>
const { token, initAuth } = useAuth()
const isLoggedIn = computed(() => !!token.value)

onMounted(() => {
  initAuth()
})

const router = useRouter()
const localePath = useLocalePath()
const { localeProperties, locale } = useI18n()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

const lotteryBannerImage = computed(() =>
  locale.value === 'en' ? '/images/rebon-lottery-en.png' : '/images/rebon-lottery1.png'
)

function goToRegister() {
  router.push(isLoggedIn.value
    ? localePath('/events/lottery/register')
    : localePath(`/auth/login?redirect=/events/lottery/register`))
}

function goToLoginPage() {
  router.push(isLoggedIn.value
    ? localePath('/events/lottery/login')
    : localePath(`/auth/login?redirect=/events/lottery/login`))
}
</script>

<template>
  <div class="w-full px-4 sm:px-5 md:px-8 lg:px-10 xl:px-14 min-[1920px]:px-32 mb-[50px]">
    <section
      class="relative w-full max-w-[1400px] mx-auto
             aspect-[1110/629] rounded-2xl overflow-hidden
             mt-[24px] sm:mt-[32px] md:mt-[40px] lg:mt-[50px]"
    >
      <!-- بک‌گراند -->
      <img
        src="/images/bglottery.png"
        :alt="$t('events.lottery.landing.bgAlt')"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />

      <!-- کانتینر بیرونی -->
<div
  :dir="isRtl ? 'rtl' : 'ltr'"
  :class="[
    'absolute inset-0 z-10 flex items-center px-[5%] sm:px-[4.5%] md:px-[4%] lg:px-[4%] text-white',
    isRtl ? 'justify-start -mr-[24px]' : 'justify-end -ml-[50px]',
    locale === 'en' ? '-mr-[24px] sm:-mr-[52px] md:-mr-[48px] lg:-mr-[40px] xl:mr-0' : ''
  ]"
>
        <!-- بلوک محتوا -->
        <div class="flex flex-col items-center text-center">
          <img
            :src="lotteryBannerImage"
            alt=""
            class="w-[60%] sm:w-[68%] md:w-[60%] lg:w-[52%] xl:w-[60%]
                   max-w-[200px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[520px] xl:max-w-[600px]
                   h-auto object-contain"
          />
          <div
            class="w-[60%] sm:w-[58%] md:w-[56%] lg:w-[55%]
                   h-[1.5px] sm:h-[2px]
                   mt-[2.5%] sm:mt-[3%]
                   mb-[2.5%] sm:mb-[3%]
                   bg-gradient-to-r from-white/75 to-gray-400"
          ></div>
          <p
            class="text-[12px] sm:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[26px] min-[1920px]:text-[28px]
                   text-[#0F184B] font-roboto leading-snug"
          >
            {{ $t('events.lottery.landing.line1') }}<br />
            {{ $t('events.lottery.landing.line2') }}
          </p>
<button
  @click="goToRegister"
  class="bg-white/90 text-[#333B6A]
         flex items-center justify-center
         mt-[18%] sm:mt-[22%] md:mt-[26%] lg:mt-[28%]
         w-[80px] h-[26px]
         sm:w-[130px] sm:h-[38px]
         md:w-auto md:h-auto
         px-2 sm:px-6 md:px-8 lg:px-10
         md:py-3 lg:py-3.5
         rounded-lg sm:rounded-xl md:rounded-2xl
         font-bold hover:bg-white transition whitespace-nowrap leading-none"
  :class="locale === 'en' ? 'text-[7px] sm:text-[11px] md:text-[16px] lg:text-[18px] xl:text-[20px]' : 'text-[9px] sm:text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px]'"
>
  {{ $t('events.lottery.landing.registerButton') }}
</button>
        </div>
      </div>
    </section>
  </div>
</template>