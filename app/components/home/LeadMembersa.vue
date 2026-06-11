<template>
  <div class="max-w-6xl mx-auto px-4 mt-20 relative">
    
    <div class="relative w-full">
      <img src="/images/Subtract.png" class="w-full h-auto object-cover rounded-[3rem]" alt="Background" />

      <div class="absolute -top-12 left-1/2 -translate-x-1/2 mt-[70px]">
          <img src="/images/arrow-on-team2.png" alt="arrow">
      </div>

      <div class="absolute -bottom-20 left-4 right-4 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        <div 
          v-for="(member, index) in teamMembers" 
          :key="member.id" 
          :ref="el => { cardRefs[index] = el }"
          @click="selectMember(index)"
          :class="[
            'bg-white rounded-[2rem] shadow-lg transition-all duration-300 cursor-pointer flex flex-col overflow-hidden',
            selectedIndex === index ? 'ring-4 ring-[#2D7A6F] shadow-2xl scale-105' : 'hover:shadow-xl hover:-translate-y-1'
          ]"
        >
          <div class="p-6 flex flex-col items-center">
            <div class="w-[90px] h-[90px] bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <img :src="member.image" class="w-full h-full object-cover" />
            </div>
          </div>

          <div class="mt-auto py-4 px-2 text-center bg-gradient-to-b from-[#ABD7D8]/60 to-white relative">
            <p class="text-slate-800 font-bold text-sm">{{ member.name }}</p>
            
            <div v-if="selectedIndex === index" class="absolute -top-3 left-1/2 -translate-x-1/2">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedIndex !== null" class="mt-32 relative text-center px-4 md:px-16 animate-fade-in">
      
      <div 
        class="absolute -top-[30px] h-10 bg-[#F7F3EB] transition-all duration-500 ease-out flex justify-center items-center z-10 shadow-sm mt-[30px]"
        :style="{ left: indicatorLeft + 'px', width: '50px', transform: 'translateX(-50%)' }"
        style="border-radius: 0 0 90% 90% / 0 0 100% 100%;"
      >
            <img src="/images/arrow-on-team2.png" alt="arrow">

      </div>

      <div class="bg-[#ABD7D8]/20 p-8 rounded-[40px] border border-[#ABD7D8]/30 shadow-inner">
        <h3 class="text-xl font-bold text-[#2D7A6F] mb-3">{{ teamMembers[selectedIndex].name }}</h3>
        <p class="text-slate-700 leading-relaxed text-sm md:text-base font-medium max-w-2xl mx-auto">
          {{ teamMembers[selectedIndex].bio }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const selectedIndex = ref(null);
const cardRefs = ref([]);
const indicatorLeft = ref(0);

const teamMembers = [
  { id: 1, name: 'علی علوی', bio: 'متخصص در توسعه زیرساخت‌های نرم‌افزاری با ۱۰ سال سابقه در پروژه‌های بزرگ.', image: '/images/avatar1.png' },
  { id: 2, name: 'سارا رضایی', bio: 'طراح خلاق با تمرکز بر تجربه کاربری در محصولات دیجیتال و دیزاین سیستم‌ها.', image: '/images/avatar2.png' },
  { id: 3, name: 'محمد محمدی', bio: 'کارشناس تولید محتوای استراتژیک برای شبکه‌های اجتماعی و برندسازی.', image: '/images/avatar3.png' },
  { id: 4, name: 'مینا حسینی', bio: 'برنامه‌ریز حرفه‌ای رویدادهای تخصصی فناوری و استارتاپی در مقیاس کشوری.', image: '/images/avatar4.png' }
];

const selectMember = async (index) => {
  selectedIndex.value = index;
  await nextTick();
  
  if (cardRefs.value[index]) {
    const card = cardRefs.value[index];
    const container = card.closest('.max-w-6xl');
    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    
    indicatorLeft.value = (cardRect.left - containerRect.left) + (cardRect.width / 2);
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>