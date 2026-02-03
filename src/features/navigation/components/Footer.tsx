import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import Logo from '@/shared/assets/images/Logo_Skinnavi.jpg'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#F0F7FF] via-[#F8FBFF] to-white overflow-hidden font-sans">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-12 -right-12 w-64 h-64 md:w-80 md:h-80 bg-[#67AEFF]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 md:w-80 md:h-80 bg-[#67AEFF]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-10 md:py-14 border-b border-[#67AEFF]/20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl md:text-3xl font-black tracking-tight text-slate-900 mb-3 px-4">
              Stay Connected with <span className="text-[#67AEFF]">SkinNavi</span>
            </h3>
            <p className="text-slate-600 mb-6 md:mb-8 text-base md:text-lg px-2">
              Get updates on new products and exclusive skincare tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 px-4 sm:px-0">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full h-12 md:h-14 px-6 bg-white border-[#67AEFF]/30 focus:border-[#67AEFF] focus:ring-2 focus:ring-[#67AEFF]/20 text-base rounded-xl md:rounded-2xl shadow-sm transition-all"
              />
              <Button 
                className="w-full sm:w-auto h-12 md:h-14 px-10 bg-[#67AEFF] hover:bg-[#5BA0EB] text-white text-base font-bold rounded-xl md:rounded-2xl shadow-lg shadow-[#67AEFF]/25 transition-all duration-300 active:scale-95"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-center text-center md:items-start md:text-left">
            <img 
              src={Logo} 
              alt="Skinnavi" 
              className="h-12 w-auto rounded-xl shadow-md border border-white" 
            />
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium max-w-xs">
              Your trusted companion for personalized skincare solutions. Discover your natural glow with our AI technology.
            </p>
            <div className="flex gap-3 md:gap-4">
              {[
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Youtube, href: '#', label: 'Youtube' }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white border border-[#67AEFF]/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#67AEFF] hover:border-[#67AEFF] shadow-sm transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Columns */}
          {[
            {
              title: 'Company',
              links: ['About Us', 'Careers', 'Press Release', 'Our Blog']
            },
            {
              title: 'Products',
              links: ['AI Scan', 'Skin Quiz', 'Best Sellers', 'New Arrivals']
            },
            {
              title: 'Support',
              links: ['Help Center', 'Privacy Policy', 'Shipping Info', 'Returns']
            }
          ].map((column) => (
            <div key={column.title} className="text-center md:text-left md:ml-8">
              <h4 className="text-base md:text-lg font-bold text-slate-900 mb-5 md:mb-6 tracking-wide">
                {column.title}
              </h4>
              <ul className="space-y-3 md:space-y-4">
                {column.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-slate-600 text-sm md:text-base font-medium hover:text-[#67AEFF] transition-colors duration-200 inline-flex items-center group"
                    >
                      <span className="hidden md:block bg-[#67AEFF] w-0 h-0.5 mr-0 transition-all duration-300 group-hover:w-4 group-hover:mr-2"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 md:py-8 border-t border-[#67AEFF]/20">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-xs md:text-sm font-semibold text-center">
              © 2026 <span className="text-[#67AEFF]">SkinNavi</span>. Crafted for your beauty.
            </p>
            <div className="flex gap-6 md:gap-8 items-center text-xs md:text-sm font-semibold">
              <a href="#" className="text-slate-500 hover:text-[#67AEFF] transition-colors">Terms</a>
              <a href="#" className="text-slate-500 hover:text-[#67AEFF] transition-colors">Privacy</a>
              <a href="#" className="text-slate-500 hover:text-[#67AEFF] transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}