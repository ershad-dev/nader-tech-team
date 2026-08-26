<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAdminAuth } from '@/composables/useAdminAuth';
import { useAdminPermissions } from '@/composables/useAdminPermissions';
import { useFormatDate } from '@/composables/useFormatDate';
import RichTextEditor from '~/components/tiptap/RichTextEditor.vue';

// تنظیمات پایه API
const API_BASE = 'https://nadertechnologyteam.ir/api/admin/articles';
const IMAGE_UPLOAD_URL = 'https://nadertechnologyteam.ir/api/admin/articles/upload-image';

// احراز هویت و دسترسی ادمین
const { initFromStorage, authHeader, clearAuth } = useAdminAuth();
const { isReadOnly } = useAdminPermissions();
const { formatDate: formatDateShared } = useFormatDate();

if (import.meta.client) initFromStorage();

// وضعیت آنلاین/آفلاین بودن مرورگر
const isOffline = ref(import.meta.client ? !navigator.onLine : false);
function handleOnline() { isOffline.value = false; }
function handleOffline() { isOffline.value = true; }

// صف اعلان‌های Toast
const toasts = ref([]);
let toastSeq = 0;

// نمایش یک اعلان Toast جدید
function showToast(type, message, duration) {
  const id = ++toastSeq;
  const finalDuration = duration ?? (type === 'error' ? 7000 : type === 'warning' ? 5500 : 3500);
  toasts.value.push({ id, type, message });
  if (import.meta.client) {
    setTimeout(() => dismissToast(id), finalDuration);
  }
  return id;
}
// حذف یک اعلان Toast از صف
function dismissToast(id) {
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

// تبدیل خطای دریافتی از سرور به پیام فارسی قابل‌فهم
function getErrorMessage(err, context = '') {
  if (import.meta.client && !navigator.onLine) {
    return 'اتصال اینترنت شما برقرار نیست. لطفاً اتصال خود را بررسی و دوباره تلاش کنید.';
  }

  const status = err?.response?.status ?? err?.statusCode ?? err?.status ?? null;
  const body = err?.response?._data ?? err?.data ?? null;

  if (status === null) {
    return `${context ? context + ': ' : ''}ارتباط با سرور برقرار نشد. ممکن است سرور موقتاً در دسترس نباشد، لطفاً چند لحظه دیگر دوباره تلاش کنید.`;
  }

  switch (status) {
    case 400:
      return body?.message || 'درخواست ارسال‌شده نامعتبر است.';
    case 401:
      return 'نشست شما منقضی شده یا نامعتبر است. لطفاً دوباره وارد حساب کاربری شوید.';
    case 403:
      return 'شما دسترسی لازم برای انجام این عملیات را ندارید.';
    case 404:
      return 'مورد موردنظر پیدا نشد. ممکن است قبلاً حذف یا جابه‌جا شده باشد.';
    case 405:
      return 'این عملیات توسط سرور پشتیبانی نمی‌شود (خطای پیکربندی مسیر API). لطفاً موضوع را به تیم فنی اطلاع دهید.';
    case 409:
      return body?.message || 'این عملیات با تداخل داده مواجه شد. لطفاً صفحه را رفرش کرده و دوباره تلاش کنید.';
    case 413:
      return 'حجم فایل ارسالی بیشتر از حد مجاز سرور است.';
    case 415:
      return 'فرمت فایل ارسالی توسط سرور پشتیبانی نمی‌شود.';
    case 422:
      return body?.message || 'اطلاعات وارد‌شده معتبر نیست. لطفاً موارد مشخص‌شده در فرم را اصلاح کنید.';
    case 429:
      return 'تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً کمی صبر کنید و دوباره تلاش کنید.';
    case 500:
      return 'خطای داخلی سرور رخ داد. این مشکل از سمت شما نیست؛ لطفاً بعداً دوباره تلاش کنید.';
    case 502:
    case 503:
    case 504:
      return 'سرور موقتاً در دسترس نیست (احتمالاً در حال به‌روزرسانی است). لطفاً چند دقیقه دیگر دوباره تلاش کنید.';
    default:
      return body?.message || err?.message || `خطای ناشناخته‌ای رخ داد (کد ${status}).`;
  }
}

// بررسی اینکه آیا خطا به‌دلیل منقضی‌شدن نشست است
function isUnauthorized(err) {
  const status = err?.response?.status ?? err?.statusCode ?? err?.status;
  return status === 401;
}

// مدیریت منقضی‌شدن نشست و انتقال به صفحه ورود
function handleUnauthorized() {
  showToast('error', 'نشست شما منقضی شده است. در حال انتقال به صفحه ورود...');
  clearAuth();
  if (import.meta.client) {
    setTimeout(() => navigateTo('/admin/login'), 1200);
  }
}

// وضعیت نمایش فرم یا لیست
const isFormVisible = ref(false);
const isEditMode = computed(() => !!form.id);

// لیست مقالات و اطلاعات صفحه‌بندی
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

// دریافت لیست مقالات از سرور
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
    if (isUnauthorized(err)) {
      listError.value = 'نشست شما منقضی شده است، لطفاً دوباره وارد شوید.';
      handleUnauthorized();
      return;
    }
    listError.value = getErrorMessage(err, 'دریافت لیست مقالات');
  } finally {
    isLoadingList.value = false;
  }
}

