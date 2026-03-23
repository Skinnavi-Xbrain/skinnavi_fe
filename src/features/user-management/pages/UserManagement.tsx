import React, { useState, useRef, useCallback } from 'react'
import Sidebar from '../../admin/components/Sidebar'
import TopBar from '../../admin/components/TopBar'
import UserTable from '../components/UserTable'
import { X, UserPlus, Loader2, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react'
import { toast } from '@/shared/hooks/use-toast'
import { createAdminUser } from '../services/user.api'

const UserManagement: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const itemsPerPage = 10
  const totalPages = Math.ceil(totalUsers / itemsPerPage)

  const [refreshKey, setRefreshKey] = useState(0)

  const handleDataLoaded = useCallback((total: number) => {
    setTotalUsers(total)
  }, [])

  const mapToBackendPayload = (formData: FormData) => ({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    fullName: formData.get('fullName') as string,
    role: (formData.get('role') as string).toUpperCase() as 'ADMIN' | 'USER'
  })

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const payload = mapToBackendPayload(formData)

    setIsSubmitting(true)
    try {
      await createAdminUser(payload)

      toast({
        title: 'Success',
        description: 'User created successfully!',
        variant: 'success'
      })

      setIsAddModalOpen(false)
      setCurrentPage(1)
      setRefreshKey((prev) => prev + 1)
      formRef.current.reset()
      setShowPassword(false)
    } catch (error: unknown) {
      console.error('Create User Error:', error)
      toast({
        title: 'Failed to Create User',
        description:
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Failed to create user. Please check your data.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-4 focus:ring-[#67AEFF]/10 focus:border-[#67AEFF] transition-all font-['Poppins'] bg-gray-50/50"
  const labelClass =
    "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-['Poppins']"

  return (
    <div
      className="flex bg-slate-50 min-h-screen w-full overflow-x-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 w-full md:ml-[220px] flex flex-col min-h-screen relative">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <div className="text-left">
              <h1 className="text-xl md:text-[24px] font-bold text-gray-900">User Management</h1>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Manage and monitor all SkinNavi registered users
              </p>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto bg-[#67AEFF] hover:bg-[#5698e6] text-white px-6 py-3.5 md:py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-100"
            >
              <UserPlus size={16} />
              Add New User
            </button>
          </div>

          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden flex flex-col flex-1">
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <UserTable
                key={refreshKey}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onDataLoaded={handleDataLoaded}
              />
            </div>

            <div className="px-4 md:px-8 py-4 md:py-5 border-t border-gray-50 flex items-center justify-between bg-white">
              <span className="text-[12px] md:text-[13px] font-medium text-gray-400">
                Page <span className="text-gray-900 font-bold">{currentPage}</span> of{' '}
                {totalPages || 1}
              </span>

              <div className="flex gap-2 md:gap-3">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="p-2 md:p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
                >
                  <ChevronLeft size={18} className="text-gray-600" />
                </button>

                <button
                  disabled={currentPage >= (totalPages || 1)}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="p-2 md:p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
                >
                  <ChevronRight size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="px-6 pt-6 pb-2 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Add New User</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              <form ref={formRef} onSubmit={handleAddUser} className="p-6 space-y-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    name="fullName"
                    required
                    placeholder="Enter full name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="Enter email address"
                    className={inputClass}
                  />
                </div>

                <div className="relative">
                  <label className={labelClass}>Password</label>
                  <input
                    name="password"
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[34px] text-gray-400 hover:text-[#67AEFF] transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div>
                  <label className={labelClass}>Assign Role</label>
                  <select
                    name="role"
                    className={`${inputClass} appearance-none bg-no-repeat bg-right-4`}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#67AEFF] hover:bg-[#5698e6] text-white rounded-xl font-bold transition-all active:scale-[0.98] flex justify-center items-center gap-2 shadow-lg shadow-blue-100 disabled:grayscale"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default UserManagement
