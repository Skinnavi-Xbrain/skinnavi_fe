import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import RevenueMetricCards from '../components/revenue/RevenueMetricCards'
import RevenueBreakdownChart from '../components/revenue/RevenueBreakdownChart'
import RevenueSummaryTable from '../components/revenue/RevenueSummaryTable'

const AdminRevenue = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

          <RevenueMetricCards />
          <RevenueBreakdownChart />
          <RevenueSummaryTable />
        </main>
      </div>
    </div>
  )
}

export default AdminRevenue
