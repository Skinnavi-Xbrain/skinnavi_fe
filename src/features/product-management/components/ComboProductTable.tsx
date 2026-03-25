import { useState, useEffect } from 'react'
import { ChevronDown, Edit3, Trash2, ExternalLink, Plus, ShoppingBag, Loader2 } from 'lucide-react'
import { comboApi } from '../services/product.api'
import { EditComboModal, EditProductModal, DeleteConfirmModal } from './ComboModals'
import { toast } from '@/shared/hooks/use-toast'

const SKIN_MAP: Record<string, any> = {
  OILY: { label: 'OILY', bg: '#FFF4ED', color: '#C2410C', border: '#FFEDD5' },
  DRY: { label: 'DRY', bg: '#EFF6FF', color: '#1D4ED8', border: '#DBEAFE' },
  COMBINATION: { label: 'COMBINATION', bg: '#F5F3FF', color: '#6D28D9', border: '#EDE9FE' },
  SENSITIVE: { label: 'SENSITIVE', bg: '#FFF1F2', color: '#BE123C', border: '#FFE4E6' },
  NORMAL: { label: 'NORMAL', bg: '#F0FDF4', color: '#15803D', border: '#DCFCE7' },
  default: { label: 'SKIN TYPE', bg: '#F9FAFB', color: '#374151', border: '#F3F4F6' }
}

const CAT_STYLES: Record<string, any> = {
  Cleanser: { bg: '#E0F2FE', color: '#0369A1' },
  'Makeup Remover': { bg: '#FAE8FF', color: '#A21CAF' },
  Toner: { bg: '#E0E7FF', color: '#4338CA' },
  Serum: { bg: '#FEF9C3', color: '#A16207' },
  Sunscreen: { bg: '#FFEDD5', color: '#C2410C' },
  Moisturizer: { bg: '#DCFCE7', color: '#15803D' }
}

