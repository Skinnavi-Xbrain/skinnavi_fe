import apiClient from '@/shared/lib/api-client'
import type { SimpleResponse } from '@/shared/types/api'

export interface UserSubscription {
  id: string
  status: 'ACTIVE' | 'CANCELED' | 'EXPIRED'
  startDate: string
  endDate: string
  package: {
    id: string
    name: string
    price: number
  }
}

export const getMySubscriptions = async (): Promise<UserSubscription[]> => {
  const res = await apiClient.get<SimpleResponse<UserSubscription[]>>('/user/subscription')
  return res.data.data
}

export const cancelSubscription = async (id: string): Promise<void> => {
  await apiClient.patch(`user/subscription/${id}/cancel`)
}
