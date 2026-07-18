<template>
  <div class="w-full h-full flex flex-col" dir="rtl">
    <!-- Header -->
    <div class="px-5 pt-6 pb-4 lg:px-8 lg:pt-8">
      <h1 class="text-[#0F184B] font-bold text-[19px] lg:text-[22px]">
        مدیریت محتوای صفحات
      </h1>
      <p class="text-[#454C6A]/70 text-[12px] lg:text-[13px] mt-1">
        ویرایش محتوای کلید-مقدار صفحات سایت
      </p>
    </div>

    <!-- Page tabs -->
    <div class="px-5 lg:px-8">
      <div class="flex flex-wrap justify-center items-center gap-2 mb-2 bg-[#F7F3EB] py-3 lg:py-0 lg:h-[64px] rounded-[27px] px-2">
        <button
          v-for="p in pages"
          :key="p.slug"
          @click="selectPage(p.slug)"
          :class="[
            'px-3 sm:px-4 lg:px-5 py-2 rounded-full transition-all text-[12px] sm:text-[13px] lg:text-[14px] font-medium h-[36px] sm:h-[38px] lg:h-[41px]',
            activePage === p.slug
              ? 'bg-[#67A9A8] text-[#0F184B] shadow-md font-bold'
              : 'text-[#454C6A] hover:bg-gray-200'
          ]"
        >
          {{ p.label }}
        </button>
      </div>
    </div>

    <!-- Toast -->
    <transition name="fade">
      <div
        v-if="toast.message"
        class="mx-5 lg:mx-8 mt-4 px-4 py-2.5 rounded-xl text-[13px] font-bold"
        :class="toast.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-[#67A9A8]/10 text-[#2C7379] border border-[#67A9A8]/40'"
      >
        {{ toast.message }}
      </div>
    </transition>

    <!-- Body -->
    <div class="flex-1 overflow-y-auto px-5 py-5 lg:px-8 lg:py-6 hide-scrollbar">
      <!-- Loading -->
      <div v-if="isLoading" class="flex items-center justify-center h-40">
        <div class="w-8 h-8 border-[3px] border-[#67A9A8] border-t-transparent rounded-full animate-spin"></div>
      </div>

      <!-- Empty -->
      <div v-else-if="!items.length" class="flex flex-col items-center justify-center h-40 text-center gap-2">
        <p class="text-[#454C6A]/70 text-[13px]">
          هنوز آیتمی برای صفحه «{{ activePage }}» ثبت نشده است.
        </p>
      </div>

      <!-- Items -->
      <div v-else class="flex flex-col gap-4">
        <div
          v-for="item in items"
          :key="item.key"
          class="bg-[#FFFFFF3B] p-4 sm:p-5 lg:p-6 rounded-2xl border border-gray-300 transition-all duration-300"
        >
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-bold text-[#000000] text-[15px] sm:text-[17px] font-roboto">{{ item.key }}</span>
              <span
                class="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide"
                :class="typeBadgeClass(item.type)"
              >
                {{ typeLabel(item.type) }}
              </span>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <button
                @click="saveItem(item)"
                :disabled="item._saving"
                class="px-3 py-1.5 rounded-full bg-[#67A9A8] text-[#0F184B] text-[12px] font-bold hover:bg-[#8FB0B2] transition disabled:opacity-50"
              >
                {{ item._saving ? '...' : 'ذخیره' }}
              </button>
            </div>
          </div>

          <!-- Value editors by type -->
          <textarea
            v-if="item.type === 'text'"
            v-model="item.value"
            rows="2"
            class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] text-[13px] text-[#0F184B] focus:outline-none focus:border-[#67A9A8] resize-y"
          />

          <textarea
            v-else-if="item.type === 'html' || item.type === 'json'"
            v-model="item.value"
            rows="5"
            spellcheck="false"
            class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] text-[12px] text-[#0F184B] font-mono focus:outline-none focus:border-[#67A9A8] resize-y"
          />

          <div v-else-if="item.type === 'image_path'" class="flex flex-col sm:flex-row sm:items-center gap-3">
            <img
              v-if="item.value"
              :src="item.value"
              alt=""
              class="w-16 h-16 rounded-lg object-cover border border-[#BFD1D5] shrink-0"
              @error="$event.target.style.visibility='hidden'"
            />
            <input
              v-model="item.value"
              type="text"
              placeholder="لینک تصویر"
              class="w-full sm:flex-1 min-w-0 px-3 py-2 rounded-lg border border-[#BFD1D5] text-[12px] font-roboto focus:outline-none focus:border-[#67A9A8]"
            />
          </div>

          <input
            v-else-if="item.type === 'number'"
            v-model.number="item.value"
            type="number"
            class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] text-[13px] font-roboto focus:outline-none focus:border-[#67A9A8]"
          />

          <button
            v-else-if="item.type === 'boolean'"
            @click="item.value = !item.value"
            class="flex items-center gap-2 px-3 py-1.5 rounded-full border w-fit transition"
            :class="item.value ? 'bg-[#67A9A8]/15 border-[#67A9A8] text-[#2C7379]' : 'bg-gray-50 border-gray-300 text-gray-400'"
          >
            <span class="w-8 h-4 rounded-full relative transition-colors" :class="item.value ? 'bg-[#67A9A8]' : 'bg-gray-300'">
              <span
                class="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all"
                :class="item.value ? 'right-0.5' : 'right-4'"
              />
            </span>
            <span class="text-[12px] font-bold">{{ item.value ? 'فعال' : 'غیرفعال' }}</span>
          </button>

          <textarea
            v-else
            v-model="item.value"
            rows="2"
            class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] text-[13px] focus:outline-none focus:border-[#67A9A8] resize-y"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'

// ─────────────────────────────────────────────────────────────
// NOTE ON ENDPOINTS (confirmed with backend — Ali)
//   GET    /api/page/{page}      -> public, no token needed, list a page's
//                                    items (response: { data: [...] })
//   POST   /api/admin/page       -> body: { page, key, value, type }
//                                    upserts by (page, key) — used for
//                                    "save/edit" existing items. Needs
//                                    the admin bearer token.
//                                    Returns { data: { id, ... } }
// این نسخه از کامپوننت فقط ویرایش دارد؛ بخش‌های افزودن آیتم جدید و
// حذف آیتم عمداً حذف شده‌اند.
// ─────────────────────────────────────────────────────────────

const API_BASE = 'https://nadertechnologyteam.ir/api'

const { authHeader, initFromStorage } = useAdminAuth()

const pages = ref([
  { slug: 'home', label: 'خانه' },
  { slug: 'about', label: 'درباره ما' },
  { slug: 'events', label: 'ایونت‌ها' },
])
const activePage = ref('about')

const items = ref([])
const isLoading = ref(false)

const toast = reactive({ message: '', type: 'success' })
let toastTimer = null
const showToast = (message, type = 'success') => {
  toast.message = message
  toast.type = type
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.message = '' }, 2800)
}

const typeLabel = (type) => ({
  text: 'متن',
  html: 'HTML',
  image_path: 'تصویر',
  json: 'JSON',
  number: 'عدد',
  boolean: 'بولین',
}[type] || type)

const typeBadgeClass = (type) => ({
  text: 'bg-[#67A9A8]/15 text-[#2C7379]',
  html: 'bg-purple-50 text-purple-500',
  image_path: 'bg-amber-50 text-amber-600',
  json: 'bg-blue-50 text-blue-500',
  number: 'bg-gray-100 text-gray-500',
  boolean: 'bg-pink-50 text-pink-500',
}[type] || 'bg-gray-100 text-gray-500')

const normalizeIncoming = (raw) => {
  // json values often come back as objects/arrays; keep them editable as text
  let value = raw.value
  if (raw.type === 'json' && typeof value !== 'string') {
    try { value = JSON.stringify(value, null, 2) } catch { value = String(value) }
  }
  if (raw.type === 'boolean' && typeof value === 'string') {
    value = value === 'true' || value === '1'
  }
  return { ...raw, value, _saving: false }
}

const fetchItems = async (page) => {
  isLoading.value = true
  try {
    // GET is a public, read-only endpoint per the docs — no auth header here.
    // Sending Authorization would trigger a CORS preflight (OPTIONS) that
    // this backend currently rejects with 405.
    const res = await $fetch(`${API_BASE}/page/${page}`)
    // Backend wraps the array in { data: [...] } rather than returning it directly.
    const list = Array.isArray(res) ? res : (res?.data ?? [])
    items.value = list.map(normalizeIncoming)
  } catch (err) {
    showToast('خطا در دریافت محتوای این صفحه', 'error')
    items.value = []
  } finally {
    isLoading.value = false
  }
}

const selectPage = (slug) => {
  activePage.value = slug
}

const buildOutgoingValue = (item) => {
  if (item.type === 'json') {
    try {
      return JSON.parse(item.value)
    } catch {
      throw new Error('مقدار JSON نامعتبر است')
    }
  }
  return item.value
}

// Real write endpoint from the backend (Ali, 24 Tir):
// POST /api/page  body: { page, key, value, type }
// Upserts by (page, key) — creates if new, updates if that combo exists.
// Requires the admin bearer token. Response: { message, data: { id, key, value, type, page } }
const upsertPageItem = async ({ page, key, value, type }) => {
  const res = await $fetch(`${API_BASE}/admin/page`, {
    method: 'POST',
    headers: { ...authHeader() },
    body: { page, key, value, type },
  })
  return res?.data ?? null
}

const saveItem = async (item) => {
  item._saving = true
  try {
    const value = buildOutgoingValue(item)
    const saved = await upsertPageItem({ page: activePage.value, key: item.key, value, type: item.type })
    if (saved?.id) item.id = saved.id
    showToast(`«${item.key}» ذخیره شد`)
  } catch (err) {
    showToast(err?.data?.message || err?.message || 'ذخیره ناموفق بود', 'error')
  } finally {
    item._saving = false
  }
}

watch(activePage, (page) => fetchItems(page))

onMounted(() => {
  initFromStorage()
  fetchItems(activePage.value)
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>