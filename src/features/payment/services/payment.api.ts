import apiClient from '@/shared/lib/api-client'
import type {
  EligibilityResponse,
  CreatePaymentResponse,
  VnpayVerifyResponse,
  ValidateSubscriptionResponse
} from '../types'

export const checkEligibility = async (packageId: string): Promise<EligibilityResponse> => {
  const res = await apiClient.get<EligibilityResponse>(`/payments/eligibility`, {
    params: { packageId }
  })
  return res.data
}

export const createFreeTrial = async (payload: {
  packageId: string
  comboId: string
}): Promise<CreatePaymentResponse> => {
  const res = await apiClient.post<CreatePaymentResponse>('/payments/free-trial', payload)
  return res.data
}

export const createPaymentUrl = async (payload: {
  packageId: string
  comboId: string
}): Promise<CreatePaymentResponse> => {
  const res = await apiClient.post<CreatePaymentResponse>('/payments/create-url', payload)
  return res.data
}

export const verifyPayment = async (searchString: string): Promise<VnpayVerifyResponse> => {
  const res = await apiClient.get<VnpayVerifyResponse>(`/payments/vnpay-ipn?${searchString}`)
  return res.data
}

export const validateSubscription = async (): Promise<ValidateSubscriptionResponse> => {
  const res = await apiClient.get<ValidateSubscriptionResponse>('/package-subscriptions/validate')
  return res.data
}
