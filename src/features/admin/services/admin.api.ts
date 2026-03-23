import apiClient from '@/shared/lib/api-client'
import type {
  AdminActiveSubscriptions,
  AdminUserGrowthEntry,
  AdminUserStats,
  AdminProductMonthlyStatsResponse
} from '../types/stats'

export type AdminRevenueStatsParams = {
  from?: string
  to?: string
  tz?: string
}

export type AdminRevenueMonthlyRow = {
  month: string
  subscription: number
  ads: number
  affiliate: number
  total: number
}

export type AdminRevenueStats = {
  tz: string
  from: string | null
  to: string | null
  totals: {
    subscription: number
    ads: number
    affiliate: number
    total: number
  }
  monthly: AdminRevenueMonthlyRow[]
  notes: {
    subscription: string
    ads: string
    affiliate: string
  }
}

export const getAdminUserStats = async (): Promise<AdminUserStats> => {
  const res = await apiClient.get<AdminUserStats>('/admin/users/stats')
  return res.data
}

export const getAdminActiveSubscriptions = async (): Promise<AdminActiveSubscriptions> => {
  const res = await apiClient.get<AdminActiveSubscriptions>('/admin/subscriptions/active')
  return res.data
}

export const getAdminRevenueStats = async (
  params?: AdminRevenueStatsParams
): Promise<AdminRevenueStats> => {
  const res = await apiClient.get<AdminRevenueStats>('/admin/revenue/stats', {
    params
  })
  return res.data
}

export const getAdminUserGrowth = async (months = 12): Promise<AdminUserGrowthEntry[]> => {
  const res = await apiClient.get<AdminUserGrowthEntry[]>('/admin/users/growth', {
    params: { months }
  })
  return res.data
}

export const getAdminMonthlyProductStats = async (params?: {
  from?: string
  to?: string
}): Promise<AdminProductMonthlyStatsResponse> => {
  const res = await apiClient.get<AdminProductMonthlyStatsResponse>(
    '/admin/products/stats/monthly',
    {
      params
    }
  )
  return res.data
}
