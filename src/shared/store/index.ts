import { configureStore } from '@reduxjs/toolkit'
import analysisReducer from '@/features/home/store/analysis.slice'

export const store = configureStore({
  reducer: {
    analysis: analysisReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
