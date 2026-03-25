export type SkinTypeCode = 'OILY' | 'DRY' | 'NORMAL' | 'COMBINATION' | 'SENSITIVE'
export interface Product {
  id: string
  name: string
  usage_role: string
  display_price: string | number
  image_url: string
  affiliate_url: string
  is_active: boolean
}

export interface ApiResponse<T> {
  page: number
  limit: number
  total: number
  totalPages: number
  items: T
}

export interface ComboProductRelation {
  id: string
  step_order: number
  product: Product
}

export interface Combo {
  id: string
  skin_type_id: string
  combo_name: string
  display_price: string | number
  image_url: string
  affiliate_url: string
  is_active: boolean
  products: ComboProductRelation[]
}

export interface CreateProductPayload {
  name: string
  usage_role: string
  display_price: string | number
  image_url: string
  affiliate_url: string
  is_active: boolean
}

export interface Product {
  id: string
  name: string
  usage_role: string
  display_price: string | number
  image_url: string
  affiliate_url: string
  is_active: boolean
  created_at?: string
}

export interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  limit: number
}

export interface CreateProductPayload {
  name: string
  usage_role: string
  display_price: string | number
  image_url: string
  affiliate_url: string
  is_active: boolean
}

export interface CreateComboPayload {
  combo_name: string
  skin_type_id: string
  display_price: string | number
  image_url: string
  affiliate_url: string
  is_active: boolean
}
