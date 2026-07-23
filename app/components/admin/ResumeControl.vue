<script setup>
import { ref, reactive } from 'vue'
import { useAdminAuth } from '~/composables/useAdminAuth' // مسیر رو مطابق پروژه‌ت تنظیم کن

// ==================== تنظیمات پایه ====================
const API_BASE = 'https://nadertechnologyteam.ir'

const { authHeader, initFromStorage } = useAdminAuth()
initFromStorage()

// ==================== وضعیت نمایش ====================
const activeView = ref('list') // 'list' | 'form'
const selectedItem = ref(null)

const isLoadingList = ref(false)
const isLoadingForm = ref(false)
const isSaving = ref(false)
const isDeleting = ref(false)
const errorMessage = ref('')

// ==================== لیست + صفحه‌بندی (از API) ====================
const resumeItems = ref([])
const currentPage = ref(1)
const perPage = ref(6)
const totalPages = ref(1)

const fetchResumes = async (page = 1) => {
  isLoadingList.value = true
  errorMessage.value = ''
  try {
    // نکته: در $fetch از کلید "query" استفاده می‌کنیم نه "params"
    const res = await $fetch(`${API_BASE}/api/admin/resumes`, {
      method: 'GET',
      query: { page, per_page: perPage.value },
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

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  fetchResumes(page)
}

fetchResumes(1)

// ==================== فرم افزودن/ویرایش ====================
const emptyForm = () => ({
  id: null,
  title: '',
  slug: '',
  description: '',
  is_published: true,
  category_id: null,
  category_name: '', // فقط برای نمایش (سرور در حالت ویرایش category_id برنمی‌گردونه، فقط نام category)
  customer_name: '',
  customer_position: '',
  customer_avatar: null,        // فایل جدید (اختیاری)
  customer_avatar_preview: null, // برای نمایش
  customer_description: '',
  images: [],           // فایل‌های جدید (File[])
  images_preview: [],   // پیش‌نمایش فایل‌های جدید
  existing_images: [],  // تصاویر موجود از سرور (فقط برای نمایش موقع ویرایش)
})

const form = reactive(emptyForm())

const resetForm = () => Object.assign(form, emptyForm())

const openForm = async (item = null) => {
  resetForm()
  selectedItem.value = item
  activeView.value = 'form'

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
      form.slug = d.slug || ''
      form.description = d.description || ''
      form.is_published = !!d.is_published

      // ⚠️ طبق مستندات سواگر، پاسخ GET تکی فقط "category" (نام دسته‌بندی به‌صورت رشته)
      // برمی‌گردونه، نه category_id. پس اینجا نمی‌تونیم id رو دوباره پر کنیم.
      // فقط نام رو برای نمایش نگه می‌داریم؛ اگه می‌خوای کاربر بتونه دسته رو در فرم ویرایش
      // عوض کنه، باید یک endpoint جدا برای لیست دسته‌بندی‌ها (id + name) بگیری و اینجا
      // با تطبیق نام، id مربوطه رو پیدا کنی یا از یک select پر شده از آن لیست استفاده کنی.
      form.category_id = null
      form.category_name = d.category || ''

      form.customer_name = d.review?.name || ''
      form.customer_position = d.review?.position || ''
      form.customer_avatar_preview = d.review?.avatar || null
      form.customer_description = d.review?.description || ''
      form.existing_images = d.images || []
    } catch (err) {
      console.error(err)
      errorMessage.value = 'خطا در دریافت اطلاعات رزومه'
    } finally {
      isLoadingForm.value = false
    }
  }
}

const closeForm = () => {
  activeView.value = 'list'
  selectedItem.value = null
  resetForm()
}

// ---- آپلود آواتار مشتری ----
const onAvatarChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  form.customer_avatar = file
  form.customer_avatar_preview = URL.createObjectURL(file)
}

const removeAvatar = () => {
  form.customer_avatar = null
  form.customer_avatar_preview = null
}

// ---- آپلود تصاویر پروژه ----
const onImagesChange = (e) => {
  const files = Array.from(e.target.files || [])
  files.forEach((file) => {
    form.images.push(file)
    form.images_preview.push(URL.createObjectURL(file))
  })
  e.target.value = '' // امکان انتخاب دوباره‌ی همون فایل
}

const removeNewImage = (index) => {
  form.images.splice(index, 1)
  form.images_preview.splice(index, 1)
}

