export interface Metric {
  title: string
  value: string
  change: string
  positive: boolean
  bg: string
  iconColor: string
}

export interface RevenueItem {
  name: string
  value: number
  pct: string
  color: string
}

export interface User {
  id: string
  name: string
  email: string
  status: 'Active' | 'Suspended' | 'Inactive'
  subscription: 'Free' | 'Basic' | 'Pro' | 'Premium'
  lastActivity: string
  avatar?: string
}
