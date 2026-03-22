export interface ActivePackageInfo {
  name: string
  endDate: string
}

export interface EligibilityResponse {
  requiresPayment: boolean
  isFreeTrial: boolean
  hasActivePackage: boolean
  action: 'LIMIT_REACHED' | 'REUSE' | 'CREATE_NEW' | 'CONFIRM_CHANGE_COMBO' | 'REQUIRE_PAYMENT'
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

export interface ValidateSubscriptionResponse {
  isValid: boolean
  message: string
  data?: {
    subscriptionId: string
    packageName: string
    endDate: string
  } | null
}
