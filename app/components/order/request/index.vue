<template>
  <div class="max-w-5xl mx-auto p-10 bg-white rounded-[2rem] shadow-lg border border-gray-100 mt-[100px]">
    
    <!-- عنوان‌ها -->
    <div class="text-center mb-10">
      <h2 class="text-2xl font-bold text-gray-800">مسیر <span class="text-teal-600">رشد</span>، از اینجا آغاز می‌شود</h2>
      <h1 class="text-3xl font-extrabold text-teal-800 mt-2">درخواست پروژه</h1>
      <p class="text-gray-500 mt-2">برای شروع همکاری، فرم زیر را تکمیل کنید تا کارشناسان ما در اسرع وقت با شما تماس بگیرند.</p>
    </div>

    <!-- بدنه اصلی (گرید) -->
    <div class="bg-[#e0e8e8] p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-8">
      
    <div class="md:col-span-1 border-l-2 border-gray-300 pl-6 space-y-8"> 
        <div class="flex justify-center mb-6">
          <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
            <Icon name="heroicons:clipboard-document" class="w-10 h-10 text-teal-800" />
          </div>
        </div>
        
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <div class="bg-teal-100 p-2 rounded-lg text-teal-800 shrink-0"><Icon name="heroicons:bolt" /></div>
            <div>
              <h4 class="font-bold">پاسخ سریع</h4>
              <p class="text-sm text-gray-600">کارشناسان ما در کمتر از ۲۴ ساعت با شما تماس خواهند گرفت.</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="bg-teal-100 p-2 rounded-lg text-teal-800 shrink-0"><Icon name="heroicons:target" /></div>
            <div>
              <h4 class="font-bold">راهکار اختصاصی</h4>
              <p class="text-sm text-gray-600">ما برای هر پروژه، راهکار متناسب با نیاز شما ارائه می‌دهیم.</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="bg-teal-100 p-2 rounded-lg text-teal-800 shrink-0"><Icon name="heroicons:user-group" /></div>
            <div>
              <h4 class="font-bold">تجربه و تخصص</h4>
              <p class="text-sm text-gray-600">تیم ما با سال‌ها تجربه بهترین نتیجه را به شما تضمین می‌کند.</p>
            </div>
          </div>
        </div>
    </div>

      <!-- فرم (سمت راست) -->
      <form class="md:col-span-2 space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="relative">
            <Icon name="heroicons:user" class="absolute right-3 top-4 text-gray-400" />
            <input placeholder="نام و نام خانوادگی" class="w-full pr-10 p-4 bg-white/50 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-teal-700" />
          </div>
          <div class="relative">
            <Icon name="heroicons:phone" class="absolute right-3 top-4 text-gray-400" />
            <input placeholder="شماره تماس" class="w-full pr-10 p-4 bg-white/50 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-teal-700" />
          </div>
        </div>
        
        <div class="relative">
          <Icon name="heroicons:envelope" class="absolute right-3 top-4 text-gray-400" />
          <input placeholder="ایمیل" class="w-full pr-10 p-4 bg-white/50 rounded-[17px] border border-gray-300 outline-none focus:ring-2 focus:ring-teal-700" />
        </div>

        <!-- دراپ‌داون -->
        <div class="relative">
    <div @click="isOpen = !isOpen" class="w-full p-4 bg-white/50 rounded-[17px] border border-gray-300 cursor-pointer flex justify-between items-center">
      <span class="text-gray-500">{{ selected || 'انتخاب کنید' }}</span>
      <Icon name="heroicons:chevron-down" class="text-gray-400" />
    </div>
    
    <ul v-if="isOpen" class="absolute w-full bg-white mt-2 rounded-[17px] shadow-xl z-50 border border-gray-200">
      <li 
        v-for="(option, index) in options" 
        :key="index"
        @click="select(option)" 
        class="p-3 hover:bg-gray-100 cursor-pointer transition"
      >
        {{ option }}
      </li>
    </ul>
  </div>

        <textarea placeholder="توضیحات" class="w-full bg-white/50 p-4 rounded-[17px] border border-gray-300 h-40 outline-none focus:ring-2 focus:ring-teal-700"></textarea>
        
        <button class="w-full bg-teal-800 text-white py-4 rounded-xl font-bold hover:bg-teal-900 transition flex justify-center items-center gap-2">
          ارسال درخواست <Icon name="heroicons:paper-airplane" />
        </button>
      </form>

      <!-- ویژگی‌ها (سمت چپ) -->


    </div>
  </div>
</template>

<script setup>
// تعریف گزینه‌ها در یک آرایه
const options = ref(['وب‌سایت', 'اپلیکیشن', 'سئو (SEO)', 'طراحی رابط کاربری'])
const isOpen = ref(false)
const selected = ref('')

const select = (val) => { 
  selected.value = val; 
  isOpen.value = false 
}
</script>