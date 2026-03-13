import { Droplets, Bell } from 'lucide-react'

export const Navbar = () => (
  <nav className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
        <Droplets className="w-4 h-4 text-blue-500" />
      </div>
      <span className="font-black text-slate-800 text-lg">
        Skin<span className="text-blue-400">Navi</span>
      </span>
    </div>

    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
      {['Home', 'Routine', 'Tracking', 'About'].map((item) => (
        <a
          key={item}
          href="#"
          className={`hover:text-slate-800 transition-colors ${
            item === 'Tracking' ? 'text-slate-800 font-semibold' : ''
          }`}
        >
          {item}
        </a>
      ))}
    </div>

    <div className="flex items-center gap-3">
      <div className="relative">
        <Bell className="w-5 h-5 text-slate-400" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border-2 border-white" />
      </div>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 overflow-hidden">
        <img
          src="https://i.pravatar.cc/64?img=47"
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </nav>
)
