export interface RoutinePackage {
  id: string
  package_name: string
  description: string
  highlights: string[]
  duration_days: number
  price: string
}

export interface RoutinePackagesResponse {
  statusCode: number
  data: RoutinePackage[]
  message: string
  success: boolean
}

export interface PackagesResponse {
  success: boolean
  data: RoutinePackage[]
}

export interface SinglePackageResponse {
  success: boolean
  data: RoutinePackage
}

export interface CreateRoutinePayload {
  skinAnalysisId: string
  routinePackageId: string
  comboId: string
}

export class PaymentResponseDto {
  url?: string
  hasActivePackage?: boolean
  currentPackage?: {
    name: string
    endDate: Date
  }
  message?: string
}

export interface ActivePackageResponse {
  hasActivePackage?: boolean
  isFreeTrial?: boolean
  currentPackage?: {
    name: string
    endDate: string
  }
  message: string
  url?: string
}

export interface CreateRoutinePayload {
  skinAnalysisId: string
  routinePackageId: string
  comboId: string
}
