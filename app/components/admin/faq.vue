<template>
  <div class="min-h-full w-full p-4 sm:p-6 lg:p-8" dir="rtl">
    <!-- هدر صفحه و دکمه افزودن -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 class="text-[20px] lg:text-[24px] font-bold text-[#0F184B] dark:text-dark-text">سوالات متداول</h1>
        <p class="text-[13px] text-gray-500 dark:text-dark-text mt-1">افزودن، ویرایش و حذف سوالات متداول سایت</p>
      </div>

      <button
        v-if="!isReadOnly"
        @click="openCreateModal"
        class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-3xl  bg-[#67A9A880] hover:bg-[#8FB0B2] dark:bg-dark-accent/60 dark:hover:bg-dark-accent-hover/60 border border-white dark:border-dark-border text-[#0F184B] dark:text-dark-text-deep font-bold text-[14px] shadow-md transition-all duration-300 hover:scale-[1.03] self-start sm:self-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        افزودن سوال جدید
      </button>
    </div>

    <!-- بنر اطلاع‌رسانی حالت فقط-نمایش -->
    <div
      v-if="isReadOnly"
      class="mb-5 px-4 py-3 rounded-2xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 font-bold text-[13px] text-center"
    >
      شما فقط دسترسی مشاهده دارید و امکان افزودن، ویرایش یا حذف سوالات وجود ندارد.
    </div>

    <!-- بنر خطا -->
    <transition name="fade">
      <div
        v-if="errorMessage"
        class="mb-5 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-[13px] flex items-center justify-between"
      >
        <span>{{ errorMessage }}</span>
        <button @click="errorMessage = ''" class="text-red-400 hover:text-red-600 text-lg leading-none">&times;</button>
      </div>
    </transition>

    <!-- حالت بارگذاری -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-24 gap-3">
      <div class="w-10 h-10 border-4 border-[#67A9A8] border-t-transparent rounded-full animate-spin"></div>
      <p class="text-[13px] text-gray-400 dark:text-dark-text">در حال بارگذاری سوالات...</p>
    </div>

    <!-- حالت خالی -->
    <div
      v-else-if="!faqs.length"
      class="flex flex-col items-center justify-center py-24 gap-3 bg-white dark:bg-dark-surface rounded-[24px] shadow-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 text-[#BFD1D5] dark:text-dark-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-[14px] text-gray-400 dark:text-dark-text">هنوز سوالی ثبت نشده است</p>
      <button
        v-if="!isReadOnly"
        @click="openCreateModal"
        class="mt-2 px-5 py-2 rounded-2xl bg-[#67A9A880] hover:bg-[#8FB0B2] dark:bg-dark-accent/60 dark:hover:bg-dark-accent-hover/60 border border-white dark:border-dark-border text-[#0F184B] dark:text-dark-text-deep font-bold text-[13px] transition-all duration-300"
      >
        افزودن اولین سوال
      </button>
    </div>

    <!-- لیست سوالات متداول -->
    <div v-else class="flex flex-col gap-3">
      <div
        v-for="item in sortedFaqs"
        :key="item.id"
        class="border-[2px] border-gray-300 dark:border-dark-border rounded-[20px] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
      >
        <button
          @click="toggleExpand(item.id)"
          class="w-full flex items-center justify-between gap-4 px-5 py-4 text-right"
        >
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <span
              class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold"
              :class="item.is_active ? 'bg-[#67A9A880] dark:bg-dark-accent/60 text-[#0F184B] dark:text-dark-text-deep' : 'bg-gray-100 dark:bg-dark-input text-gray-400 dark:text-dark-text-deep'"
            >
              {{ item.sort_order }}
            </span>
            <h3 class="font-bold text-[14px] lg:text-[15px] text-[#0F184B] dark:text-dark-text truncate">
              {{ item.question }}
            </h3>
            <span
              v-if="item.question_en"
              class="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-dark-input text-blue-500 dark:text-dark-text-deep font-medium font-roboto"
              title="دارای ترجمه انگلیسی"
            >
              EN
            </span>
            <span
              v-if="!item.is_active"
              class="shrink-0 text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-dark-input text-gray-400 dark:text-dark-text-deep font-medium"
            >
              غیرفعال
            </span>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <span
              v-if="!isReadOnly"
              @click.stop="openEditModal(item)"
              class="p-2 rounded-full hover:bg-[#ECEDF4] dark:hover:bg-dark-input text-[#454C6A] dark:text-dark-text transition-colors duration-200 cursor-pointer"
              title="ویرایش"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </span>
            <span
              v-if="!isReadOnly"
              @click.stop="openDeleteModal(item)"
              class="p-2 rounded-full hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
              title="حذف"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-[#454C6A] dark:text-dark-text transition-transform duration-300"
              :class="expandedId === item.id ? 'rotate-180' : ''"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        <transition name="expand">
          <div v-if="expandedId === item.id" class="px-5 pb-5 pt-0">
            <div class="border-t border-[#ECEDF4] dark:border-dark-border pt-4 flex flex-col gap-3">
              <div>
                <p class="text-[11px] text-gray-400 dark:text-dark-text mb-1 font-bold">فارسی</p>
                <p class="text-[13px] lg:text-[14px] text-gray-600 dark:text-dark-text leading-7 whitespace-pre-line">{{ item.answer }}</p>
              </div>
              <div v-if="item.question_en || item.answer_en" dir="ltr" class="text-left">
                <p class="text-[11px] text-gray-400 dark:text-dark-text mb-1 font-bold">English</p>
                <p class="text-[13px] lg:text-[14px] font-bold text-[#0F184B] dark:text-dark-text mb-1">{{ item.question_en }}</p>
                <p class="text-[13px] lg:text-[14px] text-gray-600 dark:text-dark-text leading-7 whitespace-pre-line font-roboto">{{ item.answer_en }}</p>
              </div>
              <p class="text-[11px] text-gray-600 dark:text-dark-text font-roboto">{{ formatDate(item.created_at) }}</p>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- مودال افزودن/ویرایش سوال -->
    <transition name="fade">
      <div
        v-if="isFormModalOpen && !isReadOnly"
        class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        @click.self="closeFormModal"
      >
        <div class="bg-white dark:bg-dark-surface w-full max-w-[520px] rounded-[24px] shadow-2xl p-6 lg:p-7 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-[17px] font-bold text-[#0F184B] dark:text-dark-text">
              {{ isEditing ? 'ویرایش سوال متداول' : 'افزودن سوال متداول' }}
            </h2>
            <button @click="closeFormModal" class="text-gray-400 dark:text-dark-text hover:text-gray-600 dark:hover:text-dark-text-deep p-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitForm" class="flex flex-col gap-4">
            <!-- فیلدهای فارسی -->
            <div>
              <label class="block text-[13px] font-bold text-[#0F184B] dark:text-dark-text mb-2">سوال</label>
              <input
                v-model="form.question"
                type="text"
                required
                placeholder="متن سوال را وارد کنید"
                class="w-full px-4 py-2.5 rounded-2xl border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-[#67A9A8] transition-all duration-200 bg-white/20"
              />
            </div>

            <div>
              <label class="block text-[13px] font-bold text-[#0F184B] dark:text-dark-text mb-2">پاسخ</label>
              <textarea
                v-model="form.answer"
                required
                rows="5"
                placeholder="متن پاسخ را وارد کنید"
                class="w-full px-4 py-2.5 rounded-2xl border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-[#67A9A8] transition-all duration-200 resize-none bg-white/20"
              ></textarea>
            </div>

            <!-- جداکننده -->
            <div class="flex items-center gap-3 my-1">
              <span class="flex-1 h-px bg-[#ECEDF4] dark:bg-dark-border"></span>
              <span class="text-[11px] text-gray-400 dark:text-dark-text font-roboto font-bold">ENGLISH</span>
              <span class="flex-1 h-px bg-[#ECEDF4] dark:bg-dark-border"></span>
            </div>

            <!-- فیلدهای انگلیسی -->
            <div>
              <label class="block text-[13px] font-bold text-[#0F184B] dark:text-dark-text mb-2">سوال (English)</label>
              <input
                v-model="form.question_en"
                type="text"
                dir="ltr"
                placeholder="Question in English"
                class="w-full px-4 py-2.5 rounded-2xl border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-[#67A9A8] transition-all duration-200 bg-white/20 font-roboto text-left"
              />
            </div>

            <div>
              <label class="block text-[13px] font-bold text-[#0F184B] dark:text-dark-text mb-2">پاسخ (English)</label>
              <textarea
                v-model="form.answer_en"
                rows="5"
                dir="ltr"
                placeholder="Answer in English"
                class="w-full px-4 py-2.5 rounded-2xl border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-[#67A9A8] transition-all duration-200 resize-none bg-white/20 font-roboto text-left"
              ></textarea>
            </div>

            <div class="flex items-center gap-4">
              <div class="flex-1">
                <label class="block text-[13px] font-bold text-[#0F184B] dark:text-dark-text mb-2">ترتیب نمایش</label>
                <input
                  v-model.number="form.sort_order"
                  type="number"
                  min="0"
                  class="w-full px-4 py-2.5 rounded-2xl border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-[#67A9A8] transition-all duration-200 bg-white/20"
                />
              </div>

              <div class="flex-1 flex items-center justify-between px-4 py-2.5 rounded-2xl border border-[#BFD1D5] dark:border-dark-border mt-[26px]">
                <span class="text-[13px] font-bold text-[#0F184B] dark:text-dark-text">فعال</span>
                <button
                  type="button"
                  @click="form.is_active = !form.is_active"
                  class="w-11 h-6 rounded-full transition-colors duration-300 relative shrink-0"
                  :class="form.is_active ? 'bg-[#67A9A8] dark:bg-dark-accent' : 'bg-gray-300 dark:bg-dark-input'"
                >
                  <span
                    class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
                    :class="form.is_active ? 'right-0.5' : 'right-[22px]'"
                  ></span>
                </button>
              </div>
            </div>

            <p v-if="formError" class="text-[12px] text-red-500">{{ formError }}</p>

            <div class="flex items-center gap-3 mt-2">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex-1 py-2.5 rounded-br-2xl rounded-tl-2xl bg-[#67A9A880] hover:bg-[#8FB0B2] dark:bg-dark-accent/60 dark:hover:bg-dark-accent-hover/60 border border-white dark:border-dark-border text-[#0F184B] dark:text-dark-text-deep font-bold text-[14px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isSubmitting ? 'در حال ذخیره...' : (isEditing ? 'ذخیره تغییرات' : 'افزودن سوال') }}
              </button>
              <button
                type="button"
                @click="closeFormModal"
                class="px-6 py-2.5 rounded-2xl border border-[#BFD1D5] dark:border-dark-border text-[#454C6A] dark:text-dark-text font-bold text-[14px] hover:bg-[#ECEDF4] dark:hover:bg-dark-input/20 transition-all duration-300"
              >
                انصراف
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- مودال تایید حذف -->
    <transition name="fade">
      <div
        v-if="isDeleteModalOpen && !isReadOnly"
        class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        @click.self="closeDeleteModal"
      >
        <div class="bg-white dark:bg-dark-surface w-full max-w-[400px] rounded-[24px] shadow-2xl p-6 text-center">
          <div class="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 class="text-[15px] font-bold text-[#0F184B] dark:text-dark-text mb-2">حذف سوال متداول</h3>
          <p class="text-[13px] text-gray-500 dark:text-dark-text mb-6">
            آیا از حذف «{{ deleteTarget?.question }}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.
          </p>
          <div class="flex items-center gap-3">
            <button
              @click="confirmDelete"
              :disabled="isSubmitting"
              class="flex-1 py-2.5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-[14px] transition-all duration-300 disabled:opacity-50"
            >
              {{ isSubmitting ? 'در حال حذف...' : 'بله، حذف شود' }}
            </button>
            <button
              @click="closeDeleteModal"
              class="flex-1 py-2.5 rounded-2xl border border-[#BFD1D5] dark:border-dark-border text-[#454C6A] dark:text-dark-text font-bold text-[14px] hover:bg-[#ECEDF4] dark:hover:bg-dark-input/20 transition-all duration-300"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminAuth } from '@/composables/useAdminAuth'
import { useAdminPermissions } from '@/composables/useAdminPermissions'

// احراز هویت و دسترسی ادمین
const { authHeader, initFromStorage } = useAdminAuth()
const { isReadOnly } = useAdminPermissions()

const API_BASE = 'https://nadertechnologyteam.ir/api/admin/faqs'

const faqs = ref([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')
const formError = ref('')
const expandedId = ref(null)

const isFormModalOpen = ref(false)
const isEditing = ref(false)
const editingId = ref(null)

const isDeleteModalOpen = ref(false)
const deleteTarget = ref(null)

// مقدار اولیه خالی فرم سوال متداول
const emptyForm = () => ({
  question: '',
  question_en: '',
  answer: '',
  answer_en: '',
  sort_order: 0,
  is_active: true
})
const form = ref(emptyForm())

// لیست سوالات مرتب‌شده بر اساس ترتیب نمایش
const sortedFaqs = computed(() =>
  [...faqs.value].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
)

// ساخت هدرهای مشترک درخواست‌ها
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  ...authHeader()
})

// دریافت لیست سوالات متداول از سرور
const fetchFaqs = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const res = await fetch(API_BASE, { headers: authHeaders() })
    if (!res.ok) throw new Error('خطا در دریافت لیست سوالات متداول')
    const json = await res.json()
    faqs.value = json.data || []
  } catch (err) {
    errorMessage.value = err.message || 'خطا در دریافت لیست سوالات متداول'
  } finally {
    isLoading.value = false
  }
}

// باز و بسته کردن آکاردئون یک سوال
const toggleExpand = (id) => {
  expandedId.value = expandedId.value === id ? null : id
}

// باز کردن مودال با فرم خالی برای افزودن سوال جدید
const openCreateModal = () => {
  if (isReadOnly.value) return
  isEditing.value = false
  editingId.value = null
  form.value = emptyForm()
  form.value.sort_order = faqs.value.length
    ? Math.max(...faqs.value.map((f) => f.sort_order || 0)) + 1
    : 1
  formError.value = ''
  isFormModalOpen.value = true
}

// باز کردن مودال با داده‌های یک سوال برای ویرایش
const openEditModal = (item) => {
  if (isReadOnly.value) return
  isEditing.value = true
  editingId.value = item.id
  form.value = {
    question: item.question,
    question_en: item.question_en || '',
    answer: item.answer,
    answer_en: item.answer_en || '',
    sort_order: item.sort_order,
    is_active: !!item.is_active
  }
  formError.value = ''
  isFormModalOpen.value = true
}

// بستن مودال فرم
const closeFormModal = () => {
  if (isSubmitting.value) return
  isFormModalOpen.value = false
}

// ارسال فرم برای ایجاد یا ویرایش سوال
const submitForm = async () => {
  if (isReadOnly.value) return

  formError.value = ''
  isSubmitting.value = true
  try {
    const url = isEditing.value ? `${API_BASE}/${editingId.value}` : API_BASE
    const method = isEditing.value ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: authHeaders(),
      body: JSON.stringify(form.value)
    })

    const json = await res.json().catch(() => ({}))

    if (!res.ok) {
      throw new Error(json.message || 'خطا در ذخیره سوال متداول')
    }

    await fetchFaqs()
    isFormModalOpen.value = false
  } catch (err) {
    formError.value = err.message || 'خطا در ذخیره سوال متداول'
  } finally {
    isSubmitting.value = false
  }
}

