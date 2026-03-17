import React, { useState, useEffect, useMemo } from 'react';
import { Eye, Trash2, Loader2, ShieldCheck, User as UserIcon, Edit3, AlertCircle } from 'lucide-react';

/* ─── Interfaces dựa trên API ─── */
interface Subscription {
  packageName: string;
  startDate: string | null;
  endDate: string | null;
}

interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  subscription: Subscription | null;
}

interface UserTableProps {
  currentPage: number;
  itemsPerPage: number;
  onTotalPagesChange?: (total: number) => void;
}

const THEME = {
  primary: '#67AEFF',
  bgLight: '#F5F9FF',
  border: '#EEF4FF',
  textMain: '#1F2937',
  textMuted: '#9CA3AF',
  success: '#10B981',
  danger: '#EF4444',
  purple: '#8B5CF6',
};

const formatDate = (dateStr: string | null) => 
  dateStr ? new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A';

const getInitials = (name: string) => name ? name.split(' ').map((n) => n[0]).join('').toUpperCase() : '??';

const UserTable: React.FC<UserTableProps> = ({ currentPage, itemsPerPage, onTotalPagesChange }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<{ type: 'view' | 'delete' | 'editRole' | null, user: User | null }>({ type: null, user: null });
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  /* ─── Gọi API lấy danh sách User ─── */
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users?page=${currentPage}&limit=${itemsPerPage}`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      
      setUsers(data.items);
      if (onTotalPagesChange) onTotalPagesChange(data.pagination.totalPages);
      setError(null);
    } catch (err) {
      setError('Could not connect to the server');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerPage]);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleConfirm = async () => {
    const { type, user } = modal;
    if (!user || !type || type === 'view') {
      setModal({ type: null, user: null });
      return;
    }

    setActionLoading(true);
    // Giả lập gọi API cho Delete/Update Role (Bạn có thể thay bằng fetch thực tế ở đây)
    await new Promise(res => setTimeout(res, 800)); 

    if (type === 'delete') {
      triggerToast(`User ${user.fullName} deleted (Simulation)`);
    } else if (type === 'editRole') {
      triggerToast(`Role updated for ${user.fullName} (Simulation)`);
    }

    setActionLoading(false);
    setModal({ type: null, user: null });
    fetchUsers(); // Refresh lại danh sách
  };

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', color: THEME.primary }}>
      <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '40px', color: THEME.danger }}>
      <AlertCircle size={32} style={{ margin: '0 auto 8px' }} />
      <p>{error}</p>
    </div>
  );

  return (
    <div style={{ padding: '16px', fontFamily: "'Poppins', sans-serif", overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
            {['#', 'Name', 'Role', 'Email', 'Plan', ''].map((head, i) => (
              <th key={head} style={{ ...thStyle, textAlign: i === 5 ? 'right' : 'left' }}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserRow 
              key={user.id} 
              index={((currentPage - 1) * itemsPerPage) + index + 1} 
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
          onConfirm={handleConfirm} 
        />
      )}

      {toast && <div style={toastStyle}>{toast}</div>}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// --- Sub-Components ---

const UserRow = ({ user, index, onAction }: { user: User, index: number, onAction: (type: any) => void }) => {
  const isAdmin = user.role === 'ADMIN';
  
  return (
    <tr 
      style={{ transition: 'background 0.2s' }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = THEME.bgLight)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      <td style={tdStyle}><span style={{ fontSize: '12px', color: THEME.textMuted }}>{String(index).padStart(2, '0')}</span></td>
      <td style={tdStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, background: THEME.border, color: THEME.primary }}>
            {user.avatarUrl ? <img src={user.avatarUrl} style={{width:'100%', height:'100%', borderRadius:'50%'}} /> : getInitials(user.fullName)}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>{user.fullName}</span>
        </div>
      </td>
      <td style={tdStyle}>
        <div style={{ 
          display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '6px',
          background: isAdmin ? '#F5F3FF' : '#F9FAFB', color: isAdmin ? THEME.purple : THEME.textMuted,
          fontSize: '11px', fontWeight: 600, border: `1px solid ${isAdmin ? '#DDD6FE' : '#E5E7EB'}`
        }}>
          {isAdmin ? <ShieldCheck size={12} /> : <UserIcon size={12} />}
          {user.role}
        </div>
      </td>
      <td style={tdStyle}><span style={{ fontSize: '12px', color: THEME.textMuted }}>{user.email}</span></td>
      <td style={tdStyle}>
        <span style={{ background: user.subscription ? '#D6F0E8' : '#F3F4F6', color: user.subscription ? '#1A8C60' : '#9CA3AF', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 500 }}>
          {user.subscription?.packageName || 'No Plan'}
        </span>
      </td>
      <td style={{ ...tdStyle, textAlign: 'right' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
          <ActionButton icon={<Eye size={15}/>} color={THEME.primary} hoverBg={THEME.border} onClick={() => onAction('view')} />
          <ActionButton icon={<Edit3 size={15}/>} color={THEME.purple} hoverBg="#F5F3FF" onClick={() => onAction('editRole')} />
          <ActionButton icon={<Trash2 size={15}/>} color={THEME.danger} hoverBg="#FEF2F2" onClick={() => onAction('delete')} />
        </div>
      </td>
    </tr>
  );
};

const ActionButton = ({ icon, color, hoverBg, onClick }: any) => (
  <button
    onClick={onClick}
    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = hoverBg; e.currentTarget.style.color = color; }}
    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C7DCFF' }}
    style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: '0.2s', background: 'transparent', color: '#C7DCFF' }}
  >
    {icon}
  </button>
);

const Modal = ({ type, user, loading, onClose, onConfirm }: any) => {
  const isView = type === 'view';
  const config = {
    view: { icon: <Eye size={24} />, color: THEME.primary, bg: THEME.bgLight, title: 'User Details', btn: 'Close' },
    delete: { icon: <Trash2 size={24} />, color: THEME.danger, bg: '#FEE2E2', title: 'Delete User', btn: 'Confirm' },
    editRole: { icon: <Edit3 size={24} />, color: THEME.purple, bg: '#F5F3FF', title: 'Change Role', btn: 'Update Role' }
  }[type as 'view' | 'delete' | 'editRole'];

  return (
    <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={modalContentStyle}>
        <div style={{ padding: '24px 24px 10px', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', background: config.bg, color: config.color }}>
            {loading ? <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} /> : config.icon}
          </div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#111' }}>{config.title}</h3>
        </div>

        <div style={{ padding: '10px 24px 24px' }}>
          {isView ? (
            <div style={{ fontSize: '13px' }}>
               <DetailRow label="Full Name" value={user.fullName} bold />
               <DetailRow label="Email" value={user.email} />
               <DetailRow label="Joined Date" value={formatDate(user.createdAt)} />
               <DetailRow label="Plan" value={user.subscription?.packageName || 'N/A'} color={THEME.primary} bold />
               {user.subscription && (
                 <>
                   <DetailRow label="Start Date" value={formatDate(user.subscription.startDate)} />
                   <DetailRow label="End Date" value={formatDate(user.subscription.endDate)} />
                 </>
               )}
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#666', margin: '10px 0 20px' }}>
                {type === 'editRole' 
                  ? `Change ${user.fullName}'s role from ${user.role}?` 
                  : `Are you sure you want to delete ${user.fullName}?`}
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            {!isView && <button disabled={loading} onClick={onClose} style={{ ...btnBase, background: '#F3F4F6', color: '#4B5563', flex: 1 }}>Cancel</button>}
            <button disabled={loading} onClick={isView ? onClose : onConfirm} style={{ ...btnBase, background: config.color, color: 'white', flex: 1 }}>
              {config.btn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, color, bold }: any) => (
  <div style={detailRowStyle}>
    <span>{label}</span>
    <span style={{ fontWeight: bold ? 600 : 400, color: color || 'inherit' }}>{value}</span>
  </div>
);

// --- Styles ---
const thStyle: React.CSSProperties = { padding: '12px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: THEME.textMuted, borderBottom: `1px solid ${THEME.border}` };
const tdStyle: React.CSSProperties = { padding: '14px 12px', borderBottom: `1px solid ${THEME.border}`, verticalAlign: 'middle' };
const overlayStyle: React.CSSProperties = { position: 'fixed', inset: 0, zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' };
const modalContentStyle: React.CSSProperties = { background: 'white', borderRadius: '16px', width: '90%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' };
const detailRowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid #F3F4F6` };
const btnBase: React.CSSProperties = { padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: '0.2s' };
const toastStyle: React.CSSProperties = { position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: '#1F2937', color: 'white', padding: '12px 24px', borderRadius: '12px', fontSize: '13px', zIndex: 100 };

export default UserTable;