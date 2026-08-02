<template>
  <div dir="rtl">
    <label class="flex items-start gap-2 cursor-pointer select-none w-fit">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="mt-0.5 w-4 h-4 rounded border-gray-300 dark:border-dark-border text-[#0F184B] dark:text-dark-accent accent-[#0F184B] dark:accent-dark-accent cursor-pointer flex-shrink-0"
      />

      <span class="text-[13px] sm:text-sm text-[#3D3E41] dark:text-dark-text-deep font-roboto leading-6">
        <button
          type="button"
          @click.prevent="showModal = true"
          class="text-[#1976D2] dark:text-dark-accent hover:underline font-medium"
        >
          قوانین و مقررات
        </button>
        را مطالعه کردم و می‌پذیرم
      </span>
    </label>

    <p v-if="error" class="text-red-500 dark:text-red-400 text-[11px] mt-1 text-right">
      {{ error }}
    </p>

    <TermsModal v-model="showModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TermsModal from '~/components/TermsModal.vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])

const showModal = ref(false)
</script>
