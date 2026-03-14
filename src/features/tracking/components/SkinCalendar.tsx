import { useState } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import type { TrackingOverview } from '../types'

interface SkinCalendarProps {
  tracking?: TrackingOverview | null
}

export const SkinCalendar = ({ tracking }: SkinCalendarProps) => {
  const completedDates = new Set<string>()
  const incompleteDates = new Set<string>()
  let maxDay = new Date().getDate()
  let dataMonth = new Date().getMonth() + 1
  let dataYear = new Date().getFullYear()

  if (tracking?.routines) {
    tracking.routines.forEach((routine) => {
      routine.daily_logs.forEach((log) => {
        const logDate = new Date(log.log_date)
        const day = logDate.getDate()
        const month = logDate.getMonth() + 1
        const year = logDate.getFullYear()

        const latestDate = new Date(dataYear, dataMonth - 1, maxDay)
        if (logDate > latestDate) {
          maxDay = day
          dataMonth = month
          dataYear = year
        }

        const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

        if (log.is_completed) {
          completedDates.add(dateKey)
        } else {
          incompleteDates.add(dateKey)
        }
      })
    })
  }

  const today = maxDay

  const [viewMonth, setViewMonth] = useState(dataMonth)
  const [viewYear, setViewYear] = useState(dataYear)

  const goToPrev = () => {
    if (viewMonth === 1) {
      setViewMonth(12)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const goToNext = () => {
    if (viewMonth === 12) {
      setViewMonth(1)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const firstDay = new Date(viewYear, viewMonth - 1, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate()
  const isCurrentView = viewMonth === dataMonth && viewYear === dataYear

  const monthName = new Date(`${viewYear}-${String(viewMonth).padStart(2, '0')}-01`).toLocaleString(
    'default',
    { month: 'long' }
  )

  const dateKey = (day: number) =>
    `${viewYear}-${String(viewMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const getDayStyle = (day: number) => {
    const key = dateKey(day)

    if (completedDates.has(key)) return 'bg-blue-400 text-white font-bold'

    if (isCurrentView && day === today)
      return 'border-2 border-blue-400 text-blue-500 font-bold bg-white'

    if (incompleteDates.has(key)) return 'bg-red-400 text-white font-bold'

    if (isCurrentView && day > today) return 'text-slate-300 bg-white border border-slate-100'

    return 'text-slate-400 bg-white border border-slate-100'
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 className="font-bold text-blue-400 text-base mb-0.5">Skin Tracking</h3>
      <p className="text-xs text-slate-400 mb-5">Track your skin health journey day by day</p>

      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-bold text-slate-700 text-sm">{monthName}</p>
          <p className="text-xs text-slate-400">{viewYear}</p>
        </div>
        <div className="flex gap-2">
          <ChevronLeft
            className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors"
            onClick={goToPrev}
          />
          <ChevronRight
            className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors"
            onClick={goToNext}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {days.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-semibold text-slate-400 uppercase py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1.5">
        {Array(firstDay)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div key={day} className="flex justify-center">
            <div
              className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center text-[11px] transition-all ${getDayStyle(day)}`}
            >
              <span>{day}</span>
              {completedDates.has(dateKey(day)) && (
                <CheckCircle2 className="w-2.5 h-2.5 mt-0.5 opacity-80" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-blue-400" />
          <span className="text-[10px] text-slate-400">Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-red-400" />
          <span className="text-[10px] text-slate-400">Missed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm border-2 border-blue-400 bg-white" />
          <span className="text-[10px] text-slate-400">Today</span>
        </div>
      </div>
    </div>
  )
}