const ComboProductTable = ({ currentPage, itemsPerPage, refreshKey, onTotalPagesChange }: any) => {
  const [combos, setCombos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [editCombo, setEditCombo] = useState<any>(null)
  const [addProductToCId, setAddProductToCId] = useState<string | null>(null)
  const [editProduct, setEditProduct] = useState<{ cId: string; p: any; idx: number } | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<any>(null)

  const fetchCombos = async () => {
    setLoading(true)
    try {
      const response = await comboApi.getCombos(currentPage, itemsPerPage)
      setCombos(response.items || [])
      if (onTotalPagesChange) onTotalPagesChange(response.totalPages || 1)
    } catch (error) {
      toast({
        title: 'Fetch Error',
        description: 'Could not load skincare combos.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCombos()
  }, [currentPage, refreshKey])

  const saveComboProducts = async (comboId: string, newProductsList: any[]) => {
    const productsPayload = newProductsList.map((item, index) => ({
      product_id: item.product_id || item.product.id,
      step_order: index + 1
    }))

    try {
      await comboApi.updateCombo(comboId, { products: productsPayload })
      toast({
        title: 'Success',
        description: 'Combo components updated successfully.',
        variant: 'success'
      })
      fetchCombos()
    } catch (err) {
      toast({
        title: 'Update Failed',
        description: 'Could not save combo components.',
        variant: 'destructive'
      })
    }
  }

  const handleUpdateComboInfo = async (updated: any) => {
    try {
      await comboApi.updateCombo(updated.id, {
        combo_name: updated.combo_name,
        display_price: Number(updated.display_price),
        image_url: updated.image_url,
        affiliate_url: updated.affiliate_url
      })
      toast({ title: 'Success', description: 'Combo updated successfully.', variant: 'success' })
      fetchCombos()
      setEditCombo(null)
    } catch (err: any) {
      toast({
        title: 'Update Failed',
        description: err?.response?.data?.message || 'Error occurred.',
        variant: 'destructive'
      })
    }
  }

  const handleAddProduct = async (data: any) => {
    if (!addProductToCId) return
    const target = combos.find((c) => c.id === addProductToCId)
    const newList = [...target.combo_products, data]
    await saveComboProducts(addProductToCId, newList)
    setAddProductToCId(null)
  }

  const handleEditProductInCombo = async (data: any) => {
    if (!editProduct) return
    const target = combos.find((c) => c.id === editProduct.cId)
    const newList = [...target.combo_products]
    newList[editProduct.idx] = { ...newList[editProduct.idx], product_id: data.product_id }
    await saveComboProducts(editProduct.cId, newList)
    setEditProduct(null)
  }

  const finalDelete = async () => {
    if (!deleteTarget) return
    try {
      if (deleteTarget.type === 'combo') {
        await comboApi.deleteCombo(deleteTarget.id)
        toast({ title: 'Success', description: 'Combo deleted successfully.', variant: 'success' })
      } else {
        const target = combos.find((c) => c.id === deleteTarget.cId)
        const newList = target.combo_products.filter((_: any, i: number) => i !== deleteTarget.idx)
        await saveComboProducts(deleteTarget.cId, newList)
      }
      fetchCombos()
      setDeleteTarget(null)
    } catch {
      toast({ title: 'Error', description: 'Failed to delete combo.', variant: 'destructive' })
    }
  }

  if (loading)
    return (
      <div className="p-20 text-center font-['Poppins']">
        <Loader2 className="inline-block animate-spin text-[#67AEFF] mb-4" size={32} />
        <p className="text-gray-400 font-medium tracking-wide">Loading SkinNavi data...</p>
      </div>
    )

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden font-['Poppins']">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60 text-gray-400">
              <th className="px-4 py-5 font-bold uppercase tracking-widest text-[10px]">#</th>
              <th className="px-4 py-5 font-bold uppercase tracking-widest text-[10px]">
                Skin Type
              </th>
              <th className="px-4 py-5 font-bold uppercase tracking-widest text-[10px]">
                Combo Details
              </th>
              <th className="px-4 py-5 font-bold uppercase tracking-widest text-[10px]">Price</th>
              <th className="px-4 py-5 font-bold uppercase tracking-widest text-[10px] text-center">
                Link
              </th>
              <th className="px-4 py-5 font-bold uppercase tracking-widest text-[10px] text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {combos.map((c, i) => (
              <ComboRow
                key={c.id}
                combo={c}
                index={(currentPage - 1) * itemsPerPage + i + 1}
                onEdit={setEditCombo}
                onAddProduct={setAddProductToCId}
                onEditProduct={(cId: string, p: any, idx: number) =>
                  setEditProduct({ cId, p, idx })
                }
                onDelete={(combo: any) =>
                  setDeleteTarget({ type: 'combo', id: combo.id, name: combo.combo_name })
                }
                onDeleteProduct={(cId: string, pName: string, idx: number) =>
                  setDeleteTarget({ type: 'product', cId, name: pName, idx })
                }
              />
            ))}
          </tbody>
        </table>
      </div>

      <EditComboModal
        isOpen={!!editCombo}
        combo={editCombo}
        onSave={handleUpdateComboInfo}
        onClose={() => setEditCombo(null)}
      />
      <EditProductModal
        isOpen={!!addProductToCId || !!editProduct}
        product={editProduct?.p || null}
        isNew={!!addProductToCId}
        onSave={addProductToCId ? handleAddProduct : handleEditProductInCombo}
        onClose={() => {
          setAddProductToCId(null)
          setEditProduct(null)
        }}
      />
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        title={deleteTarget?.type === 'combo' ? 'Delete Combo' : 'Remove Component'}
        name={deleteTarget?.name}
        onConfirm={finalDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  )
}

