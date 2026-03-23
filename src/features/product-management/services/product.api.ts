import apiClient from '@/shared/lib/api-client'
import { type Product, type Combo, type ApiResponse } from '../types/product'
// --- SINGLE PRODUCTS ---
export const productApi = {
  getProducts: async (page: number = 1, limit: number = 10): Promise<ApiResponse<Product[]>> => {
    const res = await apiClient.get<ApiResponse<Product[]>>(
      `/admin/products?page=${page}&limit=${limit}`
    )
    return res.data // Trả về nguyên object chứa items, totalPages...
  },
  getProductById: async (id: string): Promise<Product | null> => {
    const res = await apiClient.get<ApiResponse<Product>>(`/admin/products/${id}`)
    return res.data?.success ? res.data.data : null
  },

  createProduct: async (data: Partial<Product>) => {
    return apiClient.post<ApiResponse<Product>>('/admin/products', data)
  },

  updateProduct: async (id: string, data: Partial<Product>) => {
    return apiClient.patch<ApiResponse<Product>>(`/admin/products/${id}`, data)
  },

  deleteProduct: async (id: string) => {
    return apiClient.delete(`/admin/products/${id}`)
  },

  // --- COMBOS ---
  getCombos: async (page: number = 1, limit: number = 10): Promise<ApiResponse<Combo[]>> => {
    const res = await apiClient.get<ApiResponse<Combo[]>>(
      `/admin/combos?page=${page}&limit=${limit}`
    )
    return res.data
  },
  getComboById: async (id: string): Promise<Combo | null> => {
    const res = await apiClient.get<ApiResponse<Combo>>(`/admin/combos/${id}`)
    return res.data?.success ? res.data.data : null
  },

  createCombo: async (data: Partial<Combo>) => {
    return apiClient.post<ApiResponse<Combo>>('/admin/combos', data)
  },

  updateCombo: async (id: string, data: Partial<Combo>) => {
    return apiClient.patch<ApiResponse<Combo>>(`/admin/combos/${id}`, data)
  },

  deleteCombo: async (id: string) => {
    return apiClient.delete(`/admin/combos/${id}`)
  }
}
export const comboApi = productApi
