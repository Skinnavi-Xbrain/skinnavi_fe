import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { EligibilityResponse, PaymentState } from '../types'

const initialState: PaymentState = {
  eligibility: {},
  loading: false
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setEligibility: (
      state,
      action: PayloadAction<{ packageId: string; data: EligibilityResponse }>
    ) => {
      state.eligibility[action.payload.packageId] = action.payload.data
    }
  }
})

export const { setEligibility } = paymentSlice.actions
export default paymentSlice.reducer
