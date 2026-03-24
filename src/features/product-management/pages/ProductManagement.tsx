import React, { useState, useEffect } from 'react';
import Sidebar from '../../admin/components/Sidebar';
import TopBar from '../../admin/components/TopBar';
import SingleProductTable from '../components/SingleProductTable';
import ComboProductTable from '@/features/product-management/components/ComboProductTable';
import { productApi, comboApi } from '../services/product.api';
import { 
  Package, Layers, Plus, X, Loader2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { toast } from '@/shared/hooks/use-toast';

const ProductManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'combo'>('single');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const itemsPerPage = 10; 
  const [refreshKey, setRefreshKey] = useState(0);

  const [skinTypes, setSkinTypes] = useState<{id: string, code: string}[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [newProduct, setNewProduct] = useState({
    name: '', usage_role: '', display_price: '',
    image_url: '', affiliate_url: '', is_active: true
  });

  const [newCombo, setNewCombo] = useState({
    combo_name: '', skin_type_id: '', 
    display_price: '', image_url: '', affiliate_url: '', is_active: true
  });

  // Fetch Auto Data
  useEffect(() => {
    const fetchAutoData = async () => {
      try {
        const [comboRes, productRes] = await Promise.all([
          comboApi.getCombos(1, 50),
          productApi.getProducts(1, 50)
        ]);

        if (comboRes?.items) {
          const typesMap = new Map();
          comboRes.items.forEach((item: any) => {
            if (item.skin_type) typesMap.set(item.skin_type.id, item.skin_type);
          });
          const uniqueTypes = Array.from(typesMap.values());
          setSkinTypes(uniqueTypes);
          if (uniqueTypes.length > 0 && !newCombo.skin_type_id) {
            setNewCombo(prev => ({ ...prev, skin_type_id: uniqueTypes[0].id }));
          }
        }

        if (productRes?.items) {
          const uniqueCats = Array.from(new Set(productRes.items.map((p: any) => p.usage_role))) as string[];
          setCategories(uniqueCats);
          if (uniqueCats.length > 0 && !newProduct.usage_role) {
            setNewProduct(prev => ({ ...prev, usage_role: uniqueCats[0] }));
          }
        }
      } catch (error) { console.error(error); }
    };
    fetchAutoData();
  }, [refreshKey]);

  // --- HANDLERS ---

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Chi tiết từng trường cho Product
    if (!newProduct.name.trim()) return toast({ title: "Required Field", description: "Please enter Product Name.", variant: "destructive" });
    if (!newProduct.usage_role) return toast({ title: "Required Field", description: "Please select a Category.", variant: "destructive" });
    if (!newProduct.display_price) return toast({ title: "Required Field", description: "Please enter Price.", variant: "destructive" });
    if (!newProduct.image_url.trim()) return toast({ title: "Required Field", description: "Please enter Image URL.", variant: "destructive" });
    if (!newProduct.affiliate_url.trim()) return toast({ title: "Required Field", description: "Please enter Affiliate Link.", variant: "destructive" });

    setIsSubmitting(true);
    try {
      const payload = { ...newProduct, display_price: Number(newProduct.display_price) };
      await productApi.createProduct(payload);
      
      toast({ title: 'Success', description: `Product "${newProduct.name}" created!`, variant: 'success' });
      setIsProductModalOpen(false);
      setNewProduct({ name: '', usage_role: categories[0] || '', display_price: '', image_url: '', affiliate_url: '', is_active: true });
      setRefreshKey(prev => prev + 1);
    } catch (error: any) {
      toast({ title: 'Error', description: error?.response?.data?.message || 'Failed to create product.', variant: 'destructive' });
    } finally { setIsSubmitting(false); }
  };

  const handleAddCombo = async (e: React.FormEvent) => {
    e.preventDefault();

    // Chi tiết từng trường cho Combo
    if (!newCombo.combo_name.trim()) return toast({ title: "Required Field", description: "Please enter Combo Name.", variant: "destructive" });
    if (!newCombo.skin_type_id) return toast({ title: "Required Field", description: "Please select Target Skin Type.", variant: "destructive" });
    if (!newCombo.display_price) return toast({ title: "Required Field", description: "Please enter Combo Price.", variant: "destructive" });
    if (!newCombo.image_url.trim()) return toast({ title: "Required Field", description: "Please enter Main Image URL.", variant: "destructive" });
    if (!newCombo.affiliate_url.trim()) return toast({ title: "Required Field", description: "Please enter Affiliate Link.", variant: "destructive" });

    setIsSubmitting(true);
    try {
      const payload = { 
        ...newCombo, 
        display_price: Number(newCombo.display_price),
        products: [] 
      };

      await comboApi.createCombo(payload);
      
      toast({ title: 'Success', description: `Combo "${newCombo.combo_name}" created!`, variant: 'success' });
      setIsComboModalOpen(false);
      setNewCombo({ combo_name: '', skin_type_id: skinTypes[0]?.id || '', display_price: '', image_url: '', affiliate_url: '', is_active: true });
      setRefreshKey(prev => prev + 1);
    } catch (error: any) {
      toast({ title: 'Error', description: error?.response?.data?.message || 'Failed to create combo.', variant: 'destructive' });
    } finally { setIsSubmitting(false); }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-4 focus:ring-[#67AEFF]/10 focus:border-[#67AEFF] transition-all font-['Poppins'] bg-gray-50/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
  const labelClass = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-['Poppins'] ml-1";

  return (
    <div className="flex bg-slate-50 min-h-screen w-full overflow-x-hidden font-['Poppins'] text-left">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 w-full md:ml-[220px] flex flex-col min-h-screen relative">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full flex-1 flex flex-col">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-xl md:text-[24px] font-bold text-gray-900">Product Management</h1>
              <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">Manage SkinNavi inventory and skincare routines</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm gap-1">
                <button onClick={() => { setActiveTab('single'); setCurrentPage(1); }} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'single' ? 'bg-[#67AEFF] text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:text-gray-600'}`}><Package size={14} />Products</button>
                <button onClick={() => { setActiveTab('combo'); setCurrentPage(1); }} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'combo' ? 'bg-[#67AEFF] text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:text-gray-600'}`}><Layers size={14} /> Combos</button>
              </div>
              <button onClick={() => activeTab === 'single' ? setIsProductModalOpen(true) : setIsComboModalOpen(true)} className="flex-1 sm:flex-none bg-[#67AEFF] hover:bg-[#5698e6] text-white px-6 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-100"><Plus size={16} />{activeTab === 'single' ? 'Add Product' : 'Add Combo'}</button>
            </div>
          </div>

          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden flex flex-col flex-1">
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              {activeTab === 'single' ? (
                <SingleProductTable key={`single-${refreshKey}`} itemsPerPage={itemsPerPage} currentPage={currentPage} refreshKey={refreshKey} onTotalPagesChange={setTotalPages} />
              ) : (
                <ComboProductTable key={`combo-${refreshKey}`} itemsPerPage={itemsPerPage} currentPage={currentPage} refreshKey={refreshKey} onTotalPagesChange={setTotalPages} />
              )}
            </div>

            <div className="px-4 md:px-8 py-5 border-t border-gray-50 flex items-center justify-between bg-white font-['Poppins']">
              <span className="text-[12px] md:text-[13px] font-medium text-gray-400">Page <span className="text-gray-900 font-bold">{currentPage}</span> of {totalPages || 1}</span>
              <div className="flex gap-2 md:gap-3">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition-all active:scale-90"><ChevronLeft size={18} /></button>
                <button disabled={currentPage >= (totalPages || 1)} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className="p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition-all active:scale-90"><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL NEW PRODUCT */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-50">
              <div className="px-6 pt-6 pb-2 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight text-left w-full ml-1">New Product</h3>
                <button onClick={() => setIsProductModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 mr-1"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddProduct} noValidate className="p-6 pt-2 space-y-4 text-left">
                <div><label className={labelClass}>Product Name *</label><input type="text" placeholder="Centella Serum" className={inputClass} value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Category *</label>
                    <select className={inputClass} value={newProduct.usage_role} onChange={(e) => setNewProduct({...newProduct, usage_role: e.target.value})}>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div><label className={labelClass}>Price (VND) *</label><input type="number" placeholder="0" className={inputClass} value={newProduct.display_price} onChange={(e) => setNewProduct({...newProduct, display_price: e.target.value})} /></div>
                </div>
                <div><label className={labelClass}>Image URL *</label><input type="text" placeholder="https://..." className={inputClass} value={newProduct.image_url} onChange={(e) => setNewProduct({...newProduct, image_url: e.target.value})} /></div>
                <div><label className={labelClass}>Affiliate Link *</label><input type="text" placeholder="Lazada/Shopee Link" className={inputClass} value={newProduct.affiliate_url} onChange={(e) => setNewProduct({...newProduct, affiliate_url: e.target.value})} /></div>
                <div className="pt-2">
                  <button disabled={isSubmitting} type="submit" className="w-full py-3.5 bg-[#67AEFF] hover:bg-[#5698e6] text-white rounded-xl font-bold transition-all active:scale-[0.98] flex justify-center items-center gap-2 shadow-lg shadow-blue-100 disabled:grayscale">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL NEW COMBO */}
        {isComboModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm text-left">
            <div className="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-50">
              <div className="px-6 pt-6 pb-2 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight text-left w-full ml-1">New Combo</h3>
                <button onClick={() => setIsComboModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 mr-1"><X size={20} /></button>
              </div>
              <form onSubmit={handleAddCombo} noValidate className="p-6 pt-2 space-y-4">
                <div><label className={labelClass}>Combo Name *</label><input type="text" placeholder="Routine Name" className={inputClass} value={newCombo.combo_name} onChange={(e) => setNewCombo({...newCombo, combo_name: e.target.value})} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Skin Type *</label>
                    <select className={inputClass} value={newCombo.skin_type_id} onChange={(e) => setNewCombo({...newCombo, skin_type_id: e.target.value})}>
                      {skinTypes.map(type => <option key={type.id} value={type.id}>{type.code}</option>)}
                    </select>
                  </div>
                  <div><label className={labelClass}>Price (VND) *</label><input type="number" placeholder="0" className={inputClass} value={newCombo.display_price} onChange={(e) => setNewCombo({...newCombo, display_price: e.target.value})} /></div>
                </div>
                <div><label className={labelClass}>Image URL *</label><input type="text" placeholder="https://..." className={inputClass} value={newCombo.image_url} onChange={(e) => setNewCombo({...newCombo, image_url: e.target.value})} /></div>
                <div><label className={labelClass}>Affiliate Link *</label><input type="text" placeholder="Shopee/Lazada Link" className={inputClass} value={newCombo.affiliate_url} onChange={(e) => setNewCombo({...newCombo, affiliate_url: e.target.value})} /></div>
                <div className="pt-2">
                  <button disabled={isSubmitting} type="submit" className="w-full py-3.5 bg-[#67AEFF] hover:bg-[#5698e6] text-white rounded-xl font-bold transition-all active:scale-[0.98] flex justify-center items-center gap-2 shadow-lg shadow-blue-100 disabled:grayscale">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Create Combo Routine'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;