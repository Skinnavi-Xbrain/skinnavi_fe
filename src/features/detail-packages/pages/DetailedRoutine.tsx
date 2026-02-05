import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle2, Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { getRoutinePackage } from '../services/detail-packages.api'
import type { RoutinePackage } from '../types/detail-routine'
import { ProductList } from '../components/ProductList'

import detailPackage1 from '@/shared/assets/images/detail_package1.png'
import detailPackage2 from '@/shared/assets/images/detail_package2.png'

const DetailedRoutine = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [packageData, setPackageData] = useState<RoutinePackage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAndFilterPackage = async () => {
      setIsLoading(true)
      try {
        const matchedPackage = await getRoutinePackage(id!)
        if (matchedPackage) {
          setPackageData(matchedPackage)
        } else {
          console.error('Package not found for id:', id)
        }
      } catch (error) {
        console.error('Error fetching package data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchAndFilterPackage()
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Package not found.</h2>
        <Button onClick={() => navigate('/home')} className="mt-4">
          Back to Home
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 py-16 text-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif italic text-gray-700 mb-4 animate-fade-in-up">
            {packageData.duration_days >= 30
              ? `${Math.floor(packageData.duration_days / 30)} month plan`
              : `${packageData.duration_days} days plan`}
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 uppercase animate-fade-in-up animation-delay-100">
            {packageData.package_name}
          </h2>
          <p className="mt-4 text-2xl font-semibold text-blue-600 animate-fade-in-up animation-delay-300">
            Only {Number(packageData.price).toLocaleString('vi-VN')} VND
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="space-y-8">
            <div className="animate-fade-in-left">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-blue-500 animate-sparkle" />
                <h3 className="text-2xl md:text-3xl font-bold text-blue-500">Why try this plan?</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{packageData.description}</p>
            </div>
            <div className="animate-fade-in-left animation-delay-200 animate-float rounded-2xl overflow-hidden shadow-lg max-w-sm">
              <img src={detailPackage2} alt="Skin" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="animate-fade-in-right aspect-video rounded-3xl overflow-hidden shadow-lg">
              <img src={detailPackage1} alt="Products" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-5">
              {packageData.highlights.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group animate-fade-in-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                  <p className="text-gray-800 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 animate-fade-in-up">
            Our Featured Products
          </h2>
          <ProductList />
          <div className="text-center mt-12 animate-fade-in-up animation-delay-400">
            <Button
              onClick={() => navigate('/register')}
              className="px-12 py-6 bg-blue-400 hover:bg-blue-500 text-white text-lg font-semibold rounded-xl transition-all hover:scale-105"
            >
              GET STARTED
            </Button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes floatSlow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes sparkle { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.8; } }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fade-in-left { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fade-in-right { animation: fadeInRight 0.8s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animate-scale-up { animation: scaleUp 0.3s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: floatSlow 4s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 3s ease-in-out infinite; }
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-400 { animation-delay: 400ms; }
      `}</style>
    </div>
  )
}

export default DetailedRoutine
