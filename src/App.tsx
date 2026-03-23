import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/shared/layouts/MainLayout'
import Register from '@/features/auth/pages/Register'
import Login from '@/features/auth/pages/Login'
import { Toaster } from '@/shared/components/ui/toaster'
import Home from '@/features/home/pages/Home'
import AnalysisResult from './features/analysis-result/pages/AnalysisResult'
import Tracking from '@/features/tracking/pages/Tracking'
import RoutinePackageDetail from './features/detail-packages/pages/RoutinePackageDetail'
import ScrollToTop from './shared/components/ui/ScrollToTop'
import { ProtectedRoute } from './routes/ProtectedRoute'
import DailyRoutine from './features/routine/pages/DailyRoutine'
import RoutineStepDetail from './features/detail-step-routine/pages/RoutineStepDetail'
import AdminDashboard from './features/admin/pages/AdminDashboard'
import PlaceholderPage from './features/admin/components/PlaceholderPage'
import AboutPage from '@/features/about-us/pages/AboutUs'
import PaymentResult from './features/payment/pages/PaymentResult'
import UserManagement from '@/features/user-management/pages/UserManagement'
import AdminRevenue from './features/admin/pages/AdminRevenue'
import AdminSubscription from './features/admin/pages/AdminSubscription'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment-result" element={<PaymentResult />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/analysis-result" element={<AnalysisResult />} />
            <Route path="/routine-detail/:id" element={<RoutinePackageDetail />} />
            <Route path="/daily-routine" element={<DailyRoutine />} />
            <Route path="/step-detail/:stepId" element={<RoutineStepDetail />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/revenue" element={<AdminRevenue />} />
          <Route path="/subscriptions" element={<AdminSubscription />} />
          <Route path="/product" element={<PlaceholderPage title="Product" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
        </Route>

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
