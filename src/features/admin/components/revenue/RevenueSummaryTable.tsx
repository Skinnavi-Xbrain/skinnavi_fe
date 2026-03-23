import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import type { AdminRevenueStats } from '../../services/admin.api'

const fmt = (n: number) => {
  return `${n.toLocaleString('en-US')}`
}

const TABLE_HEADERS = [
  'Month',
  'Subscriptions',
  'Advertisement',
  'Affiliate Products',
  'Total Revenue',
  'Growth'
]

type RevenueSummaryTableProps = {
  stats: AdminRevenueStats | null
}

const RevenueSummaryTable = ({ stats }: RevenueSummaryTableProps) => {
  const summaryRows = (stats?.monthly ?? []).map((row, index, source) => {
    const previousTotal = index > 0 ? source[index - 1].total : null
    const growth =
      previousTotal && previousTotal > 0
        ? (((row.total - previousTotal) / previousTotal) * 100).toFixed(1)
        : null

    return {
      month: row.month,
      subscriptions: row.subscription,
      advertisement: row.ads,
      affiliateProducts: row.affiliate,
      total: row.total,
      growth
    }
  })

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
              {summaryRows.map((row) => (
                <tr key={row.month} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 md:px-6 py-3.5 text-[12px] md:text-[13px] font-medium text-gray-700 whitespace-nowrap">
                    {row.month}
                  </td>
                  <td className="px-4 md:px-6 py-3.5 text-[12px] md:text-[13px] text-gray-600 whitespace-nowrap">
                    {fmt(row.subscriptions)}
                  </td>
                  <td className="px-4 md:px-6 py-3.5 text-[12px] md:text-[13px] text-gray-600 whitespace-nowrap">
                    {fmt(row.advertisement)}
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
                      <span className="text-gray-300 text-[13px]">-</span>
                    )}
                  </td>
                </tr>
              ))}
              {summaryRows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 md:px-6 py-8 text-center text-[13px] text-gray-400"
                  >
                    No revenue data available for this period.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}

export default RevenueSummaryTable
