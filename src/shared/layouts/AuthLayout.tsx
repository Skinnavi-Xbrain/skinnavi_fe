import React from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
  imageSrc: string
}

export const AuthLayout = ({ children, imageSrc }: AuthLayoutProps) => {
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-slate-50">
      <div className="w-full h-full bg-white shadow-xl overflow-hidden flex flex-col md:flex-row bg-[#f3f4f6]">
        <div className="hidden md:block md:w-[35%] relative bg-[#f3f4f6]">
          <img src={imageSrc} alt="Auth Illustration" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-blue-50/10" />
          <div className="absolute inset-0 bg-blue-50/10" />
        </div>

        <div className="px-4 m-auto bg-white w-full md:w-[65%] flex items-center justify-center bg-[#f8faff]">
          <div className="w-full md:w-[65%] bg-white p-4 rounded-3xl border border-slate-100 shadow-[0_0_25px_rgba(59,130,246,0.35),0_10px_30px_rgba(59,130,246,0.2)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