// تلاش مجدد برای دریافت لیست مقالات
function retryFetchArticles() {
  fetchArticles(currentPage.value);
}

const totalPages = computed(() => meta.last_page || 1);

// رفتن به صفحه مشخص در صفحه‌بندی
function changePage(page) {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    currentPage.value = page;
    fetchArticles(page);
  }
}

// مقدار اولیه خالی فرم مقاله
const emptyForm = () => ({
  id: null,
  title: '',
  title_en: '',
  slug: '',
  content: '',
  content_en: '',
  thumbnail_alt: '',
  thumbnail_alt_en: '',
  meta_title: '',
  meta_title_en: '',
  meta_description: '',
  meta_description_en: '',
  status: 'published',
});

const form = reactive(emptyForm());

const thumbnailFile = ref(null);
const thumbnailPreview = ref('');
const thumbnailError = ref('');

const isSaving = ref(false);
const formErrors = ref({});
const formErrorMessage = ref('');

// خلاصه متنی خطاهای اعتبارسنجی فرم برای نمایش در بنر
const formErrorSummary = computed(() => {
  const entries = Object.entries(formErrors.value || {});
  if (!entries.length) return [];
  return entries.map(([field, messages]) => ({
    field,
    label: fieldLabel(field),
    message: Array.isArray(messages) ? messages[0] : String(messages),
  }));
});

// تبدیل نام فیلد به برچسب فارسی قابل‌نمایش
function fieldLabel(field) {
  const map = {
    title: 'نام مقاله',
    title_en: 'نام مقاله (English)',
    slug: 'نامک (Slug)',
    content: 'متن توضیحات مقاله',
    content_en: 'متن توضیحات مقاله (English)',
    thumbnail: 'تصویر مقاله',
    thumbnail_alt: 'متن جایگزین تصویر',
    thumbnail_alt_en: 'متن جایگزین تصویر (English)',
    meta_title: 'عنوان سئو',
    meta_title_en: 'عنوان سئو (English)',
    meta_description: 'توضیحات سئو',
    meta_description_en: 'توضیحات سئو (English)',
    status: 'وضعیت',
  };
  return map[field] || field;
}

// --- آپلود تصویر داخل متن مقاله ---
async function uploadArticleImage(file) {
  if (import.meta.client && !navigator.onLine) {
    throw new Error('اتصال اینترنت برقرار نیست؛ برای آپلود تصویر باید آنلاین باشید.');
  }

  try {
    const fd = new FormData();
    fd.append('image', file);

    const res = await $fetch(IMAGE_UPLOAD_URL, {
      method: 'POST',
      headers: { Accept: 'application/json', ...authHeader() },
      body: fd,
    });

    const uploadedUrl = res?.url || res?.data?.url;
    if (!uploadedUrl) {
      throw new Error('پاسخ سرور معتبر نبود (فیلد url در پاسخ آپلود یافت نشد).');
    }
    return uploadedUrl;
  } catch (err) {
    if (isUnauthorized(err)) {
      handleUnauthorized();
      throw new Error('نشست شما منقضی شده است.');
    }
    throw new Error(err?.message?.startsWith?.('پاسخ سرور') ? err.message : getErrorMessage(err, 'آپلود تصویر'));
  }
}

