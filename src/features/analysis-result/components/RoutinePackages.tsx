import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Calendar, Star, CheckCircle2, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { getRoutinePackages } from '@/features/analysis-result/services/routines.api'
import type { RoutinePackage } from '../types/routine'

export const RoutinePackages = () => {
  const navigate = useNavigate()
  const [packages, setPackages] = useState<RoutinePackage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getRoutinePackages()
        setPackages(data)
      } catch (error) {
        console.error('Error fetching routine packages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(Number(price))
  }

  const getPackageConfig = (days: number) => {
    if (days <= 7) return { color: 'from-blue-400 to-cyan-500', label: '1 Week' }
    if (days <= 30) return { color: 'from-purple-500 to-pink-500', label: '1 Month', popular: true }
    return { color: 'from-emerald-400 to-teal-500', label: '3 Months' }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <section className="mt-20 mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Choose Your Routine</h2>
        <p className="text-slate-500 font-medium">
          Select a plan that fits your skin goals and lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, index) => {
          const config = getPackageConfig(pkg.duration_days)
          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                'relative bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 flex flex-col transition-all duration-300 hover:shadow-2xl',
                config.popular && 'ring-2 ring-purple-500 md:scale-105 z-10'
              )}
            >
              {config.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg tracking-widest">
                  <Star className="w-3 h-3 fill-current" /> MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <div
                  className={cn(
                    'inline-flex p-3 rounded-2xl bg-gradient-to-br mb-4 shadow-md',
                    config.color
                  )}
                >
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 line-clamp-1">
                  {pkg.package_name}
                </h3>
                <p className="text-blue-500 font-bold mt-1">{config.label}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-slate-900">{formatPrice(pkg.price)}</span>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {pkg.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => navigate(`/routine-detail/${pkg.id}`)}
                className={cn(
                  'w-full rounded-2xl py-6 font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2',
                  config.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                )}
              >
                <ShoppingCart className="w-4 h-4" />
                GET STARTED
              </Button>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
