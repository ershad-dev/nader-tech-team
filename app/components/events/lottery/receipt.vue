<template>
  <div class="min-h-screen bg-[#F9F7F2] flex justify-center items-center p-4" dir="rtl">
    
    <div ref="pdfTarget" class="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden relative pb-8">
      
      <div class="w-full h-48 md:h-56 relative">
        <img src="/images/lottery-header-reg.jpg" class="w-full h-full object-cover" />
      </div>

      <div class="px-6 md:px-10">
        
        <h2 class="text-green-600 font-bold text-lg md:text-xl text-center my-6">ثبت‌نام با موفقیت انجام شد</h2>

        <div class="bg-[#BFD1D580]/50 border border-[#6F78B780] rounded-2xl p-4 md:p-6 mb-8 w-full">
          <div class="space-y-4 text-gray-600 text-sm md:text-base">
            <div class="flex justify-between border-b pb-3 font-roboto">
              <span>نام و نام خانوادگی</span>
               <span class="font-medium text-gray-800 font-roboto">[نام کاربر]</span>
            </div>

            <div class="flex justify-between border-b pb-3 font-roboto">
              <span>شماره موبایل</span> 
              <span class="font-medium text-gray-800 font-roboto">[0912...]</span>
            </div>

            <div class="flex justify-between border-b pb-3 font-roboto">
              <span>مبلغ پرداختی</span> 
              <span class="font-medium text-gray-800 font-roboto">[مبلغ]</span>
            </div>

            <div class="flex justify-between font-roboto">
              <span>وضعیت پرداخت</span> 
              <span class="text-green-600 font-bold font-roboto">موفق</span>
            </div>
          </div>
        </div>

        <div class="text-center mb-8">
          <div class="bg-[#C5E0E3] text-[#2D7A6F] px-6 py-2 rounded-full inline-block font-bold mb-3 text-sm">کد قرعه‌کشی</div>
          <p class="text-xl md:text-2xl font-mono font-bold text-[#2C7379] tracking-widest break-all">X7M9K2P4R8T1Q6</p>
        </div>

            <p class="text-red-400 text-xs text-center mb-8 leading-relaxed font-roboto">
                  لطفاً از این صفحه اسکرین‌شات تهیه کنید؛ هنگام ورود، بلیط شما بر اساس این  اطلاعات بررسی خواهد شد.
            </p> 

        <p class="text-red-400 text-xs text-center mb-8 leading-relaxed font-roboto">
          لطفاً از این صفحه اسکرین‌شات تهیه کنید؛ هنگام ورود، بلیط شما بر اساس این اطلاعات بررسی خواهد شد.
        </p>
<div class="flex flex-col items-center w-full px-6 md:px-10 mb-8 gap-4">
  
  <button 
    @click="downloadPDF"
    class="w-[95px] h-[21px] bg-[#ED8480]/50 flex justify-center items-center rounded-lg hover:bg-[#ED8480] transition shadow-lg"
  >
    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
    </svg>
  </button>

  <button class="w-full max-w-[375px] h-[47px] bg-[#2D7A6F] text-white flex justify-center items-center rounded-2xl font-bold hover:bg-teal-800 transition shadow-lg">
    بازگشت به خانه
  </button>
  
</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const pdfTarget = ref(null);

const downloadPDF = async () => {
  // بارگذاری داینامیک برای سازگاری با Nuxt 3
  const html2pdf = (await import('html2pdf.js')).default;
  
  const options = {
    margin: 10,
    filename: 'Lottery-Registration.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(options).from(pdfTarget.value).save();
};
</script>