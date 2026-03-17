import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit2, Trash2, ScanLine, Plus, AlertTriangle } from 'lucide-react'
import CreatePackageModal from './CreatePackageModal'
import EditPackageModal from './EditPackageModal'
import type { CreatePackagePayload } from './CreatePackageModal'
import type { EditPackageInitialData, EditPackagePayload } from './EditPackageModal'

type PackageStatus = 'Active' | 'Inactive' | 'Expired'

interface SubscriptionPackage {
  id: string
  packageId: string
  package_name: string
  description: string
  highlights: string[]
  price: number
  duration_days: number
  weekly_scan_limit: number
  allow_tracking: boolean
  activeSubscribers: number
  status: PackageStatus
}

const DAYS_TO_LABEL: Record<number, string> = {
  7: '1 Week',
  30: '1 Months',
  90: '3 Months'
}

const MOCK_PACKAGES: SubscriptionPackage[] = [
  {
    id: '1',
    packageId: 'PKG001',
    package_name: 'Basic Plan',
    description: 'Perfect for individuals getting started.',
    highlights: ['1 active scan', 'Basic reports', 'Email support'],
    price: 9.99,
    duration_days: 7,
    weekly_scan_limit: 1,
    allow_tracking: false,
    activeSubscribers: 1523,
    status: 'Active'
  },
  {
    id: '2',
    packageId: 'PKG002',
    package_name: 'Premium Plan',
    description: 'Best value for regular users.',
    highlights: ['Unlimited exports', 'Priority support', 'Advanced analytics', 'API access'],
    price: 24.99,
    duration_days: 30,
    weekly_scan_limit: 3,
    allow_tracking: true,
    activeSubscribers: 2847,
    status: 'Active'
  },
  {
    id: '3',
    packageId: 'PKG003',
    package_name: 'Annual Premium',
    description: 'Maximum value for power users.',
    highlights: ['Everything in Premium', 'Dedicated manager', 'Custom integrations'],
    price: 249.99,
    duration_days: 90,
    weekly_scan_limit: 5,
    allow_tracking: true,
    activeSubscribers: 451,
    status: 'Active'
  }
]

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: PackageStatus }) => {
  const styles: Record<PackageStatus, string> = {
    Active: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    Inactive: 'bg-gray-100 text-gray-500 border border-gray-200',
    Expired: 'bg-red-50 text-red-500 border border-red-100'
  }
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  )
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
interface DeleteConfirmModalProps {
  isOpen: boolean
  packageName: string
  onConfirm: () => void
  onCancel: () => void
}

const DeleteConfirmModal = ({
  isOpen,
  packageName,
  onConfirm,
  onCancel
}: DeleteConfirmModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto p-6">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
            </div>

            {/* Text */}
            <div className="text-center mb-6">
              <h3 className="text-[15px] font-semibold text-gray-900 mb-1.5">Delete Package</h3>
              <p className="text-sm text-gray-500">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-gray-700">"{packageName}"</span>?
                <br />
                This action cannot be undone.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

// ─── Main Table ───────────────────────────────────────────────────────────────
const SubscriptionPackagesTable = () => {
  const [packages, setPackages] = useState<SubscriptionPackage[]>(MOCK_PACKAGES)
  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<SubscriptionPackage | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<SubscriptionPackage | null>(null)

  const handleCreate = (payload: CreatePackagePayload) => {
    const newPkg: SubscriptionPackage = {
      id: String(Date.now()),
      packageId: `PKG${String(packages.length + 1).padStart(3, '0')}`,
      activeSubscribers: 0,
      status: 'Active',
      ...payload
    }
    setPackages((prev) => [...prev, newPkg])
  }

  const handleUpdate = (payload: EditPackagePayload) => {
    if (!editTarget) return
    setPackages((prev) => prev.map((p) => (p.id === editTarget.id ? { ...p, ...payload } : p)))
  }

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return
    setPackages((prev) => prev.filter((p) => p.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  const toEditData = (pkg: SubscriptionPackage): EditPackageInitialData => ({
    id: pkg.id,
    packageId: pkg.packageId,
    package_name: pkg.package_name,
    description: pkg.description,
    highlights: pkg.highlights,
    duration_days: pkg.duration_days,
    price: pkg.price,
    weekly_scan_limit: pkg.weekly_scan_limit,
    allow_tracking: pkg.allow_tracking
  })

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900">Subscription Packages</h3>
            <p className="text-xs text-gray-400 mt-0.5">{packages.length} packages total</p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            New Package
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[780px]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  {[
                    'Package ID',
                    'Name',
                    'Price',
                    'Duration',
                    'Scan Limit',
                    'Tracking',
                    'Subscribers',
                    'Status',
                    'Actions'
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence initial={false}>
                  {packages.map((pkg) => (
                    <motion.tr
                      key={pkg.id}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.18 }}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="px-5 py-4 text-[12px] font-mono text-gray-400">
                        {pkg.packageId}
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-[13px] font-semibold text-gray-900">
                          {pkg.package_name}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 max-w-[160px] truncate">
                          {pkg.description}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[13px] font-semibold text-gray-900">
                        ${pkg.price.toFixed(2)}
                      </td>
                      <td className="px-5 py-4 text-[13px] text-gray-600 whitespace-nowrap">
                        {DAYS_TO_LABEL[pkg.duration_days] ?? `${pkg.duration_days}d`}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 text-[12px] text-gray-600">
                          <ScanLine className="w-3 h-3 text-gray-400" />
                          {pkg.weekly_scan_limit}/wk
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex w-2 h-2 rounded-full ${pkg.allow_tracking ? 'bg-emerald-400' : 'bg-gray-300'}`}
                        />
                      </td>
                      <td className="px-5 py-4 text-[13px] font-medium text-blue-500">
                        {pkg.activeSubscribers.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={pkg.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditTarget(pkg)}
                            className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(pkg)}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {packages.length === 0 && (
              <div className="py-16 text-center text-sm text-gray-400">No packages yet.</div>
            )}
          </div>
        </div>
      </motion.div>

      <CreatePackageModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
      />

      <EditPackageModal
        isOpen={!!editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={handleUpdate}
        initialData={editTarget ? toEditData(editTarget) : null}
      />

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        packageName={deleteTarget?.package_name ?? ''}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}

export default SubscriptionPackagesTable
