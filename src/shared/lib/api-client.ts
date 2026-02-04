import axios, { AxiosError } from 'axios'
import { env } from '@/config/env'
import { toast } from '@/shared/hooks/use-toast'
import type { ApiErrorResponse } from '@/shared/types/api'

const apiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status
    const data = error.response?.data

    switch (status) {
      case 401:
        localStorage.removeItem('accessToken')
        toast({
          title: 'Session Expired',
          description: 'Please login again to continue.',
          variant: 'destructive'
        })
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login'
        }
        break

      case 403:
        toast({
          title: 'Access Denied',
          description: data?.message || "You don't have permission to perform this action.",
          variant: 'destructive'
        })
        break

      default:
        console.error('API Error:', error.message)
    }

    return Promise.reject(error)
  }
)

export default apiClient
