import { Sparkles, Star, ScanFace, Target, TrendingUp, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { TrackingOverview } from '../types'

interface AIInsightsProps {
  tracking?: TrackingOverview | null
}

export const AIInsights = ({ tracking }: AIInsightsProps) => {
  const highlights = [
    {
      title: 'AI Skin Analysis',
      desc: 'Smart AI evaluates your skin condition instantly.',
      bg: '#eff6ff',
      border: '#dbeafe',
      iconBg: '#dbeafe',
      iconColor: '#3b82f6',
      Icon: ScanFace
    },
    {
      title: 'Personalized Routine',
      desc: 'Smart skincare routines tailored specifically to your skin type and concerns.',
      bg: '#faf5ff',
      border: '#e9d5ff',
      iconBg: '#e9d5ff',
      iconColor: '#9333ea',
      Icon: Target
    },
    {
      title: 'Progress Tracking',
      desc: 'Track skin improvement over time with visual insights.',
      bg: '#f0fdf4',
      border: '#bbf7d0',
      iconBg: '#bbf7d0',
      iconColor: '#16a34a',
      Icon: TrendingUp
    },
    {
      title: 'Trusted Skincare Guidance',
      desc: 'Recommendations based on dermatology research and trusted skincare data.',
      bg: '#fffbeb',
      border: '#fde68a',
      iconBg: '#fde68a',
      iconColor: '#d97706',
      Icon: ShieldCheck
    }
  ]
  const navigate = useNavigate()
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Star size={17} color="#f59e0b" fill="#f59e0b" />
        <h3 className="font-bold text-slate-700 text-base">SkinNavi Highlights</h3>
      </div>

      <div className="space-y-3 flex-1">
        {highlights.map((item, i) => {
          const { Icon } = item
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 15px',
                borderRadius: 14,
                border: `1px solid ${item.border}`,
                background: item.bg
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: item.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Icon size={20} color={item.iconColor} strokeWidth={2} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#334155', margin: 0 }}>
                  {item.title}
                </p>
                <p style={{ fontSize: 11.5, color: '#94a3b8', marginTop: 2, lineHeight: 1.4 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 space-y-2">
        <button
          onClick={() => navigate('/analysis-result')}
          className="w-full bg-blue-400 hover:bg-blue-500 text-white text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" /> Recommended Products
        </button>
        <button
          onClick={() => navigate('/daily-routine')}
          className="w-full border border-slate-200 text-slate-600 text-xs font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
        >
          View Full Routine
        </button>
      </div>
    </div>
  )
}
