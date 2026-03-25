import apiClient from '@/shared/lib/api-client'
import type { Product, ApiResponse, ProductListResponse, Combo } from '../types/product'

export const productApi = {
  getProducts: async (page: number = 1, limit: number = 10) => {
    const res = await apiClient.get<ApiResponse<ProductListResponse>>('/admin/products', {
      params: { page, limit }
    })
    return res.data
  },

  createProduct: async (data: Omit<Product, 'id'>) => {
    return apiClient.post<ApiResponse<Product>>('/admin/products', data)
  },

  updateProduct: async (id: string, data: Partial<Product>) => {
    return apiClient.patch<ApiResponse<Product>>(`/admin/products/${id}`, data)
  },

  deleteProduct: async (id: string) => {
    return apiClient.delete<ApiResponse<null>>(`/admin/products/${id}`)
  },

  getCombos: async (page: number = 1, limit: number = 10): Promise<ApiResponse<Combo[]>> => {
    const res = await apiClient.get<ApiResponse<Combo[]>>(
      `/admin/combos?page=${page}&limit=${limit}`
    )
    return res.data
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
