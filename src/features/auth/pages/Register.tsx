import { useState } from 'react'
import { User, Mail, Lock, ShieldCheck, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios, { AxiosError } from 'axios'

import { Button } from '@/shared/components/ui/button'
import { AuthLayout } from '@/shared/layouts/AuthLayout'
import { InputWithIcon } from '@/shared/components/ui/input-with-icon'
import { Field, FieldError } from '@/shared/components/ui/field'
import { env } from '@/config/env'
import type { ApiErrorResponse } from '@/shared/types/api'
import registerImg from '@/shared/assets/images/register.png'
import { toast } from '@/shared/hooks/use-toast'

const registerSchema = z
  .object({
    full_name: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

type RegisterFormValues = z.infer<typeof registerSchema>

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { full_name: '', email: '', password: '', confirmPassword: '' }
  })

  const onSubmit = async (data: RegisterFormValues): Promise<void> => {
    setLoading(true)
    setServerError(null)
    try {
      const response = await axios.post(`${env.API_URL}/auth/register`, {
        email: data.email,
        password: data.password,
        full_name: data.full_name,
        avatar_url: ''
      })

      toast({
        title: 'Thành công',
        description: response.data?.message || 'Registration successful! Please log in.'
      })

      navigate('/login')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>
        const message = axiosError.response?.data?.message

        setServerError(Array.isArray(message) ? message[0] : message || 'Registration failed')
      } else {
        setServerError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout imageSrc={registerImg}>
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold text-blue-500 mb-1">Create Account</h1>
        <p className="text-slate-500 text-xs font-medium">
          Join SkinTech for personalized skincare
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg font-medium">
            {serverError}
          </div>
        )}

        <Field>
          <InputWithIcon
            label="Full Name"
            placeholder="John Doe"
            icon={<User className="w-5 h-5" />}
            {...register('full_name')}
          />
          <FieldError errors={[errors.full_name]} />
        </Field>

        <Field>
          <InputWithIcon
            label="Email"
            type="email"
            placeholder="john@email.com"
            icon={<Mail className="w-5 h-5" />}
            {...register('email')}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field>
          <InputWithIcon
            label="Password"
            type="password"
            placeholder="Create a password"
            icon={<Lock className="w-5 h-5" />}
            {...register('password')}
          />
          <FieldError errors={[errors.password]} />
        </Field>

        <Field>
          <InputWithIcon
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            icon={<ShieldCheck className="w-5 h-5" />}
            {...register('confirmPassword')}
          />
          <FieldError errors={[errors.confirmPassword]} />
        </Field>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-5 rounded-xl"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Account'}
        </Button>
      </form>
    </AuthLayout>
  )
}

export default Register
