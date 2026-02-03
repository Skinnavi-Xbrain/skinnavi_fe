import { Card } from "@/shared/components/ui/card"
import { TrendingUp, Info } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { motion } from "framer-motion"

export const HealthProgress = () => {
  const data = [
    { day: "01", score: 65 }, { day: "02", score: 72 }, { day: "03", score: 68 },
    { day: "04", score: 75 }, { day: "05", score: 50 }, { day: "06", score: 78 },
    { day: "07", score: 82 }, { day: "08", score: 85 }, { day: "09", score: 88 },
    { day: "10", score: 90 }, { day: "11", score: 87 }
  ]
  
  const scores = data.map(d => d.score)
  const hasEnoughData = scores.length > 1
  
  const getPathData = () => {
    if (!hasEnoughData) return ""
    return scores
      .map((s, i) => {
        const x = (i * (100 / (scores.length - 1)))
        const y = 100 - s
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
      })
      .join(" ")
  }

  const getAreaData = () => {
    if (!hasEnoughData) return ""
    return `${getPathData()} L 100 100 L 0 100 Z`
  }

  return (
    <Card className="p-6 shadow-xl shadow-blue-500/5 border-none rounded-[2.5rem] bg-white h-full flex flex-col relative overflow-hidden min-h-[420px]">
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="font-bold text-slate-800 text-lg leading-none mb-1.5 flex items-center gap-2">
            Skin Health Trend
            <Info className="w-4 h-4 text-slate-300 cursor-help" />
          </h3>
          <p className="text-xs text-slate-400 font-normal">Daily health score transformation</p>
        </div>
        <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 border border-emerald-100/50 shadow-sm">
          <TrendingUp className="w-3.5 h-3.5" /> +8.0%
        </div>
      </div>

      <div className="flex-grow h-40 relative mt-4 px-1">
        {/* Vạch kẻ ngang siêu mờ */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
          {[100, 75, 50, 25, 0].map((line) => (
            <div key={line} className="w-full border-t border-slate-300" />
          ))}
        </div>

        {hasEnoughData && (
          <svg className="w-full h-full overflow-visible relative z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="skinGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#67AEFF" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#67AEFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            <path d={getAreaData()} fill="url(#skinGradient)" />
            
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d={getPathData()}
              fill="none"
              stroke="#67AEFF"
              strokeWidth="2" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {/* Vùng tương tác */}
        <div className="absolute inset-0 flex justify-between items-end z-20">
          {data.map((d, i) => (
            <div key={i} className="group relative flex flex-col items-center justify-end h-full" style={{ width: `${100 / data.length}%` }}>
              
              {/* Tooltip nội dung 13px đồng nhất */}
              <div className="absolute top-0 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:-translate-y-3 bg-slate-900 text-white text-[12px] px-2.5 py-1.5 rounded-xl pointer-events-none shadow-xl flex flex-col items-center z-30">
                <span className="font-semibold">{d.score} pts</span>
                <span className="text-[10px] opacity-60 font-normal">Jan {d.day}</span>
                <div className="w-2 h-2 bg-slate-900 rotate-45 -mb-1.5 mt-0.5" />
              </div>
              
              <div 
                className={cn(
                  "w-2.5 h-2.5 rounded-full border-2 border-white z-10 transition-all duration-300 transform group-hover:scale-125 shadow-sm",
                  d.score > 80 ? "bg-emerald-400" : d.score > 60 ? "bg-[#67AEFF]" : "bg-rose-400"
                )} 
                style={{ marginBottom: `calc(${d.score}% - 5px)` }}
              />

              <span className="absolute -bottom-6 text-[10px] font-medium text-slate-400 group-hover:text-[#67AEFF] transition-colors">
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Stats - Chữ 13px và font-normal nhẹ nhàng */}
      <div className="grid grid-cols-3 mt-14 pt-6 border-t border-slate-50 text-center">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-tight">Stability</span>
          <span className="text-slate-700 text-[13px] font-normal italic leading-none">82% Accurate</span>
        </div>
        <div className="flex flex-col gap-1 border-x border-slate-50">
          <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-tight">Consistency</span>
          <span className="text-[#67AEFF] text-[13px] font-normal italic leading-none">92% Daily</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-tight">Peak</span>
          <span className="text-emerald-500 text-[13px] font-normal italic leading-none">90 Score</span>
        </div>
      </div>
    </Card>
  )
}