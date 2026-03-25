import { Calendar as CalendarIcon, User } from 'lucide-react'
import type { UserProfileData, SkinTypeData } from '../types/profile'

interface ProfileInfoProps {
  user: UserProfileData
  skinType: SkinTypeData | string
}

export const ProfileInfo = ({ user, skinType }: ProfileInfoProps) => {
  const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  })

  return (
    <aside>
      <div className="bg-white rounded-[32px] p-8 shadow-sm border-2 border-[#C7E0FF] text-center relative">
        <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center bg-slate-50 rounded-full border-4 border-white shadow-lg overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="w-20 h-20 text-slate-300" />
          )}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.fullName}</h2>
        <p className="text-sm text-gray-500 break-all leading-tight pb-3">{user.email}</p>
        <span className="inline-block bg-[#67AEFF] text-white text-xs font-bold px-5 py-2 rounded-full shadow-md mb-8">
          {typeof skinType === 'string' ? skinType : skinType.name}
        </span>

        <div className="space-y-4 border-t border-[#C7E0FF]/50 pt-8 text-left">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 flex items-center gap-2">
              <CalendarIcon size={16} /> Member Since
            </span>
            <span className="font-semibold text-gray-700">{memberSince}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
