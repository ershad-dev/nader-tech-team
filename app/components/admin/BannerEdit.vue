<template>
  <div class="p-8">
<div class="bg-[#F7F3EB] text-[#0F184B] py-3 px-6 rounded-full w-[812px] h-[60px] mx-auto mb-10 font-bold text-[20px] flex items-center justify-center shadow-xl">
  تغییر عکس بنر
</div>

    <div class="grid grid-cols-2 gap-x-20 gap-y-10 justify-items-center" dir="ltr">
      <div v-for="banner in banners" :key="banner.id" class="w-[437px]" dir="rtl">
        
<template v-if="banner.image">
<div class="relative rounded-[27px] overflow-hidden shadow-lg w-[437px] h-[283px]">
  <img :src="banner.image" class="w-full h-full object-cover" />
  
<div
  class="w-[72px] h-[71px] absolute top-0 right-0 bg-[#08103580] backdrop-blur-md text-white rounded-bl-2xl rounded-tr-[27px] font-black text-[36px] shadow-lg flex items-center justify-center"
>
  {{ banner.id }}
</div>
</div>

  <div class="flex justify-center gap-4 mt-4 w-[437px]">
    <button class="w-[172px] h-[34px] bg-[#ABD7D8] hover:bg-[#8FB0B2] rounded-[27px] font-bold text-black flex items-center justify-center text-[16px]">
      تایید
    </button>
    <button @click="deleteBanner(banner.id)" class="w-[172px] h-[34px] bg-[#ABD7D8] hover:bg-[#8FB0B2] rounded-[27px] font-bold text-black flex items-center justify-center text-[16px]">
      حذف
    </button>
  </div>
</template>

        <div v-else class="w-[437px] h-[325px] border-4 border-dashed border-[#BFD1D5] rounded-[27px] flex flex-col items-center justify-center cursor-pointer hover:bg-[#FDFBF7] transition-all">
          <input type="file" class="hidden" :id="'file-' + banner.id" @change="uploadBanner($event, banner.id)" />
          <label :for="'file-' + banner.id" class="cursor-pointer text-6xl text-[#BFD1D5]">+</label>
          <span class="text-[#0F184B] font-bold mt-2">افزودن بنر جدید</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const banners = ref([
  { id: 1, image: '/images/hero-imgae.png' },
  { id: 2, image: '/images/about-img.png' },
  { id: 3, image: '/images/content-service.jpg' },
  { id: 4, image: '/images/img-services.png' },
  { id: 5, image: '/images/banner2.jpg' },
  { id: 6, image: '/images/banner1.jpg' },
])

const deleteBanner = (id) => {
  const banner = banners.value.find(b => b.id === id)
  if (banner) banner.image = null 
}

const uploadBanner = (event, id) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const banner = banners.value.find(b => b.id === id)
      banner.image = e.target.result 
    }
    reader.readAsDataURL(file)
  }
}
</script>