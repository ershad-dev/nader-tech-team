<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[9999] flex items-center justify-center px-4"
        dir="rtl"
      >
        <!-- پس‌زمینه بلور شده -->
        <div
          class="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-colors duration-300"
          @click="close"
        ></div>

        <!-- باکس مودال -->
        <div
          class="relative bg-white dark:bg-dark-footer text-[#0F184B] dark:text-dark-text w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-colors duration-300"
          @click.stop
        >
          <!-- هدر -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-[18px] sm:text-[20px] font-bold">
              قوانین و مقررات سایت
            </h2>

            <button
              type="button"
              @click="close"
              aria-label="بستن"
              class="w-9 h-9 flex items-center justify-center rounded-full text-[#0F184B] dark:text-dark-text hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <!-- محتوا (قابل اسکرول) -->
          <div class="terms-scroll overflow-y-auto px-6 py-5 text-[14px] sm:text-[15px] leading-[26px] sm:leading-[28px] text-[#2D4745] dark:text-dark-text/80">

            <!-- حالت لودینگ -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-16 gap-3">
              <svg class="animate-spin w-8 h-8 text-[#0F184B] dark:text-dark-accent" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <span class="text-[13px] text-[#2D4745] dark:text-dark-text/70">در حال دریافت قوانین و مقررات...</span>
            </div>

            <!-- حالت خطا -->
            <div v-else-if="error" class="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <span class="text-[13px] sm:text-[14px] text-red-500 dark:text-red-400">
                خطا در دریافت قوانین و مقررات. لطفاً دوباره تلاش کنید.
              </span>
              <button
                type="button"
                @click="fetchTerms"
                class="text-[13px] font-bold text-[#0F184B] dark:text-dark-accent underline"
              >
                تلاش مجدد
              </button>
            </div>

            <!-- محتوای قوانین -->
            <div v-else-if="termsSections.length">
              <div
                v-for="(section, sIndex) in termsSections"
                :key="section.category || sIndex"
                :class="sIndex !== termsSections.length - 1 ? 'mb-10' : ''"
              >
                <h3
                  v-if="section.category"
                  class="text-[15px] sm:text-[17px] font-bold text-[#2C7379] dark:text-[#8FE3E8] mb-4 pb-2 border-b-2 border-[#2C7379]/30 dark:border-[#8FE3E8]/30"
                >
                  {{ section.category }}
                </h3>

                <div
                  v-for="item in section.items"
                  :key="item.id ?? item.title"
                  class="mb-5 last:mb-0"
                >
                  <p class="font-bold text-[#8B6F2E] dark:text-[#ECD0A0] mb-1.5">
                    {{ item.title }}
                  </p>
                  <p class="text-[#5B6B76] dark:text-[#B7C4C6]">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>

            <!-- حالت خالی -->
            <div v-else class="text-center py-16 text-[13px] text-[#2D4745] dark:text-dark-text/70">
              محتوایی برای نمایش وجود ندارد.
            </div>
          </div>

          <!-- فوتر مودال -->
          <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
            <button
              type="button"
              @click="close"
              class="bg-[#ECD0A0] dark:bg-dark-gold text-[#0F184B] dark:text-[#435056] font-bold px-8 py-2.5 rounded-[12px] transition-all hover:opacity-90"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

function close() {
  emit('update:modelValue', false);
}

const config = useRuntimeConfig();

// ==================== دریافت قوانین از بک‌اند ====================
const loading = ref(false);
const error = ref(false);
const termsSections = ref([]); // آرایه‌ای از { category, items: [{ id, title, description }] }
let fetched = false; // جلوگیری از فراخوانی مجدد بعد از دریافت موفق

async function fetchTerms() {
  loading.value = true;
  error.value = false;

  try {
    const response = await $fetch('/terms', {
      baseURL: config.public.apiBase
    });

    // پاسخ ممکن است مستقیم آبجکت باشد یا داخل response.data قرار گرفته باشد
    const raw = response?.data ?? response;

    if (!raw || typeof raw !== 'object') {
      throw new Error('Invalid terms response');
    }

    termsSections.value = Object.entries(raw)
      .map(([category, items]) => ({
        category: category?.trim() || '',
        items: Array.isArray(items) ? items : []
      }))
      .filter((section) => section.items.length > 0);

    fetched = true;
  } catch (err) {
    error.value = true;
    termsSections.value = [];
  } finally {
    loading.value = false;
  }
}

// دریافت قوانین فقط در اولین باری که مودال باز می‌شود
watch(
  () => props.modelValue,
  (isOpen) => {
    if (import.meta.client) {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    if (isOpen && !fetched && !loading.value) {
      fetchTerms();
    }
  }
);

// بستن با کلید Esc
function handleKeydown(e) {
  if (e.key === 'Escape' && props.modelValue) {
    close();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (import.meta.client) {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* ==================== اسکرول‌بار هماهنگ با تم ==================== */

/* Firefox */
.terms-scroll {
  scrollbar-width: thin;
  scrollbar-color: #2C7379 transparent;
}

:global(html.dark) .terms-scroll {
  scrollbar-color: #407B80 transparent;
}

/* Chrome / Edge / Safari */
.terms-scroll::-webkit-scrollbar {
  width: 8px;
}

.terms-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.terms-scroll::-webkit-scrollbar-thumb {
  background-color: #2C7379;
  border-radius: 9999px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.terms-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #245c61;
}

:global(html.dark) .terms-scroll::-webkit-scrollbar-thumb {
  background-color: #407B80;
}

:global(html.dark) .terms-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #4f9298;
}
</style>