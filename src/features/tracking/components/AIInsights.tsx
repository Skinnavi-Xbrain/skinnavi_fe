import { Sparkles, Droplets, Zap, BrainCircuit } from 'lucide-react'
import type { TrackingOverview } from '../types'

interface AIInsightsProps {
  tracking?: TrackingOverview | null
}

export const AIInsights = ({ tracking }: AIInsightsProps) => {
  const completionRate = tracking
    ? tracking.routines.length > 0
      ? Math.round(
          (tracking.routines.reduce((acc, r) => acc + r.completed_count, 0) /
            tracking.routines.reduce((acc, r) => acc + Math.max(r.total_count, 1), 0)) *
            100
        )
      : 0
    : 86

  const scoreImprovement = tracking?.skin_analyses[0]?.overall_score_trend ?? null

  const displayImprovement =
    scoreImprovement !== null && scoreImprovement !== undefined
      ? Math.max(0, scoreImprovement)
      : (tracking?.skin_analyses[0]?.overall_score ?? 0) - 50 // Default: show difference from baseline

  const insights = [
    {
      title: 'Weekly Progress',
      desc: `Skin improved ${displayImprovement}% this week`,
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      iconBg: 'bg-emerald-100',
      icon: <Sparkles className="w-4 h-4 text-emerald-500" />
    },
    {
      title: 'Hydration Alert',
      desc: 'Skin hydration levels looking good',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      iconBg: 'bg-blue-100',
      icon: <Droplets className="w-4 h-4 text-blue-400" />
    },
    {
      title: 'Consistency',
      desc: `Great! ${completionRate}% routine completion rate`,
      bg: 'bg-violet-50',
      border: 'border-violet-100',
      iconBg: 'bg-violet-100',
      icon: <Zap className="w-4 h-4 text-violet-500" />
    }
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 bg-blue-50 rounded-xl">
          <BrainCircuit className="w-4 h-4 text-blue-400" />
        </div>
        <h3 className="font-bold text-slate-700 text-base">AI Insights</h3>
      </div>

      <div className="space-y-3 flex-1">
        {insights.map((item, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-3.5 rounded-xl border ${item.bg} ${item.border}`}
          >
            <div className={`p-2 rounded-lg ${item.iconBg} flex-shrink-0`}>{item.icon}</div>
            <div>
              <p className="text-xs font-bold text-slate-700">{item.title}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-2">
        <button className="w-full bg-blue-400 hover:bg-blue-500 text-white text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> Recommended Products
        </button>
        <button className="w-full border border-slate-200 text-slate-600 text-xs font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
          View Full Routine
        </button>
      </div>
    </div>
  )
}
