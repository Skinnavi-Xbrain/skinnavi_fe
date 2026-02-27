import { useSelector } from 'react-redux'
import { Sparkles, Droplets, Sun, Moon, TrendingUp, CheckCircle2 } from 'lucide-react'
import { RoutinePackages } from '../components/RoutinePackages'
import { SkinMetricsCard } from '../components/SkinMetricsCard'
import type { RootState } from '@/shared/store'
import { RecommendedProducts } from '../components/RecommendedProducts'

const AnalysisResult = () => {
  const analysisData = useSelector((state: RootState) => state.analysis.currentResult)

  if (!analysisData || !analysisData.result.isValidImage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-medium">
          No valid analysis data found. Please scan again from the Home page.
        </p>
      </div>
    )
  }

  const { result } = analysisData
  const { metrics } = result

  const analyzedImageUrl = analysisData.result.imageUrl || ''
  const comboIds = result.recommendedCombos || []

  const getStatus = (value: number) => {
    if (value >= 85)
      return {
        text: 'Excellent',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        barColor: 'from-emerald-400 to-teal-500'
      }
    if (value >= 70)
      return {
        text: 'Good',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        barColor: 'from-blue-400 to-indigo-500'
      }
    if (value >= 50)
      return {
        text: 'Fair',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        barColor: 'from-amber-400 to-orange-500'
      }
    return {
      text: 'Critical',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      barColor: 'from-red-500 to-rose-600'
    }
  }

  const overallScore = Math.round(result.overallScore || 0)

  const skinMetrics = [
    {
      label: 'Pores',
      value: Math.round(metrics?.PORES || 0),
      icon: Droplets,
      description: 'Pore clarity & size'
    },
    {
      label: 'Acne',
      value: Math.round(metrics?.ACNE || 0),
      icon: Sun,
      description: 'Acne & breakout condition'
    },
    {
      label: 'Dark Circles',
      value: Math.round(metrics?.DARK_CIRCLES || 0),
      icon: Moon,
      description: 'Under-eye fatigue'
    },
    {
      label: 'Dark Spots',
      value: Math.round(metrics?.DARK_SPOTS || 0),
      icon: Sparkles,
      description: 'Pigmentation & spots'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Skin Analysis Results
        </h1>
      </div>

      <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white overflow-hidden mb-20">
        <div className="flex flex-col">
          <div className="p-8 md:p-12 bg-gradient-to-b from-blue-50/50 to-transparent border-b border-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden ring-[12px] ring-white shadow-2xl">
                  <img
                    src={analyzedImageUrl}
                    alt="Analyzed Face"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/150?text=No+Image'
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white bg-gradient-to-br from-blue-600 to-indigo-600">
                  <div className="text-center text-white">
                    <div className="text-2xl md:text-3xl font-black">{overallScore}%</div>
                    <div className="text-[9px] font-bold uppercase tracking-tighter opacity-80">
                      Score
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-lg text-blue-700 text-xs font-bold uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4" />
                    Expert Assessment
                  </div>
                  <h2 className="text-base md:text-lg font-normal italic text-gray-800 leading-tight">
                    "{result.overallComment}"
                  </h2>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-bold text-emerald-700">
                      Skin Type: {result.skinType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-2xl border border-purple-100">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-bold text-purple-700">AI Verified Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <SkinMetricsCard metrics={skinMetrics} getStatus={getStatus} isNested={true} />
          </div>
        </div>
      </div>

      <RecommendedProducts comboIds={comboIds} />
      <RoutinePackages />
    </div>
  )
}

export default AnalysisResult
