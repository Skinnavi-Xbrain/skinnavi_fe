import apiClient from '@/shared/lib/api-client'
import type { TrackingOverview, SkinAnalysis, Routine, DailyLog, Metric } from '../types'

export interface TrackingQueryParams {
  startDate?: string
  endDate?: string
}

export interface SkinAnalysesResponse {
  statusCode: number
  data: {
    user_id: string
    full_name: string
    email: string
    avatar_url: string | null
    skin_analyses: SkinAnalysis[]
  }
  message: string
  success: boolean
}

export interface DailyLogsResponse {
  statusCode: number
  data: {
    user_id: string
    routines: Routine[]
  }
  message: string
  success: boolean
}

export interface CompareAnalysesResponse {
  statusCode: number
  data: {
    analysis1_id: string
    analysis1_date: string
    analysis1_score: number | null
    analysis2_id: string
    analysis2_date: string
    analysis2_score: number | null
    overall_score_difference: number | null
    skin_type: string
    metrics_comparison: {
      metric_type: string
      score1: number | null
      score2: number | null
      difference: number | null
    }[]
  }
  message: string
  success: boolean
}

export interface CompareAnalysesRequest {
  analysisId1: string
  analysisId2: string
}

export const getUserSkinAnalyses = async (days?: number): Promise<SkinAnalysesResponse['data']> => {
  const res = await apiClient.get<SkinAnalysesResponse>('/routines/tracking/skin-analyses', {
    params: days !== undefined ? { days } : undefined
  })
  return res.data.data
}

export const getDailyLogs = async (
  params?: TrackingQueryParams
): Promise<DailyLogsResponse['data']> => {
  const res = await apiClient.get<DailyLogsResponse>('/routines/tracking/daily-logs', { params })
  return res.data.data
}

export const compareAnalyses = async (
  request: CompareAnalysesRequest
): Promise<CompareAnalysesResponse['data']> => {
  const res = await apiClient.post<CompareAnalysesResponse>('/routines/tracking/compare', request)
  return res.data.data
}

export type { TrackingOverview, SkinAnalysis, Routine, DailyLog, Metric }
