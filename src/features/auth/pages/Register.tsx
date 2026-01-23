import { User, Mail, Lock, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { AuthLayout } from '@/shared/layouts/AuthLayout'
import { InputWithIcon } from '@/shared/components/ui/input-with-icon'
import registerImg from '@/shared/assets/images/register.png'

const Register = () => {
  return (
    <AuthLayout imageSrc={registerImg}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-500 mb-2">Create Account</h1>
        <p className="text-slate-500 text-sm font-medium">
          Join SkinTech for personalized skincare
        </p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <InputWithIcon
          label="Full Name"
          placeholder="John Doe"
          icon={<User className="w-5 h-5" />}
        />

        <InputWithIcon
          label="Email"
          type="email"
          placeholder="john@email.com"
          icon={<Mail className="w-5 h-5" />}
        />

        <InputWithIcon
          label="Password"
          type="password"
          placeholder="Create a password"
          icon={<Lock className="w-5 h-5" />}
        />

        <InputWithIcon
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          icon={<ShieldCheck className="w-5 h-5" />}
        />

        <div className="flex items-start space-x-2 pt-2">
          <input
            type="checkbox"
            id="terms"
            className="mt-0.5 w-4 h-4 text-blue-500 border-slate-300 rounded focus:ring-blue-500 transition-all cursor-pointer"
          />
          <label htmlFor="terms" className="text-xs text-slate-500 cursor-pointer leading-relaxed">
            I agree to the{' '}
            <Link to="#" className="text-blue-500 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-6 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
        >
          Create Account
        </Button>

        <div className="mt-8 text-center text-sm text-slate-500">
          Already have an account?
          <Link to="/login" className="text-blue-500 font-semibold hover:underline ml-1">
            Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Register
