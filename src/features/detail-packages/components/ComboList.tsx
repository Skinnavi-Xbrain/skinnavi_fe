import { useEffect, useState } from 'react'
import { X, Loader2, Package, Check } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import type { Combo } from '../types/combo'
import { getRecommendedCombos } from '../services/combos.api'
import type { RootState } from '@/shared/store'
import { useSelector } from 'react-redux'
import { toast } from '@/shared/hooks/use-toast'
import { cn } from '@/shared/lib/utils'

interface ComboWithProducts extends Combo {
  products?: { id: string; name: string; size?: string; image?: string }[]
}

interface ComboListProps {
  onComboSelect: (comboId: string | null) => void
}

export const ComboList = ({ onComboSelect }: ComboListProps) => {
  const [combos, setCombos] = useState<ComboWithProducts[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCombo, setSelectedCombo] = useState<ComboWithProducts | null>(null)

  const [appliedComboId, setAppliedComboId] = useState<string | null>(null)

  const analysisResult = useSelector((state: RootState) => state.analysis.currentResult)
  const comboIds = analysisResult?.result?.recommendedCombos || []

  useEffect(() => {
    const fetchCombos = async () => {
      if (comboIds.length === 0) {
        setIsLoading(false)
        return
      }
      try {
        const data = await getRecommendedCombos(comboIds)
        setCombos(data)
      } catch (error) {
        console.error('Error fetching recommended combos:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCombos()
  }, [comboIds])

  const handleApplyClick = (comboId: string) => {
    setAppliedComboId(comboId)
    onComboSelect(comboId)
    setSelectedCombo(null)

    toast({
      title: 'Combo selected',
      description:
        'You have selected a combo. You can now proceed to get started with your routine.',
      variant: 'success'
    })
  }

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    )

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {combos.map((combo, index) => (
          <div
            key={combo.id}
            onClick={() => setSelectedCombo(combo)}
            style={{ animationDelay: `${index * 150}ms` }}
            className={`group relative cursor-pointer overflow-hidden rounded-[2.5rem] border bg-white p-3 shadow-sm
                 transition-all duration-500 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(103,174,255,0.15)]
                 animate-fade-in-up ${
                   appliedComboId === combo.id
                     ? 'border-blue-400 ring-2 ring-blue-100'
                     : 'border-slate-100'
                 }`}
          >
            {appliedComboId === combo.id && (
              <div className="absolute top-4 right-4 z-10 bg-blue-500 text-white p-1.5 rounded-full shadow-lg animate-scale-up">
                <Check className="w-4 h-4" strokeWidth={3} />
              </div>
            )}

            <div
              className="relative aspect-square overflow-hidden rounded-[2rem]
                      bg-gradient-to-br from-[#F8FBFF] to-[#F0F7FF]
                      flex items-center justify-center
                      transition-colors duration-500
                      group-hover:from-blue-100 group-hover:to-white"
            >
              <img
                src={combo.image_url}
                alt={combo.combo_name}
                className="h-4/5 w-4/5 object-contain drop-shadow-xl
                     transition-all duration-700
                     group-hover:scale-110 group-hover:-rotate-3"
              />
              <span className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="p-5 md:p-6 text-center">
              <h3
                className="mb-3 min-h-[2.5rem] line-clamp-2 text-sm md:text-base font-bold text-slate-800
                       transition-colors group-hover:text-blue-600"
              >
                {combo.combo_name}
              </h3>

              <p className="text-lg md:text-xl font-black tracking-tight text-[#67AEFF]">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(Number(combo.display_price))}
              </p>
            </div>

            <div
              className="absolute bottom-4 left-1/2 w-full -translate-x-1/2 px-8
                      translate-y-4 opacity-0
                      transition-all duration-300
                      group-hover:translate-y-0 group-hover:opacity-100"
            >
              <div className="rounded-xl bg-[#67AEFF] py-2 text-center text-[10px] font-bold text-white shadow-lg shadow-blue-200">
                VIEW DETAILS
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCombo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
             bg-black/60 backdrop-blur-md p-4"
          onClick={() => setSelectedCombo(null)}
        >
          <div
            className="relative w-full max-w-5xl
               bg-white rounded-[2.5rem] shadow-2xl
               flex flex-col md:flex-row md:items-stretch
               max-h-[90vh] md:max-h-[85vh]
               overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCombo(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6
                 z-20 p-2.5 rounded-full
                 bg-gray-100 hover:bg-gray-200 transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div
              className="w-full flex-1 min-w-0
                 bg-gradient-to-br from-blue-50 via-white to-blue-50
                 md:border-r border-gray-100
                 p-6 md:p-10
                 flex flex-col min-h-0"
            >
              <div className="flex-1 flex items-center justify-center min-h-0">
                <div
                  className="w-full aspect-square
                     max-h-[60vh] md:max-h-full
                     bg-white rounded-[2rem] shadow-sm
                     p-6 md:p-8
                     flex items-center justify-center"
                >
                  <img
                    src={selectedCombo.image_url}
                    alt={selectedCombo.combo_name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3 shrink-0">
                <span
                  className="inline-block px-3 py-1
                     bg-blue-100 text-blue-600
                     text-xs font-bold
                     rounded-full uppercase tracking-wider"
                >
                  Recommended
                </span>

                <h2
                  className="text-xl md:text-2xl font-bold text-gray-900
                     leading-tight break-words whitespace-normal"
                >
                  {selectedCombo.combo_name}
                </h2>

                <p className="text-2xl md:text-3xl font-black text-blue-600">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(Number(selectedCombo.display_price))}
                </p>
              </div>
            </div>

            <div
              className="w-full md:w-[55%] md:flex-none
                 p-6 md:p-10
                 flex flex-col min-h-0 bg-white"
            >
              <div className="flex items-center gap-3 mb-6 shrink-0">
                <div className="p-2.5 bg-blue-50 rounded-xl">
                  <Package className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">What's Inside</h3>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                <div className="space-y-3">
                  {selectedCombo.combo_products
                    .sort((a, b) => a.step_order - b.step_order)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4
                           p-4 rounded-2xl
                           border border-gray-50
                           bg-gray-50/30
                           hover:bg-blue-50/30
                           transition"
                      >
                        <div
                          className="w-14 h-14 flex-shrink-0
                             bg-white rounded-xl
                             border border-gray-100
                             flex items-center justify-center p-2"
                        >
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 truncate">
                            {item.step_order}. {item.product.name}
                          </h4>
                          <p className="mt-1 text-xs text-gray-500">
                            {item.product.usage_role} •{' '}
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            }).format(Number(item.product.display_price))}
                          </p>
                        </div>

                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                    ))}
                </div>
              </div>

              <div
                className="mt-6 pt-6 border-t border-gray-100
                   flex gap-4 shrink-0"
              >
                <Button
                  variant="outline"
                  className="flex-1 h-14 rounded-2xl
                     border-2 border-blue-100
                     text-blue-600 font-bold
                     hover:bg-blue-50"
                  onClick={() => window.open(selectedCombo.affiliate_url, '_blank')}
                >
                  BUY NOW
                </Button>

                <Button
                  className={cn(
                    'flex-1 h-14 rounded-2xl font-bold text-white',
                    appliedComboId === selectedCombo.id
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  )}
                  onClick={() => handleApplyClick(selectedCombo.id)}
                >
                  {appliedComboId === selectedCombo.id ? 'SELECTED' : 'APPLY'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
