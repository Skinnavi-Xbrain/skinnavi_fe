import { Star, Clock, Calendar, ShieldCheck, XCircle } from 'lucide-react'
import type { UserSubscription } from '../services/subscription.api'

interface CurrentPlanProps {
  subscription: UserSubscription
  onCancel: (id: string) => void
}

export const CurrentPlan = ({ subscription, onCancel }: CurrentPlanProps) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    })

  return (
    <div className="relative bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 mb-10 md:mb-20 border-2 border-blue-100 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-8">
      <div className="absolute -top-3.5 left-6 md:left-10 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg uppercase z-20">
        <ShieldCheck className="w-3 h-3" /> Current Plan
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-6 flex-grow">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl md:rounded-[24px] flex items-center justify-center text-white shrink-0 shadow-lg">
          <Star fill="white" size={28} />
        </div>
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              {subscription.package.name}
            </h2>
            <div
              className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase ${
                subscription.status === 'ACTIVE'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  : 'bg-red-50 text-red-600 border-red-100'
              }`}
            >
              {subscription.status}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-2">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-blue-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Started:{' '}
                <span className="text-slate-800 ml-1">{formatDate(subscription.startDate)}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-blue-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Expires:{' '}
                <span className="text-slate-800 ml-1">{formatDate(subscription.endDate)}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:w-[280px]">
        {subscription.status === 'ACTIVE' && (
          <button
            onClick={() => onCancel(subscription.id)}
            className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl border-2 border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all text-[11px] font-black uppercase tracking-widest"
          >
            <XCircle size={14} />
            Cancel Subscription
          </button>
        )}
      </div>
    </div>
  )
}
