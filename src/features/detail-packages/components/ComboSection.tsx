import { useEffect, useState } from 'react'
import { Loader2, Check } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { toast } from '@/shared/hooks/use-toast'
import { getRecommendedCombos } from '../services/combos.api'
import { getLatestSkinAnalysis } from '@/features/home/services/analysis.api' //
import type { Combo } from '../types/combo'
import { ComboDetailModal } from './ComboDetailModal'

interface ComboWithProducts extends Combo {
  products?: { id: string; name: string; size?: string; image?: string }[]
}

type Props = {
  isCreating: boolean
  onCreate: () => void
  setSelectedComboId: (id: string | null) => void
}

const ComboSection = ({ isCreating, onCreate, setSelectedComboId }: Props) => {
  const [combos, setCombos] = useState<ComboWithProducts[]>([])
  const [isLoadingCombos, setIsLoadingCombos] = useState(true)
  const [selectedCombo, setSelectedCombo] = useState<ComboWithProducts | null>(null)
  const [appliedComboId, setAppliedComboId] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalysisAndCombos = async () => {
      setIsLoadingCombos(true)
      try {
        const analysisRes = await getLatestSkinAnalysis()

        if (analysisRes.success && analysisRes.data?.result?.recommendedCombos) {
          const comboIds = analysisRes.data.result.recommendedCombos

          if (comboIds.length > 0) {
            const combosData = await getRecommendedCombos(comboIds)
            setCombos(combosData)
          }
        }
      } catch (error) {
        console.error('Error fetching analysis or combos:', error)
        toast({
          title: 'Error',
          description: 'Failed to load recommended combos. Please try again.',
          variant: 'destructive'
        })
      } finally {
        setIsLoadingCombos(false)
      }
    }

    fetchAnalysisAndCombos()
  }, [])

  const handleApplyClick = (comboId: string) => {
    setAppliedComboId(comboId)
    setSelectedComboId(comboId)
    setSelectedCombo(null)

    toast({
      title: 'Combo selected',
      description:
        'You have selected a combo. You can now proceed to get started with your routine.',
      variant: 'success'
    })
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-18 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 md:mb-8 mb-5 px-4 animate-fade-in-up">
          Recommended Combos for You
        </h2>

        {isLoadingCombos ? (
          <div className="flex justify-center p-10">
            <Loader2 className="animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="flex overflow-x-auto pb-10 pt-2 px-4 md:px-0 snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {combos.map((combo, index) => (
              <div
                key={combo.id}
                onClick={() => setSelectedCombo(combo)}
                style={{ animationDelay: `${index * 150}ms` }}
                className={`
                  flex-shrink-0 w-[75vw] md:w-full snap-center 
                  group relative cursor-pointer overflow-hidden rounded-[2.5rem] border bg-white p-3 shadow-sm
                  transition-all duration-500 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(103,174,255,0.15)]
                  animate-fade-in-up 
                  ${appliedComboId === combo.id ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-100'}
                `}
              >
                {appliedComboId === combo.id && (
                  <div className="absolute top-4 right-4 z-10 bg-blue-500 text-white p-1.5 rounded-full shadow-lg animate-scale-up">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                )}

                <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#F8FBFF] to-[#F0F7FF] flex items-center justify-center transition-colors duration-500 group-hover:from-blue-100 group-hover:to-white">
                  <img
                    src={combo.image_url}
                    alt={combo.combo_name}
                    className="h-4/5 w-4/5 object-contain drop-shadow-xl transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3"
                  />
                </div>

                <div className="p-1 md:p-3 text-center">
                  <h3 className="mb-3 min-h-[2.5rem] line-clamp-2 text-base font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                    {combo.combo_name}
                  </h3>
                  <p className="text-xl font-black tracking-tight text-[#67AEFF]">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      Number(combo.display_price)
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center md:mt-3 my-0 md:mb-1 animate-fade-in-up animation-delay-400">
          <Button
            disabled={isCreating}
            onClick={onCreate}
            className="w-[calc(100%-2rem)] md:w-auto px-12 py-7 bg-blue-400 hover:bg-blue-500 font-bold text-white text-md rounded-2xl transition-all hover:scale-105 shadow-xl shadow-blue-100"
          >
            {isCreating ? 'CREATING...' : 'CREATE MY ROUTINE'}
            {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
          </Button>
        </div>
      </div>

      {selectedCombo && (
        <ComboDetailModal
          combo={selectedCombo}
          appliedComboId={appliedComboId}
          onClose={() => setSelectedCombo(null)}
          onApply={handleApplyClick}
        />
      )}
    </section>
  )
}

export default ComboSection
