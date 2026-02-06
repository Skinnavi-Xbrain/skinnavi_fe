import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Upload, Info, CheckCircle2, Camera, Sparkles, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { useToast } from '@/shared/hooks/use-toast'
import type { ApiErrorResponse } from '@/shared/types/api'
import { uploadImage, analyzeImage } from '@/features/home/services/analysis.api'
import { setAnalysisResult, addToCache } from '../store/analysis.slice'
import type { RootState } from '@/shared/store'

export const UploadDialog = ({ children }: { children: React.ReactNode }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const analysisCache = useSelector((state: RootState) => state.analysis.analysisCache)

  const guidelines = [
    'Ensure face is centered and clearly visible.',
    'Find a well-lit area, avoid harsh shadows.',
    'Remove glasses or any accessories.',
    'Keep a neutral expression for analysis.'
  ]

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileKey = `${file.name}-${file.size}`

    if (analysisCache && analysisCache[fileKey]) {
      toast({
        title: 'Using Previous Result',
        description: 'This image was recently analyzed. Loading stored data...',
        variant: 'success'
      })

      dispatch(setAnalysisResult(analysisCache[fileKey]))
      setIsOpen(false)
      navigate('/analysis-result')
      return
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024
    const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']

    if (file.size > MAX_FILE_SIZE) {
      toast({
        variant: 'destructive',
        title: 'Error File Too Large',
        description: 'Please select an image under 5MB.'
      })
      return
    }

    if (!ALLOWED_MIMES.includes(file.type)) {
      toast({
        variant: 'destructive',
        title: 'Error Unsupported Format',
        description: 'Just a heads up, we only accept JPEG, PNG, or WEBP images.'
      })
      return
    }

    const formData = new FormData()
    formData.append('image', file)

    try {
      setIsUploading(true)

      const uploadRes = await uploadImage(formData)
      const imageUrl = uploadRes.data.url
      const analyzeRes = await analyzeImage(imageUrl)

      dispatch(setAnalysisResult(analyzeRes.data))
      dispatch(addToCache({ key: fileKey, result: analyzeRes.data }))

      toast({
        title: 'Analysis Successful',
        description: 'Your skin analysis has been completed.',
        variant: 'success'
      })
      setIsOpen(false)

      navigate('/analysis-result')
    } catch (err: unknown) {
      let message = 'Processing failed. Please try again.'

      if (axios.isAxiosError(err)) {
        const serverError = err.response?.data as ApiErrorResponse
        message = Array.isArray(serverError?.message)
          ? serverError.message[0]
          : serverError?.message || message
      }

      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: message
      })
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                disabled={isUploading}
                className="w-full h-14 md:h-16 bg-[#67AEFF] hover:bg-[#5BA0EB] text-white rounded-xl md:rounded-2xl font-extrabold text-base md:text-lg gap-3 shadow-lg shadow-[#67AEFF]/20 transition-all active:scale-[0.97]"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                {isUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Upload className="w-5 h-5 md:w-6 md:h-6" />
                )}
                {isUploading ? 'Analyzing...' : 'Start Skin Scan'}
              </Button>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileUpload}
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
