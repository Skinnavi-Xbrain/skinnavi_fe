export interface SubStep {
  id: string
  order?: number
  title: string
  how_to: string
  image_url: string
}

export interface Product {
  id: string
  name: string
  usage_role: string
  display_price: string
  affiliate_url: string
  image_url: string
  is_active: boolean
}

export interface RoutineData {
  id: string
  user_routine_id: string
  step_order: number
  instruction: string
  product_id: string
  sub_steps: SubStep[]
  product: Product
}

export interface RoutineDetailResponse {
  statusCode: number
  success: boolean
  data: RoutineData
}
