import React, { useState } from 'react';
import type { User } from '../types';
import { Eye, Ban, Trash2, CheckCircle, Loader2, ShieldCheck, User as UserIcon, Edit3 } from 'lucide-react';

interface Subscription {
  plan: string;
  startDate: string | null;
  endDate: string | null;
}

interface ExtendedUser extends User {
  role: 'Admin' | 'User';
  subscription: Subscription;
}

const INITIAL_USERS: ExtendedUser[] = [
  { id: 'USR001', name: 'Emma Johnson', email: 'emma.j@email.com', role: 'Admin', status: 'Active', subscription: { plan: 'Advanced Routine – 3 Months', startDate: '2024-01-15', endDate: '2025-01-15' } },
  { id: 'USR002', name: 'Carlos Ruiz', email: 'c.ruiz@email.com', role: 'User', status: 'Active', subscription: { plan: 'Essential Routine – 1 Month', startDate: '2024-06-01', endDate: '2025-06-01' } },
  { id: 'USR003', name: 'Sarah Kim', email: 'sarahkim@email.com', role: 'User', status: 'Active', subscription: { plan: 'Starter Routine – 1 Week', startDate: null, endDate: null } },
  { id: 'USR004', name: 'David Miller', email: 'dmiller@email.com', role: 'User', status: 'Suspended', subscription: { plan: 'Starter Routine – 1 Week', startDate: '2024-03-10', endDate: '2024-09-10' } },
  { id: 'USR005', name: 'Lena Novak', email: 'lena.n@email.com', role: 'Admin', status: 'Active', subscription: { plan: 'Advanced Routine – 3 Months', startDate: '2024-11-20', endDate: '2025-11-20' } },
];

const THEME = {
  primary: '#67AEFF',
  bgLight: '#F5F9FF',
  border: '#EEF4FF',
  textMain: '#1F2937',
  textMuted: '#9CA3AF',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F5A623',
  purple: '#8B5CF6',
};

const PLAN_STYLES: Record<string, { bg: string; text: string }> = {
  'Advanced Routine – 3 Months': { bg: '#E8DEFF', text: '#6B3DBF' },
  'Essential Routine – 1 Month': { bg: '#DDEEFF', text: '#2A7DD4' },
  'Starter Routine – 1 Week': { bg: '#D6F0E8', text: '#1A8C60' },
};

const AVATAR_COLORS: Record<string, { bg: string; text: string }> = {
  USR001: { bg: '#DDEEFF', text: '#2A7DD4' },
  USR002: { bg: '#D6F0E8', text: '#1A8C60' },
  USR003: { bg: '#FFF0D6', text: '#B87020' },
  USR004: { bg: '#FFE4EE', text: '#C0345A' },
  USR005: { bg: '#E8DEFF', text: '#6B3DBF' },
};

const formatDate = (dateStr: string | null) => 
  dateStr ? new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A';

