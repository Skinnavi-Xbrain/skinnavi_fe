import React, { useState, useEffect } from 'react';
import Sidebar from '../../admin/components/Sidebar';
import TopBar from '../../admin/components/TopBar';
import SingleProductTable from '../components/SingleProductTable';
import ComboProductTable from '@/features/product-management/components/ComboProductTable'; // Đã import đúng
import { productApi } from '../services/product.api';
import { 
  Package, Layers, Plus, X, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight 
} from 'lucide-react';

const ProductManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'combo'>('single');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const itemsPerPage = 10; 
  const [refreshKey, setRefreshKey] = useState(0);

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', usage_role: 'Cleanser', display_price: '',
    image_url: '', affiliate_url: '', is_active: true
  });

  const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false, message: '', type: 'success'
  });

  // Hàm chuyển Tab
  const handleTabSwitch = (tab: 'single' | 'combo') => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset về trang 1 khi đổi tab
  };

  const showMsg = (msg: string, type: 'success' | 'error') => {
    setNotification({ show: true, message: msg, type });
  };

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const handleAddProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.display_price) {
        showMsg("Please enter product name and price!", "error");
        return;
      }

      const response = await productApi.createProduct(newProduct);
      
      if (response.status === 200 || response.status === 201 || (response.data && response.data.success)) {
        showMsg("Product created successfully!", "success");
        setIsProductModalOpen(false);
        setNewProduct({
          name: '', usage_role: 'Cleanser', display_price: '',
          image_url: '', affiliate_url: '', is_active: true
        });

        setCurrentPage(1);
        setRefreshKey(prev => prev + 1);
      }
    } catch (error) {
      showMsg("Error creating product!", "error");
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-4 focus:ring-[#67AEFF]/10 focus:border-[#67AEFF] transition-all font-['Poppins']";
  const labelClass = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-['Poppins']";

  return (
    <div className="flex bg-slate-50 min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 md:ml-[220px] flex flex-col min-h-screen relative">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        {/* Notification Toast */}
        {notification.show && (
          <div className="fixed top-6 right-6 z-[200] animate-in slide-in-from-right-10 duration-300">
            <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border bg-white ${notification.type === 'success' ? 'border-green-100' : 'border-red-100'}`}>
              {notification.type === 'success' ? <CheckCircle2 className="text-green-500" size={20} /> : <AlertCircle className="text-red-500" size={20} />}
              <span className="text-sm font-bold text-gray-700">{notification.message}</span>
              <button onClick={() => setNotification(prev => ({ ...prev, show: false }))} className="ml-2 text-gray-400 hover:text-gray-600"><X size={16} /></button>
            </div>
          </div>
        )}

        <div className="p-6 max-w-[1600px] mx-auto w-full flex-1 flex flex-col text-left">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-xl md:text-[22px] font-bold text-gray-900">Product Management</h1>
              <p className="text-sm text-gray-500 mt-1">Manage affiliate products and routine combos</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm gap-1">
                <button onClick={() => handleTabSwitch('single')} className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'single' ? 'bg-[#67AEFF] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}><Package size={14} />Products</button>
                <button onClick={() => handleTabSwitch('combo')} className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'combo' ? 'bg-[#67AEFF] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}><Layers size={14} /> Combos</button>
              </div>
              <button onClick={() => setIsProductModalOpen(true)} className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg"><Plus size={16} />Add Product</button>
            </div>
          </div>

          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden flex flex-col flex-1">
            <div className="flex-1 overflow-x-auto">
              {activeTab === 'single' ? (
                <SingleProductTable 
                  key={`single-${refreshKey}`}
                  itemsPerPage={itemsPerPage} 
                  currentPage={currentPage}
                  refreshKey={refreshKey}
                  onTotalPagesChange={setTotalPages}
                  onDelete={() => { showMsg("Product deleted successfully!", "success"); setRefreshKey(prev => prev + 1); }} 
                />
              ) : (
                /* SỬA TẠI ĐÂY: Gọi ComboProductTable thay vì dòng chữ "coming soon" */
                <ComboProductTable 
                  key={`combo-${refreshKey}`}
                  itemsPerPage={itemsPerPage} 
                  currentPage={currentPage}
                  refreshKey={refreshKey}
                  onTotalPagesChange={setTotalPages}
                />
              )}
            </div>

            {/* Pagination Controls */}
            <div className="px-8 py-5 border-t border-gray-50 flex items-center justify-between bg-white">
              <span className="text-[13px] font-medium text-gray-400">Page <span className="text-gray-900 font-bold">{currentPage}</span> of {totalPages}</span>
              <div className="flex gap-3">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition-all active:scale-90"><ChevronLeft size={18} /></button>
                <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className="p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 disabled:opacity-30 transition-all active:scale-90"><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Add Product (Giữ nguyên) */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-xl font-bold text-gray-800">Add New Product</h3>
                <button onClick={() => setIsProductModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              <div className="p-8 space-y-6 text-left">
                <div>
                  <label className={labelClass}>Product Name</label>
                  <input type="text" className={inputClass} placeholder="Enter name..." value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Category</label>
                    <select className={inputClass} value={newProduct.usage_role} onChange={(e) => setNewProduct({...newProduct, usage_role: e.target.value})}>
                      <option value="Cleanser">Cleanser</option><option value="Serum">Serum</option><option value="Sunscreen">Sunscreen</option><option value="Moisturizer">Moisturizer</option><option value="Makeup Remover">Makeup Remover</option><option value="Toner">Toner</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Price (VND)</label>
                    <input type="number" className={inputClass} placeholder="0" value={newProduct.display_price} onChange={(e) => setNewProduct({...newProduct, display_price: e.target.value})} />
                  </div>
                </div>
                <div><label className={labelClass}>Image URL</label><input type="text" className={inputClass} value={newProduct.image_url} onChange={(e) => setNewProduct({...newProduct, image_url: e.target.value})} /></div>
                <div><label className={labelClass}>Affiliate Link</label><input type="text" className={inputClass} value={newProduct.affiliate_url} onChange={(e) => setNewProduct({...newProduct, affiliate_url: e.target.value})} /></div>
              </div>
              <div className="p-8 pt-0 flex gap-3">
                <button onClick={() => setIsProductModalOpen(false)} className="flex-1 py-3.5 rounded-2xl border border-gray-200 font-bold text-gray-600">Cancel</button>
                <button onClick={handleAddProduct} className="flex-1 py-3.5 rounded-2xl bg-[#67AEFF] text-white font-bold shadow-lg shadow-blue-100">Create Product</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;