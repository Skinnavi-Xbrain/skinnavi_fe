import apiClient from '@/shared/lib/api-client'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ProfileResponse
} from '../types/auth'

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const res = await apiClient.post<LoginResponse>('/auth/login', payload)
  return res.data
}

export const register = async (payload: RegisterRequest): Promise<RegisterResponse> => {
  const res = await apiClient.post<RegisterResponse>('/auth/register', payload)
  return res.data
}

export const getProfile = async (): Promise<ProfileResponse> => {
  const res = await apiClient.get<ProfileResponse>('/auth/profile')
  return res.data
}

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout')
  } finally {
    localStorage.removeItem('accessToken')
  }
}
