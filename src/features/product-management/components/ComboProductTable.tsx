import React, { useState, useMemo } from 'react';
import { ChevronDown, Edit3, Trash2, ExternalLink, ImageIcon, ShoppingBag, AlertTriangle, X, Plus } from 'lucide-react';

/* ─── Interfaces ─────────────────────────────────────────── */
export interface Product {
  name: string;
  role: string;
  price: number;
  url: string;
  img: string;
}

export interface Combo {
  id: string;
  skinType: 'Normal' | 'Oily' | 'Dry' | 'Combination' | 'Sensitive';
  comboName: string;
  comboPrice: number;
  comboUrl: string;
  comboImg: string;
  products: Product[];
}

interface Props {
  startIndex: number;
  itemsPerPage: number;
}

/* ─── Shared Styles ──────────────────────────────────────── */
const SKIN_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  Normal: { bg: '#EBFBEE', color: '#1A7A2F', border: '#C3F0CC' },
  Oily: { bg: '#FFF1E7', color: '#B04500', border: '#FDDCC4' },
  Dry: { bg: '#E1EFFF', color: '#1A56DB', border: '#C3DFFF' },
  Combination: { bg: '#F3F0FF', color: '#5B21B6', border: '#DDD6FE' },
  Sensitive: { bg: '#FFF5F5', color: '#BE1B1B', border: '#FECACA' },
};

const CAT_STYLES: Record<string, { bg: string; color: string }> = {
  'Cleanser': { bg: '#F0F9FF', color: '#0369A1' },
  'Makeup Remover': { bg: '#FFF1F2', color: '#9D174D' },
  'Toner': { bg: '#F5F3FF', color: '#6D28D9' },
  'Serum': { bg: '#FAF5FF', color: '#7C3AED' },
  'Sunscreen': { bg: '#FEFCE8', color: '#854D0E' },
  'Moisturizer': { bg: '#F0FDF4', color: '#15803D' },
};

/* ─── Modals (Giữ nguyên) ─────────────────────────────────── */

