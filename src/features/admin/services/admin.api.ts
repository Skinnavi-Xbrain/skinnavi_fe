import apiClient from '@/shared/lib/api-client'
import type {
  AdminActiveSubscriptions,
  AdminRevenueStats,
  AdminUserGrowthEntry,
  AdminUserStats
} from '../types/stats'

export const getAdminUserStats = async (): Promise<AdminUserStats> => {
  const res = await apiClient.get<AdminUserStats>('/admin/users/stats')
  return res.data
}

export const getAdminActiveSubscriptions = async (): Promise<AdminActiveSubscriptions> => {
  const res = await apiClient.get<AdminActiveSubscriptions>('/admin/subscriptions/active')
  return res.data
}

export const getAdminRevenueStats = async (): Promise<AdminRevenueStats> => {
  const res = await apiClient.get<AdminRevenueStats>('/admin/revenue/stats')
  return res.data
}

export const getAdminUserGrowth = async (months = 12): Promise<AdminUserGrowthEntry[]> => {
  const res = await apiClient.get<AdminUserGrowthEntry[]>('/admin/users/growth', {
    params: { months }
  })
  return res.data
}
