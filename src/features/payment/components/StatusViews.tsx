import { motion } from 'framer-motion'
import { XCircle, RefreshCcw, AlertCircle, Home, CheckCircle2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Bunting, Confetti } from './CelebrationEffects'

export const SuccessView = () => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden min-h-[600px]">
      <Bunting />
      <Confetti />

      <div className="absolute w-12 h-12 left-10 top-20 bg-blue-200 rounded-full opacity-60 animate-bounce" />
      <div className="absolute w-24 h-24 left-20 bottom-40 bg-blue-100 rounded-full opacity-60 animate-pulse" />
      <div
        className="absolute w-20 h-20 right-10 top-40 bg-blue-200 rounded-full opacity-60 animate-bounce"
        style={{ animationDelay: '1s' }}
      />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="z-10 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-black text-[#67AEFF] my-10 drop-shadow-sm">
          Congratulations!
        </h1>

        <div className="relative flex flex-col items-center justify-center w-full h-80">
          <motion.div
            animate={{ y: [20, -10, 20], x: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/4 bottom-48"
          >
            <svg width="60" height="80" viewBox="0 0 40 50">
              <circle cx="20" cy="20" r="18" fill="#93c5fd" />
              <path d="M20 38 Q20 45 18 50" stroke="#93c5fd" fill="none" />
              <circle cx="15" cy="15" r="3" fill="white" opacity="0.4" />
            </svg>
          </motion.div>

          <motion.div
            animate={{ y: [20, -10, 20], x: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-1/4 bottom-56"
          >
            <svg width="70" height="100" viewBox="0 0 40 50">
              <circle cx="20" cy="20" r="18" fill="#60a5fa" />
              <path d="M20 38 Q20 45 22 50" stroke="#60a5fa" fill="none" />
              <circle cx="15" cy="15" r="3" fill="white" opacity="0.4" />
            </svg>
          </motion.div>

          <svg className="w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl" viewBox="0 0 200 200">
            <rect x="40" y="80" width="120" height="20" fill="#67AEFF" rx="2" />
            <rect
              x="35"
              y="70"
              width="60"
              height="15"
              fill="#93c5fd"
              transform="rotate(-20 35 70)"
              rx="2"
            />
            <rect
              x="105"
              y="60"
              width="60"
              height="15"
              fill="#93c5fd"
              transform="rotate(20 165 60)"
              rx="2"
            />
            <rect x="50" y="100" width="100" height="80" fill="#67AEFF" />
            <rect x="50" y="130" width="100" height="20" fill="white" opacity="0.9" />
            <rect x="90" y="100" width="20" height="80" fill="white" opacity="0.9" />
            <path d="M100 100 Q80 60 90 40" stroke="#67AEFF" strokeWidth="3" fill="none" />
            <path d="M110 100 Q140 70 130 50" stroke="#93c5fd" strokeWidth="3" fill="none" />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold">
            <CheckCircle2 className="w-6 h-6" />
            <span>Payment Successful</span>
          </div>
          <p className="text-slate-500 font-medium">
            Your personalized skincare routine is being prepared...
          </p>

          <div className="w-64 h-1.5 bg-slate-100 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-[#67AEFF] animate-progress-fast" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export const FailureView = ({ onRetry }: { onRetry: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="w-full flex flex-col items-center justify-center space-y-8 py-12 px-6"
  >
    <div className="relative">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-red-400 rounded-full blur-3xl"
      />
      <div className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl border border-red-50">
        <XCircle className="w-20 h-20 text-red-500" strokeWidth={1.5} />
      </div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-4 bg-amber-100 p-3 rounded-2xl shadow-lg border border-white"
      >
        <AlertCircle className="w-6 h-6 text-amber-500" />
      </motion.div>
    </div>

    <div className="text-center space-y-4 max-w-lg">
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
        Payment <span className="text-red-500">Declined</span>
      </h2>
      <p className="text-slate-500 text-lg font-medium leading-relaxed">
        Unfortunately, your transaction could not be processed. Please check your payment details
        and try again. If the issue persists, contact your bank or try a different payment method.
      </p>
    </div>

    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md pt-4">
      <Button
        onClick={onRetry}
        className="flex-1 h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold gap-3 shadow-xl transition-all active:scale-95"
      >
        <RefreshCcw className="w-5 h-5" /> TRY AGAIN
      </Button>
      <Button
        variant="outline"
        onClick={() => (window.location.href = '/home')}
        className="flex-1 h-14 bg-white border-2 border-slate-200 text-slate-600 rounded-2xl font-bold gap-3 hover:bg-slate-50 transition-all"
      >
        <Home className="w-5 h-5" /> HOME
      </Button>
    </div>
  </motion.div>
)
