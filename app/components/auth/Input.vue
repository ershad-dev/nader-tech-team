//تمام اینپوت های صفحات و دکمه چشمی و .. اینجا قرار گرفته هست 

<script setup>
/**
 * کامپوننت AuthInput: ورودی اختصاصی برای صفحات احراز هویت
 * دارای قابلیت مشاهده پسورد و پشتیبانی از آیکون‌های سفارشی
 */
import { ref, computed } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'

// تعریف ورودی‌ها (Props)
const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' }
})

// تعریف رویدادها (Emits) برای v-model
const emit = defineEmits(['update:modelValue'])

// مدیریت وضعیتِ نمایش پسورد
const showPassword = ref(false)

/**
 * تعیین نوع ورودی بر اساس وضعیت نمایش پسورد
 * اگر type رمز عبور باشد، بین text و password سوییچ می‌کند
 */
const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})
</script>

<template>
  <div class="text-right mb-4 ">
    <label class="block mb-2 text-[#3D3E41] dark:text-dark-text-deep text-[14px] ">{{ label }}</label>
    
    <div class="relative">
<input 
  :type="inputType"
  :value="modelValue"
  @input="$emit('update:modelValue', $event.target.value)"
  :class="['w-full bg-[#ffffff] dark:bg-[#D9D9D9CC] text-black dark:text-black rounded-[25px] px-4 focus:outline-none focus:ring-2 focus:ring-[#2d6a66] dark:focus:ring-dark-accent border border-gray-200 dark:border-dark-border transition-all', $attrs.class]"
/>
      
      <div v-if="$slots.icon" class="absolute right-4 top-3.5 text-[#1a2333] dark:text-dark-text-deep">
        <slot name="icon" />
      </div>

      <button 
        v-if="type === 'password'" 
        type="button"
        @click="showPassword = !showPassword"
        class="absolute left-4 top-3.5 text-[#1a2333]/60 dark:text-dark-text-deep/60 hover:text-[#2d6a66] dark:hover:text-dark-accent transition-colors"
      >
        <EyeIcon v-if="showPassword" class="w-5 h-5" />
        <EyeSlashIcon v-else class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>