const ComboRow = ({
  combo: c,
  index,
  onEdit,
  onAddProduct,
  onEditProduct,
  onDelete,
  onDeleteProduct
}: any) => {
  const [open, setOpen] = useState(false)
  const skinStyle = SKIN_MAP[c.skin_type?.code] || SKIN_MAP['default']

  return (
    <>
      <tr
        className={`group transition-all duration-200 hover:bg-blue-50/50 ${open ? 'bg-blue-50/50' : ''}`}
      >
        <td className="px-4 py-4 text-xs text-gray-300 font-mono text-center w-10">
          {String(index).padStart(2, '0')}
        </td>
        <td className="px-4 py-4 w-28">
          <span
            style={{
              backgroundColor: skinStyle.bg,
              color: skinStyle.color,
              borderColor: skinStyle.border
            }}
            className="px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider"
          >
            {skinStyle.label}
          </span>
        </td>
        <td className="px-4 py-4 text-left">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0 flex items-center justify-center">
              <img
                src={c.image_url}
                className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm"
                alt=""
              />
              <span className="absolute -top-1.5 -right-1.5 bg-[#67AEFF] text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md z-10">
                {c.combo_products?.length || 0}
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-medium text-gray-800 line-clamp-1">
                {c.combo_name}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5 italic line-clamp-1 font-normal tracking-tight">
                {c.combo_products?.map((cp: any) => cp.product?.usage_role).join(' • ')}
              </div>
            </div>
          </div>
        </td>
        <td className="px-4 py-4 text-left font-semibold text-gray-900 text-[13px] whitespace-nowrap">
          {Number(c.display_price).toLocaleString()}đ
        </td>
        <td className="px-4 py-4 text-center">
          <a
            href={c.affiliate_url}
            target="_blank"
            rel="noreferrer"
            className="p-2 inline-flex text-[#67AEFF] bg-blue-50/50 rounded-lg hover:bg-blue-100 transition-all border border-blue-100/50 shadow-sm"
          >
            <ExternalLink size={14} />
          </a>
        </td>
        <td className="px-4 py-4 text-right">
          <div className="flex gap-2 justify-end opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onAddProduct(c.id)}
              title="Add Product"
              className="p-2 bg-white border border-blue-100 text-[#67AEFF] rounded-lg shadow-sm hover:bg-[#67AEFF] hover:text-white transition-all"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={() => onEdit(c)}
              title="Edit Info"
              className="p-2 bg-white border border-blue-100 text-[#67AEFF] rounded-lg shadow-sm hover:bg-[#67AEFF] hover:text-white transition-all"
            >
              <Edit3 size={14} />
            </button>
            <button
              onClick={() => onDelete(c)}
              title="Delete Combo"
              className="p-2 bg-white border border-red-50 text-red-400 rounded-lg shadow-sm hover:bg-red-500 hover:text-white transition-all"
            >
              <Trash2 size={14} />
            </button>
            <button
              onClick={() => setOpen(!open)}
              className={`p-2 rounded-lg border shadow-sm transition-all ${open ? 'bg-gray-800 border-gray-800 text-white' : 'bg-white text-gray-400 hover:border-gray-800'}`}
            >
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </td>
      </tr>

      {open && (
        <tr className="animate-in fade-in slide-in-from-top-1 duration-300">
          <td colSpan={6} className="bg-slate-50/50 p-0 border-t border-gray-100 text-left">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2 text-gray-400 uppercase tracking-widest text-[9px] font-bold">
              <ShoppingBag size={12} /> Components ({c.combo_products?.length})
            </div>
            <div className="p-4 flex flex-col gap-2.5">
              {c.combo_products?.length > 0 ? (
                c.combo_products.map((cp: any, idx: number) => {
                  const catStyle = CAT_STYLES[cp.product?.usage_role] || {
                    bg: '#F3F4F6',
                    color: '#6B7280'
                  }
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <span className="text-[10px] font-mono text-gray-300 w-5">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <img
                          src={cp.product?.image_url}
                          className="w-10 h-10 rounded-xl object-cover border border-gray-50 flex-shrink-0"
                          alt=""
                        />
                        <div>
                          <div className="text-[13px] font-medium text-gray-800 leading-tight mb-1">
                            {cp.product?.name}
                          </div>
                          <span
                            style={{ backgroundColor: catStyle.bg, color: catStyle.color }}
                            className="text-[9px] px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider"
                          >
                            {cp.product?.usage_role}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="text-right">
                          <span className="text-xs font-semibold text-gray-900">
                            {Number(cp.product?.display_price).toLocaleString()}đ
                          </span>
                        </div>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => onEditProduct(c.id, cp.product, idx)}
                            className="p-2 text-gray-400 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <Edit3 size={13} />
                          </button>
                          <a
                            href={cp.product?.affiliate_url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-gray-400 bg-gray-50 rounded-lg hover:bg-blue-50"
                          >
                            <ExternalLink size={13} />
                          </a>
                          <button
                            onClick={() => onDeleteProduct(c.id, cp.product?.name, idx)}
                            className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg hover:bg-red-50"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-6 text-xs text-gray-400 italic font-medium tracking-tight">
                  This combo is empty. Add products to start!
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default ComboProductTable
