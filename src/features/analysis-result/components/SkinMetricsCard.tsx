import type { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface SkinMetric {
  label: string
  value: number
  icon: LucideIcon
  color: string
  description: string
}

interface SkinMetricsCardProps {
  metrics: SkinMetric[]
  getStatus: (value: number) => {
    text: string
    color: string
    bgColor: string
  }
}

export const SkinMetricsCard = ({ metrics, getStatus }: SkinMetricsCardProps) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Skin Metrics Overview</h2>

      <div className="space-y-6">
        {metrics.map((metric) => {
          const status = getStatus(metric.value)

          return (
            <div key={metric.label} className="flex items-center gap-4">
              {/* Icon */}
              <div className={cn('p-3 rounded-xl bg-gradient-to-br shrink-0', metric.color)}>
                <metric.icon className="w-5 h-5 text-white" />
              </div>

              {/* Main content */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">{metric.label}</h4>
                  <span className="font-bold text-gray-700">{metric.value}%</span>
                </div>

                <p className="text-xs text-gray-500">{metric.description}</p>

                {/* Progress */}
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'absolute left-0 top-0 h-full rounded-full bg-gradient-to-r transition-all duration-700',
                      metric.color
                    )}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>

              {/* Status */}
              <span
                className={cn(
                  'px-3 py-1 rounded-full text-xs text-center font-semibold whitespace-nowrap min-w-20',
                  status.bgColor,
                  status.color
                )}
              >
                {status.text}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
