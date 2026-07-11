<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useAdminAuth } from '@/composables/useAdminAuth'; // مسیر را مطابق پروژه تنظیم کنید

/* ---------------------------------------------------------
   تنظیمات پایه‌ی API + احراز هویت
--------------------------------------------------------- */
const API_BASE = 'https://nadertechnologyteam.ir/api/admin/articles';

const { initFromStorage, authHeader, clearAuth } = useAdminAuth();

// در سمت کلاینت، توکن را از localStorage بازیابی کن (بعد از رفرش صفحه)
if (import.meta.client) initFromStorage();

/* ---------------------------------------------------------
   وضعیت نمایش (فرم / لیست)
--------------------------------------------------------- */
const isFormVisible = ref(false);
const isEditMode = computed(() => !!form.id);

/* ---------------------------------------------------------
   لیست مقالات + Pagination (سازگار با پاسخ API)
--------------------------------------------------------- */
const articles = ref([]);
const isLoadingList = ref(false);
const listError = ref('');

const currentPage = ref(1);
const perPage = ref(10);
const meta = reactive({
  current_page: 1,
  last_page: 1,
  total: 0,
});

async function fetchArticles(page = currentPage.value) {
  isLoadingList.value = true;
  listError.value = '';
  try {
    const json = await $fetch(API_BASE, {
      method: 'GET',
      query: { page, per_page: perPage.value },
      headers: { Accept: 'application/json', ...authHeader() },
    });

    articles.value = json.data || [];
    Object.assign(meta, json.meta || {});
    currentPage.value = json.meta?.current_page || page;
  } catch (err) {
    if (err?.response?.status === 401 || err?.statusCode === 401) {
      listError.value = 'نشست شما منقضی شده است، لطفاً دوباره وارد شوید.';
      clearAuth();
      navigateTo('/admin/login'); // مسیر صفحه‌ی لاگین را مطابق پروژه تنظیم کنید
      return;
    }
    listError.value = err?.data?.message || err.message || 'خطای ناشناخته';
  } finally {
    isLoadingList.value = false;
  }
}

const totalPages = computed(() => meta.last_page || 1);

function changePage(page) {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    currentPage.value = page;
    fetchArticles(page);
  }
}

/* ---------------------------------------------------------
   فرم افزودن / ویرایش مقاله
--------------------------------------------------------- */
const emptyForm = () => ({
  id: null,
  title: '',
  slug: '',
  content: '',
  thumbnail_alt: '',
  meta_title: '',
  meta_description: '',
  status: 'draft',
});

const form = reactive(emptyForm());

const thumbnailFile = ref(null);       // فایل جدید انتخاب‌شده (اختیاری در حالت ویرایش)
const thumbnailPreview = ref('');      // برای نمایش پیش‌نمایش تصویر

const isSaving = ref(false);
const formErrors = ref({});
const formErrorMessage = ref('');

function openCreateForm() {
  Object.assign(form, emptyForm());
  thumbnailFile.value = null;
  thumbnailPreview.value = '';
  formErrors.value = {};
  formErrorMessage.value = '';
  isFormVisible.value = true;
}

function openEditForm(article) {
  Object.assign(form, {
    id: article.id,
    title: article.title || '',
    slug: article.slug || '',
    content: article.content || '',
    thumbnail_alt: article.thumbnail_alt || '',
    meta_title: article.meta_title || '',
    meta_description: article.meta_description || '',
    status: article.status || 'draft',
  });
  thumbnailFile.value = null;
  thumbnailPreview.value = article.thumbnail || '';
  formErrors.value = {};
  formErrorMessage.value = '';
  isFormVisible.value = true;
}

function onThumbnailChange(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  thumbnailFile.value = file;
  thumbnailPreview.value = URL.createObjectURL(file);
}

function buildFormData() {
  const fd = new FormData();
  fd.append('title', form.title);
  if (form.slug) fd.append('slug', form.slug);
  fd.append('content', form.content);
  if (form.thumbnail_alt) fd.append('thumbnail_alt', form.thumbnail_alt);
  if (form.meta_title) fd.append('meta_title', form.meta_title);
  if (form.meta_description) fd.append('meta_description', form.meta_description);
  if (form.status) fd.append('status', form.status);
  if (thumbnailFile.value) fd.append('thumbnail', thumbnailFile.value);
  return fd;
}

