// composables/useAdminAuth.js
// مدیریت متمرکز توکن و اطلاعات ادمین لاگین‌شده
// از useState نوکس استفاده می‌کنه (نیازی به نصب Pinia نیست) + localStorage برای ماندگاری بعد از رفرش

export const useAdminAuth = () => {
  const token = useState('admin_token', () => null)
  const admin = useState('admin_info', () => null)

  // در سمت کلاینت، موقع اولین استفاده، توکن رو از localStorage بازیابی کن
  const initFromStorage = () => {
    if (import.meta.client && !token.value) {
      const storedToken = localStorage.getItem('admin_access_token')
      const storedAdmin = localStorage.getItem('admin_info')
      if (storedToken) token.value = storedToken
      if (storedAdmin) {
        try {
          admin.value = JSON.parse(storedAdmin)
        } catch {
          admin.value = null
        }
      }
    }
  }

  const setAuth = (accessToken, adminData) => {
    token.value = accessToken
    admin.value = adminData
    if (import.meta.client) {
      localStorage.setItem('admin_access_token', accessToken)
      localStorage.setItem('admin_info', JSON.stringify(adminData))
    }
  }

  const clearAuth = () => {
    token.value = null
    admin.value = null
    if (import.meta.client) {
      localStorage.removeItem('admin_access_token')
      localStorage.removeItem('admin_info')
    }
  }

  const isLoggedIn = () => !!token.value

  // هدر آماده برای استفاده در $fetch های بعدی (مثلاً گرفتن لیست کاربران)
  const authHeader = () => {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }

  return {
    token,
    admin,
    initFromStorage,
    setAuth,
    clearAuth,
    isLoggedIn,
    authHeader,
  }
}
