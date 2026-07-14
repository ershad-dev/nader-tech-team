// composables/useApi.js
// هلپر مشترک برای صدا زدن API قرعه‌کشی
// توکن احراز هویت رو از همون useState('token') میخونه که useAuth.js پروژه استفاده می‌کنه
// (توکن واقعی تو localStorage با کلید 'access_token' ذخیره میشه، ولی چون useAuth
// از useState('token', ...) استفاده کرده، اینجا هم با همون کلید میخونیم تا مقدار
// reactive و مشترک بین کل اپ باشه - نیازی به دسترسی مستقیم به localStorage نیست)

export const API_BASE = 'https://nadertechnologyteam.ir'

// توجه مهم: مسیر واقعی روی بک‌اند به‌خاطر تایپو "lotteris" هست نه "lotteries"
// (طبق تست curl تایید شده). سند Swagger اشتباه نوشته "lotteries".
// اگه بک‌اند بعداً این تایپو رو درست کرد، فقط همین یک خط رو تغییر بده.
export const LOTTERIES_PATH = '/api/lotteries'

export async function apiFetch(path, options = {}) {
  // همون state مشترکی که useAuth().token هم به آن اشاره میکنه
  const tokenState = useState('token', () => null)
  let token = tokenState.value

  // اگه هنوز initAuth() صدا زده نشده (مثلاً رفرش صفحه)، مستقیم از localStorage میخونیم
  if (!token && typeof window !== 'undefined') {
    token = window.localStorage.getItem('access_token')
  }

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