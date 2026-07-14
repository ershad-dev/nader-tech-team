// composables/useApi.js
// هلپر مشترک برای صدا زدن API قرعه‌کشی
// توکن احراز هویت رو از localStorage می‌خونه (کلید 'token')
// چون فعلاً صفحه login.vue دست نخورده باقی می‌مونه، این فایل فرض می‌کنه
// یک جای دیگه از پروژه (یا API لاگین که بعداً اضافه میشه) توکن رو داخل
// localStorage با کلید 'token' ذخیره می‌کنه.

export const API_BASE = 'https://nadertechnologyteam.ir'

// توجه مهم: مسیر واقعی روی بک‌اند به‌خاطر تایپو "lotteris" هست نه "lotteries"
// (طبق تست curl تایید شده). سند Swagger اشتباه نوشته "lotteries".
// اگه بک‌اند بعداً این تایپو رو درست کرد، فقط همین یک خط رو تغییر بده.
export const LOTTERIES_PATH = '/api/lotteris'

export async function apiFetch(path, options = {}) {
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  }

  let res
  try {
    res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  } catch (err) {
    throw new Error('ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید.')
  }

  let data = {}
  try {
    data = await res.json()
  } catch (err) {
    data = {}
  }

  if (!res.ok) {
    const error = new Error(data.message || 'خطا در ارتباط با سرور')
    error.status = res.status
    error.data = data
    throw error
  }

  return data
}