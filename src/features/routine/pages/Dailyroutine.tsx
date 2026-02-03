import { useState } from 'react'
import { Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react'
import profile from '../../../shared/assets/images/image 14.png'

// Mock data - replace with actual API
const routineSteps = {
  morning: [
    {
      id: 1,
      step: 'Cleansing',
      stepNumber: 1,
      product: 'Gentle facial cleanser',
      productImage: '/products/cleanser.png',
      backgroundColor: 'bg-blue-50'
    },
    {
      id: 2,
      step: 'Toning',
      stepNumber: 2,
      product: 'Hydrating toner',
      productImage: '/products/toner.png',
      backgroundColor: 'bg-purple-50'
    },
    {
      id: 3,
      step: 'Moisturizing',
      stepNumber: 3,
      product: 'Lightweight moisturizer',
      productImage: '/products/moisturizer.png',
      backgroundColor: 'bg-blue-50'
    }
  ],
  evening: [
    {
      id: 1,
      step: 'Cleansing',
      stepNumber: 1,
      product: 'Gentle facial cleanser',
      productImage: '/products/cleanser.png',
      backgroundColor: 'bg-blue-50'
    },
    {
      id: 2,
      step: 'Toning',
      stepNumber: 2,
      product: 'Hydrating toner',
      productImage: '/products/toner.png',
      backgroundColor: 'bg-purple-50'
    },
    {
      id: 3,
      step: 'Moisturizing',
      stepNumber: 3,
      product: 'Lightweight moisturizer',
      productImage: '/products/moisturizer.png',
      backgroundColor: 'bg-blue-50'
    }
  ]
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

// Calendar helper functions
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

const DailyRoutine = () => {
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning')
  const [currentDate, setCurrentDate] = useState(new Date())

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

  // Generate calendar days
  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const monthNames = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  ]

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Mock completed days (replace with actual data)
  const completedDays = [2, 4, 5, 6, 9, 10, 11, 12, 16, 17, 18, 19, 20, 23, 24, 25, 26, 27, 30, 31]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-3">ROUTINE</h1>
          <nav className="flex items-center justify-center gap-2 text-sm md:text-base">
            <a href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
            <span className="text-gray-400">&gt;&gt;</span>
            <span className="text-blue-500 font-medium">Routine</span>
          </nav>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-[1fr,420px] gap-8">
          {/* Left Column - Routine Steps */}
          <div className="space-y-6">
            {/* Greeting Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
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
              <div className="w-16 h-16 bg-blue-400 rounded-2xl flex items-center justify-center">
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

            {/* Routine Steps - Updated UI */}
            <div className="space-y-0">
              {routineSteps[activeTab].map((step, index) => (
                <div key={step.id} className="relative">
                  {/* Step Item */}
                  <div className="flex items-start gap-4">
                    {/* Step Number with Line */}
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {step.stepNumber}
                      </div>
                      {/* Vertical Line */}
                      {index < routineSteps[activeTab].length - 1 && (
                        <div
                          className="w-0.5 h-full bg-blue-200 my-1"
                          style={{ minHeight: '60px' }}
                        />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pb-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{step.step}</h3>

                      {/* Product Card */}
                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div
                          className={`w-16 h-16 ${step.backgroundColor} rounded-xl flex items-center justify-center p-3 flex-shrink-0`}
                        >
                          <img
                            src={step.productImage}
                            alt={step.product}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="text-gray-800 font-medium text-sm">{step.product}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Routine Tips - Updated UI */}
            <div className="mt-8">
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

          {/* Right Column - Tabs & Calendar */}
          <div className="space-y-6 lg:sticky lg:top-4 lg:self-start">
            {/* Tabs */}
            <div className="bg-white rounded-full p-1.5 shadow-sm border border-gray-100 flex">
              <button
                onClick={() => setActiveTab('morning')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-semibold text-sm md:text-base transition-all ${
                  activeTab === 'morning'
                    ? 'bg-blue-400 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Sun className="w-5 h-5" />
                Morning
              </button>
              <button
                onClick={() => setActiveTab('evening')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-semibold text-sm md:text-base transition-all ${
                  activeTab === 'evening'
                    ? 'bg-blue-400 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Moon className="w-5 h-5" />
                Evening
              </button>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">ACTIVITY</h3>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <span className="font-bold text-gray-900">
                  {monthNames[currentMonth]} {currentYear}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Week day headers */}
                {weekDays.map((day, index) => (
                  <div key={index} className="text-center text-xs font-medium text-gray-500 pb-2">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((day, index) => (
                  <div key={index} className="aspect-square flex items-center justify-center">
                    {day && (
                      <button
                        className={`w-full h-full flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                          completedDays.includes(day)
                            ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {day}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyRoutine
