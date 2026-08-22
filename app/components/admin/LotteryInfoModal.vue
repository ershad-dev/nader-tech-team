<script setup>
import { ref, reactive, watch } from 'vue'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useAdminPermissions } from '~/composables/useAdminPermissions'

const API_BASE = 'https://nadertechnologyteam.ir/api'
const { authHeader } = useAdminAuth()
const { isReadOnly } = useAdminPermissions()

const props = defineProps({
  show: { type: Boolean, default: false },
  lotteryId: { type: [Number, String], required: true },
})

const emit = defineEmits(['close', 'updated'])

const loading = ref(false)
const saving = ref(false)
const isEditing = ref(false)

// خطای بارگذاری اولیه (fetchDetails) -> کل مودال را جایگزین می‌کند
const loadError = ref('')
// خطای فرم / ذخیره‌سازی (save) -> فقط بالای فرم نمایش داده می‌شود، فرم را حذف نمی‌کند
const formError = ref('')

const lottery = ref(null) // داده‌ی اصلی (فقط نمایش)
const form = reactive({
  title: '',
  title_en: '',
  description: '',
  description_en: '',
  starts_at: '',
  ends_at: '',
  capacity: 0,
  price: 0,
  winner_count: 1,
  status: 'draft',
  location: '',
  location_en: '',
})

const statusOptions = [
  { value: 'draft', label: 'پیش‌نویس' },
  { value: 'active', label: 'فعال' },
  { value: 'inactive', label: 'غیرفعال' },
  { value: 'drawn', label: 'قرعه‌کشی‌شده' },
]

const statusLabel = (value) =>
  statusOptions.find((s) => s.value === value)?.label || value || '—'

const toLocalInput = (isoStr) => {
  if (!isoStr) return ''
  // به جای slice(0,16) که برای datetime-local بود
  return isoStr.replace('T', ' ').slice(0, 19)
}

const formatDate = (isoStr) => {
  if (!isoStr) return '—'
  try {
    return new Date(isoStr).toLocaleString('fa-IR')
  } catch {
    return isoStr
  }
}

const fillForm = (data) => {
  form.title = data.title || ''
  form.title_en = data.title_en || ''
  form.description = data.description || ''
  form.description_en = data.description_en || ''
  form.starts_at = toLocalInput(data.starts_at)
  form.ends_at = toLocalInput(data.ends_at)
  form.capacity = data.capacity ?? 0
  form.price = data.price ?? 0
  form.winner_count = data.winner_count ?? 1
  form.status = data.status || 'draft'
  form.location = data.location || ''
  form.location_en = data.location_en || ''
}

const fetchDetails = async () => {
  loading.value = true
  loadError.value = ''
  formError.value = ''
  isEditing.value = false

  try {
    const res = await $fetch(`${API_BASE}/admin/lotteries/${props.lotteryId}`, {
      method: 'GET',
      headers: authHeader(),
    })
    lottery.value = res.data
    fillForm(res.data)
  } catch (err) {
    console.error(err)
    if (err?.response?.status === 401) loadError.value = 'احراز هویت نشده است.'
    else if (err?.response?.status === 403) loadError.value = 'دسترسی مجاز نیست.'
    else if (err?.response?.status === 404) loadError.value = 'قرعه‌کشی یافت نشد.'
    else loadError.value = 'خطا در دریافت اطلاعات.'
  } finally {
    loading.value = false
  }
}

const startEdit = () => {
  // گارد read-only: یوزر مشاهده‌فقط اجازه‌ی ورود به حالت ویرایش را ندارد
  if (isReadOnly.value) return
  if (lottery.value) fillForm(lottery.value)
  formError.value = ''
  isEditing.value = true
}

const cancelEdit = () => {
  if (lottery.value) fillForm(lottery.value)
  formError.value = ''
  isEditing.value = false
}

