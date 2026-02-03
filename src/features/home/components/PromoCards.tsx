import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const promos = [
  {
    id: 1,
    title: 'AI Skin Analysis in Seconds',
    description:
      'Upload a facial image and let SkinNavi analyze your skin type, concerns, and conditions using advanced AI.',
    image:
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600',
    bgColor: 'bg-[#EAF3FF]',
    cta: 'Try Skin Scan'
  },
  {
    id: 2,
    title: 'Personalized Skincare Routine',
    description:
      'Get a daily skincare routine tailored specifically to your skin needs, lifestyle, and goals.',
    image:
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600',
    bgColor: 'bg-[#EAF3FF]',
    cta: 'View My Routine'
  },
  {
    id: 3,
    title: 'Track Progress & Smart Reminders',
    description:
      'Monitor your skin improvement over time and never miss a step with smart skincare reminders.',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600',
    bgColor: 'bg-[#EAF3FF]',
    cta: 'Start Tracking'
  }
]

export const PromoCards = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  /* ===== Auto slide (3s) ===== */
  useEffect(() => {
    startAutoSlide()
    return stopAutoSlide
  }, [activeIndex])

  const startAutoSlide = () => {
    stopAutoSlide()

    intervalRef.current = setInterval(() => {
      if (!scrollRef.current) return

      const container = scrollRef.current
      const width = container.offsetWidth
      const nextIndex = (activeIndex + 1) % promos.length

      container.scrollTo({
        left: nextIndex * width,
        behavior: 'smooth'
      })

      setActiveIndex(nextIndex)
    }, 3000) // ✅ 3s
  }

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  /* ===== Handle manual swipe ===== */
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft
    const width = e.currentTarget.offsetWidth
    const newIndex = Math.round(scrollLeft / width)

    if (newIndex >= 0 && newIndex < promos.length) {
      setActiveIndex(newIndex)
    }
  }

  return (
    <section className="container mx-auto px-4 md:px-6 my-6">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
        className="
          flex gap-4 md:gap-6
          overflow-x-auto pb-4
          no-scrollbar
          snap-x snap-mandatory
        "
        style={{ scrollBehavior: 'smooth' }}
      >
        {promos.map((promo, index) => (
          <motion.div
            key={promo.id}
            animate={{ scale: activeIndex === index ? 1 : 0.96 }}
            transition={{ duration: 0.3 }}
            className="
              flex-none
              w-[85%]
              md:w-[calc(50%-12px)]
              snap-start
              bg-[#EAF3FF]
              rounded-[32px]
              p-6 md:p-8
              flex items-center justify-between
              h-[190px] md:h-[230px]
              shadow-sm hover:shadow-md
              bg-gradient-to-br from-white/60 to-transparent
            "
          >
            <div className="flex-1 pr-4">
              <h3 className="text-lg md:text-2xl font-semibold text-slate-800 mb-2 line-clamp-2">
                {promo.title}
              </h3>

              <p className="text-xs md:text-sm text-slate-600 mb-4 line-clamp-2">
                {promo.description}
              </p>

              <span className="text-xs md:text-sm font-semibold text-[#67AEFF]">
                {promo.cta}
              </span>
            </div>

            <div className="w-1/3 h-full relative">
              <img
                src={promo.image}
                alt={promo.title}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-md"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-5">
        {promos.map((_, index) => (
          <motion.div
            key={index}
            animate={{
              width: index === activeIndex ? 24 : 8,
              opacity: index === activeIndex ? 1 : 0.4
            }}
            transition={{ duration: 0.3 }}
            className="h-2 rounded-full bg-[#67AEFF]"
          />
        ))}
      </div>
    </section>
  )
}
