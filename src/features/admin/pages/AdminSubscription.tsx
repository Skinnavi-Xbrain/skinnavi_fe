import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import SubscriptionMetricCards from '../components/subscription/SubscriptionMetricCards'
import SubscriptionCharts from '../components/subscription/SubscriptionCharts'
import SubscriptionPackagesTable from '../components/subscription/SubscriptionPackagesTable'
import CreatePackageModal from '../components/subscription/CreatePackageModal'

const AdminSubscription = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden md:ml-[220px]">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between gap-4"
          >
            <div>
              <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">
                Subscription Management
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">
                Manage subscription packages and monitor performance
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 active:scale-[.98] text-white text-[13px] font-semibold rounded-xl transition-all shadow-sm shadow-blue-200 shrink-0"
            >
              <Plus className="w-4 h-4" />
              Create Package
            </button>
          </motion.div>

          <SubscriptionMetricCards />
          <SubscriptionCharts />
          <SubscriptionPackagesTable />
        </main>
      </div>

      <CreatePackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(payload) => {
          console.log('New package:', payload)
          setIsModalOpen(false)
        }}
      />
    </div>
  )
}

export default AdminSubscription
