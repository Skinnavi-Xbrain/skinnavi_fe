import React, { useState, useEffect } from 'react';
import { 
  History, 
  CreditCard, 
  LogOut, 
  ChevronRight, 
  Loader2, 
  Calendar as CalendarIcon, 
  ScanLine, 
  Award,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/features/auth/services/auth.api';
import { toast } from '@/shared/hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const timer = setTimeout(() => {
        setUserData({
          name: 'Sarah Mitchell',
          email: 'sarah.mitchell@email.com',
          skinType: 'Combination Skin',
          memberSince: 'Jan 2024',
          totalScans: 47,
          plan: 'Premium',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
        });
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    };
    fetchUserData();
  }, []);

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      toast({ title: 'Logged Out', variant: 'success' });
      navigate('/login');
    } catch (error) {
      toast({ title: 'Logout Failed', variant: 'destructive' });
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-['Poppins']">
        <Loader2 className="w-10 h-10 animate-spin text-[#67AEFF]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Header Section */}
        <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-12 md:py-16 animate-fadeIn">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-3 animate-slideInRight">
            PROFILE
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm md:text-base">
            <a
              href="/"
              className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
            >
              Home
            </a>
            <span className="text-gray-400">&gt;&gt;</span>
            <span className="text-blue-500 font-medium">Profile</span>
          </nav>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[380px,1fr] gap-8 max-w-6xl mx-auto">
          
          {/* Left Side: Info Card */}
          <aside>
            <div className="bg-white rounded-[32px] p-8 shadow-sm border-2 border-[#C7E0FF] text-center relative">
              <div className="relative w-40 h-40 mx-auto mb-6">
                <img 
                  src={userData?.avatar} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-1">{userData?.name}</h2>
              <p className="text-gray-400 text-sm mb-6">{userData?.email}</p>

              <span className="inline-block bg-[#67AEFF] text-white text-xs font-bold px-5 py-2 rounded-full shadow-md mb-8">
                {userData?.skinType}
              </span>

              <div className="space-y-4 border-t border-[#C7E0FF]/50 pt-8 text-left">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 flex items-center gap-2"><CalendarIcon size={16} /> Member Since</span>
                  <span className="font-semibold text-gray-700">{userData?.memberSince}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 flex items-center gap-2"><ScanLine size={16} /> Total Scans</span>
                  <span className="font-semibold text-gray-700">{userData?.totalScans}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 flex items-center gap-2"><Award size={16} /> Current Plan</span>
                  <span className="font-bold text-[#10B981]">{userData?.plan}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Side: Menu Options */}
          <div className="space-y-6">
            <div className="mb-8 text-left">
              <h3 className="text-3xl font-bold text-[#67AEFF] mb-2 font-['Poppins']">My Profile</h3>
              <p className="text-gray-500">Manage your account and skincare journey</p>
            </div>
            {[
              { 
                icon: <CreditCard className="text-[#67AEFF]" />, 
                title: 'Subscription', 
                desc: 'Manage your plan and billing',
                link: '/subscription'
              },
              { 
                icon: <LogOut className="text-[#67AEFF]" />, 
                title: 'Log Out', 
                desc: 'Sign out of your SkinNavi account',
                action: () => setIsLogoutModalOpen(true)
              }
            ].map((item, index) => (
              <div 
                key={index}
                onClick={() => item.action ? item.action() : navigate(item.link!)}
                className="group flex items-center gap-6 bg-white p-6 rounded-[24px] border-2 border-[#C7E0FF] hover:border-[#67AEFF] transition-all cursor-pointer"
              >
                <div className="w-14 h-14 bg-[#EEF5FF] rounded-2xl flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#67AEFF] transition-colors">{item.title}</h4>
                  <p className="text-sm text-gray-400 line-clamp-1">{item.desc}</p>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-[#67AEFF]" size={24} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- STATIC POPUP (NO ANIMATION - NO LAG) --- */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px]">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-sm overflow-hidden font-['Poppins']">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#67AEFF]">
                {isLoggingOut ? <Loader2 className="animate-spin" size={40} /> : <AlertCircle size={40} />}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Sign Out?</h3>
              <p className="text-gray-500 mb-8 text-sm">Are you sure you want to log out of your session?</p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleConfirmLogout}
                  disabled={isLoggingOut}
                  className="w-full py-4 bg-[#67AEFF] text-white font-bold rounded-2xl hover:bg-[#5698e6] transition-colors disabled:opacity-50"
                >
                  {isLoggingOut ? 'Logging out...' : 'Yes, Log Me Out'}
                </button>
                <button 
                  onClick={() => setIsLogoutModalOpen(false)}
                  disabled={isLoggingOut}
                  className="w-full py-4 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        
      )}
       <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out backwards; }
      `}</style>
    </div>
  );
}

export default Profile;