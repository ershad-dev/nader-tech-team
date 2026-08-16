export default defineNuxtConfig({
  ssr: false,
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
    {
      code: 'fa',
      iso: 'fa-IR',
      name: 'Persian',
      dir: 'rtl',
      files: [
        'fa/common.json',
        'fa/footer.json',
        'fa/home.json',
        'fa/order.json',
        'fa/about.json',
        'fa/faq.json',
        'fa/articles.json',
        'fa/auth.json',
        'fa/events.json',
        'fa/profile.json',
        'fa/portfolio.json',
        'fa/terms.json',
        'fa/reviews.json'
      ]
    },
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
      dir: 'ltr',
      files: [
        'en/common.json',
        'en/footer.json',
        'en/home.json',
        'en/order.json',
        'en/about.json',
        'en/faq.json',
        'en/articles.json',
        'en/auth.json',
        'en/events.json',
        'en/profile.json',
        'en/portfolio.json',
        'en/terms.json',
        'en/reviews.json',
      ]
    }
  ],
  lazy: true,
  defaultLocale: 'fa',
  strategy: 'prefix_except_default',
},

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  runtimeConfig: {
    azureTranslatorKey: process.env.AZURE_TRANSLATOR_KEY,
    azureTranslatorRegion: process.env.AZURE_TRANSLATOR_REGION,
    public: {
      apiBase: 'https://nadertechnologyteam.ir/api'
    }
  }
})