<script setup>
import { ref, reactive } from 'vue'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useAdminPermissions } from '~/composables/useAdminPermissions'
import RichTextEditor from '~/components/RichTextEditor.vue'

// آدرس پایه API
const API_BASE = 'https://nadertechnologyteam.ir'

// احراز هویت ادمین
const { authHeader, initFromStorage } = useAdminAuth()
initFromStorage()

// دسترسی مشاهده‌فقط کاربر
const { isReadOnly } = useAdminPermissions()

// وضعیت نمایش (لیست یا فرم)
const activeView = ref('list') // 'list' | 'form'
const selectedItem = ref(null)

// وضعیت‌های بارگذاری و خطا
const isLoadingList = ref(false)
const isLoadingForm = ref(false)
const isSaving = ref(false)
const isDeleting = ref(false)
const errorMessage = ref('')

// داده‌های لیست و صفحه‌بندی
const resumeItems = ref([])
const currentPage = ref(1)
const perPage = ref(6)
const totalPages = ref(1)

// شناسه دسته‌بندی فعال برای فیلتر
const activeCategoryId = ref(null)

// انتخاب تب دسته‌بندی و بارگذاری مجدد لیست
const selectCategoryTab = (id) => {
  if (activeCategoryId.value === id) return
  activeCategoryId.value = id
  fetchResumes(1)
}

// دریافت لیست رزومه‌ها از سرور
const fetchResumes = async (page = 1) => {
  isLoadingList.value = true
  errorMessage.value = ''
  try {
    const query = { page, per_page: perPage.value }
    if (activeCategoryId.value) {
      query.category_id = activeCategoryId.value
    }

    const res = await $fetch(`${API_BASE}/api/admin/resumes`, {
      method: 'GET',
      query,
      headers: { ...authHeader() },
    })

    resumeItems.value = (res.data || []).map((r) => ({
      id: r.id,
      title: r.title,
      image: r.cover?.image || '/images/placeholder.jpg',
    }))

    currentPage.value = res.meta?.current_page || page
    totalPages.value = res.meta?.last_page || 1
  } catch (err) {
    console.error(err)
    errorMessage.value = 'خطا در دریافت لیست رزومه‌ها'
  } finally {
    isLoadingList.value = false
  }
}

// رفتن به صفحه مشخص در صفحه‌بندی
const goToPage = (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  fetchResumes(page)
}

fetchResumes(1)

// شناسه دسته‌بندی‌های اصلی رزومه
const MAIN_CATEGORY_IDS = [1, 8, 15]

const categories = ref([])
const isLoadingCategories = ref(false)

// دریافت لیست دسته‌بندی‌ها از سرویس‌ها
const fetchCategories = async () => {
  isLoadingCategories.value = true
  try {
    const res = await $fetch(`${API_BASE}/api/services`, {
      method: 'GET',
    })

    const services =
      res?.data?.services ??
      (Array.isArray(res?.data) ? res.data : null) ??
      (Array.isArray(res?.services) ? res.services : null) ??
      (Array.isArray(res) ? res : null) ??
      []

    categories.value = services.filter((s) => MAIN_CATEGORY_IDS.includes(s.id))
  } catch (err) {
    console.error(err)
  } finally {
    isLoadingCategories.value = false
  }
}

fetchCategories()

// مقدار اولیه خالی فرم
const emptyForm = () => ({
  id: null,
  title: '',
  title_en: '',
  slug: '',
  description: '',
  description_en: '',
  is_published: true,
  category_id: null,
  category_name: '',
  customer_name: '',
  customer_name_en: '',
  customer_position: '',
  customer_position_en: '',
  customer_avatar: null,
  customer_avatar_preview: null,
  customer_description: '',
  customer_description_en: '',
  images: [],
  images_preview: [],
  existing_images: [],
})

const form = reactive(emptyForm())

// بازنشانی فرم به حالت اولیه
const resetForm = () => Object.assign(form, emptyForm())

