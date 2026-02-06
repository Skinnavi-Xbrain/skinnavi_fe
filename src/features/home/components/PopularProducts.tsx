import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/shared/components/ui/button'
import { ChevronDown, Loader2 } from 'lucide-react'
import { env } from '@/config/env'
import axios from 'axios'
import type { Product } from '../types/product'

const BG_COLORS = ['bg-[#E3F2ED]', 'bg-[#E7F0F8]', 'bg-[#F9E8E8]']

export const PopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${env.API_URL}/products/affiliate`)
        const result = await response.data

        if (result.success && result.data && Array.isArray(result.data.items)) {
          setProducts(result.data.items.slice(0, 3))
        }
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
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    )
  }

  return (
    <section className="container mx-auto px-6 py-16 md:py-24 bg-white relative">
      <div className="absolute top-16 md:top-24 right-6 hidden md:block">
        <Button
          variant="outline"
          className="rounded-full text-xs font-semibold border-slate-300 px-5 h-9 flex items-center gap-2 text-slate-600 hover:bg-slate-50 transition-all"
        >
          New Arrival <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
          Popular Products
        </h2>
        <p className="text-slate-500 text-sm md:text-base font-medium max-w-lg">
          Discover unbeatable offers on top beauty essentials.
        </p>

        <div className="md:hidden pt-2 w-full">
          <Button
            variant="outline"
            className="rounded-full text-xs font-semibold border-slate-300 w-full h-10 flex items-center justify-center gap-2 text-slate-600"
          >
            New Arrival <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group cursor-pointer"
            onClick={() => window.open(product.affiliate_url, '_blank')}
          >
            <div
              className={`${BG_COLORS[index % BG_COLORS.length]} rounded-[48px] rounded-t-full p-8 transition-all duration-300 flex flex-col items-center h-full`}
            >
              <div className="relative w-full aspect-square rounded-full bg-white overflow-hidden shadow-sm border-[6px] border-white/40">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="mt-8 w-full text-left px-2">
                <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-[#67AEFF] transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-3">
                  Exclusive skincare deal
                </p>
                <p className="text-lg font-bold text-slate-900">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(Number(product.display_price))}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
