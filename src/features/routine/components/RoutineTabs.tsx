import { Sun, Moon } from 'lucide-react'
import type { RoutineTime } from '../types'

interface RoutineTabsProps {
  activeTab: RoutineTime
  onTabChange: (tab: RoutineTime) => void
}

const RoutineTabs = ({ activeTab, onTabChange }: RoutineTabsProps) => {
  return (
    <div
      className="bg-white rounded-full p-1.5 shadow-sm border border-gray-100 flex animate-slideUp"
      style={{ animationDelay: '0.2s' }}
    >
      <button
        onClick={() => onTabChange('morning')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
          activeTab === 'morning'
            ? 'bg-blue-400 text-white shadow-md scale-105'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Sun
          className={`w-5 h-5 transition-colors duration-300 ${
            activeTab === 'morning' ? 'text-yellow-400' : 'text-gray-400'
          }`}
        />
        Morning
      </button>

      <button
        onClick={() => onTabChange('evening')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
          activeTab === 'evening'
            ? 'bg-blue-400 text-white shadow-md scale-105'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Moon
          className={`w-5 h-5 transition-colors duration-300 ${
            activeTab === 'evening' ? 'text-yellow-400' : 'text-gray-400'
          }`}
        />
        Evening
      </button>
    </div>
  )
}

export default RoutineTabs
