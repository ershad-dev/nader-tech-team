<template>
  <section class="max-w-6xl mx-auto py-16 px-4" dir="rtl">
    


    <div class="flex justify-center mb-10">
      <div class="bg-white rounded-[48px] p-1 shadow-sm border border-gray-100 flex items-center">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="activeCategory = category"
          :class="[
            'px-8 py-3 rounded-[19px] text-sm font-bold transition-all duration-300',
            activeCategory === category 
              ? 'bg-[#2C7379] text-white shadow-md' 
              : 'text-slate-600 hover:bg-slate-50'
          ]"
        >
          {{ category }}
        </button>
      </div>
    </div>

        <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-slate-800">پیش نمایش از پروژه ها</h2>
      <button class="bg-[#2C7379] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#25665d] transition-all flex items-center gap-2">
        مشاهده بیشتر <span>←</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id" 
        class="relative bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
      >
        <img :src="project.image" :alt="project.title" class="w-full h-80 object-cover" />
        
        <div class="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/40 p-5 border-t border-white/30 text-center transition-all duration-300">
          <h3 class="text-slate-900 font-bold text-sm">{{ project.title }}</h3>
          <p class="text-[10px] text-slate-700 mt-1">توضیحات کوتاه پروژه در این قسمت</p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mt-12 px-2 dir-rtl">
      

<div class="flex items-center justify-between mt-12 px-2 dir-rtl">
  
  <div class="flex gap-4">
    <SliderButton direction="left" @click="prevSlide" />
    <SliderButton direction="right" @click="nextSlide" />
  </div>


    </div>
      <div class="flex gap-2">
    <div class="w-8 h-2 bg-[#2D7A6F] rounded-full"></div>
    <div class="w-2 h-2 bg-slate-300 rounded-full"></div>
    <div class="w-2 h-2 bg-slate-300 rounded-full"></div>
  </div>
</div>
  </section>
</template>

<script setup>
const activeCategory = ref('طراحی سایت')
const categories = ['طراحی سایت', 'تولید محتوا', 'برگزاری ایونت']

const projects = [
  { id: 1, title: 'نام پروژه اول', category: 'طراحی سایت', image: '/images/hero-imgae.png' },
  { id: 2, title: 'نام پروژه دوم', category: 'تولید محتوا', image: '/images/hero-imgae.png' },
  { id: 3, title: 'نام پروژه سوم', category: 'برگزاری ایونت', image: '/images/hero-imgae.png' },
  { id: 4, title: 'نام پروژه چهارم', category: 'طراحی سایت', image: '/images/hero-imgae.png' },
]

const filteredProjects = computed(() => {
  return projects.filter(p => p.category === activeCategory.value)
})
</script>