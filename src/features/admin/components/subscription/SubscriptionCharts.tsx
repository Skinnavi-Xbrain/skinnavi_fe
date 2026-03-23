import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import {
  getMonthlyConversionRate,
  getSubscriptionStatusStats,
  type MonthlyConversionRateEntry,
  type SubscriptionStatusStat
} from '../../services/subscriptionApi'

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: '#22c55e',
  EXPIRED: '#f59e0b',
  CANCELLED: '#ef4444'
}

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Active',
  EXPIRED: 'Expired',
  CANCELLED: 'Cancelled'
}

const normalizeStatus = (status: string) => {
  if (status === 'CANCELED') return 'CANCELLED'
  return status
}

const formatMonth = (month: string) => {
  const [year, monthIndex] = month.split('-').map(Number)
  const date = new Date(year, (monthIndex ?? 1) - 1, 1)
  return date.toLocaleString('en-US', { month: 'short' })
}

const LineTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-[12px]">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      <div className="flex items-center justify-between gap-6 mb-1">
        <span className="text-gray-500">Conversion Rate</span>
        <span className="font-semibold text-gray-800">{payload[0].value}%</span>
      </div>
      <div className="text-gray-400">
        {payload[0].payload.convertedUsers}/{payload[0].payload.totalUsers} users converted
      </div>
    </div>
  )
}

const PieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-[12px]">
      <p className="font-semibold text-gray-700 mb-1">{payload[0].name}</p>
      <p className="text-gray-800">{payload[0].value.toLocaleString()} subscriptions</p>
    </div>
  )
}

const SubscriptionCharts = () => {
  const [statusData, setStatusData] = useState<SubscriptionStatusStat[]>([])
  const [monthlyConversion, setMonthlyConversion] = useState<MonthlyConversionRateEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([getSubscriptionStatusStats(), getMonthlyConversionRate()]).then(
      ([statusRes, conversionRes]) => {
        if (statusRes.status === 'fulfilled') {
          setStatusData(statusRes.value)
        }

        if (conversionRes.status === 'fulfilled') {
          setMonthlyConversion(conversionRes.value)
        }

        setLoading(false)
      }
    )
  }, [])

  const pieData = ['ACTIVE', 'EXPIRED', 'CANCELLED'].map((status) => {
    const item = statusData.find((entry) => normalizeStatus(entry.status) === status)

    return {
      status,
      name: STATUS_LABELS[status],
      value: item?.count ?? 0,
      fill: STATUS_COLORS[status]
    }
  })

  const lineData = monthlyConversion.map((item) => ({
    ...item,
    label: formatMonth(item.month)
  }))

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6"
      >
        <h3 className="text-[15px] font-semibold text-gray-900">Subscription Status</h3>
        <p className="text-[13px] text-gray-400 mt-0.5 mb-4">
          Active, expired, and cancelled subscriptions
        </p>

        {loading ? (
          <div className="h-[260px] rounded-xl bg-gray-50 animate-pulse" />
        ) : (
          <>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={64}
                  outerRadius={92}
                  paddingAngle={3}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.status} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4">
              {pieData.map((item) => (
                <div key={item.status} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: item.fill }} />
                  <span className="text-[12px] text-gray-500 font-medium">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14 }}
        className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6"
      >
        <h3 className="text-[15px] font-semibold text-gray-900">Conversion Rate Trend</h3>
        <p className="text-[13px] text-gray-400 mt-0.5 mb-4">
          Free to paid conversion by month
        </p>

        {loading ? (
          <div className="h-[260px] rounded-xl bg-gray-50 animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={lineData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                width={42}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<LineTooltip />} />
              <Line
                type="monotone"
                dataKey="conversionRate"
                name="Conversion Rate"
                stroke="#ec4899"
                strokeWidth={3}
                dot={{ r: 4, fill: '#ec4899' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </div>
  )
}

export default SubscriptionCharts
