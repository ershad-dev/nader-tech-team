<template>
  <div class=" min-h-screen py-10 -mt-[50px]" dir="rtl">
    


    <!-- ۲. بخش تب‌ها و پروژه‌ها با منطق اسلایدر -->
    <section class="max-w-6xl mx-auto py-16 px-4">
<div class="flex justify-center mb-10">
  <div class="w-[846px] h-[59px] bg-white rounded-[48px] p-1 shadow-sm border border-gray-100 flex items-center justify-center gap-2">
    
    <button 
  v-for="category in categories" :key="category"
  @click="activeCategory = category; currentIndex = 0"
  :class="[
    'px-8 py-3 w-[178px] h-[43px] rounded-[19px] text-[18px] font-bold transition-all duration-300',
    activeCategory === category 
      ? 'bg-[#2C7379] text-white shadow-md'           // حالت انتخاب شده
      : ' text-[#0F184B] hover:bg-slate-200' // حالت عادی (غیرانتخابی)
  ]"
>
  {{ category }}
</button>
    
  </div>
</div>

      <div class="max-w-6xl mx-auto px-4 py-8" dir="rtl">
    <div class="flex items-center justify-between">
      
      <h2 class="text-[28px] font-roboto text-[#0F184B] font-normal">
        پیش نمایش از پروژه ها
      </h2>

      <NuxtLink 
          to="/order" 
          class="bg-[#2C7379] w-[147px] h-[45px] text-white rounded-[19px] text-[17px] font-medium hover:bg-[#2C7379] transition-all flex items-center justify-center gap-2 shadow-md font-roboto whitespace-nowrap"
        >
          <span>مشاهده بیشتر</span>
          <HomeIconsMoreArrow/>
      </NuxtLink>
      
    </div>
  </div>

      <!-- گرید پروژه‌ها (اسلایدشونده) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="project in visibleProjects" :key="project.id" 
             class="relative w-[250px] h[350px] bg-white rounded-[48px] border-[1px] border-gray-300 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
          <img :src="project.image" class="w-[250px] h-[344px] object-cover" />
          <div class="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/60 p-5 border-t border-white/30 text-center">
            <h3 class="text-[#0F184B] font-bold text-[20px]">{{ project.title }}</h3>
          </div>
        </div>
      </div>

      <!-- کنترل‌های اسلایدر -->
      <div class="flex items-center justify-between mt-12 px-2">
    <div class="flex justify-center gap-4 z-20 ">
      <HomeIconsSliderButton 
        direction="left" 
        @click="prevSlide" 
      />

      <HomeIconsSliderButton 
        direction="right" 
        @click="nextSlide" 
      />
    </div>
        
        <!-- دات‌های نشانگر اسلاید -->
        <div class="flex gap-2">
          <div v-for="i in totalSlides" :key="i" 
               :class="['h-2 rounded-full transition-all', currentIndex === i-1 ? 'w-8 bg-[#081035]' : 'w-2 bg-slate-300']">
          </div>
        </div>
      </div>
    </section>

        <!-- ۱. بخش شوکیس (Showcase) داینامیک -->
    <section class="max-w-6xl mx-auto px-4 mb-20">
      <div class="relative rounded-[3rem] overflow-hidden p-12 bg-white/20">
        <img src="/images/bg-services.png" class="absolute inset-0 w-[1105px] object-cover z-0 " />

        <div class="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div class="flex-1 w-full">
            <img 
                :key="currentContent.image" 
                :src="currentContent.image" 
                :alt="currentContent.title"
                class="w-[506px] h-[386px] object-cover rounded-tl-[17px] rounded-br-[17px] rounded-tr-[65px] rounded-bl-[65px] shadow-xl transition-all duration-500" 
              />
          </div>
          
          <div class="flex-1 text-black mr-[50px]">
            <h2 class="text-[26px] font-bold mb-6 text-[#0F184B]">{{ currentContent.title }}</h2>
            <p class="leading-[40px] mb-8 opacity-90 text-[#0F184B] font-roboto text-[14px]">{{ currentContent.description }}</p>
            <NuxtLink to="/order/requestProject">
              <button class="bg-[#ECD0A0] border-[0.5px] border-gray-300 text-[#0F184B] w-[268px] h-[48px] font-bold px-8 rounded-[16px] hover:scale-105 transition-allshadow-lg text-[20px] mt-[50px] flex items-center justify-center">
                درخواست همکاری
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const activeCategory = ref('طراحی سایت')
const currentIndex = ref(0)
const categories = ['طراحی سایت', 'تولید محتوا', 'برگزاری ایونت']

