import apiClient from '@/shared/lib/api-client'
import type { TrackingOverview } from '../types'

export interface TrackingQueryParams {
  startDate?: string
  endDate?: string
}

export interface TrackingApiResponse {
  statusCode: number
  data: TrackingOverview
  message: string
  success: boolean
}

export const getTrackingOverview = async (
  params?: TrackingQueryParams
): Promise<TrackingOverview> => {
  const res = await apiClient.get<TrackingApiResponse>('/routines/tracking/overview', { params })
  return res.data.data
}

export type { TrackingOverview, SkinAnalysis, Routine, DailyLog, Metric } from '../types'
