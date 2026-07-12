export const useResumes = () => {
  // لیست کامل رزومه‌ها/پروژه‌ها - یک‌بار فچ می‌شه و کش می‌مونه
  const { data: resumes, pending, error, refresh } = useFetch('/api/resumes', {
    key: 'resumes-list',
    default: () => [],
  })

  // فیلتر بر اساس type ('web' | 'content' | 'event')
  const getResumesByType = (type) =>
    computed(() => (resumes.value || []).filter((r) => r.type === type))

  return { resumes, pending, error, refresh, getResumesByType }
}