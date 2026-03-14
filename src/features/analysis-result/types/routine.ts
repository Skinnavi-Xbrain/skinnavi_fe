export interface RoutinePackage {
  id: string
  package_name: string
  description: string
  highlights: string[]
  duration_days: number
  price: string
}

export interface PackagesResponse {
  success: boolean
  data: RoutinePackage[]
}
