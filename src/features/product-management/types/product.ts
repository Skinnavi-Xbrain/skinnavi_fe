export type SkinType = 'OILY' | 'DRY' | 'NORMAL' | 'COMBINATION' | 'SENSITIVE'

// product-management/types/product.ts

export interface Product {
  id: string
  name: string
  usage_role: string // Sửa từ 'type' thành 'usage_role' theo API
  display_price: string // Sửa từ number thành string theo API
  image_url: string
  affiliate_url: string
  is_active: boolean
}

export interface ApiResponse<T> {
  page: number
  limit: number
  total: number
  totalPages: number
  items: T // API trả về mảng nằm trong trường 'items'
}

export interface ComboProductRelation {
  id: string
  step_order: number
  product: Product // Thông tin sản phẩm lấy từ bảng Product
}

export interface Combo {
  id: string
  skin_type_id: string
  combo_name: string
  display_price: string
  image_url: string
  affiliate_url: string
  is_active: boolean
  combo_products: ComboProductRelation[] // Danh sách các quan hệ
}
