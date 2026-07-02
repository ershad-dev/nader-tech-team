Mr. Erd, [01.07.2026 19:55]
<script setup>
import { ref, computed } from 'vue'

// مدیریت نمایش صفحات
const activeView = ref('list'); // 'list' یا 'form'
const selectedItem = ref(null); // برای ویرایش یا افزودن

const resumeItems = ref([
  { id: 1, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article3.jpg' },
  { id: 2, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article2.jpg' },
  { id: 3, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article1.jpg' },
  { id: 4, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article3.jpg' },
  { id: 5, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article2.jpg' },
  { id: 6, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article1.jpg' },
  { id: 7, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article1.jpg' },
  { id: 8, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article1.jpg' },
  { id: 9, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article1.jpg' },
  { id: 10, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article3.jpg' },
  { id: 11, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article2.jpg' },
  { id: 12, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article1.jpg' },
]);


// توابع مدیریت نمایش
const openForm = (item = null) => {
  selectedItem.value = item;
  activeView.value = 'form';
};



// منطق صفحه‌بندی (مانند قبل)
const itemsPerPage = 6;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(resumeItems.value.length / itemsPerPage));
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return resumeItems.value.slice(start, start + itemsPerPage);
});

const closeForm = () => {
  activeView.value = 'list'
  selectedItem.value = null
}

const saveChanges = async () => {
  try {
    // await $fetch(...)

    closeForm()
  } catch (error) {
    console.error(error)
  }
}

</script>

<template>
  <div class="p-6 min-h-screen" dir="rtl">
    
    <!-- وضعیت نمایش لیست کارت‌ها -->
    <div v-if="activeView === 'list'">
      <div class="flex items-center justify-between w-[812px] h-[60px] mx-auto mb-8 px-6 bg-white rounded-[27px]">
        <h2 class="text-[20px] font-bold text-[#1a2333]">کنترل رزومه</h2>
        <!-- دکمه افزودن -->
        <button @click="openForm()" class="bg-[#2d6a66] text-white px-6 py-2 rounded-full text-sm hover:bg-[#235754] transition-all">
          + افزودن رزومه
        </button>
      </div>

      <div class="flex flex-wrap gap-6 justify-center max-w-[900px] mx-auto mb-10">
        <div v-for="item in paginatedItems" :key="item.id" class="w-[281px] h-[379px] bg-white/17 rounded-[25px] border border-gray-300 shadow-sm p-4 flex flex-col items-center">
          <img :src="item.image" class="w-[217px] h-[207px] object-cover rounded-[25px] mb-4" />
          <h3 class="text-right font-bold text-gray-800 text-[16px] mt-2 w-full px-2">{{ item.title }}</h3>
          
          <div class="flex justify-between w-full mt-auto gap-2 px-2 pb-2">
            <button class="flex-1 bg-[#BFD1D5] py-2 rounded-lg text-xs">بازدید</button>
            <button class="flex-1 bg-[#BFD1D5] py-2 rounded-lg text-xs">حذف</button>
            <!-- دکمه ویرایش -->
            <button @click="openForm(item)" class="flex-1 bg-[#BFD1D5] py-2 rounded-lg text-xs hover:bg-blue-100">ویرایش</button>
          </div>
        </div>
      </div>
       <!-- بخش صفحه‌بندی -->
<!-- Pagination -->
<div class="flex justify-end items-center mt-8">
  <div dir="ltr" class="flex items-center gap-2 ml-[150px]">

    <button
      v-for="page in totalPages"
      :key="page"
      @click="currentPage = page"
      :class="[
        'w-[40px] h-[40px] rounded-[10px] flex items-center justify-center font-bold transition-all',
        currentPage === page
          ? 'bg-[#2d6a66] text-white'
          : 'bg-[#e5e5e5] text-black hover:bg-gray-300'
      ]"
    >
      {{ page }}
    </button>

    <button
      :disabled="currentPage === totalPages"
      @click="currentPage++"
      class="w-[40px] h-[40px] bg-[#e5e5e5] rounded-[10px] flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M9.28859 15.88L13.1686 12L9.28859 8.11998C8.89859 7.72998 8.89859 7.09998 9.28859 6.70998C9.67859 6.31998 10.3086 6.31998 10.6986 6.70998L15.2886 11.3C15.6786 11.69 15.6786 12.32 15.2886 12.71L10.6986 17.3C10.3086 17.69 9.67859 17.69 9.28859 17.3C8.90859 16.91 8.89859 16.27 9.28859 15.88Z"
          fill="#323232"
        />
      </svg>
    </button>

  </div>
</div>

    </div>

    <!-- وضعیت نمایش فرم ویرایش/افزودن (مطابق با image_1746fa.png) -->
<!-- فرم ویرایش/افزودن (بخش دوم) -->
<div v-else class="max-w-[1200px] mx-auto bg-[#F4F6F8] p-8 rounded-[40px] border border-gray-200 shadow-inner" dir="rtl">
  
  <!-- دکمه بازگشت -->
  <button @click="closeForm" class="mb-8 text-gray-500 font-bold hover:text-black">← بازگشت</button>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
    
    <!-- ستون راست: اطلاعات پروژه -->
    <div class="space-y-8">
      <!-- باکس اطلاعات پروژه -->
      <div class=" p-6 rounded-[30px] h-[250px]  border border-gray-100 ">
        <div class="flex items-center gap-2 text-[#1a2333] font-bold mb-6">
          <div class="w-3 h-3 bg-[#BFD1D5] rounded-full"></div>
          <h3>اطلاعات پروژه</h3>
        </div>
        
        <div class="space-y-4 font-roboto">
          <div>
            <label class="block text-sm mb-2 text-black ">نام پروژه</label>
            <input :value="selectedItem?.title" class="w-[365px] h-[45px] p-4 bg-[#ffffff]/50 rounded-[17px] border border-gray-300" />
          </div>
          <div>
            <label class="block text-sm mb-2 text-black">دسته بندی پروژه</label>
            <select class="w-[365px] h-[45px] p-4 bg-[#ffffff]/50 rounded-[17px] border border-gray-300 text-black">
            
            </select>
          </div>
          <div>
            <label class="block text-sm mb-2 text-black">تاریخ ثبت</label>
            <input class="w-[365px] h-[45px] p-4 bg-[#ffffff]/50 rounded-[17px] border border-gray-300" />
          </div>

</div>
      </div>

      <!-- باکس پایین ستون راست: نمایش تصاویر -->
      <div class=" h-[384px] p-6 rounded-[30px] shadow-sm border border-gray-100">
        <div class="flex items-center gap-2 text-[#1a2333] font-bold mb-6">
          <div class="w-3 h-3 bg-[#BFD1D5] rounded-full"></div>
          <h3>اطلاعات پروژه</h3>
        </div>
<div class="flex justify-end mb-4">
  <button class="px-4 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold hover:bg-gray-50">
    ویرایش
  </button>
</div>
<div class="flex gap-4 items-start">

  <!-- عکس اول -->
  <div class="relative">
    <button
      class="absolute top-1 right-1 w-8 h-8 rounded-lg shadow flex items-center justify-center hover:bg-red-50"
    >
      <svg
        class="w-4 h-4 text-[#0F184B]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
      </svg>
    </button>

    <img
      src="/images/site1.jpg"
      alt=""
      class="w-[101px] h-[186px] object-cover rounded-2xl"
    />
  </div>

  <!-- عکس دوم -->
  <div class="relative">
    <button
      class="absolute top-1 right-1 w-8 h-8 rounded-lg shadow flex items-center justify-center hover:bg-red-50"
    >
      <svg
        class="w-4 h-4 text-[#0F184B]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
      </svg>
    </button>

    <img
      src="/images/site1.jpg"
      alt=""
      class="w-[101px] h-[186px] object-cover rounded-2xl"
    />
  </div>

  <!-- باکس سوم -->
  <div class="relative">
    <button
      class="absolute top-1 right-1 w-8 h-8  rounded-lg shadow flex items-center justify-center hover:bg-red-50"
    >
      <svg
        class="w-4 h-4 text-[#0F184B]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
      </svg>
    </button>

    <div
      class="w-[101px] h-[186px] bg-gray-100 rounded-2xl border border-dashed border-gray-300"
    ></div>
  </div>

</div>
      </div>
    </div>

    <!-- ستون چپ: جزئیات خدمات و مشتری -->
    <div class="space-y-8">
      <!-- جزئیات خدمات -->
      <div class="h-[232px] p-6 rounded-[30px] shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-2 text-[#1a2333] font-bold">
            <div class="w-3 h-3 bg-[#BFD1D5] rounded-full"></div>
            <h3>جزئیات خدمات</h3>
          </div>
          <div class="flex gap-2 ">
            <button class="w-[84px] h-[26px] text-[10px] bg-[#BFD1D5] px-3 py-1 rounded-lg">حذف</button>
            <button class="w-[84px] h-[26px] text-[10px] bg-[#BFD1D5] px-3 py-1 rounded-lg">ویرایش</button>
          </div>
        </div>
        <ul class="text-[14px] text-black space-y-5 pr-2 font-roboto">
          <li>• طراحی رابط کاربری</li>
          <li>• کد نویسی فرانت اند</li>
          <li>• کد نویسی فرانت اند</li>
          <li>• بهینه سازی سایت</li>

        </ul>
      </div>

      <!-- اطلاعات مشتری -->
<div class="border border-gray-300 rounded-[25px] p-6 w-full h-[384px]">
  <!-- عنوان و دایره آبی -->
  <div class="flex items-center justify-start gap-2 text-[#1a2333] font-bold mb-6">
    <h3>اطلاعات مشتری</h3>
    <div class="w-3 h-3 bg-[#BFD1D5] rounded-full"></div>
  </div>

  <div class="flex flex-col">
<div class="flex items-center justify-between">

  <!-- سمت راست: تصویر و اطلاعات -->
  <div class="flex items-center gap-6">
    <div class="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-white shadow-lg">
      <img
        src="/images/site1.jpg"
        alt="Profile"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="text-right font-roboto">
      <p class="font-bold text-[16px]">سارا احمدی</p>
      <p class="text-[14px] text-gray-500">مدیر مارکتینگ</p>
    </div>
  </div>

  <!-- سمت چپ: دکمه‌ها -->
  <div class="flex flex-col gap-3 font-roboto">
    <button
      class="w-[84px] h-[26px] flex items-center gap-2 px-4 py-2 bg-[#BFD1D5] rounded-[10px] text-[12px] font-bold hover:bg-[#BFD1D5] transition"
    >
      <span class="text-lg">✎</span>
      <span>ویرایش</span>
    </button>

    <button
      class="w-[84px] h-[26px] flex items-center gap-2 px-4 py-2 bg-[#BFD1D5] rounded-[10px] text-[12px] font-bold hover:bg-red-100 transition"
    >
      <span class="text-lg">🗑</span>
      <span>حذف تصویر</span>
    </button>
  </div>

</div>

    <!-- متن توضیحات در پایین -->
    <p class="text-[14px] text-gray-600 mt-6 leading-8 text-right  p-4 rounded-xl font-roboto">
      «همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود. از همان جلسات اولیه، نیازها و اهداف ما به‌خوبی درک شد و تمام مراحل پروژه با برنامه‌ریزی دقیق پیش رفت. کیفیت اجرای کار، سرعت پاسخگویی و توجه به جزئیات باعث شد نتیجه نهایی حتی بهتر از انتظارات ما باشد. از همکاری با این تیم بسیار رضایت داریم و قطعاً در پروژه‌های آینده نیز از خدمات آن‌ها استفاده خواهیم کرد.»
    </p>
  </div>
</div>
    </div>
  </div>

  <!-- فوتر فرم -->
  <div class="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
    <span class="text-gray-400 text-xs flex items-center gap-2">👁 216 بازدید</span>
    <button @click="saveChanges" class="bg-[#2d6a66] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#235754] transition-all">ذخیره تغییرات</button>
  </div>
</div>

  </div>
</template>