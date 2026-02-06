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
