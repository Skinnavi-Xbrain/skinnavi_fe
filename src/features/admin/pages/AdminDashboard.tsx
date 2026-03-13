import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import DashboardCard from '../components/DashboardCard'
import UserGrowthChart from '../components/UserGrowthChart'
import RevenueBreakdownChart from '../components/RevenueBreakdownChart'
import RevenueTrendChart from '../components/RevenueTrendChart'
import { metrics } from '../data/dashboardData'

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div
      className="flex bg-[#F5F6FA] min-h-screen"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 md:ml-[220px] flex flex-col min-h-screen">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-5 md:p-7 pb-10 flex-1">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl md:text-[22px] font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back! Here's what's happening with SkinNavi today.
            </p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {metrics.map((m) => (
              <DashboardCard key={m.title} {...m} />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
            <UserGrowthChart />
            <RevenueBreakdownChart />
          </div>

          {/* Revenue Trends */}
          <RevenueTrendChart />
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
