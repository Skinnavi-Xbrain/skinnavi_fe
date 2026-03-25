export interface ApiErrorResponse {
  message: string | string[]
  error?: string
  statusCode?: number
}

export interface SimpleResponse<T> {
  statusCode: number
  data: T
  message: string
  success: boolean
}
