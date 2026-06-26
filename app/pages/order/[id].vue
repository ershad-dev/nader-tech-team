<script setup>
const route = useRoute();
const { projectsData } = useProjects(); // فراخوانی داده‌ها از composable

const projectId = parseInt(route.params.id);
const project = computed(() => projectsData[projectId] || projectsData[1]);
</script>

<template>
  <div class="min-h-screen p-10 bg-[#BFD1D5] -mt-[100px]">
    <div class="text-center mt-[100px] flex justify-center items-center gap-2">
      <h2 class="text-3xl font-bold text-[#2C7379] flex items-baseline">
        <span class="rotate-12 origin-bottom translate-y-3 inline-block">آینده</span>
        <span class="rotate-6 origin-bottom translate-y-1 inline-block">برند</span>
        <span class="rotate-3 origin-bottom inline-block">شما</span>
        <span class="text-[#D4A373] rotate-0 inline-block mx-2">همینجا</span>
        <span class="-rotate-3 origin-bottom inline-block">آغاز</span>
        <span class="-rotate-6 origin-bottom translate-y-1 inline-block">می‌شود</span>
      </h2>
    </div>

    <!-- بخش بالایی: تصاویر پله‌ای -->
<div class="relative w-full py-20">
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[654px] h-[654px] rounded-full bg-gradient-to-b from-[#2C7379] via-[#2C7379]/80 via-[#B2B4C2] to-[#BFD1D5] z-0 -mt-[100px]"></div>
  <div class="absolute top-10 left-10 w-24 h-24 bg-teal-700 rounded-full opacity-80"></div>
  <div class="absolute bottom-20 right-20 w-16 h-16 bg-teal-700 rounded-full opacity-80"></div>
  <div class="absolute top-0 right-0 w-[40%] h-full bg-[#a8c1c3]/20 rounded-l-full -z-20"></div>

  <div class="flex justify-center items-center gap-14 mb-16 px-4 mt-[30px] z-10">
    <div class="w-[321px] h-[640px] rounded-[25px] overflow-hidden -mt-40 shadow-xl z-20">
      <img :src="project.images[0]" class="w-full h-full object-cover" alt="Right" />
    </div>
    <div class="w-[321px] h-[640px] shadow-2xl rounded-[25px] overflow-hidden z-20">
      <img :src="project.images[1]" class="w-full h-full object-cover" alt="Center" />
    </div>
    <div class="w-[321px] h-[640px] shadow-2xl rounded-[25px] overflow-hidden mt-40 z-20">
      <img :src="project.images[2]" class="w-full h-full object-cover" alt="Left" />
    </div>
  </div>
</div>

    <!-- متن توضیحات پروژه -->
    <div class="mb-10">
      <h2 class="text-teal-800 text-[26px] font-bold mb-2">{{ project.title }}</h2>
      <h3 class="text-[32px] font-extrabold text-[#0F184B] mb-4 mt-[40px]">{{ project.subtitle }}</h3>
      <p class="text-[14px] text-[#0F184B] leading-[45px] font-roboto mt-[40px]">
        {{ project.desc1 }}
      </p>
    </div>

    <div class="mb-10 mt-[100px]">
      <h3 class="text-[26px] font-extrabold text-[#0F184B] mb-4">{{ project.subtitle }}</h3>
      <p class="text-[14px] text-[#0F184B] font-normal leading-[45px] font-roboto mt-[40px]">
        {{ project.desc2 }}
      </p>
    </div>

    <div class="w-3/4 mx-auto mb-10 h-[1.5px] bg-gradient-to-r from-white/75 to-gray-400"></div>

    <div class="mt-16 max-w-[900px] mx-auto -mb-[200px]">
      <h3 class="text-[#2C7379] font-bold text-[32px] mb-8 flex flex-col items-center">اعتماد مشتریان</h3>
      <div class="w-full shadow-sm">
        <div class="flex items-center gap-4 mb-6">
          <img src="/images/avater-man.jpg" alt="Customer" class="w-[131px] h-[131px] rounded-[17px] border-4 border-white shadow-md" />
          <div class="text-right mr-[10px]">
            <p class="text-[#747893] text-[14px] font-medium">{{ project.customerName }}</p>
            <p class="text-[13px] text-[#747893] font-roboto font-medium mt-[25px]">{{ project.customerRole }}</p>
          </div>
        </div>

        <div class="mb-[300px] w-full h-[229px] bg-white/50 p-6 border border-white rounded-tl-[60px] rounded-br-[60px] rounded-bl-[60px]">
          <h4 class="text-[#0F184B] foont-robot font-bold mb-3 text-[16px] font-700 mt-[20px]">تجربه همکاری از زبان مشتری</h4>
          <p class="text-[#616474] leading-[40px] text-[14px] font-noto-regular mb-[200px]">
            "{{ project.customerFeedback }}"
          </p>
        </div>
      </div>
    </div>
  </div>
</template>