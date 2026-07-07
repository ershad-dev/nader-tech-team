<template>
  <div class="max-w-6xl mx-auto px-4 mt-2 sm:mt-14 md:mt-2 relative">
    
    <div class="relative w-full">
      <img src="/images/bg-team.svg" class="-mr-[7px] max-aouto w-full h-auto object-cover rounded-[1.5rem] sm:rounded-[2.2rem] md:rounded-[3rem]" alt="Background" />

      <div class="flex justify-center w-full px-4 -mt-[81px] sm:-mt-[106px] md:-mt-[230px]">
        <!-- بقیه دقیقاً همون چیزیه که داشتی، بدون تغییر -->
        
        <div class="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-[300px] sm:w-[400px] md:w-[853px]">
          
          <div 
            v-for="(member, index) in teamMembers" 
            :key="member.id" 
            :ref="el => { cardRefs[index] = el }"
            @click="selectMember(index)"
            :class="[
              'bg-white rounded-[14px] sm:rounded-[20px] md:rounded-[40px] h-[65px] w-[68px] sm:h-[85px] sm:w-[90px] md:h-[185px] md:w-[200px] shadow-lg transition-all duration-300 cursor-pointer flex flex-col overflow-hidden'
            ]"
          >
            <div class="w-full h-[48px] sm:h-[62px] md:h-[155px] overflow-hidden">
              <img 
                :src="member.image" 
                :alt="member.name"
                class="w-full h-full object-scale-down" 
              />
            </div>

            <div 
              class="mt-auto py-1 sm:py-1.5 md:py-4 px-1 md:px-2 text-center relative"
              style="background: linear-gradient(90deg, rgba(44, 115, 121, 0) 0%, rgba(44, 115, 121, 0.22) 100%);"
            >
                <p class="text-[#747893] font-normal text-[8px] sm:text-[10px] md:text-[16px] font-roboto truncate">{{ member.name }}</p>
              
                <div v-if="selectedIndex === index" class="absolute -top-3 left-1/2 -translate-x-1/2">
                </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <div v-if="selectedIndex !== null" class="mt-16 sm:mt-24 md:mt-32 relative text-center px-2 sm:px-4 md:px-16 animate-fade-in">
      
        <div 
          class="notch absolute -top-[18px] sm:-top-[24px] md:-top-[30px] bg-[#F7F3EB] transition-all duration-500 ease-out flex justify-center items-center z-10 mt-[18px] sm:mt-[24px] md:mt-[30px]"
          :style="{ left: indicatorLeft + 'px', width: notchWidth + 'px', transform: 'translateX(-50%)' }"
        >
          <img src="/images/arrow-on-team3.png" alt="arrow" class="-mt-[18px] sm:-mt-[24px] md:-mt-[30px] h-[30px] sm:h-[40px] md:h-[50px]">
        </div>

      <div class="w-full sm:w-[600px] md:w-[875px] mx-auto bg-[#ABD7D8]/25 p-4 sm:p-6 md:p-8 rounded-b-[28px] rounded-t-[10px] sm:rounded-b-[38px] sm:rounded-t-[14px] md:rounded-b-[50px] md:rounded-t-[17px] border border-[#ABD7D8]/30 text-right -mt-[50px] sm:-mt-[75px] md:-mt-[100px] shadow-[0px_3px_2px_0px_rgba(0,0,0,0.5)]">
        
        <h3
          class="
            text-[12px] sm:text-[13px] md:text-[14px] font-normal text-[#0F184B] mb-2 sm:mb-3 font-medium transition-all duration-300"
        >
          {{ teamMembers[selectedIndex].name }}
        </h3>
        <p class="text-slate-700 text-[12px] sm:text-[13px] md:text-base text-rught mx-auto font-roboto mt-2 sm:mt-[10px]">
          {{ teamMembers[selectedIndex].bio }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';

const selectedIndex = ref(null);
const cardRefs = ref([]);
const indicatorLeft = ref(0);
const notchWidth = ref(100);

const teamMembers = [
  { id: 1, name: 'مشخصات شخص', bio: 'تیم ما با تکیه بر تخصص، خلاقیت و کیفیت، بهترین راهکارها را در زمینه طراحی سایت، تولید محتوا و برگزاری رویدادها ارائه می‌دهد.', image: '/images/icon-team.jpg' },
  { id: 2, name: ' مشخصات شخص', bio: 'تیم ما متشکل از متخصصان باتجربه در حوزه طراحی سایت، تولید محتوا و برگزاری رویدادها است. ما با تمرکز بر کیفیت، خلاقیت و ارائه راهکارهای مؤثر، تلاش می‌کنیم بهترین نتیجه را برای مشتریان خود رقم بزنیم. همکاری تیمی، نوآوری و توجه به جزئیات از مهم‌ترین ارزش‌های ما هستند..', image: '/images/icon-team.jpg' },
  { id: 3, name: 'مشخصات شخص', bio: 'تیم ما متشکل از متخصصان باتجربه در حوزه طراحی سایت، تولید محتوا و برگزاری رویدادها است. ما با تمرکز بر کیفیت، خلاقیت و ارائه راهکارهای مؤثر، تلاش می‌کنیم بهترین نتیجه را برای مشتریان خود رقم بزنیم. همکاری تیمی، نوآوری و توجه به جزئیات از مهم‌ترین ارزش‌های ما هستند.', image: '/images/icon-team.jpg' },
  { id: 4, name: 'مشخصات شخص', bio: 'تیم ما متشکل از متخصصان باتجربه در حوزه طراحی سایت، تولید محتوا و برگزاری رویدادها است. ما با تمرکز بر کیفیت، خلاقیت و ارائه راهکارهای مؤثر، تلاش می‌کنیم بهترین نتیجه را برای مشتریان خود رقم بزنیم. همکاری تیمی، نوآوری و توجه به جزئیات از مهم‌ترین ارزش‌های ما هستند.', image: '/images/icon-team.jpg' }
];

const updateNotchWidth = () => {
  const w = window.innerWidth;
  if (w < 640) {
    notchWidth.value = 45;
  } else if (w < 768) {
    notchWidth.value = 60;
  } else {
    notchWidth.value = 100;
  }
};

onMounted(() => {
  updateNotchWidth();
  window.addEventListener('resize', () => {
    updateNotchWidth();
    if (selectedIndex.value !== null) selectMember(selectedIndex.value);
  });
  selectMember(0);
});

const selectMember = async (index) => {
  selectedIndex.value = index;
  await nextTick();
  
  if (cardRefs.value[index]) {
    const card = cardRefs.value[index];
    indicatorLeft.value = card.offsetLeft + (card.offsetWidth / 2);
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

.notch {
  position: absolute;
  height: 25px;
  background: #F7F3EB;

  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

.notch::before {
  content: "";
  position: absolute;
  left: -20px;
  top: 0;
  width: 20px;
  height: 20px;

  border-top-right-radius: 20px;
  box-shadow: 10px -10px 0 #F7F3EB; 
}

.notch::after {
  content: "";
  position: absolute;
  right: -20px;
  top: 0;
  width: 20px;
  height: 20px;
  border-top-left-radius: 20px;
  box-shadow: -10px -10px 0 #F7F3EB;
}

@media (max-width: 767px) {
  .notch {
    height: 14px;
  }
  .notch::before,
  .notch::after {
    width: 11px;
    height: 11px;
  }
  .notch::before {
    left: -11px;
    box-shadow: 5px -5px 0 #F7F3EB;
    border-top-right-radius: 11px;
  }
  .notch::after {
    right: -11px;
    box-shadow: -5px -5px 0 #F7F3EB;
    border-top-left-radius: 11px;
  }
}
</style>