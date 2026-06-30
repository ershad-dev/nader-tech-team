export default defineNuxtRouteMiddleware((to, from) => {
  // ۱. اگر در حال رفتن به مسیر ادمین هستید
  if (to.path.startsWith('/admin')) {
    
    // اگر در سرور هستیم، اجازه دهید صفحه لود شود (یا لاجیک پیچیده‌تر سرور)
    // برای جلوگیری از ارور، در سرور هدایت انجام نمی‌دهیم
    if (process.server) return

    // ۲. در کلاینت (مرورگر) چک می‌کنیم
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'
    const loginPath = '/admin/ntt20119'

    if (to.path !== loginPath && !isAdminLoggedIn) {
      return navigateTo(loginPath)
    }

    if (to.path === loginPath && isAdminLoggedIn) {
      return navigateTo('/admin')
    }
  }

  // ۳. برای پروفایل کاربر عادی
  if (to.path.startsWith('/profile') && process.client) {
     // اینجا منطق چک کردن توکن کاربر عادی را بگذارید
  }
})