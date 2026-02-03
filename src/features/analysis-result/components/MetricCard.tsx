import type { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface MetricCardProps {
  label: string
  value: number
  icon: LucideIcon
  color: string
  bgColor: string
  description: string
  index: number
  mounted: boolean
  status: {
    text: string
    color: string
    bgColor: string
  }
}

export const MetricCard = ({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
  description,
  index,
  mounted,
  status
}: MetricCardProps) => {
  return (
    <div
      className={cn(
        'transition-all duration-700',
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${(index + 2) * 100}ms` }}
    >
      <div className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden h-full">
        <div
          className={cn(
            'absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-700',
            bgColor
          )}
        />
        <div className="relative flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div
              className={cn(
                'p-3 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 bg-gradient-to-br',
                color
              )}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div
              className={cn(
                'text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r',
                color
              )}
            >
              {value}%
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{label}</h3>
            <p className="text-xs text-gray-500">{description}</p>
          </div>

          <div className="mt-auto space-y-3">
            <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  'absolute inset-y-0 left-0 rounded-full transition-all duration-1000 bg-gradient-to-r',
                  color
                )}
                style={{
                  width: mounted ? `${value}%` : '0%',
                  transitionDelay: `${(index + 2) * 100 + 300}ms`
                }}
              />
            </div>
            <div className="flex items-center justify-center">
              <span
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-500',
                  status.bgColor,
                  status.color
                )}
              >
                {status.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
