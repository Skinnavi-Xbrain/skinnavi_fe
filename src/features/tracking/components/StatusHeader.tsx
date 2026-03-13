import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { UploadDialog } from '@/features/home/components/UploadDialog'

export const StatusHeader = () => {
  return (
    <div className="mt-10 flex justify-end max-w-6xl mx-auto px-4 md:px-6">
      <UploadDialog>
        <motion.button
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#67AEFF] text-white px-4 py-2 rounded-2xl flex items-center gap-4 shadow-xl shadow-blue-200 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase leading-none mb-1 tracking-tight">
              Log Photo
            </p>
            <p className="text-[9px] opacity-80 font-medium whitespace-nowrap">For AI Tracking</p>
          </div>
        </motion.button>
      </UploadDialog>
    </div>
  )
}
