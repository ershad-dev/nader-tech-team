<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
    <!-- هدر / ناوبری موقت سایت -->
    <header class="border-b border-slate-900 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between dir-rtl">
        <div class="flex items-center gap-6">
          <span class="text-xl font-black text-white tracking-wider">NADER TECH</span>
          <nav class="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <NuxtLink to="/" class="hover:text-emerald-400 transition">خانه</NuxtLink>
            <NuxtLink to="/about" class="hover:text-emerald-400 transition">درباره ما</NuxtLink>
            <NuxtLink to="/order" class="hover:text-emerald-400 transition">سفارش پروژه</NuxtLink>
          </nav>
        </div>
        <div>
          <NuxtLink to="/auth/login" class="px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 rounded-lg transition">
            ورود / ثبت‌نام
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- محتوای اصلی صفحات که تغییر می‌کند -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- فوتر موقت سایت -->
    <footer class="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-600 font-mono">
      &copy; 2026 Nader Tech Team. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
.dir-rtl {
  direction: rtl;
}
</style>