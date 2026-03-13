import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { userGrowthData } from '../data/dashboardData'
import CustomTooltip from './CustomTooltip'

const UserGrowthChart = () => (
  <div className="bg-white rounded-2xl p-[22px] border border-gray-100 shadow-sm">
    <div className="text-base font-bold text-gray-900">User Growth</div>
    <div className="text-xs text-gray-400 mt-0.5 mb-4">Total registered users over time</div>
    <div className="h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={userGrowthData} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#3B82F6"
            strokeWidth={2.5}
            dot={{ fill: '#3B82F6', r: 4, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
)

export default UserGrowthChart
