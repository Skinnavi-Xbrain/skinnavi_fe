export interface AdminUserStats {
  totalUsers: number
  activeUsers: number
  activeDays: number
  activeDefinition: string
}

export interface AdminActiveSubscriptionsByPackage {
  routinePackageId: string
  activeSubscriptions: number
}

export interface AdminActiveSubscriptions {
  activeSubscriptions: number
  byPackage: AdminActiveSubscriptionsByPackage[]
  activeDefinition: string
}

export interface AdminRevenueTotals {
  subscription: number
  ads: number
  affiliate: number
  total: number
}

export interface AdminRevenueMonthlyEntry {
  month: string
  subscription: number
  ads: number
  affiliate: number
  total: number
}

export interface AdminRevenueNotes {
  subscription: string
  ads: string
  affiliate: string
}

export interface AdminRevenueStats {
  tz: string
  from: string | null
  to: string | null
  totals: AdminRevenueTotals
  monthly: AdminRevenueMonthlyEntry[]
  notes: AdminRevenueNotes
}

export interface AdminUserGrowthEntry {
  month: string
  newUsers: number
}

export interface AdminMonthlyProductStat {
  month: string
  totalProducts: number
}

export interface AdminProductMonthlyStatsResponse {
  totalProducts: number
  monthly: AdminMonthlyProductStat[]
}
