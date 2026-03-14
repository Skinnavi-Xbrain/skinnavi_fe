import { Loader2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { ComboList } from './ComboList'

type Props = {
  isCreating: boolean
  onCreate: () => void
  setSelectedComboId: (id: string | null) => void
}

const ComboSection = ({ isCreating, onCreate, setSelectedComboId }: Props) => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 animate-fade-in-up">
          Recommended Combos for You
        </h2>

        <ComboList onComboSelect={setSelectedComboId} />

        <div className="text-center my-6 animate-fade-in-up animation-delay-400">
          <Button
            disabled={isCreating}
            onClick={onCreate}
            className="px-12 py-6 bg-blue-400 hover:bg-blue-500 font-bold text-white text-md rounded-xl transition-all hover:scale-105 min-w-[200px]"
          >
            {isCreating ? <Loader2 className="animate-spin" /> : 'CREATE MY ROUTINE'}
          </Button>
        </div>

        <p className="text-center text-gray-500 mb-12 animate-fade-in-up">
          Specially selected based on your recent AI Skin Analysis.
        </p>
      </div>
    </section>
  )
}

export default ComboSection
