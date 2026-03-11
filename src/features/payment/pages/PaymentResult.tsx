import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { verifyPayment, type VnpayVerifyResponse } from '../services/payment.api'
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
    const processVerification = async (): Promise<void> => {
      if (isProcessing.current) return
      isProcessing.current = true

      // Lấy mã phản hồi từ VNPay (00 là thành công ở bước thanh toán)
      const vnpResponseCode = searchParams.get('vnp_ResponseCode')

      if (vnpResponseCode !== '00') {
        setStatus('FAILED')
        return
      }

      try {
        // Gửi toàn bộ query string về Backend để kiểm tra chữ ký và cập nhật DB
        const verifyRes: VnpayVerifyResponse = await verifyPayment(searchParams.toString())

        if (verifyRes.RspCode === '00') {
          setStatus('SUCCESS')

          // Lấy thông tin gói đã lưu trước khi đi thanh toán
          const pendingData = localStorage.getItem('pending_payment_info')
          const pending = pendingData ? JSON.parse(pendingData) : null

          // Nếu có đủ thông tin, gọi AI tạo Routine dựa trên combo đã mua
          if (skinAnalysisId && pending?.packageId) {
            await createDailyRoutine({
              skinAnalysisId,
              routinePackageId: pending.packageId,
              comboId: pending.comboId,
              isTrial: false // Gói trả phí thực tế
            })
            localStorage.removeItem('pending_payment_info')
          }

          // Chuyển hướng sau khi hiện thông báo thành công
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
            Đang xác thực giao dịch...
          </p>
        </div>
      )}

      {status === 'SUCCESS' && <SuccessView />}

      {status === 'FAILED' && <FailureView onRetry={() => navigate('/home')} />}
    </div>
  )
}

export default PaymentResult
