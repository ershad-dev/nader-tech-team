export const useAuth = () => {
  const token = useState('token', () => null)

  const setToken = (newToken) => {
    token.value = newToken
    if (process.client) {
      localStorage.setItem('access_token', newToken)
    }
  }

  const logout = () => {
    token.value = null
    if (process.client) {
      localStorage.removeItem('access_token')
    }
  }

  const initAuth = () => {
    if (process.client) {
      token.value = localStorage.getItem('access_token')
    }
  }

  return {
    token,
    setToken,
    logout,
    initAuth
  }
}