import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Eye, Trash2, Loader2, ShieldCheck, User as UserIcon, Edit3 } from 'lucide-react'
import type { UserAPI, UserTableProps } from '../types/user'
import { getAdminUsers, updateAdminUserRole, deleteAdminUser } from '../services/user.api'
import { toast } from '@/shared/hooks/use-toast'

// --- Interfaces & Types ---

interface ThemeConfig {
  primary: string
  bgLight: string
  border: string
  textMuted: string
  danger: string
  purple: string
}

const THEME: ThemeConfig = {
  primary: '#67AEFF',
  bgLight: '#F5F9FF',
  border: '#EEF4FF',
  textMuted: '#9CA3AF',
  danger: '#EF4444',
  purple: '#8B5CF6'
}

type ModalType = 'view' | 'delete' | 'editRole'

interface ModalConfig {
  icon: React.ReactNode
  color: string
  bg: string
  title: string
  btn: string
}

interface ActionButtonProps {
  icon: React.ReactNode
  color: string
  hoverBg: string
  onClick: () => void
}

interface DetailRowProps {
  label: string
  value: string | null | undefined
  color?: string
  bold?: boolean
  isEmail?: boolean
}

// --- Helper Functions ---

const PASTEL_COLORS = [
  { bg: '#E0F2FE', text: '#0369A1' },
  { bg: '#F0FDF4', text: '#166534' },
  { bg: '#FEF9C3', text: '#854D0E' },
  { bg: '#FAF5FF', text: '#6B21A8' },
  { bg: '#FFF1F2', text: '#9F1239' },
  { bg: '#ECFEFF', text: '#0891B2' },
  { bg: '#F5F3FF', text: '#5B21B6' },
  { bg: '#FFF7ED', text: '#9A3412' }
]

const getPlanColor = (planName: string) => {
  if (!planName || planName === 'No Plan') return { bg: '#F3F4F6', text: '#6B7280' }
  const hash = planName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return PASTEL_COLORS[Math.abs(hash) % PASTEL_COLORS.length]
}

const formatDate = (dateStr: string | null) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    : 'N/A'

const getInitials = (name: string) =>
  name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U'

// --- Main Component ---

const UserTable: React.FC<UserTableProps> = ({ currentPage, itemsPerPage, onDataLoaded }) => {
  const [users, setUsers] = useState<UserAPI[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modal, setModal] = useState<{
    type: ModalType | null
    user: UserAPI | null
  }>({ type: null, user: null })
  const [actionLoading, setActionLoading] = useState(false)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getAdminUsers(currentPage || 1, itemsPerPage)
      setUsers(data.items)
      onDataLoaded?.(data.pagination.total)
    } catch (error) {
      console.error('Failed to fetch users:', error)
      toast({ title: 'Error', description: 'Failed to load users list.', variant: 'destructive' })
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, itemsPerPage, onDataLoaded])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleConfirmAction = async () => {
    const { type, user } = modal
    if (!user || !type || type === 'view') {
      setModal({ type: null, user: null })
      return
    }

    setActionLoading(true)
    try {
      if (type === 'editRole') {
        const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN'
        await updateAdminUserRole(user.id, newRole)
        setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u)))
        toast({
          title: 'Role Updated',
          description: `Updated ${user.fullName} successfully.`,
          variant: 'success'
        })
      } else if (type === 'delete') {
        await deleteAdminUser(user.id)
        setUsers((prev) => prev.filter((u) => u.id !== user.id))
        toast({
          title: 'User Deleted',
          description: `User ${user.fullName} has been removed.`,
          variant: 'success'
        })
      }
    } catch {
      toast({ title: 'Action Failed', description: 'An error occurred.', variant: 'destructive' })
    } finally {
      setActionLoading(false)
      setModal({ type: null, user: null })
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="animate-spin text-[#67AEFF]" size={40} />
        <p className="text-sm font-medium text-gray-400">Loading users data...</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '16px', overflowX: 'auto', position: 'relative' }}>
      <table
        style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: '800px' }}
      >
        <thead>
          <tr>
            {['#', 'Name', 'Role', 'Email', 'Plan', 'Action'].map((head) => (
              <th
                key={head}
                style={{ ...thStyle, textAlign: head === 'Action' ? 'right' : 'left' }}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserRow
              key={user.id}
              index={(currentPage - 1) * itemsPerPage + index + 1}
              user={user}
              onAction={(type) => setModal({ type, user })}
            />
          ))}
        </tbody>
      </table>

      {modal.type && modal.user && (
        <Modal
          type={modal.type}
          user={modal.user}
          loading={actionLoading}
          onClose={() => !actionLoading && setModal({ type: null, user: null })}
          onConfirm={handleConfirmAction}
        />
      )}
    </div>
  )
}

