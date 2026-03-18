import { motion } from 'framer-motion'
import { Check, Activity } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface DailyLogCheckInProps {
  label?: string
  isCompleted: boolean
  onToggle: () => void
  disabled?: boolean
}

export const DailyLogCheckIn = ({
  label = 'Check - in',
  isCompleted,
  onToggle
}: DailyLogCheckInProps) => {
  return (
    <div className="w-full mx-auto">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onToggle}
        className={cn(
          'relative w-full h-14 rounded-full flex items-center p-2 transition-all duration-500 shadow-md border-2',
          isCompleted
            ? 'bg-blue-400 border-blue-400 shadow-emerald-100'
            : 'bg-white border-blue-400 shadow-blue-50'
        )}
      >
        <div
          style={{
            marginLeft: isCompleted ? 'calc(100% - 48px)' : '0px'
          }}
          className={cn(
            'relative z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-sm transition-all duration-300',
            isCompleted ? 'bg-white' : 'bg-blue-400'
          )}
        >
          {isCompleted ? (
            <Check className="w-6 h-6 text-blue-400" />
          ) : (
            <Activity className="w-6 h-6 text-white" />
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.span
            initial={false}
            animate={{
              color: isCompleted ? '#ffffff' : '#60a5fa',
              x: isCompleted ? -20 : 20
            }}
            transition={{ duration: 0 }}
            className="font-bold text-lg tracking-wide"
          >
            {isCompleted ? 'Completed' : label}
          </motion.span>
        </div>

        {isCompleted && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white/10 rounded-full"
          />
        )}
      </motion.button>
    </div>
  )
}
