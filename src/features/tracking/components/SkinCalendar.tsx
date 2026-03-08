import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import type { TrackingOverview } from '../types'

interface SkinCalendarProps {
  tracking?: TrackingOverview | null
}

export const SkinCalendar = ({ tracking }: SkinCalendarProps) => {
  const completedDays = new Set<number>()

  let maxDay = new Date().getDate()
  let currentMonth = new Date().getMonth() + 1
  let currentYear = new Date().getFullYear()

  if (tracking?.routines) {
    tracking.routines.forEach((routine) => {
      routine.daily_logs.forEach((log) => {
        const logDate = new Date(log.log_date)
        const day = logDate.getDate()
        const month = logDate.getMonth() + 1
        const year = logDate.getFullYear()

        const latestDate = new Date(currentYear, currentMonth - 1, maxDay)
        if (logDate > latestDate) {
          maxDay = day
          currentMonth = month
          currentYear = year
        }

        if (log.is_completed) {
          completedDays.add(day)
        }
      })
    })
  }

  const today = maxDay
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()

  const monthName = new Date(
    `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`
  ).toLocaleString('default', { month: 'long' })

  const getDayStyle = (day: number) => {
    if (completedDays.has(day)) return 'bg-blue-400 text-white font-bold'
    if (day === today) return 'border-2 border-blue-400 text-blue-500 font-bold bg-white'
    if (day > today) return 'text-slate-300 bg-white border border-slate-100'
    return 'text-slate-400 bg-white border border-slate-100'
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 className="font-bold text-blue-400 text-base mb-0.5">Skin Tracking</h3>
      <p className="text-xs text-slate-400 mb-5">Track your skin health journey day by day</p>

      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-bold text-slate-700 text-sm">{monthName}</p>
          <p className="text-xs text-slate-400">{currentYear}</p>
        </div>
        <div className="flex gap-2">
          <ChevronLeft className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
          <ChevronRight className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
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
              {completedDays.has(day) && <CheckCircle2 className="w-2.5 h-2.5 mt-0.5 opacity-80" />}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-5 pt-4 border-t border-slate-50"></div>
    </div>
  )
}
