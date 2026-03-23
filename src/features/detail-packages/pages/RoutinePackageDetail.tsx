import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader2, Settings2, AlertTriangle } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Button } from '@/shared/components/ui/button'
import { getRoutinePackage, createDailyRoutine } from '../services/detail-packages.api'
import {
  createPaymentUrl,
  checkEligibility,
  createFreeTrial,
  updateSubscriptionCombo
} from '../../payment/services/payment.api'
import { getLatestSkinAnalysis } from '@/features/home/services/analysis.api'
import { setAnalysisResult } from '@/features/home/store/analysis.slice'

import type { RoutinePackage } from '../types/detail-routine'
import type { RootState } from '@/shared/store'
import { toast } from '@/shared/hooks/use-toast'
import type { ApiErrorResponse } from '@/shared/types/api'
import ConfirmReplaceDialog from '../components/ConfirmReplaceDialog'
import PackageHero from '../components/PackageHero'
import PackageDetails from '../components/PackageDetails'
import ComboSection from '../components/ComboSection'

const RoutinePackageDetail = () => {
  const { id: routinePackageId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [packageData, setPackageData] = useState<RoutinePackage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [isCreating, setIsCreating] = useState(false)
  const [selectedComboId, setSelectedComboId] = useState<string | null>(null)

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showSwitchComboDialog, setShowSwitchComboDialog] = useState(false)
  const [activePackageName, setActivePackageName] = useState('')

  const analysisResult = useSelector((state: RootState) => state.analysis.currentResult)
  const [skinAnalysisId, setSkinAnalysisId] = useState<string | null>(
    analysisResult?.analysisId || null
  )

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

  useEffect(() => {
    const checkAndRestoreAnalysis = async () => {
      if (skinAnalysisId) return

      try {
        const response = await getLatestSkinAnalysis()
        if (response.success && response.data?.analysisId) {
          const latestId = response.data.analysisId
          setSkinAnalysisId(latestId)
          dispatch(setAnalysisResult(response.data))
        }
      } catch (error) {
        console.error('Error fetching latest analysis for recovery:', error)
      }
    }

    checkAndRestoreAnalysis()
  }, [skinAnalysisId, dispatch])

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

  const executeSwitchCombo = async () => {
    if (!selectedComboId || !skinAnalysisId || !routinePackageId) return

    try {
      setIsCreating(true)
      await updateSubscriptionCombo(selectedComboId)

      await createDailyRoutine({
        skinAnalysisId,
        routinePackageId,
        comboId: selectedComboId
      })

      toast({
        title: 'Combo Updated',
        description: 'Your combo has been updated and a new routine has been created.',
        variant: 'success'
      })

      navigate('/daily-routine')
    } catch (err) {
      handleError(err)
    } finally {
      setShowSwitchComboDialog(false)
      setIsCreating(false)
    }
  }

  const handleGetStarted = useCallback(async () => {
    if (!selectedComboId) {
      toast({
        title: 'No Combo Selected',
        description: 'Please select a combo to continue.',
        variant: 'destructive'
      })
      return
    }

    setIsCreating(true)

    try {
      if (!routinePackageId || !selectedComboId || !skinAnalysisId) {
        toast({
          title: 'Missing Data',
          description: 'Please complete skin analysis before continuing.',
          variant: 'destructive'
        })
        return
      }

      const eligibility = await checkEligibility(routinePackageId, selectedComboId, skinAnalysisId)
      switch (eligibility.action) {
        case 'LIMIT_REACHED':
          toast({
            title: 'Routine Limit Reached',
            description: `Your ${eligibility.currentPackage?.name} package has reached the routine creation limit.`,
            variant: 'destructive'
          })
          break

        case 'REUSE':
          toast({
            title: 'Welcome Back',
            description: 'You are already using this combo.',
            variant: 'success'
          })
          navigate('/daily-routine')
          break

        case 'CREATE_NEW':
          if (eligibility.isFreeTrial || !eligibility.requiresPayment) {
            await createFreeTrial({ packageId: routinePackageId!, comboId: selectedComboId })
          } else {
            await executePayment()
            return
          }

          await createDailyRoutine({
            skinAnalysisId: skinAnalysisId!,
            routinePackageId: routinePackageId!,
            comboId: selectedComboId
          })

          toast({
            title: 'Routine Created',
            description: 'Your daily routine has been created successfully.',
            variant: 'success'
          })
          navigate('/daily-routine')
          break

        case 'CONFIRM_CHANGE_COMBO':
          setActivePackageName(eligibility.currentPackage?.name || '')
          setShowSwitchComboDialog(true)
          break

        case 'REQUIRE_PAYMENT':
          if (eligibility.hasActivePackage) {
            setActivePackageName(eligibility.currentPackage?.name || '')
            setShowConfirmDialog(true)
          } else {
            await executePayment()
          }
          break

        default:
          toast({
            title: 'Error',
            description: 'This action is not supported.',
            variant: 'destructive'
          })
      }
    } catch (err) {
      handleError(err)
    } finally {
      setIsCreating(false)
    }
  }, [selectedComboId, routinePackageId, skinAnalysisId, navigate])

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
        title="Replace Current Plan?"
        confirmText="UPGRADE NOW"
        icon={AlertTriangle}
        description={
          <>
            You are currently using{' '}
            <span className="font-bold text-[#67aeff]">{activePackageName}</span>. Purchasing this
            new plan will replace your active routine.
          </>
        }
      />

      <ConfirmReplaceDialog
        open={showSwitchComboDialog}
        onClose={() => setShowSwitchComboDialog(false)}
        onConfirm={executeSwitchCombo}
        title="Switch Your Combo?"
        confirmText="SWITCH NOW"
        icon={Settings2}
        description={
          <>
            Do you want to switch to this new combo for your active
            <span className="font-bold text-[#67aeff]"> {activePackageName}</span>? Your routine
            steps will be updated immediately.
          </>
        }
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

export default RoutinePackageDetail
