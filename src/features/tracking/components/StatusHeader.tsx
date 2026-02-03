import { motion } from "framer-motion"
import { Calendar as CalendarIcon, Camera, CheckSquare, Sparkles } from "lucide-react"

export const StatusHeader = () => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
      {/* Phần tiêu đề bên trái */}
      <div>
        <div className="flex items-center gap-2 text-[#67AEFF] font-bold text-[10px] mb-3 uppercase tracking-[0.2em]">
          <CalendarIcon className="w-3.5 h-3.5" />
          {today}
        </div>
        <h2 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3">
          Skin Journey
          <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400" />
        </h2>
        <p className="text-slate-400 text-sm mt-2 font-medium">
          Capture your progress and maintain your daily consistency.
        </p>
      </div>

      {/* Phần nút bấm: Tách biệt Tracking và Điểm danh */}
      <div className="flex items-center gap-3">
        {/* Nút 1: Log Photo - Chuyên về Tracking dữ liệu hình ảnh */}
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#67AEFF] text-white px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-blue-200 transition-all text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase leading-none mb-1 tracking-tight">Log Photo</p>
            <p className="text-[9px] opacity-80 font-medium whitespace-nowrap">For AI Tracking</p>
          </div>
        </motion.button>

        {/* Nút 2: Daily Check-in - Chuyên về giữ chuỗi/điểm danh */}
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white border border-slate-100 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md transition-all text-left group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
            <CheckSquare className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1 tracking-tight">Daily Check-in</p>
            <p className="text-[9px] text-emerald-500 font-bold whitespace-nowrap">Keep Streak 🔥</p>
          </div>
        </motion.button>
      </div>
    </div>
  )
}