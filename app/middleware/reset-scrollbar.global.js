// middleware/reset-scrollbar.global.js

export default defineNuxtRouteMiddleware(() => {
  const scrollbarConfig = useScrollbarConfig();
  scrollbarConfig.value = { light: null, dark: null };
});
