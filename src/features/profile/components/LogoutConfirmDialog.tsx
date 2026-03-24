import { LogOut, Loader2 } from 'lucide-react'
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

interface LogoutConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  isLoading: boolean
}

export const LogoutConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  isLoading
}: LogoutConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="w-[92%] max-w-[420px] rounded-[1.5rem] p-6 bg-white border-0 shadow-xl">
        <AlertDialogHeader className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50">
            <LogOut className="w-8 h-8 text-red-500" />
          </div>

          <AlertDialogTitle className="text-xl font-bold text-gray-800">Sign Out?</AlertDialogTitle>

          <AlertDialogDescription className="text-sm leading-relaxed text-gray-500">
            Are you sure you want to log out? You will need to sign in again to access your routines
            and tracking data.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              disabled={isLoading}
              className="w-full sm:flex-1 border-gray-200 text-gray-500 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full sm:flex-1 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? 'Signing out...' : 'Sign Out'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
