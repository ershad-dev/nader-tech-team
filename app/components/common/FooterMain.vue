<template>
  <footer v-if="!isLotteryPage" class="w-full mt-20" dir="rtl">
    <!-- این بخش را داخل کانتینر اصلی فوتر قرار بده -->
<div class="relative w-full">
  <!-- بخش سبز تیره -->
<!-- بخش سبز تیره -->
<div class="bg-[#2C7379] h-[200px] w-full pt-10 pb-20 flex flex-col items-center">
  
  <!-- ۱. بخش عنوان منحنی (بالا) -->
  <div class="flex justify-center items-center  overflow-hidden">
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
     <NuxtLink to="/order/requestProject">
    <button class="bg-[#ECD0A0] text-[#0F184B] text-[20px] font-bold px-12 py-4 rounded-[16px] shadow-lg relative z-30 hover:scale-105 transition-all h-[48px] w-[263px] flex items-center justify-center">
      درخواست همکاری
    </button>
    </NuxtLink>
  </div>
</div>
<!-- افزایش پدینگ افقی از px-6 به px-12 برای فاصله بیشتر -->
<div class="bg-[#BFD1D5] w-full pt-16 ">
  <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center">
    
    <!-- لینک‌ها -->
    <div class="flex flex-col items-center leading-[40px] font-roboto">
      <h3 class=" text-[#2D4745] text-[20px] mb-4">لینک های مهم</h3>
      <ul class="space-y-3">
        <li v-for="link in links" :key="link" class="flex items-center gap-2 text-[#2D4745]">
          <span class="w-2 h-2 bg-[#2D7A6F] rounded-full flex-shrink-0 text-[18px]"></span>
          <span>{{ link }}</span>
        </li>
      </ul>
    </div>

    <!-- متن و آیکون‌ها -->
    <div class="flex flex-col items-center gap-6">
      <p class="text-[#0F184B]  font-bold text-[18px] whitespace-nowrap">
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

    <!-- نمادها (اضافه کردن items-center برای تراز بهتر) -->
    <div class="flex flex-row md:flex-col gap-4 items-center ">
      <img src="/images/enamad2.png" alt="Enamad" class="w-[153px] h-[157px] object-contain" />
      <img src="/images/zarrinpall.png" alt="Zarrinpal" class="w-[153px] h-[157px] object-contain mb-[50px]" />
    </div>

  </div>
</div>
  </footer>
</template>

<script setup>
//لینک های فوتر
const links = ['خانه ', ' سفارش گیری پروژه', ' برگزاری ایونت' , 'درباره ما']

//ایکون های برنامه های فوتر
const socialIcons = ['telegram', 'instagram', 'whatsapp', 'x' , 'linkedin']


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


// تعریف متغیری که از صفحه پدر دریافت می‌شود
defineProps({
  title: {
    type: String,
  
  },
  title1: {
    type: String,
   
  }
});
</script>