// باز کردن فرم خالی برای افزودن مقاله جدید
function openCreateForm() {
  if (isReadOnly.value) return;
  Object.assign(form, emptyForm());
  thumbnailFile.value = null;
  thumbnailPreview.value = '';
  thumbnailError.value = '';
  formErrors.value = {};
  formErrorMessage.value = '';
  isFormVisible.value = true;
}

// باز کردن فرم با داده‌های یک مقاله برای ویرایش
function openEditForm(article) {
  Object.assign(form, {
    id: article.id,
    title: article.title || '',
    title_en: article.title_en || '',
    slug: article.slug || '',
    content: article.content || '',
    content_en: article.content_en || '',
    thumbnail_alt: article.thumbnail_alt || '',
    thumbnail_alt_en: article.thumbnail_alt_en || '',
    meta_title: article.meta_title || '',
    meta_title_en: article.meta_title_en || '',
    meta_description: article.meta_description || '',
    meta_description_en: article.meta_description_en || '',
    status: article.status || 'published',
  });
  thumbnailFile.value = null;
  thumbnailPreview.value = article.thumbnail || '';
  thumbnailError.value = '';
  formErrors.value = {};
  formErrorMessage.value = '';
  isFormVisible.value = true;
}

const THUMBNAIL_MAX_MB = 2;
const THUMBNAIL_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// اعتبارسنجی و پیش‌نمایش تصویر شاخص انتخاب‌شده
function onThumbnailChange(e) {
  if (isReadOnly.value) {
    e.target.value = '';
    return;
  }

  const file = e.target.files?.[0];
  e.target.value = '';
  if (!file) return;

  thumbnailError.value = '';

  if (!THUMBNAIL_ALLOWED_TYPES.includes(file.type)) {
    thumbnailError.value = `فرمت «${file.type || 'نامشخص'}» مجاز نیست. فرمت‌های مجاز: jpg, jpeg, png, webp`;
    return;
  }
  if (file.size > THUMBNAIL_MAX_MB * 1024 * 1024) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    thumbnailError.value = `حجم تصویر (${sizeMb} مگابایت) بیشتر از حد مجاز (${THUMBNAIL_MAX_MB} مگابایت) است.`;
    return;
  }

  thumbnailFile.value = file;
  thumbnailPreview.value = URL.createObjectURL(file);
}

// ساخت FormData از داده‌های فرم برای ارسال به API
function buildFormData() {
  const fd = new FormData();
  fd.append('title', form.title);
  if (form.title_en) fd.append('title_en', form.title_en);
  if (form.slug) fd.append('slug', form.slug);
  fd.append('content', form.content);
  if (form.content_en) fd.append('content_en', form.content_en);
  if (form.thumbnail_alt) fd.append('thumbnail_alt', form.thumbnail_alt);
  if (form.thumbnail_alt_en) fd.append('thumbnail_alt_en', form.thumbnail_alt_en);
  if (form.meta_title) fd.append('meta_title', form.meta_title);
  if (form.meta_title_en) fd.append('meta_title_en', form.meta_title_en);
  if (form.meta_description) fd.append('meta_description', form.meta_description);
  if (form.meta_description_en) fd.append('meta_description_en', form.meta_description_en);
  if (form.status) fd.append('status', form.status);
  if (thumbnailFile.value) fd.append('thumbnail', thumbnailFile.value);
  return fd;
}

