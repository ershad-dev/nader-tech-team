<template>
  <!-- بخش اصلی نمایش سرویس‌های سفارش پروژه -->
  <div class="max-w-4xl min-[1920px]:max-w-5xl mx-auto py-10 md:py-14 lg:py-16 min-[1920px]:py-20 px-4 lg:-mt-[80px]" dir="ltr">
    <!-- عنوان بخش سرویس‌ها -->
    <h2 class="text-[20px] md:text-[23px] lg:text-[26px] min-[1920px]:text-[30px] font-bold text-center text-[#2C7379] dark:text-dark-highlight mb-8 md:mb-10 lg:mb-12 min-[1920px]:mb-16">
      {{ $t('order.serviceSection.title') }}
    </h2>

    <!-- بخش سرویس‌های تولید محتوا -->
    <div class="flex flex-col md:flex-row items-center gap-16 md:gap-12 lg:gap-16 mb-10 md:mb-12 lg:mb-16 min-[1920px]:mb-20">
      <!-- لیست دکمه‌های سرویس‌های محتوا -->
      <div class="order-2 md:order-none w-full md:w-1/2 grid content-between gap-0 h-[260px] md:h-[290px] lg:h-[315px] min-[1920px]:h-[390px]">
        <div
          v-for="service in contentServices"
          :key="service"
          class="border-[1.5px] w-full max-w-[317px] min-[1920px]:max-w-[380px] mx-auto md:mx-0 md:ml-[50px] lg:ml-[100px] min-[1920px]:ml-[140px] md:w-[280px] lg:w-[317px] min-[1920px]:w-[380px] h-[50px] md:h-[55px] lg:h-[60px] min-[1920px]:h-[70px] bg-white dark:bg-white/50 border-[#BFD1D5] dark:border-dark-border rounded-[32px] py-3 px-6 text-center hover:bg-teal-50 dark:hover:bg-dark-accent-hover/30 transition cursor-pointer text-[14px] md:text-[15px] min-[1920px]:text-[17px] flex items-center justify-center text-[#081035] dark:text-dark-text-deep"
        >
          {{ service }}
        </div>
      </div>

      <!-- کارت تصویری سفارش محتوا با لینک به فرم درخواست -->
      <div class="order-1 md:order-none w-full max-w-[305px] min-[1920px]:max-w-[380px] md:w-[280px] lg:w-[305px] min-[1920px]:w-[380px] h-[260px] md:h-[290px] lg:h-[315px] min-[1920px]:h-[390px] relative rounded-[36px] md:rounded-[42px] lg:rounded-[48px] min-[1920px]:rounded-[56px] overflow-hidden">
        <img
          src="/images/content-order.jpeg"
            class="w-full h-full object-cover object-top"
        />

        <!-- نوار شیشه‌ای پایین کارت با دکمه و متن -->
        <div
          class="absolute bottom-0 left-0 right-0 h-[70px] md:h-[82px] lg:h-[95px] min-[1920px]:h-[110px]
                 bg-[linear-gradient(180deg,rgba(44,115,121,0.12)_0%,rgba(44,115,121,0.75)_100%)]
                 dark:bg-[linear-gradient(180deg,rgba(26,33,34,0)_0%,rgba(26,33,34,0.75)_100%)]
                 backdrop-blur-md border-t border-white/20 dark:border-dark-border/30 px-4 md:px-5 lg:px-6 min-[1920px]:px-8"
        >
          <div class="h-full flex items-center justify-between">

            <!-- دکمه پیکان برای رفتن به صفحه درخواست پروژه -->
            <NuxtLink :to="localePath('/order/requestProject')">
              <div
                class="w-[38px] h-[38px] md:w-[44px] md:h-[44px] lg:w-[50px] lg:h-[50px] min-[1920px]:w-[58px] min-[1920px]:h-[58px] flex items-center justify-center
                       rounded-full cursor-pointer hover:bg-white/20 dark:hover:bg-dark-highlight/20 transition"
              >
                <svg class="w-full h-full" viewBox="0 0 50 50" fill="none">
                  <rect
                    x="1"
                    y="1"
                    width="47.9982"
                    height="47.9982"
                    rx="23.9991"
                    stroke="white"
                    stroke-width="2"
                  />
                  <path
                    d="M32.1406 32.1422L17.8549 17.8564M17.8549 28.5707V17.8564H28.5692"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </NuxtLink>

            <!-- متن عنوان و برچسب سفارش محتوا -->
            <div class="text-right text-white">
              <h3 class="text-[20px] md:text-[26px] lg:text-[32px] min-[1920px]:text-[36px] font-bold leading-none">
                {{ $t('order.serviceSection.orderProject') }}
              </h3>
              <p class="text-[15px] md:text-[19px] lg:text-[23px] min-[1920px]:text-[26px] mt-1 md:mt-2 min-[1920px]:mt-3 opacity-90">
                {{ $t('order.serviceSection.contentLabel') }}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- بخش سرویس‌های طراحی وب -->
    <div class="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-12 lg:gap-16 lg:ml-[110px]">
      <!-- لیست دکمه‌های سرویس‌های وب -->
      <div class="order-2 md:order-none w-full md:w-1/2 grid content-between gap-0 h-[260px] md:h-[290px] lg:h-[315px] min-[1920px]:h-[390px]">
        <div
          v-for="service in webServices"
          :key="service"
          class="border-[1.5px] w-full max-w-[317px] min-[1920px]:max-w-[380px] mx-auto md:mx-0 md:mr-[50px] lg:mr-0 min-[1920px]:mr-[40px] md:w-[280px] lg:w-[317px] min-[1920px]:w-[380px] h-[50px] md:h-[55px] lg:h-[60px] min-[1920px]:h-[70px] bg-white dark:bg-white/50 border-[#BFD1D5] dark:border-dark-border rounded-[32px] py-3 px-6 text-center hover:bg-teal-50 dark:hover:bg-dark-accent-hover/30 transition cursor-pointer text-[14px] md:text-[15px] min-[1920px]:text-[17px] flex items-center justify-center text-[#081035] dark:text-dark-text-deep"
        >
          {{ service }}
        </div>
      </div>

      <!-- کارت تصویری سفارش وب با لینک به فرم درخواست -->
      <div class="order-1 md:order-none w-full max-w-[305px] min-[1920px]:max-w-[380px] md:w-[280px] lg:w-[305px] min-[1920px]:w-[380px] h-[260px] md:h-[290px] lg:h-[315px] min-[1920px]:h-[390px] relative rounded-[36px] md:rounded-[42px] lg:rounded-[48px] min-[1920px]:rounded-[56px] overflow-hidden">

