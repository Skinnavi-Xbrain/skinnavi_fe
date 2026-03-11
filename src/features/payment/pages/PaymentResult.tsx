import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { verifyPayment } from '../services/payment.api'
import { createDailyRoutine } from '@/features/detail-packages/services/detail-packages.api'
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
    const processFlow = async () => {
      if (isProcessing.current) return
      isProcessing.current = true

      const responseCode = searchParams.get('vnp_ResponseCode')

      if (responseCode !== '00') {
        setStatus('FAILED')
        return
      }

      try {
        const verifyRes = await verifyPayment(searchParams.toString())

        if (verifyRes.RspCode === '00') {
          setStatus('SUCCESS')
          const pendingPayment = JSON.parse(localStorage.getItem('pending_payment_info') || '{}')

          if (skinAnalysisId && pendingPayment.packageId && pendingPayment.comboId) {
            try {
              await createDailyRoutine({
                skinAnalysisId,
                routinePackageId: pendingPayment.packageId,
                comboId: pendingPayment.comboId
              })
              localStorage.removeItem('pending_payment_info')
            } catch (err) {
              console.error('Routine creation failed:', err)
            }
          }

          setTimeout(() => navigate('/daily-routine'), 4500)
        } else {
          setStatus('FAILED')
        }
      } catch (error) {
        console.error('Payment verification error:', error)
        setStatus('FAILED')
      }
    }

    processFlow()
  }, [searchParams, navigate, skinAnalysisId])

  return (
    <>
      {status === 'VERIFYING' && (
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-[#67AEFF] mx-auto" />
          <p className="text-slate-600 font-bold tracking-widest uppercase text-sm">
            Verifying Transaction...
          </p>
        </div>
      )}

      {status === 'SUCCESS' && <SuccessView />}

      {status === 'FAILED' && <FailureView onRetry={() => navigate('/home')} />}

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(800px) rotate(360deg); opacity: 0; }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-fall {
          animation: fall 3s linear infinite;
        }
        .animate-progress-fast {
          animation: progress 4.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </>
  )
}

export default PaymentResult
