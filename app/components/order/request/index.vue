<template>
  <div class="max-w-5xl mx-auto p-10  mt-[20px]">
    
    <!-- عنوان‌ها -->
    <div class="text-center mb-10">
      <h2 class="text-[34px] font-bold text-gray-800">مسیر <span class="text-[#2C7379]">رشد</span>، از اینجا آغاز می‌شود</h2>
      <h1 class="text-[32px] font-extrabold text-[#2C7379] mt-2 font-roboto">درخواست پروژه</h1>
      <p class="text-gray-500 mt-6 text-[#2C7379] text-[14px] font-roboto">برای شروع همکاری، فرم زیر را تکمیل کنید تا کارشناسان ما در اسرع وقت با شما تماس بگیرند.</p>
    </div>

    <!-- بدنه اصلی (گرید) -->
    <div class="bg-[#2C737938] p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-8">
      
    <div class="md:col-span-1 border-l-2 border-gray-300 pl-6 space-y-8"> 
        <div class="flex justify-center mb-6">
          <div class="w-[190px] h-[190px] flex items-center justify-center -mb-[35px]">
            <img src="/images/req-icon.png" alt="">         
        </div>
        </div>
<a href="" class=" text-[#0F184B] text-[16px] flex items-center justify-center font-noto-light font-bold underline underline-offset-4">
  چرا با ما همکاری کنید
</a>
  
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <div class=" h-[50px] w-[50px]">
                <OrderRequestIconsFlash class="h-[50px] w-[50px]"/>
            </div>
            <div>
              <h4 class="font-bold text-[#0F184B] font-roboto">پاسخ سریع</h4>
              <p class="text-[13px] text-[#747893] font-noto-light font-bold">کارشناسان ما در کمتر از ۲۴ ساعت با شما تماس خواهند گرفت.</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class=" h-[50px] w-[50px]">
                <OrderRequestIconsPoint class="h-[50px] w-[50px]"/>

            </div>
            <div>
              <h4 class="font-bold text-[#0F184B] font-roboto">راهکار اختصاصی</h4>
              <p class="text-[13px] text-[#747893] font-noto-light font-bold">ما برای هر پروژه، راهکار متناسب با نیاز شما ارائه می‌دهیم.</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class=" h-[50px] w-[50px]">
                <OrderRequestIconsTeam class="h-[50px] w-[50px]"/>

            </div>
            <div>
              <h4 class="font-bold text-[#0F184B] font-roboto">تجربه و تخصص</h4>
              <p class="text-[13px] text-[#747893] font-noto-light font-bold">تیم ما با سال ها <br> تجربه بهترین نتیجه را به <br> شما تضمین می‌کند.</p>
            </div>
          </div>
        </div>
    </div>

      <!-- فرم (سمت راست) -->
<form class="md:col-span-2 space-y-6">

  <div class="grid grid-cols-2 gap-4">

    <div>
      <label class="block mb-2 text-[#0F184B] font-medium font-roboto">
        نام و نام خانوادگی
      </label>
      <div class="relative">
        <OrderRequestIconsPerson class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
           
          class="w-full pr-10 p-4 bg-white/35 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)]"
        />
      </div>
    </div>

    <div>
      <label class="block mb-2 text-[#0F184B] font-medium font-roboto">
        شماره تماس
      </label>
      <div class="relative">
      <OrderRequestIconsCall class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
           
          class="w-full pr-10 p-4 bg-white/35 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)]"
        />
      </div>
    </div>

  </div>

  <div>
    <label class="block mb-2 text-[#0F184B] font-medium font-roboto">
      ایمیل
    </label>
    <div class="relative">
      <OrderRequestIconsEmail class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
         
        class="w-full pr-10 p-4 bg-white/35 rounded-[17px] border border-gray-300 outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)]"
      />
    </div>
  </div>

  <div>
    <label class="block mb-2 text-[#0F184B] font-medium font-roboto">
       درخواست برای
    </label>

    <div class="relative">
      <div
        @click="isOpen = !isOpen"
        class="w-full p-4 bg-white/35 rounded-[17px] border border-gray-300 cursor-pointer flex justify-between items-center shadow-[0_3px_0px_rgba(0,0,0,0.15)] -mb-[30px]"
      >
        <span class="text-gray-500">{{ selected || 'انتخاب کنید' }}</span>
        <Icon name="heroicons:chevron-down" class="text-gray-400" />
      </div>

<ul
  v-if="isOpen"
  class="absolute w-full bg-white mt-2 rounded-[17px] shadow-xl z-50 border border-gray-200 overflow-hidden "
>
  <li
    v-for="(option, index) in options"
    :key="index"
    @click="select(option)"
    class="p-3 text-[#747893] font-noto-light font-bold text-[20px] text-center cursor-pointer transition hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
  >
    {{ option }}
  </li>
</ul>
    </div>
  </div>

  <div>
    <label class="block mb-2 text-[#0F184B] font-medium font-roboto mt-[50px]">
      توضیحات
    </label>

    <textarea
      class="w-full bg-white/35 p-4 rounded-[17px] border border-gray-300 h-40 outline-none focus:ring-2 focus:ring-teal-700 shadow-[0_3px_0px_rgba(0,0,0,0.15)]"
    ></textarea>
  </div>

  <button
    class="w-full bg-teal-800 text-white py-4 rounded-xl font-bold hover:bg-teal-900 transition flex justify-center items-center gap-2"
  >
  <OrderRequestIconsSend />
    ارسال درخواست
    
  </button>

</form>

      <!-- ویژگی‌ها (سمت چپ) -->


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