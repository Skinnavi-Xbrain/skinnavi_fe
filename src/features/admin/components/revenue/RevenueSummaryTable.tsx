import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const MONTHLY_DATA = [
  { month: 'Jan', subscriptions: 45000, affiliateProducts: 12000 },
  { month: 'Feb', subscriptions: 52000, affiliateProducts: 15000 },
  { month: 'Mar', subscriptions: 61000, affiliateProducts: 18000 },
  { month: 'Apr', subscriptions: 72000, affiliateProducts: 22000 },
  { month: 'May', subscriptions: 85000, affiliateProducts: 26000 },
  { month: 'Jun', subscriptions: 98000, affiliateProducts: 31000 }
]

const SUMMARY_ROWS = MONTHLY_DATA.map((d, i) => {
  const total = d.subscriptions + d.affiliateProducts
  const prevTotal =
    i === 0 ? null : MONTHLY_DATA[i - 1].subscriptions + MONTHLY_DATA[i - 1].affiliateProducts
  const growth = prevTotal ? (((total - prevTotal) / prevTotal) * 100).toFixed(1) : null
  return {
    month: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]} 2026`,
    subscriptions: d.subscriptions,
    affiliateProducts: d.affiliateProducts,
    total,
    growth
  }
})

const fmt = (n: number) => {
  if (n >= 1000) return `$${(n / 1000).toFixed(0)},000`
  return `$${n}`
}

const TABLE_HEADERS = ['Month', 'Subscriptions', 'Affiliate Products', 'Total Revenue', 'Growth']

const RevenueSummaryTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-gray-50">
        <h3 className="text-[15px] font-semibold text-gray-900">Monthly Revenue Summary</h3>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[480px]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                {TABLE_HEADERS.map((h) => (
                  <th
                    key={h}
                    className="px-4 md:px-6 py-3 text-left text-[10px] md:text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SUMMARY_ROWS.map((row) => (
                <tr key={row.month} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 md:px-6 py-3.5 text-[12px] md:text-[13px] font-medium text-gray-700 whitespace-nowrap">
                    {row.month}
                  </td>
                  <td className="px-4 md:px-6 py-3.5 text-[12px] md:text-[13px] text-gray-600 whitespace-nowrap">
                    {fmt(row.subscriptions)}
                  </td>
                  <td className="px-4 md:px-6 py-3.5 text-[12px] md:text-[13px] text-gray-600 whitespace-nowrap">
                    {fmt(row.affiliateProducts)}
                  </td>
                  <td className="px-4 md:px-6 py-3.5 text-[12px] md:text-[13px] font-bold text-gray-900 whitespace-nowrap">
                    {fmt(row.total)}
                  </td>
                  <td className="px-4 md:px-6 py-3.5">
                    {row.growth ? (
                      <span className="flex items-center gap-1 text-[12px] md:text-[13px] font-semibold text-emerald-500 whitespace-nowrap">
                        <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" />
                        {row.growth}%
                      </span>
                    ) : (
                      <span className="text-gray-300 text-[13px]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

export default RevenueSummaryTable
