<template>
  <div>
    <!-- Add new service toggle -->
    <div class="mb-4 flex justify-end">
      <button
        v-if="!showAddServiceForm"
        @click="showAddServiceForm = true"
        :disabled="isReadOnly"
        class="px-4 py-2 rounded-full bg-[#0F184B] dark:bg-dark-accent text-white text-[12px] font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        + افزودن خدمت جدید
      </button>
    </div>

    <!-- Add new service form -->
    <div
      v-if="showAddServiceForm"
      class="mb-5 bg-[#FFFFFF3B] dark:bg-dark-input/20 p-4 sm:p-5 lg:p-6 rounded-2xl border-2 border-dashed border-[#67A9A8]/60 dark:border-dark-accent/60"
    >
      <div class="flex items-center justify-between mb-3">
        <span class="font-bold text-[#0F184B] dark:text-white text-[14px]">خدمت جدید</span>
        <button @click="cancelAddService" class="text-[12px] text-[#454C6A]/70 dark:text-white hover:underline">انصراف</button>
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="flex-1">
            <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">عنوان (فارسی)</label>
            <input
              v-model="newService.title"
              type="text"
              placeholder="مثلاً طراحی وبسایت"
              class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
            />
          </div>
          <div class="flex-1">
            <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">Title (English)</label>
            <input
              v-model="newService.title_en"
              type="text"
              dir="ltr"
              placeholder="e.g. Website Design"
              class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
            />
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <div class="flex-1">
            <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">اسلاگ (slug)</label>
            <input
              v-model="newService.slug"
              type="text"
              dir="ltr"
              placeholder="web-design"
              class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
            />
          </div>
          <div class="flex-1">
            <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">خدمت والد (اختیاری)</label>
            <select
              v-model="newService.parent_id"
              class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
            >
              <option class="text-black" :value="null">—  (خدمت اصلی) —</option>
              <option class="text-black" v-for="entry in topLevelServiceOptions" :key="entry.node.id" :value="entry.node.id">
                {{ entry.node.title || '(بدون عنوان)' }}
              </option>
            </select>
          </div>
          <div class="w-full sm:w-40">
            <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">ترتیب نمایش</label>
            <input
              v-model.number="newService.sort_order"
              type="number"
              class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
            />
          </div>
        </div>

        <div>
          <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">توضیحات (فارسی)</label>
          <textarea
            v-model="newService.description"
            rows="4"
            placeholder="توضیح کوتاه خدمت..."
            class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
          />
        </div>

        <div>
          <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">Description (English)</label>
          <textarea
            v-model="newService.description_en"
            rows="4"
            dir="ltr"
            placeholder="English description..."
            class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
          />
        </div>

        <div class="flex items-center justify-between">
          <button
            type="button"
            @click="newService.is_active = !newService.is_active"
            class="flex items-center gap-2 px-3 py-1.5 rounded-full border w-fit transition"
            :class="newService.is_active ? 'bg-[#67A9A8]/15 dark:bg-dark-accent/15 border-[#67A9A8] dark:border-dark-accent text-[#2C7379] dark:text-white' : 'bg-gray-50 dark:bg-dark-input border-gray-300 dark:border-dark-border text-gray-400 dark:text-white/60'"
          >
            <span class="w-8 h-4 rounded-full relative transition-colors" :class="newService.is_active ? 'bg-[#67A9A8] dark:bg-dark-accent' : 'bg-gray-300 dark:bg-dark-border'">
              <span class="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all" :class="newService.is_active ? 'right-0.5' : 'right-4'" />
            </span>
          </button>

          <button
            @click="addService"
            :disabled="addingService || isReadOnly"
            class="px-4 py-2 rounded-full bg-[#67A9A8] dark:bg-dark-accent text-[#0F184B] dark:text-white text-[12px] font-bold hover:bg-[#8FB0B2] dark:hover:bg-dark-accent-hover transition disabled:opacity-50"
          >
            {{ addingService ? 'در حال افزودن...' : 'افزودن' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoadingServices" class="flex items-center justify-center h-40">
      <div class="w-8 h-8 border-[3px] border-[#67A9A8] dark:border-dark-accent border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Empty -->
    <div v-else-if="!flatServiceEntries.length" class="flex flex-col items-center justify-center h-40 text-center gap-2">
      <p class="text-[#454C6A]/70 dark:text-white/70 text-[13px]">هنوز خدمتی ثبت نشده است.</p>
    </div>

    <!-- Services list (flattened tree, indented by level) -->
    <div v-else class="flex flex-col gap-4">
      <div
        v-for="entry in flatServiceEntries"
        :key="entry.node.id"
        class="bg-[#FFFFFF3B] dark:bg-dark-input/20 p-4 sm:p-5 lg:p-6 rounded-2xl border border-gray-300 dark:border-dark-border transition-all duration-300"
        :style="{ marginRight: (entry.level * 22) + 'px' }"
      >
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="flex items-center gap-2 flex-wrap min-w-0">
            <span v-if="entry.level" class="text-[#67A9A8] dark:text-dark-accent text-[13px]">└</span>
            <span class="font-bold text-[#000000] dark:text-white text-[15px] sm:text-[17px]">
              {{ entry.node.title || '(بدون عنوان)' }}
            </span>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <template v-if="confirmDeleteServiceId === entry.node.id">
              <button
                @click="doDeleteService(entry.node)"
                :disabled="entry.node._deleting || isReadOnly"
                class="px-3 py-1.5 rounded-full bg-red-500 text-white text-[12px] font-bold hover:bg-red-600 transition disabled:opacity-50"
              >
                {{ entry.node._deleting ? '...' : 'تایید حذف' }}
              </button>
              <button
                @click="confirmDeleteServiceId = null"
                class="px-3 py-1.5 rounded-full border border-gray-300 dark:border-dark-border text-[#454C6A] dark:text-white/70 text-[12px] font-bold hover:bg-gray-100 dark:hover:bg-dark-input transition"
              >
                انصراف
              </button>
            </template>
            <template v-else>
              <button
                @click="saveService(entry.node)"
                :disabled="entry.node._saving || isReadOnly"
                class="px-3 py-1.5 rounded-full bg-[#67A9A8] dark:bg-dark-accent text-[#0F184B] dark:text-white text-[12px] font-bold hover:bg-[#8FB0B2] dark:hover:bg-dark-accent-hover transition disabled:opacity-50"
              >
                {{ entry.node._saving ? '...' : 'ذخیره' }}
              </button>
              <button
                @click="confirmDeleteServiceId = entry.node.id"
                :disabled="isReadOnly"
                class="px-3 py-1.5 rounded-full border border-red-300 dark:border-red-800/50 text-red-500 dark:text-red-400 text-[12px] font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-50"
              >
                حذف
              </button>
            </template>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1">
              <label class="block text-[11px] text-[#454C6A]/70 dark:text-white mb-1">عنوان (فارسی)</label>
              <input
                v-model="entry.node.title"
                type="text"
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
              />
            </div>
            <div class="flex-1">
              <label class="block text-[11px] text-[#454C6A]/70 dark:text-white mb-1">Title (English)</label>
              <input
                v-model="entry.node.title_en"
                type="text"
                dir="ltr"
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
              />
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1">
              <label class="block text-[11px] text-[#454C6A]/70 dark:text-white mb-1">اسلاگ</label>
              <input
                v-model="entry.node.slug"
                type="text"
                dir="ltr"
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
              />
            </div>
            <div class="flex-1">
              <label class="block text-[11px] text-[#454C6A]/70 dark:text-white mb-1">خدمت والد</label>
              <select
                v-model="entry.node.parent_id"
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
              >
                <option class="text-black" :value="null">—   (خدمت اصلی) —</option>
                <option
                  class="text-black"
                  v-for="opt in topLevelServiceOptions.filter(o => o.node.id !== entry.node.id)"
                  :key="opt.node.id"
                  :value="opt.node.id"
                >
                  {{ opt.node.title || '(بدون عنوان)' }}
                </option>
              </select>
            </div>
            <div class="w-full sm:w-40">
              <label class="block text-[11px] text-[#454C6A]/70 dark:text-white mb-1">ترتیب نمایش</label>
              <input
                v-model.number="entry.node.sort_order"
                type="number"
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
              />
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1">
              <label class="block text-[11px] text-[#454C6A]/70 dark:text-white mb-1">توضیحات (فارسی)</label>
              <textarea
                v-model="entry.node.description"
                rows="3"
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
              />
            </div>
            <div class="flex-1">
              <label class="block text-[11px] text-[#454C6A]/70 dark:text-white mb-1">Description (English)</label>
              <textarea
                v-model="entry.node.description_en"
                rows="3"
                dir="ltr"
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useServicesTree } from '~/composables/useServicesTree'

const { isReadOnly } = useAdminPermissions()

const {
  servicesTree,
  isLoadingServices,
  confirmDeleteServiceId,
  showAddServiceForm,
  addingService,
  newService,
  flatServiceEntries,
  topLevelServiceOptions,
  fetchServicesTree,
  saveService,
  doDeleteService,
  cancelAddService,
  addService,
} = useServicesTree()

onMounted(fetchServicesTree)
</script>
