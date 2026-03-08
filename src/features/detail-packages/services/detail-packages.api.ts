import apiClient from '@/shared/lib/api-client'
import type { RoutinePackage } from '../types/detail-routine'

interface PackagesResponse {
  success: boolean
  data: RoutinePackage[]
}

interface SinglePackageResponse {
  success: boolean
  data: RoutinePackage
}

export const getRoutinePackage = async (id: string): Promise<RoutinePackage | null> => {
  const res = await apiClient.get<SinglePackageResponse>(`/routine-packages/package/${id}`)
  if (res.data?.success && res.data.data) {
    return res.data.data
  }
  return null
}

export const getPackages = async (): Promise<RoutinePackage[]> => {
  const res = await apiClient.get<PackagesResponse>('/routine-packages/all')
  if (res.data?.success && Array.isArray(res.data.data)) {
    return res.data.data
  }
  return []
}

export interface CreateRoutinePayload {
  skinAnalysisId: string
  routinePackageId: string
  comboId: string
}

export const createDailyRoutine = async (payload: CreateRoutinePayload) => {
  const res = await apiClient.post('/routines', payload)
  return res.data
}
