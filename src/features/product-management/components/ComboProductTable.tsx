import React, { useState, useEffect } from 'react';
import { ChevronDown, Edit3, Trash2, ExternalLink, AlertTriangle, Plus, ShoppingBag } from 'lucide-react';
import { comboApi } from '../services/product.api';
import { type Combo, type Product } from '../types/product';
// Đảm bảo Hằng đã có 2 Modal này ở file cùng thư mục hoặc sửa đường dẫn import
// import { EditComboModal, EditProductModal } from './ComboModals'; 

/* ─── Constants ─── */
const SKIN_MAP: Record<string, any> = {
  'e42d3c01-dffd-4730-8c7d-f6a0aa0248c2': { label: 'OILY', bg: '#FFF1E7', color: '#B04500', border: '#FDDCC4' },
  'default': { label: 'NORMAL', bg: '#EBFBEE', color: '#1A7A2F', border: '#C3F0CC' }
};

const CAT_STYLES: Record<string, any> = {
  'Cleanser': { bg: '#F0F9FF', color: '#0369A1' },
  'Makeup Remover': { bg: '#FFF1F2', color: '#9D174D' },
  'Toner': { bg: '#F5F3FF', color: '#6D28D9' },
  'Serum': { bg: '#FAF5FF', color: '#7C3AED' },
  'Sunscreen': { bg: '#FEFCE8', color: '#854D0E' },
  'Moisturizer': { bg: '#F0FDF4', color: '#15803D' },
};

