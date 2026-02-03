import { motion } from 'framer-motion'
import { Button } from '@/shared/components/ui/button'
import { Upload, Sparkles, Camera, ArrowRight } from 'lucide-react'
import Image from '@/shared/assets/images/image.png'
import { UploadDialog } from './UploadDialog'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 14 }
  }
}

export const Hero = () => {
  return (
    <section className="relative container mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 overflow-hidden font-sans">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#67AEFF]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-0 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-purple-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* Left Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-xl space-y-8 md:space-y-10 text-center md:text-left z-10"
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-[72px] lg:text-[80px] font-black leading-[1.1] tracking-tight text-foreground">
            <span className="bg-gradient-to-r from-[#67AEFF] via-[#85C1FF] to-[#4A8FE0] bg-clip-text text-transparent">
              Discover your skin
            </span>
            <br />
            <span className="text-foreground">in one scan</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 0.6, delay: 1, repeat: Infinity, repeatDelay: 4 }}
              className="inline-block ml-2"
            >
              <Sparkles className="w-10 h-10 md:w-14 md:h-14 text-[#67AEFF]" />
            </motion.span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
          <UploadDialog>
            <Button className="group relative bg-[#67AEFF] hover:bg-[#5BA0EB] text-white px-10 md:px-12 py-7 md:py-8 rounded-2xl text-base md:text-lg font-bold shadow-xl shadow-blue-200/50 transition-all w-full sm:w-auto border-0 overflow-hidden">
              <motion.div
                animate={{ x: [-200, 200] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
              <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Start Skin Scan 
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </UploadDialog>
        </motion.div>
      </motion.div>

      {/* Right Content - Visual Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative flex-shrink-0 md:ml-20"
      >
        {/* Floating Icons */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4], y: [0, -12, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-6 -right-4 md:-top-10 md:right-4 z-20"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 bg-[#67AEFF] rounded-2xl rotate-45 shadow-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white -rotate-45" />
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-6 md:-left-10 z-20"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-blue-50">
            <Camera className="w-7 h-7 md:w-8 md:h-8 text-[#67AEFF]" />
          </div>
        </motion.div>

        {/* Image Frame with Flat Bottom Oval */}
        <div className="relative">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-[320px] md:h-[360px] lg:w-[360px] lg:h-[400px]">
            <div 
              className="absolute inset-0 bg-[#F0F7FF] shadow-inner"
              style={{ borderRadius: '50% 50% 0 0' }}
            ></div>

            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              src={Image}
              alt="Skin Analysis"
              className="absolute bottom-0 left-0 w-full h-[110%] object-cover object-bottom z-10 drop-shadow-2xl"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}