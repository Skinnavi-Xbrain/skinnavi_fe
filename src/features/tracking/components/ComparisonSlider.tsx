import { TrendingUp, ArrowLeftRight } from 'lucide-react'
import type { TrackingOverview } from '../types'

interface ComparisonSliderProps {
  tracking?: TrackingOverview | null
}

export const ComparisonSlider = ({ tracking }: ComparisonSliderProps) => {
  const latestAnalysis = tracking?.skin_analyses[0]
  const previousAnalysis = tracking?.skin_analyses[1]

  const beforeImage = previousAnalysis?.face_image_url
  const afterImage = latestAnalysis?.face_image_url
  const scoreImprovement = latestAnalysis?.overall_score_trend ?? 0
  const latestScore = latestAnalysis?.overall_score ?? 87

  const hasComparison = latestAnalysis && previousAnalysis

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-blue-400 text-base">Before / After Comparison</h3>
          <p className="text-xs text-slate-400">
            {latestAnalysis?.created_at.split('T')[0] ?? 'No data'}
          </p>
        </div>
        <div className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-1.5">
          <TrendingUp className="w-3 h-3" /> Score: {latestScore}
        </div>
      </div>

      <div
        className="relative flex-1 overflow-hidden rounded-xl border border-slate-100"
        style={{ minHeight: 260 }}
      >
        {hasComparison ? (
          <div className="flex h-full">
            <div className="w-1/2 relative overflow-hidden">
              <img
                src={
                  beforeImage ||
                  'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=600'
                }
                alt="Before"
                className="object-cover w-full h-full grayscale-[25%] brightness-95"
              />
              <span className="absolute bottom-3 left-3 text-[10px] text-white font-semibold uppercase tracking-wider bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
                Before
              </span>
            </div>

            <div className="w-1/2 relative overflow-hidden">
              <img
                src={
                  afterImage ||
                  'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=600'
                }
                alt="After"
                className="object-cover w-full h-full"
              />
              <span className="absolute bottom-3 right-3 text-[10px] text-white font-semibold uppercase tracking-wider bg-blue-400/60 backdrop-blur-sm px-2 py-1 rounded-md">
                After
              </span>
            </div>

            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center">
              <div className="w-px h-full bg-white/80" />
              <div className="absolute w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-blue-400 border border-slate-100">
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-50">
            <img
              src={
                afterImage ||
                'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=600'
              }
              alt="Latest"
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
          <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide mb-0.5">
            Improvement
          </p>
          <p className="text-emerald-700 text-xs font-bold">
            {scoreImprovement > 0 ? '+' : ''}
            {scoreImprovement}%
            {scoreImprovement === 0
              ? ' (baseline)'
              : scoreImprovement > 0
                ? ' improved'
                : ' decline'}
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
          <p className="text-[10px] font-semibold text-blue-500 uppercase tracking-wide mb-0.5">
            Status
          </p>
          <p className="text-blue-700 text-xs font-bold">
            {hasComparison ? 'Comparison' : 'Latest scan'}
          </p>
        </div>
      </div>
    </div>
  )
}
