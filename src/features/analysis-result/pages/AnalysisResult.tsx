import { useSelector } from 'react-redux'
import { Sparkles, Droplets, Sun, Moon, TrendingUp } from 'lucide-react'
import { PopularProducts } from '../components/PopularProducts'
import { RoutinePackages } from '../components/RoutinePackages'
import { SkinMetricsCard } from '../components/SkinMetricsCard'
import profileImage from '@/shared/assets/images/profile.jpg'
import type { RootState } from '@/shared/store'

const AnalysisResult = () => {
  const analysisData = useSelector((state: RootState) => state.analysis.currentResult)

  if (!analysisData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-medium">
          No analysis data found. Please scan again from the Home page.
        </p>
      </div>
    )
  }

  const { result } = analysisData

  const getStatus = (value: number) => {
    if (value >= 85) return { text: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50' }
    if (value >= 70) return { text: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-50' }
    return { text: 'Needs attention', color: 'text-orange-600', bgColor: 'bg-orange-50' }
  }

  const skinMetrics = [
    {
      label: 'Pores',
      value: Math.max(0, 100 - result.concerns.pores * 20),
      icon: Droplets,
      color: 'from-blue-400 to-cyan-500',
      description: 'Pore clarity'
    },
    {
      label: 'Acne',
      value: Math.max(0, 100 - result.concerns.acnes * 20),
      icon: Sun,
      color: 'from-amber-400 to-orange-500',
      description: 'Acne condition'
    },
    {
      label: 'Under-eye circles',
      value: Math.max(0, 100 - result.concerns.darkCircles * 20),
      icon: Moon,
      color: 'from-indigo-400 to-purple-500',
      description: 'Under-eye area'
    },
    {
      label: 'Dark spots',
      value: Math.max(0, 100 - result.concerns.darkSpots * 20),
      icon: Sparkles,
      color: 'from-pink-400 to-rose-500',
      description: 'Skin pigmentation'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
            Skin Analysis Results
          </h1>
          <p className="text-gray-600 text-lg">
            Skin type: <span className="font-bold text-blue-600">{result.skinType}</span>
          </p>
        </div>

        <div className="mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 flex flex-col md:flex-row items-center gap-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full blur-2xl opacity-40" />
              <div className="relative w-56 h-56 rounded-full overflow-hidden ring-8 ring-white shadow-xl">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white bg-gradient-to-br from-blue-500 to-cyan-600">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold">{result.skinScore}%</div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-800">Expert Assessment</h2>
                </div>
                <p className="text-gray-600 leading-relaxed italic">"{result.overallComment}"</p>
              </div>
              <div className="bg-blue-50/50 p-4 rounded-2xl flex items-center gap-3 text-blue-700 text-sm">
                <Sparkles className="w-5 h-5" />
                <span>Updated based on your latest scan</span>
              </div>
            </div>
          </div>
        </div>

        <SkinMetricsCard metrics={skinMetrics} getStatus={getStatus} />

        <PopularProducts />
        <RoutinePackages />
      </div>
    </div>
  )
}

export default AnalysisResult
