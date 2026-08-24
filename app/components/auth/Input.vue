// کامپوننت اینپوت مشترک صفحات احراز هویت (شامل دکمه نمایش پسورد)

<script setup>
// ورودی سفارشی برای فرم‌های احراز هویت با قابلیت نمایش/مخفی کردن پسورد
import { ref, computed } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'

const { locale, localeProperties } = useI18n()
// جهت چیدمان بر اساس زبان
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

// پراپ‌های کامپوننت
const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' }
})

// رویداد به‌روزرسانی مقدار برای v-model
const emit = defineEmits(['update:modelValue'])

// وضعیت نمایش پسورد
const showPassword = ref(false)

// نوع فعلی اینپوت (متن یا پسورد) بر اساس وضعیت نمایش
const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})
</script>

<template>
  <div class="mb-4" :class="isRtl ? 'text-right' : 'text-left'">
    <label class="block mb-2 text-[#3D3E41] dark:text-dark-text-deep text-[14px] ">{{ label }}</label>
    
    <div class="relative">
<!-- فیلد ورودی اصلی -->
<input 
  :type="inputType"
  :value="modelValue"
  @input="$emit('update:modelValue', $event.target.value)"
  :dir="isRtl ? 'rtl' : 'ltr'"
  :class="[
    'w-full bg-[#ffffff] dark:bg-[#D9D9D9CC] text-black dark:text-black rounded-[25px] px-4 focus:outline-none focus:ring-2 focus:ring-[#2d6a66] dark:focus:ring-dark-accent border border-gray-200 dark:border-dark-border transition-all',
    $attrs.class
  ]"
/>
      
      <!-- آیکون سفارشی سمت اینپوت -->
      <div
        v-if="$slots.icon"
        class="absolute top-3.5 text-[#1a2333] dark:text-dark-text-deep"
        :class="isRtl ? 'right-4' : 'left-4'"
      >
        <slot name="icon" />
      </div>

      <!-- دکمه نمایش/مخفی کردن پسورد -->
      <button 
        v-if="type === 'password'" 
        type="button"
        @click="showPassword = !showPassword"
        class="absolute top-3.5 text-[#1a2333]/60 dark:text-dark-text-deep/60 hover:text-[#2d6a66] dark:hover:text-dark-accent transition-colors"
        :class="isRtl ? 'left-4' : 'right-4'"
      >
        <EyeIcon v-if="showPassword" class="w-5 h-5" />
        <EyeSlashIcon v-else class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>