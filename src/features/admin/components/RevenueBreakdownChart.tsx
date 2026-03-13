import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { revenueBreakdown } from '../data/dashboardData'

const RevenueBreakdownChart = () => (
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
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} />
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
                ${(item.value / 1000).toFixed(0)}K
              </span>
              <span className="text-[11px] text-gray-400 ml-1.5">{item.pct}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default RevenueBreakdownChart
