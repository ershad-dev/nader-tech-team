<script setup>
import { ref, computed } from 'vue';

// وضعیت نمایش (اگر true باشد فرم، اگر false باشد لیست)
const isFormVisible = ref(false);

const articles = ref([
  { id: 1, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', date: '1405/03/26 - 14:30', views: 216, image: 'images/article1.jpg' },
  { id: 2, title: ' تفاوت طراحی سایت اختصاصی با قالب آماده', date: '1405/04/01 - 10:00', views: 350, image: '/images/article4.jpg' },
  { id: 3, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', date: '1405/04/05 - 15:45', views: 120, image: '/images/article3.jpg' },
  { id: 4, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', date: '1405/04/10 - 09:20', views: 500, image: '/images/article5.jpg' },
  { id: 5, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', date: '1405/04/12 - 11:00', views: 300, image: '/images/site1.jpg' },
  { id: 6, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده ', date: '1405/04/15 - 16:30', views: 420, image: '/images/site1.jpg' },
]);

const currentPage = ref(1);
const itemsPerPage = 4;
const totalPages = computed(() => Math.ceil(articles.value.length / itemsPerPage));
const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return articles.value.slice(start, start + itemsPerPage);
});

const changePage = (page) => { if (page >= 1 && page <= totalPages.value) currentPage.value = page; };
</script>

<template>
  <!-- ۱. اگر isFormVisible درست است، صفحه فرم (image_dab9e8.png) را نشان بده -->
<div v-if="isFormVisible" class="max-w-full lg:max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8" dir="rtl">
    <button @click="isFormVisible = false" class="mb-4 text-sm font-bold text-gray-500">بازگشت   ← </button>
    
    <div class="bg-[#ECEDF4] p-4 sm:p-6 lg:p-8 rounded-[20px] sm:rounded-[24px] lg:rounded-[30px] ">
       <!-- عنوان -->
       <h2 class="text-lg sm:text-xl font-bold mb-5 sm:mb-8 text-[#1a2333]">افزودن/ویرایش مقاله</h2>

       <div class="space-y-4 sm:space-y-6">
         <!-- نام مقاله -->
         <div>
           <label class="block text-sm font-bold mb-2 text-gray-700">نام مقاله</label>
           <input type="text" class="w-full h-[46px] sm:h-[50px] bg-white/20 border border-gray-300 rounded-[17px] px-4 focus:outline-none" placeholder="تفاوت طراحی سایت اختصاصی با قالب آماده" />
         </div>

         <!-- تاریخ مقاله -->
         <div>
           <label class="block text-sm font-bold mb-2 text-gray-700">تاریخ مقاله</label>
           <input type="text" class="w-full h-[46px] sm:h-[50px] bg-white/20 border border-gray-300 rounded-[17px] px-4 focus:outline-none" placeholder="1405/03/05" />
         </div>

         <!-- تصویر مقاله -->
<div>
  <label class="block text-sm font-bold mb-2 text-gray-700">تصویر مقاله</label>

  <div class="w-full min-h-[140px] sm:h-[180px] border border-gray-300 rounded-2xl flex flex-col sm:flex-row items-center justify-start gap-4 sm:gap-6 p-4 sm:px-6 bg-white/20">
    <img
      src="/images/article1.jpg"
      class="w-[110px] h-[132px] sm:w-[136px] sm:h-[163px] object-cover rounded-[17px]"
    />

    <button class="bg-gray-300 px-6 py-2 rounded-xl text-sm font-bold">
      انتخاب تصویر
    </button>
  </div>
</div>

         <!-- متن توضیحات -->
         <div>
           <label class="block text-sm font-bold mb-2 text-gray-700">متن توضیحات مقاله</label>
           <textarea class="w-full h-[180px] sm:h-[250px] bg-white/20 border border-gray-300 rounded-2xl p-4 focus:outline-none"></textarea>
         </div>

        <div class="flex justify-end">
        <button class="bg-[#286463] text-white px-8 py-3 rounded-xl font-bold text-sm w-full sm:w-[150px]">
            ذخیره مقاله
        </button>
        </div>
       </div>
    </div>
  </div>

  <!-- ۲. اگر isFormVisible غلط است، لیست مقالات را نشان بده -->
  <div v-else class="max-w-full lg:max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8" dir="rtl">
    
    <div class="flex flex-row justify-between items-center mb-5 sm:mb-8 bg-white rounded-full w-full h-[52px] sm:h-[60px] px-3 sm:px-4">
      <h1 class="text-base sm:text-lg lg:text-xl font-bold text-[#1a2333]">مقالات</h1>
      <!-- دکمه افزودن که فرم را باز می‌کند -->
      <button @click="isFormVisible = true" class="bg-[#67A9A880] px-3 sm:px-6 py-2 rounded-full font-bold flex items-center gap-2 text-[12px] sm:text-[14px] whitespace-nowrap">
        + افزودن مقاله
      </button>
    </div>

 <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-5 lg:gap-6">
  <div
    v-for="article in paginatedArticles"
    :key="article.id"
    class="bg-white/20 p-3 sm:p-5 lg:p-6 rounded-[16px] sm:rounded-[24px] lg:rounded-[30px] border border-gray-300 shadow-sm flex flex-col sm:flex-row items-center gap-2 sm:gap-5 lg:gap-6 h-auto lg:h-[186px]"
  >
    <img :src="article.image" class="w-full h-[100px] sm:w-[110px] sm:h-[132px] lg:w-[136px] lg:h-[163px] object-cover rounded-xl sm:rounded-2xl shrink-0" />
    <div class="flex-1 w-full">
      <h3 class="font-bold text-[12px] sm:text-base lg:text-lg mb-1.5 sm:mb-3 lg:mb-4 line-clamp-2">{{ article.title }}</h3>
      <div class="flex flex-col gap-1 sm:gap-2 text-gray-500 text-[10px] sm:text-sm">
        <span class="flex items-center gap-1 sm:gap-2 text-[#747893]"> <AdminIconsDateVector/> {{ article.date }}</span>
        <span class="flex items-center gap-1 sm:gap-2 text-[#747893]"><AdminIconsEyeVector/> {{ article.views }} بازدید</span>
      </div>
    </div>
    
    <div class="flex gap-1.5 sm:gap-2 w-full sm:w-auto">
      <button class="flex-1 sm:flex-none sm:w-[85px] h-[26px] sm:h-[26px] bg-[#BFD1D5] rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1">
        <AdminIconsDelete /> حذف
      </button>
      <button @click="isFormVisible = true" class="flex-1 sm:flex-none sm:w-[85px] h-[26px] sm:h-[26px] bg-[#BFD1D5] rounded-lg sm:rounded-[10px] text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1">
        <AdminIconsEdit /> ویرایش
      </button>
    </div>
  </div>
</div>

    <!-- صفحه‌بندی -->
    <div class="flex justify-center sm:justify-end gap-2 mt-6 sm:mt-8">
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white border border-gray-300 font-bold hover:bg-gray-50 disabled:opacity-50">→</button>
      <button v-for="page in totalPages" :key="page" @click="changePage(page)" dir="ltr" :class="['w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-bold border transition', currentPage === page ? 'bg-teal-800 text-white' : 'bg-white border-gray-300 hover:bg-gray-50']">
        {{ page }}
      </button>
    </div>
  </div>
</template>