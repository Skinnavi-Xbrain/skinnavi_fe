import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import type { AdminMonthlyProductStat } from '../types/stats'

interface RevenueTrendChartProps {
  monthly?: AdminMonthlyProductStat[] | null
}

type ProductChartRow = {
  month: string
  totalProducts: number
}

const buildChartData = (monthly: AdminMonthlyProductStat[]): ProductChartRow[] => {
  return monthly.map((entry) => {
    const dateLabel = new Date(`${entry.month}-01`).toLocaleString('en-US', { month: 'short' })

    return {
      month: dateLabel,
      totalProducts: entry.totalProducts
    }
  })
}

const ProductTooltip = ({
  active,
  payload,
  label
}: {
  active?: boolean
  payload?: Array<{ payload: ProductChartRow }>
  label?: string
}) => {
  if (!active || !payload?.length) return null

  const row = payload[0].payload

  return (
    <div className="rounded-xl border border-gray-100 bg-white px-3 py-2.5 text-xs shadow-lg">
      <p className="mb-2 font-semibold text-gray-700">{label}</p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-6">
          <span className="text-gray-500">Total Products</span>
          <span className="font-semibold text-gray-900">{row.totalProducts.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

const RevenueTrendChart = ({ monthly }: RevenueTrendChartProps) => {
  const hasData = Boolean(monthly && monthly.length > 0)
  const data = hasData ? buildChartData(monthly as AdminMonthlyProductStat[]) : []

  return (
    <div className="bg-white rounded-2xl p-[22px] border border-gray-100 shadow-sm">
      <div className="text-base font-bold text-gray-900">Products By Month</div>
      <div className="text-xs text-gray-400 mt-0.5 mb-4">
        Total products added each month
      </div>
      <div className="h-[280px]">
        {!hasData ? (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No product data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 8, left: -10, bottom: 0 }}
              barCategoryGap="38%"
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
                tickFormatter={(value: number) => value.toLocaleString()}
              />
              <Tooltip content={<ProductTooltip />} cursor={{ fill: '#f9fafb' }} />
              <Bar dataKey="totalProducts" name="Total Products" fill="#4F8EF7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default RevenueTrendChart
