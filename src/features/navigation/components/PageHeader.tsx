import { motion } from 'framer-motion'

interface PageHeaderProps {
  title: string
  breadcrumb?: string
}

export const PageHeader = ({ title, breadcrumb = title }: PageHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-[#EAF3FF] py-12 md:py-16 text-center"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-3">
        <h1 className="text-4xl md:text-6xl font-black text-[#67AEFF] tracking-tighter select-none uppercase">
          {title}
        </h1>

        <div className="text-[10px] md:text-xs font-black text-[#67AEFF] flex items-center justify-center gap-2 uppercase tracking-[0.3em]">
          <span className="opacity-60">Home</span>
          <span>/</span>
          <span className="font-bold">{breadcrumb}</span>
        </div>
      </div>
    </motion.div>
  )
}
