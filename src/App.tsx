import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/shared/layouts/MainLayout'
import Register from '@/features/auth/pages/Register'
import Login from '@/features/auth/pages/Login'
import { Toaster } from '@/shared/components/ui/toaster'
import Home from '@/features/home/pages/Home'
import AnalysisResult from './features/analysis-result/pages/AnalysisResult'
import { ProtectedRoute } from './routes/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/analysis-result" element={<AnalysisResult />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center">404 - Page Not Found</div>
          }
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
