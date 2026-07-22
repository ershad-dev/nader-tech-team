<template>
  <!-- تغییر max-w-6xl به max-w-4xl برای جمع‌تر شدن کل صفحه -->
  <div class="max-w-4xl min-[1920px]:max-w-5xl mx-auto py-10 md:py-14 lg:py-16 min-[1920px]:py-20 px-4 lg:-mt-[80px]" dir="ltr">
    <h2 class="text-[20px] md:text-[23px] lg:text-[26px] min-[1920px]:text-[30px] font-bold text-center text-[#2C7379] dark:text-dark-highlight mb-8 md:mb-10 lg:mb-12 min-[1920px]:mb-16">
      خدمات ارائه شده
    </h2>

    <!-- بخش اول -->
    <div class="flex flex-col md:flex-row items-center gap-16 md:gap-12 lg:gap-16 mb-10 md:mb-12 lg:mb-16 min-[1920px]:mb-20">
      <div class="order-2 md:order-none w-full md:w-1/2 grid content-between gap-0 h-[260px] md:h-[290px] lg:h-[315px] min-[1920px]:h-[390px]">
        <div
          v-for="service in contentServices"
          :key="service"
          class="border-[1.5px] w-full max-w-[317px] min-[1920px]:max-w-[380px] mx-auto md:mx-0 md:ml-[50px] lg:ml-[100px] min-[1920px]:ml-[140px] md:w-[280px] lg:w-[317px] min-[1920px]:w-[380px] h-[50px] md:h-[55px] lg:h-[60px] min-[1920px]:h-[70px] bg-white dark:bg-white/50 border-[#BFD1D5] dark:border-dark-border rounded-[32px] py-3 px-6 text-center hover:bg-teal-50 dark:hover:bg-dark-accent-hover/30 transition cursor-pointer text-[13px] md:text-[14px] min-[1920px]:text-[16px] flex items-center justify-center text-[#081035] dark:text-dark-text-deep"
        >
          {{ service }}
        </div>
      </div>

      <div class="order-1 md:order-none w-full max-w-[305px] min-[1920px]:max-w-[380px] md:w-[280px] lg:w-[305px] min-[1920px]:w-[380px] h-[260px] md:h-[290px] lg:h-[315px] min-[1920px]:h-[390px] relative rounded-[36px] md:rounded-[42px] lg:rounded-[48px] min-[1920px]:rounded-[56px] overflow-hidden">
        <img
          src="/images/content-service.jpg"
          class="w-full h-full object-cover"
        />

        <div
          class="absolute bottom-0 left-0 right-0 h-[70px] md:h-[82px] lg:h-[95px] min-[1920px]:h-[110px]
                 bg-[linear-gradient(180deg,rgba(44,115,121,0.12)_0%,rgba(44,115,121,0.75)_100%)]
                 dark:bg-[linear-gradient(180deg,rgba(26,33,34,0)_0%,rgba(26,33,34,0.75)_100%)]
                 backdrop-blur-md border-t border-white/20 dark:border-dark-border/30 px-4 md:px-5 lg:px-6 min-[1920px]:px-8"
        >
          <div class="h-full flex items-center justify-between">

            <NuxtLink to="/order/requestProject">
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

            <div class="text-right text-white">
              <h3 class="text-[20px] md:text-[26px] lg:text-[32px] min-[1920px]:text-[36px] font-bold leading-none">
                سفارش پروژه
              </h3>
              <p class="text-[15px] md:text-[20px] lg:text-[26px] min-[1920px]:text-[28px] mt-1 md:mt-2 min-[1920px]:mt-3 opacity-90">
                تولید محتوا
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- بخش دوم -->
    <div class="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-12 lg:gap-16 lg:ml-[110px]">
      <div class="order-2 md:order-none w-full md:w-1/2 grid content-between gap-0 h-[260px] md:h-[290px] lg:h-[315px] min-[1920px]:h-[390px]">
        <div
          v-for="service in webServices"
          :key="service"
          class="border-[1.5px] w-full max-w-[317px] min-[1920px]:max-w-[380px] mx-auto md:mx-0 md:mr-[50px] lg:mr-0 min-[1920px]:mr-[40px] md:w-[280px] lg:w-[317px] min-[1920px]:w-[380px] h-[50px] md:h-[55px] lg:h-[60px] min-[1920px]:h-[70px] bg-white dark:bg-white/50 border-[#BFD1D5] dark:border-dark-border rounded-[32px] py-3 px-6 text-center hover:bg-teal-50 dark:hover:bg-dark-accent-hover/30 transition cursor-pointer text-[13px] md:text-[14px] min-[1920px]:text-[16px] flex items-center justify-center text-[#081035] dark:text-dark-text-deep"
        >
          {{ service }}
        </div>
      </div>

      <div class="order-1 md:order-none w-full max-w-[305px] min-[1920px]:max-w-[380px] md:w-[280px] lg:w-[305px] min-[1920px]:w-[380px] h-[260px] md:h-[290px] lg:h-[315px] min-[1920px]:h-[390px] relative rounded-[36px] md:rounded-[42px] lg:rounded-[48px] min-[1920px]:rounded-[56px] overflow-hidden">

        <img
          src="/images/web-service.jpg"
          class="w-full h-full lg:h-[400px] object-cover"
        />

        <!-- Glass footer -->
        <div
          class="absolute bottom-0 left-0 right-0 h-[68px] md:h-[78px] lg:h-[90px] min-[1920px]:h-[110px]
                 px-4 md:px-5 lg:px-6 min-[1920px]:px-8 bg-[linear-gradient(180deg,rgba(44,115,121,0.12)_0%,rgba(44,115,121,0.75)_100%)]
                 dark:bg-[linear-gradient(180deg,rgba(26,33,34,0)_0%,rgba(26,33,34,0.75)_100%)]
                 backdrop-blur-md border-t border-white/20 dark:border-dark-border/30"
        >
          <div class="h-full flex items-center justify-between">

            <!-- Arrow -->
            <NuxtLink to="/order/requestProject">
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

            <!-- Text -->
            <div class="text-right text-white">
              <h3 class="text-[20px] md:text-[26px] lg:text-[32px] min-[1920px]:text-[36px] font-bold leading-none">
                سفارش پروژه
              </h3>
              <p class="text-[15px] md:text-[20px] lg:text-[26px] min-[1920px]:text-[28px] mt-1 md:mt-2 min-[1920px]:mt-3 opacity-90">
                طراحی سایت
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const contentServices = ['تولید ویدیوهای حرفه‌ای شبکه‌های اجتماعی', 'ساخت ریلزهای ویو محور', 'فیلم‌برداری و تدوین', 'سناریو نویسی و ایده‌پردازی'];
const webServices = ['طراحی UI/UX مدرن و کاربر ممحور', 'توسعه فرانت‌اند و بک‌‌اند', 'طراحی فروشگاه‌های اینترنتی', 'بهینه‌سازی عملکرد سایت'];
</script>