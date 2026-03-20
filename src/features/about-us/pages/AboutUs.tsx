import React from 'react'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import DongImg from '@/shared/assets/images/OurTeam/Dong.jpg'
import HangImg from '@/shared/assets/images/OurTeam/Hang.jpg'
import HiepImg from '@/shared/assets/images/OurTeam/Hiep.jpg'
import TienImg from '@/shared/assets/images/OurTeam/Tien.jpg'
import {
  Github,
  Linkedin,
  Sparkles,
  Heart,
  ArrowUpRight,
  Fingerprint,
  Layers,
  Zap,
  CheckCircle2
} from 'lucide-react'

const teamMembers = [
  {
    name: 'Ka Phu Dong',
    role: 'Project Manager',
    image: DongImg,
    github: 'https://github.com/KaPhuDong'
  },
  {
    name: 'Bho Nuoch Thi Hoai Tien',
    role: 'Frontend Developer',
    image: TienImg,
    github: 'https://github.com/HoaiTien05'
  },
  {
    name: 'Vi Thi Hang',
    role: 'QA Engineer',
    image: HangImg,
    github: 'https://github.com/viwhnga'
  },
  {
    name: 'Ho Van Hiep',
    role: 'Backend Developer',
    image: HiepImg,
    github: 'https://github.com/MrChick205'
  }
]

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-[#1A1A1A] font-sans selection:bg-[#67AEFF] selection:text-white overflow-x-hidden">
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-12 md:py-16 animate-fadeIn">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-3 animate-slideInRight">
            ABOUT US
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm md:text-base animate-fadeIn">
            <a
              href="/"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
            >
              Home
            </a>
            <span className="text-gray-400">&gt;&gt;</span>
            <span className="text-blue-500 font-medium">About Us</span>
          </nav>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-16 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1 animate-slideUp">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] text-slate-900">
              Skin Intelligence. <br />
              <span className="text-blue-400 font-light italic block mt-2 md:mt-4 animate-slideInRight">
                Redefined.
              </span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-lg border-l-4 border-blue-100 pl-5">
              SkinNavi is an AI-powered universe designed to decode your skin's unique language. We
              bridge the gap between complex dermatology and daily self-care.
            </p>
            <ul className="space-y-3 pt-2">
              {['Accurate AI Analysis', 'Personalized Routines', 'Visual Progress Tracking'].map(
                (item, idx) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-semibold text-slate-700 animate-fadeIn"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  >
                    <CheckCircle2 size={18} className="text-blue-400 shrink-0" /> {item}
                  </li>
                )
              )}
            </ul>
            <button className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-blue-500 transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl">
              Start Your Journey{' '}
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6 relative order-1 lg:order-2 animate-fadeIn">
            <div className="space-y-4 md:space-y-6">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl border border-white">
                <img
                  src="https://i.pinimg.com/736x/2b/61/2d/2b612dab42da608746037483b05f269d.jpg"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  alt="Skincare"
                />
              </div>
              <div className="bg-blue-500 p-6 md:p-8 text-white rounded-[2rem] text-center shadow-blue-200 shadow-lg animate-slideUp">
                <Sparkles className="mx-auto mb-2" size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest block">
                  Precision AI
                </span>
              </div>
            </div>
            <div className="pt-8 md:pt-12 space-y-4 md:space-y-6">
              <div className="bg-slate-900 p-6 md:p-8 text-white rounded-[2rem] text-center shadow-slate-300 shadow-lg animate-slideUp">
                <Heart className="mx-auto mb-2 text-blue-400" size={24} fill="currentColor" />
                <span className="text-[10px] font-bold uppercase tracking-widest block">
                  User First
                </span>
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl border border-white">
                <img
                  src="https://i.pinimg.com/736x/cb/2b/a5/cb2ba532cc07da737b71f4e15290d691.jpg"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  alt="Routine"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50/50 py-16 md:py-24 px-4 md:px-16 rounded-[2.5rem] md:rounded-[3.5rem] mx-4 md:mx-12 mb-10 shadow-inner border border-blue-100/50 overflow-hidden animate-slideUp">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              The Minds Behind SkinNavi
            </h3>
            <div className="w-12 h-1 bg-blue-400 mx-auto rounded-full"></div>
            <p className="md:hidden text-[10px] text-slate-400 uppercase font-bold tracking-widest">
              Swipe to explore →
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto pb-8 md:pb-0 scrollbar-hide snap-x snap-mandatory px-2">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="min-w-[75vw] sm:min-w-[45vw] md:min-w-0 snap-center group"
              >
                <Card className="border-none bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <CardContent className="p-0 text-center lg:text-left">
                    <div className="relative aspect-[3/4] overflow-hidden transition-all duration-700">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <div className="flex gap-4">
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-blue-400 transition-colors"
                          >
                            <Github size={18} />
                          </a>
                          <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-blue-400 transition-colors">
                            <Linkedin size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4
                        className={`font-bold text-slate-900 group-hover:text-blue-500 transition-colors leading-snug break-words ${member.name.length > 20 ? 'text-[13px] md:text-[15.5px]' : 'text-sm md:text-base'}`}
                      >
                        {member.name}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {member.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-16 py-12 md:py-20">
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-10 md:pb-20 scrollbar-hide snap-x snap-mandatory px-2">
          {[
            {
              icon: Fingerprint,
              title: 'AI Skin Scanning',
              desc: 'Advanced computer vision analyzes facial markers with clinical precision.'
            },
            {
              icon: Layers,
              title: 'Smart Tracking',
              desc: 'Visualize your progress over time with data-driven history.'
            },
            {
              icon: Zap,
              title: 'Expert Routine',
              desc: 'Personalized product suggestions tailored to your unique biology.'
            }
          ].map((tech, i) => (
            <div
              key={i}
              className={`min-w-[85vw] md:min-w-0 snap-center group p-8 md:p-10 rounded-[2.5rem] bg-white border border-blue-50 hover:border-blue-400 hover:shadow-2xl transition-all duration-500 animate-slideUp`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-400 group-hover:bg-blue-400 group-hover:text-white transition-all duration-500 mb-8 shadow-sm">
                <tech.icon size={30} strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-blue-500 transition-colors tracking-tight">
                {tech.title}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed font-medium group-hover:text-slate-600 transition-colors">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="relative group cursor-pointer border border-blue-100 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 animate-fadeIn bg-white">
          <div className="max-w-xl space-y-6 text-center lg:text-left">
            <Badge
              variant="outline"
              className="border-blue-100 text-blue-400 group-hover:text-blue-500 group-hover:border-blue-500 px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold transition-colors"
            >
              Integrated Marketplace
            </Badge>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1] text-slate-900">
              Trusted Care, <br />
              <span className="text-slate-200 group-hover:text-blue-400 transition-colors duration-700">
                One Click Away.
              </span>
            </h3>
            <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed group-hover:text-slate-500 transition-colors">
              Reliable products recommended specifically for your skin type, curated by our AI
              engine.
            </p>
          </div>
          <button className="h-20 w-20 md:h-32 md:w-32 rounded-full bg-slate-900 group-hover:bg-blue-400 text-white flex items-center justify-center transition-all duration-500 shadow-2xl active:scale-95 group-hover:rotate-12">
            <ArrowUpRight size={40} strokeWidth={1} />
          </button>

          <div className="absolute -right-10 -bottom-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
            <Fingerprint size={300} strokeWidth={0.5} />
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out; }
        .animate-slideUp { animation: slideUp 0.8s ease-out backwards; }
        
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}

export default AboutPage