<img
  src="/images/web-order.jpeg"
  class="w-full h-full object-cover"
/>

        <!-- نوار شیشه‌ای پایین کارت با دکمه و متن -->
        <div
          class="absolute bottom-0 left-0 right-0 h-[68px] md:h-[78px] lg:h-[90px] min-[1920px]:h-[110px]
                 px-4 md:px-5 lg:px-6 min-[1920px]:px-8 bg-[linear-gradient(180deg,rgba(44,115,121,0.12)_0%,rgba(44,115,121,0.75)_100%)]
                 dark:bg-[linear-gradient(180deg,rgba(26,33,34,0)_0%,rgba(26,33,34,0.75)_100%)]
                 backdrop-blur-md border-t border-white/20 dark:border-dark-border/30"
        >
          <div class="h-full flex items-center justify-between">

            <!-- دکمه پیکان برای رفتن به صفحه درخواست پروژه -->
            <NuxtLink :to="localePath('/order/requestProject')">
              <div class="w-[38px] h-[38px] md:w-[44px] md:h-[44px] lg:w-[50px] lg:h-[50px] min-[1920px]:w-[58px] min-[1920px]:h-[58px] flex items-center justify-center
                          rounded-full cursor-pointer hover:bg-white/20 dark:hover:bg-dark-highlight/20 transition">
                <svg class="w-full h-full" viewBox="0 0 50 50" fill="none">
                  <rect x="1" y="1" width="47.9982" height="47.9982" rx="23.9991" stroke="white" stroke-width="2"/>
                  <path d="M32.1406 32.1422L17.8549 17.8564M17.8549 28.5707V17.8564H28.5692"
                        stroke="white" stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"/>
                </svg>
              </div>
            </NuxtLink>

            <!-- متن عنوان و برچسب سفارش وب -->
            <div class="text-right text-white">
              <h3 class="text-[20px] md:text-[26px] lg:text-[32px] min-[1920px]:text-[36px] font-bold leading-none">
                {{ $t('order.serviceSection.orderProject') }}
              </h3>
              <p class="text-[15px] md:text-[19px] lg:text-[23px] min-[1920px]:text-[26px] mt-1 md:mt-2 min-[1920px]:mt-3 opacity-90">
                {{ $t('order.serviceSection.webLabel') }}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// ابزارهای ترجمه و مسیر بومی‌سازی‌شده
const { t } = useI18n()
const localePath = useLocalePath()

// لیست ترجمه‌شده سرویس‌های تولید محتوا
const contentServices = computed(() => [
  t('order.serviceSection.contentServices.0'),
  t('order.serviceSection.contentServices.1'),
  t('order.serviceSection.contentServices.2'),
  t('order.serviceSection.contentServices.3'),
])

// لیست ترجمه‌شده سرویس‌های طراحی وب
const webServices = computed(() => [
  t('order.serviceSection.webServices.0'),
  t('order.serviceSection.webServices.1'),
  t('order.serviceSection.webServices.2'),
  t('order.serviceSection.webServices.3'),
])
</script>