export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const { token, initAuth } = useAuth()
  initAuth()

  if (!token.value) {
    return navigateTo(`/auth/login?redirect=${to.fullPath}`)
  }
})