const EditProductModal: React.FC<{ 
  isOpen: boolean; 
  product: Product | null; 
  isNew?: boolean;
  onSave: (updated: Product) => void; 
  onClose: () => void 
}> = ({ isOpen, product, isNew = false, onSave, onClose }) => {
  const [formData, setFormData] = useState<Product>({ name: '', role: 'Cleanser', price: 0, url: '', img: '' });

  React.useEffect(() => { 
    if (product) setFormData(product); 
    else if (isNew) setFormData({ name: '', role: 'Cleanser', price: 0, url: '', img: '' });
  }, [product, isNew]);

  if (!isOpen) return null;

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[13px] outline-none focus:ring-2 focus:ring-[#67AEFF]/20 focus:border-[#67AEFF] transition-all";
  const labelClass = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 font-['Poppins']">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-800">{isNew ? 'Add New Product to Combo' : 'Edit Product'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-3 gap-4 items-start">
             <div className="col-span-1 flex flex-col items-center gap-2 pt-1">
                 <label className={labelClass}>Preview</label>
                 <ProductImage url={formData.img} name={formData.name} size="w-24 h-24" />
             </div>
             <div className="col-span-2 space-y-4 text-left">
                 <div>
                    <label className={labelClass}>Product Name</label>
                    <input type="text" className={inputClass} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Role/Category</label>
                      <select className={inputClass} value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                        {Object.keys(CAT_STYLES).map(role => <option key={role} value={role}>{role}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Price (VND)</label>
                      <input type="number" className={inputClass} value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} />
                    </div>
                 </div>
             </div>
          </div>
          <div className="border-t border-gray-100 pt-5 space-y-4 text-left">
              <div>
                <label className={labelClass}>Image URL</label>
                <input type="text" className={inputClass} value={formData.img} onChange={(e) => setFormData({...formData, img: e.target.value})} />
              </div>
              <div>
                <label className={labelClass}>Product URL (Source)</label>
                <input type="text" className={inputClass} value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} />
              </div>
          </div>
        </div>
        <div className="p-6 pt-0 flex gap-3 bg-gray-50/50 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={() => { onSave(formData); onClose(); }} className="flex-1 px-4 py-3 rounded-xl bg-[#67AEFF] text-sm font-semibold text-white hover:bg-[#5698e6] shadow-lg shadow-blue-100 transition-colors">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

const EditComboModal: React.FC<{ isOpen: boolean; combo: Combo | null; onSave: (updated: Combo) => void; onClose: () => void }> = ({ isOpen, combo, onSave, onClose }) => {
  const [formData, setFormData] = useState<Combo | null>(null);
  React.useEffect(() => { if (combo) setFormData(combo); }, [combo]);
  if (!isOpen || !formData) return null;
  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-[13px] outline-none focus:border-[#67AEFF] transition-all";
  const labelClass = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm font-['Poppins']">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-800">Edit Combo Basic Info</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-3 gap-4 items-start">
             <div className="col-span-1 flex flex-col items-center gap-2 pt-1">
                 <label className={labelClass}>Preview</label>
                 <ProductImage url={formData.comboImg} name={formData.comboName} size="w-24 h-24" />
             </div>
             <div className="col-span-2 space-y-4 text-left">
                <div>
                    <label className={labelClass}>Combo Name</label>
                    <input type="text" className={inputClass} value={formData.comboName} onChange={(e) => setFormData({...formData, comboName: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className={labelClass}>Skin Type</label>
                    <select className={inputClass} value={formData.skinType} onChange={(e) => setFormData({...formData, skinType: e.target.value as any})}>
                        {Object.keys(SKIN_STYLES).map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                    </div>
                    <div>
                    <label className={labelClass}>Price (VND)</label>
                    <input type="number" className={inputClass} value={formData.comboPrice} onChange={(e) => setFormData({...formData, comboPrice: Number(e.target.value)})} />
                    </div>
                </div>
             </div>
          </div>
          <div className="border-t border-gray-100 pt-5 space-y-4 text-left">
              <div>
                <label className={labelClass}>Image URL</label>
                <input type="text" className={inputClass} value={formData.comboImg} onChange={(e) => setFormData({...formData, comboImg: e.target.value})} />
              </div>
              <div>
                <label className={labelClass}>Combo URL (Source)</label>
                <input type="text" className={inputClass} value={formData.comboUrl} onChange={(e) => setFormData({...formData, comboUrl: e.target.value})} />
              </div>
          </div>
        </div>
        <div className="p-6 pt-0 flex gap-3 bg-gray-50/50 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={() => { onSave(formData); onClose(); }} className="flex-1 px-4 py-2.5 rounded-xl bg-[#67AEFF] text-sm font-semibold text-white hover:bg-[#5698e6] shadow-lg shadow-blue-100 transition-colors">Save Combo</button>
        </div>
      </div>
    </div>
  );
};

/* ─── Shared Components ──────────────────────────────────── */
const ProductImage: React.FC<{ url: string; name: string; size?: string }> = ({ url, name, size = "w-11 h-11" }) => {
  const [err, setErr] = useState(false);
  return (
    <div className={`${size} overflow-hidden border border-gray-100 rounded-xl flex-shrink-0 bg-white shadow-inner flex items-center justify-center`}>
      {(!url || err) ? <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300"><ImageIcon size={size === "w-24 h-24" ? 32 : 16} /></div>
      : <img src={url} alt={name} className="w-full h-full object-cover" onError={() => setErr(true)} />}
    </div>
  );
};

/* ─── Main Combo Table Row ───────────────────────────────── */
const ComboRow: React.FC<{ 
  combo: Combo; 
  index: number; 
  onDelete: (c: Combo) => void; 
  onEdit: (c: Combo) => void; 
  onAddProduct: (cId: string) => void;
  onEditProduct: (cId: string, p: Product, pIdx: number) => void;
  onDeleteProduct: (cId: string, pName: string) => void; 
}> = ({ combo: c, index, onDelete, onEdit, onAddProduct, onEditProduct, onDeleteProduct }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <tr className={`transition-colors duration-150 ${open ? 'bg-slate-100/50' : 'hover:bg-slate-50/80'}`}>
        <td className="px-4 py-4 text-xs text-gray-400 font-mono text-center w-10">{String(index + 1).padStart(2, '0')}</td>
        <td className="px-4 py-4 whitespace-nowrap text-left">
          <span style={{ backgroundColor: SKIN_STYLES[c.skinType].bg, color: SKIN_STYLES[c.skinType].color, borderColor: SKIN_STYLES[c.skinType].border }} className="inline-flex items-center justify-center px-3 py-1 rounded-full border text-[10px] font-bold uppercase">
            {c.skinType}
          </span>
        </td>
        <td className="px-4 py-4 text-left">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ProductImage url={c.comboImg} name={c.comboName} size="w-12 h-12" />
              <span className="absolute -top-1 -right-1 bg-[#67AEFF] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {c.products.length}
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-gray-800 leading-snug line-clamp-1">{c.comboName}</div>
              <div className="text-[10px] text-gray-500 mt-0.5 italic line-clamp-1">{c.products.map(p => p.role).join(' • ')}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-left">
          <span className="text-sm font-bold text-gray-900">{c.comboPrice.toLocaleString('vi-VN')} <small className="text-[10px] font-normal text-gray-400 ml-1">VND</small></span>
        </td>
        <td className="px-4 py-3 text-center w-20">
          <a href={c.comboUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#67AEFF] bg-[#67AEFF]/10 border border-[#67AEFF]/20 hover:bg-[#67AEFF]/20 transition-all"><ExternalLink size={14} /></a>
        </td>
        <td className="px-4 py-4">
          <div className="flex items-center justify-end gap-2">
            <button onClick={() => onAddProduct(c.id)} className="w-8 h-8 rounded-lg border border-[#67AEFF]/20 bg-white text-[#67AEFF] hover:bg-[#67AEFF] hover:text-white transition-all flex items-center justify-center shadow-sm"><Plus size={18} /></button>
            <button onClick={() => onEdit(c)} className="w-8 h-8 rounded-lg border border-[#67AEFF]/20 bg-white text-[#67AEFF] hover:bg-[#67AEFF] hover:text-white transition-all flex items-center justify-center shadow-sm"><Edit3 size={14} /></button>
            <button onClick={() => onDelete(c)} className="w-8 h-8 rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-sm"><Trash2 size={14} /></button>
            <button onClick={() => setOpen(!open)} className={`w-8 h-8 ml-1 rounded-lg border transition-all flex items-center justify-center shadow-sm ${open ? 'bg-gray-800 border-gray-800 text-white' : 'bg-white border-gray-300 text-gray-600 hover:border-gray-800'}`}><ChevronDown size={18} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} /></button>
          </div>
        </td>
      </tr>
      {open && (
        <tr>
          <td colSpan={6} className="p-0 border-t border-gray-100 bg-slate-50/50 font-['Poppins']">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2.5 text-left"><ShoppingBag size={14} className="text-gray-400" /><span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Components ({c.products.length})</span></div>
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-gray-100">
                {c.products.map((p, idx) => (
                  <tr key={idx} className="hover:bg-white transition-colors">
                    <td className="px-5 py-3 text-[10px] font-mono text-gray-300 w-10 text-center">{String(idx + 1).padStart(2, '0')}</td>
                    <td className="px-4 py-3 w-32 whitespace-nowrap text-left">
                      <span style={{ backgroundColor: (CAT_STYLES[p.role] || {bg:'#f3f4f6'}).bg, color: (CAT_STYLES[p.role] || {color:'#67AEFF'}).color }} className="inline-flex px-3 py-1 rounded-lg text-[10px] font-bold uppercase border border-black/5 whitespace-nowrap">{p.role}</span>
                    </td>
                    <td className="px-4 py-3 text-left">
                      <div className="flex items-center gap-3.5">
                        <ProductImage url={p.img} name={p.name} size="w-10 h-10" />
                        <div className="text-[13px] font-semibold text-gray-800 line-clamp-1">{p.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-left">
                      <span className="text-sm font-bold text-gray-900">{p.price.toLocaleString('vi-VN')} <small className="text-[10px] font-normal text-gray-400 ml-1">VND</small></span>
                    </td>
                    <td className="px-4 py-3 text-center w-20">
                         <a href={p.url} target="_blank" rel="noreferrer" className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-white border border-[#67AEFF]/20 text-[#67AEFF] hover:bg-[#67AEFF]/10 transition-all"><ExternalLink size={14} /></a>
                    </td>
                    <td className="px-5 py-3 w-32">
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => onEditProduct(c.id, p, idx)} className="w-8 h-8 rounded-lg bg-white border border-[#67AEFF]/20 text-[#67AEFF] hover:bg-[#67AEFF] hover:text-white flex items-center justify-center shadow-sm transition-all"><Edit3 size={14} /></button>
                          <button onClick={() => onDeleteProduct(c.id, p.name)} className="w-8 h-8 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center shadow-sm transition-all"><Trash2 size={14} /></button>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

/* ─── Main Component ─────────────────────────────────────── */
const ComboProductTable: React.FC<Props> = ({ startIndex, itemsPerPage }) => {
  // DATA MẪU: 10 COMBO
  const [combos, setCombos] = useState<Combo[]>([
    {
      id: "CB-001",
      skinType: 'Normal',
      comboName: 'SIMPLE 3-Step Skincare Combo',
      comboPrice: 230400,
      comboUrl: 'https://vn.shp.ee/WFYXhET',
      comboImg: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m4ydah1vwqxj8a.webp',
      products: [
        { name: 'Facial Cleanser', role: 'Cleanser', price: 120000, url: '#', img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m35x3j7w6b4e67.webp' },
        { name: 'Moisturizer Gel', role: 'Moisturizer', price: 80000, url: '#', img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwjgu9nnoxjtca.webp' },
      ],
    },
    {
      id: "CB-002",
      skinType: 'Oily',
      comboName: 'Oily Skin Deep Clean Combo',
      comboPrice: 450000,
      comboUrl: '#',
      comboImg: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m4ydah1vwqxj8a.webp',
      products: [{ name: 'SVR Sebiaclear Gel', role: 'Cleanser', price: 385000, url: '#', img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m4ydah1vwqxj8a.webp' }],
    },
    {
      id: "CB-003",
      skinType: 'Dry',
      comboName: 'Hydrating Morning Routine',
      comboPrice: 320000,
      comboUrl: '#',
      comboImg: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwjgu9nnoxjtca.webp',
      products: [{ name: 'CeraVe Hydrating', role: 'Cleanser', price: 340000, url: '#', img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m35x3j7w6b4e67.webp' }],
    },
    {
      id: "CB-004",
      skinType: 'Sensitive',
      comboName: 'Gentle Recovery Set',
      comboPrice: 580000,
      comboUrl: '#',
      comboImg: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m4x7nesp11xf6c.webp',
      products: [{ name: 'La Roche-Posay B5', role: 'Moisturizer', price: 285000, url: '#', img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m4x7nesp11xf6c.webp' }],
    },
    {
      id: "CB-005",
      skinType: 'Combination',
      comboName: 'Balance & Glow Combo',
      comboPrice: 750000,
      comboUrl: '#',
      comboImg: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m4ydah1vwqxj8a.webp',
      products: [{ name: "Paula's Choice Toner", role: 'Toner', price: 650000, url: '#', img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m4ydah1vwqxj8a.webp' }],
    },
    {
      id: "CB-006",
      skinType: 'Oily',
      comboName: 'Anti-Acne Power Duo',
      comboPrice: 420000,
      comboUrl: '#',
      comboImg: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m4ydah1vwqxj8a.webp',
      products: [{ name: 'Niacinamide 10%', role: 'Serum', price: 195000, url: '#', img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m4ydah1vwqxj8a.webp' }],
    },
    {
      id: "CB-007",
      skinType: 'Dry',
      comboName: 'Ceramide Moisture Lock',
      comboPrice: 600000,
      comboUrl: '#',
      comboImg: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwjgu9nnoxjtca.webp',
      products: [{ name: 'CeraVe Cream', role: 'Moisturizer', price: 400000, url: '#', img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m35x3j7w6b4e67.webp' }],
    },
    {
      id: "CB-008",
      skinType: 'Sensitive',
      comboName: 'Calming Toner & Mist',
      comboPrice: 280000,
      comboUrl: '#',
      comboImg: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m35x3j7w6b4e67.webp',
      products: [{ name: 'Klairs Supple Toner', role: 'Toner', price: 250000, url: '#', img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m35x3j7w6b4e67.webp' }],
    },
    {
      id: "CB-009",
      skinType: 'Normal',
      comboName: 'Essential Sun Protection',
      comboPrice: 530000,
      comboUrl: '#',
      comboImg: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m4x7nesp11xf6c.webp',
      products: [{ name: 'Anessa Sunscreen', role: 'Sunscreen', price: 525000, url: '#', img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m4x7nesp11xf6c.webp' }],
    },
    {
      id: "CB-010",
      skinType: 'Combination',
      comboName: 'Matte Finish Routine',
      comboPrice: 480000,
      comboUrl: '#',
      comboImg: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwjgu9nnoxjtca.webp',
      products: [{ name: 'Bioderma Sebium', role: 'Toner', price: 395000, url: '#', img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwjgu9nnoxjtca.webp' }],
    }
  ]);

  const [deleteTarget, setDeleteTarget] = useState<{ type: 'combo' | 'product'; cId: string; id: string; name: string } | null>(null);
  const [editCombo, setEditCombo] = useState<Combo | null>(null);
  const [addProductToCId, setAddProductToCId] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<{ cId: string, p: Product, idx: number } | null>(null);

  // Logic phân trang
  const paginatedCombos = useMemo(() => {
    return combos.slice(startIndex, startIndex + itemsPerPage);
  }, [combos, startIndex, itemsPerPage]);

  const handleUpdateComboInfo = (updated: Combo) => setCombos(prev => prev.map(c => c.id === updated.id ? updated : c));
  const handleAddProduct = (newP: Product) => {
    if (!addProductToCId) return;
    setCombos(prev => prev.map(c => c.id === addProductToCId ? { ...c, products: [...c.products, newP] } : c));
  };
  const handleUpdateProduct = (updatedP: Product) => {
    if (!editProduct) return;
    setCombos(prev => prev.map(c => {
      if (c.id === editProduct.cId) {
        const newProducts = [...c.products];
        newProducts[editProduct.idx] = updatedP;
        return { ...c, products: newProducts };
      }
      return c;
    }));
  };
  const finalDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'combo') setCombos(prev => prev.filter(c => c.id !== deleteTarget.id));
    else setCombos(prev => prev.map(c => c.id === deleteTarget.cId ? { ...c, products: c.products.filter(p => p.name !== deleteTarget.name)} : c));
    setDeleteTarget(null);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden font-['Poppins']">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              {['#', 'Skin Type', 'Combo Details', 'Price', 'Source', 'Actions'].map((h, i) => (
                <th key={h} className={`px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap ${i === 3 ? 'text-left' : i === 4 ? 'text-center' : i === 5 ? 'text-right' : 'text-left'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedCombos.map((c, i) => (
              <ComboRow 
                key={c.id} combo={c} index={startIndex + i} 
                onEdit={setEditCombo}
                onAddProduct={setAddProductToCId}
                onEditProduct={(cId, p, idx) => setEditProduct({ cId, p, idx })}
                onDelete={(combo) => setDeleteTarget({ type: 'combo', cId: '', id: combo.id, name: combo.comboName })}
                onDeleteProduct={(cId, pName) => setDeleteTarget({ type: 'product', cId, id: 'inner', name: pName })}
              />
            ))}
          </tbody>
        </table>
      </div>

      <EditComboModal isOpen={!!editCombo} combo={editCombo} onSave={handleUpdateComboInfo} onClose={() => setEditCombo(null)} />
      <EditProductModal isOpen={!!addProductToCId} product={null} isNew={true} onSave={handleAddProduct} onClose={() => setAddProductToCId(null)} />
      <EditProductModal isOpen={!!editProduct} product={editProduct?.p || null} onSave={handleUpdateProduct} onClose={() => setEditProduct(null)} />
      
      {deleteTarget && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white p-8 rounded-2xl max-w-sm text-center shadow-2xl border border-gray-100 animate-in zoom-in duration-200 font-['Poppins']">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 text-red-500"><AlertTriangle size={32} /></div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Confirm Delete</h3>
              <p className="text-sm text-gray-500 mb-8 text-left leading-relaxed">Are you sure you want to remove <span className="font-bold text-gray-700">"{deleteTarget.name}"</span>? {deleteTarget.type === 'combo' ? 'This will remove all products inside it.' : ''} This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={finalDelete} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-200 transition-colors">Delete Now</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ComboProductTable;