import apiClient from '@/shared/lib/api-client'
import type { RoutineData, RoutineDetailResponse } from '../types'

export const getRoutineStepDetail = async (id: string): Promise<RoutineData | null> => {
  try {
    const res = await apiClient.get<RoutineDetailResponse>(`/routines/steps/${id}`)
    if (res.data?.success && res.data.data) {
      return res.data.data
    }
  } catch (error) {
    console.error('fetch routine step detail failed', error)
  }
  return null
}
