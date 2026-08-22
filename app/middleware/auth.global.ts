export default defineNuxtRouteMiddleware((to, from) => {
  // ۱. اگر در حال رفتن به مسیر ادمین هستید
  if (to.path.startsWith('/admin')) {

    if (import.meta.server) return

    const { initFromStorage, isLoggedIn } = useAdminAuth()
    initFromStorage()

    const loginPath = '/admin/ntt20119'
    const loggedIn = isLoggedIn()

    if (to.path !== loginPath && !loggedIn) {
      return navigateTo(loginPath)
    }

    if (to.path === loginPath && loggedIn) {
      return navigateTo('/admin')
    }
  }

  // تشخیص لوکیل انگلیسی از روی مسیر
  const isEnLocale = to.path.startsWith('/en')
  const localePrefix = isEnLocale ? '/en' : ''

  // ۳. برای صفحه درخواست پروژه (فرم order-request)
  if (to.path.startsWith('/order/requestProject') || to.path.startsWith('/en/order/requestProject')) {

    if (import.meta.server) return

    const { token, initAuth } = useAuth()
    initAuth()

    if (!token.value) {
      return navigateTo(`${localePrefix}/auth/login?redirect=${to.fullPath}`)
    }
  }

  // ۴. برای پروفایل کاربر عادی
  if (to.path.startsWith('/profile') && import.meta.client) {
    // اینجا منطق چک کردن توکن کاربر عادی را بگذارید
  }
})