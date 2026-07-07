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
  <div class="p-4 sm:p-5 lg:p-6 min-h-screen" dir="rtl">
    
    <!-- وضعیت نمایش لیست کارت‌ها -->
    <div v-if="activeView === 'list'">
      <div class="flex items-center justify-between w-full max-w-[812px] lg:w-[812px] h-[54px] lg:h-[60px] mx-auto mb-6 lg:mb-8 px-4 lg:px-6 bg-white rounded-[27px]">
        <h2 class="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-[#1a2333]">کنترل رزومه</h2>
        <!-- دکمه افزودن -->
        <button @click="openForm()" class="bg-[#67A9A880] text-black px-3 sm:px-5 lg:px-6 py-2 rounded-full text-xs sm:text-sm hover:bg-[#235754] transition-all whitespace-nowrap">
          + افزودن رزومه
        </button>
      </div>

<div class="grid grid-cols-2 lg:flex lg:flex-wrap gap-3 sm:gap-5 lg:gap-6 justify-items-center lg:justify-center max-w-full lg:max-w-[900px] mx-auto mb-10">
  <div
    v-for="item in paginatedItems"
    :key="item.id"
    class="w-full max-w-[281px] lg:w-[281px] h-auto lg:h-[379px] bg-white/17 rounded-[16px] sm:rounded-[25px] border border-gray-300 shadow-sm p-2 sm:p-4 flex flex-col items-center"
  >
    <img :src="item.image" class="w-full aspect-[217/207] lg:w-[217px] lg:h-[207px] object-cover rounded-[16px] sm:rounded-[25px] mb-2 sm:mb-4" />
    <h3 class="text-right font-bold text-gray-800 text-[12px] sm:text-[15px] lg:text-[16px] mt-1 sm:mt-2 w-full px-1 sm:px-2 leading-snug">{{ item.title }}</h3>
    
    <div class="flex justify-between w-full mt-auto gap-1 sm:gap-2 px-1 sm:px-2 pb-1 sm:pb-2 pt-2 sm:pt-4">
      <button class="flex-1 bg-[#BFD1D5] py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs lg:w-[66px]">حذف</button>
      <!-- دکمه ویرایش -->
      <button @click="openForm(item)" class="flex-1 bg-[#BFD1D5] py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs lg:w-[66px] hover:bg-blue-100">ویرایش</button>
    </div>
  </div>
</div>
       <!-- بخش صفحه‌بندی -->
<!-- Pagination -->
<div class="flex justify-center lg:justify-end items-center mt-8">
  <div dir="ltr" class="flex items-center gap-2 lg:ml-[150px]">

    <button
      v-for="page in totalPages"
      :key="page"
      @click="currentPage = page"
      :class="[
        'w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[10px] flex items-center justify-center font-bold transition-all text-sm sm:text-base',
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
      class="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] bg-[#e5e5e5] rounded-[10px] flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
<div v-else class="max-w-full lg:max-w-[1200px] mx-auto bg-[#F4F6F8] p-4 sm:p-6 lg:p-8 rounded-[24px] lg:rounded-[40px] border border-gray-200 shadow-inner" dir="rtl">
  
  <button @click="closeForm" class="mb-6 lg:mb-8 text-gray-500 font-bold hover:text-black">← بازگشت</button>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
    
    <div class="flex flex-col gap-6 lg:gap-8">
      <div class="p-4 sm:p-5 lg:p-6 rounded-[24px] lg:rounded-[30px] border border-gray-100 min-h-0 lg:min-h-[300px]">
        <div class="flex items-center gap-2 text-[#1a2333] font-bold mb-4 lg:mb-6">
          <div class="w-3 h-3 bg-[#BFD1D5] rounded-full"></div> <h3>اطلاعات پروژه</h3>
        </div>
        <div class="space-y-3 font-roboto">

<!-- نام پروژه -->
<div>
  <label class="block mb-2 text-[13px] sm:text-[14px] font-medium text-gray-700">
    نام پروژه
  </label>

  <input
    :value="selectedItem?.title"
    type="text"
    placeholder="نام پروژه را وارد کنید"
    class="w-full h-[42px] sm:h-[45px] px-4 rounded-[17px] border border-gray-300 bg-white/20 focus:outline-none focus:border-[#2D6A66]"
  />
</div>

<!-- دسته‌بندی -->
<div>
  <label class="block mb-2 text-[13px] sm:text-[14px] font-medium text-gray-700">
    دسته‌بندی
  </label>

  <select
    class="w-full h-[42px] sm:h-[45px] px-4 rounded-[17px] border border-gray-300 bg-white/20 focus:outline-none focus:border-[#2D6A66]"
  >
    <option disabled selected> </option>

  </select>
</div>

<!-- تاریخ ثبت -->
<div>
  <label class="block mb-2 text-[13px] sm:text-[14px] font-medium text-gray-700">
    تاریخ ثبت
  </label>

  <input
    type="date"
    class="w-full h-[42px] sm:h-[45px] px-4 rounded-[17px] border border-gray-300 bg-white/20 focus:outline-none focus:border-[#2D6A66]"
  />
</div>

</div>
      </div>

      <div class="p-4 sm:p-5 lg:p-6 rounded-[24px] lg:rounded-[30px] border border-gray-100 min-h-0 lg:min-h-[300px]">
        <div class="flex items-center justify-between mb-4 lg:mb-6">
          <h3 class="font-bold flex items-center gap-2 text-sm sm:text-base"><div class="w-3 h-3 bg-[#BFD1D5] rounded-full"></div> اطلاعات پروژه</h3>
          <button class="px-3 sm:px-4 py-1 border rounded-xl text-xs font-bold bg-[#BFD1D5]">ویرایش</button>
        </div>
        <div class="flex gap-2 sm:gap-3 lg:gap-4">
          <div class="w-1/3 aspect-[101/186] lg:w-[101px] lg:h-[186px] bg-gray-200 rounded-2xl overflow-hidden">
            <img src="/images/article3.jpg" alt="" class="w-full h-full object-cover">
          </div>
          <div class="w-1/3 aspect-[101/186] lg:w-[101px] lg:h-[186px] bg-gray-200 rounded-2xl overflow-hidden">
            <img src="/images/article3.jpg" alt="" class="w-full h-full object-cover">
          </div>
          <div class="w-1/3 aspect-[101/186] lg:w-[101px] lg:h-[186px] bg-gray-200 rounded-2xl border border-dashed"></div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6 lg:gap-8">
      <h3 class="font-bold flex items-center gap-2 text-sm sm:text-base"><div class="w-3 h-3 bg-[#BFD1D5] rounded-full"></div> جزئیات خدمات</h3>

      <div class="p-4 sm:p-5 lg:p-6 rounded-[24px] lg:rounded-[30px] border border-gray-100 min-h-0 lg:min-h-[300px] border border-gray-300">
        <div class="flex justify-start mb-4 lg:mb-6">
  <div class="flex gap-2 ml-auto">
            <button class="w-16 sm:w-20 py-1 text-[10px] bg-[#BFD1D5] rounded-lg">حذف</button>
            <button class="w-16 sm:w-20 py-1 text-[10px] bg-[#BFD1D5] rounded-lg">ویرایش</button>
          </div>
        </div>
        <ul class="text-sm space-y-3 lg:space-y-4 pr-2">
          <li>• طراحی رابط کاربری</li>
          <li>• کد نویسی فرانت اند</li>
          <li>• بهینه سازی سایت</li>
        </ul>
      </div>

      <div class="p-4 sm:p-5 lg:p-6 rounded-[24px] lg:rounded-[30px] border border-gray-100 min-h-0 lg:min-h-[300px]">
        <div class="flex items-center gap-2 text-[#1a2333] font-bold mb-4 lg:mb-6">
          <div class="w-3 h-3 bg-[#BFD1D5] rounded-full"></div> <h3>اطلاعات مشتری</h3>
        </div>
        <div class="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
          <div class="flex items-center gap-3 sm:gap-4">
             
              <img src="/images/article3.jpg" alt="" class="rounded-full h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] object-cover">
             <div><p class="font-bold text-sm sm:text-base">سارا احمدی</p><p class="text-xs sm:text-sm text-gray-500">مدیر مارکتینگ</p></div>
          </div>
          <div class="flex flex-row sm:flex-col gap-2">
            <button class="w-20 py-1 text-[13px] sm:text-[14px] bg-[#BFD1D5] rounded-lg">ویرایش</button>
            <button class="w-20 py-1 text-[13px] sm:text-[14px] bg-[#BFD1D5] rounded-lg ">حذف تصویر</button>
          </div>
        </div>
        <p class="mt-4 lg:mt-6 text-xs sm:text-sm text-gray-600 bg-gray-50 p-3 sm:p-4 rounded-xl">«همکاری با این مجموعه یکی از بهترین تجربه‌های کاری ما بود...»</p>
      </div>
    </div>
  </div>

<div class="flex flex-col-reverse sm:flex-row justify-end items-center gap-3 sm:gap-4 mt-8 lg:mt-10 pt-6 border-t border-gray-200" dir="ltr">

<button
  @click="saveChanges"
  class="w-[84px] h-[26px] bg-[#BFD1D5] text-black rounded-2xl text-xs font-bold flex items-center justify-center"
>
  ذخیره تغییرات
</button>
  <span class="text-gray-400 text-xs flex items-center gap-2">
    <AdminIconsEyeVector />
    216 بازدید
  </span>


</div>
</div>

  </div>
</template>