<script setup>
import { ref, reactive, watch } from 'vue'
import { useAdminAuth } from '~/composables/useAdminAuth'

const API_BASE = 'https://nadertechnologyteam.ir/api'
const { authHeader } = useAdminAuth()

const props = defineProps({
  show: { type: Boolean, default: false },
  lotteryId: { type: [Number, String], required: true },
})

const emit = defineEmits(['close', 'updated'])

const loading = ref(false)
const saving = ref(false)
const errorMsg = ref('')
const isEditing = ref(false)

const lottery = ref(null) // داده‌ی اصلی (فقط نمایش)
const form = reactive({
  title: '',
  description: '',
  starts_at: '',
  ends_at: '',
  capacity: 0,
  price: 0,
  winner_count: 1,
  status: 'draft',
})

const statusOptions = [
  { value: 'draft', label: 'پیش‌نویس' },
  { value: 'active', label: 'فعال' },
  { value: 'inactive', label: 'غیرفعال' },
  { value: 'drawn', label: 'قرعه‌کشی‌شده' },
]

const statusLabel = (value) =>
  statusOptions.find((s) => s.value === value)?.label || value || '—'

// تبدیل تاریخ ISO به فرمت مناسب input[type=datetime-local]
const toLocalInput = (isoStr) => {
  if (!isoStr) return ''
  return isoStr.slice(0, 16)
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
  form.description = data.description || ''
  form.starts_at = toLocalInput(data.starts_at)
  form.ends_at = toLocalInput(data.ends_at)
  form.capacity = data.capacity ?? 0
  form.price = data.price ?? 0
  form.winner_count = data.winner_count ?? 1
  form.status = data.status || 'draft'
}

const fetchDetails = async () => {
  loading.value = true
  errorMsg.value = ''
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
    if (err?.response?.status === 401) errorMsg.value = 'احراز هویت نشده است.'
    else if (err?.response?.status === 403) errorMsg.value = 'دسترسی مجاز نیست.'
    else if (err?.response?.status === 404) errorMsg.value = 'قرعه‌کشی یافت نشد.'
    else errorMsg.value = 'خطا در دریافت اطلاعات.'
  } finally {
    loading.value = false
  }
}

const startEdit = () => {
  if (lottery.value) fillForm(lottery.value)
  isEditing.value = true
}

const cancelEdit = () => {
  if (lottery.value) fillForm(lottery.value)
  isEditing.value = false
}

