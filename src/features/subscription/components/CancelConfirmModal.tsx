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

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  isLoading: boolean
}

export const CancelConfirmModal = ({ open, onClose, onConfirm, isLoading }: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="w-[92%] max-w-[400px] rounded-3xl p-6 bg-white border-0 shadow-2xl">
        <AlertDialogHeader className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <AlertDialogTitle className="text-xl font-bold text-slate-900">
            Cancel Plan?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-slate-500">
            Are you sure you want to cancel your premium plan? You will lose access to premium
            features at the end of your billing cycle.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
          <AlertDialogCancel asChild>
            <Button variant="outline" className="w-full sm:flex-1 rounded-xl">
              Keep Plan
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full sm:flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Yes, Cancel'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
