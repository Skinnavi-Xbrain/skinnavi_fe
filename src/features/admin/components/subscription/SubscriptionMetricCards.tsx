import { motion } from 'framer-motion'

const METRIC_CARDS = [
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
    value: '4,521',
    change: '+12.5% from last month',
    changeColor: 'text-emerald-500'
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
    value: '$98.4K',
    change: '+18.2% from last month',
    changeColor: 'text-emerald-500'
  },
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
    value: '28.5%',
    change: '+3.7% from last month',
    changeColor: 'text-emerald-500'
  },
  {
    bg: '#ede7f6',
    color: '#7e57c2',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    label: 'Avg. Customer Lifetime',
    value: '8.2 mo',
    change: '+0.5 mo from last month',
    changeColor: 'text-emerald-500'
  }
]

const SubscriptionMetricCards = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.05 }}
    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
  >
    {METRIC_CARDS.map((card, i) => (
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
          <p className="text-[24px] font-bold text-gray-900 leading-tight">{card.value}</p>
        </div>
        <p className={`text-[13px] font-medium ${card.changeColor}`}>{card.change}</p>
      </motion.div>
    ))}
  </motion.div>
)

export default SubscriptionMetricCards
