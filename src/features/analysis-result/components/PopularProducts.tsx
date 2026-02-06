import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/ui/button'
import { ChevronDown, Loader2 } from 'lucide-react'
import { getAffiliateProducts } from '@/features/analysis-result/services/products.api'
import type { Product } from '../types/product'

const BG_COLORS = ['bg-[#E3F2ED]', 'bg-[#E7F0F8]', 'bg-[#F9E8E8]']

export const PopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const items = await getAffiliateProducts()
        setProducts(items.slice(6, 10))
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    )
  }

  return (
    <section className="mt-12 md:mt-20">
      <div className="relative mb-12">
        <div className="flex flex-col items-center text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Recommended Products
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-lg">
            Based on your analysis, these essential products are perfect for your skincare routine.
          </p>
        </div>

        {/* Dropdown filter - Desktop */}
        <div className="absolute top-0 right-0 hidden md:block">
          <Button
            variant="outline"
            className="rounded-full text-xs font-semibold border-slate-200 px-5 h-9 flex items-center gap-2 text-slate-600 hover:bg-slate-50 transition-all"
          >
            Sort by <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => window.open(product.affiliate_url, '_blank')}
          >
            <div
              className={`${
                BG_COLORS[index % BG_COLORS.length]
              } rounded-[48px] rounded-t-full p-8 transition-all duration-300 flex flex-col items-center h-full shadow-sm hover:shadow-xl`}
            >
              <div className="relative w-full aspect-square rounded-full bg-white overflow-hidden shadow-sm border-[6px] border-white/40">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="mt-8 w-full text-left px-2">
                <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-blue-500 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-3 italic">
                  Matched for your skin
                </p>
                <p className="text-xl font-bold text-blue-600">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(Number(product.display_price))}
                </p>

                <Button className="w-full mt-4 rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white border-none shadow-sm transition-all duration-300 text-xs font-bold py-5">
                  VIEW DETAILS
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
