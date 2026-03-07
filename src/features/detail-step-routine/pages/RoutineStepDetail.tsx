import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import type { RoutineData } from '../types'
import { getRoutineStepDetail } from '../services/routine-step-detail.api'
import { Loader2 } from 'lucide-react'
import { toast } from '@/shared/hooks/use-toast'

const RoutineStepDetail = () => {
  const { stepId } = useParams<{ stepId: string }>()
  const navigate = useNavigate()

  const [routineData, setRoutineData] = useState<RoutineData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDetail = async () => {
      if (!stepId) return
      setIsLoading(true)
      try {
        const data = await getRoutineStepDetail(stepId)
        if (data) {
          setRoutineData(data)
        } else {
          toast({
            title: 'Not found',
            description: 'Routine step not found.',
            variant: 'destructive'
          })
          navigate('/daily-routine')
        }
      } catch (err) {
        console.error(err)
        toast({
          title: 'Error',
          description: 'Unable to load routine step.',
          variant: 'destructive'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetail()
  }, [stepId, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!routineData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500">Routine detail unavailable.</p>
      </div>
    )
  }

  const { product, sub_steps } = routineData

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-10 md:py-14 animate-fadeIn">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl p-3 transition-transform duration-300 hover:scale-110">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain scale-110"
              />
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-400 animate-slideInRight">
              {product.name}
            </h1>
          </div>

          <nav className="flex items-center justify-center gap-2 text-xs md:text-sm">
            <span
              className="text-gray-600 hover:text-blue-500 cursor-pointer transition-colors"
              onClick={() => navigate('/')}
            >
              Home
            </span>
            <span className="text-gray-400">/</span>
            <span
              className="text-gray-600 hover:text-blue-500 cursor-pointer transition-colors"
              onClick={() => navigate('/daily-routine')}
            >
              Routine
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-blue-500 font-medium">Routine Detail</span>
          </nav>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {sub_steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col md:flex-row gap-6 md:gap-10 items-center ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              } animate-slideUp`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
                <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl overflow-hidden shadow-sm p-4 transition-all duration-300 hover:shadow-lg">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <img
                      src={step.image_url}
                      alt={step.title}
                      className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 md:p-10 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-300">
                  <div className="inline-flex items-center gap-3 bg-blue-100 rounded-full px-4 py-2 mb-4">
                    <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {step.order || index + 1}
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-blue-400">{step.title}</h3>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-xs md:text-sm">{step.how_to}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out backwards;
        }
      `}</style>
    </div>
  )
}

export default RoutineStepDetail
