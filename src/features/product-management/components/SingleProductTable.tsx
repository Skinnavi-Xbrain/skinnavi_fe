import React, { useState, useMemo, useEffect } from 'react';
import { ExternalLink, Edit3, Trash2, ImageIcon, AlertTriangle, X } from 'lucide-react';

/* ─── Interfaces ─────────────────────────────────────────── */
export interface Product {
  id: string;
  skin_type: 'OILY' | 'DRY' | 'NORMAL' | 'COMBINATION' | 'SENSITIVE';
  type: 'Cleanser' | 'Serum' | 'Sunscreen' | 'Moisturizer' | 'Micellar Water' | 'Toner';
  name: string;
  image_url: string;
  display_price: number;
  affiliate_url: string;
  is_active: boolean;
}

interface Props {
  startIndex: number;
  itemsPerPage: number;
  onEdit?: (p: Product) => void;
  onDelete?: (id: string) => void;
}

/* ─── Styles ─────────────────────────────────────────────── */
const SKIN_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  OILY:        { bg: '#FFF1E7', color: '#B04500', border: '#FDDCC4' },
  DRY:         { bg: '#E1EFFF', color: '#1A56DB', border: '#C3DFFF' },
  NORMAL:      { bg: '#EBFBEE', color: '#1A7A2F', border: '#C3F0CC' },
  COMBINATION: { bg: '#F3F0FF', color: '#5B21B6', border: '#DDD6FE' },
  SENSITIVE:   { bg: '#FFF5F5', color: '#BE1B1B', border: '#FECACA' },
};

const CAT_STYLES: Record<string, { bg: string; color: string }> = {
  Cleanser:       { bg: '#F0F9FF', color: '#0369A1' },
  Serum:          { bg: '#FAF5FF', color: '#7C3AED' },
  Sunscreen:      { bg: '#FEFCE8', color: '#854D0E' },
  Moisturizer:    { bg: '#F0FDF4', color: '#15803D' },
  'Micellar Water':{ bg: '#FFF1F2', color: '#9D174D' },
  Toner:          { bg: '#F5F3FF', color: '#6D28D9' },
};

/* ─── Modals ─────────────────────────────────────────────── */

