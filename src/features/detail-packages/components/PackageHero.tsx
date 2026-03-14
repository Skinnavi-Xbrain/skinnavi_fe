import type { RoutinePackage } from '../types/detail-routine'

type Props = {
  packageData: RoutinePackage
}

const PackageHero = ({ packageData }: Props) => {
  return (
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
  )
}

export default PackageHero
