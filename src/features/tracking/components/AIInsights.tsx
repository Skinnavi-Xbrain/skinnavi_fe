import { Card } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Sparkles, Droplets, Zap, ArrowRight, BrainCircuit } from "lucide-react"
import { motion } from "framer-motion"

export const AIInsights = () => {
  const insights = [
    { 
      title: "Weekly Progress", 
      desc: "Your skin health has improved by 37% compared to last week.", 
      color: "bg-emerald-50/50 text-emerald-700", 
      borderColor: "border-emerald-100/50",
      icon: <Sparkles className="w-4 h-4"/> 
    },
    { 
      title: "Hydration Alert", 
      desc: "Hydration levels are stable. Maintain your current moisturizer routine.", 
      color: "bg-blue-50/50 text-blue-700", 
      borderColor: "border-blue-100/50",
      icon: <Droplets className="w-4 h-4"/> 
    },
    { 
      title: "Consistency", 
      desc: "Great! You have an 85% routine completion rate this month.", 
      color: "bg-violet-50/50 text-violet-700", 
      borderColor: "border-violet-100/50",
      icon: <Zap className="w-4 h-4"/> 
    },
  ]

  return (
    <Card className="p-6 shadow-xl shadow-blue-500/5 border-none rounded-[2.5rem] bg-white h-full flex flex-col justify-between min-h-[420px]">
      <div className="space-y-6">
        {/* Header - Chỉ bold tiêu đề chính */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#67AEFF]/10 rounded-xl">
              <BrainCircuit className="w-5 h-5 text-[#67AEFF]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg leading-none mb-1">AI Insights</h3>
              <p className="text-xs text-slate-400 font-normal">Personalized skin analysis</p>
            </div>
          </div>
        </div>

        {/* Danh sách Insight */}
        <div className="space-y-3">
          {insights.map((item, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ x: 4 }}
              className={`${item.color} ${item.borderColor} border p-4 rounded-[1.8rem] flex items-start gap-4 transition-all`}
            >
              <div className="mt-1 p-2 bg-white/80 rounded-xl shadow-sm">
                {item.icon}
              </div>
              <div className="space-y-1">
                {/* Tiêu đề mục dùng font-semibold để phân biệt, không dùng font-black */}
                <p className="font-semibold text-[13px] tracking-tight">{item.title}</p>
                {/* Nội dung dùng font-normal để thanh thoát, kích thước 13px cho dễ đọc */}
                <p className="text-[13px] leading-relaxed font-normal opacity-85">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer - Nút bấm nhẹ nhàng hơn */}
      <div className="pt-6 border-t border-slate-50">
        <Button 
          variant="ghost" 
          className="w-full group hover:bg-slate-50 text-[#67AEFF] font-medium text-sm h-12 rounded-2xl flex items-center justify-center gap-2 transition-all"
        >
          View Full Routine Details
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
  )
}