import { useState } from 'react'
import { motion } from 'framer-motion'
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
