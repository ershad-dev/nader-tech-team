/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'site-bg': '#F7F3EB',
      },
      fontFamily: {
        sans: ['Rokh', 'sans-serif'],
      },
      screens: {
        xxl: '1920px',
      },
      colors: {
        dark: {
          bg: '#435056',        // پس‌زمینه‌ی اصلی صفحه
          surface: '#3D676B',   // پس‌زمینه‌ی navbar، فوتر، section ها
          input: '#96ACB1',     // پس‌زمینه‌ی input ها و کارت‌های داخلی
          border: '#A7B3BB',    // بوردر و خط جداکننده
          accent: '#72A6A6',    // دکمه‌ی اصلی / آیکون فعال
          'accent-hover': '#9AC7C7', // حالت hover دکمه‌ها
          highlight: '#ADE9EA', // accent روشن / حالت hover لینک‌ها
          gold: '#CCAE7A',      // دکمه‌ی طلایی "درخواست همکاری"
          text: '#E9F1F2',      // متن اصلی روی پس‌زمینه‌ی تیره
          'text-deep': '#1A2122', // متن تیره روی پس‌زمینه‌های روشن‌تر داخل دارک
        },
      },
    },
  },
  plugins: [],
}