import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle2, Sparkles, Loader2, AlertTriangle } from 'lucide-react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/shared/components/ui/dialog'
import { getRoutinePackage, createDailyRoutine } from '../services/detail-packages.api'
import { createPaymentUrl, checkEligibility } from '../../payment/services/payment.api'
import type { RoutinePackage } from '../types/detail-routine'
import type { RootState } from '@/shared/store'
import { toast } from '@/shared/hooks/use-toast'
import type { ApiErrorResponse } from '@/shared/types/api'
import { ComboList } from '../components/ComboList'

import detailPackage1 from '@/shared/assets/images/detail_package1.png'
import detailPackage2 from '@/shared/assets/images/detail_package2.png'

const DetailedRoutine = () => {
  const { id: routinePackageId } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [packageData, setPackageData] = useState<RoutinePackage | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [selectedComboId, setSelectedComboId] = useState<string | null>(null)

  // State cho Pop-up xác nhận
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [activePackageName, setActivePackageName] = useState('')

  const analysisResult = useSelector((state: RootState) => state.analysis.currentResult)
  const skinAnalysisId = analysisResult?.analysisId

  useEffect(() => {
    const fetchPackage = async () => {
      if (!routinePackageId) return
      setIsLoading(true)
      try {
        const data = await getRoutinePackage(routinePackageId)
        setPackageData(data)
      } catch (error) {
        console.error('Failed to fetch package:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPackage()
  }, [routinePackageId])

  const executePayment = async (force: boolean = false) => {
    if (!routinePackageId || !selectedComboId) return

    setIsProcessing(true)
    try {
      const paymentRes = await createPaymentUrl({
        packageId: routinePackageId,
        comboId: selectedComboId,
        forceCreate: force
      })

      localStorage.setItem(
        'pending_payment_info',
        JSON.stringify({
          packageId: routinePackageId,
          comboId: selectedComboId
        })
      )

      if (paymentRes.url) {
        window.location.href = paymentRes.url
      } else {
        throw new Error('Không nhận được link thanh toán từ hệ thống.')
      }
    } catch (err) {
      handleError(err)
    } finally {
      setIsProcessing(false)
      setShowConfirmDialog(false)
    }
  }

  const handleError = (err: unknown) => {
    let errorMessage = 'Đã xảy ra lỗi trong quá trình xử lý.'
    if (axios.isAxiosError(err)) {
      const apiErr = err.response?.data as ApiErrorResponse
      errorMessage = Array.isArray(apiErr?.message)
        ? apiErr.message[0]
        : apiErr?.message || errorMessage
    }
    toast({ title: 'Lỗi hệ thống', description: errorMessage, variant: 'destructive' })
  }

  const handleCreateRoutineFlow = useCallback(async () => {
    if (!selectedComboId || !routinePackageId || !skinAnalysisId) {
      toast({ title: 'Thông tin chưa đầy đủ', variant: 'destructive' })
      return
    }

    setIsProcessing(true)
    try {
      const eligibility = await checkEligibility(routinePackageId)

      // 1. Nếu là Free Trial: Gọi tạo routine ngay
      if (eligibility.isFreeTrial) {
        await createDailyRoutine({
          skinAnalysisId,
          routinePackageId,
          comboId: selectedComboId,
          isTrial: true
        })
        toast({
          title: 'Thành công!',
          description: 'Gói dùng thử đã sẵn sàng.',
          variant: 'success'
        })
        navigate('/daily-routine')
        return
      }

      // 2. Nếu cần thanh toán
      if (eligibility.requiresPayment) {
        if (eligibility.hasActivePackage) {
          setActivePackageName(eligibility.currentPackage?.name || 'Gói hiện tại')
          setShowConfirmDialog(true)
          setIsProcessing(false)
          return
        }

        // Gọi hàm thực hiện thanh toán (trường hợp không có gói cũ)
        await executePayment(false)
      }
    } catch (err) {
      handleError(err)
      setIsProcessing(false)
    }
  }, [selectedComboId, routinePackageId, skinAnalysisId, navigate])

  // const executePayment = async (force: boolean = false) => {
  //   if (!routinePackageId || !selectedComboId) return
  //   setIsProcessing(true)

  //   try {
  //     const paymentRes = await createPaymentUrl({
  //       packageId: routinePackageId,
  //       comboId: selectedComboId,
  //       forceCreate: force
  //     })

  //     // Lưu thông tin gói đang chọn để sau khi thanh toán xong quay về gọi AI tạo Routine
  //     localStorage.setItem(
  //       'pending_payment_info',
  //       JSON.stringify({
  //         packageId: routinePackageId,
  //         comboId: selectedComboId
  //       })
  //     )

  //     if (paymentRes.url) {
  //       // Chuyển hướng sang trang Sandbox/Thanh toán của VNPay
  //       window.location.href = paymentRes.url
  //     }
  //   } catch (err) {
  //     handleError(err)
  //   } finally {
  //     setIsProcessing(false)
  //   }
  // }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Pop-up Xác nhận thay đổi gói */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[450px] rounded-[2rem] p-8 border-none shadow-2xl">
          <DialogHeader className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              Thay đổi lộ trình?
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium text-base">
              Bạn đang sử dụng <span className="text-blue-500 font-bold">{activePackageName}</span>.
              Việc thanh toán gói mới sẽ thay thế lộ trình hiện tại của bạn.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              className="flex-1 rounded-xl h-12 font-bold border-slate-200 text-slate-600"
            >
              Hủy bỏ
            </Button>
            <Button
              onClick={() => executePayment(true)}
              className="flex-1 rounded-xl h-12 font-bold bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-200"
            >
              Tiếp tục thanh toán
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif italic text-gray-700 mb-2">
            {packageData?.duration_days} Day Plan
          </h1>
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase">
            {packageData?.package_name}
          </h2>
          <p className="mt-4 text-2xl font-bold text-blue-600">
            {Number(packageData?.price).toLocaleString('vi-VN')} VND
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-500" />
              <h3 className="text-2xl font-bold text-blue-500">Ưu điểm nổi bật</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{packageData?.description}</p>
            <img
              src={detailPackage2}
              alt="SkinCare"
              className="rounded-2xl shadow-lg max-w-sm object-cover"
            />
          </div>

          <div className="space-y-8">
            <img
              src={detailPackage1}
              alt="Products"
              className="rounded-3xl shadow-xl aspect-video w-full object-cover"
            />
            <div className="grid gap-4">
              {packageData?.highlights.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1" />
                  <p className="text-gray-800 font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Combo Selection */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Bộ sản phẩm đề xuất
            </h2>
            <p className="text-gray-500">Cá nhân hóa theo kết quả phân tích AI của bạn.</p>
          </div>
          <ComboList onComboSelect={setSelectedComboId} />
          <div className="mt-12 text-center">
            <Button
              onClick={handleCreateRoutineFlow}
              disabled={isProcessing}
              className="px-12 py-7 bg-blue-500 hover:bg-blue-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-200 transition-transform hover:scale-105"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'CREATE MY ROUTINE'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DetailedRoutine
