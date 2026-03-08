import apiClient from '@/shared/lib/api-client'
import type { Combo, CombosResponse } from '../types/combo'

export const getRecommendedCombos = async (comboIds: string[]): Promise<Combo[]> => {
  const res = await apiClient.post<CombosResponse>('/combos/recommendations', { comboIds })
  if (res.data?.success && Array.isArray(res.data.data)) {
    return res.data.data
  }
  return []
}
