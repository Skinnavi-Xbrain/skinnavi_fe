import { X, Package, ExternalLink, ShoppingBag } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import type { Combo, ComboProduct } from '../types/combo'

interface ComboDetailModalProps {
  combo: Combo
  appliedComboId: string | null
  onClose: () => void
  onApply: (comboId: string) => void
}

export const ComboDetailModal = ({
  combo,
  appliedComboId,
  onClose,
  onApply
}: ComboDetailModalProps) => {
  const formatVND = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 md:p-10"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl 
                   flex flex-col md:flex-row max-h-[95vh] md:max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-[60] p-2 rounded-full bg-white/80 md:bg-gray-100 backdrop-blur-md shadow-md hover:bg-gray-200 transition active:scale-90"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="w-full md:flex-1 bg-gradient-to-br from-blue-50 via-white to-blue-50 md:border-r border-gray-100 p-4 md:p-10 flex flex-col min-h-0">
          <div className="flex flex-row md:flex-col items-center md:items-stretch gap-4 md:gap-0 min-h-0">
            <div className="relative w-1/3 md:w-full aspect-square max-h-[120px] md:max-h-[calc(100%-8rem)] bg-white rounded-xl md:rounded-[2rem] shadow-sm p-2 md:p-8 flex items-center justify-center shrink-0">
              <img
                src={combo.image_url}
                alt={combo.combo_name}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-1 left-1 md:top-3 md:left-3">
                <span className="px-1.5 py-0.5 bg-[#67aeff] text-white text-[8px] md:text-[10px] font-bold rounded-full uppercase">
                  Recommended
                </span>
              </div>
            </div>

            <div className="flex-1 mt-0 md:mt-6 space-y-1 md:space-y-3">
              <h2 className="text-base md:text-2xl font-bold text-gray-900 leading-tight line-clamp-2">
                {combo.combo_name}
              </h2>
              <p className="text-lg md:text-3xl font-black text-[#67aeff]">
                {formatVND(Number(combo.display_price))}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[55%] flex flex-col min-h-0 bg-white border-t border-gray-100 md:border-t-0">
          <div className="px-4 py-3 md:px-10 md:pt-10 md:pb-6 flex items-center gap-3 shrink-0">
            <div className="p-1.5 bg-[#67aeff] rounded-lg hidden md:block">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-[12px] md:text-lg font-bold text-gray-900 uppercase tracking-tight">
              Combo Includes
            </h3>
            <span className="ml-auto text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
              {combo.combo_products?.length} Items
            </span>
          </div>

          <div className="flex-1 overflow-y-auto px-4 md:px-10 pb-2 no-scrollbar">
            <div className="space-y-2 md:space-y-3">
              {combo.combo_products
                ?.sort((a, b) => a.step_order - b.step_order)
                .map((item: ComboProduct) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 md:p-3 rounded-xl md:rounded-2xl border border-gray-100 bg-white hover:border-blue-200 transition-all"
                  >
                    <div className="w-10 h-10 md:w-16 md:h-16 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden p-1">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-0.5">
                        {' '}
                        <span className="flex-shrink-0 w-4 h-4 mt-0.5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-slate-500">
                          {item.step_order}
                        </span>
                        <h4 className="text-[11px] md:text-sm font-bold text-gray-900 leading-tight line-clamp-2 md:line-clamp-none whitespace-normal">
                          {item.product.name}
                        </h4>
                      </div>
                      <p className="ml-[24px] text-[9px] md:text-[11px] text-gray-500 flex items-center gap-1">
                        <span className="font-semibold text-[#67aeff] uppercase">
                          {item.product.usage_role}
                        </span>
                        <span>•</span>
                        <span>{formatVND(Number(item.product.display_price))}</span>
                      </p>
                    </div>
                    <a
                      href={item.product.affiliate_url}
                      target="_blank"
                      className="p-1 text-gray-300 hover:text-blue-500 shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
            </div>
          </div>

          <div className="p-4 md:p-10 bg-white border-t border-gray-100 flex gap-2 shrink-0">
            <Button
              variant="outline"
              className="flex-1 h-10 md:h-14 rounded-xl border-gray-200 text-gray-700 font-bold text-[10px] md:text-sm hover:bg-blue-500 hover:text-white transition-all duration-500"
              onClick={() => window.open(combo.affiliate_url, '_blank')}
            >
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              SHOP
            </Button>
            <Button
              className={cn(
                'flex-[2] h-10 md:h-14 rounded-xl font-bold text-white shadow-lg text-[10px] md:text-sm',
                appliedComboId === combo.id
                  ? 'bg-green-500'
                  : 'bg-[#67aeff] hover:bg-blue-500 font-bold transition-all duration-500'
              )}
              onClick={() => onApply(combo.id)}
            >
              {appliedComboId === combo.id ? 'SELECTED' : 'CHOOSE COMBO'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
