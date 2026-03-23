import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import CustomTooltip from './CustomTooltip'
import { getAdminUserGrowth } from '../services/admin.api'
import type { AdminUserGrowthEntry } from '../types/stats'

interface ChartPoint {
  month: string
  users: number
}

const mapGrowthToChartData = (growth: AdminUserGrowthEntry[]): ChartPoint[] =>
  growth.map((item) => {
    const date = new Date(item.month)
    const label = date.toLocaleString('en-US', { month: 'short' })
    return { month: label, users: item.newUsers }
  })

const UserGrowthChart = () => {
  const [data, setData] = useState<ChartPoint[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchGrowth = async () => {
      try {
        setLoading(true)
        const res = await getAdminUserGrowth(12)
        setData(mapGrowthToChartData(res))
        setError(null)
      } catch (err) {
        console.error('Failed to load user growth data', err)
        setError('Failed to load User Growth data.')
      } finally {
        setLoading(false)
      }
    }

    fetchGrowth()
  }, [])

  return (
    <div className="bg-white rounded-2xl p-[22px] border border-gray-100 shadow-sm">
      <div className="text-base font-bold text-gray-900">User Growth</div>
      <div className="text-xs text-gray-400 mt-0.5 mb-4">Total registered users over time</div>
      <div className="h-[220px]">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="w-7 h-7 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center text-xs text-red-500 text-center px-4">
            {error}
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No User Growth data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
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
                allowDecimals={false}
                tickFormatter={(value: number) => String(Math.round(value))}
              />
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
        )}
      </div>
    </div>
  )
}

export default UserGrowthChart
