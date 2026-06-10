<template>
  <footer v-if="!isLotteryPage" class="w-full mt-20" dir="rtl">
    <!-- این بخش را داخل کانتینر اصلی فوتر قرار بده -->
<div class="relative w-full">
  <!-- بخش سبز تیره -->
  <div class="bg-[#2C7379] w-full pt-10 pb-20  flex flex-col items-center">
    <h3 class="text-white text-2xl font-bold mb-8">شروع یک تجربه متفاوت</h3>
  </div>

  <!-- دکمه‌ای که حالت کنده شده (Gap) دارد -->
  <div 
    class="absolute -bottom-8 left-1/2 -translate-x-1/2 flex justify-center items-center z-20"
  >
    <!-- کادر هلالی (همان زبانه) -->
    <div 
      class="w-[350px] h-[50px] bg-[#2C7379] absolute top-4 " 
      style="border-radius:  0 0 20px 20px  ;"
    ></div>
    
    <!-- خودِ دکمه که روی آن قرار می‌گیرد -->
    <button class="bg-[#ECD0A0] text-[#2D6A6A] font-bold px-12 py-4 rounded-[16px] shadow-lg relative z-30 hover:scale-105 transition-all h-[48px] w-[263px]">
      درخواست همکاری
    </button>
  </div>
</div>
    <div class="bg-[#D1E0E0] w-full pt-16 pb-8 px-6 " >
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-center md:text-right" >
        
        <div class="space-y-4">
          <h3 class="font-bold text-[#2D4745] text-lg mb-4">لینک های مهم</h3>
          <ul class="space-y-3">
            <li v-for="link in links" :key="link" class="flex items-center justify-center md:justify-start gap-2 text-[#2D4745]">
              <span class="w-2 h-2 bg-[#2D7A6F] rounded-full"></span>
              {{ link }}
            </li>
          </ul>
        </div>

        <div class="flex flex-col items-center space-y-6">
          <p class="text-[#2D4745] leading-relaxed font-medium max-w-xs">
            نادر تکنولوژی، ارائه دهنده راهکار های نوین فناوری، توسعه نرم افزار و خدمات دیجیتال
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

        <div class="flex flex-row md:flex-col items-center justify-center gap-4">
          <img src="/images/enamad.png" alt="Enamad" class="w-20 h-20 object-contain" />
          <img src="/images/zarrinpal.png" alt="Zarrinpal" class="w-20 h-20 object-contain" />
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>
//لینک های فوتر
const links = ['درخواست همکاری', 'نمونه ها', 'درباره ما', 'تماس با ما']

//ایکون های برنامه های فوتر
const socialIcons = ['telegram', 'instagram', 'whatsapp', 'x']


//نمایش ندادن در صفحات قرعه کشی
const route = useRoute();

// تعریف آرایه‌ای از مسیرهایی که نباید نوار در آن‌ها نمایش داده شود
const lotteryRoutes = [
  '/events/lottery/register',
  '/events/lottery/login',
  '/events/lottery/success',
  '/events/lottery/waiting',
  '/events/lottery/winner',
  '/events/lottery/loser'
];

// بررسی اینکه آیا مسیر فعلی جزو مسیرهای بالا هست یا خیر
const isLotteryPage = computed(() => {
  return lotteryRoutes.includes(route.path);
});
</script>