// composables/useLotteryLogin.js
// این "لاگین" یه لاگین معمولی نیست؛ استعلام وضعیت با موبایل + کد قرعه‌کشیه
// POST /api/lotteris/{lottery}/login   { mobile, code } -> { lottery_finished, is_winner }
// این endpoint نیازی به Authorization token نداره (فقط 404 و 422 برمیگردونه، نه 401)

import { apiFetch, LOTTERIES_PATH } from './useApi'
import { useActiveLottery } from './useActiveLottery'

export function useLotteryLogin() {
  // نتیجه‌ی آخرین استعلام رو نگه می‌داریم تا صفحات waiting/winner/loser بتونن
  // بدون نیاز به لاگین دوباره، به mobile/code/is_winner دسترسی داشته باشن
  const loginCheck = useState('lottery-login-check', () => null)
  const pending = useState('lottery-login-pending', () => false)
  const error = useState('lottery-login-error', () => null)

  async function checkEntry({ mobile, code, name }) {
    pending.value = true
    error.value = null

    try {
      const { lottery, fetchActiveLottery } = useActiveLottery()
      const activeLottery = lottery.value || (await fetchActiveLottery())
      if (!activeLottery) throw new Error('قرعه‌کشی فعالی یافت نشد')

      const res = await apiFetch(`${LOTTERIES_PATH}/${activeLottery.id}/login`, {
        method: 'POST',
        body: JSON.stringify({ mobile, code })
      })

      // name فقط سمت کلاینت نگه داشته میشه (API برش نمی‌گردونه) تا تو صفحات بعدی
      // بتونیم بدون دسترسی به my-status احراز هویت‌شده، اسم رو نشون بدیم
      loginCheck.value = {
        mobile,
        code,
        name: name || null,
        lottery_finished: res.data.lottery_finished,
        is_winner: res.data.is_winner
      }

      return loginCheck.value
    } catch (err) {
      // 422: موبایل/کد اشتباهه - 404: قرعه‌کشی پیدا نشد
      error.value = err.data?.errors?.code?.[0] || err.data?.message || err.message
      throw err
    } finally {
      pending.value = false
    }
  }

  return { loginCheck, pending, error, checkEntry }
}
