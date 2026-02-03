import { useState } from "react"
import { Card } from "@/shared/components/ui/card"
import { ChevronLeft, ChevronRight, CalendarDays, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

export const SkinCalendar = () => {
  // Giả sử hôm nay là ngày 11 theo thiết kế của bạn
  const today = 11
  const [completedDays, setCompletedDays] = useState<number[]>([1, 2, 3, 4, 6, 7, 8, 9, 10])

  const handleCheckIn = () => {
    if (!completedDays.includes(today)) {
      setCompletedDays((prev) => [...prev, today])
    }
  }

  const getDayUI = (day: number) => {
    const isToday = day === today
    const isCompleted = completedDays.includes(day)
    const isPoor = day === 5 // Dữ liệu mẫu ngày sức khỏe kém

    return {
      className: cn(
        "h-10 w-full flex flex-col items-center justify-center rounded-xl text-xs font-bold transition-all relative group",
        isCompleted ? "bg-[#67AEFF] text-white shadow-md shadow-blue-100" : "bg-white text-slate-400 border border-slate-100 hover:border-blue-200",
        isPoor && !isCompleted && "bg-red-50 text-red-500 border-red-100",
        isToday && !isCompleted && "ring-2 ring-[#67AEFF] ring-offset-2"
      ),
      icon: isCompleted ? <CheckCircle2 className="w-3 h-3 mt-0.5" /> : isPoor ? <AlertCircle className="w-3 h-3 mt-0.5" /> : null
    }
  }

  return (
    <Card className="p-6 shadow-xl shadow-blue-500/5 border-none rounded-[2.5rem] bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-2xl">
            <CalendarDays className="w-6 h-6 text-[#67AEFF]" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg leading-none mb-1">Skin Tracking</h3>
            <p className="text-xs font-medium text-slate-400">Track your skin journey</p>
          </div>
        </div>
        <Button 
          onClick={handleCheckIn}
          disabled={completedDays.includes(today)}
          size="sm" 
          className="bg-[#67AEFF] hover:bg-[#5BA0EB] text-white rounded-2xl h-10 px-6 font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
        >
          {completedDays.includes(today) ? "Checked-in" : "Check-in Today"}
        </Button>
      </div>
      
      <div className="bg-slate-50/50 rounded-[2rem] p-5 border border-slate-100">
        <div className="flex justify-between items-center mb-6 px-2">
          <span className="text-sm font-black text-slate-700 tracking-tight">JANUARY 2026</span>
          <div className="flex gap-2">
            <ChevronLeft className="w-4 h-4 text-slate-400 cursor-pointer" />
            <ChevronRight className="w-4 h-4 text-slate-400 cursor-pointer" />
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-3">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-[10px] font-bold text-slate-300 uppercase text-center">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array(4).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
            const ui = getDayUI(day)
            return (
              <div key={day} className={ui.className}>
                <span>{day}</span>
                {ui.icon}
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}