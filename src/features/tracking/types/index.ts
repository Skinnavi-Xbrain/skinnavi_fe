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

export interface TrackingQueryParams {
  startDate?: string
  endDate?: string
}

export interface SkinAnalysesResponse {
  statusCode: number
  data: {
    user_id: string
    full_name: string
    email: string
    avatar_url: string | null
    skin_analyses: SkinAnalysis[]
  }
  message: string
  success: boolean
}

export interface DailyLogsResponse {
  statusCode: number
  data: {
    user_id: string
    type: TrackingType
    routines: TrackingRoutineItem[]
  }
  message: string
  success: boolean
}

export interface CompareAnalysesResponse {
  statusCode: number
  data: {
    analysis1_id: string
    analysis1_date: string
    analysis1_score: number | null
    analysis2_id: string
    analysis2_date: string
    analysis2_score: number | null
    overall_score_difference: number | null
    skin_type: string
    metrics_comparison: {
      metric_type: string
      score1: number | null
      score2: number | null
      difference: number | null
    }[]
  }
  message: string
  success: boolean
}
export interface CompareAnalysesRequest {
  analysisId1: string
  analysisId2: string
}
export interface UpdateDailyLogDto {
  is_completed: boolean
}

export interface SkinCalendarProps {
  tracking?: TrackingOverview | null
}

export type TrackingType = 'NO_SUBSCRIPTION' | 'WEEKLY_NO_LOG' | 'NO_LOG_TODAY' | 'HAS_LOG'

export interface DailyLog {
  id: string
  user_routine_id: string
  log_date: string
  is_completed: boolean
}

export interface TrackingRoutineItem {
  routine_id: string
  routine_time: string
  routine_created_at: string
  daily_log: DailyLog | null
  is_completed: boolean
}

export interface TrackingDataResponse {
  user_id: string
  type: TrackingType
  routines: TrackingRoutineItem[]
}

export interface MetricComparison {
  metric_type: string
  score1: number | null
  score2: number | null
  difference: number | null
}

export interface ComparisonResponse {
  analysis1_id: string
  analysis1_date: string
  analysis1_score: number | null
  analysis2_id: string
  analysis2_date: string
  analysis2_score: number | null
  overall_score_difference: number | null
  skin_type: string
  metrics_comparison: MetricComparison[]
}

export interface ComparisonSliderProps {
  tracking?: TrackingOverview | null
}

export interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
}

export interface CustomSelectProps {
  id?: string
  value: string
  options: DropdownOption[]
  placeholder?: string
  onChange: (value: string) => void
}
