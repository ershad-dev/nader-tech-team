<template>
  <div :dir="isRtl ? 'rtl' : 'ltr'">
    <p class="text-[13px] sm:text-sm text-[#3D3E41] dark:text-dark-text-deep font-roboto leading-6">
      <i18n-t keypath="auth.termsAgreement.text" tag="span" scope="global">
        <template #terms>
          <button
            type="button"
            @click.prevent="showModal = true"
            class="text-[#1976D2] dark:text-dark-accent hover:underline font-medium"
          >
            {{ $t('auth.termsAgreement.linkText') }}
          </button>
        </template>
      </i18n-t>
    </p>

    <p v-if="error" :class="['text-red-500 dark:text-red-400 text-[11px] mt-1', isRtl ? 'text-right' : 'text-left']">
      {{ error }}
    </p>

    <TermsModal v-model="showModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TermsModal from '~/components/Terms/TermsModal.vue'

const { localeProperties } = useI18n()
const isRtl = computed(() => localeProperties.value.dir === 'rtl')

defineProps({
  error: {
    type: String,
    default: ''
  }
})

const showModal = ref(false)
</script>