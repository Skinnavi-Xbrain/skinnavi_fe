import { configureStore } from '@reduxjs/toolkit'
import analysisReducer from '@/features/home/store/analysis.slice'
import paymentReducer from '@/features/payment/store/payment.slice'

export const store = configureStore({
  reducer: {
    analysis: analysisReducer,
    payment: paymentReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
