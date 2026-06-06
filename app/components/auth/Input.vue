<script setup>
import { ref, computed } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  label: String,
  modelValue: String,
  type: { type: String, default: 'text' }
})

const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)

// مدیریتِ هوشمندِ نوعِ اینپوت (اگر رمز باشد، تغییرش می‌دهد)
const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})
</script>

<template>
  <div class="text-right mb-4">
    <label class="block text-sm font-bold text-[#1a2333] mb-2">{{ label }}</label>
    <div class="relative">
      <input 
        :type="inputType"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full h-12 bg-[#ffffff] rounded-[25px] px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#2d6a66]"
        
      />
      
      <div class="absolute right-4 top-3.5 text-[#1a2333]">
        <slot name="icon" />
      </div>

      <button 
        v-if="type === 'password'" 
        type="button"
        @click="showPassword = !showPassword"
        class="absolute left-4 top-3.5 text-[#1a2333]/60 hover:text-[#2d6a66] transition"
      >
        <EyeIcon v-if="showPassword" class="w-5 h-5" />
        <EyeSlashIcon v-else class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>