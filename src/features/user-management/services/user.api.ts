import apiClient from '@/shared/lib/api-client'
import type { PaginatedUsers, UserAPI, CreateUserPayload } from '../types/user'

export const getAdminUsers = async (page: number, limit: number): Promise<PaginatedUsers> => {
  const res = await apiClient.get<PaginatedUsers>('/admin/users', {
    params: { page, limit }
  })
  return res.data
}

export const updateAdminUserRole = async (id: string, role: 'ADMIN' | 'USER'): Promise<UserAPI> => {
  const res = await apiClient.patch<UserAPI>(`/admin/users/${id}`, { role })
  return res.data
}

export const deleteAdminUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/users/${id}`)
}

export const createAdminUser = async (payload: CreateUserPayload): Promise<UserAPI> => {
  const res = await apiClient.post<UserAPI>('/admin/users', payload)
  return res.data
}
