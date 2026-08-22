// composables/useAdminPermissions.js
// لایه‌ی متمرکز برای تعیین اینکه ادمین لاگین‌شده اجازه‌ی ویرایش/حذف/افزودن داره یا نه.
// فعلا فقط بر اساس username چک می‌کنه (superadmin = فقط نمایش)،
// اگه بعدا بک‌اند یک فیلد role/permission برگردوند، فقط همین یک فایل رو عوض کن.

export const useAdminPermissions = () => {
  const { admin } = useAdminAuth()

  // نام‌های کاربری‌ای که فقط اجازه‌ی مشاهده دارن (read-only)
  const READ_ONLY_USERNAMES = ['mainAdmin']

  const isReadOnly = computed(() => {
    const username = admin.value?.username
    return !!username && READ_ONLY_USERNAMES.includes(username)
  })

  const canEdit = computed(() => !isReadOnly.value)
  const canCreate = computed(() => !isReadOnly.value)
  const canDelete = computed(() => !isReadOnly.value)

  return {
    isReadOnly,
    canEdit,
    canCreate,
    canDelete,
  }
}