const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('');

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<ExtendedUser[]>(INITIAL_USERS);
  const [modal, setModal] = useState<{ type: 'view' | 'ban' | 'delete' | 'editRole' | null, user: ExtendedUser | null }>({ type: null, user: null });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

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

    setLoading(true);
    await new Promise(res => setTimeout(res, 800)); 

    if (type === 'ban') {
      const isSuspended = user.status === 'Suspended';
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: isSuspended ? 'Active' : 'Suspended' } : u));
      triggerToast(`${user.name} has been ${isSuspended ? 'reactivated' : 'suspended'}`);
    } else if (type === 'delete') {
      setUsers(prev => prev.filter(u => u.id !== user.id));
      triggerToast(`${user.name} has been deleted`);
    } else if (type === 'editRole') {
      const newRole = user.role === 'Admin' ? 'User' : 'Admin';
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: newRole } : u));
      triggerToast(`${user.name} is now an ${newRole}`);
    }

    setLoading(false);
    setModal({ type: null, user: null });
  };

  return (
    <div style={{ padding: '16px', fontFamily: "'Poppins', sans-serif", overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
            {['#', 'Name', 'Role', 'Email', 'Plan', 'Status', ''].map((head, i) => (
              <th key={head} style={{ ...thStyle, textAlign: i === 6 ? 'right' : 'left' }}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserRow 
              key={user.id} 
              index={index + 1} 
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
          loading={loading}
          onClose={() => !loading && setModal({ type: null, user: null })} 
          onConfirm={handleConfirm} 
        />
      )}

      {toast && <div style={toastStyle}>{toast}</div>}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// --- Sub-Components ---

const UserRow = ({ user, index, onAction }: { user: ExtendedUser, index: number, onAction: (type: any) => void }) => {
  const isSuspended = user.status === 'Suspended';
  const isAdmin = user.role === 'Admin';
  const planStyle = PLAN_STYLES[user.subscription.plan] || { bg: '#F0F0F0', text: '#888' };
  const av = AVATAR_COLORS[user.id] || { bg: '#EEE', text: '#666' };

  return (
    <tr 
      style={{ transition: 'background 0.2s', backgroundColor: isSuspended ? '#FFFBFB' : 'transparent' }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = THEME.bgLight)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isSuspended ? '#FFFBFB' : 'transparent')}
    >
      <td style={tdStyle}><span style={{ fontSize: '12px', color: THEME.textMuted, fontWeight: 500 }}>{index}</span></td>
      <td style={tdStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, background: isSuspended ? '#F3F4F6' : av.bg, color: isSuspended ? '#9CA3AF' : av.text }}>
            {getInitials(user.name)}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: isSuspended ? '#991B1B' : '#374151' }}>{user.name}</span>
        </div>
      </td>
      <td style={tdStyle}>
        <div style={{ 
          display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '6px',
          background: isAdmin ? '#F5F3FF' : '#F9FAFB',
          color: isAdmin ? THEME.purple : THEME.textMuted,
          fontSize: '11px', fontWeight: 600, border: `1px solid ${isAdmin ? '#DDD6FE' : '#E5E7EB'}`
        }}>
          {isAdmin ? <ShieldCheck size={12} /> : <UserIcon size={12} />}
          {user.role}
        </div>
      </td>
      <td style={tdStyle}><span style={{ fontSize: '12px', color: THEME.textMuted }}>{user.email}</span></td>
      <td style={tdStyle}>
        <span style={{ background: planStyle.bg, color: planStyle.text, padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 500 }}>
          {user.subscription.plan}
        </span>
      </td>
      <td style={tdStyle}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 8px', borderRadius: '12px', background: isSuspended ? '#FEE2E2' : '#D1FAE5', color: isSuspended ? '#B91C1C' : '#065F46' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
          <span style={{ fontSize: '11px', fontWeight: 600 }}>{user.status}</span>
        </div>
      </td>
      <td style={{ ...tdStyle, textAlign: 'right' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
          <ActionButton icon={<Eye size={15}/>} color={THEME.primary} hoverBg={THEME.border} onClick={() => onAction('view')} />
          <ActionButton icon={<Edit3 size={15}/>} color={THEME.purple} hoverBg="#F5F3FF" onClick={() => onAction('editRole')} />
          <ActionButton 
            icon={isSuspended ? <CheckCircle size={15}/> : <Ban size={15}/>} 
            color={isSuspended ? THEME.success : THEME.warning} 
            hoverBg={isSuspended ? "#ECFDF5" : "#FFFBEB"} 
            onClick={() => onAction('ban')} 
          />
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
  const isSusp = user.status === 'Suspended';
  const isView = type === 'view';
  const isEdit = type === 'editRole';
  
  const config = {
    view: { icon: <Eye size={24} />, color: THEME.primary, bg: THEME.bgLight, title: 'User Details', btn: 'Close' },
    ban: { icon: isSusp ? <CheckCircle size={24} /> : <Ban size={24} />, color: isSusp ? THEME.success : THEME.warning, bg: isSusp ? '#D1FAE5' : '#FFFBEB', title: isSusp ? 'Reactivate User' : 'Suspend User', btn: isSusp ? 'Unsuspend' : 'Suspend' },
    delete: { icon: <Trash2 size={24} />, color: THEME.danger, bg: '#FEE2E2', title: 'Delete User', btn: 'Confirm' },
    editRole: { icon: <Edit3 size={24} />, color: THEME.purple, bg: '#F5F3FF', title: 'Change Role', btn: 'Update Role' }
  }[type as 'view' | 'ban' | 'delete' | 'editRole'];

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
               <DetailRow label="Full Name" value={user.name} bold />
               <DetailRow label="Role" value={user.role} color={user.role === 'Admin' ? THEME.purple : THEME.textMuted} bold />
               <DetailRow label="Email Address" value={user.email} />
               <DetailRow label="Current Plan" value={user.subscription.plan} color={THEME.primary} bold />
               <DetailRow label="Start Date" value={formatDate(user.subscription.startDate)} />
               <DetailRow label="End Date" value={formatDate(user.subscription.endDate)} />
            </div>
          ) : isEdit ? (
            <div style={{ textAlign: 'center' }}>
               <p style={{ fontSize: '14px', color: '#666', margin: '10px 0 20px' }}>
                Change <strong>{user.name}</strong>'s role from <strong>{user.role}</strong> to <strong>{user.role === 'Admin' ? 'User' : 'Admin'}</strong>?
              </p>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#666', margin: '10px 0 20px', lineHeight: 1.5 }}>
                {type === 'ban' ? `Reactivate or suspend ${user.name}?` : `Permanently delete ${user.name}?`}
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            {!isView && <button disabled={loading} onClick={onClose} style={{ ...btnBase, background: '#F3F4F6', color: '#4B5563', flex: 1 }}>Cancel</button>}
            <button disabled={loading} onClick={onConfirm} style={{ ...btnBase, background: config.color, color: 'white', flex: 1 }}>
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
const overlayStyle: React.CSSProperties = { position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' };
const modalContentStyle: React.CSSProperties = { background: 'white', borderRadius: '16px', width: '90%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' };
const detailRowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid #F3F4F6` };
const btnBase: React.CSSProperties = { padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: '0.2s' };
const toastStyle: React.CSSProperties = { position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: '#1F2937', color: 'white', padding: '12px 24px', borderRadius: '12px', fontSize: '13px', zIndex: 100 };

export default UserTable;