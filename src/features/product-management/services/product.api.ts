import apiClient from '@/shared/lib/api-client'
import { Product, Combo } from '../types'

// Định nghĩa interface response chung của project Hằng
interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export const productApi = {
  // --- SINGLE PRODUCTS ---
  getProducts: async (): Promise<Product[]> => {
    const res = await apiClient.get<ApiResponse<Product[]>>('/admin/products')
    return res.data?.success ? res.data.data : []
  },

  createProduct: async (data: Partial<Product>) => {
    return apiClient.post<ApiResponse<Product>>('/admin/products', data)
  },

  // ĐÃ BỔ SUNG: Hàm sửa sản phẩm
  updateProduct: async (id: string, data: Partial<Product>) => {
    return apiClient.patch<ApiResponse<Product>>(`/admin/products/${id}`, data)
  },

  deleteProduct: async (id: string) => {
    return apiClient.delete(`/admin/products/${id}`)
  },

  // --- COMBOS ---
  getCombos: async (): Promise<Combo[]> => {
    const res = await apiClient.get<ApiResponse<Combo[]>>('/admin/combos')
    return res.data?.success ? res.data.data : []
  },

  createCombo: async (data: Partial<Combo>) => {
    return apiClient.post<ApiResponse<Combo>>('/admin/combos', data)
  },

  // ĐÃ BỔ SUNG: Hàm sửa Combo
  updateCombo: async (id: string, data: Partial<Combo>) => {
    return apiClient.patch<ApiResponse<Combo>>(`/admin/combos/${id}`, data)
  },

  deleteCombo: async (id: string) => {
    return apiClient.delete(`/admin/combos/${id}`)
  }
}