const removeExistingImage = (id) => {
  // توجه: چون images موقع آپدیت کل تصاویر قبلی رو جایگزین می‌کنه،
  // حذف از این لیست یعنی موقع ذخیره دیگه ارسال نمی‌شه
  form.existing_images = form.existing_images.filter((img) => img.id !== id)
}

// ---- ساخت FormData مطابق اسکیمای API ----
const buildFormData = () => {
  const fd = new FormData()
  fd.append('title', form.title)
  if (form.slug) fd.append('slug', form.slug)
  fd.append('description', form.description)
  fd.append('is_published', form.is_published ? 1 : 0)
  if (form.category_id) fd.append('category_id', form.category_id)
  fd.append('customer_name', form.customer_name)
  if (form.customer_position) fd.append('customer_position', form.customer_position)
  if (form.customer_avatar) fd.append('customer_avatar', form.customer_avatar)
  fd.append('customer_description', form.customer_description)

  // توجه مهم: در آپدیت، فیلد images کل تصاویر قبلی رو جایگزین می‌کنه.
  // پس اگه تصویر قدیمی حذف نشده، باید همچنان به سرور اطلاع داده بشه.
  // چون API آپلود فایل می‌خواد نه URL، اینجا فقط فایل‌های جدید رو می‌فرستیم.
  // اگر بک‌اند برای نگه‌داشتن تصاویر قدیمی به id نیاز داره، باید endpoint جدا بگیری.
  form.images.forEach((file) => fd.append('images[]', file))

  return fd
}

