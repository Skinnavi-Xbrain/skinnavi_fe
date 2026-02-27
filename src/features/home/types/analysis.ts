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

// export interface AnalysisData {
//   skinType: string
//   skinScore: number
//   concerns: SkinConcerns
//   overallComment: string
//   recommendedCombos: string[]
// }

// export interface AnalyzeResult {
//   analysisId: string
//   result: AnalysisData
// }

export interface AnalyzeResponse {
  statusCode: number
  message: string
  data: AnalyzeResult
  success: boolean
}

export interface SkinMetrics {
  PORES: number
  ACNE: number
  DARK_CIRCLES: number
  DARK_SPOTS: number
  WRINKLES: number
}

export interface AnalysisData {
  imageUrl: string
  result: unknown
  isValidImage: boolean
  skinType?: string
  overallScore?: number
  metrics?: SkinMetrics
  overallComment?: string
  recommendedCombos?: string[]
  message?: string
  guidelines?: string[]
}

export interface AnalyzeResult {
  analysisId: string | null
  result: AnalysisData
}