// --- Sub-components ---

const UserRow = ({
  user,
  index,
  onAction
}: {
  user: UserAPI
  index: number
  onAction: (type: ModalType) => void
}) => {
  const isAdmin = user.role === 'ADMIN'
  const planName = user.subscription?.packageName || 'No Plan'
  const planColor = useMemo(() => getPlanColor(planName), [planName])
  const avatarStyle = useMemo(() => {
    const charCodeSum = user.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return PASTEL_COLORS[Math.abs(charCodeSum) % PASTEL_COLORS.length]
  }, [user.id])

  return (
    <tr className="hover:bg-[#F5F9FF] transition-colors group">
      <td style={tdStyle}>
        <span className="text-[12px] text-gray-400 font-medium">
          {String(index).padStart(2, '0')}
        </span>
      </td>
      <td style={{ ...tdStyle, maxWidth: '200px' }}>
        <div className="flex items-center gap-3">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              className="w-8 h-8 rounded-full shrink-0 object-cover"
            />
          ) : (
            <div
              className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold"
              style={{ backgroundColor: avatarStyle.bg, color: avatarStyle.text }}
            >
              {getInitials(user.fullName)}
            </div>
          )}
          <span className="text-[13px] font-semibold text-gray-700 truncate" title={user.fullName}>
            {user.fullName}
          </span>
        </div>
      </td>
      <td style={tdStyle}>
        <div
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border ${isAdmin ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-gray-50 text-gray-500 border-gray-100'}`}
        >
          {isAdmin ? (
            <ShieldCheck size={11} strokeWidth={2.5} />
          ) : (
            <UserIcon size={11} strokeWidth={2.5} />
          )}
          {user.role}
        </div>
      </td>
      <td style={{ ...tdStyle, maxWidth: '220px' }}>
        <span className="text-[12px] text-gray-500 truncate block" title={user.email}>
          {user.email}
        </span>
      </td>
      <td style={tdStyle}>
        <span
          className="px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap"
          style={{ backgroundColor: planColor.bg, color: planColor.text }}
        >
          {planName}
        </span>
      </td>
      <td style={{ ...tdStyle, textAlign: 'right' }}>
        <div className="flex justify-end gap-1">
          <ActionButton
            icon={<Eye size={16} />}
            color={THEME.primary}
            hoverBg={THEME.border}
            onClick={() => onAction('view')}
          />
          <ActionButton
            icon={<Edit3 size={16} />}
            color={THEME.primary}
            hoverBg="#E0F2FE"
            onClick={() => onAction('editRole')}
          />
          <ActionButton
            icon={<Trash2 size={16} />}
            color={THEME.danger}
            hoverBg="#FEF2F2"
            onClick={() => onAction('delete')}
          />
        </div>
      </td>
    </tr>
  )
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, color, hoverBg, onClick }) => (
  <button
    onClick={onClick}
    className="w-8 h-8 flex items-center justify-center rounded-lg transition-all text-[#94A3B8] active:scale-90"
    style={{ border: 'none', background: 'transparent' }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = hoverBg
      e.currentTarget.style.color = color
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent'
      e.currentTarget.style.color = '#94A3B8'
    }}
  >
    {icon}
  </button>
)

