import { Mail, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { AuthLayout } from '@/shared/layouts/AuthLayout'
import { InputWithIcon } from '@/shared/components/ui/input-with-icon'
import loginImg from '@/shared/assets/images/login.png'

const Login = () => {
  return (
    <AuthLayout imageSrc={loginImg}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-blue-500 mb-1">Welcome Back</h1>
        <p className="text-slate-500 text-xs font-medium">
          Sign in to continue your skincare journey
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <InputWithIcon
          label="Email"
          type="email"
          placeholder="yifang@gmail.com"
          icon={<Mail className="w-5 h-5" />}
        />

        <InputWithIcon
          label="Password"
          type="password"
          placeholder="12345678"
          icon={<Lock className="w-5 h-5" />}
        />

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-500 border-slate-300 rounded focus:ring-blue-500 transition-all"
              defaultChecked
            />
            <span className="text-xs text-slate-500">Remember me</span>
          </label>
          <Link to="#" className="text-xs text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-5 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] text-sm"
        >
          Sign in
        </Button>

        <div className="text-center text-xs text-slate-500">
          Don't have an account?
          <Link to="/register" className="text-blue-500 font-semibold hover:underline ml-1">
            Create account
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Login
