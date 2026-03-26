import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';
import { productApi } from '../services/product.api';
import { toast } from '@/shared/hooks/use-toast';

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-4 focus:ring-[#67AEFF]/10 focus:border-[#67AEFF] transition-all font-['Poppins'] bg-gray-50/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
const labelClass = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1 font-['Poppins']";

export const EditComboModal = ({ isOpen, combo, onSave, onClose }: any) => {
  const [formData, setFormData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { if (combo) setFormData(combo); }, [combo, isOpen]);

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.combo_name?.trim()) return toast({ title: "Required Field", description: "Please enter combo name.", variant: "destructive" });
    if (!formData.display_price) return toast({ title: "Required Field", description: "Please enter combo price.", variant: "destructive" });
    if (!formData.image_url?.trim()) return toast({ title: "Required Field", description: "Please provide a main image URL.", variant: "destructive" });
    if (!formData.affiliate_url?.trim()) return toast({ title: "Required Field", description: "Please enter affiliate link.", variant: "destructive" });
    
    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {} finally { setIsSubmitting(false); }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 z-[45] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-300 border border-gray-50 font-['Poppins'] relative">
        <div className="px-6 pt-6 pb-2 flex justify-between items-center text-left">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Edit Combo</h3>
          <button onClick={onClose} className="p-2 hover:bg-blue-50 rounded-full text-gray-400 transition-colors"><X size={20}/></button>
        </div>
        <form onSubmit={handleAction} noValidate className="p-6 space-y-4 text-left">
          <div><label className={labelClass}>Combo Name</label><input className={inputClass} value={formData.combo_name} onChange={e => setFormData({...formData, combo_name: e.target.value})} /></div>
          <div><label className={labelClass}>Price (VND)</label><input type="number" className={inputClass} value={formData.display_price} onChange={e => setFormData({...formData, display_price: e.target.value})} /></div>
          <div><label className={labelClass}>Main Image URL</label><input className={inputClass} value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} /></div>
          <div><label className={labelClass}>Affiliate Link</label><input className={inputClass} value={formData.affiliate_url} onChange={e => setFormData({...formData, affiliate_url: e.target.value})} /></div>
          <div className="pt-2">
            <button disabled={isSubmitting} type="submit" className="w-full py-3.5 bg-[#67AEFF] hover:bg-[#5698e6] text-white rounded-xl font-bold transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-100">
              {isSubmitting ? <Loader2 className="animate-spin" size={18}/> : 'Update Combo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const EditProductModal = ({ isOpen, product, isNew, onSave, onClose }: any) => {
  const [availableProducts, setAvailableProducts] = useState<any[]>([]);
  const [selectedPId, setSelectedPId] = useState('');
  const [previewProduct, setPreviewProduct] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchList = async () => {
        try {
          const res = await productApi.getProducts(1, 100);
          setAvailableProducts(res.items || []);
          if (product) {
            setSelectedPId(product.id);
            setPreviewProduct(product);
          } else {
            setSelectedPId('');
            setPreviewProduct(null);
          }
        } catch (err) { console.error(err); }
      };
      fetchList();
    }
  }, [isOpen, isNew, product]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pId = e.target.value;
    setSelectedPId(pId);
    const found = availableProducts.find(p => p.id === pId);
    setPreviewProduct(found || null);
  };

  const handleAction = async () => {
    if (!selectedPId) return toast({ title: "Selection Required", description: "Please select a product.", variant: "destructive" });
    setIsSubmitting(true);
    try {
      await onSave({ product_id: selectedPId });
      onClose();
    } catch (err) {} finally { setIsSubmitting(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[45] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in border border-gray-50 font-['Poppins']">
        <div className="px-6 pt-6 pb-2 flex justify-between items-center text-left border-b border-gray-50">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">{isNew ? 'Add Component' : 'Change Product'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-blue-50 rounded-full text-gray-400 transition-colors"><X size={20}/></button>
        </div>

        <div className="p-6 space-y-6 text-left">
          <div className="bg-blue-50/20 border border-blue-100/50 rounded-2xl p-4 min-h-[100px] flex items-center justify-center">
            {previewProduct ? (
              <div className="flex items-start gap-4 w-full animate-in fade-in zoom-in duration-300">
                <img src={previewProduct.image_url} className="w-16 h-16 rounded-xl object-cover border border-white shadow-sm bg-white" alt="" />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-gray-800 line-clamp-2 leading-tight">{previewProduct.name}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[9px] px-2 py-0.5 rounded-lg bg-white border border-blue-100 text-blue-500 font-bold uppercase tracking-wider">{previewProduct.usage_role}</span>
                    <span className="text-[12px] font-semibold text-gray-900">{Number(previewProduct.display_price).toLocaleString()}đ</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-xs italic flex flex-col items-center gap-2">
                 <div className="w-10 h-10 rounded-xl bg-gray-50 border border-dashed border-gray-200" />
                 Please select a product below
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>Select Product From Library</label>
            <select className={inputClass} value={selectedPId} onChange={handleSelectChange}>
              <option value="">-- Choose a product --</option>
              {availableProducts.map((p: any) => (
                <option key={p.id} value={p.id}>{p.name} ({p.usage_role})</option>
              ))}
            </select>
          </div>

          <div className="pt-2">
            <button 
              disabled={isSubmitting || !selectedPId} 
              onClick={handleAction} 
              className="w-full py-3.5 bg-[#67AEFF] hover:bg-[#5698e6] text-white rounded-xl font-bold transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-100 disabled:opacity-50 disabled:grayscale"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18}/> : (isNew ? 'Confirm Add to Combo' : 'Confirm Change')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DeleteConfirmModal = ({ isOpen, title, name, onConfirm, onClose }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[45] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white p-8 rounded-[1.5rem] max-w-sm w-full text-center shadow-2xl animate-in zoom-in border border-gray-100 font-['Poppins']">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5 border border-red-100"><AlertTriangle size={32}/></div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">{title || 'Confirm Delete'}</h3>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">Are you sure you want to remove <span className="font-bold text-gray-800">"{name}"</span>?</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3.5 bg-white text-black-400 border border-blue-100 font-bold rounded-xl hover:bg-blue-50 transition-all">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-3.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-100 hover:bg-red-700 transition-all">Delete</button>
        </div>
      </div>
    </div>
  );
};