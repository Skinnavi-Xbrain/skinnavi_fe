export interface Product {
  id: string
  name: string
  usage_role: string
  display_price: string
  affiliate_url: string
  image_url: string
  is_active: boolean
}

export interface SubStep {
  id: string
  instruction: string
  order: number
  description?: string // detailed guidance for the sub-step, instruction remains a brief title
}

export interface RoutineStep {
  id: string
  user_routine_id: string
  step_order: number
  instruction: string
  product_id: string
  product: Product
  sub_steps?: SubStep[] // optional detailed sub-steps
}

export interface Routine {
  id: string
  user_package_subscription_id: string
  routine_time: 'MORNING' | 'EVENING'
  steps: RoutineStep[]
  created_at?: string // optional timestamp from backend
}

export interface RoutineResponse {
  statusCode: number
  data: {
    morning?: Routine
    evening?: Routine
  }
  message: string
  success: boolean
}

export type RoutineTime = 'morning' | 'evening'
export interface RoutineDailyLog {
  id: string
  user_routine_id: string
  log_date: string // ISO date string (YYYY-MM-DD)
  is_completed: boolean
  created_at?: string
}

export interface RoutineDailyLogsResponse {
  statusCode: number
  data: RoutineDailyLog[]
  message: string
  success: boolean
}

export interface SkinAnalysisMetrics {
  date: string
  moistureLevel: number // 0-100
  oilLevel: number // 0-100
  acneCount: number
  rednessLevel: number // 0-100
  texture: string // 'smooth' | 'rough'
}

export interface SkinAnalysisComparison {
  statusCode: number
  data: {
    current: SkinAnalysisMetrics
    previous: SkinAnalysisMetrics
    improvement: {
      moisture: number // percentage change
      oil: number
      acne: number
      redness: number
    }
  }
  message: string
  success: boolean
}
