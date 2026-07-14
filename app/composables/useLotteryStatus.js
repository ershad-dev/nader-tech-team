// composables/useLotteryStatus.js
// وضعیت ثبت‌نام / برنده بودن کاربر برای قرعه‌کشی فعال
// GET /api/lotteris/{lottery}/my-status  (مسیر واقعی سرور، نه lotteries)

import { apiFetch, LOTTERIES_PATH } from './useApi'
import { useActiveLottery } from './useActiveLottery'

export function useLotteryStatus() {
  const status = useState('lottery-my-status', () => null)
  const pending = useState('lottery-my-status-pending', () => false)
  const error = useState('lottery-my-status-error', () => null)

  async function fetchStatus() {
    const { lottery, fetchActiveLottery } = useActiveLottery()
    pending.value = true
    error.value = null

    try {
      const activeLottery = lottery.value || (await fetchActiveLottery())
      if (!activeLottery) throw new Error('قرعه‌کشی فعالی یافت نشد')

      const res = await apiFetch(`${LOTTERIES_PATH}/${activeLottery.id}/my-status`)
      status.value = res.data
      return res.data
    } catch (err) {
      error.value = err.data?.message || err.message
      throw err
    } finally {
      pending.value = false
    }
  }

  return { status, pending, error, fetchStatus }
}