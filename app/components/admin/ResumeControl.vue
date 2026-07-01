<script setup>
import { ref, computed } from 'vue'

const itemsPerPage = 6; // تعداد آیتم در هر صفحه
const currentPage = ref(1);

const resumeItems = ref([
  { id: 1, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article3.jpg' },
  { id: 2, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article2.jpg' },
  { id: 3, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article1.jpg' },
  { id: 4, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article3.jpg' },
  { id: 5, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article2.jpg' },
  { id: 6, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article1.jpg' },
    { id: 7, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article3.jpg' },
  { id: 8, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article2.jpg' },
  { id: 9, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article1.jpg' },
  { id: 10, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article3.jpg' },
  { id: 11, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article2.jpg' },
  { id: 12, title: 'تفاوت طراحی سایت اختصاصی با قالب آماده', image: '/images/article1.jpg' },
]);

// منطق صفحه‌بندی
const totalPages = computed(() => Math.ceil(resumeItems.value.length / itemsPerPage));
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return resumeItems.value.slice(start, start + itemsPerPage);
});
</script>

<template>
  <div class="p-6 min-h-screen" dir="rtl">
    <div class="flex items-center justify-between w-[812px] h-[60px] mx-auto mb-8 px-6 bg-white rounded-[27px]">
      <h2 class="text-[20px] font-bold text-[#1a2333]">کنترل رزومه</h2>
      <button class="bg-[#2d6a66] text-white px-6 py-2 rounded-full text-sm hover:bg-[#235754] transition-all">
        + افزودن رزومه
      </button>
    </div>

    <!-- گرید کارت‌ها با استفاده از paginatedItems -->
    <div class="flex flex-wrap gap-6 justify-center max-w-[900px] mx-auto mb-10">
      <div 
        v-for="item in paginatedItems" 
        :key="item.id"
        class="w-[281px] h-[379px] bg-white/25 rounded-[25px] border border-gray-100 shadow-sm p-4 flex flex-col items-center hover:shadow-lg transition-all duration-300"
      >
        <div class="w-[217px] h-[207px] mt-[16px] mb-4">
          <img :src="item.image" class="w-full h-full object-cover rounded-[25px] shadow-xl" alt="Resume Image" />
        </div>

        <h3 class="text-right font-bold text-gray-800 text-[16px] mt-2 w-full px-2 leading-6">
          {{ item.title }}
        </h3>
        
        <div class="flex justify-between w-full mt-auto gap-2 px-2 pb-2">
          <button class="flex-1 bg-[#BFD1D5] text-black py-2 rounded-lg text-xs hover:bg-gray-200 flex items-center justify-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 6H21" stroke="currentColor" stroke-width="2"/><path d="M8 6V4H16V6" stroke="currentColor" stroke-width="2"/><path d="M19 6L18 20H6L5 6" stroke="currentColor" stroke-width="2"/></svg>
            حذف
          </button>
          <button class="flex-1 bg-[#BFD1D5] text-black py-2 rounded-lg text-xs hover:bg-blue-100 flex items-center justify-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3 8.7 19.3 7.3 18.5 6.5C17.7 5.7 16.3 5.7 15.5 6.5L5 17V20H4Z" stroke="currentColor" stroke-width="2"/></svg>
            ویرایش
          </button>
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
</template>