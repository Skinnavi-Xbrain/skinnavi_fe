import apiClient from '@/shared/lib/api-client'

// ─── Subscription Types ───────────────────────────────────────────────────────

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

// ─── Revenue Types ────────────────────────────────────────────────────────────

export interface MonthlyRevenueRow {
  month: string // "YYYY-MM"
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

// ─── Subscription API ─────────────────────────────────────────────────────────

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

// ─── Revenue API ──────────────────────────────────────────────────────────────

export const getRevenueStats = async (
  params?: RevenueStatsParams
): Promise<RevenueStatsResponse> => {
  const res = await apiClient.get<RevenueStatsResponse>('/admin/revenue/stats', { params })
  return res.data
}
