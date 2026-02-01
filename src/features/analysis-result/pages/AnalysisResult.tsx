import { Sparkles, Droplets, Sun, Moon, TrendingUp } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { PopularProducts } from '../components/PopularProducts'
import { RoutinePackages } from '../components/RoutinePackages'
import profileImage from '@/shared/assets/images/profile.jpg'
import { SkinMetricsCard } from '../components/SkinMetricsCard'

interface SkinMetric {
  label: string
  value: number
  icon: LucideIcon
  color: string
  bgColor: string
  description: string
}

const AnalysisResult = () => {
  const getResultStatus = (value: number) => {
    if (value >= 85) return { text: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50' }
    if (value >= 70) return { text: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-50' }
    if (value >= 50) return { text: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
    return { text: 'Needs Care', color: 'text-orange-600', bgColor: 'bg-orange-50' }
  }

  const getOverallAssessment = (score: number) => {
    if (score >= 85)
      return {
        text: 'Outstanding',
        description: 'Your skin is in excellent condition!',
        color: 'from-green-500 to-emerald-600'
      }
    if (score >= 70)
      return {
        text: 'Healthy',
        description: 'Your skin shows good health.',
        color: 'from-blue-500 to-cyan-600'
      }
    return {
      text: 'Moderate',
      description: 'Some areas need attention.',
      color: 'from-yellow-500 to-amber-600'
    }
  }

  const skinMetrics: SkinMetric[] = [
    {
      label: 'Pores',
      value: 88,
      icon: Droplets,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      description: 'Pore condition'
    },
    {
      label: 'Acnes',
      value: 79,
      icon: Sun,
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
      description: 'Acne control'
    },
    {
      label: 'Dark circles',
      value: 65,
      icon: Moon,
      color: 'from-indigo-400 to-purple-500',
      bgColor: 'bg-indigo-50',
      description: 'Under-eye area'
    },
    {
      label: 'Dark spots',
      value: 79,
      icon: Sparkles,
      color: 'from-pink-400 to-rose-500',
      bgColor: 'bg-pink-50',
      description: 'Pigmentation'
    }
  ]

  const overallScore = Math.round(
    skinMetrics.reduce((acc, m) => acc + m.value, 0) / skinMetrics.length
  )
  const assessment = getOverallAssessment(overallScore)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Assessment Card */}
        <div className="mb-12 transition-all duration-1000 delay-100 opacity-100 translate-y-0">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 flex flex-col md:flex-row items-center gap-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full blur-2xl opacity-40" />
              <div className="relative w-56 h-56 rounded-full overflow-hidden ring-8 ring-white shadow-xl">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div
                className={cn(
                  'absolute -bottom-2 -right-2 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white bg-gradient-to-br',
                  assessment.color
                )}
              >
                <div className="text-center text-white">
                  <div className="text-3xl font-bold leading-none">{overallScore}%</div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-800">Professional Assessment</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{assessment.description}</p>
              </div>
              <div className="bg-blue-50/50 p-4 rounded-2xl flex items-center gap-3 text-blue-700 text-sm">
                <Sparkles className="w-5 h-5" />
                <span>Updated today based on your latest scan</span>
              </div>
            </div>
          </div>
        </div>

        <SkinMetricsCard metrics={skinMetrics} getStatus={getResultStatus} />

        {/* Metrics Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skinMetrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              {...metric}
              index={index}
              mounted={true}
              status={getResultStatus(metric.value)}
            />
          ))}
        </div> */}

        <PopularProducts />
        <RoutinePackages />
      </div>
    </div>
  )
}

export default AnalysisResult
