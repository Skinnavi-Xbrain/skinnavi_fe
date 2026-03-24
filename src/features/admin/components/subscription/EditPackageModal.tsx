import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2, ScanLine } from 'lucide-react'

type DurationType = '1 Week' | '1 Months' | '3 Months'

const DURATION_CONFIG: Record<
  DurationType,
  { days: number; weeklyScanLimit: number; label: string }
> = {
  '1 Week': { days: 7, weeklyScanLimit: 1, label: '1 scan / package' },
  '1 Months': { days: 30, weeklyScanLimit: 4, label: '4 scans / package' },
  '3 Months': { days: 90, weeklyScanLimit: 15, label: '15 scans / package' }
}

export const DAYS_TO_DURATION: Record<number, DurationType> = {
  7: '1 Week',
  30: '1 Months',
  90: '3 Months'
}

export interface EditPackagePayload {
  package_name: string
  description: string
  highlights: string[]
  duration_days: number
  price: number
  weekly_scan_limit: number
  allow_tracking: boolean
}

export interface EditPackageInitialData extends EditPackagePayload {
  id: string
  packageId?: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: EditPackagePayload) => void
  initialData: EditPackageInitialData | null
}

const EditPackageModal = ({ isOpen, onClose, onSubmit, initialData }: Props) => {
  const [form, setForm] = useState({
    package_name: '',
    description: '',
    highlights: [''],
    duration: '1 Months' as DurationType,
    price: '',
    allow_tracking: true
  })

  useEffect(() => {
    if (!isOpen || !initialData) return
    setForm({
      package_name: initialData.package_name,
      description: initialData.description,
      highlights: initialData.highlights.length ? initialData.highlights : [''],
      duration: DAYS_TO_DURATION[initialData.duration_days] ?? '1 Months',
      price: String(initialData.price),
      allow_tracking: initialData.allow_tracking
    })
  }, [isOpen, initialData])

  const config = DURATION_CONFIG[form.duration]

  const setHighlight = (i: number, v: string) => {
    const h = [...form.highlights]
    h[i] = v
    setForm({ ...form, highlights: h })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      package_name: form.package_name,
      description: form.description,
      highlights: form.highlights.filter((h) => h.trim()),
      duration_days: config.days,
      price: parseFloat(form.price) || 0,
      weekly_scan_limit: config.weeklyScanLimit,
      allow_tracking: form.allow_tracking
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto max-h-[88vh] overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <h2 className="text-[15px] font-semibold text-gray-900">Edit Package</h2>
                </div>
                <div className="flex items-center gap-2">
                  {initialData?.packageId && (
                    <span className="text-[11px] text-gray-400 font-mono">
                      {initialData.packageId}
                    </span>
                  )}
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Package Name
                  </label>
                  <input
                    required
                    value={form.package_name}
                    onChange={(e) => setForm({ ...form, package_name: e.target.value })}
                    placeholder="e.g. Premium Plan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Short description..."
                    rows={2}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all resize-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-gray-600">Highlights</label>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, highlights: [...form.highlights, ''] })}
                      className="text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {form.highlights.map((h, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={h}
                          onChange={(e) => setHighlight(i, e.target.value)}
                          placeholder={`Highlight ${i + 1}`}
                          className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                        />
                        {form.highlights.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setForm({
                                ...form,
                                highlights: form.highlights.filter((_, j) => j !== i)
                              })
                            }
                            className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Price (VND)
                    </label>
                    <input
                      required
                      type="number"
                      min={0}
                      step={1000}
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="99.000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Duration
                    </label>
                    <select
                      value={form.duration}
                      onChange={(e) =>
                        setForm({ ...form, duration: e.target.value as DurationType })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-white"
                    >
                      <option value="1 Week">1 Week (7 days)</option>
                      <option value="1 Months">1 Month (30 days)</option>
                      <option value="3 Months">3 Months (90 days)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 border border-blue-100">
                  <ScanLine className="w-4 h-4 text-blue-400 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-blue-600 font-medium">Weekly scan limit</p>
                    <p className="text-sm text-blue-800 font-semibold">{config.label}</p>
                  </div>
                  <span className="text-xs text-blue-500 bg-white border border-blue-200 px-2.5 py-1 rounded-lg">
                    Auto-set
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <div>
                    <p className="text-xs font-medium text-gray-600">Allow tracking</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Enable location & activity tracking
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, allow_tracking: !form.allow_tracking })}
                    className={`relative w-10 h-6 rounded-full transition-colors ${form.allow_tracking ? 'bg-emerald-500' : 'bg-gray-200'}`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.allow_tracking ? 'left-5' : 'left-1'}`}
                    />
                  </button>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default EditPackageModal
