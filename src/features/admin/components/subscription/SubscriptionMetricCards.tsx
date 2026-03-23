import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  getActiveSubscriptions,
  getConversionRate,
  getRevenueStats,
  type ActiveSubscriptionsResponse,
  type ConversionRateResponse,
  type RevenueStatsResponse
} from '../../services/subscriptionApi'

interface MetricCard {
  bg: string
  color: string
  icon: React.ReactNode
  label: string
  value: string
  change: string
  changeColor: string
}

const STATIC_CARDS_META = [
  {
    bg: '#fce4ec',
    color: '#e91e8c',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <polyline
          points="23 6 13.5 15.5 8.5 10.5 1 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="17 6 23 6 23 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: 'Conversion Rate',
    change: 'Free to paid conversion',
    changeColor: 'text-emerald-500',
    staticValue: '0.0%'
  }
]

const formatCurrencyCompact = (value: number): string => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return value.toString()
}

const formatRevenue = (value: number): string => {
  const compactValue = formatCurrencyCompact(value)
  return `${compactValue}`
}

const formatChangeText = (
  current: number | null,
  previous: number | null,
  suffix = 'from last month'
) => {
  if (current === null || previous === null || previous <= 0) {
    return 'No previous month data'
  }

  const change = ((current - previous) / previous) * 100
  const sign = change >= 0 ? '+' : ''

  return `${sign}${change.toFixed(1)}% ${suffix}`
}

const getChangeColor = (current: number | null, previous: number | null) => {
  if (current === null || previous === null || previous <= 0) {
    return 'text-gray-400'
  }

  return current >= previous ? 'text-emerald-500' : 'text-red-500'
}

const SubscriptionMetricCards = () => {
  const [activeData, setActiveData] = useState<ActiveSubscriptionsResponse | null>(null)
  const [revenueData, setRevenueData] = useState<RevenueStatsResponse | null>(null)
  const [conversionData, setConversionData] = useState<ConversionRateResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([getActiveSubscriptions(), getRevenueStats(), getConversionRate()]).then(
      ([activeRes, revenueRes, conversionRes]) => {
        if (activeRes.status === 'fulfilled') setActiveData(activeRes.value)
        if (revenueRes.status === 'fulfilled') setRevenueData(revenueRes.value)
        if (conversionRes.status === 'fulfilled') setConversionData(conversionRes.value)
        setLoading(false)
      }
    )
  }, [])

  const activeCount = activeData?.activeSubscriptions ?? null
  const activeGrowth = activeData?.growthRate ?? 0

  const mrr = revenueData?.totals.subscription ?? null
  const conversionRate = conversionData?.conversionRate ?? null

  const currentMonthRevenue = revenueData?.monthly.at(-1)?.subscription ?? null
  const previousMonthRevenue = revenueData?.monthly.at(-2)?.subscription ?? null
  const mrrChange = formatChangeText(currentMonthRevenue, previousMonthRevenue)
  const conversionUsers =
    conversionData && conversionData.totalUsers > 0
      ? `${conversionData.convertedUsers}/${conversionData.totalUsers} users converted`
      : 'No conversion data yet'

  const allCards: MetricCard[] = [
    {
      bg: '#e8f5e9',
      color: '#43a047',
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
          <path
            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      label: 'Active Subscriptions',
      value: loading ? '—' : activeCount !== null ? activeCount.toLocaleString() : 'N/A',
      change: loading
        ? 'Loading trend...'
        : `${activeGrowth >= 0 ? '+' : ''}${activeGrowth}% from last month`,
      changeColor: loading
        ? 'text-gray-400'
        : activeGrowth >= 0
          ? 'text-emerald-500'
          : 'text-red-500'
    },
    {
      bg: '#e3f2fd',
      color: '#1e88e5',
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
          <line
            x1="12"
            y1="1"
            x2="12"
            y2="23"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      label: 'Monthly Recurring Revenue',
      value: loading ? '—' : mrr !== null ? formatRevenue(mrr) : 'N/A',
      change: loading ? 'Loading trend...' : mrrChange,
      changeColor: loading
        ? 'text-gray-400'
        : getChangeColor(currentMonthRevenue, previousMonthRevenue)
    },
    ...STATIC_CARDS_META.map((c) => ({
      bg: c.bg,
      color: c.color,
      icon: c.icon,
      label: c.label,
      value: loading || conversionRate === null ? c.staticValue : `${conversionRate.toFixed(1)}%`,
      change: conversionUsers,
      changeColor: c.changeColor
    }))
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      {allCards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 + i * 0.04 }}
          className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3"
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: card.bg }}
          >
            <span style={{ color: card.color }}>{card.icon}</span>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-0.5">{card.label}</p>
            {loading && i <= 2 ? (
              <div className="h-7 w-24 bg-gray-100 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-[24px] font-bold text-gray-900 leading-tight">{card.value}</p>
            )}
          </div>
          <p className={`text-[13px] font-medium ${card.changeColor}`}>{card.change}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default SubscriptionMetricCards
