import { Scan, Zap, Info } from 'lucide-react'
import type { CurrentPackageData } from '../types/profile'

interface SubscriptionStatusProps {
  currentPackage: CurrentPackageData | string
}

export const SubscriptionStatus = ({ currentPackage }: SubscriptionStatusProps) => {
  const isSubscriber = typeof currentPackage !== 'string'

  if (!isSubscriber) {
    return (
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <Zap className="text-gray-400" size={24} />
        </div>
        <h4 className="font-bold text-gray-800">Free Account</h4>
        <p className="text-sm text-gray-500 mt-1">
          Upgrade to start your professional skin analysis.
        </p>
      </div>
    )
  }

  const { used, remaining } = currentPackage.scanDetails
  const total = used + remaining
  const usagePercentage = (used / total) * 100

  return (
    <div className="bg-white p-6 rounded-3xl border border-blue-50 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Active Plan
          </span>
          <h4 className="text-xl font-bold text-gray-900 mt-1">{currentPackage.name}</h4>
        </div>
        <div className="text-right text-xs text-gray-400">
          Expires: {new Date(currentPackage.endDate).toLocaleDateString('en-GB')}{' '}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-2 text-gray-700">
            <Scan size={18} className="text-blue-500" />
            <span className="font-semibold italic">Analysis Limit</span>
          </div>
          <div className="text-sm">
            <span className="text-2xl font-black text-blue-600">{remaining}</span>
            <span className="text-gray-400 font-medium"> / {total} left</span>
          </div>
        </div>

        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#67AEFF] rounded-full transition-all duration-500"
            style={{ width: `${100 - usagePercentage}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Total Used</p>
            <p className="text-lg font-bold text-gray-700">
              {used} <span className="text-xs font-normal">times</span>
            </p>
          </div>
          <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 text-left">
            <p className="text-[10px] text-emerald-600 uppercase font-bold mb-1">Available</p>
            <p className="text-lg font-bold text-emerald-700">
              {remaining} <span className="text-xs font-normal">turns</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[11px] text-gray-400 bg-gray-50 p-2 rounded-lg">
        <Info size={14} />
        <span>Each scan analyzes your skin metrics and updates your routine.</span>
      </div>
    </div>
  )
}