const contentMap = {
  'طراحی سایت': { 
    title: 'طراحی سایت ', 
    description: 'با برگزاری ایونت‌های حرفه‌ای و هدفمند، فضایی برای ایجاد ارتباطات ارزشمند، یادگیری، تعامل و تجربه‌ای متفاوت فراهم می‌کنیم. از ایده‌پردازی و برنامه‌ریزی اولیه گرفته تا هماهنگی جزئیات و اجرای نهایی، هدف ما خلق رویدادهایی منظم، جذاب و تأثیرگذار است که علاوه بر پاسخ‌گویی به اهداف برگزارکنندگان، تجربه‌ای به‌یادماندنی و لذت‌بخش برای شرکت‌کنندگان رقم بزنند و زمینه‌ساز شکل‌گیری ارتباطات و فرصت‌های جدید باشند.', 
    image: '/images/img-services.png' // آدرس اختصاصی
  },
  'تولید محتوا': { 
    title: 'تولید محتوا', 
    description: 'با برگزاری ایونت‌های حرفه‌ای و هدفمند، فرصتی برای ایجاد ارتباط، یادگیری و تجربه‌ای متفاوت فراهم می‌کنیم. از برنامه‌ریزی و هماهنگی تا اجرای نهایی، تمامی مراحل با دقت انجام می‌شود تا رویدادی منظم، جذاب و به‌یادماندنی برای شرکت‌کنندگان رقم بخورد.', 
    image: '/images/img-services.png' // آدرس اختصاصی
  },
  'برگزاری ایونت': { 
    title: 'برگزاری ایونت', 
    description: 'با برگزاری ایونت‌های حرفه‌ای و هدفمند، فرصتی برای ایجاد ارتباط، یادگیری و تجربه‌ای متفاوت فراهم می‌کنیم. از برنامه‌ریزی و هماهنگی تا اجرای نهایی، تمامی مراحل با دقت انجام می‌شود تا رویدادی منظم، جذاب و به‌یادماندنی برای شرکت‌کنندگان رقم بخورد.', 
    image: '/images/img-services.png' // آدرس اختصاصی
  }
}

const projects = [
  { id: 1, title: 'توضیحات و نام پروژه', category: 'طراحی سایت', image: '/images/preview3.jpg' },
  { id: 2, title: 'توضیحات و نام پروژه', category: 'طراحی سایت', image: '/images/preview2.jpg' },
  { id: 3, title: 'توضیحات و نام پروژه', category: 'طراحی سایت', image: '/images/preview.jpg' },
  { id: 4, title: 'توضیحات و نام پروژه', category: 'طراحی سایت', image: '/images/content1.jpg' },
  { id: 5, title: ' توضیحات و نام پروژه', category: 'طراحی سایت', image: '/images/content2.jpg' },
  { id: 6, title: ' توضیحات و نام پروژه', category: 'تولید محتوا', image: '/images/hero-imgae.png' },
  { id: 7, title: 'توضیحات و نام پروژه ', category: 'تولید محتوا', image: '/images/hero-imgae.png' },
  { id: 8, title: ' توضیحات و نام پروژه', category: 'تولید محتوا', image: '/images/hero-imgae.png' },
  { id: 9, title: ' توضیحات و نام پروژه', category: 'تولید محتوا', image: '/images/content2.jpg' },
  { id: 10, title: ' توضیحات و نام پروژه', category: 'تولید محتوا', image: '/images/content2.jpg' },

  { id: 11, title: 'توضیحات و نام پروژه', category: 'برگزاری ایونت', image: '/images/hero-imgae.png' },
]

const currentContent = computed(() => contentMap[activeCategory.value])
const filteredProjects = computed(() => projects.filter(p => p.category === activeCategory.value))

// منطق اسلایدر ۴تایی
const totalSlides = computed(() => Math.ceil(filteredProjects.value.length / 4))
const visibleProjects = computed(() => {
  const start = currentIndex.value * 4
  return filteredProjects.value.slice(start, start + 4)
})

const nextSlide = () => { if (currentIndex.value < totalSlides.value - 1) currentIndex.value++ }
const prevSlide = () => { if (currentIndex.value > 0) currentIndex.value-- }

// ریست کردن اسلایدر هنگام تغییر تب
watch(activeCategory, () => currentIndex.value = 0)
</script>