import { useEffect, useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import DashboardCard from '../components/DashboardCard'
import UserGrowthChart from '../components/UserGrowthChart'
import RevenueBreakdownChart from '../components/RevenueBreakdownChart'
import RevenueTrendChart from '../components/RevenueTrendChart'
import type { Metric } from '../types'
import {
  getAdminActiveSubscriptions,
  getAdminRevenueStats,
  getAdminUserStats
} from '../services/admin.api'
import type { AdminActiveSubscriptions, AdminRevenueStats, AdminUserStats } from '../types/stats'

const baseMetricStyles: Pick<Metric, 'bg' | 'iconColor'>[] = [
  { bg: '#EEF3FF', iconColor: '#6B9CF6' },
  { bg: '#EAFAF3', iconColor: '#34C98C' },
  { bg: '#FFF7EC', iconColor: '#F6A73B' },
  { bg: '#F0EEFF', iconColor: '#7C6FE4' }
]

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [users, setUsers] = useState<AdminUserStats | null>(null)
  const [subscriptions, setSubscriptions] = useState<AdminActiveSubscriptions | null>(null)
  const [revenue, setRevenue] = useState<AdminRevenueStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [userStats, subStats, revenueStats] = await Promise.all([
          getAdminUserStats(),
          getAdminActiveSubscriptions(),
          getAdminRevenueStats()
        ])

        setUsers(userStats)
        setSubscriptions(subStats)
        setRevenue(revenueStats)
        setError(null)
      } catch (err) {
        console.error(err)
        setError('Không thể tải dữ liệu dashboard. Vui lòng thử lại sau.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const metrics: Metric[] = useMemo(() => {
    const totalUsers = users?.totalUsers
    const activeUsers = users?.activeUsers
    const totalRevenue = revenue?.totals.total
    const activeSubs = subscriptions?.activeSubscriptions

    const values = [
      totalUsers != null ? totalUsers.toLocaleString() : '—',
      activeUsers != null ? activeUsers.toLocaleString() : '—',
      totalRevenue != null ? `$${totalRevenue.toLocaleString()}` : '—',
      activeSubs != null ? activeSubs.toLocaleString() : '—'
    ]

    return ['Total Users', 'Active Users', 'Total Revenue', 'Active Subscriptions'].map(
      (title, idx) => ({
        title,
        value: values[idx],
        change: '+0.0%',
        positive: true,
        bg: baseMetricStyles[idx].bg,
        iconColor: baseMetricStyles[idx].iconColor
      })
    )
  }, [users, revenue, subscriptions])

  return (
    <div
      className="flex bg-[#F5F6FA] min-h-screen"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 md:ml-[220px] flex flex-col min-h-screen">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-5 md:p-7 pb-10 flex-1">
          <div className="mb-6">
            <h1 className="text-xl md:text-[22px] font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back! Here's what's happening with SkinNavi today.
            </p>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="w-9 h-9 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            </div>
          )}

          {!loading && error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                {metrics.map((m) => (
                  <DashboardCard key={m.title} {...m} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
                <UserGrowthChart />
                <RevenueBreakdownChart totals={revenue?.totals} />
              </div>

              <RevenueTrendChart monthly={revenue?.monthly} />
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
