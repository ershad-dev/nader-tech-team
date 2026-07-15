<template>
  <div class="w-full h-full flex flex-col" dir="rtl">
    <!-- Header -->
    <div class="px-5 pt-6 pb-4 lg:px-8 lg:pt-8">
      <h1 class="text-[#0F184B] font-bold text-[19px] lg:text-[22px]">
        مدیریت محتوای صفحات
      </h1>
      <p class="text-[#454C6A]/70 text-[12px] lg:text-[13px] mt-1">
        ویرایش، افزودن و حذف محتوای کلید-مقدار صفحات سایت
      </p>
    </div>

    <!-- Page tabs -->
    <div class="px-5 lg:px-8 flex items-center gap-2 flex-wrap">
      <button
        v-for="p in pages"
        :key="p.slug"
        @click="selectPage(p.slug)"
        class="px-4 py-2 rounded-tl-2xl rounded-br-2xl text-[13px] font-bold border transition-all duration-300"
        :class="activePage === p.slug
          ? 'bg-[#67A9A8] text-white border-[#67A9A8] shadow-md'
          : 'bg-white text-[#454C6A] border-[#BFD1D5] hover:bg-[#ECEDF4]'"
      >
        {{ p.label }}
      </button>

      <!-- Add custom page -->
      <div class="flex items-center gap-1">
        <input
          v-model="customPageInput"
          @keyup.enter="addCustomPage"
          type="text"
          placeholder="نام صفحه دیگر (انگلیسی)"
          class="w-[150px] px-3 py-2 rounded-lg border border-[#BFD1D5] text-[12px] focus:outline-none focus:border-[#67A9A8]"
        />
        <button
          @click="addCustomPage"
          class="px-3 py-2 rounded-lg bg-[#0F184B] text-white text-[12px] font-bold hover:bg-[#0F184B]/90 transition"
        >
          +
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
          class="bg-white rounded-2xl border border-[#BFD1D5]/70 p-4 lg:p-5 shadow-sm"
        >
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-bold text-[#0F184B] text-[14px] font-roboto">{{ item.key }}</span>
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
                class="px-3 py-1.5 rounded-lg bg-[#67A9A8] text-white text-[12px] font-bold hover:bg-[#2C7379] transition disabled:opacity-50"
              >
                {{ item._saving ? '...' : 'ذخیره' }}
              </button>
              <button
                @click="deleteItem(item)"
                class="px-3 py-1.5 rounded-lg bg-red-50 text-red-500 text-[12px] font-bold hover:bg-red-100 transition"
              >
                حذف
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

          <div v-else-if="item.type === 'image_path'" class="flex items-center gap-3">
            <img
              v-if="item.value"
              :src="item.value"
              alt=""
              class="w-16 h-16 rounded-lg object-cover border border-[#BFD1D5]"
              @error="$event.target.style.visibility='hidden'"
            />
            <input
              v-model="item.value"
              type="text"
              placeholder="لینک تصویر"
              class="flex-1 px-3 py-2 rounded-lg border border-[#BFD1D5] text-[12px] font-roboto focus:outline-none focus:border-[#67A9A8]"
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

      <!-- Add new item -->
      <div class="mt-6 bg-[#ECEDF4] rounded-2xl border border-dashed border-[#BFD1D5] p-4 lg:p-5">
        <h3 class="font-bold text-[#0F184B] text-[14px] mb-3">افزودن آیتم جدید</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            v-model="newItem.key"
            type="text"
            placeholder="key (انگلیسی، مثل title)"
            class="px-3 py-2 rounded-lg border border-[#BFD1D5] text-[13px] font-roboto focus:outline-none focus:border-[#67A9A8]"
          />
          <select
            v-model="newItem.type"
            class="px-3 py-2 rounded-lg border border-[#BFD1D5] text-[13px] focus:outline-none focus:border-[#67A9A8] bg-white"
          >
            <option value="text">متن ساده (text)</option>
            <option value="html">HTML</option>
            <option value="image_path">تصویر (image_path)</option>
            <option value="json">JSON</option>
            <option value="number">عدد (number)</option>
            <option value="boolean">بولین (boolean)</option>
          </select>
          <button
            @click="addItem"
            :disabled="isAdding"
            class="px-4 py-2 rounded-lg bg-[#0F184B] text-white text-[13px] font-bold hover:bg-[#0F184B]/90 transition disabled:opacity-50"
          >
            {{ isAdding ? 'در حال افزودن...' : 'افزودن' }}
          </button>
        </div>
        <input
          v-if="newItem.type !== 'boolean'"
          v-model="newItem.value"
          :type="newItem.type === 'number' ? 'number' : 'text'"
          placeholder="مقدار اولیه (اختیاری)"
          class="mt-3 w-full px-3 py-2 rounded-lg border border-[#BFD1D5] text-[13px] font-roboto focus:outline-none focus:border-[#67A9A8]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'

// ─────────────────────────────────────────────────────────────
// NOTE ON ENDPOINTS
// The Swagger doc you shared only documents the READ endpoints:
//   GET /api/page/{page}          -> list all items of a page
//   GET /api/page/{page}/{key}    -> get a single item
// It does not document create/update/delete endpoints, so this
// component assumes a conventional REST layout for the write
// operations (adjust API_BASE / the three functions below if your
// backend uses different paths or methods):
//   PUT    /api/page/{page}/{key}   body: { value, type }  -> update
//   POST   /api/page/{page}         body: { key, value, type } -> create
//   DELETE /api/page/{page}/{key}                          -> delete
// ─────────────────────────────────────────────────────────────

const API_BASE = 'https://nadertechnologyteam.ir/api'

const { authHeader, initFromStorage } = useAdminAuth()

const pages = ref([
  { slug: 'home', label: 'خانه' },
  { slug: 'about', label: 'درباره ما' },
  { slug: 'contact', label: 'تماس با ما' },
])
const customPageInput = ref('')
const activePage = ref('about')

const items = ref([])
const isLoading = ref(false)
const isAdding = ref(false)

const newItem = reactive({ key: '', type: 'text', value: '' })

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

const addCustomPage = () => {
  const slug = customPageInput.value.trim().toLowerCase().replace(/\s+/g, '_')
  if (!slug) return
  if (!pages.value.find(p => p.slug === slug)) {
    pages.value.push({ slug, label: slug })
  }
  activePage.value = slug
  customPageInput.value = ''
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

const saveItem = async (item) => {
  item._saving = true
  try {
    const value = buildOutgoingValue(item)
    await $fetch(`${API_BASE}/page/${activePage.value}/${item.key}`, {
      method: 'PUT',
      headers: { ...authHeader() },
      body: { value, type: item.type },
    })
    showToast(`«${item.key}» ذخیره شد`)
  } catch (err) {
    showToast(err?.message || 'ذخیره ناموفق بود', 'error')
  } finally {
    item._saving = false
  }
}

const deleteItem = async (item) => {
  if (!confirm(`آیتم «${item.key}» حذف شود؟`)) return
  try {
    await $fetch(`${API_BASE}/page/${activePage.value}/${item.key}`, {
      method: 'DELETE',
      headers: { ...authHeader() },
    })
    items.value = items.value.filter(i => i.key !== item.key)
    showToast(`«${item.key}» حذف شد`)
  } catch (err) {
    showToast('حذف ناموفق بود', 'error')
  }
}

const addItem = async () => {
  const key = newItem.key.trim()
  if (!key) {
    showToast('وارد کردن key الزامی است', 'error')
    return
  }
  isAdding.value = true
  try {
    let value = newItem.type === 'boolean' ? false : newItem.value
    if (newItem.type === 'json' && value) {
      try { value = JSON.parse(value) } catch { throw new Error('مقدار JSON نامعتبر است') }
    }
    await $fetch(`${API_BASE}/page/${activePage.value}`, {
      method: 'POST',
      headers: { ...authHeader() },
      body: { key, value, type: newItem.type, page: activePage.value },
    })
    showToast(`«${key}» اضافه شد`)
    newItem.key = ''
    newItem.value = ''
    await fetchItems(activePage.value)
  } catch (err) {
    showToast(err?.message || 'افزودن ناموفق بود', 'error')
  } finally {
    isAdding.value = false
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