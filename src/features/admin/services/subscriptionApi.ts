import apiClient from '@/shared/lib/api-client'

export interface PackageFromApi {
  id: string
  packageName: string
  description: string
  highlights: string[]
  durationDays: number
  price: number
  totalScanLimit: number
  allowTracking: boolean
  subscriberCount: number
}

export interface ActiveSubscriptionsResponse {
  activeSubscriptions: number
  growthRate: number
  byPackage: { routinePackageId: string; activeSubscriptions: number }[]
  activeDefinition: string
}

export interface CreatePackageBody {
  packageName: string
  description: string
  highlights: string[]
  durationDays: number
  price: number
  weeklyScanLimit: number
  allowTracking: boolean
}

export type UpdatePackageBody = Partial<CreatePackageBody>

export interface MonthlyRevenueRow {
  month: string
  subscription: number
  ads: number
  affiliate: number
  total: number
}

export interface RevenueStatsResponse {
  tz: string
  from: string | null
  to: string | null
  totals: {
    subscription: number
    ads: number
    affiliate: number
    total: number
  }
  monthly: MonthlyRevenueRow[]
  notes: Record<string, string>
}

export interface RevenueStatsParams {
  from?: string
  to?: string
  tz?: string
}

export interface ConversionRateResponse {
  totalUsers: number
  convertedUsers: number
  conversionRate: number
}

export interface MonthlyConversionRateEntry {
  month: string
  totalUsers: number
  convertedUsers: number
  conversionRate: number
}

export interface SubscriptionStatusStat {
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'CANCELED' | string
  count: number
}

export const getSubscriptionPackages = async (): Promise<PackageFromApi[]> => {
  const res = await apiClient.get<PackageFromApi[]>('/admin/subscriptions')
  return res.data
}

export const getActiveSubscriptions = async (): Promise<ActiveSubscriptionsResponse> => {
  const res = await apiClient.get<ActiveSubscriptionsResponse>('/admin/subscriptions/active')
  return res.data
}

export const getSubscriptionPackageDetail = async (id: string): Promise<PackageFromApi> => {
  const res = await apiClient.get<PackageFromApi>(`/admin/subscriptions/${id}`)
  return res.data
}

export const createSubscriptionPackage = async (
  body: CreatePackageBody
): Promise<PackageFromApi> => {
  const res = await apiClient.post<PackageFromApi>('/admin/subscriptions', body)
  return res.data
}

export const updateSubscriptionPackage = async (
  id: string,
  body: UpdatePackageBody
): Promise<PackageFromApi> => {
  const res = await apiClient.patch<PackageFromApi>(`/admin/subscriptions/${id}`, body)
  return res.data
}

export const deleteSubscriptionPackage = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/subscriptions/${id}`)
}

export const getRevenueStats = async (
  params?: RevenueStatsParams
): Promise<RevenueStatsResponse> => {
  const res = await apiClient.get<RevenueStatsResponse>('/admin/revenue/stats', { params })
  return res.data
}

export const getConversionRate = async (): Promise<ConversionRateResponse> => {
  const res = await apiClient.get<ConversionRateResponse>(
    '/admin/subscriptions/stats/conversion-rate'
  )
  return res.data
}

export const getMonthlyConversionRate = async (): Promise<MonthlyConversionRateEntry[]> => {
  const res = await apiClient.get<MonthlyConversionRateEntry[]>(
    '/admin/subscriptions/stats/conversion-rate/monthly'
  )
  return res.data
}

export const getSubscriptionStatusStats = async (): Promise<SubscriptionStatusStat[]> => {
  const res = await apiClient.get<SubscriptionStatusStat[]>('/admin/subscriptions/stats/status')
  return res.data
}
