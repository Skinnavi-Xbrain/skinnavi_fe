import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
  imageSrc: string
}

export const AuthLayout = ({ children, imageSrc }: AuthLayoutProps) => {
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-slate-50">
      <div className="w-full h-full bg-white shadow-xl overflow-hidden flex flex-col md:flex-row bg-[#f3f4f6]">
        {/* IMAGE */}
        <div className="hidden md:block md:w-[40%] relative bg-[#f3f4f6]">
          <img src={imageSrc} alt="Auth Illustration" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-blue-50/10" />
        </div>

        {/* FORM */}
        <div className="w-full md:w-[60%] flex items-center justify-center bg-[#f8faff]">
          <div className="w-full md:w-[65%] bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
