import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { verifyPayment } from '../services/payment.api'
import { createDailyRoutine } from '@/features/detail-packages/services/detail-packages.api'
import type { VnpayVerifyResponse } from '../types'
import type { RootState } from '@/shared/store'
import { SuccessView, FailureView } from '../components/StatusViews'

const PaymentResult = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'VERIFYING' | 'SUCCESS' | 'FAILED'>('VERIFYING')
  const isProcessing = useRef(false)

  const analysisResult = useSelector((state: RootState) => state.analysis.currentResult)
  const skinAnalysisId = analysisResult?.analysisId

  useEffect(() => {
    const processVerification = async (): Promise<void> => {
      if (isProcessing.current) return
      isProcessing.current = true

      const vnpResponseCode = searchParams.get('vnp_ResponseCode')

      if (vnpResponseCode !== '00') {
        setStatus('FAILED')
        return
      }

      try {
        const verifyRes: VnpayVerifyResponse = await verifyPayment(searchParams.toString())

        if (verifyRes.RspCode === '00') {
          setStatus('SUCCESS')

          const pendingData = localStorage.getItem('pending_payment_info')
          const pending = pendingData ? JSON.parse(pendingData) : null

          if (skinAnalysisId && pending?.packageId) {
            await createDailyRoutine({
              skinAnalysisId,
              routinePackageId: pending.packageId,
              comboId: pending.comboId
            })
            localStorage.removeItem('pending_payment_info')
          }

          setTimeout(() => navigate('/daily-routine'), 4500)
        } else {
          setStatus('FAILED')
        }
      } catch (error) {
        console.error('Verification failed:', error)
        setStatus('FAILED')
      }
    }

    processVerification()
  }, [searchParams, navigate, skinAnalysisId])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {status === 'VERIFYING' && (
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-[#67AEFF] mx-auto" />
          <p className="text-slate-600 font-bold tracking-widest uppercase text-sm">
            Verifying your payment...
          </p>
        </div>
      )}

      {status === 'SUCCESS' && <SuccessView />}

      {status === 'FAILED' && <FailureView onRetry={() => navigate('/analysis-result')} />}
    </div>
  )
}

export default PaymentResult
