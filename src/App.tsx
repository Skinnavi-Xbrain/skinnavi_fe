import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/shared/layouts/MainLayout'
import Register from '@/features/auth/pages/Register'
import Home from '@/features/main/pages/Home'
import RoutineStepDetail from './features/detail-step-routine/pages/Routinestepdetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/step-detail/" element={<RoutineStepDetail />} />
        </Route>

        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center">404 - Page Not Found</div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
