import step1 from '../../../shared/assets/images/step1.png'
import step2 from '../../../shared/assets/images/step2.png'
import step3 from '../../../shared/assets/images/step3.png'
import step4 from '../../../shared/assets/images/step4.png'
import cetaphilImg from '../../../shared/assets/images/cetaphil.png'
import ChatBot from '../components/Chatbot'

const productDetail = {
  name: 'Gentle facial cleanser',
  image: cetaphilImg,
  steps: [
    {
      stepNumber: 1,
      title: 'Wash your face with water',
      description:
        'Use cool or lukewarm water (avoiding hot water) to thoroughly wet your entire face.',
      image: step1,
      imagePosition: 'left'
    },
    {
      stepNumber: 2,
      title: 'Wash your face with cleanser',
      description:
        'Use a small amount of cleanser, lather it, then apply to your face. Gently massage upward in circular motions for 30-60 seconds.',
      image: step2,
      imagePosition: 'right'
    },
    {
      stepNumber: 3,
      title: 'Rinse your face with water again',
      description:
        'Rinse your face thoroughly with cool or lukewarm water until all traces of soap/cleanser have been completely removed.',
      image: step3,
      imagePosition: 'left'
    },
    {
      stepNumber: 4,
      title: 'Dry your face',
      description:
        'Use a soft, clean, dedicated face towel or disposable paper towel. Use a gentle patting motion instead of rubbing vigorously.',
      image: step4,
      imagePosition: 'right'
    }
  ]
}

const RoutineStepDetail = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-10 md:py-14 animate-fadeIn">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl p-3 transition-transform duration-300 hover:scale-110">
              <img
                src={productDetail.image}
                alt={productDetail.name}
                className="w-full h-full object-contain scale-125"
              />
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-400 animate-slideInRight">
              {productDetail.name}
            </h1>
          </div>

          <nav className="flex items-center justify-center gap-2 text-xs md:text-sm">
            <a
              href="/"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
            >
              Home
            </a>
            <span className="text-gray-400">/</span>
            <a
              href="/daily-routine"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
            >
              Routine
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-blue-500 font-medium">Routine Detail</span>
          </nav>
        </div>
      </section>

      {/* Steps Section */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-20 py-8 md:py-12">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          {productDetail.steps.map((step, index) => (
            <div
              key={step.stepNumber}
              className={`flex flex-col md:flex-row gap-6 md:gap-8 items-center ${
                step.imagePosition === 'right' ? 'md:flex-row-reverse' : ''
              } animate-slideUp`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Image */}
              <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
                <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl overflow-hidden shadow-sm p-4 transition-all duration-300 hover:shadow-lg">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="bg-white border-2 border-blue-200 rounded-2xl p-5 md:p-10 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-300">
                  {/* Step Header */}
                  <div className="inline-flex items-center gap-3 bg-blue-100 rounded-full px-4 py-2 mb-4">
                    <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {step.stepNumber}
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-blue-400">{step.title}</h3>
                  </div>

                  {/* Step Description */}
                  <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ChatBot Component */}
      <ChatBot />

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
