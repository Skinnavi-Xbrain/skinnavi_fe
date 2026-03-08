export interface AffiliateProduct {
  id: string
  name: string
  usage_role?: string
  display_price?: string | number
  affiliate_url: string
  image_url?: string
  is_active: boolean
}

export interface ComboProduct {
  id: string
  combo_id: string
  product_id: string
  step_order: number
  product: AffiliateProduct
}

export interface Combo {
  id: string
  combo_name: string
  display_price: string | number
  affiliate_url: string
  image_url: string
  description?: string
  combo_products: ComboProduct[]
}

export interface CombosResponse {
  success: boolean
  data: Combo[]
  message: string
}
