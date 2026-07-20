import { ref } from 'vue'

/**
 * composable مشترک برای مدیریت سواپ لمسی روی اسلایدرهای موبایل
 *
 * چون چیدمان کارت‌ها (translate-x) در RTL به‌صورت خودکار mirror نمی‌شه،
 * کارت "بعدی" همیشه فیزیکاً سمت راست و کارت "قبلی" فیزیکاً سمت چپ قرار می‌گیره.
 * بنابراین منطق سواپ به همون شکل معمولی (بدون معکوس‌سازی اضافه) عمل می‌کنه:
 * - سواپ به چپ  -> nextSlide (کارت سمت راست میاد وسط)
 * - سواپ به راست -> prevSlide (کارت سمت چپ میاد وسط)
 *
 * @param {Function} onNext - تابعی که برای رفتن به اسلاید بعدی صدا زده می‌شه
 * @param {Function} onPrev - تابعی که برای رفتن به اسلاید قبلی صدا زده می‌شه
 * @param {number} threshold - حداقل فاصله‌ی سواپ به پیکسل (پیش‌فرض: ۴۰)
 * @returns {{ onTouchStart: Function, onTouchEnd: Function }}
 */
export function useSwipe(onNext, onPrev, threshold = 40) {
  const touchStartX = ref(0)
  const touchEndX = ref(0)

  const onTouchStart = (e) => {
    touchStartX.value = e.changedTouches[0].screenX
  }

  const onTouchEnd = (e) => {
    touchEndX.value = e.changedTouches[0].screenX
    handleSwipeGesture()
  }

  const handleSwipeGesture = () => {
    const diff = touchStartX.value - touchEndX.value
    if (Math.abs(diff) < threshold) return

    if (diff > 0) {
      // کشیدن به چپ -> اسلاید بعدی (فیزیکاً سمت راست)
      onNext()
    } else {
      // کشیدن به راست -> اسلاید قبلی (فیزیکاً سمت چپ)
      onPrev()
    }
  }

  return { onTouchStart, onTouchEnd }
}
