import React from 'react';
import { Star, Clock, Calendar, ChevronRight, ShieldCheck } from 'lucide-react';
import { RoutinePackages } from '@/features/analysis-result/components/RoutinePackages';

interface BillingHistory {
  id: string;
  planName: string;
  amount: string;
  paymentDate: string;
}

const Subscription = () => {
  const history: BillingHistory[] = [
    { id: 'INV-2026-003', planName: 'Premium Monthly', amount: '$19.99', paymentDate: 'Mar 01, 2026' },
    { id: 'INV-2026-002', planName: 'Premium Monthly', amount: '$19.99', paymentDate: 'Feb 01, 2026' },
    { id: 'INV-2026-001', planName: 'Premium Monthly', amount: '$19.99', paymentDate: 'Jan 01, 2026' },
  ];

  return (
    /* Áp dụng Nền Gradient nhẹ nhàng như bạn mong muốn */
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-12 font-['Poppins'] text-slate-900">
      
      {/* 1. Header Section - Trở nên trong suốt để lộ nền gradient */}
      <section className="py-8 md:py-12 text-center animate-fadeIn">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight uppercase italic">
          Subscription
        </h1>
        <nav className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]">
          <a href="/" className="text-slate-400 hover:text-blue-500 transition-colors">Home</a>
          <ChevronRight size={12} className="text-slate-300" />
          <a href="/profile" className="text-slate-400 hover:text-blue-500 transition-colors">Profile</a>
          <ChevronRight size={12} className="text-slate-300" />
          <span className="text-blue-500 font-black">Subscription</span>
        </nav>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto mt-4">
        
        {/* 2. Current Status Card - Trắng tinh khiết nổi trên nền gradient */}
        <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-white p-8 md:p-10 mb-16 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition-all hover:shadow-xl hover:shadow-blue-200/20">
          <div className="flex items-start gap-6 md:gap-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-400 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200">
              <Star fill="white" size={30} />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-3">
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Premium Monthly</h2>
                <span className="px-3.5 py-1 bg-emerald-500 text-white text-[9px] font-black rounded-full uppercase tracking-widest shadow-sm shadow-emerald-100">
                  Active
                </span>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-blue-400" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Started: <span className="text-slate-800 ml-1">March 01, 2026</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-blue-400" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Expires: <span className="text-slate-800 ml-1">April 01, 2026</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:border-l border-slate-100 lg:pl-10 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-blue-500">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Premium Account</span>
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[240px]">
              Enjoying full access to AI SkinAnalysis and custom routines.
            </p>
          </div>
        </div>

        {/* 3. Routine Plans Section */}
        <div className="mb-20">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-xl font-extrabold text-slate-800 uppercase tracking-[0.3em] mb-3">Available Plans</h2>
            <div className="w-10 h-1 bg-gradient-to-r from-blue-500 to-purple-400 rounded-full"></div>
          </div>
          <RoutinePackages />
        </div>

        {/* 4. Payment & History - Compact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Payment Method (VNPay Focus) */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Payment Method</h3>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white hover:border-blue-200 transition-all shadow-sm group">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                   <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-[10px] italic shadow-md">VN</div>
                   <span className="font-extrabold text-sm tracking-tighter text-slate-800">VNPay Wallet</span>
                </div>
                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:animate-ping"></div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium mb-10 italic">
                Securely linked for your automated monthly renewals.
              </p>
              <div className="flex items-center gap-2 text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100">
                <ShieldCheck size={14} />
                Encrypted Connection
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-1">Billing History</h3>
            <div className="bg-white/70 backdrop-blur-sm rounded-[2.5rem] border border-white overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Plan</th>
                    <th className="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</th>
                    <th className="px-8 py-6 text-right text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-slate-700">{item.planName}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-blue-600">{item.amount}</span>
                      </td>
                      <td className="px-8 py-6 text-right font-medium italic">
                        <span className="text-xs text-slate-500 tracking-tight italic">
                          {item.paymentDate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Subscription;