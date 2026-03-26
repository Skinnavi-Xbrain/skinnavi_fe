import React, { useState } from 'react';
import { Package, Layers, ExternalLink, MoreVertical, Edit3, Trash2 } from 'lucide-react';

// --- Types ---
interface Product {
  id: string;
  name: string;
  usage_role: string;
  display_price: number;
  image_url: string;
  affiliate_url: string;
  is_active: boolean;
  combo_count?: number; // Lấy từ combo_products count
}

const MOCK_PRODUCTS: Product[] = [
  { id: '00fa59', name: 'Nano THC Oil-Control', usage_role: 'Cleanser', display_price: 123000, image_url: '', affiliate_url: '#', is_active: true, combo_count: 2 },
  { id: '062ada', name: 'ICSEA Australian Tea Tree', usage_role: 'Cleanser', display_price: 159000, image_url: '', affiliate_url: '#', is_active: true, combo_count: 5 },
  { id: '0cd87f', name: 'Bee Venom Essence', usage_role: 'Serum', display_price: 500000, image_url: '', affiliate_url: '#', is_active: true, combo_count: 0 },
];

const ProductTable: React.FC<{ mode: 'single' | 'combo' }> = ({ mode }) => {
  // Filter products based on mode (nếu là combo thì chỉ hiện sp có trong ít nhất 1 combo)
  const filteredProducts = mode === 'combo' 
    ? MOCK_PRODUCTS.filter(p => (p.combo_count ?? 0) > 0)
    : MOCK_PRODUCTS;

  return (
    <div className="overflow-x-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-50/50">
            <th className={thStyle}>#</th>
            <th className={thStyle}>Product Info</th>
            <th className={thStyle}>Usage Role</th>
            <th className={thStyle}>Price</th>
            {mode === 'combo' && <th className={thStyle}>In Combos</th>}
            <th className={thStyle}>Status</th>
            <th className={`${thStyle} text-right`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id} className="hover:bg-blue-50/30 transition-colors border-b border-gray-100">
              <td className={tdStyle}>
                <span className="text-xs font-medium text-gray-400">{index + 1}</span>
              </td>
              <td className={tdStyle}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex-shrink-0 overflow-hidden">
                     {product.image_url ? <img src={product.image_url} alt="" /> : <Package className="m-auto mt-2 text-gray-400" size={18} />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800 line-clamp-1">{product.name}</div>
                    <div className="text-[11px] text-gray-400 font-mono uppercase tracking-tighter">ID: {product.id}</div>
                  </div>
                </div>
              </td>
              <td className={tdStyle}>
                <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-[11px] font-bold uppercase">
                  {product.usage_role}
                </span>
              </td>
              <td className={tdStyle}>
                <span className="text-sm font-bold text-blue-600">{product.display_price.toLocaleString()}đ</span>
              </td>
              {mode === 'combo' && (
                <td className={tdStyle}>
                  <div className="flex items-center gap-1.5 text-purple-600 font-bold text-xs">
                    <Layers size={14} />
                    {product.combo_count} Combos
                  </div>
                </td>
              )}
              <td className={tdStyle}>
                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-bold ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${product.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                  {product.is_active ? 'ACTIVE' : 'INACTIVE'}
                </div>
              </td>
              <td className={`${tdStyle} text-right`}>
                <div className="flex justify-end gap-1">
                  <button className={actionBtnStyle} title="View Affiliate Link">
                    <ExternalLink size={16} className="text-gray-400 hover:text-blue-500" />
                  </button>
                  <button className={actionBtnStyle} title="Edit Product">
                    <Edit3 size={16} className="text-gray-400 hover:text-purple-500" />
                  </button>
                  <button className={actionBtnStyle} title="Delete">
                    <Trash2 size={16} className="text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = "px-6 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100";
const tdStyle = "px-6 py-4 whitespace-nowrap border-b border-gray-50";
const actionBtnStyle = "p-2 hover:bg-white rounded-lg transition-all active:scale-90 border border-transparent hover:border-gray-100";

export default ProductTable;