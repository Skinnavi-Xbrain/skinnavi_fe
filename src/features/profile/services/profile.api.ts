import apiClient from '@/shared/lib/api-client'
import { type UserProfileResponse } from '../types/profile'

export const getMyProfile = async (): Promise<UserProfileResponse> => {
  const res = await apiClient.get<UserProfileResponse>('/user/profile')
  return res.data
}
