import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { AdminRevenueStats } from '../../services/admin.api'

const LEGEND_ITEMS = [
  { color: '#f97316', label: 'Advertisement' },
  { color: '#06b6d4', label: 'Affiliate Products' },
  { color: '#8b5cf6', label: 'Subscriptions' }
]

type RevenueBreakdownChartProps = {
  stats: AdminRevenueStats | null
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-[12px]">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center justify-between gap-6 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
            <span className="text-gray-500">{p.name}</span>
          </div>
          <span className="font-semibold text-gray-800">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

const RevenueBreakdownChart = ({ stats }: RevenueBreakdownChartProps) => {
  const monthlyData = (stats?.monthly ?? []).map((item) => ({
    month: item.month,
    subscriptions: item.subscription,
    advertisement: item.ads,
    affiliateProducts: item.affiliate
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6"
    >
      <h3 className="text-[15px] font-semibold text-gray-900">Monthly Revenue Breakdown</h3>
      <p className="text-[13px] text-gray-400 mt-0.5 mb-4">
        Revenue by source across the selected period
      </p>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={monthlyData}
          margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
          barCategoryGap="30%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            width={52}
            tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v))}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
          <Bar dataKey="advertisement" name="Advertisement" stackId="a" fill="#f97316" />
          <Bar dataKey="affiliateProducts" name="Affiliate Products" stackId="a" fill="#06b6d4" />
          <Bar
            dataKey="subscriptions"
            name="Subscriptions"
            stackId="a"
            fill="#8b5cf6"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: item.color }} />
            <span className="text-[12px] text-gray-500 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default RevenueBreakdownChart
