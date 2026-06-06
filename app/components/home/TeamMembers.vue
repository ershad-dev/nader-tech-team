<template>
  <section class="max-w-6xl mx-auto py-20 px-4" dir="rtl">
    <div class="mb-12">
      <h2 class="text-3xl font-bold text-slate-900 mb-4">تیم ما</h2>
      <p class="text-slate-600 max-w-2xl">
        پشت هر پروژه موفق، تیمی متخصص و متعهد قرار دارد. اعضای تیم ما با ترکیبی از تجربه، خلاقیت و دانش فنی در کنار یکدیگر تلاش می‌کنند تا بهترین نتیجه را برای مشتریان و همراهان مجموعه رقم بزنند.
      </p>
    </div>

    <div 
      ref="scrollContainer" 
      class="flex gap-6 overflow-x-auto scroll-smooth pb-8"
      style="scrollbar-width: none; -ms-overflow-style: none;"
    >
      <div 
        v-for="member in team" :key="member.id"
        class="min-w-[300px] bg-white border border-slate-100 rounded-[2.5rem] p-8 text-center shadow-sm transition-all hover:shadow-xl"
      >
        <img :src="member.image" :alt="member.name" class="w-32 h-32 rounded-full mx-auto mb-6 object-cover" />
        <h3 class="text-xl font-bold text-slate-900 mb-1">{{ member.name }}</h3>
        <p class="text-slate-500 text-sm mb-4">{{ member.role }}</p>
        <p class="text-slate-600 text-sm leading-relaxed">{{ member.bio }}</p>
      </div>
    </div>

    <div class="flex items-center justify-between mt-4">
      <div class="flex gap-2">
        <div class="w-8 h-2 bg-[#2D7A6F] rounded-full"></div>
        <div class="w-2 h-2 bg-slate-200 rounded-full"></div>
        <div class="w-2 h-2 bg-slate-200 rounded-full"></div>
      </div>

<div class="flex gap-4">
  <SliderButton 
    direction="left" 
    @click="scroll('left')" 
    class=" hover:bg-[#2D7A6F] hover:text-gray transition" 
  />
  <SliderButton 
    direction="right" 
    @click="scroll('right')" 
    class=" hover:bg-[#2D7A6F] hover:text-gray transition" 
  />
</div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const scrollContainer = ref(null);

const scroll = (direction) => {
  if (scrollContainer.value) {
    const scrollAmount = 320; // عرض کارت + گپ
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }
};

const team = [
  { id: 1, name: 'نام و نام خانوادگی', role: 'سمت شخص', bio: 'توضیحات این قسمت', image: '/images/avatar.png' },
  { id: 2, name: 'نام و نام خانوادگی', role: 'سمت شخص', bio: 'توضیحات این قسمت', image: '/images/avatar.png' },
  { id: 3, name: 'نام و نام خانوادگی', role: 'سمت شخص', bio: 'توضیحات این قسمت', image: '/images/avatar.png' },
  { id: 4, name: 'نام و نام خانوادگی', role: 'سمت شخص', bio: 'توضیحات این قسمت', image: '/images/avatar.png' }
];
</script>