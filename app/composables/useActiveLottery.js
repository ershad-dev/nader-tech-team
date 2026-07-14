// composables/useActiveLottery.js
// طبق تصمیم پروژه: فعلاً فقط یک قرعه‌کشی فعال ثابت داریم که شناسه‌ش
// همیشه ACTIVE_LOTTERY_ID هست (فعلاً 1).
// این کامپوزبل اطلاعات همون قرعه‌کشی رو با GET /api/lotteries/{lottery}
// به همه صفحات میده تا لازم نباشه lottery id رو دستی هر جا پاس بدیم.

import { apiFetch, LOTTERIES_PATH } from './useApi'

// اگه بعداً شناسه قرعه‌کشی فعال عوض شد، فقط همینجا رو تغییر بده
export const ACTIVE_LOTTERY_ID = 1

export function useActiveLottery() {
  // useState مخصوص Nuxt 3 هست: بین صفحات مقدار رو نگه می‌داره
  // بدون اینکه هر بار دوباره از API بگیریم
  const lottery = useState('active-lottery', () => null)
  const pending = useState('active-lottery-pending', () => false)
  const error = useState('active-lottery-error', () => null)

  async function fetchActiveLottery(force = false) {
    if (lottery.value && !force) return lottery.value

    pending.value = true
    error.value = null

    try {
      // GET /api/lotteris/{lottery}  (مسیر واقعی سرور، نه lotteries)
      const res = await apiFetch(`${LOTTERIES_PATH}/${ACTIVE_LOTTERY_ID}`)
      lottery.value = res?.data || null
      return lottery.value
    } catch (err) {
      error.value = err.data?.message || err.message
      throw err
    } finally {
      pending.value = false
    }
  }

  return { lottery, pending, error, fetchActiveLottery }
}