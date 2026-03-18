import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Eye, Trash2, Loader2, ShieldCheck, User as UserIcon, Edit3 } from 'lucide-react';
import type { UserAPI, UserTableProps } from '../types/user';
import { getAdminUsers, updateAdminUserRole, deleteAdminUser } from '../services/user.api';
import { toast } from '@/shared/hooks/use-toast';

const THEME = {
  primary: '#67AEFF',
  bgLight: '#F5F9FF',
  border: '#EEF4FF',
  textMuted: '#9CA3AF',
  danger: '#EF4444',
  purple: '#8B5CF6',
};

const PASTEL_COLORS = [
  { bg: '#E0F2FE', text: '#0369A1' }, 
  { bg: '#F0FDF4', text: '#166534' }, 
  { bg: '#FEF9C3', text: '#854D0E' }, 
  { bg: '#FAF5FF', text: '#6B21A8' }, 
  { bg: '#FFF1F2', text: '#9F1239' }, 
  { bg: '#ECFEFF', text: '#0891B2' }, 
  { bg: '#F5F3FF', text: '#5B21B6' }, 
  { bg: '#FFF7ED', text: '#9A3412' }, 
];

const getPlanColor = (planName: string) => {
  if (!planName || planName === 'No Plan') return { bg: '#F3F4F6', text: '#6B7280' };
  const hash = planName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return PASTEL_COLORS[hash % PASTEL_COLORS.length];
};

const formatDate = (dateStr: string | null) => 
  dateStr ? new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A';

const getInitials = (name: string) => name ? name.split(' ').map((n) => n[0]).join('') : 'U';

const UserTable: React.FC<UserTableProps> = ({ currentPage, itemsPerPage, onDataLoaded }) => {
  const [users, setUsers] = useState<UserAPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState<{ type: 'view' | 'delete' | 'editRole' | null, user: UserAPI | null }>({ type: null, user: null });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAdminUsers(currentPage || 1, itemsPerPage);
      setUsers(data.items);
      onDataLoaded?.(data.pagination.total); 
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast({ title: 'Error', description: 'Failed to load users list.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, onDataLoaded]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleConfirmAction = async () => {
    const { type, user } = modal;
    if (!user || !type || type === 'view') {
      setModal({ type: null, user: null });
      return;
    }

    setActionLoading(true);
    try {
      if (type === 'editRole') {
        const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
        await updateAdminUserRole(user.id, newRole);
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: newRole } : u));
        toast({ title: 'Role Updated', description: `Updated ${user.fullName} to ${newRole} successfully.`, variant: 'success' });
      } 
      else if (type === 'delete') {
        await deleteAdminUser(user.id);
        setUsers(prev => prev.filter(u => u.id !== user.id));
        toast({ title: 'User Deleted', description: `User ${user.fullName} has been removed from the system.`, variant: 'success' });
      }
    } catch (error) {
      console.error("Action error:", error);
      toast({ title: 'Action Failed', description: 'An error occurred. Please try again.', variant: 'destructive' });
    } finally {
      setActionLoading(false);
      setModal({ type: null, user: null });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="animate-spin text-[#67AEFF]" size={40} />
        <p className="text-sm font-medium text-gray-400">Loading users data...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', overflowX: 'auto', position: 'relative' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr>
            {['#', 'Name', 'Role', 'Email', 'Plan', 'Action'].map((head) => (
              <th key={head} style={{ ...thStyle, textAlign: head === 'Action' ? 'right' : 'left' }}>{head}</th>
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
  );
};

const UserRow = ({ user, index, onAction }: { user: UserAPI, index: number, onAction: (type: any) => void }) => {
  const isAdmin = user.role === 'ADMIN';
  const planName = user.subscription?.packageName || 'No Plan';
  
  const planColor = useMemo(() => getPlanColor(planName), [planName]);
  
  const avatarStyle = useMemo(() => {
    const charCodeSum = user.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return PASTEL_COLORS[charCodeSum % PASTEL_COLORS.length];
  }, [user.id]);

  return (
    <tr style={{ transition: 'background 0.2s' }} className="hover:bg-[#F5F9FF]">
      <td style={tdStyle}><span className="text-[12px] text-gray-400 font-medium">{String(index).padStart(2, '0')}</span></td>
      <td style={tdStyle}>
        <div className="flex items-center gap-3">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover shadow-sm" />
          ) : (
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ backgroundColor: avatarStyle.bg, color: avatarStyle.text }}
            >
              {getInitials(user.fullName)}
            </div>
          )}
          <span className="text-[13px] font-semibold text-gray-700">{user.fullName}</span>
        </div>
      </td>
      <td style={tdStyle}>
        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border ${isAdmin ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
          {isAdmin ? <ShieldCheck size={11} strokeWidth={2} /> : <UserIcon size={11} strokeWidth={2} />}
          {user.role}
        </div>
      </td>
      <td style={tdStyle}><span className="text-[12px] text-gray-500">{user.email}</span></td>
      <td style={tdStyle}>
        <span 
            className="px-2.5 py-1 rounded-full text-[10px] font-bold"
            style={{ backgroundColor: planColor.bg, color: planColor.text }}
        >
          {planName}
        </span>
      </td>
      <td style={{ ...tdStyle, textAlign: 'right' }}>
        <div className="flex justify-end gap-2">
          <ActionButton icon={<Eye size={16} strokeWidth={2} />} color={THEME.primary} hoverBg={THEME.border} onClick={() => onAction('view')} />
          <ActionButton icon={<Edit3 size={16} strokeWidth={2} />} color={THEME.primary} hoverBg="#E0F2FE" onClick={() => onAction('editRole')} />
          <ActionButton icon={<Trash2 size={16} strokeWidth={2} />} color={THEME.danger} hoverBg="#FEF2F2" onClick={() => onAction('delete')} />
        </div>
      </td>
    </tr>
  );
};

