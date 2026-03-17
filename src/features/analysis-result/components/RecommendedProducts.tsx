import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { AffiliateProduct } from '@/features/detail-packages/types/combo'
import { getProductsFromCombos } from '../services/products.api'
import { cn } from '@/shared/lib/utils'

const BG_COLORS = ['bg-[#E7F0F8]']

export const RecommendedProducts = ({ comboIds }: { comboIds: string[] }) => {
  const [products, setProducts] = useState<AffiliateProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      if (comboIds.length === 0) {
        setLoading(false)
        return
      }
      try {
        const data = await getProductsFromCombos(comboIds)
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [comboIds])

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    )
  }

  return (
    <section className="mt-12 md:mt-20">
      <div className="relative mb-8 md:mb-12 px-4 md:px-0">
        <div className="flex flex-col items-center text-center space-y-2">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Recommended Products
          </h2>
          <p className="text-sm text-slate-500 font-medium max-w-lg">
            Essential products perfect for your skincare routine.
          </p>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-8 pt-2 px-4 md:px-0 snap-x snap-mandatory md:grid md:grid-cols-4 gap-6 no-scrollbar">
        {products.map((product, index) => {
          const isExtraItem = index >= 4

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                'group cursor-pointer flex-shrink-0 w-[290px] md:w-full snap-center',
                isExtraItem && 'md:hidden'
              )}
              onClick={() => window.open(product.affiliate_url, '_blank')}
            >
              <div
                className={`${
                  BG_COLORS[index % BG_COLORS.length]
                } rounded-[40px] rounded-t-full p-6 transition-all duration-300 flex flex-col items-center h-full shadow-sm hover:shadow-xl border border-white/50`}
              >
                <div className="relative w-full aspect-square rounded-full bg-white overflow-hidden shadow-sm border-[5px] border-white/60">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="mt-6 w-full text-left px-1">
                  <h3 className="font-bold text-slate-900 text-[17px] mb-1 group-hover:text-blue-500 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-lg font-black text-blue-600">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(Number(product.display_price))}
                  </p>

                  <Button className="w-full mt-4 rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white border-none shadow-sm transition-all duration-300 text-xs font-bold py-5 h-auto tracking-wide">
                    VIEW DETAILS
                  </Button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
