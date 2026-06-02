// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-30',
  devtools: { enabled: true },
  
  // ۱. فعال‌سازی ماژول‌هایی که در package.json قرار دادیم
  modules: ['@nuxtjs/tailwindcss', //'@vueuse/nuxt'
  '@pinia/nuxt', '@vee-validate/nuxt'],

  // ۲. فعال‌سازی ساختار مدرن Nuxt 4 (پوشه app)
  future: {
    compatibilityVersion: 4,
  }
})