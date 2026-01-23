import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
  imageSrc: string
}

export const AuthLayout = ({ children, imageSrc }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex bg-slate-50 items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        <div className="hidden md:block md:w-1/2 relative bg-[#f3f4f6]">
          <img src={imageSrc} alt="Auth Illustration" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-blue-50/10"></div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-[#f8faff]">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
