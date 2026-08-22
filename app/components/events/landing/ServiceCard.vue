<template>
  <!-- نمایش لیست کارت‌ها با استفاده از v-for -->
  <div 
    v-for="(service, index) in services" 
    :key="index"
    @click="openModal(service)"
    class="bg-white dark:bg-[#435056] rounded-[24px] sm:rounded-[35px] md:rounded-[40px] xl:rounded-[49px] min-[1920px]:rounded-[56px] flex items-center shadow-sm overflow-hidden h-[110px] sm:h-[150px] md:h-[160px] xl:h-[180.11px] min-[1920px]:h-[210px] w-full xl:w-[860px] min-[1920px]:w-[1000px] cursor-pointer"
  >
    
    <!-- تصویر -->
    <div class="w-[35%] sm:w-[30%] md:w-[32%] xl:w-[209px] min-[1920px]:w-[245px] h-full shrink-0 self-stretch">
      <img :src="service.image" :alt="service.title" class="w-full h-full object-cover rounded-[24px] sm:rounded-[35px] md:rounded-[40px] xl:rounded-[49px] min-[1920px]:rounded-[56px]" />
    </div>

    <!-- متن -->
    <div 
      class="flex-1 flex items-center py-2 sm:py-3 md:py-3 xl:py-0 min-w-0 h-full"
      :class="isRtl 
        ? 'pr-3 sm:pr-4 md:pr-5 xl:pr-[16px] min-[1920px]:pr-[20px]' 
        : 'pl-3 sm:pl-4 md:pl-5 xl:pl-[16px] min-[1920px]:pl-[20px]'"
    >
      <div class="w-full" :class="isRtl ? 'text-right' : 'text-left'">
        <h3 class="text-[13px] sm:text-[18px] md:text-[19px] xl:text-[22px] min-[1920px]:text-[25px] font-bold text-[#606792] dark:text-white mb-1 sm:mb-2 line-clamp-2 leading-tight sm:leading-normal">{{ service.title }}</h3>
        <p 
          class="text-[10px] sm:text-[13px] md:text-[13px] xl:text-[15px] min-[1920px]:text-[17px] font-roboto text-[#606792] dark:text-white leading-[15px] sm:leading-relaxed md:leading-relaxed mt-1 sm:mt-2 md:mt-2 xl:mt-[12px] min-[1920px]:mt-[16px] line-clamp-3"
          :class="isRtl 
            ? 'pl-6 sm:pl-8 md:pl-10 xl:pl-[28px] min-[1920px]:pl-[36px]' 
            : 'pr-6 sm:pr-8 md:pr-10 xl:pr-[28px] min-[1920px]:pr-[36px]'"
        >{{ service.description }}</p>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <Teleport to="body">
    <div 
      v-if="selectedService"
      @click.self="closeModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
    >
      <div class="relative bg-white dark:bg-[#435056] rounded-[24px] sm:rounded-[32px] w-full max-w-md max-h-[85vh] overflow-y-auto p-5 sm:p-7">
        
        <!-- دکمه بستن -->
        <button 
          @click="closeModal"
          class="absolute top-4 rtl:left-4 ltr:right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition"
          aria-label="close"
        >
          ✕
        </button>

        <img 
          :src="selectedService.image" 
          :alt="selectedService.title" 
          class="w-full h-[160px] object-cover rounded-[18px] mb-4"
        />

        <div :class="isRtl ? 'text-right' : 'text-left'">
          <h3 class="text-[18px] sm:text-[20px] font-bold text-[#606792] dark:text-white mb-3">
            {{ selectedService.title }}
          </h3>
          <p class="text-[14px] sm:text-[15px] font-roboto text-[#606792] dark:text-white leading-relaxed">
            {{ selectedService.description }}
          </p>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

const { localeProperties } = useI18n();
const isRtl = computed(() => localeProperties.value.dir === 'rtl');

defineProps({
  services: {
    type: Array,
    default: () => []
  }
})

const selectedService = ref(null)

function openModal(service) {
  selectedService.value = service
}

function closeModal() {
  selectedService.value = null
}
</script>