import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from '@/features/auth/pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />

        <Route path="/register" element={<Register />} />

        {/* <Route path="/login" element={<LoginPage />} /> */}

        {/* Route 404 - Not Found */}
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
