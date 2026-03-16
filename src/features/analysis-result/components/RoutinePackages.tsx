import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Star, CheckCircle2, Loader2, Sparkles, Zap, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { getRoutinePackages } from '@/features/analysis-result/services/routines.api'
import { checkEligibility } from '@/features/payment/services/payment.api'
import type { RoutinePackage } from '../types/routine'

export const RoutinePackages = () => {
  const navigate = useNavigate()
  const [packages, setPackages] = useState<RoutinePackage[]>([])
  const [loading, setLoading] = useState(true)
  const [eligibilityMap, setEligibilityMap] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let isMounted = true

    const fetchPackagesAndEligibility = async () => {
      try {
        setLoading(true)
        const data = await getRoutinePackages()
        if (!isMounted) return
        setPackages(data)

        const token = localStorage.getItem('accessToken')
        if (token && data.length > 0) {
          const results = await Promise.all(
            data.map(async (pkg) => {
              try {
                const res = await checkEligibility(pkg.id)
                return { id: pkg.id, isFreeTrial: res.isFreeTrial }
              } catch (err) {
                console.error(`Error checking eligibility for ${pkg.id}:`, err)
                return { id: pkg.id, isFreeTrial: false }
              }
            })
          )

          if (!isMounted) return

          const newMap = results.reduce(
            (acc, curr) => ({ ...acc, [curr.id]: curr.isFreeTrial }),
            {}
          )
          setEligibilityMap(newMap)
        }
      } catch (error) {
        console.error('Error fetching routine packages:', error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchPackagesAndEligibility()

    return () => {
      isMounted = false
    }
  }, [])

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(Number(price))
  }

  const getPackageConfig = (days: number) => {
    if (days <= 7)
      return {
        color: 'from-cyan-400 to-blue-500',
        border: 'border-blue-100',
        text: 'text-blue-500',
        bg: 'bg-blue-50/50',
        btnClass: 'bg-slate-100 text-slate-900 hover:bg-blue-500 hover:text-white',
        label: 'Perfect for beginners',
        icon: <Calendar className="w-6 h-6" />
      }

    if (days <= 30)
      return {
        color: 'from-blue-600 to-cyan-500',
        border: 'border-blue-200',
        text: 'text-blue-600',
        bg: 'bg-blue-50/50',
        btnClass:
          'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-blue-200 hover:shadow-blue-300',
        label: 'Most popular choice',
        popular: true,
        icon: <Zap className="w-6 h-6" />
      }

    return {
      color: 'from-rose-500 to-orange-500',
      border: 'border-rose-100',
      text: 'text-rose-600',
      bg: 'bg-rose-50/50',
      btnClass: 'bg-slate-100 text-slate-900 hover:bg-rose-500 hover:text-white',
      label: 'Best for long-term results',
      icon: <Sparkles className="w-6 h-6" />
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <section className="mt-10 mb-12">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2">Choose Your Routine</h2>
        <p className="text-sm md:text-base text-slate-500 font-medium">
          Select a plan that fits your skin goals.
        </p>
      </div>
      <div className="flex overflow-x-auto pb-8 pt-8 px-4 md:px-0 snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 no-scrollbar">
        {packages.map((pkg, index) => {
          const config = getPackageConfig(pkg.duration_days)
          const isFreeTrial = eligibilityMap[pkg.id]

          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                'relative flex-shrink-0 w-[calc(100vw-40px)] sm:w-[380px] md:w-full snap-center',
                'bg-white rounded-[32px] p-6 flex flex-col transition-all duration-500',
                'border-2 shadow-sm hover:shadow-2xl md:hover:-translate-y-2',
                config.popular
                  ? `${config.border} ring-4 ring-blue-50 shadow-blue-100`
                  : 'border-slate-100 hover:border-blue-200'
              )}
            >
              {isFreeTrial && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg z-20 flex items-center gap-1 uppercase tracking-tighter whitespace-nowrap">
                  <Star className="w-2.5 h-2.5 fill-current" /> Free First Week
                </div>
              )}

              {config.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-5 py-1.5 rounded-full flex items-center gap-2 shadow-xl tracking-[0.15em] whitespace-nowrap z-20">
                  <Sparkles className="w-3 h-3 text-yellow-400" /> RECOMMENDED
                </div>
              )}

              <div className="mb-4">
                <div
                  className={cn(
                    'inline-flex p-3 rounded-2xl bg-gradient-to-br text-white mb-4 shadow-lg',
                    config.color
                  )}
                >
                  {config.icon && <div className="w-5 h-5">{config.icon}</div>}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-0.5">{pkg.package_name}</h3>
                <p className={cn('font-bold text-[10px] uppercase tracking-widest', config.text)}>
                  {config.label} • {pkg.duration_days} Days
                </p>
              </div>

              <div className="mb-5 flex flex-col gap-0.5">
                {isFreeTrial ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900">0đ</span>
                    <span className="text-sm text-slate-400 line-through font-medium">
                      {formatPrice(pkg.price)}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">
                      {formatPrice(pkg.price).replace('₫', '')}
                    </span>
                    <span className="text-slate-500 font-bold text-sm">₫</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-8 flex-1">
                {pkg.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-[13px] text-slate-600 leading-snug"
                  >
                    <div className={cn('mt-0.5 p-0.5 rounded-full', config.bg)}>
                      <CheckCircle2 className={cn('w-3.5 h-3.5 shrink-0', config.text)} />
                    </div>
                    <span className="font-medium line-clamp-2">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => navigate(`/routine-detail/${pkg.id}`)}
                className={cn(
                  'w-full rounded-2xl py-6 font-bold text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 border-none uppercase tracking-wider',
                  config.btnClass
                )}
              >
                View Plan Details
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
