<template>
  <!-- کانتینر اصلی صفحه با پس‌زمینه کرم و چیدمان راست‌چین -->
  <div class="min-h-screen bg-[#F9F7F2] flex justify-center items-center p-4" dir="rtl">
    
    <RaffleCard>
      <!-- بخش بالایی: تصویر هدر و عنوان موفقیت -->
      <div class="text-center mb-6">
        <img src="/images/lottery-header-reg.jpg" class="absolute inset-0 w-full h-[232px] object-cover" />
        <h2 class="text-green-600 font-bold text-xl mt-[250px]">ثبت‌نام با موفقیت انجام شد</h2>
      </div>

      <!-- باکس اطلاعات کاربر -->
      <div class="flex flex-col items-center text-center">
        <div class="bg-[#B2B4C2]/5 border border-gray-200 rounded-2xl p-6 mb-8 h-[254px] w-[525px]">
          <div class="space-y-4 text-gray-600 text-sm">
            <div class="flex justify-between border-b pb-4"><span>نام و نام خانوادگی</span> <span>[نام کاربر]</span></div>
            <div class="flex justify-between border-b pb-4"><span>شماره موبایل</span> <span>[0912...]</span></div>
            <div class="flex justify-between border-b pb-4"><span>مبلغ پرداختی</span> <span>[مبلغ]</span></div>
            <div class="flex justify-between"><span>وضعیت پرداخت</span> <span class="text-green-600 font-bold">موفق</span></div>
          </div>
        </div>
      </div>

      <!-- نمایش کد قرعه‌کشی -->
      <div class="text-center mb-8">
        <div class="bg-[#C5E0E3] text-[#2D7A6F] px-6 py-2 rounded-[17px] inline-block font-bold mb-3">کد قرعه‌کشی</div>
        <p class="text-2xl font-mono font-bold text-[#2C7379] tracking-widest">X7M9K2P4R8T1Q6</p>
        <p class="text-red-400 text-xs mt-[17px]">کد قرعه‌کشی را نزد خود نگه دارید، برای ورود به قرعه‌کشی نیاز است</p>
      </div>
      
      <!-- یادداشت هشدار برای اسکرین‌شات -->
      <p class="text-red-400 text-xs text-center mb-8 leading-relaxed mt-[100px]">
        لطفاً از این صفحه اسکرین‌شات تهیه کنید؛ هنگام ورود، بلیط شما بر اساس این اطلاعات بررسی خواهد شد.
      </p>

      <!-- دکمه بازگشت -->
      <button class="w-full bg-[#2D7A6F] text-white py-4 rounded-2xl font-bold hover:bg-teal-800 transition shadow-lg">
        بازگشت به خانه
      </button>
    </RaffleCard>
    
  </div>
</template>

<script setup>
// منطق صفحه (در صورت نیاز به دریافت داده‌های داینامیک)
</script>