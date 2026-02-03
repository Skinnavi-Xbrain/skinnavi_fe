import { motion } from 'framer-motion'
import { SkinCalendar } from '../components/SkinCalendar'
import { ComparisonSlider } from '../components/ComparisonSlider'
import { HealthProgress } from '../components/HealthProgress' 
import { AIInsights } from '../components/AIInsights'
import { StatusHeader } from '../components/StatusHeader'
import { PageHeader } from '@/features/navigation/components/PageHeader'

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFF] pb-10 md:pb-20 font-sans">
      <PageHeader title="Tracking" />

      <main className="max-w-6xl mx-auto px-4 md:px-6 mt-4 md:mt-8">
        
    
        <StatusHeader />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          
          <motion.div 
            className="lg:col-span-5 order-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SkinCalendar />
          </motion.div>

          <motion.div 
            className="lg:col-span-7 order-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <HealthProgress />
          </motion.div>

          <motion.div 
            className="lg:col-span-5 order-3 lg:order-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AIInsights />
          </motion.div>

          <motion.div 
            className="lg:col-span-7 order-4 lg:order-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <ComparisonSlider />
          </motion.div>

        </div>
      </main>
    </div>
  )
}