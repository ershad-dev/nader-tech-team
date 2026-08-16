// app/composables/useManualTranslation.js
// نسخه‌ی عمومیِ کامپوزبل ترجمه‌ی دستی — برای هر متن داینامیک بک‌اند
// تو کل سایت قابل استفاده‌ست (نظرات مشتری، عنوان پروژه‌ها، یا هر چیز دیگه‌ای).
// namespace: بخش json که ازش استفاده می‌کنی (مثلاً 'reviews', 'projects')
// id: شناسه‌ی پایدار همون آیتم از بک‌اند

export const useManualTranslation = (namespace) => {
  const { t, te } = useI18n()

  const storageKey = `nadertech_untranslated_${namespace}`

  const hasManualTranslation = (id, field) => {
    return te(`${namespace}.${id}.${field}`)
  }

  const getTranslated = (id, field, fallback) => {
    return hasManualTranslation(id, field)
      ? t(`${namespace}.${id}.${field}`)
      : fallback
  }

  // item باید حداقل یه id داشته باشه؛ fields آرایه‌ای از اسم فیلدهاییه که باید چک بشن
  const logMissingTranslation = (item, fields) => {
    if (typeof window === 'undefined') return

    const missing = fields.some((field) => !hasManualTranslation(item.id, field))
    if (!missing) return

    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '{}')
      const entry = {}
      fields.forEach((field) => { entry[field] = item[field] })
      stored[item.id] = entry
      localStorage.setItem(storageKey, JSON.stringify(stored))
    } catch (err) {
      // بی‌خیال، فقط یعنی این مورد رو بعداً دوباره لاگ می‌کنیم
    }
  }

  const exportMissingTranslations = () => {
    if (typeof window === 'undefined') return null
    const stored = JSON.parse(localStorage.getItem(storageKey) || '{}')
    console.log(JSON.stringify({ [namespace]: stored }, null, 2))
    return stored
  }

  const clearMissingTranslations = () => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(storageKey)
  }

  return {
    getTranslated,
    hasManualTranslation,
    logMissingTranslation,
    exportMissingTranslations,
    clearMissingTranslations,
  }
}