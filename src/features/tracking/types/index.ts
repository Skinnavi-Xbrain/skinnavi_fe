export interface Metric {
  metric_type: string
  score: number | null
}

export interface SkinAnalysis {
  id: string
  skin_type_code: string
  overall_score: number | null
  overall_comment: string | null
  created_at: string
  face_image_url: string | null
  overall_score_trend: number | null
  metrics: Metric[]
}

export interface DailyLog {
  id: string
  user_routine_id: string
  log_date: string
  is_completed: boolean
}

export interface Routine {
  routine_id: string
  routine_time: string
  routine_created_at: string
  subscription_id: string
  subscription_start_date: string
  subscription_end_date: string
  daily_logs: DailyLog[]
  completed_count: number
  total_count: number
}

export interface TrackingOverview {
  user_id: string
  full_name: string
  email: string
  avatar_url: string | null
  skin_analyses: SkinAnalysis[]
  routines: Routine[]
}
