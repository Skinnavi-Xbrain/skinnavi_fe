import React from 'react'
import { Package, Layers, Plus } from 'lucide-react'

interface ProductHeaderProps {
  activeTab: 'single' | 'combo'
  onTabChange: (tab: 'single' | 'combo') => void
  onOpenModal: () => void
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ activeTab, onTabChange, onOpenModal }) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6">
      <div className="text-left">
        <h1 className="text-2xl md:text-[28px] font-black text-gray-900 tracking-tight">
          Product Management
        </h1>
        <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium italic">
          Organize products and expert skincare combos
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm w-full sm:w-auto">
          <button
            onClick={() => onTabChange('single')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'single'
                ? 'bg-[#67AEFF] text-white shadow-lg shadow-blue-100'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Package size={14} /> Products
          </button>
          <button
            onClick={() => onTabChange('combo')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'combo'
                ? 'bg-[#67AEFF] text-white shadow-lg shadow-blue-100'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Layers size={14} /> Combos
          </button>
        </div>

        <button
          onClick={onOpenModal}
          className="w-full sm:w-auto bg-[#67AEFF] hover:bg-[#5698e6] text-white px-8 py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-100 hover:-translate-y-0.5"
        >
          <Plus size={18} />
          {activeTab === 'single' ? 'Add New Product' : 'Add New Combo'}
        </button>
      </div>
    </div>
  )
}

export default ProductHeader
