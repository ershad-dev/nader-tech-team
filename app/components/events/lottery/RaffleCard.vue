<!-- قالب کلی (wrapper) برای یکپارچه‌سازی ظاهر صفحات قرعه‌کشی -->
<template>
  <!-- کارت اصلی با استایل گرد و سایه‌دار -->
  <div class="max-w-md w-full bg-white dark:bg-dark-surface rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 dark:border-dark-border">
     
    <!-- بخش نمایش تصویر یا بنر -->
    <div class="w-full h-56 overflow-hidden">
      <slot /> 
    </div>

    <!-- بخش محتوای متنی، فرم یا دکمه‌ها -->
    <div class="p-8">
      <slot name="content" />
    </div>
  </div>
</template>