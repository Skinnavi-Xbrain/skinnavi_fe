import apiClient from '@/shared/lib/api-client'
import type { Product } from '../types/product'

interface AffiliateResponse {
  success: boolean
  data: {
    items: Product[]
  }
}

export const getAffiliateProducts = async (): Promise<Product[]> => {
  const res = await apiClient.get<AffiliateResponse>('/products/affiliate')
  if (res.data?.success && res.data?.data?.items) {
    return res.data.data.items
  }
  return []
}
