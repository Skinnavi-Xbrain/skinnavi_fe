import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
  currentDate: Date
  onPrevMonth: () => void
  onNextMonth: () => void
}

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

const Calendar = ({ currentDate, onPrevMonth, onNextMonth }: CalendarProps) => {
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

  const today = new Date().getDate()
  const isCurrentMonth =
    currentYear === new Date().getFullYear() && currentMonth === new Date().getMonth()

  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const monthNames = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  ]

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 animate-slideUp"
      style={{ animationDelay: '0.3s' }}
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">ACTIVITY</h3>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <span className="font-bold text-gray-900">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          onClick={onNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => (
          <div key={index} className="text-center text-xs font-medium text-gray-500 pb-2">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => (
          <div key={index} className="aspect-square flex items-center justify-center">
            {day && (
              <button
                className={`w-full h-full flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isCurrentMonth && day === today
                    ? 'bg-blue-400 text-white hover:bg-blue-500 shadow-md'
                    : 'text-gray-600 hover:bg-gray-50 hover:scale-105'
                }`}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
