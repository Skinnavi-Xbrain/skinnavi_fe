import React, { useState, useMemo, useEffect } from 'react';
import { ExternalLink, Edit3, Trash2, AlertTriangle, X } from 'lucide-react';
import { type Product } from '../types/product';
import { productApi } from '../services/product.api';

const THEME = {
  primary: '#67AEFF',
  primaryHover: '#5698e6',
  bgLight: '#F5F9FF',
  border: '#EEF4FF',
  textMuted: '#9CA3AF',
  danger: '#EF4444',
};

const PASTEL_COLORS = [
  { bg: '#E0F2FE', text: '#0369A1' }, { bg: '#F0FDF4', text: '#166534' },
  { bg: '#FEF9C3', text: '#854D0E' }, { bg: '#FAF5FF', text: '#6B21A8' },
  { bg: '#FFF1F2', text: '#9F1239' }, { bg: '#ECFEFF', text: '#0891B2' },
  { bg: '#F5F3FF', text: '#5B21B6' }, { bg: '#FFF7ED', text: '#9A3412' }
];

interface Props {
  itemsPerPage: number;
  currentPage: number;
  refreshKey?: number;
  onTotalPagesChange?: (total: number) => void;
  onEdit?: (p: Product) => void;
  onDelete?: (id: string) => void;
}

const EditProductModal: React.FC<{ isOpen: boolean; product: Product | null; onSave: (updated: Product) => void; onClose: () => void }> = ({ isOpen, product, onSave, onClose }) => {
  const [formData, setFormData] = useState<Product | null>(null);
  const CATEGORY_OPTIONS = ['Cleanser', 'Serum', 'Sunscreen', 'Moisturizer', 'Makeup Remover', 'Toner'];

  useEffect(() => { if (product) setFormData(product); }, [product]);
  if (!isOpen || !formData) return null;

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[13px] outline-none focus:ring-2 focus:ring-[#67AEFF]/20 focus:border-[#67AEFF] transition-all bg-white";
  const labelClass = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm font-['Poppins']">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-800">Edit Product</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-5 text-left">
          <div><label className={labelClass}>Product Name</label><input type="text" className={inputClass} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category</label>
              <select className={inputClass} value={formData.usage_role} onChange={(e) => setFormData({...formData, usage_role: e.target.value})}>{CATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
            </div>
            <div>
              <label className={labelClass}>Price (VND)</label>
              <input type="number" className={`${inputClass} appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`} value={formData.display_price} onChange={(e) => setFormData({...formData, display_price: e.target.value})} />
            </div>
          </div>
          <div><label className={labelClass}>Image URL</label><input type="text" className={inputClass} value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} /></div>
          <div><label className={labelClass}>Affiliate URL</label><input type="text" className={inputClass} value={formData.affiliate_url} onChange={(e) => setFormData({...formData, affiliate_url: e.target.value})} /></div>
        </div>
        <div className="p-6 pt-0 flex gap-3 bg-gray-50/50 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={() => { onSave(formData); onClose(); }} style={{ backgroundColor: THEME.primary }} className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 shadow-lg shadow-blue-100">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

const SingleProductTable: React.FC<Props> = ({ itemsPerPage, currentPage, refreshKey, onTotalPagesChange, onEdit, onDelete }) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [editTarget, setEditTarget] = useState<Product | null>(null);

  const getCategoryStyle = (role: string) => PASTEL_COLORS[role.length % PASTEL_COLORS.length];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Backend của bạn trả về nguyên Object { page, limit, total, totalPages, items }
      const res = await productApi.getProducts(currentPage, itemsPerPage);
      setData(res.items || []);
      if (onTotalPagesChange) onTotalPagesChange(res.totalPages || 1);
    } catch (error) { console.error("Failed to fetch products:", error); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, [currentPage, refreshKey]);

  const handleUpdate = async (updated: Product) => {
    try {
      await productApi.updateProduct(updated.id, updated);
      setData(prev => prev.map(p => p.id === updated.id ? updated : p));
      if (onEdit) onEdit(updated);
    } catch (error) { alert("Update failed!"); }
  };

  const finalDelete = async () => {
    if (!deleteTarget) return;
    try {
      await productApi.deleteProduct(deleteTarget.id);
      setData(prev => prev.filter(p => p.id !== deleteTarget.id));
      if (onDelete) onDelete(deleteTarget.id);
      setDeleteTarget(null);
    } catch (error) { alert("Delete failed!"); }
  };

  if (loading) return <div className="p-20 text-center text-gray-400 font-bold animate-pulse">Loading products...</div>;

  return (
    <div className="w-full overflow-x-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/60">
            {['#', 'Category', 'Product Details', 'Price', 'Source', 'Actions'].map((h, i) => (
              <th key={h} className={`px-4 py-5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-left ${i === 5 && 'text-right'}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((p, i) => {
            const style = getCategoryStyle(p.usage_role || '');
            // STT chuẩn = (Trang hiện tại - 1) * Số sp mỗi trang + Index + 1
            const displayIndex = (currentPage - 1) * itemsPerPage + i + 1;
            
            return (
              <tr key={p.id} className="group hover:bg-slate-50/80 transition-colors duration-150">
                <td className="px-4 py-3 text-xs text-gray-400 font-mono text-center w-10">{String(displayIndex).padStart(2, '0')}</td>
                <td className="px-4 py-3 whitespace-nowrap text-left"><span style={{ backgroundColor: style.bg, color: style.text }} className="inline-flex px-3 py-1 rounded-lg text-[10px] font-semibold uppercase border border-black/5">{p.usage_role}</span></td>
                <td className="px-4 py-3 text-left">
                  <div className="flex items-center gap-3">
                    <img src={p.image_url} alt={p.name} className="w-11 h-11 rounded-xl border border-gray-100 bg-white object-cover flex-shrink-0" />
                    <div className="text-[13px] font-semibold text-gray-800 leading-snug group-hover:text-[#67AEFF] transition-colors line-clamp-2 max-w-[250px]">{p.name}</div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-left"><span className="text-sm font-bold text-gray-900">{Number(p.display_price).toLocaleString('vi-VN')} <small className="text-[10px] font-normal text-gray-400 ml-1">VND</small></span></td>
                <td className="px-4 py-3 text-center w-20"><a href={p.affiliate_url} target="_blank" rel="noreferrer" style={{ color: THEME.primary, backgroundColor: `${THEME.primary}1A` }} className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-opacity-20 transition-all"><ExternalLink size={14} /></a></td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditTarget(p)} style={{ color: THEME.primary }} className="w-8 h-8 rounded-lg border border-gray-100 bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm"><Edit3 size={14} /></button>
                    <button onClick={() => setDeleteTarget(p)} style={{ color: THEME.danger }} className="w-8 h-8 rounded-lg border border-red-200 bg-white hover:bg-red-50 flex items-center justify-center shadow-sm"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <EditProductModal isOpen={!!editTarget} product={editTarget} onSave={handleUpdate} onClose={() => setEditTarget(null)} />
      {deleteTarget && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl max-w-sm text-center shadow-2xl border border-gray-100">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 text-red-500"><AlertTriangle size={32} /></div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Confirm Delete</h3>
            <p className="text-sm text-gray-500 mb-8 text-left leading-relaxed">Are you sure you want to remove <span className="font-bold text-gray-700">"{deleteTarget.name}"</span>?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={finalDelete} style={{ backgroundColor: THEME.danger }} className="flex-1 py-3 text-white rounded-xl text-sm font-bold hover:opacity-90">Delete Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductTable;