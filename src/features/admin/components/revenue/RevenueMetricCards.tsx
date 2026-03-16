import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const METRIC_CARDS = [
  {
    bg: '#eff6ff',
    color: '#3b82f6',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
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
    label: 'Total Revenue (MTD)',
    value: '$129.0K',
    sub: null,
    badge: '+16.3%'
  },
  {
    bg: '#fdf4ff',
    color: '#a855f7',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <rect
          x="1"
          y="4"
          width="22"
          height="16"
          rx="2"
          ry="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    label: 'Subscriptions',
    value: '$98.0K',
    sub: '75.9% of total revenue',
    badge: null
  },
  {
    bg: '#ecfeff',
    color: '#06b6d4',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path
          d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: 'Affiliate Products',
    value: '$31.0K',
    sub: '24.1% of total revenue',
    badge: null
  }
]

const RevenueMetricCards = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {METRIC_CARDS.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 + i * 0.04 }}
          className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3"
        >
          <div className="flex items-start justify-between">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: card.bg }}
            >
              <span style={{ color: card.color }}>{card.icon}</span>
            </div>
            {card.badge && (
              <span className="flex items-center gap-1 text-[12px] font-semibold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp className="w-3 h-3" />
                {card.badge}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">{card.label}</p>
            <p className="text-[22px] font-bold text-gray-900 leading-tight">{card.value}</p>
          </div>
          {card.sub && <p className="text-[12px] text-gray-400">{card.sub}</p>}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default RevenueMetricCards
