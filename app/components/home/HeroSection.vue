<template>
  <section class="w-full py-20 px-4 bg-slate-950 text-white text-center border-b border-slate-900">
    <div class="max-w-4xl mx-auto">
      <span class="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 rounded-full mb-4">
        به دنیای توسعه و خلاقیت خوش آمدید
      </span>

      <h1 class="text-4xl md:text-6xl font-black mb-6 leading-tight">
        ایده‌های شما را با <span class="text-emerald-400">کدنویسی مدرن</span> به واقعیت تبدیل می‌کنیم
      </h1>

      <p class="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
        ما در نادر تک تیم، سیستم‌های تحت وب قدرتمند، ربات‌های هوشمند تلگرام و پلتفرم‌های اختصاصی را با بالاترین کیفیت و امنیت برای کسب‌وکار شما توسعه می‌دهیم.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          @click="scrollToContact"
          class="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg shadow-lg shadow-emerald-500/20 transition-all duration-200"
        >
          سفارش پروژه فوری
        </button>

        <NuxtLink 
          to="/events"
          class="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 font-medium rounded-lg transition-all duration-200"
        >
          مشاهده قرعه‌کشی آنلاین
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// تابعی برای اسکرول نرم به فرم تماس در انتهای صفحه
const scrollToContact = () => {
  const contactSection = document.getElementById('contact-section')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  } else {
    console.log('فرم تماس هنوز در صفحه لود نشده است.')
  }
}
</script>