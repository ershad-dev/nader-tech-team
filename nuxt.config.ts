export default defineNuxtConfig({
  compatibilityDate: '2026-06-06',
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/icon'
  ],

  i18n: {
    locales: [
      { code: 'fa', iso: 'fa-IR', name: 'Persian', dir: 'rtl', file: 'fa.json' },
      { code: 'en', iso: 'en-US', name: 'English', dir: 'ltr', file: 'en.json' }
    ],
    lazy: true,
    langDir: 'locales/', 
    defaultLocale: 'fa',
    strategy: 'prefix_except_default',
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  runtimeConfig: {
    public: {
      apiBase: 'https://nadertechnologyteam.ir/api'
    }
  }
})