// باز کردن مودال تایید حذف
const openDeleteModal = (item) => {
  if (isReadOnly.value) return
  deleteTarget.value = item
  isDeleteModalOpen.value = true
}

// بستن مودال تایید حذف
const closeDeleteModal = () => {
  if (isSubmitting.value) return
  isDeleteModalOpen.value = false
  deleteTarget.value = null
}

// حذف قطعی سوال پس از تایید کاربر
const confirmDelete = async () => {
  if (isReadOnly.value) return
  if (!deleteTarget.value) return
  isSubmitting.value = true
  errorMessage.value = ''
  try {
    const res = await fetch(`${API_BASE}/${deleteTarget.value.id}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(json.message || 'خطا در حذف سوال متداول')

    faqs.value = faqs.value.filter((f) => f.id !== deleteTarget.value.id)
    isDeleteModalOpen.value = false
    deleteTarget.value = null
  } catch (err) {
    errorMessage.value = err.message || 'خطا در حذف سوال متداول'
  } finally {
    isSubmitting.value = false
  }
}

// فرمت‌دهی تاریخ برای نمایش
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateStr))
  } catch {
    return dateStr
  }
}

// بارگذاری اولیه احراز هویت و لیست سوالات
onMounted(() => {
  initFromStorage()
  fetchFaqs()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>