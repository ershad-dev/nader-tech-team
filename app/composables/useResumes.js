// ==================== شناسه‌های دسته‌بندی اصلی رزومه ====================
// این سه id مطابق /api/services هاردکد شدن، چون فیلد مشخصی برای تشخیص
// خودکار "دسته‌بندی اصلی رزومه" از بقیه‌ی سرویس‌ها وجود نداره.
// (دقیقاً همون id هایی که توی کامپوننت ادمین ResumeControl.vue هم استفاده شدن)
//   1  = طراحی سایت
//   8  = تولید محتوا
//   15 = برگزاری ایونت
// اگه بک‌اند بعداً یه راه تشخیص برنامه‌نویسی‌شده اضافه کرد، این باید حذف بشه.
export const RESUME_CATEGORY_IDS = {
  web: 1,
  content: 8,
  event: 15,
}

// لیست پروژه‌ها با فیلتر اختیاری بر اساس category_id
// categoryIdInput می‌تونه عدد ساده، null (یعنی همه)، یا ref/computed باشه
export const useResumes = (categoryIdInput = null) => {
  const config = useRuntimeConfig()
  const { locale } = useI18n()
  const categoryId = isRef(categoryIdInput) ? categoryIdInput : ref(categoryIdInput)

  const query = computed(() => {
    const q = { per_page: 100 }
    // فقط وقتی مقدار داریم پارامتر رو اضافه می‌کنیم؛ در غیر این صورت
    // (null / undefined) یعنی "مشاهده همه" و category_id اصلاً فرستاده نمی‌شه
    if (categoryId.value) q.category_id = categoryId.value
    return q
  })

  // بک‌اند بر اساس این هدر تصمیم می‌گیره فیلدهای متنی (title/description و...)
  // رو فارسی یا انگلیسی برگردونه. باید داخل key هم لحاظ بشه، وگرنه با سوییچ
  // زبان، Nuxt از کش قبلی (زبان قبلی) استفاده می‌کنه و دوباره فچ نمی‌زنه.
  const { data, pending, error, refresh } = useFetch('/resumes', {
    baseURL: config.public.apiBase,
    query,
    headers: computed(() => ({ 'X-Language': locale.value })),
    key: computed(() => `resumes-${categoryId.value || 'all'}-${locale.value}`),
    default: () => ({ data: [], meta: null }),
  })

  const items = computed(() => data.value?.data ?? [])
  const meta = computed(() => data.value?.meta ?? null)

  return { items, meta, pending, error, refresh }
}

// جزئیات یک پروژه بر اساس slug
export const useResume = (slug) => {
  const config = useRuntimeConfig()
  const { locale } = useI18n()

  const { data, pending, error, refresh } = useFetch(`/resumes/${slug}`, {
    baseURL: config.public.apiBase,
    headers: computed(() => ({ 'X-Language': locale.value })),
    key: computed(() => `resume-${slug}-${locale.value}`),
  })

  // پاسخ به‌صورت { data: {...} } میاد، اینجا باز می‌کنیم
  const resume = computed(() => data.value?.data ?? null)

  return { resume, pending, error, refresh }
}

// fallback به یه SVG خاکستری ساده - وابسته به هیچ فایلی توی /public نیست
const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
       <rect width="100%" height="100%" fill="#E5E7EB"/>
     </svg>`
  )

// عکس کاور برای آیتم‌های لیست (که شکل cover:{image,...} دارن)
export const resumeCover = (resume, fallback = FALLBACK_IMAGE) =>
  resume?.cover?.image || fallback

// عکس‌های صفحه‌ی جزئیات (که آرایه‌ی images:[{image,sort_order,alt}] دارن)
export const resumeImages = (resume, fallback = FALLBACK_IMAGE) => {
  const imgs = resume?.images
  if (!Array.isArray(imgs) || imgs.length === 0) return [fallback]
  return imgs
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((i) => i.image || fallback)
}