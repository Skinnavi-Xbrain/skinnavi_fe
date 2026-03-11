import apiClient from '@/shared/lib/api-client'

export interface ActivePackageInfo {
  name: string
  endDate: string
}

export interface EligibilityResponse {
  requiresPayment: boolean
  isFreeTrial: boolean
  hasActivePackage: boolean
  currentPackage: ActivePackageInfo | null
}

export interface CreatePaymentResponse {
  url?: string
  message?: string
  isFreeTrial?: boolean
  hasActivePackage?: boolean
  currentPackage?: ActivePackageInfo
}

// Kiểu dữ liệu trả về từ API vnpay-ipn
export interface VnpayVerifyResponse {
  RspCode: string
  Message: string
}

export const checkEligibility = async (packageId: string): Promise<EligibilityResponse> => {
  const res = await apiClient.get<EligibilityResponse>(`/payments/check-eligibility`, {
    params: { packageId }
  })
  return res.data
}

export const createPaymentUrl = async (payload: {
  packageId: string
  comboId: string
  forceCreate?: boolean
}): Promise<CreatePaymentResponse> => {
  const res = await apiClient.post<CreatePaymentResponse>('/payments/create-url', payload)
  return res.data
}

// API thực hiện gọi verify với các tham số từ URL mà VNPay trả về cho FE
export const verifyPayment = async (searchString: string): Promise<VnpayVerifyResponse> => {
  const res = await apiClient.get<VnpayVerifyResponse>(`/payments/vnpay-ipn?${searchString}`)
  return res.data
}
