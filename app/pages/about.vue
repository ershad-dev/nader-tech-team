<template>
  <div class="max-w-6xl mx-auto py-16 px-4" dir="rtl">
    
    <section class="flex flex-col md:flex-row items-center gap-12 mb-20">
      <div class="flex-1">
        <h1 class="text-4xl font-bold text-[32px] mb-6"> نادر تکنولوژی فقط یک نام نیست؛<br> یک <span class="text-[#2C7379]">نگاه</span> است.
</h1>
        <p class="text-slate-600 leading-relaxed mb-8">
          نگاهی که از جسارت، دایره ساختن مسیرهای تازه الهام گرفته شده است. <br>در دنیایی که تکنولوژی هر روز تغییر می‌کند، ما امیدوارانه دنبال‌کننده نباشیم، <br> بلکه سازنده باشیم.
        </p>
        <button class="bg-[#E8C595] w-[200px] px-8 py-3 rounded-[50px] font-bold text-[#2D4745]">ارتباط با ما</button>
      </div>
      <div class="w-64 h-64 bg-slate-200 rounded-full"></div>
    </section>
    <section class="mb-20">
      <img src="/images/about-img.png" class="w-full h-96 object-cover rounded-[3rem]" />
      <p class="text-[24px] mt-8 leading-relaxed">
      </p>نادر تکنولوژی مجموعه‌ای تخصصی در حوزه تکنولوژی، طراحی و توسعه برند است که با ترکیب خلاقیت، استراتژی و فناوری، ایده‌ها را به کسب‌وکارهای قابل رشد تبدیل می‌کند. ما باور داریم برند موفق تنها یک لوگو یا وب‌سایت نیست؛ بلکه تجربه‌ای کامل از رشد و ماندگاری است.
    </section>

    <section class="mb-20 text-center">
      <h2 class="text-[32px] font-bold mb-12">15+ سال تجربه در ساخت محصولات دیجیتال موفق</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <img v-for="i in 4" :key="i" src="/images/man-about.png" class="w-full h-80 object-cover rounded-[2rem]" />
      </div>
      <span>تیم نادر تکنولوژی با بیش از ۱۵ سال تجربه حرفه‌ای در توسعه نرم‌افزار و وب، پروژه‌ها را از مرحله ایده تا اجرا و رشد همراهی می‌کند. تمرکز ما فقط روی ساخت نیست؛ بلکه روی ساخت درست است : کارکرد، تجربه کاربری، امنیت و مقیاس‌پذیری.</span>
    </section>
<!-- بخش خدمات (اسلایدر سوئیچ شونده) -->
    <section class="mt-20">
      <div class="mb-8 text-center">
      </div>

      <!-- کانتینر اصلی کارت‌ها -->
      <div class=" p-8 rounded-[2.5rem]  transition-all duration-500">
        <h3 class="text-center text-lg font-bold text-black mb-8 bg-[#67A9A8] py-2 rounded-full w-fit mx-auto px-6">
          {{ currentCategory.title }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="service in currentCategory.items" :key="service" 
               class="border border-slate-200 p-4 rounded-2xl text-center hover:border-[#2D7A6F] transition">
            {{ service }}
          </div>
        </div>
      </div>

      <!-- دکمه‌های ناوبری ) -->
      <div class="flex items-center justify-center gap-4 mt-8">
  <SliderButton 
    direction="left" 
    @click="prevCategory" 
    class=" hover:bg-slate-100" 
  />
  <SliderButton 
    direction="right" 
    @click="nextCategory" 
    class=" hover:bg-slate-100" 
  />
</div>
    </section>

    <!-- بخش پایانی صفحه: فراخوان به اقدام -->
<section class="py-24 text-center">
  <h2 class="text-3xl md:text-4xl font-bold text-[#2D4745] leading-snug">
    اگر فقط اجرا نمی‌خواهی، <br>
    اگر <span class="text-[#E8C595]">مسیر</span> می‌خواهی، اینجا شروعش است
  </h2>
</section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const categories = [
  {
    title: 'خدمات طراحی و وب‌سایت',
    items: ['طراحی UI/UX مدرن', 'توسعه بک‌اند', 'پنل‌های مدیریتی', 'طراحی فروشگاه اینترنتی', 'بهینه‌سازی سرعت', 'مشاوره فنی']
  },
  {
    title: 'خدمات تولید محتوا',
    items: ['فیلم‌برداری و تدوین', 'ویدیوهای شبکه‌های اجتماعی', 'موشن گرافیک', 'سناریو نویسی', 'ایده‌پردازی', 'طراحی کمپین']
  },
    {
    title: 'خدمات برگزاری ایونت',
    items: ['تولید ودیو های حرفه ای شبکه های اجتماعی', 'ویدیوهای شبکه‌های اجتماعی', ' موشن گرافیک و هویت بصری', 'سناریو نویسی', 'ساخت ریلز های ویومحور', ' فیلم برداری و تدوین']
  }
];

const currentIndex = ref(0);
const currentCategory = computed(() => categories[currentIndex.value]);

const nextCategory = () => { currentIndex.value = (currentIndex.value + 1) % categories.length; };
const prevCategory = () => { currentIndex.value = (currentIndex.value - 1 + categories.length) % categories.length; };
</script>