async function saveArticle() {
  isSaving.value = true;
  formErrors.value = {};
  formErrorMessage.value = '';

  // ولیدیشن ساده‌ی سمت کلاینت طبق فیلدهای اجباری API
  if (!form.title || !form.content || (!isEditMode.value && !thumbnailFile.value)) {
    formErrorMessage.value = 'عنوان، متن مقاله و تصویر (برای مقاله‌ی جدید) الزامی است.';
    isSaving.value = false;
    return;
  }

  try {
    const fd = buildFormData();
    let url = API_BASE;
    if (isEditMode.value) {
      // در Laravel برای ارسال FormData با متد PUT از method-spoofing استفاده می‌شود
      url = `${API_BASE}/${form.id}?_method=PUT`;
    }

    await $fetch(url, {
      method: 'POST',
      headers: { Accept: 'application/json', ...authHeader() },
      body: fd,
    });

    isFormVisible.value = false;
    await fetchArticles(isEditMode.value ? currentPage.value : 1);
  } catch (err) {
    const status = err?.response?.status || err?.statusCode;
    const body = err?.response?._data || err?.data;

    if (status === 422) {
      formErrors.value = body?.errors || {};
      formErrorMessage.value = body?.message || 'خطای اعتبارسنجی';
    } else if (status === 401) {
      formErrorMessage.value = 'نشست شما منقضی شده است، لطفاً دوباره وارد شوید.';
      clearAuth();
      navigateTo('/admin/login');
    } else {
      formErrorMessage.value = body?.message || 'ذخیره‌ی مقاله با خطا مواجه شد';
    }
  } finally {
    isSaving.value = false;
  }
}

/* ---------------------------------------------------------
   حذف مقاله
--------------------------------------------------------- */
const deletingId = ref(null);