// باز کردن فرم افزودن یا ویرایش و بارگذاری داده آیتم
const openForm = async (item = null) => {
  if (!item && isReadOnly.value) return

  resetForm()
  selectedItem.value = item
  activeView.value = 'form'

  if (categories.value.length === 0 && !isLoadingCategories.value) {
    fetchCategories()
  }

  if (item && item.id) {
    isLoadingForm.value = true
    errorMessage.value = ''
    try {
      const res = await $fetch(`${API_BASE}/api/admin/resumes/${item.id}`, {
        method: 'GET',
        headers: { ...authHeader() },
      })
      const d = res.data
      form.id = d.id
      form.title = d.title || ''
      form.title_en = d.title_en || ''
      form.slug = d.slug || ''
      form.description = d.description || ''
      form.description_en = d.description_en || ''
      form.is_published = !!d.is_published


      form.category_name = d.category || ''
      const matched = categories.value.find((c) => c.title === form.category_name)
      form.category_id = matched ? matched.id : null


      form.customer_name = d.review?.name || ''
      form.customer_name_en = d.review?.name_en || ''
      form.customer_position = d.review?.position || ''
      form.customer_position_en = d.review?.position_en || ''
      form.customer_avatar_preview = d.review?.avatar || null
      form.customer_description = d.review?.description || ''
      form.customer_description_en = d.review?.description_en || ''
      form.existing_images = d.images || []
    } catch (err) {
      console.error(err)
      errorMessage.value = 'خطا در دریافت اطلاعات رزومه'
    } finally {
      isLoadingForm.value = false
    }
  }
}

// بستن فرم و بازگشت به لیست
const closeForm = () => {
  activeView.value = 'list'
  selectedItem.value = null
  resetForm()
}

// انتخاب و پیش‌نمایش آواتار جدید مشتری
const onAvatarChange = (e) => {
  if (isReadOnly.value) return
  const file = e.target.files?.[0]
  if (!file) return
  form.customer_avatar = file
  form.customer_avatar_preview = URL.createObjectURL(file)
}

// حذف آواتار انتخاب‌شده
const removeAvatar = () => {
  if (isReadOnly.value) return
  form.customer_avatar = null
  form.customer_avatar_preview = null
}

// انتخاب و پیش‌نمایش تصاویر جدید پروژه
const onImagesChange = (e) => {
  if (isReadOnly.value) return
  const files = Array.from(e.target.files || [])
  files.forEach((file) => {
    form.images.push(file)
    form.images_preview.push(URL.createObjectURL(file))
  })
  e.target.value = ''
}

// حذف یک تصویر جدید از لیست انتخاب‌شده‌ها
const removeNewImage = (index) => {
  if (isReadOnly.value) return
  form.images.splice(index, 1)
  form.images_preview.splice(index, 1)
}

// حذف یک تصویر موجود روی سرور
const removeExistingImage = (id) => {
  if (isReadOnly.value) return

  form.existing_images = form.existing_images.filter((img) => img.id !== id)
}

// ساخت FormData از داده‌های فرم برای ارسال به API
const buildFormData = () => {
  const fd = new FormData()
  fd.append('title', form.title)
  if (form.title_en) fd.append('title_en', form.title_en)
  if (form.slug) fd.append('slug', form.slug)
  fd.append('description', form.description)
  if (form.description_en) fd.append('description_en', form.description_en)
  fd.append('is_published', form.is_published ? 1 : 0)
  if (form.category_id) fd.append('category_id', form.category_id)
  fd.append('customer_name', form.customer_name)
  if (form.customer_name_en) fd.append('customer_name_en', form.customer_name_en)
  if (form.customer_position) fd.append('customer_position', form.customer_position)
  if (form.customer_position_en) fd.append('customer_position_en', form.customer_position_en)
  if (form.customer_avatar) fd.append('customer_avatar', form.customer_avatar)
  fd.append('customer_description', form.customer_description)
  if (form.customer_description_en) fd.append('customer_description_en', form.customer_description_en)


  form.images.forEach((file) => fd.append('images[]', file))

  return fd
}

