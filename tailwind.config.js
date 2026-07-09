/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'site-bg': '#F7F3EB',
      },
      fontFamily: {
        // با این تنظیم، فونت پیش‌فرض کل سایت به Rokh تغییر می‌کند
        sans: ['Rokh', 'sans-serif'],
      },
       screens: {
        xxl: '1920px', // فقط برای سایز 1920 و بالاتر فعال میشه
      },
    },
  },
  plugins: [],
}