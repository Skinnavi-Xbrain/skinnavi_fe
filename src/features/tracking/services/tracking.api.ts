import apiClient from '@/shared/lib/api-client'
import type {
  TrackingOverview,
  SkinAnalysis,
  Routine,
  DailyLog,
  Metric,
  TrackingQueryParams,
  SkinAnalysesResponse,
  DailyLogsResponse,
  CompareAnalysesResponse,
  CompareAnalysesRequest
} from '../types'

export const getUserSkinAnalyses = async (days?: number): Promise<SkinAnalysesResponse['data']> => {
  const res = await apiClient.get<SkinAnalysesResponse>('/tracking/skin-analyses', {
    params: days !== undefined ? { days } : undefined
  })
  return res.data.data
}

export const getDailyLogs = async (
  params?: TrackingQueryParams
): Promise<DailyLogsResponse['data']> => {
  const res = await apiClient.get<DailyLogsResponse>('/tracking/daily-logs', { params })
  return res.data.data
}

export const compareAnalyses = async (
  request: CompareAnalysesRequest
): Promise<CompareAnalysesResponse['data']> => {
  const res = await apiClient.post<CompareAnalysesResponse>('/tracking/compare', request)
  return res.data.data
}

export type { TrackingOverview, SkinAnalysis, Routine, DailyLog, Metric }
