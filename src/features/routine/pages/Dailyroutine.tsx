import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { getUserRoutines } from '../services/daily-routine.api'
import type { Routine, RoutineTime } from '../types'
import Calendar from '../component/Calendar'
import RoutineSteps from '../component/RoutineSteps'
import RoutineTabs from '../component/RoutineTabs'

const DailyRoutine = () => {
  const [activeTab, setActiveTab] = useState<RoutineTime>('morning')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [routines, setRoutines] = useState<{ morning?: Routine; evening?: Routine }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRoutines = async () => {
      const token = localStorage.getItem('accessToken')

      if (!token) {
        setError('User not logged in')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const data = await getUserRoutines()
        setRoutines(data)
      } catch (err) {
        console.error('Error fetching routines:', err)
        setError(err instanceof Error ? err.message : 'Failed to load routines')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoutines()
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
