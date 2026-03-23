import React from 'react';
import { Star, Clock, Calendar, ChevronRight, ShieldCheck, Receipt, XCircle } from 'lucide-react';
import { RoutinePackages } from '@/features/analysis-result/components/RoutinePackages';
import type { BillingHistory } from '../types';

const Subscription = () => {
  const history: BillingHistory[] = [
    { id: 'INV-2026-003', planName: 'Premium Monthly', amount: '$19.99', paymentDate: 'Mar 01, 2026' },
    { id: 'INV-2026-002', planName: 'Premium Monthly', amount: '$19.99', paymentDate: 'Feb 01, 2026' },
    { id: 'INV-2026-001', planName: 'Premium Monthly', amount: '$19.99', paymentDate: 'Jan 01, 2026' },
  ];

  const handleCancelPlan = () => {
    if (confirm("Are you sure you want to cancel your premium plan? You will lose access to premium features at the end of your billing cycle.")) {
      console.log("Plan cancelled");
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24 font-['Poppins'] text-slate-900 overflow-x-hidden">
      
      {/* 1. Header Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-3 uppercase tracking-tight">
            SUBSCRIPTION
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm md:text-base">
            <a href="/" className="text-gray-600 hover:text-blue-500 transition-colors font-medium">Home</a>
            <ChevronRight size={12} className="text-slate-300" />
            <a href="/profile" className="text-gray-600 hover:text-blue-500 transition-colors font-medium">Profile</a>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-blue-500 font-semibold">Subscription</span>
          </nav>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-16">
        
        {/* 2. Current Status Card */}
        <div className="relative bg-white rounded-[32px] p-8 md:p-10 mb-20 border-2 border-blue-100 shadow-[0_20px_50px_rgba(59,130,246,0.05)] ring-4 ring-blue-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="absolute -top-3.5 left-10 bg-blue-600 text-white text-[10px] font-black px-5 py-1.5 rounded-full flex items-center gap-2 shadow-lg tracking-widest uppercase z-20">
            <ShieldCheck className="w-3 h-3" /> Current Plan
          </div>

          <div className="flex items-start gap-8 relative z-10 flex-grow">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-[24px] flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-100">
              <Star fill="white" size={32} />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Premium Monthly</h2>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-[10px] font-black uppercase">
                  Active
                </div>
              </div>
              <div className="flex flex-wrap gap-x-10 gap-y-4 mb-6 lg:mb-0">
                <div className="flex items-center gap-3">
                  <Calendar size={15} className="text-blue-500" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Started: <span className="text-slate-800 ml-1">Mar 01, 2026</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={15} className="text-blue-500" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Expires: <span className="text-slate-800 ml-1">Apr 01, 2026</span></span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 lg:w-[300px]">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-xs text-slate-500 italic">
              "Your skincare journey is well-tracked. Keep up the consistent routine for the best results!"
            </div>
            <button 
              onClick={handleCancelPlan}
              className="group flex items-center justify-center gap-2 py-3 px-6 rounded-2xl border-2 border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all duration-300 text-[11px] font-black uppercase tracking-widest"
            >
              <XCircle size={14} className="group-hover:rotate-90 transition-transform duration-300" />
              Cancel Subscription
            </button>
          </div>
        </div>

        {/* 3. Routine Plans Section */}
        <div className="mb-18">
          <RoutinePackages />
        </div>

        {/* 4. Payment & History Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT: Payment Method */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 px-2 mb-6">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.1em]">Payment Method</h3>
            </div>
            <div className="relative bg-white p-9 rounded-[32px] border-2 border-blue-100 flex flex-col flex-grow justify-between">
              <div className="absolute -top-3.5 left-8 bg-blue-600 text-white text-[10px] font-black px-5 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-md">
                Linked Account
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-black text-sm italic shadow-md shadow-blue-100">VN</div>
                    <div>
                      <span className="font-extrabold text-base text-slate-900 block uppercase tracking-tighter">VNPay Wallet</span>
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Verified Account</span>
                    </div>
                  </div>
                  <ShieldCheck className="text-blue-500 w-7 h-7" strokeWidth={2.5} />
                </div>
                
                <p className="text-[13px] text-slate-500 leading-relaxed bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50 italic font-medium">
                  "Your account is secured via VNPay. Please process your payment manually for each billing cycle to maintain your premium features."
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <span className="text-[10px] font-medium text-slate-300 uppercase tracking-widest italic">
                  Secure transactions powered by VNPay
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Billing History */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-3 px-2 mb-6">
              <Receipt className="text-blue-500 w-5 h-5" strokeWidth={1.5} />
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.1em]">Billing History</h3>
            </div>
            
            <div className="bg-white rounded-[32px] border-2 border-slate-200 shadow-sm flex-grow flex flex-col overflow-hidden">
              <div className="flex-grow">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b-2 border-slate-200">
                      <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Plan</th>
                      <th className="px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                      <th className="px-8 py-5 text-right text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-slate-100">
                    {history.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            {/* Đã xóa dòng hiển thị ID tại đây */}
                            <span className="text-sm font-medium text-slate-700">{item.planName}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-semibold text-blue-600">
                            {item.amount}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="text-xs text-slate-500 font-medium italic">
                            {item.paymentDate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="py-4 bg-slate-50/50 text-center border-t-2 border-slate-200">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest italic">
                  End of billing records
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Subscription;