import { Droplets } from 'lucide-react'

export const Footer = () => (
  <>
    {/* Newsletter */}
    <div className="bg-blue-50 py-12 mt-16">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl px-8 py-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <h3 className="text-blue-400 font-bold text-xl text-center md:text-left flex-1">
          Subscribe Newsletters
        </h3>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="email"
            placeholder="Your email"
            className="border border-slate-200 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button className="bg-blue-400 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-1.5">
            Submit →
          </button>
        </div>
      </div>
    </div>

    {/* Footer links */}
    <footer className="bg-white border-t border-slate-100 py-6 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-6 text-xs text-slate-400">
          {['About Us', 'Explore', 'Offers', 'Best Sellers', 'Contact Us'].map((l) => (
            <a key={l} href="#" className="hover:text-slate-600 transition-colors">
              {l}
            </a>
          ))}
        </div>
        <div className="flex gap-3 text-slate-400">
          {['f', 't', 'v', '▶'].map((icon, i) => (
            <span
              key={i}
              className="w-7 h-7 bg-slate-100 rounded-md flex items-center justify-center text-xs cursor-pointer hover:bg-slate-200 transition-colors"
            >
              {icon}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-[11px] text-slate-400">© 2024 InterfaceMage. All rights reserved.</p>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
            <Droplets className="w-3 h-3 text-blue-400" />
          </div>
          <span className="font-black text-slate-700 text-sm">
            Skin<span className="text-blue-400">Navi</span>
          </span>
        </div>
        <div className="flex gap-4 text-[11px] text-slate-400 mt-2 md:mt-0">
          <a href="#" className="hover:text-slate-600">
            Terms of Service
          </a>
          <span>•</span>
          <a href="#" className="hover:text-slate-600">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  </>
)
