import { Card } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Sparkles, ArrowLeftRight } from "lucide-react";

export const ComparisonSlider = () => (
  <Card className="p-6 bg-white border-none shadow-xl shadow-blue-500/5 rounded-[2.5rem] h-full flex flex-col min-h-[420px] justify-between">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 leading-none mb-1">
          Before / After
          <Sparkles className="w-4 h-4 text-[#67AEFF]" />
        </h3>
        <p className="text-xs text-slate-400 font-normal">January 11, 2026</p>
      </div>
      <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 py-1 rounded-full text-[11px] font-semibold">
          Score: 87
      </Badge>
    </div>
    
    {/* Tỉ lệ aspect được giữ cân đối để không bị quá to trên mobile */}
    <div className="relative flex-grow aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[1.8rem] mb-5 group border border-slate-50 shadow-inner">
      <div className="flex h-full w-full">
        {/* Before Side */}
        <div className="w-1/2 bg-slate-100 border-r border-white relative">
           <img 
            src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1000" 
            className="object-cover h-full w-full grayscale-[30%] opacity-90" 
            alt="Before"
           />
           <span className="absolute bottom-3 left-3 text-[10px] text-white font-medium uppercase tracking-wider bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-lg">
            Before
           </span>
        </div>

        {/* After Side */}
        <div className="w-1/2 bg-slate-50 relative">
           <img 
            src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1000" 
            className="object-cover h-full w-full" 
            alt="After"
           />
           <span className="absolute bottom-3 right-3 text-[10px] text-white font-medium uppercase tracking-wider bg-[#67AEFF]/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
            After
           </span>
        </div>
      </div>

      {/* Slider Handle */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/80 backdrop-blur-sm flex items-center justify-center">
         <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-[#67AEFF] border border-slate-100 transition-transform group-hover:scale-110">
            <ArrowLeftRight className="w-4 h-4" />
         </div>
      </div>
    </div>

    {/* Analysis Results - Font chữ 13px tương đồng AI Insights */}
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-emerald-50/50 p-3.5 rounded-[1.2rem] border border-emerald-100/50">
        <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-tight mb-1">Improvement</p>
        <p className="text-[13px] font-normal text-emerald-800 leading-tight">Texture significantly smoother</p>
      </div>
      <div className="bg-blue-50/50 p-3.5 rounded-[1.2rem] border border-blue-100/50">
        <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-tight mb-1">Key Change</p>
        <p className="text-[13px] font-normal text-blue-800 leading-tight">Redness reduced by 20%</p>
      </div>
    </div>
  </Card>
);