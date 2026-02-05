import { Button } from '@/shared/components/ui/button'
import { motion } from 'framer-motion'
import { TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
}

export const SkinImprovement = () => {
  return (
    <section className="relative bg-[#F0F7FF] py-16 md:py-24 overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#67AEFF]/5 rounded-full blur-3xl -mr-20 -mt-20" />

      <div className="container relative mx-auto px-6 flex flex-col md:flex-row items-center gap-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-[50%]"
        >
          <div className="relative">
            <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl aspect-[4/3] md:aspect-[16/10]">
              <img
                src="https://i.pinimg.com/736x/ec/ef/4c/ecef4c9c17c8c50da8734ad6afcc8767.jpg"
                alt="Skin Analysis Result"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#67AEFF]/20 to-transparent" />
            </div>

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -bottom-6 -right-2 md:-right-6 bg-white p-6 rounded-3xl shadow-2xl border border-[#67AEFF]/10 flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-[#67AEFF]/10 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-[#67AEFF]" />
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 leading-none">39%</div>
                <p className="text-xs font-bold text-[#67AEFF] uppercase tracking-wider mt-1">
                  Improvement
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full md:w-[50%] space-y-8"
        >
          <div className="space-y-4 text-center md:text-left">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-[#67AEFF] font-bold text-sm tracking-[0.2em] uppercase"
            >
              <ShieldCheck className="w-5 h-5" />
              Clinical Analysis
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.15]"
            >
              Your skin health has significantly <span className="text-[#67AEFF]">improved.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 max-w-lg mx-auto md:mx-0"
            >
              Based on your latest scan, your skin shows a 39% increase in hydration and texture
              consistency compared to last month.
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3 group">
              <h4 className="font-bold text-slate-900 flex items-center gap-3">
                <div className="w-2 h-6 bg-[#67AEFF] rounded-full group-hover:h-8 transition-all duration-300" />
                Skin Elasticity
              </h4>
              <p className="text-base text-slate-500 leading-relaxed">
                Enhanced collagen production and firmer skin structure observed in recent scans.
              </p>
            </div>
            <div className="space-y-3 group">
              <h4 className="font-bold text-slate-900 flex items-center gap-3">
                <div className="w-2 h-6 bg-[#67AEFF]/50 rounded-full group-hover:bg-[#67AEFF] group-hover:h-8 transition-all duration-300" />
                Pore Refinement
              </h4>
              <p className="text-base text-slate-500 leading-relaxed">
                Visible reduction in pore size and smoother surface texture across all zones.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-6 flex justify-center md:justify-start">
            <Button className="bg-[#67AEFF] hover:bg-[#5BA0EB] text-white px-10 py-7 text-lg font-bold rounded-2xl shadow-lg shadow-[#67AEFF]/30 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3">
              View Detailed Report
              <ArrowRight className="w-6 h-6" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
