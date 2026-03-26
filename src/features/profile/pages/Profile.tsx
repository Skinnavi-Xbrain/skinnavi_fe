import { useState, useEffect } from 'react'
import { CreditCard, LogOut, ChevronRight, Loader2 } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '@/features/auth/services/auth.api'
import { toast } from '@/shared/hooks/use-toast'
import { getMyProfile } from '../services/profile.api'
import type { UserProfileResponse } from '../types/profile'
import { ProfileInfo } from '../components/ProfileInfo'
import { SubscriptionStatus } from '../components/SubscriptionStatus'
import { LogoutConfirmDialog } from '../components/LogoutConfirmDialog'

const Profile = () => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfileResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMyProfile()
        setProfile(response)
      } catch {
        toast({
          title: 'Error',
          description: 'Failed to load profile.',
          variant: 'destructive'
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
      navigate('/login')
    } catch {
      toast({ title: 'Logout failed', variant: 'destructive' })
    } finally {
      setIsLoggingOut(false)
      setIsLogoutModalOpen(false)
    }
  }

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
      </div>
    )

  if (!profile) return null

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-12 md:py-16 animate-fadeIn">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-3 animate-slideInRight">
            MY PROFILE
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm md:text-base animate-fadeIn [animation-delay:400ms]">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-200 flex items-center gap-1"
            >
              Home
            </Link>
            <span className="text-gray-400">&gt;&gt;</span>
            <span className="text-blue-500 font-medium">Profile</span>
          </nav>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="flex flex-col lg:grid lg:grid-cols-[350px,1fr] gap-6">
          <div className="flex flex-col gap-4 animate-slideInLeft">
            <ProfileInfo user={profile.data.user} skinType={profile.data.skinType} />

            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="group flex items-center gap-3 w-full p-4 bg-white rounded-2xl border border-red-100 text-red-500 
                         hover:bg-red-50 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
            >
              <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="font-semibold">Sign Out</span>
            </button>
          </div>

          <div className="flex flex-col gap-6 animate-slideInBottom [animation-delay:200ms]">
            <SubscriptionStatus currentPackage={profile.data.currentPackage} />

            <div
              onClick={() => navigate('/user-subscription')}
              className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-3xl text-white 
                         cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 flex-1"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />

              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h3 className="text-xl font-bold mb-1 group-hover:tracking-wide transition-all">
                    Upgrade Plan
                  </h3>
                  <p className="text-blue-100 text-sm">
                    Get more skin analysis turns and professional routines.
                  </p>
                </div>
                <div className="bg-white/20 p-2.5 rounded-xl group-hover:scale-110 group-hover:bg-white/30 transition-all">
                  <CreditCard size={24} />
                </div>
              </div>

              <div className="mt-8 flex items-center font-medium relative z-10 text-md">
                View Plans
                <ChevronRight
                  size={18}
                  className="ml-1 group-hover:translate-x-2 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <LogoutConfirmDialog
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />
    </div>
  )
}

export default Profile
