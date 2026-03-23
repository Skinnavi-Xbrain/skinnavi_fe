import { NavLink } from 'react-router-dom'

const navItems = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    name: 'Users',
    to: '/users',
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    name: 'Subscriptions',
    to: '/subscriptions',
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    name: 'Revenue',
    to: '/revenue',
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 7v10M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  },
  {
    name: 'Product',
    to: '/product',
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
        <path
          d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    )
  },
  {
    name: 'Settings',
    to: '/settings',
    icon: (
      <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    )
  }
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => (
  <>
    {isOpen && <div className="fixed inset-0 bg-black/45 z-[99] md:hidden" onClick={onClose} />}
    <aside
      className={`fixed top-0 left-0 h-screen w-[220px] bg-[#0F172A] z-[100] flex flex-col px-3 pb-6 transition-transform duration-250 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <div className="flex items-center gap-2.5 px-2 py-7 border-b border-white/[0.07] mb-2">
        <div className="w-[34px] h-[34px] bg-blue-500 rounded-[9px] flex items-center justify-center shrink-0">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
              fill="white"
            />
          </svg>
        </div>
        <div>
          <div className="text-white font-bold text-[15px] leading-tight">SkinNavi</div>
          <div className="text-slate-500 text-[11px]">Admin Portal</div>
        </div>
      </div>

      <nav className="flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-[11px] rounded-[10px] text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-white/[0.07] hover:text-gray-200'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="text-[11px] text-gray-600 pl-2">Version 1.0.0</div>
    </aside>
  </>
)

export default Sidebar
