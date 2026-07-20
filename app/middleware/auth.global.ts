export default defineNuxtRouteMiddleware((to, from) => {
  // ۱. اگر در حال رفتن به مسیر ادمین هستید
  if (to.path.startsWith('/admin')) {

    // در سرور هدایت انجام نمی‌دهیم (چون localStorage روی سرور وجود ندارد)
    if (import.meta.server) return

    // ۲. در کلاینت (مرورگر) وضعیت لاگین را از composable مشترک می‌خوانیم
    const { initFromStorage, isLoggedIn } = useAdminAuth()
    initFromStorage() // بازیابی توکن از localStorage به state

    const loginPath = '/admin/ntt20119'
    const loggedIn = isLoggedIn()

    if (to.path !== loginPath && !loggedIn) {
      return navigateTo(loginPath)
    }

    if (to.path === loginPath && loggedIn) {
      return navigateTo('/admin')
    }
  }

  // ۳. برای صفحه درخواست پروژه (فرم order-request)
if (to.path.startsWith('/order/requestProject')) {

    if (import.meta.server) return

    const { token, initAuth } = useAuth()
    initAuth()

    if (!token.value) {
      return navigateTo(`/auth/login?redirect=${to.fullPath}`)
    }
  }

  // ۴. برای پروفایل کاربر عادی
  if (to.path.startsWith('/profile') && import.meta.client) {
    // اینجا منطق چک کردن توکن کاربر عادی را بگذارید
  }
})