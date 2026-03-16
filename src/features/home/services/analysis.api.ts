import apiClient from '@/shared/lib/api-client'
import type { UploadResponse, AnalyzeResponse } from '../types/analysis'

export const uploadImage = async (formData: FormData): Promise<UploadResponse> => {
  const res = await apiClient.post<UploadResponse>('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return res.data
}

export const analyzeImage = async (imageUrl: string): Promise<AnalyzeResponse> => {
  const res = await apiClient.post<AnalyzeResponse>('/skin-analysis/analyze', { imageUrl })
  return res.data
}

export const getLatestSkinAnalysis = async (): Promise<AnalyzeResponse> => {
  const res = await apiClient.get<AnalyzeResponse>('/skin-analysis/result')
  return res.data
}