const save = async () => {
  saving.value = true
  errorMsg.value = ''

  try {
    const res = await $fetch(`${API_BASE}/admin/lotteries/${props.lotteryId}`, {
      method: 'PUT',
      headers: authHeader(),
      body: {
        title: form.title,
        description: form.description,
        starts_at: form.starts_at,
        ends_at: form.ends_at,
        capacity: Number(form.capacity),
        update: Number(form.price), // نکته: بک‌اند این فیلد رو به اسم "update" می‌خواد نه "price"
        winner_count: Number(form.winner_count),
        status: form.status,
      },
    })
    lottery.value = res.data
    fillForm(res.data)
    isEditing.value = false
    emit('updated', res.data)
  } catch (err) {
    console.error(err)
    if (err?.response?.status === 422) {
      errorMsg.value = 'اطلاعات وارد شده نامعتبر است.'
    } else if (err?.response?.status === 401) {
      errorMsg.value = 'احراز هویت نشده است.'
    } else if (err?.response?.status === 403) {
      errorMsg.value = 'دسترسی مجاز نیست.'
    } else {
      errorMsg.value = 'خطا در ذخیره‌سازی اطلاعات.'
    }
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  if (saving.value) return
  isEditing.value = false
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
      <div class="bg-white w-full max-w-lg rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <!-- هدر -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
          <h2 class="font-bold text-[#1a2333] text-base sm:text-lg">جزئیات قرعه‌کشی</h2>

          <div class="flex items-center gap-2">
            <template v-if="!loading && !errorMsg">
              <button
                v-if="!isEditing"
                @click="startEdit"
                class="text-sm font-bold text-[#286463] border border-[#286463] rounded-lg px-3 py-1.5 hover:bg-[#286463]/10 transition cursor-pointer"
              >
                ویرایش
              </button>
              <template v-else>
                <button
                  @click="save"
                  :disabled="saving"
                  class="text-sm font-bold text-white bg-[#286463] rounded-lg px-3 py-1.5 hover:bg-[#1e4a49] transition cursor-pointer disabled:opacity-60"
                >
                  {{ saving ? 'در حال ذخیره...' : 'ذخیره' }}
                </button>
                <button
                  @click="cancelEdit"
                  :disabled="saving"
                  class="text-sm font-bold text-gray-500 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition cursor-pointer disabled:opacity-60"
                >
                  انصراف
                </button>
              </template>
            </template>

            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 text-xl leading-none cursor-pointer px-1"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- بدنه -->
        <div class="p-5">
          <div v-if="loading" class="text-center py-10 text-gray-500">در حال بارگذاری...</div>
          <div v-else-if="errorMsg" class="text-center py-10 text-red-500 font-bold">{{ errorMsg }}</div>

          <div v-else class="flex flex-col gap-4">
            <!-- عنوان -->
            <div>
              <label class="block text-xs font-bold text-gray-500 mb-1">عنوان</label>
              <input
                v-if="isEditing"
                v-model="form.title"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463]"
              />
              <p v-else class="text-sm text-[#1a2333] font-bold">{{ lottery?.title || '—' }}</p>
            </div>

            <!-- توضیحات -->
            <div>
              <label class="block text-xs font-bold text-gray-500 mb-1">توضیحات</label>
              <textarea
                v-if="isEditing"
                v-model="form.description"
                rows="3"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463] resize-none"
              ></textarea>
              <p v-else class="text-sm text-gray-700 whitespace-pre-line">{{ lottery?.description || '—' }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- تاریخ شروع -->
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1">تاریخ شروع</label>
                <input
                  v-if="isEditing"
                  v-model="form.starts_at"
                  type="datetime-local"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463]"
                />
                <p v-else class="text-sm text-gray-700">{{ formatDate(lottery?.starts_at) }}</p>
              </div>

              <!-- تاریخ پایان -->
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1">تاریخ پایان</label>
                <input
                  v-if="isEditing"
                  v-model="form.ends_at"
                  type="datetime-local"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463]"
                />
                <p v-else class="text-sm text-gray-700">{{ formatDate(lottery?.ends_at) }}</p>
              </div>

              <!-- ظرفیت -->
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1">ظرفیت</label>
                <input
                  v-if="isEditing"
                  v-model.number="form.capacity"
                  type="number"
                  min="0"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463]"
                />
                <p v-else class="text-sm text-gray-700">{{ lottery?.capacity ?? '—' }}</p>
              </div>

              <!-- قیمت -->
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1">قیمت (تومان)</label>
                <input
                  v-if="isEditing"
                  v-model.number="form.price"
                  type="number"
                  min="0"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463]"
                />
                <p v-else class="text-sm text-gray-700">{{ lottery?.price?.toLocaleString('fa-IR') ?? '—' }}</p>
              </div>

              <!-- تعداد برندگان -->
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1">تعداد برندگان</label>
                <input
                  v-if="isEditing"
                  v-model.number="form.winner_count"
                  type="number"
                  min="1"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463]"
                />
                <p v-else class="text-sm text-gray-700">{{ lottery?.winner_count ?? '—' }}</p>
              </div>

              <!-- وضعیت -->
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1">وضعیت</label>
                <select
                  v-if="isEditing"
                  v-model="form.status"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463] bg-white"
                >
                  <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
                <p v-else class="text-sm text-gray-700">{{ statusLabel(lottery?.status) }}</p>
              </div>
            </div>

            <!-- زمان قرعه‌کشی (فقط نمایش) -->
            <div v-if="lottery?.drawn_at">
              <label class="block text-xs font-bold text-gray-500 mb-1">زمان انجام قرعه‌کشی</label>
              <p class="text-sm text-gray-700">{{ formatDate(lottery.drawn_at) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
