import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import CustomTooltip from './CustomTooltip'
import type { AdminRevenueMonthlyEntry } from '../types/stats'

interface RevenueTrendChartProps {
  monthly?: AdminRevenueMonthlyEntry[] | null
}

const buildChartData = (monthly: AdminRevenueMonthlyEntry[]): Record<string, unknown>[] => {
  return monthly.map((m) => {
    const dateLabel = new Date(`${m.month}-01`).toLocaleString('en-US', { month: 'short' })

    return {
      month: dateLabel,
      Subscriptions: m.subscription,
      'Affiliate Links': m.affiliate,
      Advertisements: m.ads
    }
  })
}

const RevenueTrendChart = ({ monthly }: RevenueTrendChartProps) => {
  const hasData = monthly && monthly.length > 0
  const data = hasData ? buildChartData(monthly) : []

  return (
    <div className="bg-white rounded-2xl p-[22px] border border-gray-100 shadow-sm">
      <div className="text-base font-bold text-gray-900">Revenue Trends</div>
      <div className="text-xs text-gray-400 mt-0.5 mb-4">Monthly revenue by source</div>
      <div className="h-[280px]">
        {!hasData ? (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No revenue data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 8, left: -10, bottom: 0 }}
              barCategoryGap="28%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
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
                tickFormatter={(v) => `$${v.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 14 }}
              />
              <Bar dataKey="Subscriptions" fill="#4F8EF7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Affiliate Links" fill="#26C6DA" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Advertisements" fill="#9C6FE4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default RevenueTrendChart
