

<template>
  <!-- کانتینر اصلی با تراز بندی بالا و راست -->
  <section class="relative w-[1110px] max-w-full mx-auto h-[629px] rounded-[17px] overflow-hidden flex flex-col justify-between p-12 mt-[75px]">
    
    <!-- تصویر پس‌زمینه -->
    <img src="/images/lottery-bg.png" alt="قرعه کشی" class="absolute inset-0 w-full h-full object-cover" />
    
    <!-- لایه تیره برای خوانایی بهتر -->
    <div class="absolute inset-0 bg-black/40"></div>

    <!-- بخش متن‌ها (بالا سمت راست) -->
    <div class="relative z-10 text-white text-right">
      <h2 class="text-4xl font-bold mb-2">قرعه‌کشی ایونت</h2>
      <p class="text-lg opacity-90">توضیحات قرعه‌کشی</p>
    </div>

<!-- بخش دکمه‌ها (پایین و وسط‌چین) -->
<div class="relative z-10 flex gap-4 self-center">
<NuxtLink to="/events/lottery/register">
  <button class="bg-white/90 text-gray-800 px-8 py-3 rounded-xl font-bold hover:bg-white transition w-[313px] h-[75px]">
    ثبت‌نام در قرعه‌کشی
  </button>
</NuxtLink>

<NuxtLink to="/events/lottery/login">
  <button class="bg-white/90 text-gray-800 px-8 py-3 rounded-xl font-bold hover:bg-white transition w-[313px] h-[75px]">
    ورود به ایونت
  </button>
</NuxtLink>
</div>

  </section>
</template>
