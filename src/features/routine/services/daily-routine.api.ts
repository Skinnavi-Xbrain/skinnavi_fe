import apiClient from '@/shared/lib/api-client'
import type { RoutineResponse } from '../types'

export const getUserRoutines = async (): Promise<RoutineResponse['data']> => {
  const res = await apiClient.get<RoutineResponse>('/routines')

  if (res.data?.success && res.data.data) {
    return res.data.data
  }

  return {}
}
