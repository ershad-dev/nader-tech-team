<!-- components/home/TeamMembers.vue -->
<template>
  <section class="w-full py-20 px-4 bg-slate-950 text-white border-b border-slate-900">
    <div class="max-w-6xl mx-auto">
      
      <!-- سرتیتر بخش اعضای تیم -->
      <div class="text-center mb-16">
        <h2 class="text-3xl font-black mb-4">اعضای هسته اصلی تیم</h2>
        <p class="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
          ما یک تیم کوچک، چابک و متخصص هستیم که در کنار هم ایده‌ها را به کدهای پایدار و دیزاین‌های کاربرپسند تبدیل می‌کنیم.
        </p>
      </div>

      <!-- گرید اعضای تیم -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div 
          v-for="(member, index) in team" 
          :key="index"
          class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 group"
        >
          <!-- بخش تصویر عضو (فعلاً به صورت یک باکس موقت) -->
          <div class="w-full h-64 bg-slate-950 flex items-center justify-center text-slate-700 relative overflow-hidden">
            <span class="text-5xl font-bold group-hover:scale-110 transition-transform duration-300">
              {{ member.name[0] }}
            </span>
            <!-- لایه رنگی موقت روی عکس هنگام هاور -->
            <div class="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <!-- اطلاعات عضو تیم -->
          <div class="p-6 text-center">
            <h3 class="text-xl font-bold mb-1 text-slate-100">{{ member.name }}</h3>
            <span class="inline-block text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full mb-4">
              {{ member.role }}
            </span>
            <p class="text-sm text-slate-400 leading-relaxed">
              {{ member.bio }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// آرایه مشخصات تیم ۳ نفره شما
const team = ref([
  {
    name: 'ارشاد خادمی',
    role: 'Front-End Developer',
    bio: 'توسعه‌دهنده سمت کاربر مسلط به Vue.js و Nuxt 3، متخصص در خلق رابط‌های کاربری تعاملی، ریسپانسیو و بهینه‌سازی عملکرد پروژه‌ها.'
  },
  {
    name: 'کسری',
    role: 'Back-End Developer',
    bio: 'توسعه‌دهنده سمت سرور مسلط به فریم‌ورک لاراول، متخصص در طراحی دیتابیس‌های پیچیده، معماری API و امنیت زیرساخت نرم‌افزار.'
  },
  {
    name: 'پریا',
    role: 'UI/UX Designer',
    bio: 'طراح تجربه و رابط کاربری، متخصص در خلق هویت بصری، وایرفریم‌ها و دیزاین سیستم‌های مدرن بر اساس نیاز کاربران و اهداف برند.'
  }
])
</script>