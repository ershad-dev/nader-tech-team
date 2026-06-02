// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isLoggedIn: false
  }),

  getters: {
    getUserName: (state) => state.user?.name || 'کاربر مهمان',
  },

  actions: {
    // بازیابی وضعیت کاربر از کوکی‌ها هنگام رفرش صفحه
    checkPersistedAuth() {
      const userCookie = useCookie('user_data')
      const tokenCookie = useCookie('auth_token')

      if (tokenCookie.value && userCookie.value) {
        this.token = tokenCookie.value
        this.user = userCookie.value
        this.isLoggedIn = true
      }
    },

    // عملیات لاگین
    loginUser(userData, tokenData) {
      this.user = userData
      this.token = tokenData
      this.isLoggedIn = true

      // ذخیره در کوکی‌های ماندگار (۷ روز)
      useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7 }).value = tokenData
      useCookie('user_data', { maxAge: 60 * 60 * 24 * 7 }).value = userData
    },

    // عملیات ثبت‌نام
    registerUser(userData, tokenData) {
      this.user = userData
      this.token = tokenData
      this.isLoggedIn = true

      useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7 }).value = tokenData
      useCookie('user_data', { maxAge: 60 * 60 * 24 * 7 }).value = userData
    },

    // عملیات خروج از حساب
    logoutUser() {
      this.user = null
      this.token = null
      this.isLoggedIn = false
      
      // پاک کردن کوکی‌ها
      useCookie('auth_token').value = null
      useCookie('user_data').value = null
      
      navigateTo('/auth/login')
    }
  }
})