<template>
  <div>
    <!-- Add new item toggle -->
    <div class="mb-4 flex justify-end">
      <button
        v-if="!showAddForm"
        @click="showAddForm = true"
        :disabled="isReadOnly"
        class="px-4 py-2 rounded-full bg-[#0F184B] dark:bg-dark-accent text-white text-[12px] font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        + افزودن آیتم جدید
      </button>
    </div>

    <!-- Add new item form -->
    <div
      v-if="showAddForm"
      class="mb-5 bg-[#FFFFFF3B] dark:bg-dark-input/20 p-4 sm:p-5 lg:p-6 rounded-2xl border-2 border-dashed border-[#67A9A8]/60 dark:border-dark-accent/60"
    >
      <div class="flex items-center justify-between mb-3">
        <span class="font-bold text-[#000000] dark:text-white text-[14px]">آیتم جدید در «درباره ما»</span>
        <button @click="cancelAdd" class="text-[12px] text-[#454C6A]/70 dark:text-white hover:underline">انصراف</button>
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="flex-1">
            <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">کلید (key)</label>
            <input
              v-model="newItem.key"
              type="text"
              placeholder="مثلاً hero_title"
              class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
            />
          </div>
          <div class="w-full sm:w-48">
            <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">نوع (type)</label>
            <select
              v-model="newItem.type"
              class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
            >
              <option class="text-black" value="text">متن</option>
              <option class="text-black" value="html">HTML</option>
              <option class="text-black" value="image_path">تصویر</option>
              <option class="text-black" value="json">JSON</option>
              <option class="text-black" value="number">عدد</option>
              <option class="text-black" value="boolean">بولین</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">مقدار فارسی (value)</label>

          <RichTextEditor
            v-if="newItem.type === 'text' || newItem.type === 'html'"
            v-model="newItem.value"
            dir="rtl"
            :height="newItem.type === 'html' ? '200px' : '120px'"
            :disabled="isReadOnly"
          />

          <textarea
            v-else-if="newItem.type === 'json'"
            v-model="newItem.value"
            rows="5"
            spellcheck="false"
            class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[12px] text-[#0F184B] dark:text-white font-mono focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
          />

          <div v-else-if="newItem.type === 'image_path'" class="flex flex-col sm:flex-row sm:items-start gap-3">
            <img
              v-if="newItem.value"
              :src="resolveImageUrl(newItem.value)"
              alt=""
              class="w-16 h-16 rounded-lg object-cover border border-[#BFD1D5] dark:border-dark-border shrink-0"
              @error="$event.target.style.visibility = 'hidden'"
            />
            <div class="w-full sm:flex-1 min-w-0 flex flex-col gap-2">
              <input
                v-model="newItem.value"
                type="text"
                placeholder="لینک تصویر یا آپلود از سیستم"
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[12px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
              />
              <label
                class="w-fit cursor-pointer px-3 py-1.5 rounded-full border border-[#67A9A8] dark:border-dark-accent text-[#2C7379] dark:text-white text-[11px] font-bold hover:bg-[#67A9A8]/10 dark:hover:bg-dark-accent/10 transition"
                :class="{ 'opacity-50 pointer-events-none': newItem._uploading || isReadOnly }"
              >
                {{ newItem._uploading ? 'در حال آماده‌سازی فایل...' : 'آپلود از سیستم' }}
                <input type="file" accept="image/*" class="hidden" :disabled="newItem._uploading || isReadOnly" @change="e => handleImageFieldUpload(e, newItem)" />
              </label>
              <span v-if="newItem._file" class="text-[11px] text-[#454C6A]/70 dark:text-white">
                فایل انتخاب‌شده: {{ newItem._file.name }} — با «افزودن» ارسال می‌شود
              </span>
            </div>
          </div>

          <input
            v-else-if="newItem.type === 'number'"
            v-model.number="newItem.value"
            type="number"
            class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
          />
        </div>

        <div v-if="newItem.type === 'json'">
          <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">English value (اختیاری — با کلید «{{ (newItem.key || 'key') + '_en' }}» ذخیره می‌شود)</label>
          <textarea
            v-model="newItem.value_en"
            rows="5"
            dir="ltr"
            spellcheck="false"
            placeholder="English JSON..."
            class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[12px] text-[#0F184B] dark:text-white font-mono focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
          />
        </div>
        <div v-else-if="newItem.type === 'text' || newItem.type === 'html'">
          <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">English value (اختیاری — با کلید «{{ (newItem.key || 'key') + '_en' }}» ذخیره می‌شود)</label>
          <RichTextEditor
            v-model="newItem.value_en"
            dir="ltr"
            :height="newItem.type === 'html' ? '200px' : '120px'"
            :disabled="isReadOnly"
          />
        </div>

        <div class="flex justify-end">
          <button
            @click="addItem"
            :disabled="adding || isReadOnly"
            class="px-4 py-2 rounded-full bg-[#67A9A8] dark:bg-dark-accent text-[#0F184B] dark:text-white text-[12px] font-bold hover:bg-[#8FB0B2] dark:hover:bg-dark-accent-hover transition disabled:opacity-50"
          >
            {{ adding ? 'در حال افزودن...' : 'افزودن' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center h-40">
      <div class="w-8 h-8 border-[3px] border-[#67A9A8] dark:border-dark-accent border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Empty -->
    <div v-else-if="!items.length" class="flex flex-col items-center justify-center h-40 text-center gap-2">
      <p class="text-[#454C6A]/70 dark:text-white/70 text-[13px]">هنوز آیتمی برای صفحه «درباره ما» ثبت نشده است.</p>
    </div>

    <!-- Items -->
    <div v-else class="flex flex-col gap-4">
      <div
        v-for="item in sortedItems"
        :key="item.id ?? item.key"
        class="bg-[#FFFFFF3B] dark:bg-dark-input/20 p-4 sm:p-5 lg:p-6 rounded-2xl border border-gray-300 dark:border-dark-border transition-all duration-300"
      >
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-bold text-[#000000] dark:text-white text-[15px] sm:text-[17px] font-roboto">{{ item.key }}</span>
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide" :class="typeBadgeClass(item.type)">
              {{ typeLabel(item.type) }}
            </span>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <template v-if="confirmDeleteKey === (item.id ?? item.key)">
              <button
                @click="doDelete(item)"
                :disabled="item._deleting || isReadOnly"
                class="px-3 py-1.5 rounded-full bg-red-500 text-white text-[12px] font-bold hover:bg-red-600 transition disabled:opacity-50"
              >
                {{ item._deleting ? '...' : 'تایید حذف' }}
              </button>
              <button
                @click="confirmDeleteKey = null"
                class="px-3 py-1.5 rounded-full border border-gray-300 dark:border-dark-border text-[#454C6A] dark:text-white/70 text-[12px] font-bold hover:bg-gray-100 dark:hover:bg-dark-input transition"
              >
                انصراف
              </button>
            </template>
            <template v-else>
              <button
                @click="saveItem(item)"
                :disabled="item._saving || isReadOnly"
                class="px-3 py-1.5 rounded-full bg-[#67A9A8] dark:bg-dark-accent text-[#0F184B] dark:text-white text-[12px] font-bold hover:bg-[#8FB0B2] dark:hover:bg-dark-accent-hover transition disabled:opacity-50"
              >
                {{ item._saving ? '...' : 'ذخیره' }}
              </button>
              <button
                @click="confirmDeleteKey = item.id ?? item.key"
                :disabled="isReadOnly"
                class="px-3 py-1.5 rounded-full border border-red-300 dark:border-red-800/50 text-red-500 dark:text-red-400 text-[12px] font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-50"
              >
                حذف
              </button>
            </template>
          </div>
        </div>

        <template v-if="item.type === 'text' || item.type === 'html'">
          <label class="block text-[10px] text-[#454C6A]/60 dark:text-white/50 mb-1">فارسی</label>
          <RichTextEditor v-model="item.value" dir="rtl" :height="item.type === 'html' ? '200px' : '120px'" :disabled="isReadOnly" />
          <label class="block text-[10px] text-[#454C6A]/60 dark:text-white/50 mb-1 mt-2">English</label>
          <RichTextEditor v-model="item.value_en" dir="ltr" :height="item.type === 'html' ? '200px' : '120px'" :disabled="isReadOnly" />
        </template>

        <template v-else-if="item.type === 'json'">
          <label class="block text-[10px] text-[#454C6A]/60 dark:text-white/50 mb-1">فارسی</label>
          <textarea v-model="item.value" rows="5" spellcheck="false" class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[12px] text-[#0F184B] dark:text-white font-mono focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20" />
          <label class="block text-[10px] text-[#454C6A]/60 dark:text-white/50 mb-1 mt-2">English</label>
          <textarea v-model="item.value_en" rows="5" dir="ltr" spellcheck="false" class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[12px] text-[#0F184B] dark:text-white font-mono focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20" />
        </template>

        <div v-else-if="item.type === 'image_path'" class="flex flex-col sm:flex-row sm:items-start gap-3">
          <img
            v-if="item.value"
            :src="resolveImageUrl(item.value)"
            alt=""
            class="w-16 h-16 rounded-lg object-cover border border-[#BFD1D5] dark:border-dark-border shrink-0"
            @error="$event.target.style.visibility = 'hidden'"
          />
          <div class="w-full sm:flex-1 min-w-0 flex flex-col gap-2">
            <input
              v-model="item.value"
              type="text"
              placeholder="لینک تصویر یا آپلود از سیستم"
              class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[12px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
            />
            <label
              class="w-fit cursor-pointer px-3 py-1.5 rounded-full border border-[#67A9A8] dark:border-dark-accent text-[#2C7379] dark:text-white text-[11px] font-bold hover:bg-[#67A9A8]/10 dark:hover:bg-dark-accent/10 transition"
              :class="{ 'opacity-50 pointer-events-none': item._uploading || isReadOnly }"
            >
              {{ item._uploading ? 'در حال آماده‌سازی فایل...' : 'آپلود از سیستم' }}
              <input type="file" accept="image/*" class="hidden" :disabled="item._uploading || isReadOnly" @change="e => handleImageFieldUpload(e, item)" />
            </label>
            <span v-if="item._file" class="text-[11px] text-[#454C6A]/70 dark:text-white/60">
              فایل انتخاب‌شده: {{ item._file.name }} — با «ذخیره» ارسال می‌شود
            </span>
          </div>
        </div>

        <input
          v-else-if="item.type === 'number'"
          v-model.number="item.value"
          type="number"
          class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
        />

        <textarea
          v-else
          v-model="item.value"
          rows="2"
          class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePageItems } from '~/composables/usePageItems'

const { isReadOnly } = useAdminPermissions()

const {
  items,
  isLoading,
  confirmDeleteKey,
  showAddForm,
  adding,
  newItem,
  sortedItems,
  typeLabel,
  typeBadgeClass,
  resolveImageUrl,
  handleImageFieldUpload,
  fetchItems,
  saveItem,
  doDelete,
  addItem,
  cancelAdd,
} = usePageItems('about')

onMounted(fetchItems)
</script>