const ActionButton = ({ icon, color, hoverBg, onClick }: any) => (
  <button
    onClick={onClick}
    className="w-8 h-8 flex items-center justify-center rounded-lg transition-all text-[#94A3B8]"
    style={{ border: 'none', cursor: 'pointer', background: 'transparent' }}
    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = hoverBg; e.currentTarget.style.color = color; }}
    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#94A3B8' }}
  >
    {icon}
  </button>
);

const Modal = ({ type, user, loading, onClose, onConfirm }: any) => {
  const isView = type === 'view';
  const isEdit = type === 'editRole';
  
  const config = {
    view: { icon: <UserIcon size={22} strokeWidth={2} />, color: THEME.primary, bg: THEME.bgLight, title: 'User Details', btn: 'Close' },
    delete: { icon: <Trash2 size={22} strokeWidth={2} />, color: THEME.danger, bg: '#FEE2E2', title: 'Delete User', btn: 'Confirm' },
    editRole: { icon: <Edit3 size={22} strokeWidth={2} />, color: THEME.primary, bg: '#E0F2FE', title: 'Change Role', btn: 'Update Role' }
  }[type as 'view' | 'delete' | 'editRole'];

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-[2px]" 
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-[90%] max-w-[380px] shadow-2xl overflow-hidden">
        <div className="p-6 pb-2 text-center">
          <div style={{ background: config.bg, color: config.color }} className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
            {loading ? <Loader2 size={22} className="animate-spin" /> : config.icon}
          </div>
          <h3 className="text-lg font-bold text-gray-900">{config.title}</h3>
        </div>
        <div className="p-6 pt-2">
          {isView ? (
            <div className="text-[13px] space-y-1">
               <DetailRow label="Full Name" value={user.fullName} bold />
               <DetailRow label="Role" value={user.role} color={user.role === 'ADMIN' ? THEME.purple : ''} bold />
               <DetailRow label="Email Address" value={user.email} />
               <DetailRow label="Current Plan" value={user.subscription?.packageName || 'None'} color={THEME.primary} bold />
               <DetailRow label="Start Date" value={formatDate(user.subscription?.startDate)} />
               <DetailRow label="End Date" value={formatDate(user.subscription?.endDate)} />
            </div>
          ) : (
            <div className="text-center">
               <p className="text-sm text-gray-500 my-4 leading-relaxed">
                {isEdit 
                  ? <>Change <b>{user.fullName}</b>'s role to <b>{user.role === 'ADMIN' ? 'USER' : 'ADMIN'}</b>?</>
                  : <>Permanently delete <b>{user.fullName}</b>? This action cannot be undone.</>
                }
              </p>
            </div>
          )}
          <div className="flex gap-3 mt-4">
            {!isView && <button disabled={loading} onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-all">Cancel</button>}
            <button disabled={loading} onClick={isView ? onClose : onConfirm} style={{ background: config.color }} className="flex-1 py-2.5 rounded-xl text-white font-bold text-sm shadow-md hover:brightness-105 transition-all">
              {config.btn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, color, bold }: any) => (
  <div className="flex justify-between py-2 border-b border-gray-50 last:border-0">
    <span className="text-gray-400 text-[11px] font-medium uppercase tracking-wider">{label}</span>
    <span style={{ color: color || '#374151' }} className={`${bold ? 'font-bold' : 'font-medium'}`}>{value}</span>
  </div>
);

const thStyle: React.CSSProperties = { padding: '12px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#94A3B8', borderBottom: '1px solid #EEF4FF' };
const tdStyle: React.CSSProperties = { padding: '14px 12px', borderBottom: '1px solid #EEF4FF', verticalAlign: 'middle' };

export default UserTable;