import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from '@/features/auth/pages/Register'
import Login from '@/features/auth/pages/Login'
import { Toaster } from '@/shared/components/ui/toaster'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
