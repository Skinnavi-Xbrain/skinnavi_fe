import * as React from 'react'
import { cn } from '@/shared/lib/utils'
import { Label } from './label'

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode
  label: string
}

export const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon, label, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        <Label className="text-sm font-medium text-slate-700 ml-1">{label}</Label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
            {icon}
          </div>
          <input
            ref={ref}
            className={cn(
              'w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none',
              className
            )}
            {...props}
          />
        </div>
      </div>
    )
  }
)
InputWithIcon.displayName = 'InputWithIcon'
