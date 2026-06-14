<template>
  <div class="max-w-6xl mx-auto py-16 px-4" dir="ltr">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">خدمات ارائه شده</h2>

    <div class="flex flex-col md:flex-row items-center gap-8 mb-16">
      <div class="w-full md:w-1/2 grid gap-4">
        <div v-for="service in contentServices" :key="service" 
             class="border border-gray-200 rounded-full py-3 px-6 text-center hover:bg-teal-50 transition cursor-pointer">
          {{ service }}
        </div>
      </div>
      <div class="w-full md:w-1/2 relative rounded-[40px] overflow-hidden shadow-2xl">
        <img src="/images/content-service.jpg" class="w-full h-[400px] object-cover" />
            <div class="absolute bottom-0 left-0 right-0 p-6 bg-[linear-gradient(180deg,rgba(44,115,121,0.119)_0%,rgba(44,115,121,0.7)_100%)] backdrop-blur-md border-t border-white/20 text-white text-center">
            <h3 class="text-2xl font-bold">سفارش پروژه</h3>
            <p class="text-sm opacity-90">تولید محتوا</p>
            
            <div class="absolute top-6 left-6 bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white/40 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9-9M9 8h8v8"></path>
                </svg>
            </div>
            </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row-reverse items-center gap-8">
      <div class="w-full md:w-1/2 grid gap-4">
        <div v-for="service in webServices" :key="service" 
             class="border border-gray-200 rounded-full py-3 px-6 text-center hover:bg-teal-50 transition cursor-pointer">
          {{ service }}
        </div>
      </div>
      <div class="w-full md:w-1/2 relative rounded-[40px] overflow-hidden shadow-2xl">
        <img src="/images/web-service.jpg" class="w-full h-[400px] object-cover" />
            <div class="absolute bottom-0 left-0 right-0 p-6 bg-[linear-gradient(180deg,rgba(44,115,121,0.119)_0%,rgba(44,115,121,0.7)_100%)] backdrop-blur-md border-t border-white/20 text-white text-center">
            <h3 class="text-2xl font-bold">سفارش پروژه</h3>
            <p class="text-sm opacity-90"> طراحی سایت</p>
            
            <div class="absolute top-6 left-6 bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white/40 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9-9M9 8h8v8"></path>
                </svg>
            </div>
            </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const contentServices = ['تولید ویدیوهای حرفه‌ای شبکه‌های اجتماعی', 'ساخت ریلزهای ویو محور', 'فیلم‌برداری و تدوین', 'سناریو نویسی و ایده‌پردازی'];
const webServices = ['طراحی UI/UX مدرن و کاربر محور', 'توسعه فرانت‌اند و بک‌‌اند', 'طراحی فروشگاه‌های اینترنتی', 'بهینه‌سازی عملکرد سایت'];
</script>