/* ─── Main Component ─── */
const ComboProductTable: React.FC<any> = ({ currentPage, itemsPerPage, refreshKey, onTotalPagesChange }) => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);

  // States cho Modals
  const [editCombo, setEditCombo] = useState<Combo | null>(null);
  const [addProductToCId, setAddProductToCId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const fetchCombos = async () => {
    setLoading(true);
    try {
      // Vì service trả về res.data nên response chính là object chứa { items, totalPages }
      const response = await comboApi.getCombos(currentPage, itemsPerPage);
      
      // Map đúng theo kết quả Postman
      const rawData = response?.items || [];
      const totalPages = response?.totalPages || 1;

      setCombos(rawData);
      
      if (onTotalPagesChange) {
        onTotalPagesChange(totalPages);
      }
    } catch (error) {
      console.error("Lỗi fetch dữ liệu combo:", error);
      setCombos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchCombos(); 
  }, [currentPage, refreshKey]);

  // Xử lý Cập nhật Combo Info
  const handleUpdateComboInfo = async (updated: Combo) => {
    try {
      await comboApi.updateCombo(updated.id, updated);
      await fetchCombos();
      setEditCombo(null);
    } catch (err) { alert("Cập nhật combo thất bại!"); }
  };

  // Xử lý Thêm sản phẩm vào Combo
  const handleAddProduct = async (newP: Product) => {
    if (!addProductToCId) return;
    const target = combos.find(c => c.id === addProductToCId);
    if (!target) return;

    const newComboProducts = [
      ...(target.combo_products || []), 
      { step_order: (target.combo_products?.length || 0) + 1, product: newP }
    ];
    
    try {
      await comboApi.updateCombo(addProductToCId, { combo_products: newComboProducts as any });
      await fetchCombos();
      setAddProductToCId(null);
    } catch (err) { alert("Thêm sản phẩm thất bại!"); }
  };

  // Xử lý Xóa
  const finalDelete = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === 'combo') {
        await comboApi.deleteCombo(deleteTarget.id);
      } else {
        const target = combos.find(c => c.id === deleteTarget.cId);
        if (target) {
          const filtered = target.combo_products.filter(cp => cp.product.name !== deleteTarget.name);
          await comboApi.updateCombo(deleteTarget.cId, { combo_products: filtered as any });
        }
      }
      await fetchCombos();
      setDeleteTarget(null);
    } catch (err) { alert("Xóa thất bại!"); }
  };

  if (loading) return (
    <div className="p-20 text-center font-['Poppins']">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#67AEFF] mb-4"></div>
      <p className="text-[#67AEFF] font-medium">Đang tải dữ liệu SkinNavi...</p>
    </div>
  );

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden font-['Poppins']">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60 text-left">
              {['#', 'Skin Type', 'Combo Details', 'Price', 'Source', 'Actions'].map((h, i) => (
                <th key={h} className={`px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest ${i === 4 ? 'text-center' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {combos.length > 0 ? (
              combos.map((c, i) => (
                <ComboRow 
                  key={c.id} 
                  combo={c} 
                  index={(currentPage - 1) * itemsPerPage + i + 1}
                  onEdit={setEditCombo}
                  onAddProduct={setAddProductToCId}
                  onDelete={(combo: any) => setDeleteTarget({ type: 'combo', id: combo.id, name: combo.combo_name })}
                  onDeleteProduct={(cId: string, pName: string) => setDeleteTarget({ type: 'product', cId, name: pName })}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-10 text-center text-gray-400 italic">Không tìm thấy combo nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Popup */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center shadow-xl border border-gray-100 animate-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle size={30}/></div>
            <h3 className="text-lg font-bold mb-2">Xác nhận xóa?</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">Bạn có chắc muốn xóa <span className="font-bold text-gray-700">"{deleteTarget.name}"</span>? Thao tác này không thể hoàn tác.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-3 bg-gray-100 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors">Hủy</button>
              <button onClick={finalDelete} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-red-100 hover:bg-red-700 transition-colors">Xóa ngay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Component Hàng (Row) ─── */
const ComboRow = ({ combo: c, index, onEdit, onAddProduct, onDelete, onDeleteProduct }: any) => {
    const [open, setOpen] = useState(false);
    const skinStyle = SKIN_MAP[c.skin_type_id] || SKIN_MAP['default'];
    
    return (
        <>
            <tr className={`hover:bg-slate-50/80 transition-colors duration-200 ${open ? 'bg-slate-50/80' : ''}`}>
                <td className="px-4 py-4 text-xs font-mono text-gray-400 text-center">{String(index).padStart(2, '0')}</td>
                <td className="px-4 py-4">
                    <span style={{ backgroundColor: skinStyle.bg, color: skinStyle.color, borderColor: skinStyle.border }} className="px-3 py-1 rounded-full text-[10px] font-bold border uppercase">
                        {skinStyle.label}
                    </span>
                </td>
                <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img src={c.image_url} className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm" alt={c.combo_name} />
                            <span className="absolute -top-1 -right-1 bg-[#67AEFF] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                                {c.combo_products?.length || 0}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <div className="text-[13px] font-bold text-gray-800 line-clamp-1">{c.combo_name}</div>
                            <div className="text-[10px] text-gray-400 mt-0.5 italic line-clamp-1">
                                {c.combo_products?.map((cp: any) => cp.product.usage_role).join(' • ')}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-4">
                    <span className="text-sm font-bold text-gray-900">{Number(c.display_price).toLocaleString('vi-VN')} <small className="text-[10px] font-normal text-gray-400">VND</small></span>
                </td>
                <td className="px-4 py-4 text-center">
                    <a href={c.affiliate_url} target="_blank" rel="noreferrer" className="p-2 inline-flex text-[#67AEFF] bg-[#67AEFF]/10 rounded-lg hover:bg-[#67AEFF]/20 transition-all border border-[#67AEFF]/10">
                        <ExternalLink size={14}/>
                    </a>
                </td>
                <td className="px-4 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                        <button onClick={() => onAddProduct(c.id)} className="p-2 bg-white border border-[#67AEFF]/20 text-[#67AEFF] rounded-lg hover:bg-[#67AEFF] hover:text-white transition-all shadow-sm"><Plus size={16}/></button>
                        <button onClick={() => onEdit(c)} className="p-2 bg-white border border-[#67AEFF]/20 text-[#67AEFF] rounded-lg hover:bg-[#67AEFF] hover:text-white transition-all shadow-sm"><Edit3 size={14}/></button>
                        <button onClick={() => onDelete(c)} className="p-2 bg-white border border-red-100 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"><Trash2 size={14}/></button>
                        <button onClick={() => setOpen(!open)} className={`p-2 rounded-lg border transition-all shadow-sm ${open ? 'bg-gray-800 border-gray-800 text-white' : 'bg-white text-gray-400 hover:border-gray-800 hover:text-gray-800'}`}>
                            <ChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}/>
                        </button>
                    </div>
                </td>
            </tr>
            
            {/* Expanded Content: Chi tiết sản phẩm con */}
            {open && (
                <tr className="animate-in fade-in duration-300">
                    <td colSpan={6} className="bg-slate-50/50 p-0 border-t border-gray-100">
                        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2 text-gray-500">
                            <ShoppingBag size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Bộ sản phẩm chi tiết</span>
                        </div>
                        <div className="p-4 flex flex-col gap-2.5">
                            {c.combo_products?.length > 0 ? (
                                c.combo_products.map((cp: any, idx: number) => (
                                    <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:border-[#67AEFF]/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-mono text-gray-300 w-5">{(cp.step_order || idx + 1).toString().padStart(2, '0')}</span>
                                            <img src={cp.product.image_url} className="w-10 h-10 rounded-lg object-cover border border-gray-50" alt="" />
                                            <div>
                                                <div className="text-[13px] font-semibold text-gray-800">{cp.product.name}</div>
                                                <div className="flex gap-2 mt-0.5">
                                                    <span style={{ backgroundColor: (CAT_STYLES[cp.product.usage_role]?.bg || '#f3f4f6'), color: (CAT_STYLES[cp.product.usage_role]?.color || '#6b7280') }} className="text-[9px] px-2 py-0.5 rounded-md font-bold uppercase">
                                                        {cp.product.usage_role}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <div className="text-right">
                                                <span className="text-xs font-bold text-gray-900">{Number(cp.product.display_price).toLocaleString()}đ</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <a href={cp.product.affiliate_url} target="_blank" rel="noreferrer" className="p-1.5 text-gray-400 hover:text-[#67AEFF] transition-colors"><ExternalLink size={14}/></a>
                                                <button onClick={() => onDeleteProduct(c.id, cp.product.name)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 text-[11px] text-gray-400 italic">Combo này chưa có sản phẩm thành phần.</div>
                            )}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}

export default ComboProductTable;