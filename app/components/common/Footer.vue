<template>
  <!-- دکمه درخواست همکاری -->
  <div class="flex justify-center -mb-8 relative z-20">
    <button class="bg-[#E8C595] text-[#2D4745] font-bold px-12 py-4 rounded-2xl shadow-lg hover:bg-[#e0bc85] transition">
      درخواست همکاری
    </button>
  </div>

  <!-- فوتر اصلی با استفاده از کلاسِ کاربردی برای تصویر پس‌زمینه -->
  <footer class="relative py-20 px-6 overflow-hidden min-h-[400px] footer-background" dir="ltr">
    
    <div class="max-w-6xl mx-auto mt-8 relative z-10 " >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        <!-- ستون لینک‌های مهم -->
        <div class="space-y-4 ml-[100px]">
          <h3 class="font-bold text-[#2D4745] text-lg mb-4">لینک های مهم</h3>
          <ul class="space-y-3">
            <li v-for="link in links" :key="link" class="flex items-center gap-2 text-[#2D4745]">
              <span class="w-2 h-2 bg-[#2D7A6F] rounded-full"></span>
              {{ link }}
            </li>
          </ul>
        </div>

        <!-- ستون وسط: توضیحات و آیکون‌ها -->
        <div class="text-center space-y-6">
          <p class="text-[#2D4745] leading-relaxed font-medium">
            نادر تکنولوژی، ارائه دهنده راهکار های نوین فناوری، توسعه نرم افزار و خدمات دیجیتال
          </p>
          <div class="flex justify-center gap-4">
            <img 
              v-for="icon in socialIcons" 
              :key="icon" 
              :src="`/images/${icon}.png`" 
              alt="social" 
              class="w-10 h-10 object-contain hover:opacity-80 transition cursor-pointer" 
            />
          </div>
        </div>

        <!-- ستون نمادها -->
        <div class="flex flex-col items-center gap-4">
          <img src="/images/enamad.png" alt="Enamad" class="w-24 h-24 object-contain" />
          <img src="/images/zarrinpal.png" alt="Zarrinpal" class="w-24 h-24 object-contain" />
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup>
const links = ['درخواست همکاری', 'نمونه ها', 'درباره ما', 'تماس با ما']
const socialIcons = ['telegram', 'instagram', 'whatsapp', 'x']
</script>

<style scoped>
/* استایلِ تصویر پس‌زمینه که جایگزینِ تگ img شد */
.footer-background {
  background-image: url('/images/footer.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>