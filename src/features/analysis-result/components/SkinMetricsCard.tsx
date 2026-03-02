import type { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface SkinMetric {
  label: string
  value: number
  icon: LucideIcon
  description: string
}

interface SkinMetricsCardProps {
  metrics: SkinMetric[]
  getStatus: (value: number) => {
    text: string
    color: string
    bgColor: string
    barColor: string
  }
  isNested?: boolean
}

export const SkinMetricsCard = ({ metrics, getStatus, isNested = false }: SkinMetricsCardProps) => {
  const containerClasses = isNested
    ? 'grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10'
    : 'bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 space-y-8'

  return (
    <div className={containerClasses}>
      {!isNested && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Skin Metrics Overview</h2>
          <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400" /> Healthy
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400" /> Critical
            </span>
          </div>
        </div>
      )}

      {metrics.map((metric) => {
        const status = getStatus(metric.value)

        return (
          <div key={metric.label} className="group flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'p-2.5 rounded-xl bg-gradient-to-br shrink-0 shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-3',
                    status.barColor
                  )}
                >
                  <metric.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-base leading-none">{metric.label}</h4>
                  <p className="text-[11px] text-gray-400 font-medium mt-1">{metric.description}</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className={cn('text-lg font-black leading-none', status.color)}>
                  {metric.value}%
                </span>
                <span
                  className={cn('text-[10px] font-bold uppercase tracking-tighter', status.color)}
                >
                  {status.text}
                </span>
              </div>
            </div>

            <div className="relative h-2.5 bg-gray-100/80 rounded-full overflow-hidden shadow-inner border border-gray-50">
              <div
                className={cn(
                  'absolute left-0 top-0 h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out',
                  status.barColor
                )}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
