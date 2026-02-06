import apiClient from '@/shared/lib/api-client'
import type { Routine, RoutineResponse } from '../types'

export const getUserRoutines = async (): Promise<Routine[]> => {
  const res = await apiClient.get<RoutineResponse>('/routines')

  if (res.data?.success && Array.isArray(res.data.data)) {
    return res.data.data
  }

  return []
}
