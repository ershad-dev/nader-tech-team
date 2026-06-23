<template>
  <footer v-if="!isLotteryPage" class="w-full" dir="rtl">
    
    <div v-if="showGreenSection" class="relative w-full">
      <div class="bg-[#2C7379] h-[200px] w-full pt-10 pb-20 flex flex-col items-center">
        <div class="flex justify-center items-center overflow-hidden">
          <svg viewBox="0 0 700 150" class="w-[500px] h-[120px]">
            <path id="curve-path" d="M 50,120 Q 350,50 650,120" fill="transparent" />
            <text font-size="50" font-weight="bold" fill="white">
              <textPath href="#curve-path" startOffset="50%" text-anchor="middle">
                {{ title }}
              </textPath>
            </text>
          </svg>
        </div>
        <div v-html="title1" class="text-white text-[32px] font-bold mt-4 text-center px-4"></div>
      </div>

      <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-center items-center z-20">
        <div class="w-[350px] h-[50px] bg-[#2C7379] absolute top-4" style="border-radius: 0 0 20px 20px;"></div>
        <NuxtLink to="/order/requestProject">
          <button class="bg-[#ECD0A0] text-[#0F184B] text-[20px] font-bold px-12 py-4 rounded-[16px] shadow-lg relative z-30 hover:scale-105 transition-all h-[48px] w-[263px] flex items-center justify-center">
            درخواست همکاری
          </button>
        </NuxtLink>
      </div>
    </div>

    <div class="bg-[#BFD1D5] w-full pt-16">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center pb-12">
        
        <div class="flex flex-col items-center leading-[40px] font-roboto">
          <h3 class="text-[#2D4745] text-[20px] mb-4">لینک های مهم</h3>
          <ul class="space-y-3">
            <li v-for="link in links" :key="link" class="flex items-center gap-2 text-[#2D4745]">
              <span class="w-2 h-2 bg-[#2D7A6F] rounded-full flex-shrink-0 text-[18px]"></span>
              <span>{{ link }}</span>
            </li>
          </ul>
        </div>

        <div class="flex flex-col items-center gap-6">
          <p class="text-[#0F184B] font-bold text-[18px] whitespace-nowrap">
            نادر تکنولوژی، ارائه دهنده راهکارهای نوین فناوری، توسعه نرم‌افزار و خدمات دیجیتال
          </p>
          <div class="flex justify-center gap-3">
            <img 
              v-for="icon in socialIcons" 
              :key="icon" 
              :src="`/images/${icon}.png`" 
              alt="social" 
              class="w-10 h-10 object-contain hover:opacity-80 transition cursor-pointer" 
            />
          </div>
        </div>

        <div class="flex flex-row md:flex-col gap-4 items-center">
          <img src="/images/enamad2.png" alt="Enamad" class="w-[153px] h-[157px] object-contain" />
          <img src="/images/zarrinpall.png" alt="Zarrinpal" class="w-[153px] h-[157px] object-contain" />
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>
const route = useRoute();

// داده‌های استاتیک
const links = ['خانه', 'سفارش گیری پروژه', 'برگزاری ایونت', 'درباره ما'];
const socialIcons = ['telegram', 'instagram', 'whatsapp', 'x', 'linkedin'];

// مسیرهایی که نباید نوار در آن‌ها نمایش داده شود
const lotteryRoutes = [
  '/events/lottery/register',
  '/events/lottery/login',
  '/events/lottery/success',
  '/events/lottery/waiting',
  '/events/lottery/winner',
  '/events/lottery/loser'
];

// مسیرهایی که نباید بخش سبز رنگ (درخواست همکاری) در آن‌ها نمایش داده شود
const hiddenGreenSectionRoutes = [
  '/order/request', 
  '/articles'
];

// بررسی مسیرها
const isLotteryPage = computed(() => lotteryRoutes.includes(route.path));

const showGreenSection = computed(() => {
  // چک می‌کند که آیا مسیر فعلی با هیچ‌کدام از مسیرهای لیست شروع نمی‌شود
  return !hiddenGreenSectionRoutes.some(path => route.path.startsWith(path));
});

defineProps({
  title: String,
  title1: String
});
</script>