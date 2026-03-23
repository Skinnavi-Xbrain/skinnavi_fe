import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, LogIn, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/features/auth/services/auth.api'
import { toast } from '@/shared/hooks/use-toast'

interface TopBarProps {
  onMenuClick: () => void
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const isAuthenticated = !!localStorage.getItem('accessToken')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      setIsProfileOpen(false)
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
        variant: 'success'
      })
      navigate('/login')
    } catch {
      toast({
        title: 'Logout Failed',
        description: 'Failed to log out. Please try again.',
        variant: 'destructive'
      })
    }
  }

  const AvatarButton = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
    const sizeClass = size === 'sm' ? 'w-[34px] h-[34px] text-[13px]' : 'w-9 h-9 text-[13px]'
    return (
      <div
        className={`${sizeClass} bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors`}
        onClick={() => setIsProfileOpen((prev) => !prev)}
      >
        <span className="text-white font-bold">AU</span>
      </div>
    )
  }

  const ProfileDropdown = () => (
    <AnimatePresence>
      {isProfileOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-[100] overflow-hidden"
        >
          <div className="px-4 py-2 border-b border-slate-50 mb-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Account
            </p>
          </div>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          ) : (
            <button
              onClick={() => {
                setIsProfileOpen(false)
                navigate('/login')
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-blue-500 hover:bg-blue-50 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Log in
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <div className="flex md:hidden items-center justify-between px-4 py-[14px] bg-white border-b border-gray-100 sticky top-0 z-50">
        <button onClick={onMenuClick} className="p-1 bg-transparent border-none cursor-pointer">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="#374151"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span className="font-bold text-base text-gray-900">SkinNavi</span>

        <div className="relative" ref={dropdownRef}>
          <AvatarButton size="sm" />
          <ProfileDropdown />
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between px-7 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="relative w-[300px]">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2"
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" stroke="#9ca3af" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            placeholder="Search users, subscriptions..."
            className="w-full pl-9 pr-4 py-2 rounded-[10px] border border-gray-200 text-[13px] text-gray-700 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="flex items-center gap-[18px]">
          <div className="relative cursor-pointer">
            <svg width="21" height="21" fill="none" viewBox="0 0 24 24">
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
                stroke="#6b7280"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute -top-[3px] -right-[3px] w-2 h-2 bg-red-500 rounded-full border-[1.5px] border-white" />
          </div>

          <div className="relative flex items-center gap-2.5" ref={dropdownRef}>
            <div className="text-right">
              <div className="text-[13px] font-semibold text-gray-900">Admin User</div>
              <div className="text-[11px] text-gray-400">admin.skinnavi@gmail.com</div>
            </div>
            <AvatarButton size="md" />
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </>
  )
}

export default TopBar
