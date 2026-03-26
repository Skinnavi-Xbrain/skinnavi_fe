import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="px-6 md:px-10 py-6 border-t border-gray-50 flex items-center justify-between bg-white/50 backdrop-blur-sm">
      <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
        Page <span className="text-[#67AEFF]">{currentPage}</span> of {totalPages || 1}
      </span>
      <div className="flex gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          className="p-3 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md disabled:opacity-20 transition-all active:scale-90"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <button
          disabled={currentPage >= (totalPages || 1)}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          className="p-3 rounded-xl border border-gray-100 hover:bg-white hover:shadow-md disabled:opacity-20 transition-all active:scale-90"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  )
}

export default Pagination
