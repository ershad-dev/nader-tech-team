<template>
  <div class="max-w-6xl mx-auto px-4 mt-[10px] relative -mt-[100px]">
    
    <div class="relative w-full">
      <img src="/images/bg-team.png" class="-mr-[7px] max-aouto w-full h-auto object-cover rounded-[3rem]" alt="Background" />

      <div class="absolute -top-12 left-1/2 -translate-x-1/2 mt-[90px] -mr-[600px]">
          <HomeIconsArrowOnTeam/>
      </div>

<div class="flex justify-center w-full px-4 -mt-[230px]">
  
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-[853px]  gap-4">
    
    <div 
      v-for="(member, index) in teamMembers" 
      :key="member.id" 
      :ref="el => { cardRefs[index] = el }"
      @click="selectMember(index)"
      :class="[
        'bg-white rounded-[40px] h-[185px] w-[200px] shadow-lg transition-all duration-300 cursor-pointer flex flex-col overflow-hidden'
      ]"
    >
      <div class="w-full h-[155px] overflow-hidden">
        <img 
          :src="member.image" 
          :alt="member.name"
          class="w-full h-full object-scale-down" 
        />
      </div>

      <div 
        class="mt-auto py-4 px-2 text-center relative"
        style="background: linear-gradient(90deg, rgba(44, 115, 121, 0) 0%, rgba(44, 115, 121, 0.22) 100%);"
      >
          <p class="text-[#747893] font-normal text-[16px] font-roboto">{{ member.name }}</p>
        
          <div v-if="selectedIndex === index" class="absolute -top-3 left-1/2 -translate-x-1/2">
          </div>
      </div>
    </div>
    
  </div>
</div>
    </div>

    <div v-if="selectedIndex !== null" class="mt-32 relative text-center px-4 md:px-16 animate-fade-in">
      
        <div 
          class="notch absolute -top-[30px] w-[120px] bg-[#F7F3EB] transition-all duration-500 ease-out flex justify-center items-center z-10 mt-[30px]"
          :style="{ left: indicatorLeft + 'px', width: '100px', transform: 'translateX(-50%)' }"
        >
          <img src="/images/arrow-on-team3.png" alt="arrow" class="-mt-[30px] h-[50px]">
        </div>

      <div class="w-[875px] mx-auto bg-[#ABD7D8]/25 p-8 rounded-b-[50px] rounded-t-[17px] border border-[#ABD7D8]/30 text-right -mt-[100px] shadow-[0px_3px_2px_0px_rgba(0,0,0,0.5)] ">
        
        <!--
          جابه‌جایی پویا عنوان برای جلوگیری از هم‌پوشانی با فلش (Notch)
          هنگام انتخاب کارت دوم، عنوان کمی به سمت راست منتقل می‌شود.
        -->
        <h3
          :class="[
            'text-[16px] font-normal text-[#0F184B] mb-3 -mt-[20px] font-roboto transition-all duration-300',
            selectedIndex === 1 ? 'mr-[70px]' : 'mr-[175px]'
          ]"
        >
          {{ teamMembers[selectedIndex].name }}
        </h3>
        <p class="text-slate-700 leading-relaxed text-sm md:text-base font-medium text-rught mx-auto font-roboto mt-[20px]">
          {{ teamMembers[selectedIndex].bio }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'; // اضافه کردن onMounted

const selectedIndex = ref(null);
const cardRefs = ref([]);
const indicatorLeft = ref(0);

const teamMembers = [
  { id: 1, name: 'مشخصات شخص', bio: 'تیم ما متشکل از متخصصان باتجربه در حوزه طراحی سایت، تولید محتوا و برگزاری رویدادها است. ما با تمرکز بر کیفیت، خلاقیت و ارائه راهکارهای مؤثر، تلاش می‌کنیم بهترین نتیجه را برای مشتریان خود رقم بزنیم. همکاری تیمی، نوآوری و توجه به جزئیات از مهم‌ترین ارزش‌های ما هستند.', image: '/images/icon-team.jpg' },
  { id: 2, name: ' مشخصات شخص', bio: 'تیم ما متشکل از متخصصان باتجربه در حوزه طراحی سایت، تولید محتوا و برگزاری رویدادها است. ما با تمرکز بر کیفیت، خلاقیت و ارائه راهکارهای مؤثر، تلاش می‌کنیم بهترین نتیجه را برای مشتریان خود رقم بزنیم. همکاری تیمی، نوآوری و توجه به جزئیات از مهم‌ترین ارزش‌های ما هستند..', image: '/images/icon-team.jpg' },
  { id: 3, name: 'مشخصات شخص', bio: 'تیم ما متشکل از متخصصان باتجربه در حوزه طراحی سایت، تولید محتوا و برگزاری رویدادها است. ما با تمرکز بر کیفیت، خلاقیت و ارائه راهکارهای مؤثر، تلاش می‌کنیم بهترین نتیجه را برای مشتریان خود رقم بزنیم. همکاری تیمی، نوآوری و توجه به جزئیات از مهم‌ترین ارزش‌های ما هستند.', image: '/images/icon-team.jpg' },
  { id: 4, name: 'مشخصات شخص', bio: 'تیم ما متشکل از متخصصان باتجربه در حوزه طراحی سایت، تولید محتوا و برگزاری رویدادها است. ما با تمرکز بر کیفیت، خلاقیت و ارائه راهکارهای مؤثر، تلاش می‌کنیم بهترین نتیجه را برای مشتریان خود رقم بزنیم. همکاری تیمی، نوآوری و توجه به جزئیات از مهم‌ترین ارزش‌های ما هستند.', image: '/images/icon-team.jpg' }
];

// این تابع را فراخوانی می‌کنیم تا عملیات انتخاب و محاسبه مکان فلش انجام شود
onMounted(() => {
  selectMember(0); // انتخاب نفر اول به صورت خودکار
});

const selectMember = async (index) => {
  selectedIndex.value = index;
  await nextTick();
  
  if (cardRefs.value[index]) {
    const card = cardRefs.value[index];
    // استفاده از offsetLeft که موقعیت کارت را نسبت به پدر (Grid) می‌دهد
    // اضافه کردن نصف عرض کارت برای رسیدن به وسط
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
  width: 50px;
  background: #F7F3EB;

  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

/* قوس چپ */
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

/* قوس راست */
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


</style>