<template>
  <div class="max-w-5xl mx-auto p-4 sm:p-6 md:p-10 mt-[10px] sm:mt-[15px] md:mt-[20px]">
    
    <!-- عنوان‌ها -->
    <div class="text-center mb-6 sm:mb-8 md:mb-10">
      <h2 class="text-[22px] sm:text-[28px] md:text-[34px] font-bold text-gray-800 leading-snug">مسیر <span class="text-[#2C7379]">رشد</span>، از اینجا آغاز می‌شود</h2>
      <h1 class="text-[22px] sm:text-[26px] md:text-[32px] font-extrabold text-[#2C7379] mt-2 font-roboto">درخواست پروژه</h1>
      <p class="text-gray-500 mt-4 sm:mt-5 md:mt-6 text-[#2C7379] text-[12px] sm:text-[13px] md:text-[14px] font-roboto px-2">برای شروع همکاری، فرم زیر را تکمیل کنید تا کارشناسان ما در اسرع وقت با شما تماس بگیرند.</p>
    </div>

    <!-- بدنه اصلی (گرید) -->
    <div class="bg-[#2C737938] p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      
      <div class="md:col-span-1 border-b-2 md:border-b-0 md:border-l-2 border-gray-300 pb-6 md:pb-0 md:pl-6 space-y-4 sm:space-y-6 md:space-y-8"> 

  <div class="flex justify-center mb-4 md:mb-6">
    <div class="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[190px] md:h-[190px] flex items-center justify-center -mb-[15px] sm:-mb-[25px] md:-mb-[35px]">
      <img src="/images/req-icon.png" alt="">         
    </div>
  </div>

  <a class="text-[#0F184B] text-[13px] sm:text-[14px] md:text-[16px] flex items-center justify-center font-noto-light font-bold underline underline-offset-4 whitespace-nowrap">
    چرا با ما همکاری کنید
  </a>

  <div class="grid grid-cols-3 md:grid-cols-1 gap-2 sm:gap-3 md:gap-0 md:space-y-6">

    <div class="flex flex-col md:flex-row items-center md:items-start gap-1.5 md:gap-4 text-center md:text-right min-w-0 md:min-w-0">
      <div class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px] shrink-0">
        <OrderRequestIconsFlash class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px]"/>
      </div>
      <div class="min-w-0 md:min-w-fit">
        <h4 class="font-bold text-[#0F184B] font-roboto text-[11px] sm:text-[12.5px] md:text-base leading-tight md:leading-normal">پاسخ سریع</h4>
        <p class="text-[9px] sm:text-[10px] md:text-[13px] text-[#747893] font-noto-light font-bold leading-[13px] sm:leading-[14px] md:leading-normal mt-1 md:mt-0">کارشناسان ما در کمتر از ۲۴ ساعت <br>با شما تماس خواهند گرفت.</p>
      </div>
    </div>

    <div class="flex flex-col md:flex-row items-center md:items-start gap-1.5 md:gap-4 text-center md:text-right min-w-0 md:min-w-0">
      <div class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px] shrink-0">
        <OrderRequestIconsPoint class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px]"/>
      </div>
      <div class="min-w-0 md:min-w-fit">
        <h4 class="font-bold text-[#0F184B] font-roboto text-[11px] sm:text-[12.5px] md:text-base leading-tight md:leading-normal">راهکار اختصاصی</h4>
        <p class="text-[9px] sm:text-[10px] md:text-[13px] text-[#747893] font-noto-light font-bold leading-[13px] sm:leading-[14px] md:leading-normal mt-1 md:mt-0">ما برای هر پروژه،<br> راهکار متناسب<br> با نیاز شما ارائه می‌دهیم.</p>
      </div>
    </div>

    <div class="flex flex-col md:flex-row items-center md:items-start gap-1.5 md:gap-4 text-center md:text-right min-w-0 md:min-w-0">
      <div class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px] shrink-0">
        <OrderRequestIconsTeam class="h-[30px] w-[30px] sm:h-[36px] sm:w-[36px] md:h-[50px] md:w-[50px]"/>
      </div>
      <div class="min-w-0 md:min-w-fit">
        <h4 class="font-bold text-[#0F184B] font-roboto text-[11px] sm:text-[12.5px] md:text-base leading-tight md:leading-normal">تجربه و تخصص</h4>
        <p class="text-[9px] sm:text-[10px] md:text-[13px] text-[#747893] font-noto-light font-bold leading-[13px] sm:leading-[14px] md:leading-normal mt-1 md:mt-0">تیم ما با سال ها <br> تجربه بهترین نتیجه را به <br> شما تضمین می‌کند.</p>
      </div>
    </div>

  </div>
