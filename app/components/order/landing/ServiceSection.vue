<template>
  <!-- تغییر max-w-6xl به max-w-4xl برای جمع‌تر شدن کل صفحه -->
  <div class="max-w-4xl mx-auto py-16 px-4 " dir="ltr">
    <h2 class="text-[36px] font-bold text-center text-[#2C7379] mb-12">خدمات ارائه شده</h2>

    <!-- بخش اول -->
    <div class="flex flex-col md:flex-row items-center gap-8 mb-16">
      <div class="w-full md:w-1/2 grid gap-4">
        <div v-for="service in contentServices" :key="service" 
             class="border h-[80px] bg-white border-[#BFD1D5] rounded-[32px] font-normal py-3 px-6 text-center hover:bg-teal-50 transition cursor-pointer flex items-center justify-center font-roboto text-[20px]">
          {{ service }}
        </div>
      </div>
      <div class="w-[392px] h-[380px] relative rounded-[48px] overflow-hidden ">
        <img src="/images/content-service.jpg" class="w-full h-[400px] object-cover" />
          <div class="absolute bottom-0 left-0 right-0 py-10  h-[133px] px-6 bg-[linear-gradient(180deg,rgba(44,115,121,0.119)_0%,rgba(44,115,121,0.7)_100%)] backdrop-blur-md border-t border-white/20 text-white text-center">
            <h3 class="text-[36px] font-bold -mt-[20px]">سفارش پروژه</h3>
            <p class="text-[24px] -mr-[65px]">تولید محتوا</p>
            <NuxtLink to="/order/requestProject">
              <div class="absolute top-6 left-6 p-2 rounded-full cursor-pointer hover:bg-white/40 transition mt-[10px]">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="47.9982" height="47.9982" rx="23.9991" stroke="white" stroke-width="2"/>
                <path d="M32.1406 32.1422L17.8549 17.8564M17.8549 28.5707V17.8564H28.5692" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </NuxtLink>
        </div>
      </div>
    </div>

    <!-- بخش دوم -->
    <div class="flex flex-col md:flex-row-reverse items-center gap-8">
      <div class="w-full md:w-1/2 grid gap-4">
        <div v-for="service in webServices" :key="service" 
             class="border-[1.5px] h-[80px] bg-white border-[#BFD1D5] rounded-[32px] py-3 px-6 text-center hover:bg-teal-50 transition cursor-pointer text-[20px] flex items-center justify-center font-roboto ">
          {{ service }}
        </div>
      </div>
      <div class="w-full md:w-1/2 relative rounded-[48px] overflow-hidden">
        <img src="/images/web-service.jpg" class="w-full h-[400px] object-cover" />
          <div class="absolute bottom-0 left-0 right-0 h-[133px] px-6 bg-[linear-gradient(180deg,rgba(44,115,121,0.119)_0%,rgba(44,115,121,0.7)_100%)] backdrop-blur-md border-t border-white/20 text-white text-center flex flex-col justify-center">
            <h3 class="text-[36px] font-bold -mt-[20px]">سفارش پروژه</h3>
            <p class="text-[24px] -mr-[65px]"> طراحی سایت</p>
            <NuxtLink to="/order/requestProject">
              <div class="absolute top-6 left-6 p-2 rounded-full cursor-pointer hover:bg-white/40 transition mt-[10px]">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="47.9982" height="47.9982" rx="23.9991" stroke="white" stroke-width="2"/>
                  <path d="M32.1406 32.1422L17.8549 17.8564M17.8549 28.5707V17.8564H28.5692" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const contentServices = ['تولید ویدیوهای حرفه‌ای شبکه‌های اجتماعی', 'ساخت ریلزهای ویو محور', 'فیلم‌برداری و تدوین', 'سناریو نویسی و ایده‌پردازی'];
const webServices = ['طراحی UI/UX مدرن و کاربر ممحور', 'توسعه فرانت‌اند و بک‌‌اند', 'طراحی فروشگاه‌های اینترنتی', 'بهینه‌سازی عملکرد سایت'];
</script>