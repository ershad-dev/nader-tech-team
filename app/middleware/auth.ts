// middleware/auth.ts
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // همیشه اول چک کن که آیا توکن در کوکی هست یا نه
  authStore.checkPersistedAuth()

  // اگر لاگین است و می‌خواهد به صفحه لاگین برود -> برگردان به پروفایل
  if (authStore.isLoggedIn && to.path === '/auth/login') {
    return navigateTo('/profile')
  }

  // اگر لاگین نیست و می‌خواهد به صفحه پروفایل برود -> بفرست به لاگین
  if (!authStore.isLoggedIn && to.path.startsWith('/profile')) {
    return navigateTo('/auth/login')
  }
})