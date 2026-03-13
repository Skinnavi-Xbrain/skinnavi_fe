import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/shared/layouts/MainLayout'
import Register from '@/features/auth/pages/Register'
import Login from '@/features/auth/pages/Login'
import { Toaster } from '@/shared/components/ui/toaster'
import Home from '@/features/home/pages/Home'
import AnalysisResult from './features/analysis-result/pages/AnalysisResult'
import DetailedRoutine from './features/detail-packages/pages/DetailedRoutine'
import ScrollToTop from './shared/components/ui/ScrollToTop'
import { ProtectedRoute } from './routes/ProtectedRoute'
import DailyRoutine from './features/routine/pages/DailyRoutine'
import RoutineStepDetail from './features/detail-step-routine/pages/RoutineStepDetail'
import AdminDashboard from './features/admin/pages/AdminDashboard'
import PlaceholderPage from './features/admin/components/PlaceholderPage'
import UserManagement from '@/features/admin/pages/UserManagement'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/analysis-result" element={<AnalysisResult />} />
            <Route path="/routine-detail/:id" element={<DetailedRoutine />} />
            <Route path="/daily-routine" element={<DailyRoutine />} />

            {/* step-detail now accepts an ID param to fetch specific routine step */}
            <Route path="/step-detail/:stepId" element={<RoutineStepDetail />} />
          </Route>
        </Route>

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/subscriptions" element={<PlaceholderPage title="Subscriptions" />} />
        <Route path="/admin/revenue" element={<PlaceholderPage title="Revenue" />} />
        <Route path="/admin/product" element={<PlaceholderPage title="Product" />} />
        <Route path="/admin/settings" element={<PlaceholderPage title="Settings" />} />

        {/* <Route path="/login" element={<LoginPage />} /> */}

        {/* Route 404 - Not Found */}
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
