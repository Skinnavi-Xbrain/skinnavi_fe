import apiClient from '@/shared/lib/api-client'

export const createPaymentUrl = async (payload: {
  forceCreate?: boolean
  packageId: string
  comboId: string
}): Promise<string> => {
  // Thay đổi: Trả về res.data thay vì res.data.url
  const res = await apiClient.post('/payments/create-url', payload)
  return res.data
}

export const verifyPayment = async (searchString: string) => {
  const res = await apiClient.get(`/payments/vnpay-ipn?${searchString}`)
  return res.data
}