// ذخیره (ایجاد یا ویرایش) مقاله
async function saveArticle() {
  if (isReadOnly.value) return;

  formErrors.value = {};
  formErrorMessage.value = '';

  const clientErrors = {};
  if (!form.title?.trim()) clientErrors.title = ['نام مقاله را وارد کنید.'];
  if (!form.content) clientErrors.content = ['متن توضیحات مقاله نمی‌تواند خالی باشد.'];
  if (!isEditMode.value && !thumbnailFile.value) clientErrors.thumbnail = ['برای مقاله‌ی جدید انتخاب تصویر الزامی است.'];
  if (thumbnailError.value) clientErrors.thumbnail = [thumbnailError.value];

  if (Object.keys(clientErrors).length) {
    formErrors.value = clientErrors;
    formErrorMessage.value = 'لطفاً موارد مشخص‌شده در فرم را تکمیل یا اصلاح کنید.';
    if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  if (import.meta.client && !navigator.onLine) {
    formErrorMessage.value = 'اتصال اینترنت برقرار نیست. لطفاً اتصال خود را بررسی و دوباره تلاش کنید.';
    return;
  }

  isSaving.value = true;
  try {
    const fd = buildFormData();
    let url = API_BASE;
    if (isEditMode.value) {
      url = `${API_BASE}/${form.id}?_method=PUT`;
    }

    await $fetch(url, {
      method: 'POST',
      headers: { Accept: 'application/json', ...authHeader() },
      body: fd,
    });

    showToast('success', isEditMode.value ? 'مقاله با موفقیت ویرایش شد.' : 'مقاله با موفقیت افزوده شد.');
    isFormVisible.value = false;
    await fetchArticles(isEditMode.value ? currentPage.value : 1);
  } catch (err) {
    if (isUnauthorized(err)) {
      handleUnauthorized();
      return;
    }

    const status = err?.response?.status ?? err?.statusCode;
    const body = err?.response?._data ?? err?.data;

    if (status === 422) {
      formErrors.value = body?.errors || {};
      formErrorMessage.value = 'اطلاعات وارد‌شده معتبر نیست. لطفاً موارد زیر را اصلاح کنید:';
    } else {
      formErrorMessage.value = getErrorMessage(err, 'ذخیره‌ی مقاله');
    }
    if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' });
  } finally {
    isSaving.value = false;
  }
}

// حذف مقاله پس از تأیید کاربر
const deletingId = ref(null);

async function deleteArticle(article) {
  if (isReadOnly.value) return;
  if (!confirm(`آیا از حذف مقاله «${article.title}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`)) return;

  if (import.meta.client && !navigator.onLine) {
    showToast('error', 'اتصال اینترنت برقرار نیست. حذف مقاله انجام نشد.');
    return;
  }

  deletingId.value = article.id;
  try {
    await $fetch(`${API_BASE}/${article.id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json', ...authHeader() },
    });

    showToast('success', `مقاله «${article.title}» با موفقیت حذف شد.`);

    const isLastItemOnPage = articles.value.length === 1 && currentPage.value > 1;
    await fetchArticles(isLastItemOnPage ? currentPage.value - 1 : currentPage.value);
  } catch (err) {
    if (isUnauthorized(err)) {
      handleUnauthorized();
      return;
    }
    showToast('error', getErrorMessage(err, `حذف مقاله «${article.title}»`));
  } finally {
    deletingId.value = null;
  }
}

// فرمت‌دهی تاریخ برای نمایش (اولویت با تاریخ انتشار، در غیر این‌صورت تاریخ ایجاد)
function formatDate(article) {
  return formatDateShared(article.published_at ?? article.created_at, { withTime: true });
}

// بارگذاری اولیه لیست و ثبت رویدادهای آنلاین/آفلاین
onMounted(() => {
  fetchArticles();
  if (import.meta.client) {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  }
});
</script>

<template>
  <!-- نوار وضعیت آفلاین بودن اینترنت -->
  <div
    v-if="isOffline"
    class="fixed top-0 inset-x-0 z-[60] bg-red-600 text-white text-center text-sm font-bold py-2"
    dir="rtl"
  >
    ⚠️ اتصال اینترنت شما قطع شده است. عملیات‌ها تا برقراری مجدد اتصال انجام نخواهند شد.
  </div>

  <!-- کانتینر اعلان‌های Toast -->
  <div class="fixed top-4 inset-x-0 z-50 flex flex-col items-center gap-2 px-4 pointer-events-none" dir="rtl">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto w-full max-w-md flex items-start gap-3 rounded-2xl px-4 py-3 shadow-lg text-sm font-bold"
        :class="{
          'bg-green-600 text-white': toast.type === 'success',
          'bg-red-600 text-white': toast.type === 'error',
          'bg-amber-500 text-white': toast.type === 'warning',
          'bg-gray-800 text-white': toast.type === 'info',
        }"
      >
        <span class="shrink-0">
          <span v-if="toast.type === 'success'">✅</span>
          <span v-else-if="toast.type === 'error'">⛔</span>
          <span v-else-if="toast.type === 'warning'">⚠️</span>
          <span v-else>ℹ️</span>
        </span>
        <span class="flex-1">{{ toast.message }}</span>
        <button @click="dismissToast(toast.id)" class="shrink-0 opacity-80 hover:opacity-100">✕</button>
      </div>
    </TransitionGroup>
  </div>

  <!-- فرم افزودن/ویرایش مقاله -->
  <div v-if="isFormVisible" class="max-w-full lg:max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8" dir="rtl">
    <button @click="isFormVisible = false" class="mb-4 text-sm font-bold text-gray-500 dark:text-dark-text">بازگشت ← </button>

    <div class="bg-[#ECEDF4] dark:bg-dark-surface p-4 sm:p-6 lg:p-8 rounded-[20px] sm:rounded-[24px] lg:rounded-[30px]">
      <h2 class="text-lg sm:text-xl font-bold mb-5 sm:mb-8 text-[#1a2333] dark:text-dark-text">
        {{ isEditMode ? 'ویرایش مقاله' : 'افزودن مقاله' }}
      </h2>

      <!-- بنر اطلاع‌رسانی حالت فقط-نمایش -->
      <div
        v-if="isReadOnly"
        class="mb-5 text-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 font-bold py-2 px-4 rounded-xl"
      >
        شما فقط دسترسی مشاهده دارید و امکان ویرایش وجود ندارد.
      </div>

      <!-- بنر خلاصه خطاهای فرم -->
      <div
        v-if="formErrorMessage"
        class="mb-5 rounded-2xl border border-red-300 bg-red-50 dark:bg-red-950/30 dark:border-red-800 p-4"
      >
        <p class="text-sm font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
          <span>⛔</span> {{ formErrorMessage }}
        </p>
        <ul v-if="formErrorSummary.length" class="mt-2 mr-6 list-disc space-y-1">
          <li v-for="item in formErrorSummary" :key="item.field" class="text-xs text-red-600 dark:text-red-400">
            <b>{{ item.label }}:</b> {{ item.message }}
          </li>
        </ul>
      </div>

      <fieldset :disabled="isReadOnly" class="space-y-4 sm:space-y-6">
        <!-- نام مقاله -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">نام مقاله *</label>
          <input
            v-model="form.title"
            type="text"
            class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border rounded-[17px] px-4 focus:outline-none dark:text-dark-text disabled:opacity-60 disabled:cursor-not-allowed"
            :class="formErrors.title ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-dark-border'"
            placeholder="تفاوت طراحی سایت اختصاصی با قالب آماده"
          />
          <p v-if="formErrors.title" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.title[0] }}</p>
        </div>

        <!-- نام مقاله (English) -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">نام مقاله (English)</label>
          <input
            v-model="form.title_en"
            type="text"
            dir="ltr"
            class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border rounded-[17px] px-4 focus:outline-none dark:text-dark-text font-roboto text-left disabled:opacity-60 disabled:cursor-not-allowed"
            :class="formErrors.title_en ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-dark-border'"
            placeholder="Article title in English"
          />
          <p v-if="formErrors.title_en" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.title_en[0] }}</p>
        </div>

        <!-- نامک (slug) -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">نامک (Slug)</label>
          <input
            v-model="form.slug"
            type="text"
            class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border rounded-[17px] px-4 focus:outline-none dark:text-dark-text disabled:opacity-60 disabled:cursor-not-allowed"
            :class="formErrors.slug ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-dark-border'"
            placeholder="در صورت خالی بودن به‌صورت خودکار ساخته می‌شود"
          />
          <p v-if="formErrors.slug" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.slug[0] }}</p>
        </div>

        <!-- تصویر مقاله -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">
            تصویر مقاله {{ isEditMode ? '' : '*' }}
          </label>
          <div
            class="w-full min-h-[140px] sm:h-[180px] border rounded-2xl flex flex-col sm:flex-row items-center justify-start gap-4 sm:gap-6 p-4 sm:px-6 bg-white/20 dark:bg-dark-input/20"
            :class="(formErrors.thumbnail || thumbnailError) ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'"
          >
            <img
              v-if="thumbnailPreview"
              :src="thumbnailPreview"
              class="w-[110px] h-[132px] sm:w-[136px] sm:h-[163px] object-cover rounded-[17px]"
            />
            <div v-else class="w-[110px] h-[132px] sm:w-[136px] sm:h-[163px] rounded-[17px] bg-gray-200 dark:bg-dark-input flex items-center justify-center text-xs text-gray-500 dark:text-dark-text-deep">
              بدون تصویر
            </div>

            <label
              class="bg-gray-300 dark:bg-dark-input px-6 py-2 rounded-xl text-sm font-bold dark:text-dark-text-deep"
              :class="isReadOnly ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'"
            >
              انتخاب تصویر
              <input type="file" accept=".jpg,.jpeg,.png,.webp" class="hidden" :disabled="isReadOnly" @change="onThumbnailChange" />
            </label>
          </div>
          <p class="text-xs text-gray-500 dark:text-dark-text mt-1">حداکثر حجم ۲ مگابایت، فرمت‌های مجاز: jpg, jpeg, png, webp (تصویر برای هر دو زبان مشترک است)</p>
          <p v-if="thumbnailError" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ thumbnailError }}</p>
          <p v-else-if="formErrors.thumbnail" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.thumbnail[0] }}</p>
        </div>

        <!-- متن جایگزین تصویر -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">متن جایگزین تصویر (Alt)</label>
            <input v-model="form.thumbnail_alt" type="text" class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border border-gray-300 dark:border-dark-border rounded-[17px] px-4 focus:outline-none dark:text-dark-text disabled:opacity-60 disabled:cursor-not-allowed" placeholder="تصویر مقاله" />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">متن جایگزین تصویر (Alt - English)</label>
            <input v-model="form.thumbnail_alt_en" type="text" dir="ltr" class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border border-gray-300 dark:border-dark-border rounded-[17px] px-4 focus:outline-none dark:text-dark-text font-roboto text-left disabled:opacity-60 disabled:cursor-not-allowed" placeholder="Article image" />
          </div>
        </div>

        <!-- ویرایشگر متن مقاله - فارسی -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">متن توضیحات مقاله *</label>
          <ClientOnly>
            <RichTextEditor
              v-model="form.content"
              dir="rtl"
              height="280px"
              :disabled="isReadOnly"
              :image-upload="uploadArticleImage"
            />
            <template #fallback>
              <div class="w-full h-[280px] bg-white/20 dark:bg-dark-input/20 border border-gray-300 dark:border-dark-border rounded-2xl flex items-center justify-center text-sm text-gray-400 dark:text-dark-text">
                در حال بارگذاری ویرایشگر...
              </div>
            </template>
          </ClientOnly>
          <p v-if="formErrors.content" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.content[0] }}</p>
        </div>

        <!-- جداکننده بخش انگلیسی -->
        <div class="flex items-center gap-3 my-1">
          <span class="flex-1 h-px bg-gray-300 dark:bg-dark-border"></span>
          <span class="text-[11px] text-gray-400 dark:text-dark-text font-roboto font-bold">ENGLISH CONTENT</span>
          <span class="flex-1 h-px bg-gray-300 dark:bg-dark-border"></span>
        </div>

        <!-- ویرایشگر متن مقاله - انگلیسی -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">متن توضیحات مقاله (English)</label>
          <ClientOnly>
            <RichTextEditor
              v-model="form.content_en"
              dir="ltr"
              height="280px"
              :disabled="isReadOnly"
              :image-upload="uploadArticleImage"
            />
            <template #fallback>
              <div class="w-full h-[280px] bg-white/20 dark:bg-dark-input/20 border border-gray-300 dark:border-dark-border rounded-2xl flex items-center justify-center text-sm text-gray-400 dark:text-dark-text">
                Loading editor...
              </div>
            </template>
          </ClientOnly>
          <p v-if="formErrors.content_en" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.content_en[0] }}</p>
        </div>

        <!-- فیلدهای سئو - فارسی -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">عنوان سئو</label>
            <input
              v-model="form.meta_title"
              type="text"
              class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border rounded-[17px] px-4 focus:outline-none dark:text-dark-text disabled:opacity-60 disabled:cursor-not-allowed"
              :class="formErrors.meta_title ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'"
            />
            <p v-if="formErrors.meta_title" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.meta_title[0] }}</p>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">توضیحات سئو</label>
            <input
              v-model="form.meta_description"
              type="text"
              class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border rounded-[17px] px-4 focus:outline-none dark:text-dark-text disabled:opacity-60 disabled:cursor-not-allowed"
              :class="formErrors.meta_description ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'"
            />
            <p v-if="formErrors.meta_description" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.meta_description[0] }}</p>
          </div>
        </div>

        <!-- فیلدهای سئو - انگلیسی -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">عنوان سئو (English)</label>
            <input
              v-model="form.meta_title_en"
              type="text"
              dir="ltr"
              class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border rounded-[17px] px-4 focus:outline-none dark:text-dark-text font-roboto text-left disabled:opacity-60 disabled:cursor-not-allowed"
              :class="formErrors.meta_title_en ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'"
            />
            <p v-if="formErrors.meta_title_en" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.meta_title_en[0] }}</p>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">توضیحات سئو (English)</label>
            <input
              v-model="form.meta_description_en"
              type="text"
              dir="ltr"
              class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border rounded-[17px] px-4 focus:outline-none dark:text-dark-text font-roboto text-left disabled:opacity-60 disabled:cursor-not-allowed"
              :class="formErrors.meta_description_en ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'"
            />
            <p v-if="formErrors.meta_description_en" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.meta_description_en[0] }}</p>
          </div>
        </div>

        <!-- وضعیت انتشار -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">وضعیت</label>
          <select
            v-model="form.status"
            class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border border-gray-300 dark:border-dark-border rounded-[17px] px-4 focus:outline-none text-black dark:text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <option value="published" class="text-black">منتشر شده</option>
            <option value="archived" class="text-black">آرشیو شده</option>
          </select>
        </div>

        <div v-if="!isReadOnly" class="flex justify-end">
          <button
            @click="saveArticle"
            :disabled="isSaving || isOffline"
            class="bg-[#286463] dark:bg-dark-accent text-white px-8 py-3 rounded-xl font-bold text-sm w-full sm:w-[150px] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <span v-if="isSaving">⏳ در حال ذخیره...</span>
            <span v-else-if="isOffline">📴 آفلاین</span>
            <span v-else>ذخیره مقاله</span>
          </button>
        </div>
      </fieldset>
    </div>
  </div>

  <!-- لیست مقالات -->
  <div v-else class="max-w-full lg:max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8" dir="rtl">

    <!-- بنر اطلاع‌رسانی حالت فقط-نمایش -->
    <div
      v-if="isReadOnly"
      class="mb-4 text-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 font-bold py-2 px-4 rounded-xl"
    >
      شما فقط دسترسی مشاهده دارید و امکان افزودن، ویرایش یا حذف مقاله وجود ندارد.
    </div>

    <div class="flex flex-row justify-between items-center mb-5 sm:mb-8 bg-white dark:bg-dark-surface rounded-full w-full h-[52px] sm:h-[60px] px-3 sm:px-4">
      <h1 class="text-base sm:text-lg lg:text-xl font-bold text-[#1a2333] dark:text-dark-text-deep">مقالات</h1>
      <button
        @click="openCreateForm"
        :disabled="isReadOnly"
        :title="isReadOnly ? 'شما فقط دسترسی مشاهده دارید' : ''"
        class="bg-[#67A9A880] dark:bg-dark-accent/60 px-3 sm:px-6 py-2 rounded-full font-bold flex items-center gap-2 text-[12px] sm:text-[14px] whitespace-nowrap dark:text-dark-text-deep disabled:opacity-50 disabled:cursor-not-allowed"
      >
        + افزودن مقاله
      </button>
    </div>

    <!-- حالت بارگذاری -->
    <div v-if="isLoadingList" class="flex flex-col items-center justify-center py-16 gap-3">
      <div class="w-8 h-8 border-4 border-gray-300 border-t-[#286463] dark:border-t-dark-accent rounded-full animate-spin"></div>
      <p class="text-sm text-gray-500 dark:text-dark-text">در حال بارگذاری مقالات...</p>
    </div>

    <!-- حالت خطا با امکان تلاش مجدد -->
    <div v-else-if="listError" class="flex flex-col items-center justify-center py-16 gap-4 text-center px-4">
      <p class="text-sm font-bold text-red-600 max-w-md">{{ listError }}</p>
      <button
        @click="retryFetchArticles"
        class="bg-[#286463] dark:bg-dark-accent text-white px-6 py-2 rounded-xl font-bold text-sm"
      >
        تلاش دوباره
      </button>
    </div>

    <!-- حالت خالی -->
    <div v-else-if="articles.length === 0" class="flex flex-col items-center justify-center py-16 gap-2 text-center">
      <span class="text-3xl">📄</span>
      <p class="text-sm text-gray-500 dark:text-dark-text">هنوز هیچ مقاله‌ای ثبت نشده است.</p>
      <button
        v-if="!isReadOnly"
        @click="openCreateForm"
        class="mt-2 text-sm font-bold text-[#286463] dark:text-dark-accent underline"
      >
        اولین مقاله را اضافه کنید
      </button>
    </div>

    <!-- کارت‌های مقاله -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-5 lg:gap-6">
      <div
        v-for="article in articles"
        :key="article.id"
        class="bg-white/20 dark:bg-dark-input/20 p-3 sm:p-5 lg:p-6 rounded-[16px] sm:rounded-[24px] lg:rounded-[30px] border border-gray-300 dark:border-dark-border shadow-sm flex flex-col sm:flex-row items-center gap-2 sm:gap-5 lg:gap-6 h-auto lg:h-[186px]"
      >
        <img :src="article.thumbnail" class="w-full h-[100px] sm:w-[110px] sm:h-[132px] lg:w-[136px] lg:h-[163px] object-cover rounded-xl sm:rounded-2xl shrink-0" />
        <div class="flex-1 w-full">
          <h3 class="font-bold text-[12px] sm:text-base lg:text-lg mb-1.5 sm:mb-3 lg:mb-4 line-clamp-2 dark:text-dark-text flex items-center gap-2">
            <span class="line-clamp-2">{{ article.title }}</span>
            <span
              v-if="article.title_en"
              class="shrink-0 text-[9px] px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-dark-input text-blue-500 dark:text-dark-text-deep font-medium font-roboto"
              title="دارای ترجمه انگلیسی"
            >EN</span>
          </h3>
          <div class="flex flex-col gap-1 sm:gap-2 text-gray-500 text-[10px] sm:text-sm">
            <span class="flex items-center gap-1 sm:gap-2 text-[#747893] dark:text-dark-text">
              <AdminIconsDateVector /> {{ formatDate(article) }}
            </span>
            <span class="flex items-center gap-1 sm:gap-2 text-[#747893] dark:text-dark-text">
              <AdminIconsEyeVector /> {{ article.views_count }} بازدید
            </span>
          </div>
        </div>

        <div class="flex gap-1.5 sm:gap-2 w-full sm:w-auto">
          <button
            @click="deleteArticle(article)"
            :disabled="deletingId === article.id || isReadOnly"
            :title="isReadOnly ? 'شما فقط دسترسی مشاهده دارید' : ''"
            class="flex-1 sm:flex-none sm:w-[85px] h-[26px] sm:h-[26px] bg-[#BFD1D5] dark:bg-dark-input rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 disabled:opacity-60 disabled:cursor-not-allowed dark:text-dark-text-deep"
          >
            <AdminIconsDelete /> {{ deletingId === article.id ? 'در حال حذف...' : 'حذف' }}
          </button>
          <button
            @click="openEditForm(article)"
            :disabled="isReadOnly"
            :title="isReadOnly ? 'شما فقط دسترسی مشاهده دارید' : ''"
            class="flex-1 sm:flex-none sm:w-[85px] h-[26px] sm:h-[26px] bg-[#BFD1D5] dark:bg-dark-input rounded-lg sm:rounded-[10px] text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 dark:text-dark-text-deep disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <AdminIconsEdit /> {{ isReadOnly ? 'مشاهده' : 'ویرایش' }}
          </button>
        </div>
      </div>
    </div>

    <!-- صفحه‌بندی -->
    <div v-if="!isLoadingList && !listError && totalPages > 1" class="flex justify-center sm:justify-end gap-2 mt-6 sm:mt-8">
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white dark:bg-dark-input border border-gray-300 dark:border-dark-border font-bold hover:bg-gray-50 dark:hover:bg-dark-input/70 disabled:opacity-50 dark:text-dark-text-deep">→</button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        dir="ltr"
        :class="['w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-bold border transition', currentPage === page ? 'bg-teal-800 dark:bg-dark-accent text-white' : 'bg-white dark:bg-dark-input border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-input/70 dark:text-dark-text-deep']"
      >
        {{ page }}
      </button>
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white dark:bg-dark-input border border-gray-300 dark:border-dark-border font-bold hover:bg-gray-50 dark:hover:bg-dark-input/70 disabled:opacity-50 dark:text-dark-text-deep">←</button>
    </div>
  </div>
</template>

<style scoped>
/* انیمیشن ورود/خروج Toast */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>