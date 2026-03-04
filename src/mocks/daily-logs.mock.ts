import type { RoutineDailyLogsResponse, SkinAnalysisComparison } from '../features/routine/types'

// Mock daily logs matching the mock server data
export const mockDailyLogsResponse: RoutineDailyLogsResponse = {
  statusCode: 200,
  success: true,
  message: 'Get daily routine logs',
  data: [
    {
      id: 'log-2026-02-25',
      user_routine_id: '03aede06-6d2d-43dd-b710-2cebf4bacd72',
      log_date: '2026-02-25',
      is_completed: false,
      created_at: '2026-02-25T10:30:00Z'
    },
    {
      id: 'log-2026-02-26',
      user_routine_id: '03aede06-6d2d-43dd-b710-2cebf4bacd72',
      log_date: '2026-02-26',
      is_completed: true,
      created_at: '2026-02-26T08:15:00Z'
    },
    {
      id: 'log-2026-02-27',
      user_routine_id: '03aede06-6d2d-43dd-b710-2cebf4bacd72',
      log_date: '2026-02-27',
      is_completed: true,
      created_at: '2026-02-27T09:00:00Z'
    },
    {
      id: 'log-2026-02-28',
      user_routine_id: '03aede06-6d2d-43dd-b710-2cebf4bacd72',
      log_date: '2026-02-28',
      is_completed: true,
      created_at: '2026-02-28T07:45:00Z'
    },
    {
      id: 'log-2026-03-01',
      user_routine_id: '03aede06-6d2d-43dd-b710-2cebf4bacd72',
      log_date: '2026-03-01',
      is_completed: false,
      created_at: '2026-03-01T22:00:00Z'
    },
    {
      id: 'log-2026-03-02',
      user_routine_id: '03aede06-6d2d-43dd-b710-2cebf4bacd72',
      log_date: '2026-03-02',
      is_completed: true,
      created_at: '2026-03-02T08:30:00Z'
    },
    {
      id: 'log-2026-03-03',
      user_routine_id: '03aede06-6d2d-43dd-b710-2cebf4bacd72',
      log_date: '2026-03-03',
      is_completed: true,
      created_at: '2026-03-03T08:00:00Z'
    }
  ]
}

// Mock skin analysis comparison
export const mockSkinAnalysisComparison: SkinAnalysisComparison = {
  statusCode: 200,
  success: true,
  message: 'Skin analysis comparison',
  data: {
    current: {
      date: '2026-03-03',
      moistureLevel: 78,
      oilLevel: 38,
      acneCount: 4,
      rednessLevel: 18,
      texture: 'smooth'
    },
    previous: {
      date: '2026-02-24',
      moistureLevel: 62,
      oilLevel: 45,
      acneCount: 8,
      rednessLevel: 35,
      texture: 'rough'
    },
    improvement: {
      moisture: 25.81,
      oil: 15.56,
      acne: 50,
      redness: 48.57
    }
  }
}

export const getMockDailyLogs = async () => {
  await new Promise((r) => setTimeout(r, 200))
  return mockDailyLogsResponse.data
}

export const getMockSkinAnalysis = async () => {
  await new Promise((r) => setTimeout(r, 200))
  return mockSkinAnalysisComparison.data
}