</div>

      <!-- فرم (سمت راست) -->
      <form class="md:col-span-2 space-y-5 sm:space-y-6">

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label class="block mb-2 text-[#0F184B] font-medium font-roboto text-[13px] sm:text-[14px] md:text-[16px]">نام و نام خانوادگی</label>
            <div class="relative group">
              <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-opacity duration-300 group-focus-within:opacity-0">
                <OrderRequestIconsPerson />
              </div>
              
              <input
                class="w-full pr-10 p-3 sm:p-3.5 md:p-4 bg-white/35 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)] text-[13px] sm:text-[14px] md:text-[16px]"
              />
            </div>
          </div>

          <div>
            <label class="block mb-2 text-[#0F184B] font-medium font-roboto text-[13px] sm:text-[14px] md:text-[16px]">
              شماره تماس
            </label>
            <div class="relative group">
              
              <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-opacity duration-300 group-focus-within:opacity-0 pointer-events-none">
                <OrderRequestIconsCall />
              </div>

              <input
                placeholder=" "
                class="w-full pr-10 p-3 sm:p-3.5 md:p-4 bg-white/35 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)] text-[13px] sm:text-[14px] md:text-[16px]"
              />
            </div>
          </div>

        </div>

        <div>
          <label class="block mb-2 text-[#0F184B] font-medium font-roboto text-[13px] sm:text-[14px] md:text-[16px]">
            ایمیل
          </label>
          <div class="relative group">
            
            <div class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-opacity duration-300 group-focus-within:opacity-0 pointer-events-none">
              <OrderRequestIconsEmail />
            </div>

            <input
              placeholder=" "
              class="w-full pr-10 p-3 sm:p-3.5 md:p-4 bg-white/35 rounded-[14px] sm:rounded-[16px] md:rounded-[17px] border border-gray-300 outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)] text-[13px] sm:text-[14px] md:text-[16px]"
            />
          </div>
        </div>

        <div>
          <label class="block mb-2 text-[#0F184B] font-medium font-roboto text-[13px] sm:text-[14px] md:text-[16px]">
             درخواست برای
          </label>

          <div class="relative">
            <div
              @click="isOpen = !isOpen"
              class="w-full p-3 sm:p-3.5 md:p-4 bg-white/35 rounded-[14px] sm:rounded-[16px] md:rounded-[17px] border border-gray-300 cursor-pointer flex justify-between items-center shadow-[0_3px_0px_rgba(0,0,0,0.15)] -mb-[5px]"
            >
              <span class="text-gray-500 text-[13px] sm:text-[14px] md:text-[16px]">{{ selected || 'انتخاب کنید' }}</span>
              <Icon name="heroicons:chevron-down" class="text-gray-400" />
            </div>

            <ul
              v-if="isOpen"
              class="absolute w-full bg-white mt-2 rounded-[14px] sm:rounded-[16px] md:rounded-[17px] shadow-xl z-50 border border-gray-200 overflow-hidden"
            >
              <li
                v-for="(option, index) in options"
                :key="index"
                @click="select(option)"
                class="p-2.5 sm:p-3 text-[#747893] h-[40px] sm:h-[44px] md:h-[47px] font-noto-light font-bold text-[13px] sm:text-[16px] md:text-[20px] text-center cursor-pointer transition hover:bg-gray-100 border-b border-gray-400 last:border-b-0 flex items-center justify-center"
              >
                {{ option }}
              </li>
            </ul>
          </div>
        </div>

        <div>
          <label class="block mb-2 text-[#0F184B] font-medium font-roboto mt-[30px] sm:mt-[40px] md:mt-[50px] text-[13px] sm:text-[14px] md:text-[16px]">
            توضیحات
          </label>

          <textarea
            class="w-full bg-white/35 p-3 sm:p-3.5 md:p-4 rounded-[14px] sm:rounded-[16px] md:rounded-[17px] border border-gray-300 h-32 sm:h-36 md:h-40 outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)] text-[13px] sm:text-[14px] md:text-[16px]"
          ></textarea>
        </div>

        <button
          class="w-full bg-teal-800 text-white py-3 sm:py-3.5 md:py-4 rounded-xl font-bold hover:bg-teal-900 transition flex justify-center items-center gap-2 text-[14px] sm:text-[15px] md:text-[16px]"
        >
          <OrderRequestIconsSend />
          ارسال درخواست
        </button>

      </form>

    </div>
  </div>
</template>

<script setup>
// تعریف گزینه‌ها در یک آرایه
const options = ref(['پروژه طراحی سایت', 'پروژه تولید محتوا', 'برگذاری ایونت', ' درخواست همکاری ','انتقادات و پیشنهادات'])
const isOpen = ref(false)
const selected = ref('')

const select = (val) => { 
  selected.value = val; 
  isOpen.value = false 
}
</script>