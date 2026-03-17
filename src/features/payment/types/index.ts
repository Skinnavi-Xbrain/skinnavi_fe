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

export interface VnpayVerifyResponse {
  RspCode: string
  Message: string
}

export interface PaymentState {
  eligibility: Record<string, EligibilityResponse>
  loading: boolean
}
