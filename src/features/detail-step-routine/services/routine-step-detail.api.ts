// import apiClient from '@/shared/lib/api-client'
// // import type { RoutineStepDetailResponse } from '../types'

// // you may need to adjust the endpoint path when the backend is ready
// export const getRoutineStepDetail = async (
//   stepId: string
// ): Promise<RoutineStepDetailResponse['data'] | null> => {
//   try {
//     const res = await apiClient.get<RoutineStepDetailResponse>(`/routine-steps/${stepId}`)
//     if (res.data?.success && res.data.data) {
//       return res.data.data
//     }
//   } catch (error) {
//     console.error('fetch routine step detail failed', error)
//   }
//   return null
// }