async function deleteArticle(article) {
  if (!confirm(`مقاله «${article.title}» حذف شود؟`)) return;
  deletingId.value = article.id;
  try {
    await $fetch(`${API_BASE}/${article.id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json', ...authHeader() },
    });

    // اگر آخرین آیتم صفحه حذف شد و صفحه خالی از قلم افتاد، یک صفحه برگرد
    const isLastItemOnPage = articles.value.length === 1 && currentPage.value > 1;
    await fetchArticles(isLastItemOnPage ? currentPage.value - 1 : currentPage.value);
  } catch (err) {
    const status = err?.response?.status || err?.statusCode;
    if (status === 401) {
      clearAuth();
      navigateTo('/admin/login');
      return;
    }
    alert(err?.data?.message || err.message || 'حذف مقاله با خطا مواجه شد');
  } finally {
    deletingId.value = null;
  }
}

/* ---------------------------------------------------------
   کمکی: فرمت تاریخ برای نمایش
--------------------------------------------------------- */
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

onMounted(() => fetchArticles());
</script>

<template>
  <!-- ۱. فرم افزودن/ویرایش مقاله -->
  <div v-if="isFormVisible" class="max-w-full lg:max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8" dir="rtl">
    <button @click="isFormVisible = false" class="mb-4 text-sm font-bold text-gray-500">بازگشت ← </button>

    <div class="bg-[#ECEDF4] p-4 sm:p-6 lg:p-8 rounded-[20px] sm:rounded-[24px] lg:rounded-[30px]">
      <h2 class="text-lg sm:text-xl font-bold mb-5 sm:mb-8 text-[#1a2333]">
        {{ isEditMode ? 'ویرایش مقاله' : 'افزودن مقاله' }}
      </h2>

      <p v-if="formErrorMessage" class="mb-4 text-sm font-bold text-red-600">{{ formErrorMessage }}</p>

      <div class="space-y-4 sm:space-y-6">
        <!-- نام مقاله -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700">نام مقاله *</label>
          <input v-model="form.title" type="text" class="w-full h-[46px] sm:h-[50px] bg-white/20 border border-gray-300 rounded-[17px] px-4 focus:outline-none" placeholder="تفاوت طراحی سایت اختصاصی با قالب آماده" />
          <p v-if="formErrors.title" class="text-xs text-red-600 mt-1">{{ formErrors.title[0] }}</p>
        </div>

        <!-- نامک (slug) -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700">نامک (Slug)</label>
          <input v-model="form.slug" type="text" class="w-full h-[46px] sm:h-[50px] bg-white/20 border border-gray-300 rounded-[17px] px-4 focus:outline-none" placeholder="در صورت خالی بودن به‌صورت خودکار ساخته می‌شود" />
          <p v-if="formErrors.slug" class="text-xs text-red-600 mt-1">{{ formErrors.slug[0] }}</p>
        </div>

        <!-- تصویر مقاله -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700">
            تصویر مقاله {{ isEditMode ? '' : '*' }}
          </label>
          <div class="w-full min-h-[140px] sm:h-[180px] border border-gray-300 rounded-2xl flex flex-col sm:flex-row items-center justify-start gap-4 sm:gap-6 p-4 sm:px-6 bg-white/20">
            <img
              v-if="thumbnailPreview"
              :src="thumbnailPreview"
              class="w-[110px] h-[132px] sm:w-[136px] sm:h-[163px] object-cover rounded-[17px]"
            />
            <div v-else class="w-[110px] h-[132px] sm:w-[136px] sm:h-[163px] rounded-[17px] bg-gray-200 flex items-center justify-center text-xs text-gray-500">
              بدون تصویر
            </div>

            <label class="bg-gray-300 px-6 py-2 rounded-xl text-sm font-bold cursor-pointer">
              انتخاب تصویر
              <input type="file" accept=".jpg,.jpeg,.png,.webp" class="hidden" @change="onThumbnailChange" />
            </label>
          </div>
          <p class="text-xs text-gray-500 mt-1">حداکثر حجم ۲ مگابایت، فرمت‌های مجاز: jpg, jpeg, png, webp</p>
          <p v-if="formErrors.thumbnail" class="text-xs text-red-600 mt-1">{{ formErrors.thumbnail[0] }}</p>
        </div>

        <!-- متن جایگزین تصویر -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700">متن جایگزین تصویر (Alt)</label>
          <input v-model="form.thumbnail_alt" type="text" class="w-full h-[46px] sm:h-[50px] bg-white/20 border border-gray-300 rounded-[17px] px-4 focus:outline-none" placeholder="تصویر مقاله" />
        </div>

        <!-- متن توضیحات -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700">متن توضیحات مقاله *</label>
          <textarea v-model="form.content" class="w-full h-[180px] sm:h-[250px] bg-white/20 border border-gray-300 rounded-2xl p-4 focus:outline-none"></textarea>
          <p v-if="formErrors.content" class="text-xs text-red-600 mt-1">{{ formErrors.content[0] }}</p>
        </div>

        <!-- سئو (اختیاری) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-bold mb-2 text-gray-700">عنوان سئو</label>
            <input v-model="form.meta_title" type="text" class="w-full h-[46px] sm:h-[50px] bg-white/20 border border-gray-300 rounded-[17px] px-4 focus:outline-none" />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2 text-gray-700">توضیحات سئو</label>
            <input v-model="form.meta_description" type="text" class="w-full h-[46px] sm:h-[50px] bg-white/20 border border-gray-300 rounded-[17px] px-4 focus:outline-none" />
          </div>
        </div>

        <!-- وضعیت انتشار -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700">وضعیت</label>
          <select v-model="form.status" class="w-full h-[46px] sm:h-[50px] bg-white/20 border border-gray-300 rounded-[17px] px-4 focus:outline-none">
            <option value="draft">پیش‌نویس</option>
            <option value="published">منتشر شده</option>
            <option value="archived">آرشیو شده</option>
          </select>
        </div>

        <div class="flex justify-end">
          <button
            @click="saveArticle"
            :disabled="isSaving"
            class="bg-[#286463] text-white px-8 py-3 rounded-xl font-bold text-sm w-full sm:w-[150px] disabled:opacity-60"
          >
            {{ isSaving ? 'در حال ذخیره...' : 'ذخیره مقاله' }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ۲. لیست مقالات -->
  <div v-else class="max-w-full lg:max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8" dir="rtl">

    <div class="flex flex-row justify-between items-center mb-5 sm:mb-8 bg-white rounded-full w-full h-[52px] sm:h-[60px] px-3 sm:px-4">
      <h1 class="text-base sm:text-lg lg:text-xl font-bold text-[#1a2333]">مقالات</h1>
      <button @click="openCreateForm" class="bg-[#67A9A880] px-3 sm:px-6 py-2 rounded-full font-bold flex items-center gap-2 text-[12px] sm:text-[14px] whitespace-nowrap">
        + افزودن مقاله
      </button>
    </div>

    <p v-if="isLoadingList" class="text-center text-gray-500 py-8">در حال بارگذاری...</p>
    <p v-else-if="listError" class="text-center text-red-600 py-8">{{ listError }}</p>
    <p v-else-if="articles.length === 0" class="text-center text-gray-500 py-8">مقاله‌ای یافت نشد.</p>

    <div v-else class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-5 lg:gap-6">
      <div
        v-for="article in articles"
        :key="article.id"
        class="bg-white/20 p-3 sm:p-5 lg:p-6 rounded-[16px] sm:rounded-[24px] lg:rounded-[30px] border border-gray-300 shadow-sm flex flex-col sm:flex-row items-center gap-2 sm:gap-5 lg:gap-6 h-auto lg:h-[186px]"
      >
        <img :src="article.thumbnail" class="w-full h-[100px] sm:w-[110px] sm:h-[132px] lg:w-[136px] lg:h-[163px] object-cover rounded-xl sm:rounded-2xl shrink-0" />
        <div class="flex-1 w-full">
          <h3 class="font-bold text-[12px] sm:text-base lg:text-lg mb-1.5 sm:mb-3 lg:mb-4 line-clamp-2">{{ article.title }}</h3>
          <div class="flex flex-col gap-1 sm:gap-2 text-gray-500 text-[10px] sm:text-sm">
            <span class="flex items-center gap-1 sm:gap-2 text-[#747893]">
              <AdminIconsDateVector /> {{ formatDate(article.created_at) }}
            </span>
            <span class="flex items-center gap-1 sm:gap-2 text-[#747893]">
              <AdminIconsEyeVector /> {{ article.views_count }} بازدید
            </span>
          </div>
        </div>

        <div class="flex gap-1.5 sm:gap-2 w-full sm:w-auto">
          <button
            @click="deleteArticle(article)"
            :disabled="deletingId === article.id"
            class="flex-1 sm:flex-none sm:w-[85px] h-[26px] sm:h-[26px] bg-[#BFD1D5] rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 disabled:opacity-60"
          >
            <AdminIconsDelete /> {{ deletingId === article.id ? 'در حال حذف...' : 'حذف' }}
          </button>
          <button
            @click="openEditForm(article)"
            class="flex-1 sm:flex-none sm:w-[85px] h-[26px] sm:h-[26px] bg-[#BFD1D5] rounded-lg sm:rounded-[10px] text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1"
          >
            <AdminIconsEdit /> ویرایش
          </button>
        </div>
      </div>
    </div>

    <!-- صفحه‌بندی -->
    <div v-if="totalPages > 1" class="flex justify-center sm:justify-end gap-2 mt-6 sm:mt-8">
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white border border-gray-300 font-bold hover:bg-gray-50 disabled:opacity-50">→</button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        dir="ltr"
        :class="['w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-bold border transition', currentPage === page ? 'bg-teal-800 text-white' : 'bg-white border-gray-300 hover:bg-gray-50']"
      >
        {{ page }}
      </button>
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white border border-gray-300 font-bold hover:bg-gray-50 disabled:opacity-50">←</button>
    </div>
  </div>
</template>