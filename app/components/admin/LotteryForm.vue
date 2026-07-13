<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'created'])

const { createLottery } = useLotteryApi()

const form = ref({
  title: '',
  description: '',
  starts_at: '',
  ends_at: '',
  capacity: null,
  winner_count: 1,
  status: 'draft',
})

const statusOptions = [
  { value: 'draft', label: 'پیش‌نویس' },
  { value: 'active', label: 'فعال' },
  { value: 'inactive', label: 'غیرفعال' },
]

const submitting = ref(false)
const errorMsg = ref('')
const fieldErrors = ref({})

// ورودی <input type="datetime-local"> مقداری مثل 2026-06-08T10:00 می‌دهد؛
// برای سازگاری با سرور یک رشته‌ی ثانیه‌دار می‌سازیم.
const toApiDateTime = (value) => (value ? `${value}:00` : null)

const submit = async () => {
  if (!form.value.title || !form.value.starts_at || !form.value.ends_at) {
    errorMsg.value = 'عنوان، تاریخ شروع و تاریخ پایان الزامی هستند.'
    return
  }

  submitting.value = true
  errorMsg.value = ''
  fieldErrors.value = {}

  const payload = {
    title: form.value.title,
    description: form.value.description || undefined,
    starts_at: toApiDateTime(form.value.starts_at),
    ends_at: toApiDateTime(form.value.ends_at),
    capacity: form.value.capacity ? Number(form.value.capacity) : undefined,
    winner_count: Number(form.value.winner_count) || 1,
    status: form.value.status,
  }

  try {
    const res = await createLottery(payload)
    emit('created', res.data)
  } catch (err) {
    if (err?.status === 422 || err?.response?.status === 422) {
      fieldErrors.value = err?.data?.errors || {}
      errorMsg.value = err?.data?.message || 'اطلاعات وارد شده معتبر نیست.'
    } else {
      errorMsg.value = err?.data?.message || 'خطا در ایجاد قرعه‌کشی. لطفاً دوباره تلاش کنید.'
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" dir="rtl" @click.self="emit('close')">
    <div class="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 class="font-bold text-[#1a2333]">افزودن قرعه‌کشی جدید</h3>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
      </div>

      <form @submit.prevent="submit" class="p-5 flex flex-col gap-4">
        <p v-if="errorMsg" class="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2">{{ errorMsg }}</p>

        <div>
          <label class="block text-xs font-bold text-gray-500 mb-1">عنوان *</label>
          <input
            v-model="form.title"
            type="text"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463]"
            placeholder="مثلاً قرعه‌کشی تابستان"
          />
          <p v-if="fieldErrors.title" class="text-red-500 text-xs mt-1">{{ fieldErrors.title[0] }}</p>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-500 mb-1">توضیحات</label>
          <textarea
            v-model="form.description"
            rows="2"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463]"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-500 mb-1">تاریخ و ساعت شروع *</label>
            <input
              v-model="form.starts_at"
              type="datetime-local"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463]"
              dir="ltr"
            />
            <p v-if="fieldErrors.starts_at" class="text-red-500 text-xs mt-1">{{ fieldErrors.starts_at[0] }}</p>
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-500 mb-1">تاریخ و ساعت پایان *</label>
            <input
              v-model="form.ends_at"
              type="datetime-local"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463]"
              dir="ltr"
            />
            <p v-if="fieldErrors.ends_at" class="text-red-500 text-xs mt-1">{{ fieldErrors.ends_at[0] }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-500 mb-1">ظرفیت (اختیاری)</label>
            <input
              v-model="form.capacity"
              type="number"
              min="1"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463]"
              dir="ltr"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-500 mb-1">تعداد برندگان *</label>
            <input
              v-model="form.winner_count"
              type="number"
              min="1"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463]"
              dir="ltr"
            />
            <p v-if="fieldErrors.winner_count" class="text-red-500 text-xs mt-1">{{ fieldErrors.winner_count[0] }}</p>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-500 mb-1">وضعیت</label>
          <select
            v-model="form.status"
            class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#286463]"
          >
            <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>

        <div class="flex gap-3 mt-2">
          <button
            type="submit"
            :disabled="submitting"
            class="flex-1 bg-[#286463] text-white py-2.5 rounded-xl font-bold hover:bg-[#1e4a49] transition disabled:opacity-60"
          >
            {{ submitting ? 'در حال ثبت...' : 'ثبت قرعه‌کشی' }}
          </button>
          <button
            type="button"
            @click="emit('close')"
            class="px-5 py-2.5 rounded-xl font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
