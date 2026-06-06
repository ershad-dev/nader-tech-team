

<template>
  <nav class="sticky top-6 z-[999] max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-full px-6 py-3 flex items-center justify-between shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-slate-700 transition-colors duration-300" dir="rtl">
    
    <div class="w-10"></div>

    <div class="flex items-center gap-8 text-slate-600 dark:text-slate-300 font-medium text-sm">
      <NuxtLink to="/" exact-active-class="!text-[#2D4745] dark:!text-[#E8C595] font-bold" class="hover:text-teal-700 transition">خانه</NuxtLink>
      <NuxtLink to="/projects" exact-active-class="!text-[#2D4745] dark:!text-[#E8C595] font-bold" class="hover:text-teal-700 transition flex items-center gap-1">
        سفارش‌گیری پروژه
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </NuxtLink>
      <NuxtLink to="/events" exact-active-class="!text-[#2D4745] dark:!text-[#E8C595] font-bold" class="hover:text-teal-700 transition">برگزاری ایونت</NuxtLink>
      <NuxtLink to="/portfolio" exact-active-class="!text-[#2D4745] dark:!text-[#E8C595] font-bold" class="hover:text-teal-700 transition">نمونه‌ها</NuxtLink>
      <NuxtLink to="/about" exact-active-class="!text-[#2D4745] dark:!text-[#E8C595] font-bold" class="hover:text-teal-700 transition">درباره ما</NuxtLink>
    </div>

    <div class="flex items-center gap-3" dir="ltr">
      
      <NuxtLink to="/Auth/login" class="bg-[#2D7A6F] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-teal-800 transition shadow-sm">
        ورود / ثبت‌نام
      </NuxtLink>



     

      <button class="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-full transition">
        <img src="/images/search-icon.png" alt="Search" class="w-5 h-5 opacity-70 dark:invert" />
      </button>
    </div>
  </nav>
</template>