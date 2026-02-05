import { useEffect, useState } from 'react'
import { Star, X, Loader2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { env } from '@/config/env'
import axios from 'axios'

interface Product {
  id: string
  name: string
  display_price: string | number
  image_url: string
  affiliate_url: string
  description?: string
}

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${env.API_URL}/products/affiliate`)
        if (response.data.success) {
          setProducts(response.data.data.items.slice(0, 4))
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    )

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12">
        {products.map((product, index) => (
          <div
            key={product.id}
            onClick={() => setSelectedProduct(product)}
            className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 opacity-0 animate-fade-in-up hover:-translate-y-2 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6 aspect-square flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-white/50 rounded-xl flex items-center justify-center group-hover:bg-white/70 transition-colors duration-300">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-3/4 h-3/4 object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                />
              </div>
            </div>
            <div className="p-4 md:p-5">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 md:mb-3 line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors duration-300">
                {product.name}
              </h3>
              <div className="mb-3 md:mb-4">
                <p className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-500 transition-colors duration-300">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                    Number(product.display_price)
                  )}
                </p>
              </div>
              <Button className="w-full bg-blue-400 hover:bg-blue-500 text-white rounded-lg md:rounded-xl">
                Shop Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal giữ nguyên Style/Animation cũ */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-scale-up relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-all duration-300 hover:rotate-90 z-10"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 aspect-square flex items-center justify-center">
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="w-3/4 h-3/4 object-contain animate-float-slow"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-blue-500 mb-4">Product Detail</h2>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {selectedProduct.name} - Essential for your skincare routine.
                  </p>
                  <p className="text-3xl font-bold text-blue-500 mb-4">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      Number(selectedProduct.display_price)
                    )}
                  </p>
                  <div className="flex items-center gap-2 mb-6">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold text-gray-900">4.8</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-2 border-blue-400 text-blue-500"
                    onClick={() => window.open(selectedProduct.affiliate_url, '_blank')}
                  >
                    BUY NOW
                  </Button>
                  <Button
                    className="flex-1 bg-blue-400 text-white"
                    onClick={() => setSelectedProduct(null)}
                  >
                    APPLY
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