const Modal = ({
  type,
  user,
  loading,
  onClose,
  onConfirm
}: {
  type: ModalType
  user: UserAPI
  loading: boolean
  onClose: () => void
  onConfirm: () => void
}) => {
  const isView = type === 'view'
  const isEdit = type === 'editRole'

  const config: ModalConfig = {
    view: {
      icon: <UserIcon size={22} />,
      color: THEME.primary,
      bg: THEME.bgLight,
      title: 'User Details',
      btn: 'Close'
    },
    delete: {
      icon: <Trash2 size={22} />,
      color: THEME.danger,
      bg: '#FEE2E2',
      title: 'Delete User',
      btn: 'Confirm'
    },
    editRole: {
      icon: <Edit3 size={22} />,
      color: THEME.primary,
      bg: '#E0F2FE',
      title: 'Change Role',
      btn: 'Update Role'
    }
  }[type]

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-[380px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="max-h-[85vh] overflow-y-auto">
          <div className="p-6 pb-2 text-center">
            <div
              style={{ background: config.bg, color: config.color }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : config.icon}
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">{config.title}</h3>
          </div>

          <div className="p-6 pt-2">
            {isView ? (
              <div className="text-[13px] space-y-1 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <DetailRow label="Full Name" value={user.fullName} bold />
                <DetailRow
                  label="Role"
                  value={user.role}
                  color={user.role === 'ADMIN' ? THEME.purple : ''}
                  bold
                />
                <DetailRow label="Email Address" value={user.email} isEmail />
                <DetailRow
                  label="Current Plan"
                  value={user.subscription?.packageName}
                  color={THEME.primary}
                  bold
                />
                <DetailRow
                  label="Start Date"
                  value={formatDate(user.subscription?.startDate ?? null)}
                />
                <DetailRow
                  label="End Date"
                  value={formatDate(user.subscription?.endDate ?? null)}
                />
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-[15px] text-gray-500 leading-relaxed">
                  {isEdit ? (
                    <>
                      Change{' '}
                      <span className="font-bold text-gray-900 break-words underline decoration-gray-200">
                        {user.fullName}
                      </span>
                      's role to <b>{user.role === 'ADMIN' ? 'USER' : 'ADMIN'}</b>?
                    </>
                  ) : (
                    <>
                      Permanently delete{' '}
                      <span className="font-bold text-gray-900 break-words underline decoration-red-100">
                        {user.fullName}
                      </span>
                      ?{' '}
                      <span className="block text-xs text-red-400 mt-1 italic font-medium">
                        This action cannot be undone.
                      </span>
                    </>
                  )}
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              {!isView && (
                <button
                  disabled={loading}
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
              <button
                disabled={loading}
                onClick={isView ? onClose : onConfirm}
                style={{ background: config.color }}
                className="flex-1 py-3 rounded-xl text-white font-bold text-sm shadow-lg shadow-black/5 hover:brightness-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {config.btn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, color, bold, isEmail }) => (
  <div className="flex justify-between items-start py-2 border-b border-gray-100/50 last:border-0 gap-4">
    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider shrink-0 mt-0.5">
      {label}
    </span>
    <span
      style={{ color: color || '#374151' }}
      className={`text-right text-[13px] leading-tight ${bold ? 'font-bold' : 'font-medium'} ${isEmail ? 'break-all' : 'break-words'} flex-1`}
    >
      {value || '—'}
    </span>
  </div>
)

// --- Styles ---

const thStyle: React.CSSProperties = {
  padding: '12px',
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  color: '#94A3B8',
  borderBottom: '1px solid #EEF4FF',
  whiteSpace: 'nowrap'
}

const tdStyle: React.CSSProperties = {
  padding: '14px 12px',
  borderBottom: '1px solid #EEF4FF',
  verticalAlign: 'middle'
}

export default UserTable
