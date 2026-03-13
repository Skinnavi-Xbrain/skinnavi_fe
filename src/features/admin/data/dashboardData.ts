import type { Metric, RevenueItem } from '../types'

export const userGrowthData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1800 },
  { month: 'Mar', users: 2400 },
  { month: 'Apr', users: 3100 },
  { month: 'May', users: 4200 },
  { month: 'Jun', users: 5100 },
  { month: 'Jul', users: 6800 },
  { month: 'Aug', users: 8234 }
]

export const revenueBreakdown: RevenueItem[] = [
  { name: 'Subscriptions', value: 452000, pct: '69.5%', color: '#4F8EF7' },
  { name: 'Affiliate Links', value: 124000, pct: '19.1%', color: '#26C6DA' },
  { name: 'Advertisements', value: 74000, pct: '11.4%', color: '#9C6FE4' }
]

export const revenueTrendData = [
  { month: 'Jan', Subscriptions: 46000, 'Affiliate Links': 12000, Advertisements: 7000 },
  { month: 'Feb', Subscriptions: 53000, 'Affiliate Links': 15000, Advertisements: 9000 },
  { month: 'Mar', Subscriptions: 61000, 'Affiliate Links': 13000, Advertisements: 11000 },
  { month: 'Apr', Subscriptions: 68000, 'Affiliate Links': 22000, Advertisements: 13000 },
  { month: 'May', Subscriptions: 82000, 'Affiliate Links': 26000, Advertisements: 15000 },
  { month: 'Jun', Subscriptions: 97000, 'Affiliate Links': 30000, Advertisements: 17000 }
]

export const metrics: Metric[] = [
  {
    title: 'Total Users',
    value: '8,234',
    change: '+12.5%',
    positive: true,
    bg: '#EEF3FF',
    iconColor: '#6B9CF6'
  },
  {
    title: 'Active Users',
    value: '6,891',
    change: '+8.3%',
    positive: true,
    bg: '#EAFAF3',
    iconColor: '#34C98C'
  },
  {
    title: 'Total Revenue',
    value: '$650K',
    change: '+15.2%',
    positive: true,
    bg: '#FFF7EC',
    iconColor: '#F6A73B'
  },
  {
    title: 'Active Subscriptions',
    value: '4,521',
    change: '-2.1%',
    positive: false,
    bg: '#F0EEFF',
    iconColor: '#7C6FE4'
  }
]