// ذخیره (ایجاد یا ویرایش) رزومه
const saveChanges = async () => {
  if (isReadOnly.value) return

  if (!form.title || !form.description || !form.customer_name || !form.customer_description) {
    errorMessage.value = 'لطفاً فیلدهای الزامی (نام پروژه، توضیحات، نام مشتری، نظر مشتری) را پر کنید'
    return
  }

  isSaving.value = true
  errorMessage.value = ''
  try {
    const fd = buildFormData()

    if (form.id) {

      await $fetch(`${API_BASE}/api/admin/resumes/${form.id}`, {
        method: 'POST',
        query: { _method: 'PUT' },
        headers: { ...authHeader() },
        body: fd,
      })
    } else {
      await $fetch(`${API_BASE}/api/admin/resumes`, {
        method: 'POST',
        headers: { ...authHeader() },
        body: fd,
      })
    }

    await fetchResumes(currentPage.value)
    closeForm()
  } catch (err) {
    console.error(err)
    errorMessage.value = err?.data?.message || 'خطا در ذخیره رزومه'
  } finally {
    isSaving.value = false
  }
}

// حذف یک رزومه پس از تأیید کاربر
const deleteItem = async (id) => {
  if (isReadOnly.value) return

  if (!confirm('آیا از حذف این رزومه مطمئن هستید؟')) return
  isDeleting.value = true
  errorMessage.value = ''
  try {
    await $fetch(`${API_BASE}/api/admin/resumes/${id}`, {
      method: 'DELETE',
      headers: { ...authHeader() },
    })
    const targetPage =
      resumeItems.value.length === 1 && currentPage.value > 1
        ? currentPage.value - 1
        : currentPage.value
    await fetchResumes(targetPage)
  } catch (err) {
    console.error(err)
    errorMessage.value = 'خطا در حذف رزومه'
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div class="p-4 sm:p-5 lg:p-6 min-h-screen" dir="rtl">

    <!-- بنر هشدار دسترسی مشاهده‌فقط -->
    <div
      v-if="isReadOnly"
      class="max-w-[812px] mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm rounded-xl px-4 py-3 font-bold text-center"
    >
      شما دسترسی مشاهده‌فقط دارید و نمی‌توانید رزومه‌ها را ایجاد، ویرایش یا حذف کنید.
    </div>

    <!-- نمایش پیام خطا -->
    <div
      v-if="errorMessage"
      class="max-w-[812px] mx-auto mb-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm rounded-xl px-4 py-3"
    >
      {{ errorMessage }}
    </div>

    <!-- بخش لیست رزومه‌ها -->
    <div v-if="activeView === 'list'">
      <div class="flex items-center justify-between w-full max-w-[812px] lg:w-[812px] h-[54px] lg:h-[60px] mx-auto mb-6 lg:mb-8 px-4 lg:px-6 bg-white dark:bg-dark-surface rounded-[27px]">
        <h2 class="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-[#1a2333] dark:text-dark-text">کنترل رزومه</h2>
        <button
          @click="openForm()"
          :disabled="isReadOnly"
          class="bg-[#67A9A880] dark:bg-dark-accent text-black dark:text-dark-text-deep px-3 sm:px-5 lg:px-6 py-2 rounded-full text-xs sm:text-sm hover:bg-[#235754] dark:hover:bg-dark-accent-hover transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#67A9A880]"
        >
          + افزودن رزومه
        </button>
      </div>

      <!-- تب‌های فیلتر دسته‌بندی -->
      <div class="w-full flex justify-center mb-6 lg:mb-8 px-1">
        <div class="max-w-full bg-white dark:bg-dark-input rounded-[24px] sm:rounded-[30px] lg:rounded-[48px] p-1 shadow-sm border border-gray-100 dark:border-dark-border inline-flex flex-nowrap items-center justify-center gap-1 xs:gap-1.5 sm:gap-2">
          <button
            @click="selectCategoryTab(null)"
            :class="[
              'min-w-0 px-2 sm:px-6 py-1.5 sm:py-2.5 rounded-[18px] sm:rounded-[19px] text-[10px] xs:text-[11px] sm:text-sm font-bold transition-all duration-300 truncate',
              activeCategoryId === null
                ? 'bg-[#2d6a66] dark:bg-dark-accent text-white dark:text-dark-text-deep shadow-md'
                : 'text-[#1a2333] dark:text-dark-text hover:bg-slate-100 dark:hover:bg-dark-surface/40'
            ]"
          >
            همه
          </button>

          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectCategoryTab(cat.id)"
            :class="[
              'min-w-0 px-2 sm:px-6 py-1.5 sm:py-2.5 rounded-[18px] sm:rounded-[19px] text-[10px] xs:text-[11px] sm:text-sm font-bold transition-all duration-300 truncate',
              activeCategoryId === cat.id
                ? 'bg-[#2d6a66] dark:bg-dark-accent text-white dark:text-dark-text-deep shadow-md'
                : 'text-[#1a2333] dark:text-dark-text hover:bg-slate-100 dark:hover:bg-dark-surface/40'
            ]"
          >
            {{ cat.title }}
          </button>
        </div>
      </div>

      <div v-if="isLoadingList" class="text-center text-gray-500 dark:text-dark-text/60 py-10">در حال بارگذاری...</div>

      <div v-else-if="resumeItems.length === 0" class="text-center text-gray-500 dark:text-dark-text/60 py-10">
        رزومه‌ای در این دسته‌بندی یافت نشد
      </div>

      <!-- کارت‌های رزومه -->
      <div v-else class="grid grid-cols-2 lg:flex lg:flex-wrap gap-3 sm:gap-5 lg:gap-6 justify-items-center lg:justify-center max-w-full lg:max-w-[900px] mx-auto mb-10">
        <div
          v-for="item in resumeItems"
          :key="item.id"
          class="w-full max-w-[281px] lg:w-[281px] h-auto lg:h-[379px] bg-white/17 dark:bg-dark-surface/40 rounded-[16px] sm:rounded-[25px] border border-gray-300 dark:border-dark-border/30 shadow-sm p-2 sm:p-4 flex flex-col items-center"
        >
          <img :src="item.image" class="w-full aspect-[217/207] lg:w-[217px] lg:h-[207px] object-cover rounded-[16px] sm:rounded-[25px] mb-2 sm:mb-4" />
          <h3 class="text-right font-bold text-gray-800 dark:text-dark-text text-[12px] sm:text-[15px] lg:text-[16px] mt-1 sm:mt-2 w-full px-1 sm:px-2 leading-snug">{{ item.title }}</h3>

          <div class="flex justify-between w-full mt-auto gap-1 sm:gap-2 px-1 sm:px-2 pb-1 sm:pb-2 pt-2 sm:pt-4">
            <button
              @click="deleteItem(item.id)"
              :disabled="isDeleting || isReadOnly"
              class="flex-1 bg-[#BFD1D5] dark:bg-dark-input dark:text-dark-text-deep py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs lg:w-[66px] disabled:opacity-50"
            >
              حذف
            </button>
            <button @click="openForm(item)" class="flex-1 bg-[#BFD1D5] dark:bg-dark-input dark:text-dark-text-deep py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs lg:w-[66px] hover:bg-blue-100 dark:hover:bg-dark-accent-hover">{{ isReadOnly ? 'مشاهده' : 'ویرایش' }}</button>
          </div>
        </div>
      </div>

      <!-- بخش صفحه‌بندی -->
      <div v-if="resumeItems.length > 0" class="flex justify-center lg:justify-end items-center mt-8">
        <div dir="ltr" class="flex items-center gap-2 lg:ml-[150px]">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[10px] flex items-center justify-center font-bold transition-all text-sm sm:text-base',
              currentPage === page
                ? 'bg-[#2d6a66] dark:bg-dark-accent text-white dark:text-dark-text-deep'
                : 'bg-[#e5e5e5] dark:bg-dark-surface text-black dark:text-dark-text hover:bg-gray-300 dark:hover:bg-dark-input'
            ]"
          >
            {{ page }}
          </button>

          <button
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
            class="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] bg-[#e5e5e5] dark:bg-dark-surface rounded-[10px] flex items-center justify-center hover:bg-gray-300 dark:hover:bg-dark-input disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9.28859 15.88L13.1686 12L9.28859 8.11998C8.89859 7.72998 8.89859 7.09998 9.28859 6.70998C9.67859 6.31998 10.3086 6.31998 10.6986 6.70998L15.2886 11.3C15.6786 11.69 15.6786 12.32 15.2886 12.71L10.6986 17.3C10.3086 17.69 9.67859 17.69 9.28859 17.3C8.90859 16.91 8.89859 16.27 9.28859 15.88Z"
                class="fill-[#323232] dark:fill-dark-text"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- بخش فرم افزودن/ویرایش رزومه -->
    <div v-else class="max-w-full lg:max-w-[1200px] mx-auto bg-[#F4F6F8] dark:bg-dark-surface p-4 sm:p-6 lg:p-8 rounded-[24px] lg:rounded-[40px] border border-gray-200 dark:border-dark-border/30 shadow-inner" dir="rtl">

      <button @click="closeForm" class="mb-6 lg:mb-8 text-gray-500 dark:text-dark-text/70 font-bold hover:text-black dark:hover:text-dark-text">← بازگشت</button>

      <!-- بنر هشدار مشاهده‌فقط داخل فرم -->
      <div
        v-if="isReadOnly"
        class="mb-6 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm rounded-xl px-4 py-3 font-bold text-center"
      >
        شما دسترسی مشاهده‌فقط دارید — این فرم فقط برای مشاهده است.
      </div>

      <div v-if="isLoadingForm" class="text-center text-gray-500 dark:text-dark-text/60 py-10">در حال بارگذاری اطلاعات...</div>

      <fieldset v-else :disabled="isReadOnly" class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 min-w-0 border-0 p-0 m-0">

        <div class="flex flex-col gap-6 lg:gap-8">
          <!-- بخش اطلاعات پروژه -->
          <div class="p-4 sm:p-5 lg:p-6 rounded-[24px] lg:rounded-[30px] border border-gray-100 dark:border-dark-border/20">
            <div class="flex items-center gap-2 text-[#1a2333] dark:text-dark-text font-bold mb-4 lg:mb-6">
              <div class="w-3 h-3 bg-[#BFD1D5] dark:bg-dark-accent rounded-full"></div> <h3>اطلاعات پروژه</h3>
            </div>
            <div class="space-y-3 font-roboto">

              <div>
                <label class="block mb-2 text-[13px] sm:text-[14px] font-medium text-gray-700 dark:text-dark-text/80">نام پروژه *</label>
                <input
                  v-model="form.title"
                  type="text"
                  placeholder="نام پروژه را وارد کنید"
                  class="w-full h-[42px] sm:h-[45px] px-4 rounded-[17px] border border-gray-300 dark:border-dark-border/40 bg-white/20 dark:bg-dark-input/40 dark:text-dark-text dark:placeholder:text-dark-text/40 focus:outline-none focus:border-[#2D6A66] dark:focus:border-dark-accent disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label class="block mb-2 text-[13px] sm:text-[14px] font-medium text-gray-700 dark:text-dark-text/80">Project Name (English)</label>
                <input
                  v-model="form.title_en"
                  type="text"
                  dir="ltr"
                  placeholder="Project name in English"
                  class="w-full h-[42px] sm:h-[45px] px-4 rounded-[17px] border border-gray-300 dark:border-dark-border/40 bg-white/20 dark:bg-dark-input/40 dark:text-dark-text dark:placeholder:text-dark-text/40 focus:outline-none focus:border-[#2D6A66] dark:focus:border-dark-accent disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label class="block mb-2 text-[13px] sm:text-[14px] font-medium text-gray-700 dark:text-dark-text/80">اسلاگ (اختیاری)</label>
                <input
                  v-model="form.slug"
                  type="text"
                  placeholder="ecommerce-website-design"
                  dir="ltr"
                  class="w-full h-[42px] sm:h-[45px] px-4 rounded-[17px] border border-gray-300 dark:border-dark-border/40 bg-white/20 dark:bg-dark-input/40 dark:text-dark-text dark:placeholder:text-dark-text/40 focus:outline-none focus:border-[#2D6A66] dark:focus:border-dark-accent disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label class="block mb-2 text-[13px] sm:text-[14px] md:text-[14px] min-[1920px]:text-[16px] font-medium text-gray-700 dark:text-dark-text/80">
                  دسته‌بندی
                  <span v-if="form.category_name && !form.category_id" class="text-gray-400 dark:text-dark-text/50 font-normal">
                    — دسته فعلی: {{ form.category_name }}
                  </span>
                </label>
                <div class="relative">
                  <select
                    v-model.number="form.category_id"
                    :disabled="isLoadingCategories"
                    class="w-full h-[42px] sm:h-[45px] md:h-[46px] min-[1920px]:h-[52px] pr-4 pl-10 rounded-[17px] border border-gray-300 dark:border-dark-border/40 bg-white/40 dark:bg-dark-input/40 text-gray-800 dark:text-dark-text text-[13px] sm:text-[14px] min-[1920px]:text-[16px] appearance-none cursor-pointer transition-colors focus:outline-none focus:border-[#2D6A66] dark:focus:border-dark-accent disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option :value="null" disabled class="bg-white dark:bg-dark-surface text-gray-400 dark:text-dark-text/50">
                      {{ isLoadingCategories ? 'در حال بارگذاری...' : 'انتخاب دسته‌بندی' }}
                    </option>
                    <option
                      v-for="cat in categories"
                      :key="cat.id"
                      :value="cat.id"
                      class="bg-white dark:bg-dark-surface text-gray-800 dark:text-dark-text"
                    >
                      {{ cat.title }}
                    </option>
                  </select>
                  <svg
                    class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 w-4 h-4 min-[1920px]:w-5 min-[1920px]:h-5 text-gray-500 dark:text-dark-text/60"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>

              <div>
                <label class="block mb-2 text-[13px] sm:text-[14px] font-medium text-gray-700 dark:text-dark-text/80">جزییات پروژه *</label>
                <RichTextEditor v-model="form.description" dir="rtl" :disabled="isReadOnly" height="180px" />
              </div>

              <div>
                <label class="block mb-2 text-[13px] sm:text-[14px] font-medium text-gray-700 dark:text-dark-text/80">Project Details (English)</label>
                <RichTextEditor v-model="form.description_en" dir="ltr" :disabled="isReadOnly" height="180px" />
              </div>

              <div class="flex items-center gap-2">
                <input id="is_published" v-model="form.is_published" type="checkbox" class="w-4 h-4" />
                <label for="is_published" class="text-[13px] sm:text-[14px] font-medium text-gray-700 dark:text-dark-text/80">منتشر شود</label>
              </div>

            </div>
          </div>


        </div>

        <div class="flex flex-col gap-6 lg:gap-8">

