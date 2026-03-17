import { motion } from 'framer-motion'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as LineTooltip,
  Dot
} from 'recharts'

const STATUS_DATA = [
  { name: 'Active', value: 4521, color: '#22c55e' },
  { name: 'Expired', value: 892, color: '#ef4444' },
  { name: 'Cancelled', value: 234, color: '#d1d5db' }
]

const TREND_DATA = [
  { month: 'Jan', rate: 14 },
  { month: 'Feb', rate: 17 },
  { month: 'Mar', rate: 18 },
  { month: 'Apr', rate: 22 },
  { month: 'May', rate: 26 },
  { month: 'Jun', rate: 29 }
]

const total = STATUS_DATA.reduce((s, d) => s + d.value, 0)

const SubscriptionCharts = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="grid grid-cols-1 lg:grid-cols-2 gap-4"
  >
    {/* Donut Chart */}
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-[15px] font-semibold text-gray-900 mb-5">Subscription Status</h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={STATUS_DATA}
                cx="50%"
                cy="50%"
                innerRadius="58%"
                outerRadius="82%"
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {STATUS_DATA.map((d, i) => (
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
            <span className="text-[11px] text-gray-400">Total</span>
          </div>
        </div>
        <div className="flex sm:flex-col flex-row justify-around sm:justify-start gap-x-2 sm:gap-x-0 gap-y-3 flex-1 w-full">
          {STATUS_DATA.map((d) => (
            <div
              key={d.name}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-center gap-1 sm:gap-2"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: d.color }}
                />
                <span className="text-sm text-gray-600 whitespace-nowrap">{d.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {d.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Line Chart */}
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-[15px] font-semibold text-gray-900 mb-5">Conversion Rate Trend</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={TREND_DATA} margin={{ top: 5, right: 8, left: -22, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <LineTooltip
            formatter={(v: number) => [`${v}%`, 'Conversion Rate']}
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
    </div>
  </motion.div>
)

export default SubscriptionCharts