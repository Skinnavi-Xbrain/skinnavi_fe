import { Upload, Info, CheckCircle2, Camera, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'

export const UploadDialog = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  const guidelines = [
    'Ensure face is centered and clearly visible.',
    'Find a well-lit area, avoid harsh shadows.',
    'Remove glasses or any accessories.',
    'Keep a neutral expression for analysis.'
  ]

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    console.log('File selected:', file.name)

    // 👉 Nếu cần upload BE thì làm tại đây
    // await uploadImage(file)

    navigate('/analysis-result', { replace: true })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[90vh] rounded-[1.5rem] sm:rounded-[2rem] p-0 border-none shadow-2xl bg-white overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 bg-[#F0F7FF] flex items-center justify-center p-6 md:p-10 relative shrink-0">
          <div className="absolute top-4 left-6 md:top-6 md:left-8 text-[#67AEFF]/20 font-black text-xl md:text-2xl italic tracking-tighter uppercase select-none">
            Scan
          </div>

          <div className="relative">
            <div className="w-32 h-32 md:w-64 md:h-64 rounded-full border-2 border-white/50 flex items-center justify-center">
              <div className="w-24 h-24 md:w-48 md:h-48 rounded-full border-[6px] md:border-[12px] border-[#67AEFF]/10 bg-white flex items-center justify-center shadow-sm">
                <Camera className="w-10 h-10 md:w-24 md:h-24 text-[#67AEFF]" strokeWidth={1.5} />
              </div>
            </div>
            <Sparkles className="absolute -top-2 -right-2 text-[#67AEFF] w-6 h-6 opacity-50 hidden md:block" />
          </div>
        </div>

        <div className="flex-1 p-5 md:p-8 overflow-y-auto">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl md:text-2xl font-bold text-slate-900 text-center md:text-left">
              Perfect Scan Guidelines
            </DialogTitle>
            <p className="text-slate-500 text-center md:text-left text-xs md:text-sm font-medium">
              Follow these tips for the most accurate AI skin analysis.
            </p>
          </DialogHeader>

          <div className="grid gap-4 md:gap-6 py-5 md:py-6">
            <div className="space-y-2 md:space-y-3">
              {guidelines.map((guide, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-[#F0F7FF]/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-[#67AEFF]/5 hover:bg-[#F0F7FF] transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#67AEFF] mt-0.5 shrink-0" />
                  <span className="text-[13px] md:text-sm text-slate-700 font-semibold leading-relaxed">
                    {guide}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                className="w-full h-14 md:h-16 bg-[#67AEFF] hover:bg-[#5BA0EB] text-white rounded-xl md:rounded-2xl font-extrabold text-base md:text-lg gap-3 shadow-lg shadow-[#67AEFF]/20 transition-all active:scale-[0.97]"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="w-5 h-5 md:w-6 md:h-6" />
                Upload Photo
              </Button>

              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 md:mt-0">
            <Info className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#67AEFF]/50" />
            Your data is encrypted and secure
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
