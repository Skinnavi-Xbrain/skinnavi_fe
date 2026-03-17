import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import UserTable from '../components/UserTable';
import { 
  X, UserPlus, Loader2, ChevronLeft, ChevronRight, Users, ShieldCheck, CheckCircle2, AlertCircle 
} from 'lucide-react';

const UserManagement: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalUsers = 20; 
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

  const showMsg = (msg: string, type: 'success' | 'error') => {
    setNotification({ show: true, message: msg, type });
  };

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsAddModalOpen(false);
    showMsg("User created successfully!", "success");
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-4 focus:ring-[#67AEFF]/10 focus:border-[#67AEFF] transition-all font-['Poppins']";
  const labelClass = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-['Poppins']";

  return (
    <div className="flex bg-slate-50 min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 md:ml-[220px] flex flex-col min-h-screen relative">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        {/* --- TOAST NOTIFICATION --- */}
        {notification.show && (
          <div className="fixed top-6 right-6 z-[200] animate-in slide-in-from-right-10 duration-300">
            <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border bg-white ${notification.type === 'success' ? 'border-green-100' : 'border-red-100'}`}>
              {notification.type === 'success' ? <CheckCircle2 className="text-green-500" size={20} /> : <AlertCircle className="text-red-500" size={20} />}
              <span className="text-sm font-bold text-gray-700">{notification.message}</span>
              <button onClick={() => setNotification(prev => ({ ...prev, show: false }))} className="ml-2 text-gray-400"><X size={16} /></button>
            </div>
          </div>
        )}

        <div className="p-6 max-w-[1600px] mx-auto w-full flex-1 flex flex-col">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div className="text-left">
              <h1 className="text-xl md:text-[22px] font-bold text-gray-900">User Management</h1>
              <p className="text-sm text-gray-500 mt-1">Manage and monitor all SkinNavi registered users</p>
            </div>
            
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg"
            >
              <UserPlus size={16} />
              Add New User
            </button>
          </div>

          {/* --- TABLE CONTAINER (GIỐNG PRODUCT) --- */}
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden flex flex-col flex-1">
            <div className="flex-1 overflow-x-auto">
              <UserTable startIndex={startIndex} itemsPerPage={itemsPerPage} />
            </div>

            {/* --- PAGINATION CONTROLS (INSIDE CONTAINER) --- */}
            <div className="px-8 py-5 border-t border-gray-50 flex items-center justify-between bg-white">
              <span className="text-[13px] font-medium text-gray-400">
                Page <span className="text-gray-900 font-bold">{currentPage}</span> of {totalPages || 1}
              </span>
              <div className="flex gap-3">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
                >
                  <ChevronLeft size={18} className="text-gray-600" />
                </button>
                <button 
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
                >
                  <ChevronRight size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- ADD USER MODAL --- */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 text-left">
                <h3 className="text-xl font-bold text-gray-800">Add New User</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              <form onSubmit={handleAddUser} className="p-8 space-y-6 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input required type="text" className={inputClass} placeholder="e.g. Emma Johnson" />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input required type="email" className={inputClass} placeholder="emma@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Role</label>
                    <select className={inputClass}><option>User</option><option>Admin</option></select>
                  </div>
                  <div>
                    <label className={labelClass}>Plan</label>
                    <select className={inputClass}><option>Starter</option><option>Essential</option><option>Advanced</option></select>
                  </div>
                </div>
                <div className="mt-8 flex gap-3">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3.5 rounded-2xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all font-['Poppins']">Cancel</button>
                  <button type="submit" className="flex-1 py-3.5 rounded-2xl bg-[#67AEFF] text-white font-bold shadow-lg shadow-blue-100 hover:bg-[#5698e6] transition-all font-['Poppins'] flex items-center justify-center gap-2">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Create Account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserManagement;