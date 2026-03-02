import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AnalyzeResult } from '../types/analysis'

interface AnalysisState {
  currentResult: AnalyzeResult | null
  analysisCache: Record<string, AnalyzeResult>
}

const savedResult = localStorage.getItem('lastAnalysisResult')
const savedCache = localStorage.getItem('analysisCache')

const initialState: AnalysisState = {
  currentResult: savedResult ? JSON.parse(savedResult) : null,
  analysisCache: savedCache ? JSON.parse(savedCache) : {}
}

export const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setAnalysisResult: (state, action: PayloadAction<AnalyzeResult>) => {
      state.currentResult = action.payload
      localStorage.setItem('lastAnalysisResult', JSON.stringify(action.payload))
    },
    addToCache: (state, action: PayloadAction<{ key: string; result: AnalyzeResult }>) => {
      state.analysisCache[action.payload.key] = action.payload.result
      localStorage.setItem('analysisCache', JSON.stringify(state.analysisCache))
    },
    clearAnalysisResult: (state) => {
      state.currentResult = null
      localStorage.removeItem('lastAnalysisResult')
    }
  }
})

export const { setAnalysisResult, addToCache, clearAnalysisResult } = analysisSlice.actions
export default analysisSlice.reducer
