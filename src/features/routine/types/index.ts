export interface Product {
  id: string
  name: string
  usage_role: string
  display_price: string
  affiliate_url: string
  image_url: string
  is_active: boolean
}

export interface RoutineStep {
  id: string
  user_routine_id: string
  step_order: number
  instruction: string
  product_id: string
  product: Product
}

export interface Routine {
  id: string
  user_package_subscription_id: string
  routine_time: 'MORNING' | 'EVENING'
  steps: RoutineStep[]
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