const save = async () => {
  // گارد read-only: حتی اگر با دستکاری DevTools این تابع مستقیم صدا زده بشه، اینجا متوقف می‌شود
  if (isReadOnly.value) return

  formError.value = ''

  if (!form.title.trim()) {
    formError.value = 'عنوان الزامی است.'
    return
  }
  if (!form.location.trim()) {
    formError.value = 'مکان برگزاری الزامی است.'
    return
  }

  saving.value = true
  try {
    const res = await $fetch(`${API_BASE}/admin/lotteries/${props.lotteryId}`, {
      method: 'PUT',
      headers: authHeader(),
      body: {
        title: form.title,
        title_en: form.title_en,
        description: form.description,
        description_en: form.description_en,
        starts_at: form.starts_at,
        ends_at: form.ends_at,
        capacity: Number(form.capacity),
        update: Number(form.price), // نکته: بک‌اند این فیلد رو به اسم "update" می‌خواد نه "price"
        winner_count: Number(form.winner_count),
        status: form.status,
        location: form.location,
        location_en: form.location_en,
      },
    })
    lottery.value = res.data
    fillForm(res.data)
    isEditing.value = false
    emit('updated', res.data)
  } catch (err) {
    console.error(err)
    if (err?.response?.status === 422) {
      formError.value = 'اطلاعات وارد شده نامعتبر است.'
    } else if (err?.response?.status === 401) {
      formError.value = 'احراز هویت نشده است.'
    } else if (err?.response?.status === 403) {
      formError.value = 'دسترسی مجاز نیست.'
    } else {
      formError.value = 'خطا در ذخیره‌سازی اطلاعات.'
    }
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  if (saving.value) return
  isEditing.value = false
  formError.value = ''
  emit('close')
}

watch(
  () => props.show,
  (val) => {
    if (val) fetchDetails()
  }
)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      dir="rtl"
      @click.self="closeModal"
    >
      <div class="bg-white dark:bg-dark-surface w-full max-w-lg rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <!-- هدر -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-dark-border sticky top-0 bg-white dark:bg-dark-surface rounded-t-2xl">
          <h2 class="font-bold text-[#1a2333] dark:text-white text-base sm:text-lg">جزئیات قرعه‌کشی</h2>

          <div class="flex items-center gap-2">
            <template v-if="!loading && !loadError">
              <button
                v-if="!isEditing"
                @click="startEdit"
                :disabled="isReadOnly"
                :title="isReadOnly ? 'شما دسترسی مشاهده‌فقط دارید' : ''"
                class="text-sm font-bold text-[#286463] dark:text-dark-accent border border-[#286463] dark:border-dark-accent rounded-lg px-3 py-1.5 hover:bg-[#286463]/10 dark:hover:bg-dark-accent/10 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                ویرایش
              </button>
              <template v-else>
                <button
                  @click="save"
                  :disabled="saving"
                  class="text-sm font-bold text-white bg-[#286463] dark:bg-dark-accent rounded-lg px-3 py-1.5 hover:bg-[#1e4a49] dark:hover:bg-dark-accent-hover transition cursor-pointer disabled:opacity-60"
                >
                  {{ saving ? 'در حال ذخیره...' : 'ذخیره' }}
                </button>
                <button
                  @click="cancelEdit"
                  :disabled="saving"
                  class="text-sm font-bold text-gray-500 dark:text-white/70 border border-gray-300 dark:border-dark-border rounded-lg px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-dark-input/40 transition cursor-pointer disabled:opacity-60"
                >
                  انصراف
                </button>
              </template>
            </template>

            <button
              @click="closeModal"
              class="text-gray-400 dark:text-white/60 hover:text-gray-600 dark:hover:text-white text-xl leading-none cursor-pointer px-1"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- بدنه -->
        <div class="p-5">
          <div v-if="loading" class="text-center py-10 text-gray-500 dark:text-white/70">در حال بارگذاری...</div>
          <div v-else-if="loadError" class="text-center py-10 text-red-500 dark:text-red-400 font-bold">{{ loadError }}</div>

          <div v-else class="flex flex-col gap-4">
            <!-- بنر هشدار read-only -->
            <div
              v-if="isReadOnly"
              class="text-sm text-amber-700 dark:text-amber-300 font-bold bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg px-3 py-2"
            >
              شما دسترسی مشاهده‌فقط دارید و نمی‌توانید این قرعه‌کشی را ویرایش کنید.
            </div>

            <!-- خطای فرم / ذخیره‌سازی: فقط بالای فرم نشون داده میشه، فرم حذف نمیشه -->
            <div
              v-if="formError"
              class="text-sm text-red-600 dark:text-red-400 font-bold bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg px-3 py-2"
            >
              {{ formError }}
            </div>

            <!-- عنوان (فارسی) -->
            <div>
              <label class="block text-xs font-bold text-gray-500 dark:text-white/70 mb-1">عنوان (فارسی)</label>
              <input
                v-if="isEditing"
                v-model="form.title"
                type="text"
                class="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-input dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463] dark:focus:border-dark-accent"
              />
              <p v-else class="text-sm text-[#1a2333] dark:text-white font-bold">{{ lottery?.title || '—' }}</p>
            </div>

            <!-- عنوان (انگلیسی) -->
            <div>
              <label class="block text-xs font-bold text-gray-500 dark:text-white/70 mb-1">عنوان (انگلیسی)</label>
              <input
                v-if="isEditing"
                v-model="form.title_en"
                type="text"
                dir="ltr"
                class="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-input dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463] dark:focus:border-dark-accent"
              />
              <p v-else dir="ltr" class="text-sm text-[#1a2333] dark:text-white font-bold text-left">{{ lottery?.title_en || '—' }}</p>
            </div>

            <!-- توضیحات (فارسی) -->
            <div>
              <label class="block text-xs font-bold text-gray-500 dark:text-white/70 mb-1">توضیحات (فارسی)</label>
              <textarea
                v-if="isEditing"
                v-model="form.description"
                rows="3"
                class="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-input dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463] dark:focus:border-dark-accent resize-none"
              ></textarea>
              <p v-else class="text-sm text-gray-700 dark:text-white whitespace-pre-line">{{ lottery?.description || '—' }}</p>
            </div>

            <!-- توضیحات (انگلیسی) -->
            <div>
              <label class="block text-xs font-bold text-gray-500 dark:text-white/70 mb-1">توضیحات (انگلیسی)</label>
              <textarea
                v-if="isEditing"
                v-model="form.description_en"
                rows="3"
                dir="ltr"
                class="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-input dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463] dark:focus:border-dark-accent resize-none"
              ></textarea>
              <p v-else dir="ltr" class="text-sm text-gray-700 dark:text-white whitespace-pre-line text-left">{{ lottery?.description_en || '—' }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- تاریخ شروع -->
              <div>
                <label class="block text-xs font-bold text-gray-500 dark:text-white/70 mb-1">تاریخ شروع</label>
                <custom-date-picker
                  v-if="isEditing"
                  v-model="form.starts_at"
                  type="datetime"
                  input-class="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-input dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463] dark:focus:border-dark-accent"
                />
                <p v-else class="text-sm text-gray-700 dark:text-white">{{ formatDate(lottery?.starts_at) }}</p>
              </div>

              <!-- تاریخ پایان -->
              <div>
                <label class="block text-xs font-bold text-gray-500 dark:text-white/70 mb-1">تاریخ پایان</label>
                <custom-date-picker
                  v-if="isEditing"
                  v-model="form.ends_at"
                  type="datetime"
                  input-class="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-input dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463] dark:focus:border-dark-accent"
                />
                <p v-else class="text-sm text-gray-700 dark:text-white">{{ formatDate(lottery?.ends_at) }}</p>
              </div>

              <!-- ظرفیت -->
              <div>
                <label class="block text-xs font-bold text-gray-500 dark:text-white/70 mb-1">ظرفیت</label>
                <input
                  v-if="isEditing"
                  v-model.number="form.capacity"
                  type="number"
                  min="0"
                  class="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-input dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463] dark:focus:border-dark-accent"
                />
                <p v-else class="text-sm text-gray-700 dark:text-white">{{ lottery?.capacity ?? '—' }}</p>
              </div>

              <!-- قیمت -->
              <div>
                <label class="block text-xs font-bold text-gray-500 dark:text-white/70 mb-1">قیمت (تومان)</label>
                <input
                  v-if="isEditing"
                  v-model.number="form.price"
                  type="number"
                  min="0"
                  class="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-input dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463] dark:focus:border-dark-accent"
                />
                <p v-else class="text-sm text-gray-700 dark:text-white">{{ lottery?.price?.toLocaleString('fa-IR') ?? '—' }}</p>
              </div>

              <!-- مکان برگزاری (فارسی) -->
              <div>
                <label class="block text-xs font-bold text-gray-500 dark:text-white/70 mb-1">مکان برگزاری (فارسی)</label>
                <input
                  v-if="isEditing"
                  v-model="form.location"
                  type="text"
                  class="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-input dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463] dark:focus:border-dark-accent"
                />
                <p v-else class="text-sm text-gray-700 dark:text-white">{{ lottery?.location || '—' }}</p>
              </div>

              <!-- مکان برگزاری (انگلیسی) -->
              <div>
                <label class="block text-xs font-bold text-gray-500 dark:text-white/70 mb-1">مکان برگزاری (انگلیسی)</label>
                <input
                  v-if="isEditing"
                  v-model="form.location_en"
                  type="text"
                  dir="ltr"
                  class="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-input dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463] dark:focus:border-dark-accent"
                />
                <p v-else dir="ltr" class="text-sm text-gray-700 dark:text-white text-left">{{ lottery?.location_en || '—' }}</p>
              </div>

              <!-- تعداد برندگان -->
              <div>
                <label class="block text-xs font-bold text-gray-500 dark:text-white/70 mb-1">تعداد برندگان</label>
                <input
                  v-if="isEditing"
                  v-model.number="form.winner_count"
                  type="number"
                  min="1"
                  class="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-input dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463] dark:focus:border-dark-accent"
                />
                <p v-else class="text-sm text-gray-700 dark:text-white">{{ lottery?.winner_count ?? '—' }}</p>
              </div>

              <!-- وضعیت -->
              <div>
                <label class="block text-xs font-bold text-gray-500 dark:text-white/70 mb-1">وضعیت</label>
                <select
                  v-if="isEditing"
                  v-model="form.status"
                  class="w-full border border-gray-300 dark:border-dark-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463] dark:focus:border-dark-accent bg-white dark:bg-dark-input dark:text-white"
                >
                  <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
                <p v-else class="text-sm text-gray-700 dark:text-white">{{ statusLabel(lottery?.status) }}</p>
              </div>
            </div>

            <!-- زمان قرعه‌کشی (فقط نمایش) -->
            <div v-if="lottery?.drawn_at">
              <label class="block text-xs font-bold text-gray-500 dark:text-white/70 mb-1">زمان انجام قرعه‌کشی</label>
              <p class="text-sm text-gray-700 dark:text-white">{{ formatDate(lottery.drawn_at) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>