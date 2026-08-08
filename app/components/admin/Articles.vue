<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAdminAuth } from '@/composables/useAdminAuth'; // مسیر را مطابق پروژه تنظیم کنید

// Tiptap
import { EditorContent, useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

/* ---------------------------------------------------------
   تنظیمات پایه‌ی API + احراز هویت
--------------------------------------------------------- */
const API_BASE = 'https://nadertechnologyteam.ir/api/admin/articles';
// اندپوینت آپلود تصویر داخل متن مقاله (جدا از تصویر شاخص/thumbnail)
// ⚠️ این آدرس را مطابق روت واقعی سمت Laravel خودتان اصلاح کنید
const IMAGE_UPLOAD_URL = 'https://nadertechnologyteam.ir/api/admin/articles/upload-image';

const { initFromStorage, authHeader, clearAuth } = useAdminAuth();

// در سمت کلاینت، توکن را از localStorage بازیابی کن (بعد از رفرش صفحه)
if (import.meta.client) initFromStorage();

/* ===========================================================
   سیستم متمرکز مدیریت خطا + Toast (اعلان)
   هدف: هر خطایی که رخ می‌دهد باید برای کاربر قابل‌فهم،
   دقیق و قابل‌اقدام باشد؛ نه یک پیام مبهم فنی.
=========================================================== */

// وضعیت آنلاین/آفلاین بودن مرورگر
const isOffline = ref(import.meta.client ? !navigator.onLine : false);
function handleOnline() { isOffline.value = false; }
function handleOffline() { isOffline.value = true; }

// صف اعلان‌های Toast
const toasts = ref([]);
let toastSeq = 0;

function showToast(type, message, duration) {
  const id = ++toastSeq;
  const finalDuration = duration ?? (type === 'error' ? 7000 : type === 'warning' ? 5500 : 3500);
  toasts.value.push({ id, type, message });
  if (import.meta.client) {
    setTimeout(() => dismissToast(id), finalDuration);
  }
  return id;
}
function dismissToast(id) {
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

/**
 * تبدیل هر نوع خطای دریافتی از $fetch/axios/네‌شبکه به یک پیام فارسیِ روشن.
 * context: توضیح کوتاه از عملیاتی که در حال انجام بود (برای دقیق‌تر شدن پیام)
 */
function getErrorMessage(err, context = '') {
  // ۱. عدم اتصال به اینترنت (شناسایی‌شده توسط مرورگر)
  if (import.meta.client && !navigator.onLine) {
    return 'اتصال اینترنت شما برقرار نیست. لطفاً اتصال خود را بررسی و دوباره تلاش کنید.';
  }

  const status = err?.response?.status ?? err?.statusCode ?? err?.status ?? null;
  const body = err?.response?._data ?? err?.data ?? null;

  // ۲. هیچ status ای برنگشته یعنی اصلاً درخواست به سرور نرسیده (قطعی سرور، DNS، CORS، تایم‌اوت)
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

/** آیا خطا به‌دلیل منقضی‌شدن نشست است؟ اگر بله، کاربر به لاگین هدایت می‌شود. */
function isUnauthorized(err) {
  const status = err?.response?.status ?? err?.statusCode ?? err?.status;
  return status === 401;
}

function handleUnauthorized() {
  showToast('error', 'نشست شما منقضی شده است. در حال انتقال به صفحه ورود...');
  clearAuth();
  if (import.meta.client) {
    setTimeout(() => navigateTo('/admin/login'), 1200); // مسیر صفحه‌ی لاگین را مطابق پروژه تنظیم کنید
  }
}

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

function retryFetchArticles() {
  fetchArticles(currentPage.value);
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
const thumbnailError = ref('');        // خطای اعتبارسنجی سمت کلاینت برای تصویر شاخص

const isSaving = ref(false);
const formErrors = ref({});
const formErrorMessage = ref('');

// خلاصه‌ی متنیِ همه‌ی خطاهای اعتبارسنجی، برای نمایش در یک بنر بالای فرم
const formErrorSummary = computed(() => {
  const entries = Object.entries(formErrors.value || {});
  if (!entries.length) return [];
  return entries.map(([field, messages]) => ({
    field,
    label: fieldLabel(field),
    message: Array.isArray(messages) ? messages[0] : String(messages),
  }));
});

function fieldLabel(field) {
  const map = {
    title: 'نام مقاله',
    slug: 'نامک (Slug)',
    content: 'متن توضیحات مقاله',
    thumbnail: 'تصویر مقاله',
    thumbnail_alt: 'متن جایگزین تصویر',
    meta_title: 'عنوان سئو',
    meta_description: 'توضیحات سئو',
    status: 'وضعیت',
  };
  return map[field] || field;
}

/* ---------------------------------------------------------
   Tiptap Editor
--------------------------------------------------------- */
const editor = useEditor({
  content: '',
  extensions: [
    StarterKit,
    Underline,
    Link.configure({ openOnClick: false, autolink: true }),
    Image,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
  ],
  onUpdate: ({ editor }) => {
    form.content = editor.getHTML();
  },
  editorProps: {
    attributes: {
      class: 'prose max-w-none focus:outline-none min-h-[180px] sm:min-h-[250px] p-4 dark:text-dark-text',
      dir: 'rtl',
    },
  },
});

onBeforeUnmount(() => {
  editor.value?.destroy();
  if (import.meta.client) {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  }
});

function setLink() {
  if (!editor.value) return;
  const previousUrl = editor.value.getAttributes('link').href;
  const url = window.prompt('آدرس لینک را وارد کنید:', previousUrl || 'https://');
  if (url === null) return; // کاربر لغو کرد

  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }

  // اعتبارسنجی ساده‌ی آدرس برای جلوگیری از لینک‌های خراب/ناقص
  try {
    // اگر پروتکل نداشته باشد، تست new URL خطا می‌دهد؛ در آن صورت https اضافه می‌کنیم
    const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    new URL(normalized);
    editor.value.chain().focus().extendMarkRange('link').setLink({ href: normalized }).run();
  } catch {
    showToast('error', 'آدرس لینک واردشده معتبر نیست. لطفاً یک URL صحیح مانند https://example.com وارد کنید.');
  }
}

/* ---------------------------------------------------------
   آپلود تصویر داخل متن مقاله (Tiptap Image Extension)
--------------------------------------------------------- */
const contentImageInput = ref(null); // ref روی input فایل مخفی
const isUploadingImage = ref(false);
const imageUploadError = ref('');

const MAX_IMAGE_SIZE_MB = 5;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_IMAGE_TYPES_LABEL = 'jpg, jpeg, png, webp, gif';

function triggerImageUpload() {
  if (isUploadingImage.value) return; // از کلیک تکراری حین آپلود جلوگیری می‌کند
  imageUploadError.value = '';
  contentImageInput.value?.click();
}

async function onContentImageSelected(e) {
  const file = e.target.files?.[0];
  // اجازه می‌دهیم input بعداً همان فایل را دوباره انتخاب کند
  e.target.value = '';
  if (!file) return;

  imageUploadError.value = '';

  if (import.meta.client && !navigator.onLine) {
    imageUploadError.value = 'اتصال اینترنت برقرار نیست؛ برای آپلود تصویر باید آنلاین باشید.';
    return;
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    imageUploadError.value = `فرمت «${file.type || 'نامشخص'}» مجاز نیست. فرمت‌های مجاز: ${ALLOWED_IMAGE_TYPES_LABEL}`;
    return;
  }
  if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    imageUploadError.value = `حجم تصویر (${sizeMb} مگابایت) بیشتر از حد مجاز (${MAX_IMAGE_SIZE_MB} مگابایت) است.`;
    return;
  }

  // پیش‌نمایش موقت و فوری با blob محلی، تا زمانی که آپلود واقعی تمام شود
  const localPreviewUrl = URL.createObjectURL(file);
  if (!editor.value) return;

  editor.value.chain().focus().setImage({ src: localPreviewUrl, alt: file.name }).run();

  isUploadingImage.value = true;
  try {
    const fd = new FormData();
    fd.append('image', file);

    const res = await $fetch(IMAGE_UPLOAD_URL, {
      method: 'POST',
      headers: { Accept: 'application/json', ...authHeader() },
      body: fd,
    });

    // انتظار می‌رود بک‌اند یک آدرس عمومی مثل { url: '...' } برگرداند
    const uploadedUrl = res?.url || res?.data?.url;
    if (!uploadedUrl) {
      throw { __custom: true, message: 'پاسخ سرور معتبر نبود (فیلد url در پاسخ آپلود یافت نشد).' };
    }

    // جایگزینی src موقت با آدرس نهاییِ برگشتی از سرور
    replaceImageSrcInEditor(localPreviewUrl, uploadedUrl);
  } catch (err) {
    if (isUnauthorized(err)) {
      removeImageFromEditorBySrc(localPreviewUrl);
      handleUnauthorized();
      return;
    }
    imageUploadError.value = err?.__custom
      ? err.message
      : getErrorMessage(err, 'آپلود تصویر');
    // در صورت خطا، تصویر موقت را از متن حذف می‌کنیم تا لینک شکسته باقی نماند
    removeImageFromEditorBySrc(localPreviewUrl);
  } finally {
    isUploadingImage.value = false;
    URL.revokeObjectURL(localPreviewUrl);
  }
}

// جایگزین کردن src یک تصویر خاص در سند Tiptap (برای سوییچ از blob محلی به URL نهایی)
function replaceImageSrcInEditor(oldSrc, newSrc) {
  if (!editor.value) return;
  const { state, view } = editor.value;
  const { tr, doc } = state;
  doc.descendants((node, pos) => {
    if (node.type.name === 'image' && node.attrs.src === oldSrc) {
      tr.setNodeMarkup(pos, undefined, { ...node.attrs, src: newSrc });
    }
  });
  view.dispatch(tr);
}

// حذف یک تصویر خاص از سند Tiptap با src (برای حالت خطا در آپلود)
function removeImageFromEditorBySrc(src) {
  if (!editor.value) return;
  const { state, view } = editor.value;
  const { tr, doc } = state;
  const positions = [];
  doc.descendants((node, pos) => {
    if (node.type.name === 'image' && node.attrs.src === src) {
      positions.push(pos);
    }
  });
  // از انتها حذف می‌کنیم تا موقعیت‌ها جابه‌جا نشوند
  positions.reverse().forEach((pos) => {
    tr.delete(pos, pos + 1);
  });
  view.dispatch(tr);
}

function openCreateForm() {
  Object.assign(form, emptyForm());
  thumbnailFile.value = null;
  thumbnailPreview.value = '';
  thumbnailError.value = '';
  formErrors.value = {};
  formErrorMessage.value = '';
  imageUploadError.value = '';
  isFormVisible.value = true;
  editor.value?.commands.setContent('');
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
  thumbnailError.value = '';
  formErrors.value = {};
  formErrorMessage.value = '';
  imageUploadError.value = '';
  isFormVisible.value = true;
  editor.value?.commands.setContent(article.content || '');
}

const THUMBNAIL_MAX_MB = 2;
const THUMBNAIL_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function onThumbnailChange(e) {
  const file = e.target.files?.[0];
  e.target.value = ''; // امکان انتخاب دوباره‌ی همان فایل را می‌دهد
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
  formErrors.value = {};
  formErrorMessage.value = '';

  // ولیدیشن ساده‌ی سمت کلاینت طبق فیلدهای اجباری API — پیام‌های دقیق و مجزا
  const clientErrors = {};
  if (!form.title?.trim()) clientErrors.title = ['نام مقاله را وارد کنید.'];
  if (!form.content || form.content === '<p></p>') clientErrors.content = ['متن توضیحات مقاله نمی‌تواند خالی باشد.'];
  if (!isEditMode.value && !thumbnailFile.value) clientErrors.thumbnail = ['برای مقاله‌ی جدید انتخاب تصویر الزامی است.'];
  if (thumbnailError.value) clientErrors.thumbnail = [thumbnailError.value];

  if (Object.keys(clientErrors).length) {
    formErrors.value = clientErrors;
    formErrorMessage.value = 'لطفاً موارد مشخص‌شده در فرم را تکمیل یا اصلاح کنید.';
    // اسکرول به بالای فرم تا کاربر بنر خطا را ببیند
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
      // در Laravel برای ارسال FormData با متد PUT از method-spoofing استفاده می‌شود
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

/* ---------------------------------------------------------
   حذف مقاله
--------------------------------------------------------- */
const deletingId = ref(null);

async function deleteArticle(article) {
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

    // اگر آخرین آیتم صفحه حذف شد و صفحه خالی از قلم افتاد، یک صفحه برگرد
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

onMounted(() => {
  fetchArticles();
  if (import.meta.client) {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
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

  <!-- ۱. فرم افزودن/ویرایش مقاله -->
  <div v-if="isFormVisible" class="max-w-full lg:max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8" dir="rtl">
    <button @click="isFormVisible = false" class="mb-4 text-sm font-bold text-gray-500 dark:text-dark-text">بازگشت ← </button>

    <div class="bg-[#ECEDF4] dark:bg-dark-surface p-4 sm:p-6 lg:p-8 rounded-[20px] sm:rounded-[24px] lg:rounded-[30px]">
      <h2 class="text-lg sm:text-xl font-bold mb-5 sm:mb-8 text-[#1a2333] dark:text-dark-text">
        {{ isEditMode ? 'ویرایش مقاله' : 'افزودن مقاله' }}
      </h2>

      <!-- بنر خلاصه‌ی خطاهای فرم -->
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

      <div class="space-y-4 sm:space-y-6">
        <!-- نام مقاله -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">نام مقاله *</label>
          <input
            v-model="form.title"
            type="text"
            class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border rounded-[17px] px-4 focus:outline-none dark:text-dark-text"
            :class="formErrors.title ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-dark-border'"
            placeholder="تفاوت طراحی سایت اختصاصی با قالب آماده"
          />
          <p v-if="formErrors.title" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.title[0] }}</p>
        </div>

        <!-- نامک (slug) -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">نامک (Slug)</label>
          <input
            v-model="form.slug"
            type="text"
            class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border rounded-[17px] px-4 focus:outline-none dark:text-dark-text"
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

            <label class="bg-gray-300 dark:bg-dark-input px-6 py-2 rounded-xl text-sm font-bold cursor-pointer dark:text-dark-text-deep">
              انتخاب تصویر
              <input type="file" accept=".jpg,.jpeg,.png,.webp" class="hidden" @change="onThumbnailChange" />
            </label>
          </div>
          <p class="text-xs text-gray-500 dark:text-dark-text mt-1">حداکثر حجم ۲ مگابایت، فرمت‌های مجاز: jpg, jpeg, png, webp</p>
          <p v-if="thumbnailError" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ thumbnailError }}</p>
          <p v-else-if="formErrors.thumbnail" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.thumbnail[0] }}</p>
        </div>

        <!-- متن جایگزین تصویر -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">متن جایگزین تصویر (Alt)</label>
          <input v-model="form.thumbnail_alt" type="text" class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border border-gray-300 dark:border-dark-border rounded-[17px] px-4 focus:outline-none dark:text-dark-text" placeholder="تصویر مقاله" />
        </div>

        <!-- متن توضیحات مقاله (Tiptap) -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">متن توضیحات مقاله *</label>

          <ClientOnly>
            <div
              class="w-full bg-white/20 dark:bg-dark-input/20 border rounded-2xl overflow-hidden"
              :class="formErrors.content ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'"
            >
              <!-- Toolbar -->
              <div v-if="editor" class="flex flex-wrap items-center gap-1 border-b border-gray-300 dark:border-dark-border p-2">
                <button type="button" @click="editor.chain().focus().toggleBold().run()" :class="{ 'bg-gray-300 dark:bg-dark-input': editor.isActive('bold') }" class="px-2.5 py-1 rounded-lg text-sm font-bold dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">B</button>
                <button type="button" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'bg-gray-300 dark:bg-dark-input': editor.isActive('italic') }" class="px-2.5 py-1 rounded-lg text-sm italic dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">I</button>
                <button type="button" @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'bg-gray-300 dark:bg-dark-input': editor.isActive('underline') }" class="px-2.5 py-1 rounded-lg text-sm underline dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">U</button>
                <button type="button" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'bg-gray-300 dark:bg-dark-input': editor.isActive('strike') }" class="px-2.5 py-1 rounded-lg text-sm line-through dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">S</button>

                <span class="w-px h-5 bg-gray-300 dark:bg-dark-border mx-1"></span>

                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'bg-gray-300 dark:bg-dark-input': editor.isActive('heading', { level: 2 }) }" class="px-2.5 py-1 rounded-lg text-sm font-bold dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">H2</button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'bg-gray-300 dark:bg-dark-input': editor.isActive('heading', { level: 3 }) }" class="px-2.5 py-1 rounded-lg text-sm font-bold dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">H3</button>
                <button type="button" @click="editor.chain().focus().setParagraph().run()" :class="{ 'bg-gray-300 dark:bg-dark-input': editor.isActive('paragraph') }" class="px-2.5 py-1 rounded-lg text-sm dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">متن</button>

                <span class="w-px h-5 bg-gray-300 dark:bg-dark-border mx-1"></span>

                <button type="button" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'bg-gray-300 dark:bg-dark-input': editor.isActive('bulletList') }" class="px-2.5 py-1 rounded-lg text-sm dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">• لیست</button>
                <button type="button" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'bg-gray-300 dark:bg-dark-input': editor.isActive('orderedList') }" class="px-2.5 py-1 rounded-lg text-sm dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">۱. لیست</button>
                <button type="button" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'bg-gray-300 dark:bg-dark-input': editor.isActive('blockquote') }" class="px-2.5 py-1 rounded-lg text-sm dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">نقل‌قول</button>

                <span class="w-px h-5 bg-gray-300 dark:bg-dark-border mx-1"></span>

                <button type="button" @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'bg-gray-300 dark:bg-dark-input': editor.isActive({ textAlign: 'right' }) }" class="px-2.5 py-1 rounded-lg text-sm dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">راست</button>
                <button type="button" @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'bg-gray-300 dark:bg-dark-input': editor.isActive({ textAlign: 'center' }) }" class="px-2.5 py-1 rounded-lg text-sm dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">وسط</button>
                <button type="button" @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'bg-gray-300 dark:bg-dark-input': editor.isActive({ textAlign: 'left' }) }" class="px-2.5 py-1 rounded-lg text-sm dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">چپ</button>

                <span class="w-px h-5 bg-gray-300 dark:bg-dark-border mx-1"></span>

                <button type="button" @click="setLink" :class="{ 'bg-gray-300 dark:bg-dark-input': editor.isActive('link') }" class="px-2.5 py-1 rounded-lg text-sm dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">لینک</button>

                <!-- دکمه‌ی درج تصویر داخل متن -->
                <button
                  type="button"
                  @click="triggerImageUpload"
                  :disabled="isUploadingImage"
                  class="px-2.5 py-1 rounded-lg text-sm dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70 disabled:opacity-50 flex items-center gap-1"
                >
                  <span v-if="isUploadingImage">⏳ در حال آپلود...</span>
                  <span v-else>🖼 تصویر</span>
                </button>
                <input
                  ref="contentImageInput"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  class="hidden"
                  @change="onContentImageSelected"
                />

                <span class="w-px h-5 bg-gray-300 dark:bg-dark-border mx-1"></span>

                <button type="button" @click="editor.chain().focus().undo().run()" class="px-2.5 py-1 rounded-lg text-sm dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">↩</button>
                <button type="button" @click="editor.chain().focus().redo().run()" class="px-2.5 py-1 rounded-lg text-sm dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-input/70">↪</button>
              </div>

              <!-- Editor Content -->
              <EditorContent :editor="editor" class="min-h-[180px] sm:min-h-[250px]" />
            </div>

            <!-- Fallback هنگام SSR -->
            <template #fallback>
              <div class="w-full h-[180px] sm:h-[250px] bg-white/20 dark:bg-dark-input/20 border border-gray-300 dark:border-dark-border rounded-2xl flex items-center justify-center text-sm text-gray-400 dark:text-dark-text">
                در حال بارگذاری ویرایشگر...
              </div>
            </template>
          </ClientOnly>

          <p v-if="imageUploadError" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ imageUploadError }}</p>
          <p v-if="formErrors.content" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.content[0] }}</p>
        </div>

        <!-- سئو (اختیاری) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">عنوان سئو</label>
            <input
              v-model="form.meta_title"
              type="text"
              class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border rounded-[17px] px-4 focus:outline-none dark:text-dark-text"
              :class="formErrors.meta_title ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'"
            />
            <p v-if="formErrors.meta_title" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.meta_title[0] }}</p>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">توضیحات سئو</label>
            <input
              v-model="form.meta_description"
              type="text"
              class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border rounded-[17px] px-4 focus:outline-none dark:text-dark-text"
              :class="formErrors.meta_description ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'"
            />
            <p v-if="formErrors.meta_description" class="text-xs text-red-600 mt-1 flex items-center gap-1">⛔ {{ formErrors.meta_description[0] }}</p>
          </div>
        </div>

        <!-- وضعیت انتشار -->
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700 dark:text-dark-text">وضعیت</label>
          <select v-model="form.status" class="w-full h-[46px] sm:h-[50px] bg-white/20 dark:bg-dark-input/20 border border-gray-300 dark:border-dark-border rounded-[17px] px-4 focus:outline-none dark:text-black">
            <option value="draft">پیش‌نویس</option>
            <option value="published">منتشر شده</option>
            <option value="archived">آرشیو شده</option>
          </select>
        </div>

        <div class="flex justify-end">
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
      </div>
    </div>
  </div>

  <!-- ۲. لیست مقالات -->
  <div v-else class="max-w-full lg:max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8" dir="rtl">

    <div class="flex flex-row justify-between items-center mb-5 sm:mb-8 bg-white dark:bg-dark-surface rounded-full w-full h-[52px] sm:h-[60px] px-3 sm:px-4">
      <h1 class="text-base sm:text-lg lg:text-xl font-bold text-[#1a2333] dark:text-dark-text-deep">مقالات</h1>
      <button @click="openCreateForm" class="bg-[#67A9A880] dark:bg-dark-accent/60 px-3 sm:px-6 py-2 rounded-full font-bold flex items-center gap-2 text-[12px] sm:text-[14px] whitespace-nowrap dark:text-dark-text-deep">
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
      <span class="text-3xl">⛔</span>
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
      <button @click="openCreateForm" class="mt-2 text-sm font-bold text-[#286463] dark:text-dark-accent underline">
        اولین مقاله را اضافه کنید
      </button>
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-5 lg:gap-6">
      <div
        v-for="article in articles"
        :key="article.id"
        class="bg-white/20 dark:bg-dark-input/20 p-3 sm:p-5 lg:p-6 rounded-[16px] sm:rounded-[24px] lg:rounded-[30px] border border-gray-300 dark:border-dark-border shadow-sm flex flex-col sm:flex-row items-center gap-2 sm:gap-5 lg:gap-6 h-auto lg:h-[186px]"
      >
        <img :src="article.thumbnail" class="w-full h-[100px] sm:w-[110px] sm:h-[132px] lg:w-[136px] lg:h-[163px] object-cover rounded-xl sm:rounded-2xl shrink-0" />
        <div class="flex-1 w-full">
          <h3 class="font-bold text-[12px] sm:text-base lg:text-lg mb-1.5 sm:mb-3 lg:mb-4 line-clamp-2 dark:text-dark-text">{{ article.title }}</h3>
          <div class="flex flex-col gap-1 sm:gap-2 text-gray-500 text-[10px] sm:text-sm">
            <span class="flex items-center gap-1 sm:gap-2 text-[#747893] dark:text-dark-text">
              <AdminIconsDateVector /> {{ formatDate(article.created_at) }}
            </span>
            <span class="flex items-center gap-1 sm:gap-2 text-[#747893] dark:text-dark-text">
              <AdminIconsEyeVector /> {{ article.views_count }} بازدید
            </span>
          </div>
        </div>

        <div class="flex gap-1.5 sm:gap-2 w-full sm:w-auto">
          <button
            @click="deleteArticle(article)"
            :disabled="deletingId === article.id"
            class="flex-1 sm:flex-none sm:w-[85px] h-[26px] sm:h-[26px] bg-[#BFD1D5] dark:bg-dark-input rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 disabled:opacity-60 dark:text-dark-text-deep"
          >
            <AdminIconsDelete /> {{ deletingId === article.id ? 'در حال حذف...' : 'حذف' }}
          </button>
          <button
            @click="openEditForm(article)"
            class="flex-1 sm:flex-none sm:w-[85px] h-[26px] sm:h-[26px] bg-[#BFD1D5] dark:bg-dark-input rounded-lg sm:rounded-[10px] text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1 dark:text-dark-text-deep"
          >
            <AdminIconsEdit /> ویرایش
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

<style>
/* استایل پایه‌ی محتوای Tiptap - در صورت نداشتن پلاگین @tailwindcss/typography لازم است */
.ProseMirror {
  outline: none;
}
.ProseMirror p {
  margin: 0.5em 0;
}
.ProseMirror h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.8em 0 0.4em;
}
.ProseMirror h3 {
  font-size: 1.25em;
  font-weight: bold;
  margin: 0.8em 0 0.4em;
}
.ProseMirror ul,
.ProseMirror ol {
  padding-inline-start: 1.5em;
  margin: 0.5em 0;
}
.ProseMirror ul {
  list-style: disc;
}
.ProseMirror ol {
  list-style: decimal;
}
.ProseMirror blockquote {
  border-inline-start: 3px solid #94a3b8;
  padding-inline-start: 1em;
  margin: 0.8em 0;
  color: #64748b;
}
.ProseMirror a {
  color: #286463;
  text-decoration: underline;
}
.ProseMirror img {
  max-width: 100%;
  border-radius: 8px;
}

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