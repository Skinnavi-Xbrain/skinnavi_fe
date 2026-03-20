import { useState, useEffect, useMemo } from 'react'
import { Loader2 } from 'lucide-react'
import { getUserRoutines } from '../services/daily-routine.api'
import { getDailyLogs, updateDailyLog } from '@/features/tracking/services/tracking.api'
import { validateSubscription } from '@/features/payment/services/payment.api'
import type { Routine, RoutineTime } from '../types'
import Calendar from '../components/Calendar'
import RoutineSteps from '../components/RoutineSteps'
import RoutineTabs from '../components/RoutineTabs'
import { DailyLogCheckIn } from '../components/DailyLogCheckIn'
import { toast } from '@/shared/hooks/use-toast'
import type { Routine as TrackingRoutine } from '@/features/tracking/types'
import type { ApiErrorResponse } from '@/shared/types/api'
import type { ValidateSubscriptionResponse } from '@/features/payment/types'

const DailyRoutine = () => {
  const [activeTab, setActiveTab] = useState<RoutineTime>('morning')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [routines, setRoutines] = useState<{ morning?: Routine; evening?: Routine }>({})
  const [trackingRoutines, setTrackingRoutines] = useState<TrackingRoutine[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [subscription, setSubscription] = useState<ValidateSubscriptionResponse>()

  function toDateOnlyString(date: Date) {
    return date.toISOString().split('T')[0]
  }

  const currentLogStatus = useMemo(() => {
    const todayStr = toDateOnlyString(new Date())
    const targetTime = activeTab.toUpperCase()

    const targetRoutine = trackingRoutines.find((r) => r.routine_time === targetTime)

    const todayLog = targetRoutine?.daily_logs.find((log) => {
      const logDateStr = toDateOnlyString(new Date(log.log_date))
      return logDateStr === todayStr
    })

    return {
      id: todayLog?.id || null,
      isCompleted: todayLog?.is_completed || false
    }
  }, [activeTab, trackingRoutines])

  const handleCheckIn = async () => {
    if (subscription && !subscription.isValid) return

    setIsChecking(true)

    try {
      if (!trackingRoutines || trackingRoutines.length === 0) {
        toast({
          title: 'No Routine Found',
          description: 'You need to create a routine before you can check in.',
          variant: 'destructive'
        })
        return
      }

      const todayStr = toDateOnlyString(new Date())
      const targetTime = activeTab.toUpperCase()

      const targetRoutine = trackingRoutines.find((r) => r.routine_time === targetTime)

      const todayLog = targetRoutine?.daily_logs.find((log) => {
        const logDateStr = toDateOnlyString(new Date(log.log_date))
        return logDateStr === todayStr
      })

      if (!todayLog?.id) {
        if (targetRoutine) {
          const start = new Date(targetRoutine.subscription_start_date)
          const end = new Date(targetRoutine.subscription_end_date)
          const diffInDays = Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24))

          if (diffInDays <= 7) {
            toast({
              title: 'Upgrade Required',
              description:
                'The current plan does not support daily tracking. Please upgrade to a Standard or Premium plan to access this feature.',
              variant: 'destructive'
            })
            return
          }
        }

        toast({
          title: 'Notice',
          description: `You do not have any ${activeTab} routine scheduled for today. Check back tomorrow!`,
          variant: 'destructive'
        })
        return
      }

      if (todayLog.is_completed) {
        toast({
          title: 'Already Completed',
          description: 'This routine has already been checked in.',
          variant: 'success'
        })
        return
      }

      await updateDailyLog(todayLog.id, true)

      setTrackingRoutines((prev) =>
        prev.map((r) => ({
          ...r,
          daily_logs: r.daily_logs.map((log) =>
            log.id === todayLog.id ? { ...log, is_completed: true } : log
          )
        }))
      )

      toast({
        title: 'Routine Completed!',
        description: 'Great job! Your progress has been recorded.',
        variant: 'success'
      })
    } catch (err: unknown) {
      console.error('Check-in failed:', err)

      const apiMessage = (err as { response?: { data?: ApiErrorResponse } })?.response?.data
        ?.message

      const errorMessage = Array.isArray(apiMessage)
        ? apiMessage.join(', ')
        : apiMessage || 'Could not check-in. Please try again.'

      toast({
        title: 'Check-in Failed',
        description: errorMessage,
        variant: 'destructive'
      })
    } finally {
      setIsChecking(false)
    }
  }

  const fetchData = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setError('User not logged in')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

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

      const [routinesData, logsData] = await Promise.all([getUserRoutines(), getDailyLogs()])

      setRoutines(routinesData)
      setTrackingRoutines(logsData.routines || [])
    } catch (err: unknown) {
      console.error('Error fetching data:', err)

      const apiMessage = (err as { response?: { data?: ApiErrorResponse } })?.response?.data
        ?.message

      const errorMessage = Array.isArray(apiMessage)
        ? apiMessage.join(', ')
        : apiMessage || 'Failed to load data'

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const currentRoutine = routines[activeTab]

  const handlePrevMonth = () => {
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const handleNextMonth = () => {
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center animate-fadeIn">
          <Loader2 className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading your routine...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center animate-fadeIn">
          <div className="text-red-500 mb-4 text-4xl">⚠️</div>
          <p className="text-gray-800 font-medium mb-2">Failed to load routine</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-12 md:py-16 animate-fadeIn">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-3 animate-slideInRight">
            ROUTINE
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm md:text-base">
            <a
              href="/"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
            >
              Home
            </a>
            <span className="text-gray-400">&gt;&gt;</span>
            <span className="text-blue-500 font-medium">Routine</span>
          </nav>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-[1fr,420px] gap-8">
          <RoutineSteps activeTab={activeTab} currentRoutine={currentRoutine} />

          <div className="space-y-6 lg:sticky lg:top-4 lg:self-start">
            <RoutineTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <DailyLogCheckIn
              label={`Check - in ${activeTab}`}
              isCompleted={currentLogStatus.isCompleted}
              onToggle={handleCheckIn}
              disabled={isChecking}
            />

            <Calendar
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out backwards; }
      `}</style>
    </div>
  )
}

export default DailyRoutine
