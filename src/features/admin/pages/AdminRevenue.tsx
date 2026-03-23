import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import RevenueMetricCards from '../components/revenue/RevenueMetricCards'
import RevenueBreakdownChart from '../components/revenue/RevenueBreakdownChart'
import RevenueSummaryTable from '../components/revenue/RevenueSummaryTable'
import { getAdminRevenueStats, type AdminRevenueStats } from '../services/admin.api'

const AdminRevenue = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState<AdminRevenueStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRevenueStats = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await getAdminRevenueStats({
          tz: 'Asia/Ho_Chi_Minh'
        })

        setStats(data)
      } catch (err: any) {
        setError(err?.response?.data?.message ?? 'Failed to load revenue statistics.')
      } finally {
        setLoading(false)
      }
    }

    void fetchRevenueStats()
  }, [])

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden md:ml-[220px]">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">
              Revenue Dashboard
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Track and analyze revenue streams and financial performance
            </p>
          </motion.div>

          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {loading ? (
            <div className="rounded-2xl border border-gray-100 bg-white px-4 py-10 text-center text-sm text-gray-400">
              Loading revenue statistics...
            </div>
          ) : (
            <>
              <RevenueMetricCards stats={stats} />
              <RevenueBreakdownChart stats={stats} />
              <RevenueSummaryTable stats={stats} />
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminRevenue
