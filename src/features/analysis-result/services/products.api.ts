import type { AffiliateProduct } from '@/features/detail-packages/types/combo'
import apiClient from '@/shared/lib/api-client'

export const getProductsFromCombos = async (comboIds: string[]): Promise<AffiliateProduct[]> => {
  const res = await apiClient.post<{ data: AffiliateProduct[] }>('/combos/products', { comboIds })
  return res.data?.data || []
}
