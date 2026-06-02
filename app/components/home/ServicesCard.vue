<!-- components/home/ServicesCard.vue -->
<template>
  <section class="w-full py-20 px-4 bg-slate-950 text-white border-b border-slate-900">
    <div class="max-w-6xl mx-auto">
      
      <!-- سرتیتر بخش خدمات -->
      <div class="text-center mb-16">
        <h2 class="text-3xl font-black mb-4">خدمات تخصصی ما</h2>
        <p class="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
          ما در نادر تک تیم با بهره‌گیری از تکنولوژی‌های روز، بهترین راهکارها را برای رشد کسب‌وکار شما خلق می‌کنیم.
        </p>
      </div>

      <!-- گرید کارت‌ها -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-emerald-500/50 transition-all duration-300 group hover:-translate-y-1"
        >
          <!-- آیکون موقت با استفاده از دایره‌های رنگی Tailwind -->
          <div class="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 text-xl font-bold group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
            {{ index + 1 }}
          </div>

          <!-- عنوان خدمت -->
          <h3 class="text-xl font-bold mb-3 text-slate-100 group-hover:text-emerald-400 transition-colors">
            {{ service.title }}
          </h3>

          <!-- توضیحات خدمت -->
          <p class="text-sm text-slate-400 leading-relaxed">
            {{ service.description }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// آرایه دیتای خدمات برای مدیریت راحت‌تر کجت‌ها
const services = ref([
  {
    title: 'توسعه وب‌سایت و فرانت‌اند مدرن',
    description: 'طراحی و برنامه‌نویسی سمت کاربر با فریم‌ورک‌های قدرتمند Vue.js و Nuxt 3 به صورت کاملاً بهینه، ریسپانسیو و با سرعت لود فوق‌العاده بالا.'
  },
  {
    title: 'توسعه زیرساخت و APIهای پایدار',
    description: 'طراحی بیس و معماری بک‌اندر، دیتابیس‌های امن و ای‌پ‌آی‌های پرسرعت با فریم‌ورک محبوب لاراول جهت مدیریت یکپارچه دیتای نرم‌افزار.'
  },
  {
    title: 'سیستم‌های آنلاین و ربات‌های اختصاصی',
    description: 'پیاده‌سازی پلتفرم‌های پیشرفته قرعه‌کشی آنلاین، سامانه‌های تعاملی لایو و طراحی ربات‌های هوشمند و کاربردی تلگرام متصل به وب‌سایت.'
  }
])
</script>