const EditProductModal: React.FC<{ isOpen: boolean; product: Product | null; onSave: (updated: Product) => void; onClose: () => void }> = ({ isOpen, product, onSave, onClose }) => {
  const [formData, setFormData] = useState<Product | null>(null);
  
  useEffect(() => { 
    if (product) setFormData(product); 
  }, [product]);

  if (!isOpen || !formData) return null;

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[13px] outline-none focus:ring-2 focus:ring-[#67AEFF]/20 focus:border-[#67AEFF] transition-all";
  const labelClass = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-800">Edit Product</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-5 text-left">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Product Name</label>
              <input type="text" className={inputClass} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Skin Type</label>
              <select className={inputClass} value={formData.skin_type} onChange={(e) => setFormData({...formData, skin_type: e.target.value as any})}>
                {Object.keys(SKIN_STYLES).map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category</label>
              <select className={inputClass} value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value as any})}>
                {Object.keys(CAT_STYLES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Price (VND)</label>
              <input type="number" className={inputClass} value={formData.display_price} onChange={(e) => setFormData({...formData, display_price: Number(e.target.value)})} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Image URL</label>
            <input type="text" className={inputClass} value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
          </div>
          <div>
            <label className={labelClass}>Affiliate URL</label>
            <input type="text" className={inputClass} value={formData.affiliate_url} onChange={(e) => setFormData({...formData, affiliate_url: e.target.value})} />
          </div>
        </div>
        <div className="p-6 pt-0 flex gap-3 bg-gray-50/50 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={() => { onSave(formData); onClose(); }} className="flex-1 px-4 py-3 rounded-xl bg-[#67AEFF] text-sm font-semibold text-white hover:bg-[#5698e6] shadow-lg shadow-blue-100">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────── */

const SingleProductTable: React.FC<Props> = ({ startIndex, itemsPerPage, onEdit, onDelete }) => {
  // Mock data khởi tạo
  const [data, setData] = useState<Product[]>(Array.from({ length: 12 }, (_, i) => ({
    id: `SK-${String(i + 1).padStart(3, '0')}`,
    skin_type: i % 5 === 0 ? 'OILY' : i % 5 === 1 ? 'DRY' : i % 5 === 2 ? 'NORMAL' : i % 5 === 3 ? 'COMBINATION' : 'SENSITIVE',
    type: 'Cleanser',
    name: `Product Skincare Premium ${i + 1}`,
    image_url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m4ydah1vwqxj8a.webp',
    display_price: 350000 + (i * 10000),
    affiliate_url: '#',
    is_active: true
  })));

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [editTarget, setEditTarget] = useState<Product | null>(null);

  // Logic phân trang
  const paginatedData = useMemo(() => {
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, startIndex, itemsPerPage]);

  const handleUpdate = (updated: Product) => {
    setData(prev => prev.map(p => p.id === updated.id ? updated : p));
    if (onEdit) onEdit(updated);
  };

  const finalDelete = () => {
    if (!deleteTarget) return;
    setData(prev => prev.filter(p => p.id !== deleteTarget.id));
    if (onDelete) onDelete(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="w-full overflow-x-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/60">
            {['#', 'Skin Type', 'Category', 'Product Details', 'Price', 'Source', 'Actions'].map((h, i) => (
              <th key={h} className={`px-4 py-5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-left ${i === 6 && 'text-right'}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {paginatedData.map((p, i) => (
            <tr key={p.id} className="group hover:bg-slate-50/80 transition-colors duration-150">
              <td className="px-4 py-3 text-xs text-gray-400 font-mono text-center w-10">
                {String(startIndex + i + 1).padStart(2, '0')}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-left">
                <span 
                  style={{ 
                    backgroundColor: SKIN_STYLES[p.skin_type].bg, 
                    color: SKIN_STYLES[p.skin_type].color, 
                    borderColor: SKIN_STYLES[p.skin_type].border 
                  }} 
                  className="inline-flex items-center justify-center px-3 py-1 rounded-full border text-[10px] font-bold uppercase"
                >
                  {p.skin_type}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-left">
                <span 
                  style={{ 
                    backgroundColor: (CAT_STYLES[p.type] || {bg:'#f9fafb'}).bg, 
                    color: (CAT_STYLES[p.type] || {color:'#374151'}).color 
                  }} 
                  className="inline-flex px-3 py-1 rounded-lg text-[10px] font-semibold uppercase border border-black/5"
                >
                  {p.type}
                </span>
              </td>
              <td className="px-4 py-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl border border-gray-100 bg-white overflow-hidden flex-shrink-0">
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[13px] font-semibold text-gray-800 leading-snug group-hover:text-[#67AEFF] transition-colors line-clamp-2 max-w-[220px]">
                    {p.name}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-left">
                <span className="text-sm font-bold text-gray-900">
                  {p.display_price.toLocaleString('vi-VN')} 
                  <small className="text-[10px] font-normal text-gray-400 ml-1">VND</small>
                </span>
              </td>
              <td className="px-4 py-3 text-center w-20">
                <a 
                  href={p.affiliate_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#67AEFF] bg-[#67AEFF]/10 border border-[#67AEFF]/20 hover:bg-[#67AEFF]/20 transition-all"
                >
                  <ExternalLink size={14} />
                </a>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => setEditTarget(p)} 
                    className="w-8 h-8 rounded-lg border border-[#67AEFF]/20 bg-white text-[#67AEFF] hover:bg-[#67AEFF] hover:text-white transition-all flex items-center justify-center shadow-sm"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button 
                    onClick={() => setDeleteTarget(p)} 
                    className="w-8 h-8 rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- POPUPS --- */}
      <EditProductModal 
        isOpen={!!editTarget} 
        product={editTarget} 
        onSave={handleUpdate} 
        onClose={() => setEditTarget(null)} 
      />

      {deleteTarget && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white p-8 rounded-2xl max-w-sm text-center shadow-2xl border border-gray-100 animate-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 text-red-500">
              <AlertTriangle size={32} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Confirm Delete</h3>
            <p className="text-sm text-gray-500 mb-8 text-left leading-relaxed">
              Are you sure you want to remove <span className="font-bold text-gray-700">"{deleteTarget.name}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteTarget(null)} 
                className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={finalDelete} 
                className="flex-1 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-colors"
              >
                Delete Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductTable;