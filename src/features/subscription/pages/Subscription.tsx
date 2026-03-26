import { useEffect, useState } from 'react'
import { Loader2, Receipt } from 'lucide-react'
import { RoutinePackages } from '@/features/analysis-result/components/RoutinePackages'
import { toast } from '@/shared/hooks/use-toast'
import {
  getMySubscriptions,
  cancelSubscription,
  type UserSubscription
} from '../services/subscription.api'
import { CurrentPlan } from '../components/CurrentPlan'
import { CancelConfirmModal } from '../components/CancelConfirmModal'
import { SubscriptionHistory } from '../components/SubscriptionHistory'

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([])
  const [loading, setLoading] = useState(true)
  const [cancelingId, setCancelingId] = useState<string | null>(null)
  const [isActionLoading, setIsActionLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await getMySubscriptions()
      setSubscriptions(data)
    } catch {
      toast({
        title: 'Connection Error',
        description: 'Could not load subscription data. Please check your connection.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleConfirmCancel = async () => {
    if (!cancelingId) return
    try {
      setIsActionLoading(true)
      await cancelSubscription(cancelingId)
      toast({
        title: 'Success',
        description: 'Your subscription has been cancelled successfully.',
        variant: 'success'
      })
      await fetchData()
    } catch {
      toast({
        title: 'Action Failed',
        description: 'Unable to cancel subscription. Please try again later.',
        variant: 'destructive'
      })
    } finally {
      setIsActionLoading(false)
      setCancelingId(null)
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    )

  const activeSub = subscriptions.find((s) => s.status === 'ACTIVE')

  return (
    <div className="min-h-screen bg-white pb-24 font-['Poppins'] text-slate-900 overflow-x-hidden">
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-3 animate-slideInRight uppercase">
            SUBSCRIPTION
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm md:text-base animate-fadeIn">
            <a
              href="/"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
            >
              Home
            </a>
            <span className="text-gray-400">&gt;&gt;</span>
            <a
              href="/profile"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
            >
              Profile
            </a>
            <span className="text-gray-400">&gt;&gt;</span>
            <span className="text-blue-500 font-medium">Subscription</span>
          </nav>
        </div>
      </section>

      <div className="mx-auto md:p-12 mt-10 md:mt-16">
        <div className="mb-12 px-5 md:px-0">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-5 bg-blue-500 rounded-full" />
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">
              Active Status
            </h3>
          </div>

          {activeSub ? (
            <CurrentPlan subscription={activeSub} onCancel={(id) => setCancelingId(id)} />
          ) : (
            <div className="p-10 text-center bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium italic">
                You don't have any active subscription plan at the moment.
              </p>
            </div>
          )}
        </div>

        <div className="mb-20">
          <RoutinePackages />
        </div>

        <div className="pt-10 px-5 md:px-0 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <Receipt className="text-blue-500 w-5 h-5" />
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              Subscription History
            </h3>
          </div>

          <SubscriptionHistory subscriptions={subscriptions} />
        </div>
      </div>

      <CancelConfirmModal
        open={!!cancelingId}
        onClose={() => setCancelingId(null)}
        onConfirm={handleConfirmCancel}
        isLoading={isActionLoading}
      />
    </div>
  )
}

export default Subscription
