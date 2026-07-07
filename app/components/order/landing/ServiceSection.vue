<template>
  <!-- تغییر max-w-6xl به max-w-4xl برای جمع‌تر شدن کل صفحه -->
  <div class="max-w-4xl mx-auto py-10 md:py-14 lg:py-16 px-4" dir="ltr">
    <h2 class="text-[20px] md:text-[23px] lg:text-[26px] font-bold text-center text-[#2C7379] mb-8 md:mb-10 lg:mb-12">
      خدمات ارائه شده
    </h2>

    <!-- بخش اول -->
    <div class="flex flex-col md:flex-row items-center gap-8 md:gap-6 lg:gap-0 mb-10 md:mb-12 lg:mb-16">
      <div class="order-2 md:order-none w-full md:w-1/2 grid gap-3 md:gap-4">
        <div
          v-for="service in contentServices"
          :key="service"
          class="border-[1.5px] w-full max-w-[317px] mx-auto md:mx-0 md:ml-[50px] lg:ml-[100px] md:w-[280px] lg:w-[317px] h-[50px] md:h-[55px] lg:h-[60px] bg-white border-[#BFD1D5] rounded-[32px] py-3 px-6 text-center hover:bg-teal-50 transition cursor-pointer text-[13px] md:text-[14px] flex items-center justify-center text-[#081035]"
        >
          {{ service }}
        </div>
      </div>

      <div class="order-1 md:order-none w-full max-w-[305px] md:w-[280px] lg:w-[305px] h-[260px] md:h-[290px] lg:h-[315px] relative rounded-[36px] md:rounded-[42px] lg:rounded-[48px] overflow-hidden">
        <img
          src="/images/content-service.jpg"
          class="w-full h-full object-cover"
        />

        <div
          class="absolute bottom-0 left-0 right-0 h-[70px] md:h-[82px] lg:h-[95px]
                 bg-[linear-gradient(180deg,rgba(44,115,121,0.12)_0%,rgba(44,115,121,0.75)_100%)]
                 backdrop-blur-md border-t border-white/20 px-4 md:px-5 lg:px-6"
        >
          <div class="h-full flex items-center justify-between">

            <NuxtLink to="/order/requestProject">
              <div
                class="w-[38px] h-[38px] md:w-[44px] md:h-[44px] lg:w-[50px] lg:h-[50px] flex items-center justify-center
                       rounded-full cursor-pointer hover:bg-white/20 transition"
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
              <h3 class="text-[20px] md:text-[26px] lg:text-[32px] font-bold leading-none">
                سفارش پروژه
              </h3>
              <p class="text-[15px] md:text-[20px] lg:text-[26px] mt-1 md:mt-2 opacity-90">
                تولید محتوا
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- بخش دوم -->
    <div class="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-6 lg:gap-0">
      <div class="order-2 md:order-none w-full md:w-1/2 grid gap-3 md:gap-4">
        <div
          v-for="service in webServices"
          :key="service"
          class="border-[1.5px] w-full max-w-[317px] mx-auto md:mx-0 md:mr-[50px] lg:mr-0 md:w-[280px] lg:w-[317px] h-[50px] md:h-[55px] lg:h-[60px] bg-white border-[#BFD1D5] rounded-[32px] py-3 px-6 text-center hover:bg-teal-50 transition cursor-pointer text-[13px] md:text-[14px] flex items-center justify-center text-[#081035]"
        >
          {{ service }}
        </div>
      </div>

      <div class="order-1 md:order-none w-full max-w-[305px] md:w-[280px] lg:w-[305px] h-[260px] md:h-[290px] lg:h-[315px] relative rounded-[36px] md:rounded-[42px] lg:rounded-[48px] overflow-hidden">

        <img
          src="/images/web-service.jpg"
          class="w-full h-full lg:h-[400px] object-cover"
        />

        <!-- Glass footer -->
        <div
          class="absolute bottom-0 left-0 right-0 h-[68px] md:h-[78px] lg:h-[90px]
                 px-4 md:px-5 lg:px-6 bg-[linear-gradient(180deg,rgba(44,115,121,0.12)_0%,rgba(44,115,121,0.75)_100%)]
                 backdrop-blur-md border-t border-white/20"
        >
          <div class="h-full flex items-center justify-between">

            <!-- Arrow -->
            <NuxtLink to="/order/requestProject">
              <div class="w-[38px] h-[38px] md:w-[44px] md:h-[44px] lg:w-[50px] lg:h-[50px] flex items-center justify-center
                          rounded-full cursor-pointer hover:bg-white/20 transition">
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
              <h3 class="text-[20px] md:text-[26px] lg:text-[32px] font-bold leading-none">
                سفارش پروژه
              </h3>
              <p class="text-[15px] md:text-[20px] lg:text-[26px] mt-1 md:mt-2 opacity-90">
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