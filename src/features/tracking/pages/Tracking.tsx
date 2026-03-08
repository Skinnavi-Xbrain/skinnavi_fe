import { useEffect, useState } from 'react'
import { PageHeader } from '../components/Pageheader'
import { SkinCalendar } from '../components/SkinCalendar'
import HealthProgress from '../components/HealthProgress'
import { ComparisonSlider } from '../components/ComparisonSlider'
import { AIInsights } from '../components/AIInsights'
import { StatusHeader } from '../components/StatusHeader'
import { getTrackingOverview } from '../services/tracking.api'
import type { TrackingOverview } from '../services/tracking.api'

export default function Tracking() {
  const [tracking, setTracking] = useState<TrackingOverview | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrackingOverview()
        setTracking(data)
      } catch {}
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-blue-50 font-sans">
      <PageHeader title="Tracking" />
      <StatusHeader />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SkinCalendar tracking={tracking} />
          {tracking?.skin_analyses && tracking.skin_analyses.length > 0 ? (
            <HealthProgress
              data={[...tracking.skin_analyses]
                .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                .slice(-5)
                .map((a) => ({
                  label: a.created_at.split('T')[0],
                  score: a.overall_score ?? 0,
                  pores: a.metrics.find((m) => m.metric_type === 'PORES')?.score ?? 0,
                  acnes: a.metrics.find((m) => m.metric_type === 'ACNE')?.score ?? 0,
                  darkCircles: a.metrics.find((m) => m.metric_type === 'DARK_CIRCLES')?.score ?? 0,
                  darkPots: a.metrics.find((m) => m.metric_type === 'DARK_SPOTS')?.score ?? 0
                }))}
            />
          ) : (
            <HealthProgress />
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComparisonSlider tracking={tracking} />
          <AIInsights tracking={tracking} />
        </div>
      </main>
    </div>
  )
}
