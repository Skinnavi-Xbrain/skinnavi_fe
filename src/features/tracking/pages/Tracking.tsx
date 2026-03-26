import { useEffect, useState, useMemo } from 'react'
import { PageHeader } from '../components/Pageheader'
import { SkinCalendar } from '../components/SkinCalendar'
import HealthProgress from '../components/HealthProgress'
import { ComparisonSlider } from '../components/ComparisonSlider'
import { AIInsights } from '../components/AIInsights'
import { StatusHeader } from '../components/StatusHeader'
import { getUserSkinAnalyses, getDailyLogs } from '../services/tracking.api'
import { validateSubscription } from '@/features/payment/services/payment.api'
import { toast } from '@/shared/hooks/use-toast'
import type { TrackingOverview, SkinAnalysis, Routine } from '../types'
import type { ValidateSubscriptionResponse } from '@/features/payment/types'

export default function Tracking() {
  const [skinAnalyses, setSkinAnalyses] = useState<SkinAnalysis[]>([])
  const [allSkinAnalyses, setAllSkinAnalyses] = useState<SkinAnalysis[]>([])
  const [dailyLogs, setDailyLogs] = useState<Routine[]>([])
  const [subscription, setSubscription] = useState<ValidateSubscriptionResponse>()

  const tracking: TrackingOverview | null = useMemo(
    () =>
      skinAnalyses.length > 0 || dailyLogs.length > 0
        ? {
            user_id: '',
            full_name: '',
            email: '',
            avatar_url: null,
            skin_analyses: skinAnalyses,
            routines: dailyLogs
          }
        : null,
    [skinAnalyses, dailyLogs]
  )

  const fullTracking: TrackingOverview | null = useMemo(
    () =>
      allSkinAnalyses.length > 0 || dailyLogs.length > 0
        ? {
            user_id: '',
            full_name: '',
            email: '',
            avatar_url: null,
            skin_analyses: allSkinAnalyses,
            routines: dailyLogs
          }
        : null,
    [allSkinAnalyses, dailyLogs]
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subRes = await validateSubscription()
        setSubscription(subRes)

        if (!subRes.isValid) {
          toast({
            title: 'Subscription Required',
            description: subRes.message,
            variant: 'destructive'
          })
          return
        }

        const [skinData, logsData] = await Promise.all([getUserSkinAnalyses(), getDailyLogs()])

        setSkinAnalyses(skinData.skin_analyses)
        setDailyLogs(logsData.routines)

        const allData = await getUserSkinAnalyses(365)
        setAllSkinAnalyses(allData.skin_analyses)
      } catch (error) {
        console.error('Error fetching tracking data:', error)
      }
    }

    fetchData()
  }, [])

  const handleSkinFilterChange = async (days: number | undefined) => {
    if (subscription && !subscription.isValid) return

    try {
      const skinData = await getUserSkinAnalyses(days)
      setSkinAnalyses(skinData.skin_analyses)
    } catch (error) {
      console.error('Error fetching skin analyses:', error)
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 font-sans">
      <div className="animate-fadeIn">
        <PageHeader title="Tracking" />
      </div>

      <div className="animate-slideInBottom">
        <StatusHeader />
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="animate-slideInLeft">
            <SkinCalendar tracking={tracking} />
          </div>

          <div className="animate-slideInBottom [animation-delay:200ms]">
            <HealthProgress
              data={skinAnalyses
                .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                .map((a) => ({
                  label: new Date(a.created_at).toLocaleDateString('en', {
                    month: 'short',
                    day: 'numeric'
                  }),
                  date: a.created_at,
                  score: a.overall_score ?? 0,
                  pores: a.metrics.find((m) => m.metric_type === 'PORES')?.score ?? 0,
                  acnes: a.metrics.find((m) => m.metric_type === 'ACNE')?.score ?? 0,
                  darkCircles: a.metrics.find((m) => m.metric_type === 'DARK_CIRCLES')?.score ?? 0,
                  darkPots: a.metrics.find((m) => m.metric_type === 'DARK_SPOTS')?.score ?? 0
                }))}
              onDateFilterChange={handleSkinFilterChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-slideInLeft [animation-delay:400ms]">
            <ComparisonSlider tracking={fullTracking} />
          </div>
          <div className="animate-slideInBottom [animation-delay:600ms]">
            <AIInsights tracking={fullTracking} />
          </div>
        </div>
      </main>
    </div>
  )
}
