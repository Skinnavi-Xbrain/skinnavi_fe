import { useState } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/shared/components/ui/alert-dialog'

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  activePackageName: string
}

const ConfirmReplaceDialog = ({ open, onClose, onConfirm, activePackageName }: Props) => {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    try {
      setLoading(true)
      await onConfirm()
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent
        className="
        w-[92%] max-w-[420px] 
        sm:max-w-[520px]
        rounded-2xl 
        p-5 sm:p-8
        bg-white border-0 shadow-xl
      "
      >
        <AlertDialogHeader className="flex flex-col items-center text-center gap-3 sm:gap-4">
          <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#fef2f2]">
            <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-[#67aeff]" />
          </div>

          <AlertDialogTitle className="text-lg sm:text-2xl font-semibold text-gray-800">
            Replace Current Routine?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm sm:text-base leading-relaxed text-gray-600 max-w-md">
            You are currently using
            <span className="font-semibold text-[#67aeff]"> {activePackageName}</span>.
            <br className="hidden sm:block" />
            Purchasing this package will replace your current routine plan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter
          className="
          flex flex-col sm:flex-row 
          gap-3 sm:gap-4 
          mt-6
        "
        >
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              disabled={loading}
              className="
              w-full 
              sm:flex-1
              border-[#67aeff] text-[#67aeff] hover:bg-[#F2F8FF]
            "
            >
              Cancel
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              onClick={handleConfirm}
              disabled={loading}
              className="
              w-full 
              sm:flex-1
              bg-[#67aeff] hover:bg-[#4f9df5] text-white
              flex items-center justify-center gap-2
            "
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Processing...' : 'Continue'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmReplaceDialog
