import { useState } from 'react'
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import type { ApiErrorResponse } from '@/shared/types/api'

import { Button } from '@/shared/components/ui/button'
import { AuthLayout } from '@/shared/layouts/AuthLayout'
import { InputWithIcon } from '@/shared/components/ui/input-with-icon'
import { Field, FieldError } from '@/shared/components/ui/field'
import { toast } from '@/shared/hooks/use-toast'
import loginImg from '@/shared/assets/images/login.png'
import { login } from '../services/auth.api'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional()
})

type LoginFormValues = z.infer<typeof loginSchema>

type JwtPayload = {
  sub: string
  email: string
  role: string
  exp: number
  iat: number
}

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true
    }
  })

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true)

    try {
      const response = await login({
        email: data.email,
        password: data.password
      })

      const accessToken = response.data.accessToken

      localStorage.setItem('accessToken', accessToken)

      const decoded: JwtPayload = jwtDecode(accessToken)

      toast({
        title: 'Welcome back!',
        description: response.message,
        variant: 'success'
      })

      if (decoded.role === 'ADMIN') {
        navigate('/dashboard')
      } else {
        navigate('/home')
      }
    } catch (err: unknown) {
      let description = 'Please check your credentials and try again.'

      if (axios.isAxiosError(err)) {
        const apiError = err.response?.data as ApiErrorResponse | undefined

        if (apiError?.message) {
          description = Array.isArray(apiError.message)
            ? apiError.message.join(', ')
            : apiError.message
        }
      } else if (err instanceof Error) {
        description = err.message
      }

      toast({
        title: 'Login failed',
        description,
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout imageSrc={loginImg}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-blue-500 mb-1">Welcome Back</h1>
        <p className="text-slate-500 text-sm font-medium">
          Sign in to continue your skincare journey
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Field className="gap-0">
          <InputWithIcon
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail className="w-5 h-5" />}
            {...register('email')}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field className="gap-0">
          <div className="relative">
            <InputWithIcon
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              icon={<Lock className="w-5 h-5" />}
              {...register('password')}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-11 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <FieldError errors={[errors.password]} />
        </Field>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-500 border-slate-300 rounded focus:ring-blue-500"
              {...register('rememberMe')}
            />
            <span className="text-sm text-slate-500">Remember me</span>
          </label>

          <Link to="#" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-5 rounded-xl active:scale-[0.98] text-sm"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign in'}
        </Button>

        <div className="text-center text-sm text-slate-500">
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
