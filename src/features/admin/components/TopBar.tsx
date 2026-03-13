interface TopBarProps {
  onMenuClick: () => void
}

const TopBar = ({ onMenuClick }: TopBarProps) => (
  <>
    {/* Mobile */}
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
      <div className="w-[34px] h-[34px] bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white text-[13px] font-bold">AU</span>
      </div>
    </div>

    {/* Desktop */}
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
        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <div className="text-[13px] font-semibold text-gray-900">Admin User</div>
            <div className="text-[11px] text-gray-400">admin@skinnavi.com</div>
          </div>
          <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-[13px] font-bold">AU</span>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default TopBar
