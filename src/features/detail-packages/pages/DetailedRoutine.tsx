import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Button } from '@/shared/components/ui/button'
import { getRoutinePackage, createDailyRoutine } from '../services/detail-packages.api'
import {
  createPaymentUrl,
  checkEligibility,
  createFreeTrial
} from '../../payment/services/payment.api'

import type { RoutinePackage } from '../types/detail-routine'
import type { RootState } from '@/shared/store'
import { toast } from '@/shared/hooks/use-toast'
import type { ApiErrorResponse } from '@/shared/types/api'
import ConfirmReplaceDialog from '../components/ConfirmReplaceDialog'
import PackageHero from '../components/PackageHero'
import PackageDetails from '../components/PackageDetails'
import ComboSection from '../components/ComboSection'

const DetailedRoutine = () => {
  const { id: routinePackageId } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [packageData, setPackageData] = useState<RoutinePackage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [isCreating, setIsCreating] = useState(false)
  const [selectedComboId, setSelectedComboId] = useState<string | null>(null)

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [activePackageName, setActivePackageName] = useState('')

  const analysisResult = useSelector((state: RootState) => state.analysis.currentResult)
  const skinAnalysisId = analysisResult?.analysisId

  useEffect(() => {
    const fetchPackage = async () => {
      setIsLoading(true)
      try {
        const matchedPackage = await getRoutinePackage(routinePackageId!)
        setPackageData(matchedPackage)
      } catch (error) {
        console.error('Error fetching package data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (routinePackageId) fetchPackage()
  }, [routinePackageId])

  const handleError = (err: unknown) => {
    let message = 'An error occurred.'

    if (axios.isAxiosError(err)) {
      const serverError = err.response?.data as ApiErrorResponse
      message = Array.isArray(serverError?.message)
        ? serverError.message[0]
        : serverError?.message || message
    }

    toast({
      title: 'Error',
      description: message,
      variant: 'destructive'
    })
  }

  const executePayment = async () => {
    if (!routinePackageId || !selectedComboId) return

    try {
      const res = await createPaymentUrl({
        packageId: routinePackageId,
        comboId: selectedComboId
      })

      localStorage.setItem(
        'pending_payment_info',
        JSON.stringify({
          packageId: routinePackageId,
          comboId: selectedComboId
        })
      )

      if (res.url) window.location.href = res.url
    } catch (err) {
      handleError(err)
    } finally {
      setShowConfirmDialog(false)
      setIsCreating(false)
    }
  }

  const handleGetStarted = useCallback(async () => {
    if (!selectedComboId) {
      toast({
        title: 'No combo selected',
        description: 'Please select a combo from the list before getting started.',
        variant: 'destructive'
      })
      return
    }

    if (!skinAnalysisId || !routinePackageId) {
      toast({
        title: 'Incomplete information',
        description: 'Skin analysis ID or routine package ID is missing.',
        variant: 'destructive'
      })
      return
    }

    setIsCreating(true)

    try {
      const eligibility = await checkEligibility(routinePackageId)

      if (eligibility.isFreeTrial || eligibility.requiresPayment === false) {
        await createFreeTrial({
          packageId: routinePackageId,
          comboId: selectedComboId
        })

        await createDailyRoutine({
          skinAnalysisId,
          routinePackageId,
          comboId: selectedComboId
        })

        toast({
          title: 'Routine created',
          description: 'Your routine has been created.',
          variant: 'success'
        })

        navigate('/daily-routine')
        return
      }

      if (eligibility.requiresPayment) {
        if (eligibility.hasActivePackage) {
          setActivePackageName(eligibility.currentPackage?.name || '')
          setShowConfirmDialog(true)
          setIsCreating(false)
          return
        }

        await executePayment()
      }
    } catch (err) {
      handleError(err)
      setIsCreating(false)
    }
  }, [selectedComboId, routinePackageId, skinAnalysisId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Package not found.</h2>
        <Button onClick={() => navigate('/home')} className="mt-4">
          Back to Home
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <ConfirmReplaceDialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={executePayment}
        activePackageName={activePackageName}
      />

      <PackageHero packageData={packageData} />

      <PackageDetails packageData={packageData} />

      <ComboSection
        isCreating={isCreating}
        onCreate={handleGetStarted}
        setSelectedComboId={setSelectedComboId}
      />
    </div>
  )
}

export default DetailedRoutine
