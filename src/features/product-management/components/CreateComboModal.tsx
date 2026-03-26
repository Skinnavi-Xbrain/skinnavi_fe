import React, { useState, useEffect } from 'react'
import { X, Loader2 } from 'lucide-react'
import { toast } from '@/shared/hooks/use-toast'
import type { CreateComboPayload } from '../types/product'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateComboPayload) => Promise<void>
  skinTypes: { id: string; code: string }[]
  isSubmitting: boolean
}

const CreateComboModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  skinTypes,
  isSubmitting
}) => {
  const initialState: CreateComboPayload = {
    combo_name: '',
    skin_type_id: '',
    display_price: '',
    image_url: '',
    affiliate_url: '',
    is_active: true
  }

  const [form, setForm] = useState<CreateComboPayload>(initialState)

  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialState, skin_type_id: skinTypes[0]?.id || '' })
    }
  }, [isOpen, skinTypes])

  const handleClose = () => {
    setForm(initialState)
    onClose()
  }

  const validate = () => {
    if (!form.combo_name.trim()) return 'Combo name is required'
    if (!form.skin_type_id) return 'Skin type is required'
    if (!form.display_price || Number(form.display_price) <= 0) return 'Valid price is required'
    if (!form.image_url.trim()) return 'Image URL is required'
    if (!form.affiliate_url.trim()) return 'Affiliate link is required'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errorMsg = validate()
    if (errorMsg) {
      return toast({ title: 'Validation Error', description: errorMsg, variant: 'destructive' })
    }
    await onSubmit(form)
  }

  if (!isOpen) return null

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-4 focus:ring-[#67AEFF]/10 focus:border-[#67AEFF] transition-all font-['Poppins'] bg-gray-50/50"
  const labelClass =
    "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-['Poppins'] ml-1"

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-[1.5rem] shadow-2xl w-full max-sm:w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-2 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">New Combo</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
          <div>
            <label className={labelClass}>Combo Name *</label>
            <input
              type="text"
              placeholder="Enter combo name"
              className={inputClass}
              value={form.combo_name}
              onChange={(e) => setForm({ ...form, combo_name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Skin Type *</label>
              <select
                className={inputClass}
                value={form.skin_type_id}
                onChange={(e) => setForm({ ...form, skin_type_id: e.target.value })}
              >
                <option value="">Select Skin Type</option>
                {skinTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.code}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Price (VND) *</label>
              <input
                type="number"
                placeholder="0"
                className={inputClass}
                value={form.display_price}
                onChange={(e) => setForm({ ...form, display_price: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Image URL *</label>
            <input
              type="text"
              placeholder="https://..."
              className={inputClass}
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Affiliate Link *</label>
            <input
              type="text"
              placeholder="Shopee/Lazada link"
              className={inputClass}
              value={form.affiliate_url}
              onChange={(e) => setForm({ ...form, affiliate_url: e.target.value })}
            />
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-3.5 bg-[#67AEFF] hover:bg-[#5698e6] text-white rounded-xl font-bold shadow-lg flex justify-center items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Create Combo'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateComboModal
