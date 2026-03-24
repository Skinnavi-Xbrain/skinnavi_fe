import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  Menu,
  X,
  Home,
  Sparkles,
  Activity,
  Info,
  LogOut,
  User,
  LogIn,
  ChevronRight,
  UserCircle
} from 'lucide-react'
import Logo from '@/shared/assets/images/Logo_Skinnavi.jpg'
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '@/features/auth/services/auth.api'
import { toast } from '@/shared/hooks/use-toast'

const Header = () => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
      navigate('/profile')
    } catch {
      toast({
        title: 'Logout Failed',
        description: 'Failed to log out. Please try again.',
        variant: 'destructive'
      })
    }
  }

  const navItems = [
    { label: 'Home', href: '/home', icon: <Home className="w-5 h-5" /> },
    { label: 'Routine', href: '/daily-routine', icon: <Sparkles className="w-5 h-5" /> },
    { label: 'Tracking', href: '/tracking', icon: <Activity className="w-5 h-5" /> },
    { label: 'About', href: '/about', icon: <Info className="w-5 h-5" /> }
  ]

  const brandColor = '#67AEFF'

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-[#67AEFF20] px-4 md:px-6 h-16 flex items-center justify-between shadow-sm"
      >
        <div className="flex items-center gap-3">
          <Link
            to="/home"
            className="h-12 w-auto overflow-hidden rounded-xl border border-[#67AEFF10]"
          >
            <img src={Logo} alt="SkinNavi Logo" className="h-full w-full object-contain" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onMouseEnter={() => setHoveredTab(item.label)}
              onMouseLeave={() => setHoveredTab(null)}
              className="relative px-4 py-2 text-[15px] font-medium transition-colors"
              style={{ color: hoveredTab === item.label ? brandColor : '#64748b' }}
            >
              <span className="relative z-10">{item.label}</span>
              {hoveredTab === item.label && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 z-0 rounded-full"
                  style={{ backgroundColor: `${brandColor}15` }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4 relative" ref={dropdownRef}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#67AEFF15] text-[#67AEFF] border border-[#67AEFF20]"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm" />
          </motion.button>

          <div className="relative hidden md:block">
            <motion.div
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Nhấn vào avatar sẽ chuyển hướng sang trang profile
                if (isAuthenticated) {
                  navigate('/profile')
                } else {
                  setIsProfileOpen(!isProfileOpen)
                }
              }}
              className="h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-[#67AEFF30] hover:border-[#67AEFF] transition-all flex items-center justify-center bg-slate-50"
            >
              <User className="w-6 h-6 text-slate-400" />
            </motion.div>

            <AnimatePresence>
              {isProfileOpen && !isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setIsProfileOpen(false)
                      navigate('/login')
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#67AEFF] hover:bg-blue-50 transition-colors"
                  >
                    <LogIn className="w-4 h-4" /> Log in
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className="md:hidden p-2 text-[#67AEFF] active:scale-90 transition-transform bg-[#67AEFF10] rounded-lg"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-[60] shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-20 border-b border-[#67AEFF10]">
                <span className="font-bold text-lg text-[#67AEFF]">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-[#67AEFF10] rounded-full text-[#67AEFF] active:scale-90"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8 bg-gradient-to-b from-white to-[#F0F7FF50]">
                {/* Mobile: Nhấn vào khung User Account cũng về trang Profile */}
                <div 
                  onClick={() => {
                    if(isAuthenticated) {
                      navigate('/profile')
                      setIsMobileMenuOpen(false)
                    }
                  }}
                  className="flex items-center gap-4 mb-8 p-5 rounded-[2rem] bg-white border border-[#67AEFF20] shadow-[0_10px_25px_-10px_rgba(103,174,255,0.3)] cursor-pointer active:scale-95 transition-transform"
                >
                  <div className="h-14 w-14 rounded-2xl bg-[#67AEFF] flex items-center justify-center shadow-lg shadow-[#67AEFF30]">
                    <UserCircle className="w-9 h-9 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg leading-tight">
                      {isAuthenticated ? 'User Account' : 'Guest'}
                    </h4>
                    <p className="text-xs font-bold mt-1 tracking-wide uppercase text-[#67AEFF]">
                      {isAuthenticated ? 'Member - View Profile' : 'Welcome to SkinNavi'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-4">
                    Navigation
                  </p>
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        className="flex items-center justify-between p-5 rounded-2xl bg-white border border-transparent shadow-sm hover:border-[#67AEFF50] active:bg-[#67AEFF10] transition-all group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-xl bg-[#67AEFF10] text-[#67AEFF] group-active:bg-[#67AEFF] group-active:text-white transition-colors">
                            {item.icon}
                          </div>
                          <span className="font-medium text-slate-700 text-lg">{item.label}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#67AEFF80]" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-8 border-t border-[#67AEFF10] bg-white">
                {isAuthenticated ? (
                  <button
                    className="w-full py-4 bg-white border-2 border-red-50 text-red-500 hover:bg-red-50 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      handleLogout()
                    }}
                  >
                    <LogOut className="w-5 h-5" /> Log out
                  </button>
                ) : (
                  <button
                    className="w-full py-4 bg-[#67AEFF] text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-[#67AEFF30]"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      navigate('/login')
                    }}
                  >
                    <LogIn className="w-5 h-5" /> Log in
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header