const saveChanges = async () => {
  if (!form.title || !form.description || !form.customer_name || !form.customer_description) {
    errorMessage.value = 'لطفاً فیلدهای الزامی (نام پروژه، توضیحات، نام مشتری، نظر مشتری) را پر کنید'
    return
  }

  isSaving.value = true
  errorMessage.value = ''
  try {
    const fd = buildFormData()

    if (form.id) {
      // آپدیت - از _method=PUT روی POST طبق مستندات استفاده می‌شه
      await $fetch(`${API_BASE}/api/admin/resumes/${form.id}`, {
        method: 'POST',
        query: { _method: 'PUT' },
        headers: { ...authHeader() },
        body: fd,
      })
    } else {
      // ایجاد جدید
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

// ---- حذف رزومه ----
const deleteItem = async (id) => {
  if (!confirm('آیا از حذف این رزومه مطمئن هستید؟')) return
  isDeleting.value = true
  errorMessage.value = ''
  try {
    await $fetch(`${API_BASE}/api/admin/resumes/${id}`, {
      method: 'DELETE',
      headers: { ...authHeader() },
    })
    // اگه آخرین آیتم صفحه حذف شد و صفحه خالی موند، برو صفحه قبل
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

    <!-- پیام خطای عمومی -->
    <div
      v-if="errorMessage"
      class="max-w-[812px] mx-auto mb-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm rounded-xl px-4 py-3"
    >
      {{ errorMessage }}
    </div>

    <!-- وضعیت نمایش لیست کارت‌ها -->
    <div v-if="activeView === 'list'">
      <div class="flex items-center justify-between w-full max-w-[812px] lg:w-[812px] h-[54px] lg:h-[60px] mx-auto mb-6 lg:mb-8 px-4 lg:px-6 bg-white dark:bg-dark-surface rounded-[27px]">
        <h2 class="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-[#1a2333] dark:text-dark-text">کنترل رزومه</h2>
        <button @click="openForm()" class="bg-[#67A9A880] dark:bg-dark-accent text-black dark:text-dark-text-deep px-3 sm:px-5 lg:px-6 py-2 rounded-full text-xs sm:text-sm hover:bg-[#235754] dark:hover:bg-dark-accent-hover transition-all whitespace-nowrap">
          + افزودن رزومه
        </button>
      </div>

      <div v-if="isLoadingList" class="text-center text-gray-500 dark:text-dark-text/60 py-10">در حال بارگذاری...</div>

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
              :disabled="isDeleting"
              class="flex-1 bg-[#BFD1D5] dark:bg-dark-input dark:text-dark-text-deep py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs lg:w-[66px] disabled:opacity-50"
            >
              حذف
            </button>
            <button @click="openForm(item)" class="flex-1 bg-[#BFD1D5] dark:bg-dark-input dark:text-dark-text-deep py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs lg:w-[66px] hover:bg-blue-100 dark:hover:bg-dark-accent-hover">ویرایش</button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center lg:justify-end items-center mt-8">
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

    <!-- فرم افزودن/ویرایش -->
    <div v-else class="max-w-full lg:max-w-[1200px] mx-auto bg-[#F4F6F8] dark:bg-dark-surface p-4 sm:p-6 lg:p-8 rounded-[24px] lg:rounded-[40px] border border-gray-200 dark:border-dark-border/30 shadow-inner" dir="rtl">

      <button @click="closeForm" class="mb-6 lg:mb-8 text-gray-500 dark:text-dark-text/70 font-bold hover:text-black dark:hover:text-dark-text">← بازگشت</button>

      <div v-if="isLoadingForm" class="text-center text-gray-500 dark:text-dark-text/60 py-10">در حال بارگذاری اطلاعات...</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

        <div class="flex flex-col gap-6 lg:gap-8">
          <!-- اطلاعات پروژه -->
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
                  class="w-full h-[42px] sm:h-[45px] px-4 rounded-[17px] border border-gray-300 dark:border-dark-border/40 bg-white/20 dark:bg-dark-input/40 dark:text-dark-text dark:placeholder:text-dark-text/40 focus:outline-none focus:border-[#2D6A66] dark:focus:border-dark-accent"
                />
              </div>

              <div>
                <label class="block mb-2 text-[13px] sm:text-[14px] font-medium text-gray-700 dark:text-dark-text/80">اسلاگ (اختیاری)</label>
                <input
                  v-model="form.slug"
                  type="text"
                  placeholder="ecommerce-website-design"
                  dir="ltr"
                  class="w-full h-[42px] sm:h-[45px] px-4 rounded-[17px] border border-gray-300 dark:border-dark-border/40 bg-white/20 dark:bg-dark-input/40 dark:text-dark-text dark:placeholder:text-dark-text/40 focus:outline-none focus:border-[#2D6A66] dark:focus:border-dark-accent"
                />
              </div>

              <!-- <div>
                <label class="block mb-2 text-[13px] sm:text-[14px] font-medium text-gray-700 dark:text-dark-text/80">
                  دسته‌بندی (شناسه)
                  <span v-if="form.category_name" class="text-gray-400 dark:text-dark-text/50 font-normal">
                    — دسته فعلی: {{ form.category_name }}
                  </span>
                </label>
                <input
                  v-model.number="form.category_id"
                  type="number"
                  placeholder="مثلاً 1"
                  class="w-full h-[42px] sm:h-[45px] px-4 rounded-[17px] border border-gray-300 dark:border-dark-border/40 bg-white/20 dark:bg-dark-input/40 dark:text-dark-text dark:placeholder:text-dark-text/40 focus:outline-none focus:border-[#2D6A66] dark:focus:border-dark-accent"
                />

              </div> -->

              <div>
                <label class="block mb-2 text-[13px] sm:text-[14px] font-medium text-gray-700 dark:text-dark-text/80">جزییات پروژه *</label>
                <textarea
                  v-model="form.description"
                  rows="3"
                  placeholder="توضیحات کامل پروژه"
                  class="w-full px-4 py-2 rounded-[17px] border border-gray-300 dark:border-dark-border/40 bg-white/20 dark:bg-dark-input/40 dark:text-dark-text dark:placeholder:text-dark-text/40 focus:outline-none focus:border-[#2D6A66] dark:focus:border-dark-accent"
                ></textarea>
              </div>

              <div class="flex items-center gap-2">
                <input id="is_published" v-model="form.is_published" type="checkbox" class="w-4 h-4" />
                <label for="is_published" class="text-[13px] sm:text-[14px] font-medium text-gray-700 dark:text-dark-text/80">منتشر شود</label>
              </div>

            </div>
          </div>


        </div>

        <div class="flex flex-col gap-6 lg:gap-8">

          <!-- اطلاعات مشتری -->
          <div class="p-4 sm:p-5 lg:p-6 rounded-[24px] lg:rounded-[30px] border border-gray-100 dark:border-dark-border/20">
            <div class="flex items-center gap-2 text-[#1a2333] dark:text-dark-text font-bold mb-4 lg:mb-6">
              <div class="w-3 h-3 bg-[#BFD1D5] dark:bg-dark-accent rounded-full"></div> <h3>اطلاعات مشتری</h3>
            </div>

            <div class="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-4">
              <div class="flex items-center gap-3 sm:gap-4">
                <img
                  :src="form.customer_avatar_preview || '/images/avatar-placeholder.png'"
                  class="rounded-full h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] object-cover"
                />
                <div>
                  <input
                    v-model="form.customer_name"
                    type="text"
                    placeholder="نام مشتری *"
                    class="font-bold text-sm sm:text-base border-b border-gray-300 dark:border-dark-border/40 bg-transparent dark:text-dark-text dark:placeholder:text-dark-text/40 focus:outline-none mb-1 w-full"
                  />
                  <input
                    v-model="form.customer_position"
                    type="text"
                    placeholder="سمت مشتری"
                    class="text-xs sm:text-sm text-gray-500 dark:text-dark-text/60 border-b border-gray-200 dark:border-dark-border/30 bg-transparent dark:placeholder:text-dark-text/40 focus:outline-none w-full"
                  />
                </div>
              </div>
              <div class="flex flex-row sm:flex-col gap-2">
                <label class="w-20 py-1 text-[13px] sm:text-[14px] bg-[#BFD1D5] dark:bg-dark-input dark:text-dark-text-deep rounded-lg text-center cursor-pointer">
                  ویرایش
                  <input type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="onAvatarChange" />
                </label>
                <button @click="removeAvatar" class="w-20 py-1 text-[13px] sm:text-[14px] bg-[#BFD1D5] dark:bg-dark-input dark:text-dark-text-deep rounded-lg">حذف تصویر</button>
              </div>
            </div>

            <textarea
              v-model="form.customer_description"
              rows="3"
              placeholder="نظر مشتری درباره پروژه *"
              class="mt-2 w-full text-xs sm:text-sm text-gray-600 dark:text-dark-text/80 bg-gray-50 dark:bg-dark-input/30 dark:placeholder:text-dark-text/40 p-3 sm:p-4 rounded-xl focus:outline-none"
            ></textarea>
          </div>
                    <!-- تصاویر پروژه -->
                    <div class="p-4 sm:p-5 lg:p-6 rounded-[24px] lg:rounded-[30px] border border-gray-100 dark:border-dark-border/20">
            <div class="flex items-center justify-between mb-4 lg:mb-6">
              <h3 class="font-bold flex items-center gap-2 text-sm sm:text-base dark:text-dark-text"><div class="w-3 h-3 bg-[#BFD1D5] dark:bg-dark-accent rounded-full"></div> تصاویر پروژه</h3>
              <label class="px-3 sm:px-4 py-1 border dark:border-dark-border/40 rounded-xl text-xs font-bold bg-[#BFD1D5] dark:bg-dark-input dark:text-dark-text-deep cursor-pointer">
                افزودن
                <input type="file" accept="image/jpeg,image/png,image/webp" multiple class="hidden" @change="onImagesChange" />
              </label>
            </div>
            <div class="flex flex-wrap gap-2 sm:gap-3 lg:gap-4">
              <!-- تصاویر موجود (موقع ویرایش) -->
              <div
                v-for="img in form.existing_images"
                :key="'existing-' + img.id"
                class="relative w-[31%] aspect-[101/186] lg:w-[101px] lg:h-[186px] bg-gray-200 dark:bg-dark-input/30 rounded-2xl overflow-hidden"
              >
                <img :src="img.image" class="w-full h-full object-cover" />
                <button
                  @click="removeExistingImage(img.id)"
                  class="absolute top-1 left-1 bg-black/60 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                >×</button>
              </div>

              <!-- تصاویر جدید انتخاب‌شده -->
              <div
                v-for="(src, index) in form.images_preview"
                :key="'new-' + index"
                class="relative w-[31%] aspect-[101/186] lg:w-[101px] lg:h-[186px] bg-gray-200 dark:bg-dark-input/30 rounded-2xl overflow-hidden"
              >
                <img :src="src" class="w-full h-full object-cover" />
                <button
                  @click="removeNewImage(index)"
                  class="absolute top-1 left-1 bg-black/60 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                >×</button>
              </div>

              <label
                class="w-[31%] aspect-[101/186] lg:w-[101px] lg:h-[186px] bg-gray-200 dark:bg-dark-input/30 rounded-2xl border border-dashed dark:border-dark-border/50 flex items-center justify-center text-2xl text-gray-400 dark:text-dark-text/40 cursor-pointer"
              >
                +
                <input type="file" accept="image/jpeg,image/png,image/webp" multiple class="hidden" @change="onImagesChange" />
              </label>
            </div>
          </div>
        </div>
        
      </div>

      <div class="flex flex-col-reverse sm:flex-row justify-end items-center gap-3 sm:gap-4 mt-8 lg:mt-10 pt-6 border-t border-gray-200 dark:border-dark-border/30" dir="ltr">
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