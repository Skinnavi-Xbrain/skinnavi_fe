import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Menu, X, Home, Sparkles, Activity, Info, ChevronRight, LogOut, UserCircle } from 'lucide-react';
import Logo from '@/shared/assets/images/Logo_Skinnavi.jpg';

const Header = () => {
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Routine', href: '/routine', icon: <Sparkles className="w-5 h-5" /> },
    { label: 'Tracking', href: '/tracking', icon: <Activity className="w-5 h-5" /> },
    { label: 'About', href: '/about', icon: <Info className="w-5 h-5" /> },
  ];

  const brandColor = "#67AEFF";

  return (
    <>
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-[#67AEFF20] px-4 md:px-6 h-16 flex items-center justify-between shadow-sm"
      >
        {/* LEFT: Logo Section */}
        <div className="flex items-center gap-3 relative">
          <div className="h-12 w-auto overflow-hidden rounded-xl border border-[#67AEFF10]">
            <img src={Logo} alt="SkinNavi Logo" className="h-full w-full object-contain" />
          </div>
        </div>

        {/* CENTER: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredTab(item.label)}
              onMouseLeave={() => setHoveredTab(null)}
              className="relative px-4 py-2 text-[15px] font-medium transition-colors"
              style={{ color: hoveredTab === item.label ? brandColor : "#64748b" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {item.label}
              </span>
              {hoveredTab === item.label && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 z-0 rounded-full"
                  style={{ backgroundColor: `${brandColor}15` }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#67AEFF15] text-[#67AEFF] border border-[#67AEFF20] hover:bg-[#67AEFF25] transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm" />
          </motion.button>

          <motion.div 
            className="hidden md:block h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-[#67AEFF30] shadow-sm hover:border-[#67AEFF] transition-all"
          >
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="User" className="h-full w-full object-cover" />
          </motion.div>

          <button 
            className="md:hidden p-2 text-[#67AEFF] active:scale-90 transition-transform bg-[#67AEFF10] rounded-lg"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU OVERLAY */}
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
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-[60] shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-20 border-b border-[#67AEFF10]">
                <span className="font-bold text-lg" style={{ color: brandColor }}>Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-[#67AEFF10] text-[#67AEFF] active:scale-90 transition-all"
                >
                  <X className="w-6 h-6" strokeWidth={2} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8 bg-gradient-to-b from-white to-[#F0F7FF50]">
                <div className="flex items-center gap-4 mb-10 p-5 rounded-[2rem] bg-white border border-[#67AEFF20] shadow-[0_10px_25px_-10px_rgba(103,174,255,0.3)]">
                  <div className="h-14 w-14 rounded-2xl bg-[#67AEFF] flex items-center justify-center shadow-lg shadow-[#67AEFF30]">
                    <UserCircle className="w-9 h-9 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg leading-tight">Alex Johnson</h4>
                    <p className="text-xs font-bold mt-1 tracking-wide uppercase" style={{ color: brandColor }}>Premium User</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-4">Menu điều hướng</p>
                  {navItems.map((item, idx) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      className="flex items-center justify-between p-5 rounded-2xl bg-white border border-transparent shadow-sm hover:border-[#67AEFF50] active:bg-[#67AEFF10] active:scale-[0.98] transition-all group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-xl bg-[#67AEFF10] text-[#67AEFF] group-active:bg-[#67AEFF] group-active:text-white transition-colors">
                          {item.icon}
                        </div>
                        <span className="font-medium text-slate-700 text-lg">{item.label}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#67AEFF80]" strokeWidth={2} />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="p-8 border-t border-[#67AEFF10] bg-white">
                <button 
                  className="w-full py-4 bg-white border-2 border-red-50 text-red-500 hover:bg-red-50 rounded-2xl font-medium flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-sm active:shadow-inner"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogOut className="w-5 h-5" strokeWidth={2} />
                  <span>Log Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;