import profile from '@/shared/assets/images/image 14.png'
import type { Routine, RoutineTime } from '../types'

interface RoutineStepsProps {
  activeTab: RoutineTime
  currentRoutine: Routine | undefined
}

const routineTips = [
  {
    title: 'Consistency is Key',
    description: 'Follow your routine daily for at least 4-6 weeks to see results'
  },
  {
    title: 'Wait Between Steps',
    description: 'Allow 30-60 seconds between products for better absorption'
  },
  {
    title: 'Track Your Progress',
    description: 'Take weekly photos to monitor improvements in skin health'
  }
]

const getBackgroundColor = (role: string) => {
  const colorMap: Record<string, string> = {
    Cleanser: 'bg-blue-50',
    Toner: 'bg-purple-50',
    Moisturizer: 'bg-blue-50',
    Exfoliator: 'bg-pink-50',
    Serum: 'bg-green-50',
    Sunscreen: 'bg-yellow-50'
  }
  return colorMap[role] || 'bg-gray-50'
}

const RoutineSteps = ({ activeTab, currentRoutine }: RoutineStepsProps) => {
  return (
    <div className="space-y-6">
      {/* Greeting Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between transition-all duration-300 hover:shadow-md animate-slideUp">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden">
            <img src={profile} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-gray-800 font-medium">
              Good {activeTab}!<span className="ml-1">😊</span> Let's start
            </p>
            <p className="text-gray-800 font-medium">your skincare!</p>
          </div>
        </div>
        <div className="w-16 h-16 bg-blue-400 rounded-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Routine Steps */}
      {currentRoutine && currentRoutine.steps.length > 0 ? (
        <div className="space-y-0">
          {currentRoutine.steps
            .sort((a, b) => a.step_order - b.step_order)
            .map((step, index) => (
              <div
                key={step.id}
                className="relative animate-slideUp"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 transition-transform duration-300 hover:scale-110">
                      {step.step_order}
                    </div>
                    {index < currentRoutine.steps.length - 1 && (
                      <div
                        className="w-0.5 h-full bg-blue-200 my-1"
                        style={{ minHeight: '60px' }}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {step.product.usage_role}
                    </h3>

                    {/* Product Card */}
                    <a
                      href={`/step-detail`}
                      className="block bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-20 h-20 ${getBackgroundColor(
                            step.product.usage_role
                          )} rounded-2xl flex items-center justify-center p-2 flex-shrink-0 transition-transform duration-300 hover:scale-110`}
                        >
                          <img
                            src={step.product.image_url}
                            alt={step.product.name}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>

                        <div className="flex-1">
                          <p className="text-gray-800 font-medium text-sm">{step.product.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{step.instruction}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-12 animate-fadeIn">
          <p className="text-gray-500">No routine found for {activeTab}</p>
        </div>
      )}

      {/* Routine Tips */}
      <div className="mt-8 animate-slideUp" style={{ animationDelay: '0.5s' }}>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Routine Tips</h3>

        <div className="bg-blue-50 rounded-2xl px-8 py-6">
          <div className="grid md:grid-cols-3 gap-8">
            {routineTips.map((tip, index) => (
              <div key={index} className="text-left">
                <h4 className="font-bold text-gray-900 text-sm mb-2">{tip.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoutineSteps
