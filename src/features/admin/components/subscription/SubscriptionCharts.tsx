import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  PieChart, Pie, Cell, Tooltip as PieTooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, Dot,
} from 'recharts'
import {
  getActiveSubscriptions,
  getSubscriptionPackages,
  getRevenueStats,
  type ActiveSubscriptionsResponse,
  type PackageFromApi,
  type MonthlyRevenueRow,
} from '../../services/subscriptionApi'

// Conversion Rate Trend vẫn hardcode vì chưa có endpoint analytics
// TODO: Thay bằng /admin/analytics/conversion-trend khi backend cung cấp
const FALLBACK_TREND_DATA = [
  { month: 'Jan', rate: 14 },
  { month: 'Feb', rate: 17 },
  { month: 'Mar', rate: 18 },
  { month: 'Apr', rate: 22 },
  { month: 'May', rate: 26 },
  { month: 'Jun', rate: 29 },
]

const SLICE_COLORS = [
  '#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6',
  '#ec4899', '#14b8a6', '#f97316', '#ef4444',
]

interface StatusSlice {
  name: string
  value: number
  color: string
}

interface TrendRow {
  month: string
  rate: number
}

// Chuyển monthly revenue → trend line (dùng total revenue theo tháng làm proxy
// cho đến khi có endpoint conversion riêng)
const buildRevenueTrend = (monthly: MonthlyRevenueRow[]): TrendRow[] => {
  const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return monthly.slice(-6).map((row) => {
    const [, mm] = row.month.split('-') // "YYYY-MM"
    return {
      month: MONTH_SHORT[parseInt(mm, 10) - 1] ?? row.month,
      rate: row.total,
    }
  })
}

const SubscriptionCharts = () => {
  const [statusData, setStatusData] = useState<StatusSlice[]>([])
  const [trendData, setTrendData] = useState<TrendRow[]>(FALLBACK_TREND_DATA)
  const [trendLabel, setTrendLabel] = useState('Conversion Rate Trend')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([
      getActiveSubscriptions(),
      getSubscriptionPackages(),
      getRevenueStats(),
    ]).then(([activeRes, packagesRes, revenueRes]) => {
      // ── Donut: ghép byPackage với tên package ──────────────────────────────
      if (activeRes.status === 'fulfilled' && packagesRes.status === 'fulfilled') {
        const active: ActiveSubscriptionsResponse = activeRes.value
        const packages: PackageFromApi[] = packagesRes.value

        const pkgMap = new Map(packages.map((p) => [p.id, p.packageName]))

        const slices: StatusSlice[] = active.byPackage.map((bp, i) => ({
          name: pkgMap.get(bp.routinePackageId) ?? `Package ${i + 1}`,
          value: bp.activeSubscriptions,
          color: SLICE_COLORS[i % SLICE_COLORS.length],
        }))

        // Tính expired/cancelled nếu tổng byPackage < activeSubscriptions
        // (byPackage chỉ chứa active → không cần thêm slice Expired ở đây,
        //  nhưng nếu API trả thêm expired trong tương lai thì bổ sung vào đây)
        setStatusData(slices.length > 0 ? slices : [])
      }

      // ── Line: dùng revenue theo tháng nếu không có conversion endpoint ────
      if (revenueRes.status === 'fulfilled') {
        const rev = revenueRes.value
        if (rev.monthly && rev.monthly.length > 0) {
          setTrendData(buildRevenueTrend(rev.monthly))
          setTrendLabel('Monthly Revenue Trend ($)')
        }
      }

      setLoading(false)
    })
  }, [])

  const total = statusData.reduce((s, d) => s + d.value, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-4"
    >
      {/* ── Donut Chart ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-[15px] font-semibold text-gray-900 mb-5">Subscription Status</h3>

        {loading ? (
          <div className="flex items-center justify-center h-[180px]">
            <div className="w-[140px] h-[140px] rounded-full border-4 border-gray-100 border-t-blue-400 animate-spin" />
          </div>
        ) : statusData.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">No data available</p>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius="58%"
                    outerRadius="82%"
                    paddingAngle={3}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {statusData.map((d, i) => (
                      <Cell key={i} fill={d.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <PieTooltip
                    formatter={(v: number) => [v.toLocaleString(), '']}
                    contentStyle={{ borderRadius: 10, border: '1px solid #f0f0f0', fontSize: 13 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-lg font-bold text-gray-900">{total.toLocaleString()}</span>
                <span className="text-[11px] text-gray-400">Active</span>
              </div>
            </div>

            {/* Legend – cuộn nếu nhiều package */}
            <div className="flex sm:flex-col flex-row flex-wrap justify-around sm:justify-start gap-x-2 sm:gap-x-0 gap-y-3 flex-1 w-full max-h-[160px] overflow-y-auto pr-1">
              {statusData.map((d) => (
                <div
                  key={d.name}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-center gap-1 sm:gap-2"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                    <span className="text-sm text-gray-600 whitespace-nowrap">{d.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {d.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Line Chart ───────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-[15px] font-semibold text-gray-900 mb-5">{trendLabel}</h3>

        {loading ? (
          <div className="h-[200px] flex items-end gap-2 px-4 pb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-gray-100 rounded animate-pulse"
                style={{ height: `${30 + i * 12}%` }}
              />
            ))}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData} margin={{ top: 5, right: 8, left: -22, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <LineTooltip
                formatter={(v: number) => [
                  trendLabel.includes('$') ? `$${v.toLocaleString()}` : `${v}%`,
                  trendLabel,
                ]}
                contentStyle={{ borderRadius: 10, border: '1px solid #f0f0f0', fontSize: 13 }}
                cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={<Dot r={5} fill="#3b82f6" stroke="#fff" strokeWidth={2} />}
                activeDot={{ r: 7, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  )
}

export default SubscriptionCharts