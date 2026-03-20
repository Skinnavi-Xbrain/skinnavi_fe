import { Sparkles, CheckCircle2 } from 'lucide-react'
import type { RoutinePackage } from '../types/detail-routine'

import detailPackage1 from '@/shared/assets/images/detail_package1.png'
import detailPackage2 from '@/shared/assets/images/detail_package2.png'

type Props = {
  packageData: RoutinePackage
}

const PackageDetails = ({ packageData }: Props) => {
  return (
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
            <img src={detailPackage2} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="space-y-8">
          <div className="animate-fade-in-right aspect-video rounded-3xl overflow-hidden shadow-lg">
            <img src={detailPackage1} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-5">
            {packageData.highlights.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 group animate-fade-in-right"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 shrink-0" />

                <p className="text-gray-800 leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PackageDetails
