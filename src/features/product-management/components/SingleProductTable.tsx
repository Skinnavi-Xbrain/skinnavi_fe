import React, { useState, useEffect } from 'react'
import { ExternalLink, Edit3, Trash2, AlertTriangle, X, Loader2 } from 'lucide-react'
import { type Product } from '../types/product'
import { productApi } from '../services/product.api'
import { toast } from '@/shared/hooks/use-toast'

const PASTEL_COLORS = [
  { bg: '#E0F2FE', text: '#0369A1' },
  { bg: '#F0FDF4', text: '#166534' },
  { bg: '#FEF9C3', text: '#854D0E' },
  { bg: '#FAF5FF', text: '#6B21A8' },
  { bg: '#FFF1F2', text: '#9F1239' }
]

const EditProductModal: React.FC<{
  isOpen: boolean
  product: Product | null
  onSave: (updated: Product) => Promise<void>
  onClose: () => void
}> = ({ isOpen, product, onSave, onClose }) => {
  const [formData, setFormData] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const CATEGORY_OPTIONS = [
    'Cleanser',
    'Serum',
    'Sunscreen',
    'Moisturizer',
    'Makeup Remover',
    'Toner'
  ]

  useEffect(() => {
    if (product) setFormData(product)
  }, [product, isOpen])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    if (!formData.name?.trim())
      return toast({
        title: 'Required Field',
        description: 'Please enter product name.',
        variant: 'destructive'
      })
    if (!formData.usage_role)
      return toast({
        title: 'Required Field',
        description: 'Please select a category.',
        variant: 'destructive'
      })
    if (!formData.display_price)
      return toast({
        title: 'Required Field',
        description: 'Please enter price.',
        variant: 'destructive'
      })
    if (!formData.image_url?.trim())
      return toast({
        title: 'Required Field',
        description: 'Image URL cannot be empty.',
        variant: 'destructive'
      })
    if (!formData.affiliate_url?.trim())
      return toast({
        title: 'Required Field',
        description: 'Affiliate Link is required.',
        variant: 'destructive'
      })

    setIsSubmitting(true)
    try {
      await onSave(formData)
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen || !formData) return null

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-4 focus:ring-[#67AEFF]/10 focus:border-[#67AEFF] transition-all bg-gray-50/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-['Poppins']"
  const labelClass =
    "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1 font-['Poppins']"

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-50">
        <div className="px-6 pt-6 pb-2 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight font-['Poppins']">
            Edit Product
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} noValidate className="p-6 space-y-4 text-left">
          <div>
            <label className={labelClass}>Product Name</label>
            <input
              type="text"
              className={inputClass}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category</label>
              <select
                className={inputClass}
                value={formData.usage_role}
                onChange={(e) => setFormData({ ...formData, usage_role: e.target.value })}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Price (VND)</label>
              <input
                type="number"
                className={inputClass}
                value={formData.display_price}
                onChange={(e) => setFormData({ ...formData, display_price: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Image URL</label>
            <input
              type="text"
              className={inputClass}
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Affiliate Link</label>
            <input
              type="text"
              className={inputClass}
              value={formData.affiliate_url}
              onChange={(e) => setFormData({ ...formData, affiliate_url: e.target.value })}
            />
          </div>

          <div className="pt-2">
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full py-3.5 bg-[#67AEFF] hover:bg-[#5698e6] text-white rounded-xl font-bold transition-all active:scale-[0.98] flex justify-center items-center gap-2 shadow-lg shadow-blue-100 disabled:grayscale"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const SingleProductTable: React.FC<any> = ({
  itemsPerPage,
  currentPage,
  refreshKey,
  onTotalPagesChange,
  onEdit,
  onDelete
}) => {
  const [data, setData] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [editTarget, setEditTarget] = useState<Product | null>(null)

  const getCategoryStyle = (role: string) =>
    PASTEL_COLORS[(role || '').length % PASTEL_COLORS.length]

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await productApi.getProducts(currentPage, itemsPerPage)
      setData(res.items || [])
      if (onTotalPagesChange) onTotalPagesChange(res.totalPages || 1)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [currentPage, refreshKey])

  const handleUpdate = async (updated: Product) => {
    try {
      const payload = { ...updated, display_price: Number(updated.display_price) }
      await productApi.updateProduct(updated.id, payload)
      toast({ title: 'Success', description: 'Product updated successfully.', variant: 'success' })
      fetchProducts()
      if (onEdit) onEdit(updated)
    } catch (error: any) {
      toast({
        title: 'Update Failed',
        description: error?.response?.data?.message || 'Error occurred.',
        variant: 'destructive'
      })
      throw error
    }
  }

  const finalDelete = async () => {
    if (!deleteTarget) return
    try {
      await productApi.deleteProduct(deleteTarget.id)
      toast({ title: 'Success', description: 'Product deleted successfully.', variant: 'success' })
      fetchProducts()
      if (onDelete) onDelete(deleteTarget.id)
      setDeleteTarget(null)
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete product.', variant: 'destructive' })
    }
  }

  if (loading)
    return (
      <div className="p-20 text-center text-gray-400 font-['Poppins'] animate-pulse font-medium">
        Loading...
      </div>
    )

  return (
    <div className="w-full overflow-x-auto font-['Poppins']">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/60 text-gray-400">
            {['#', 'Category', 'Product Details', 'Price', 'Source', 'Actions'].map((h, i) => (
              <th
                key={h}
                className={`px-4 py-5 text-[10px] font-bold uppercase tracking-widest ${i === 5 && 'text-right'}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((p, i) => {
            const style = getCategoryStyle(p.usage_role)
            const displayIndex = (currentPage - 1) * itemsPerPage + i + 1
            return (
              <tr key={p.id} className="group hover:bg-slate-50/80 transition-colors">
                <td className="px-4 py-4 text-xs text-gray-300 font-mono text-center w-10">
                  {String(displayIndex).padStart(2, '0')}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    style={{ backgroundColor: style.bg, color: style.text }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border border-black/5 tracking-wider"
                  >
                    {p.usage_role}
                  </span>
                </td>
                <td className="px-4 py-4 text-left">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image_url}
                      alt=""
                      className="w-11 h-11 rounded-xl border border-gray-100 bg-white object-cover"
                    />
                    <div className="text-[13px] font-medium text-gray-800 line-clamp-1 max-w-[250px]">
                      {p.name}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 font-semibold text-gray-900 text-sm">
                  {Number(p.display_price).toLocaleString()}đ
                </td>
                <td className="px-4 py-4 text-center">
                  <a
                    href={p.affiliate_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 inline-flex text-[#67AEFF] bg-blue-50/50 rounded-lg hover:bg-blue-100 transition-all border border-blue-100/50"
                  >
                    <ExternalLink size={14} />
                  </a>
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditTarget(p)}
                      className="p-2 bg-white border border-blue-50 text-[#67AEFF] rounded-lg shadow-sm hover:bg-[#67AEFF] hover:text-white transition-all"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(p)}
                      className="p-2 bg-white border border-red-50 text-red-500 rounded-lg shadow-sm hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <EditProductModal
        isOpen={!!editTarget}
        product={editTarget}
        onSave={handleUpdate}
        onClose={() => setEditTarget(null)}
      />

      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[1.5rem] max-w-sm w-full text-center shadow-2xl animate-in zoom-in border border-gray-50">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">Confirm Delete</h3>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed font-medium">
              Remove <span className="font-semibold text-gray-800">"{deleteTarget.name}"</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3.5 bg-gray-50 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={finalDelete}
                className="flex-1 py-3.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-100 hover:bg-red-700 transition-all"
              >
                Delete Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleProductTable
