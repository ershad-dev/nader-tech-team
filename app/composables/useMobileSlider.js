import { ref, computed, unref } from 'vue'

/**
 * composable جامع برای اسلایدرهای کارتی (موبایل: کارت وسط + قبلی/بعدی نیم‌پیدا، دسکتاپ: چند کارت کنار هم)
 * شامل مدیریت ایندکس فعلی، لوپ چرخشی، next/prev، و سواپ لمسی برای موبایل.
 *
 * چون چیدمان کارت‌ها (translate-x) در RTL به‌صورت خودکار mirror نمی‌شه،
 * کارت "بعدی" همیشه فیزیکاً سمت راست و کارت "قبلی" فیزیکاً سمت چپ قرار می‌گیره،
 * بنابراین منطق سواپ به شکل معمولی (بدون معکوس‌سازی اضافه) عمل می‌کنه.
 *
 * @param {Ref<Array>|Array} items - آرایه‌ی آیتم‌ها؛ می‌تونه ref باشه (مثل خروجی useResumes) یا آرایه‌ی ساده
 * @param {Object} [options]
 * @param {number} [options.swipeThreshold=40] - حداقل فاصله‌ی سواپ به پیکسل
 * @param {number} [options.initialIndex=0] - ایندکس شروع
 * @param {Function} [options.onChange] - callback اختیاری که بعد از هر تغییر اسلاید صدا زده می‌شه: (index) => {}
 *
 * @returns {{
 *   currentSlide: Ref<number>,
 *   mobileVisibleItems: ComputedRef<{data:any,realIndex:number,pos:-1|0|1}[]>,
 *   visibleItems: (count:number|Ref<number>|(()=>number)) => ComputedRef<{data:any,realIndex:number}[]>,
 *   goToSlide: (index:number) => void,
 *   nextSlide: () => void,
 *   prevSlide: () => void,
 *   onTouchStart: (e:TouchEvent) => void,
 *   onTouchEnd: (e:TouchEvent) => void,
 * }}
 */
export function useMobileSlider(items, options = {}) {
  const { swipeThreshold = 40, initialIndex = 0, onChange = null } = options

  const currentSlide = ref(initialIndex)

  const getList = () => unref(items) || []
  const getTotal = () => getList().length
  const getItem = (idx) => getList()[idx]

  // کارت‌های قابل نمایش در موبایل: قبلی (pos=-1) - جاری (pos=0) - بعدی (pos=1)، با لوپ چرخشی
  const mobileVisibleItems = computed(() => {
    const total = getTotal()
    if (total === 0) return []
    const result = []
    for (let pos = -1; pos <= 1; pos++) {
      const idx = (currentSlide.value + pos + total) % total
      result.push({ data: getItem(idx), realIndex: idx, pos })
    }
    return result
  })

  // کارت‌های قابل نمایش در دسکتاپ/تبلت (N کارت پشت‌سرهم از ایندکس جاری)
  // count می‌تونه عدد ثابت، ref، یا تابع getter باشه (برای شمارش واکنش‌گرا مثل تعداد ستون‌های ریسپانسیو)
const visibleItems = (count) => computed(() => {
  const total = getTotal()
  if (total === 0) return []
  const rawCount = typeof count === 'function' ? count() : unref(count)
  // اگه تعداد کل آیتم‌ها کمتر از count باشه، جلوی تکرار realIndex (و در نتیجه key تکراری) رو می‌گیریم
  const resolvedCount = Math.min(rawCount, total)
  const result = []
  for (let i = 0; i < resolvedCount; i++) {
    const idx = (currentSlide.value + i) % total
    result.push({ data: getItem(idx), realIndex: idx })
  }
  return result
})

  const goToSlide = (index) => {
    const total = getTotal()
    if (total === 0) return
    currentSlide.value = ((index % total) + total) % total
    if (onChange) onChange(currentSlide.value)
  }

  const nextSlide = () => {
    if (getTotal() === 0) return
    goToSlide(currentSlide.value + 1)
  }

  const prevSlide = () => {
    if (getTotal() === 0) return
    goToSlide(currentSlide.value - 1)
  }

  // --- سواپ لمسی (موبایل) ---
  const touchStartX = ref(0)
  const touchEndX = ref(0)

  const onTouchStart = (e) => {
    touchStartX.value = e.changedTouches[0].screenX
  }

  const onTouchEnd = (e) => {
    touchEndX.value = e.changedTouches[0].screenX
    const diff = touchStartX.value - touchEndX.value
    if (Math.abs(diff) < swipeThreshold) return

    if (diff > 0) {
      // کشیدن به چپ -> اسلاید بعدی (فیزیکاً سمت راست)
      nextSlide()
    } else {
      // کشیدن به راست -> اسلاید قبلی (فیزیکاً سمت چپ)
      prevSlide()
    }
  }

  return {
    currentSlide,
    mobileVisibleItems,
    visibleItems,
    goToSlide,
    nextSlide,
    prevSlide,
    onTouchStart,
    onTouchEnd,
  }
}
