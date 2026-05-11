import axios from 'axios'

const API_URL = 'http://localhost:3000/api'
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
export const authAPI = {
  register(userData) {
    return api.post('/auth/register', userData)
  },
  login(email, password) {
    return api.post('/auth/login', { email, password })
  },
  verifyToken() {
    return api.get('/auth/verify')
  },
}
export const profileAPI = {
  getProfile() {
    return api.get('/profile')
  },
  updateStats(clickCount, maxNumber) {
    return api.put('/profile/stats', { clickCount, maxNumber })
  },
  uploadAvatar: (formData) => {
    return api.post('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  deleteAccount() {
    return api.delete('/profile')
  },
}
export const calcAPI = {
  calculate(expression, base = 10) {
    return api.post('/calc/calculate', { expression, base })
  },
}
export const historyAPI = {
  getHistory() {
    return api.get('/history')
  },
}

export default api
