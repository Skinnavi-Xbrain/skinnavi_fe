import { useState } from 'react'
import { User, Mail, Lock, ShieldCheck, Loader2, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios, { AxiosError } from 'axios'
import { register as registerUser } from '@/features/auth/services/auth.api'

import { Button } from '@/shared/components/ui/button'
import { AuthLayout } from '@/shared/layouts/AuthLayout'
import { InputWithIcon } from '@/shared/components/ui/input-with-icon'
import { Field, FieldError } from '@/shared/components/ui/field'
import type { ApiErrorResponse } from '@/shared/types/api'
import registerImg from '@/shared/assets/images/register.png'
import { toast } from '@/shared/hooks/use-toast'

const registerSchema = z
  .object({
    full_name: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and privacy policy'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

type RegisterFormValues = z.infer<typeof registerSchema>

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [, setServerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    }
  })

  const onSubmit = async (data: RegisterFormValues): Promise<void> => {
    setLoading(true)
    setServerError(null)
    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        full_name: data.full_name,
        avatar_url: '',
        confirm_password: data.confirmPassword
      })

      toast({
        title: 'Registration Complete',
        description: response?.message || 'Registration successful! Please log in.',
        variant: 'success'
      })

      navigate('/login')
    } catch (error: unknown) {
      let errorMessage = 'An unexpected error occurred'

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>
        const message = axiosError.response?.data?.message
        errorMessage = Array.isArray(message) ? message[0] : message || 'Registration failed'

        toast({
          title: 'Registration Failed',
          description: errorMessage,
          variant: 'destructive'
        })
      }

      setServerError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout imageSrc={registerImg}>
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-blue-400 mb-1">Create Account</h1>
        <p className="text-gray-500 text-sm">Join SkinNavi for personalized skincare</p>
      </div>

      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <Field className="gap-0">
          <InputWithIcon
            label="Full Name"
            placeholder="Enter your full name"
            icon={<User className="w-5 h-5" />}
            {...register('full_name')}
            className="py-2"
          />
          <FieldError errors={[errors.full_name]} />
        </Field>

        <Field className="gap-0">
          <InputWithIcon
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail className="w-5 h-5" />}
            {...register('email')}
            className="py-2"
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field className="gap-0">
          <div className="relative">
            <InputWithIcon
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              icon={<Lock className="w-5 h-5" />}
              {...register('password')}
              className="py-2"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-400 hover:text-gray-600 "
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <FieldError errors={[errors.password]} />
        </Field>

        <Field className="gap-0">
          <div className="relative">
            <InputWithIcon
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              icon={<ShieldCheck className="w-5 h-5" />}
              {...register('confirmPassword')}
              className="py-2"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-10 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <FieldError errors={[errors.confirmPassword]} />
        </Field>

        <div className="flex item-center gap-2 pb-1">
          <input
            type="checkbox"
            id="agreeToTerms"
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-400 focus:ring-blue-400"
            {...register('agreeToTerms')}
          />
          <label htmlFor="agreeToTerms" className="text-xs text-gray-600">
            I agree to the{' '}
            <a href="/terms" className="text-blue-400 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-400 hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-red-500 -mt-1">{errors.agreeToTerms.message}</p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-5 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] text-sm"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Account'}
        </Button>

        <div className="text-center text-sm text-slate-500">
          Already have an account?
          <Link to="/login" className="text-blue-500 font-semibold hover:underline ml-1">
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Register
