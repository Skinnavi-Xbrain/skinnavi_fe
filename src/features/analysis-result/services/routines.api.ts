import apiClient from '@/shared/lib/api-client'
import type { RoutinePackage } from '../types/routine'

interface PackagesResponse {
  success: boolean
  data: RoutinePackage[]
}

export const getRoutinePackages = async (): Promise<RoutinePackage[]> => {
  const res = await apiClient.get<PackagesResponse>('/routines/packages')
  if (res.data?.success && Array.isArray(res.data.data)) return res.data.data
  return []
}
