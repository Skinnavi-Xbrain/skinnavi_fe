export interface UploadData {
  url: string
}

export interface UploadResponse {
  message: string
  data: UploadData
}

export interface SkinConcerns {
  pores: number
  acnes: number
  darkCircles: number
  darkSpots: number
}

export interface AnalysisData {
  skinType: string
  skinScore: number
  concerns: SkinConcerns
  overallComment: string
  recommendedCombos: string[]
}

export interface AnalyzeResult {
  analysisId: string
  result: AnalysisData
}

export interface AnalyzeResponse {
  statusCode: number
  message: string
  data: AnalyzeResult
  success: boolean
}