<!-- بخش اطلاعات مشتری -->
<div class="p-4 sm:p-5 lg:p-6 rounded-[24px] lg:rounded-[30px] border border-gray-100 dark:border-dark-border/20">
  <div class="flex items-center gap-2 text-[#1a2333] dark:text-dark-text font-bold mb-4 lg:mb-6">
    <div class="w-3 h-3 bg-[#BFD1D5] dark:bg-dark-accent rounded-full"></div>
    <h3>اطلاعات مشتری</h3>
  </div>

  <!-- بخش آواتار مشتری -->
  <div class="flex items-center gap-4 mb-5">
    <img
      :src="form.customer_avatar_preview || '/images/avatar-placeholder.png'"
      class="rounded-full h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] object-cover shrink-0"
    />
    <div class="flex gap-2">
      <label
        class="px-4 py-1.5 text-[13px] sm:text-[14px] bg-[#BFD1D5] dark:bg-dark-input dark:text-dark-text-deep rounded-lg text-center"
        :class="isReadOnly ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
      >
        ویرایش تصویر
        <input type="file" accept="image/jpeg,image/png,image/webp" class="hidden" :disabled="isReadOnly" @change="onAvatarChange" />
      </label>
      <button @click="removeAvatar" :disabled="isReadOnly" class="px-4 py-1.5 text-[13px] sm:text-[14px] bg-[#BFD1D5] dark:bg-dark-input dark:text-dark-text-deep rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
        حذف تصویر
      </button>
    </div>
  </div>

  <!-- فیلدهای نام مشتری -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
    <div>
      <label class="block mb-1.5 text-[13px] font-medium text-gray-700 dark:text-dark-text/80">نام مشتری *</label>
      <input
        v-model="form.customer_name"
        type="text"
        placeholder="نام مشتری"
        class="w-full h-[40px] px-3 rounded-[14px] border border-gray-300 dark:border-dark-border/40 bg-white/20 dark:bg-dark-input/40 text-sm dark:text-dark-text dark:placeholder:text-dark-text/40 focus:outline-none focus:border-[#2D6A66] dark:focus:border-dark-accent disabled:opacity-60 disabled:cursor-not-allowed"
      />
    </div>
    <div>
      <label class="block mb-1.5 text-[13px] font-medium text-gray-700 dark:text-dark-text/80">Customer Name (English)</label>
      <input
        v-model="form.customer_name_en"
        type="text"
        dir="ltr"
        placeholder="Customer name"
        class="w-full h-[40px] px-3 rounded-[14px] border border-gray-300 dark:border-dark-border/40 bg-white/20 dark:bg-dark-input/40 text-sm dark:text-dark-text dark:placeholder:text-dark-text/40 focus:outline-none focus:border-[#2D6A66] dark:focus:border-dark-accent disabled:opacity-60 disabled:cursor-not-allowed"
      />
    </div>
  </div>

  <!-- فیلدهای سمت مشتری -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
    <div>
      <label class="block mb-1.5 text-[13px] font-medium text-gray-700 dark:text-dark-text/80">سمت مشتری</label>
      <input
        v-model="form.customer_position"
        type="text"
        placeholder="مثلاً مدیرعامل"
        class="w-full h-[40px] px-3 rounded-[14px] border border-gray-300 dark:border-dark-border/40 bg-white/20 dark:bg-dark-input/40 text-sm dark:text-dark-text dark:placeholder:text-dark-text/40 focus:outline-none focus:border-[#2D6A66] dark:focus:border-dark-accent disabled:opacity-60 disabled:cursor-not-allowed"
      />
    </div>
    <div>
      <label class="block mb-1.5 text-[13px] font-medium text-gray-700 dark:text-dark-text/80">Position (English)</label>
      <input
        v-model="form.customer_position_en"
        type="text"
        dir="ltr"
        placeholder="e.g. CEO"
        class="w-full h-[40px] px-3 rounded-[14px] border border-gray-300 dark:border-dark-border/40 bg-white/20 dark:bg-dark-input/40 text-sm dark:text-dark-text dark:placeholder:text-dark-text/40 focus:outline-none focus:border-[#2D6A66] dark:focus:border-dark-accent disabled:opacity-60 disabled:cursor-not-allowed"
      />
    </div>
  </div>

  <!-- فیلدهای نظر مشتری -->
  <div class="space-y-3">
    <div>
      <label class="block mb-1.5 text-[13px] font-medium text-gray-700 dark:text-dark-text/80">نظر مشتری درباره پروژه *</label>
      <RichTextEditor v-model="form.customer_description" dir="rtl" :disabled="isReadOnly" height="140px" />
    </div>
    <div>
      <label class="block mb-1.5 text-[13px] font-medium text-gray-700 dark:text-dark-text/80">Customer Review (English)</label>
      <RichTextEditor v-model="form.customer_description_en" dir="ltr" :disabled="isReadOnly" height="140px" />
    </div>
  </div>
