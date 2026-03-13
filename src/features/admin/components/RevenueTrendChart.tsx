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
import { revenueTrendData } from '../data/dashboardData'
import CustomTooltip from './CustomTooltip'

const RevenueTrendChart = () => (
  <div className="bg-white rounded-2xl p-[22px] border border-gray-100 shadow-sm">
    <div className="text-base font-bold text-gray-900">Revenue Trends</div>
    <div className="text-xs text-gray-400 mt-0.5 mb-4">Monthly revenue by source</div>
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={revenueTrendData}
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
            tickFormatter={(v) => `${v / 1000}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 14 }} />
          <Bar dataKey="Subscriptions" fill="#4F8EF7" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Affiliate Links" fill="#26C6DA" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Advertisements" fill="#9C6FE4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
)

export default RevenueTrendChart
