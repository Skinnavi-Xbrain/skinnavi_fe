import React, { useState, useEffect } from 'react'
import Sidebar from '../../admin/components/Sidebar'
import TopBar from '../../admin/components/TopBar'
import SingleProductTable from '../components/SingleProductTable'
import ComboProductTable from '../components/ComboProductTable'
import ProductHeader from '../components/ProductHeader'
import Pagination from '../components/Pagination'
import CreateProductModal from '../components/CreateProductModal'
import CreateComboModal from '../components/CreateComboModal'
import { productApi, comboApi } from '../services/product.api'
import { toast } from '@/shared/hooks/use-toast'
import type { CreateProductPayload, CreateComboPayload } from '../types/product'

const ProductManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'combo'>('single')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [refreshKey, setRefreshKey] = useState(0)
  const itemsPerPage = 10

  const [skinTypes, setSkinTypes] = useState<{ id: string; code: string }[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isComboModalOpen, setIsComboModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [comboRes, productRes] = await Promise.all([
          comboApi.getCombos(1, 50),
          productApi.getProducts(1, 50)
        ])
        if (comboRes?.items) {
          const typesMap = new Map()
          comboRes.items.forEach((item: any) => {
            if (item.skin_type) typesMap.set(item.skin_type.id, item.skin_type)
          })
          setSkinTypes(Array.from(typesMap.values()))
        }
        if (productRes?.items) {
          const uniqueCats = Array.from(
            new Set(productRes.items.map((p: any) => p.usage_role))
          ) as string[]
          setCategories(uniqueCats)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchData()
  }, [refreshKey])

  const handleAddProduct = async (data: CreateProductPayload) => {
    setIsSubmitting(true)
    try {
      await productApi.createProduct({ ...data, display_price: Number(data.display_price) })
      toast({ title: 'Success', description: 'Product created successfully!', variant: 'success' })
      setIsProductModalOpen(false)
      setRefreshKey((prev) => prev + 1)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to create product',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddCombo = async (data: CreateComboPayload) => {
    setIsSubmitting(true)
    try {
      await comboApi.createCombo({
        ...data,
        display_price: Number(data.display_price),
        products: []
      })
      toast({ title: 'Success', description: 'Combo created successfully!', variant: 'success' })
      setIsComboModalOpen(false)
      setRefreshKey((prev) => prev + 1)
    } catch {
      toast({ title: 'Error', description: 'Failed to create combo', variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex bg-slate-50 min-h-screen w-full font-['Poppins'] text-left">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 w-full md:ml-[220px] flex flex-col min-h-screen relative">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full flex-1 flex flex-col">
          <ProductHeader
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab)
              setCurrentPage(1)
            }}
            onOpenModal={() =>
              activeTab === 'single' ? setIsProductModalOpen(true) : setIsComboModalOpen(true)
            }
          />
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden flex flex-col flex-1">
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              {activeTab === 'single' ? (
                <SingleProductTable
                  key={`single-${refreshKey}`}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  refreshKey={refreshKey}
                  onTotalPagesChange={setTotalPages}
                />
              ) : (
                <ComboProductTable
                  key={`combo-${refreshKey}`}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  refreshKey={refreshKey}
                  onTotalPagesChange={setTotalPages}
                />
              )}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        <CreateProductModal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          onSubmit={handleAddProduct}
          categories={categories}
          isSubmitting={isSubmitting}
        />

        <CreateComboModal
          isOpen={isComboModalOpen}
          onClose={() => setIsComboModalOpen(false)}
          onSubmit={handleAddCombo}
          skinTypes={skinTypes}
          isSubmitting={isSubmitting}
        />
      </main>
    </div>
  )
}

export default ProductManagement
