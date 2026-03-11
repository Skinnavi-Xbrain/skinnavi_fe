import { useEffect, useState } from 'react'
import { PageHeader } from '../components/Pageheader'
import { SkinCalendar } from '../components/SkinCalendar'
import HealthProgress from '../components/HealthProgress'
import { ComparisonSlider } from '../components/ComparisonSlider'
import { AIInsights } from '../components/AIInsights'
import { StatusHeader } from '../components/StatusHeader'
import { getTrackingOverview, getUserSkinAnalyses, getDailyLogs } from '../services/tracking.api'
import type { TrackingOverview, SkinAnalysis, Routine } from '../services/tracking.api'

export default function Tracking() {
  const [tracking, setTracking] = useState<TrackingOverview | null>(null)
  const [skinAnalyses, setSkinAnalyses] = useState<SkinAnalysis[]>([])
  const [dailyLogs, setDailyLogs] = useState<Routine[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overviewData, skinData, logsData] = await Promise.all([
          getTrackingOverview(),
          getUserSkinAnalyses(),
          getDailyLogs()
        ])
        setTracking(overviewData)
        setSkinAnalyses(skinData.skin_analyses)
        setDailyLogs(logsData.routines)
      } catch (error) {
        console.error('Error fetching tracking data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-blue-50 font-sans">
      <PageHeader title="Tracking" />
      <StatusHeader />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SkinCalendar tracking={{ ...tracking, routines: dailyLogs } as TrackingOverview} />
          {skinAnalyses.length > 0 ? (
            <HealthProgress
              data={[...skinAnalyses]
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
            />
          ) : (
            <HealthProgress />
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComparisonSlider
            tracking={{ ...tracking, skin_analyses: skinAnalyses } as TrackingOverview}
          />
          <AIInsights tracking={tracking} />
        </div>
      </main>
    </div>
  )
}
