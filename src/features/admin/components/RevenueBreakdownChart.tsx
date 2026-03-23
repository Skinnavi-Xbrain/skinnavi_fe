import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import type { RevenueItem } from '../types'
import type { AdminRevenueTotals } from '../types/stats'

const formatCompactVnd = (value: number) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B `
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M `
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K `
  return `${value.toLocaleString('vi-VN')} `
}

interface RevenueBreakdownChartProps {
  totals?: AdminRevenueTotals | null
}

const mapTotalsToData = (totals: AdminRevenueTotals): RevenueItem[] => {
  const total = totals.total || 1

  const items: Omit<RevenueItem, 'pct'>[] = [
    { name: 'Subscriptions', value: totals.subscription, color: '#4F8EF7' },
    { name: 'Affiliate Links', value: totals.affiliate, color: '#26C6DA' },
    { name: 'Advertisements', value: totals.ads, color: '#9C6FE4' }
  ]

  return items.map((item) => ({
    ...item,
    pct: `${Math.round((item.value / total) * 100)}%`
  }))
}

const RevenueBreakdownChart = ({ totals }: RevenueBreakdownChartProps) => {
  const revenueBreakdown: RevenueItem[] = totals ? mapTotalsToData(totals) : []

  return (
    <div className="bg-white rounded-2xl p-[22px] border border-gray-100 shadow-sm">
      <div className="text-base font-bold text-gray-900">Revenue Breakdown</div>
      <div className="text-xs text-gray-400 mt-0.5 mb-2">Revenue sources distribution</div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="h-[200px] w-[150px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={revenueBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={72}
                dataKey="value"
                paddingAngle={3}
              >
                {revenueBreakdown.map((entry, i) => (
                  <Cell key={entry.name ?? i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => `${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 min-w-[120px]">
          {revenueBreakdown.map((item) => (
            <div key={item.name} className="mb-[14px]">
              <div className="flex items-center gap-[7px] mb-0.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                <span className="text-xs text-gray-700 font-medium">{item.name}</span>
              </div>
              <div className="pl-[17px]">
                <span className="text-sm font-bold text-gray-900">
                  {formatCompactVnd(item.value)}
                </span>
                <span className="text-[11px] text-gray-400 ml-1.5">{item.pct}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RevenueBreakdownChart
