// composables/useLotteryApi.js
// یک composable مشترک برای صدا زدن API های ادمین قرعه‌کشی (بر اساس مستندات Swagger)
// از useAdminAuth برای گرفتن هدر Authorization استفاده می‌کند

const API_BASE = 'https://nadertechnologyteam.ir/api'

export const useLotteryApi = () => {
  const { authHeader } = useAdminAuth()

  const request = async (path, options = {}) => {
    return await $fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        ...authHeader(),
        ...(options.headers || {}),
      },
    })
  }

  // GET /api/admin/lotteries
  const getLotteries = (page = 1, perPage = 10, status) =>
    request('/admin/lotteries', { params: { page, per_page: perPage, status } })

  // POST /api/admin/lotteries
  const createLottery = (payload) =>
    request('/admin/lotteries', { method: 'POST', body: payload })

  // GET /api/admin/lotteries/{lottery}
  const getLottery = (id) => request(`/admin/lotteries/${id}`)

  // PUT /api/admin/lotteries/{lottery}
  const updateLottery = (id, payload) =>
    request(`/admin/lotteries/${id}`, { method: 'PUT', body: payload })

  // GET /api/admin/lotteries/{lottery}/entries
  const getEntries = (id, page = 1, perPage = 50) =>
    request(`/admin/lotteries/${id}/entries`, { params: { page, per_page: perPage } })

  // GET /api/admin/lotteries/{lottery}/winners
  const getWinners = (id) => request(`/admin/lotteries/${id}/winners`)

  // POST /api/admin/lotteries/{lottery}/draw
  const drawLottery = (id, winners) =>
    request(`/admin/lotteries/${id}/draw`, { method: 'POST', body: { winners } })

  return {
    getLotteries,
    createLottery,
    getLottery,
    updateLottery,
    getEntries,
    getWinners,
    drawLottery,
  }
}