</div>
                    <!-- بخش تصاویر پروژه -->
                    <div class="p-4 sm:p-5 lg:p-6 rounded-[24px] lg:rounded-[30px] border border-gray-100 dark:border-dark-border/20">
            <div class="flex items-center justify-between mb-4 lg:mb-6">
              <h3 class="font-bold flex items-center gap-2 text-sm sm:text-base dark:text-dark-text"><div class="w-3 h-3 bg-[#BFD1D5] dark:bg-dark-accent rounded-full"></div> تصاویر پروژه</h3>
              <label
                class="px-3 sm:px-4 py-1 border dark:border-dark-border/40 rounded-xl text-xs font-bold bg-[#BFD1D5] dark:bg-dark-input dark:text-dark-text-deep"
                :class="isReadOnly ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
              >
                افزودن
                <input type="file" accept="image/jpeg,image/png,image/webp" multiple class="hidden" :disabled="isReadOnly" @change="onImagesChange" />
              </label>
            </div>
            <div class="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
              <!-- نمایش تصاویر موجود روی سرور -->
              <div
                v-for="img in form.existing_images"
                :key="'existing-' + img.id"
                class="relative w-[31%] aspect-[101/186] lg:w-[101px] lg:h-[186px] bg-gray-200 dark:bg-dark-input/30 rounded-2xl overflow-hidden"
              >
                <img :src="img.image" class="w-full h-full object-cover" />
                <button
                  v-if="!isReadOnly"
                  @click="removeExistingImage(img.id)"
                  class="absolute top-1 left-1 bg-black/60 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                >×</button>
              </div>

              <!-- نمایش تصاویر جدید انتخاب‌شده -->
              <div
                v-for="(src, index) in form.images_preview"
                :key="'new-' + index"
                class="relative w-[31%] aspect-[101/186] lg:w-[101px] lg:h-[186px] bg-gray-200 dark:bg-dark-input/30 rounded-2xl overflow-hidden"
              >
                <img :src="src" class="w-full h-full object-cover" />
                <button
                  v-if="!isReadOnly"
                  @click="removeNewImage(index)"
                  class="absolute top-1 left-1 bg-black/60 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                >×</button>
              </div>

              <label
                v-if="!isReadOnly"
                class="w-[31%] aspect-[101/186] lg:w-[101px] lg:h-[186px] bg-gray-200 dark:bg-dark-input/30 rounded-2xl border border-dashed dark:border-dark-border/50 flex items-center justify-center text-2xl text-gray-400 dark:text-dark-text/40 cursor-pointer"
              >
                +
                <input type="file" accept="image/jpeg,image/png,image/webp" multiple class="hidden" @change="onImagesChange" />
              </label>
            </div>
          </div>
        </div>
        
      </fieldset>

      <!-- دکمه ذخیره فرم -->
      <div v-if="!isReadOnly" class="flex flex-col-reverse sm:flex-row justify-end items-center gap-3 sm:gap-4 mt-8 lg:mt-10 pt-6 border-t border-gray-200 dark:border-dark-border/30" dir="ltr">
        <button
          @click="saveChanges"
          :disabled="isSaving"
          class="min-w-[84px] h-[32px] px-3 bg-[#BFD1D5] dark:bg-dark-accent text-black dark:text-dark-text-deep rounded-2xl text-xs font-bold flex items-center justify-center disabled:opacity-50"
        >
          {{ isSaving ? 'در حال ذخیره...' : 'ذخیره تغییرات' }}
        </button>
      </div>
    </div>

  </div>
</template>