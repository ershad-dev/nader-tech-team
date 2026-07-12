// لیست پروژه‌ها با فیلتر اختیاری بر اساس category ('web' | 'content')
export const useResumes = (categoryInput = null) => {
  const config = useRuntimeConfig()
  const category = isRef(categoryInput) ? categoryInput : ref(categoryInput)

  const query = computed(() => {
    const q = { per_page: 100 }
    if (category.value) q.category = category.value
    return q
  })

  const { data, pending, error, refresh } = useFetch('/resumes', {
    baseURL: config.public.apiBase,
    query,
    key: computed(() => `resumes-${category.value || 'all'}`),
    default: () => ({ data: [], meta: null }),
  })

  const items = computed(() => data.value?.data ?? [])
  const meta = computed(() => data.value?.meta ?? null)

  return { items, meta, pending, error, refresh }
}

// جزئیات یک پروژه بر اساس slug
export const useResume = (slug) => {
  const config = useRuntimeConfig()

  const { data, pending, error, refresh } = useFetch(`/resumes/${slug}`, {
    baseURL: config.public.apiBase,
    key: `resume-${slug}`,
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