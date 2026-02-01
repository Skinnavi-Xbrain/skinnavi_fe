import { useEffect, useState } from 'react'
import { CheckCircle2, Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { env } from '@/config/env'
import type { RoutinePackage, RoutinePackagesResponse } from './types/index'
import detailPackage1 from '@/shared/assets/images/detail_package1.png'
import detailPackage2 from '@/shared/assets/images/detail_package2.png'
import product1 from '@/shared/assets/images/product1.png'
import product2 from '@/shared/assets/images/product2.png'
import product3 from '@/shared/assets/images/product3.png'
import product4 from '@/shared/assets/images/product4.png'

const featuredProducts = [
  { id: 1, name: 'Alpha Arbutin & Vitamin C', price: 135.0, originalPrice: 150.0, image: product1 },
  { id: 2, name: 'Firming Lift Eye Gel', price: 100.0, originalPrice: 140.0, image: product2 },
  { id: 3, name: 'Vitamin C Serum', price: 50.0, originalPrice: 100.0, image: product3 },
  { id: 4, name: 'Vitamin C Serum', price: 50.0, originalPrice: 100.0, image: product4 }
]

const TrialPlan = () => {
  const navigate = useNavigate()
  const { days } = useParams<{ days: string }>()
  const [packageData, setPackageData] = useState<RoutinePackage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPackage = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${env.API_URL}/routines/packages`)
        const result: RoutinePackagesResponse = await response.json()

        if (result.success) {
          const selectedDays = parseInt(days || '7')
          const matchedPlan = result.data.find((p) => p.duration_days === selectedDays)
          setPackageData(matchedPlan || null)
        }
      } catch (error) {
        console.error('Failed to fetch packages:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPackage()
  }, [days])

  const handleGetStarted = () => {
    navigate('/register')
  }

  const handleShopNow = (productId: number) => {
    navigate(`/products/${productId}`)
  }

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
        <h2 className="text-2xl font-bold text-gray-800">Package not found.</h2>
        <Button onClick={() => navigate('/')} className="mt-4">
          Back to Home
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section*/}
      <section className="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 py-16 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-gray-700 mb-3 md:mb-4 animate-fade-in-up">
            {packageData.duration_days === 7
              ? '1 week plan'
              : `${packageData.duration_days / 30} month plan`}
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 uppercase animate-fade-in-up animation-delay-100">
            {packageData.package_name}
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 animate-fade-in-up animation-delay-200">
            FOR{' '}
            <span className="text-blue-500 text-3xl md:text-4xl inline-block hover:scale-110 transition-transform duration-300">
              {packageData.duration_days}
            </span>{' '}
            DAYS
          </p>
          <p className="mt-4 text-2xl font-semibold text-blue-600 animate-fade-in-up animation-delay-300 hover:scale-105 transition-transform duration-300 inline-block">
            Only {Number(packageData.price).toLocaleString('vi-VN')} VND
          </p>
        </div>
      </section>

      {/* Why Try This Plan Section*/}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="opacity-0 animate-fade-in-left">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-blue-500 animate-sparkle" />
                <h3 className="text-2xl md:text-3xl font-bold text-blue-500">Why try this plan?</h3>
              </div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {packageData.description}
              </p>
            </div>

            <div className="relative opacity-0 animate-fade-in-left animation-delay-200">
              <div className="max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-2xl animate-float">
                <img
                  src={detailPackage2}
                  alt="Woman skin"
                  className="w-full h-full object-cover hover:brightness-110 transition-all duration-500"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-30 animate-blob" />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="relative opacity-0 animate-fade-in-right">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-pink-50 to-orange-50 hover:shadow-2xl transition-shadow duration-500">
                <img
                  src={detailPackage1}
                  alt="Skincare products"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="space-y-5">
              {packageData.highlights.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group opacity-0 animate-fade-in-right hover:translate-x-2 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-blue-100 rounded-full p-1.5 mt-0.5 flex-shrink-0 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="text-gray-800 text-sm md:text-base leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section*/}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 opacity-0 animate-fade-in-up">
            Our Featured Products
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 opacity-0 animate-fade-in-up hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 aspect-square flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-white/50 rounded-xl flex items-center justify-center group-hover:bg-white/70 transition-colors duration-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-3/4 h-3/4 object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="p-4 md:p-5">
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 md:mb-3 line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <div className="mb-3 md:mb-4">
                    <p className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-500 transition-colors duration-300">
                      $ {product.price.toFixed(2)} USD
                    </p>
                    {product.originalPrice > product.price && (
                      <p className="text-xs md:text-sm text-gray-500 line-through">
                        $ {product.originalPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={() => handleShopNow(product.id)}
                    className="w-full bg-blue-400 hover:bg-blue-500 text-white rounded-lg md:rounded-xl py-2 md:py-2.5 text-sm md:text-base font-medium transition-all duration-300 hover:shadow-lg active:scale-95"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center opacity-0 animate-fade-in-up animation-delay-400">
            <Button
              onClick={handleGetStarted}
              className="w-full sm:w-auto px-12 md:px-16 py-5 md:py-6 bg-blue-400 hover:bg-blue-500 text-white text-base md:text-lg font-semibold rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              GET STARTED
            </Button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-15px) translateX(-5px);
          }
          75% {
            transform: translateY(-5px) translateX(3px);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: scale(1.2) rotate(15deg);
            opacity: 0.8;
          }
          50% {
            transform: scale(0.9) rotate(-15deg);
            opacity: 1;
          }
          75% {
            transform: scale(1.1) rotate(10deg);
            opacity: 0.9;
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(10px, -10px) scale(1.1);
          }
          66% {
            transform: translate(-10px, 10px) scale(0.9);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 3s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animation-delay-100 {
          animation-delay: 100ms;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  )
}

export default TrialPlan
