export const InstagramFeed = () => {
  const instagramImages = [
    'https://i.pinimg.com/736x/d9/70/f9/d970f9c1ccc7f161b1d8d442a8115282.jpg', 
    'https://i.pinimg.com/736x/27/88/04/2788043517125ef318d7a6cacec52a82.jpg', 
    'https://i.pinimg.com/1200x/99/fe/e2/99fee2e46fef17c8cf65e70bce7c5c67.jpg', 
    'https://i.pinimg.com/1200x/27/8d/89/278d89119a9a85ab59e900985301d3d9.jpg',
    'https://i.pinimg.com/736x/30/4a/99/304a9910de45429749213fd412c3a41c.jpg',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&h=625&fit=crop', 
  ];

  return (
    <section className="py-12 md:py-20 overflow-hidden bg-white">
      <div className="text-center mb-8 md:mb-12 px-4">
        <h2 
          className="text-[#67AEFF] text-3xl md:text-4xl font-bold" 
        >
          Follow us on Instagram.
        </h2>
      
      </div>

      <div className="relative">
        <div className="flex gap-4 md:gap-5 overflow-x-auto pb-10 px-6 no-scrollbar snap-x snap-mandatory scrollbar-hide">
          {instagramImages.map((imgUrl, i) => (
            <div 
              key={i} 
              className="w-[190px] sm:w-[230px] md:w-[280px] aspect-[4/5] bg-slate-100 rounded-[28px] md:rounded-[32px] shrink-0 overflow-hidden group relative shadow-md hover:shadow-xl transition-all duration-500 snap-center"
            >
              <img 
                src={imgUrl} 
                alt={`Skincare Instagram post ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-white rounded-2xl flex items-center justify-center backdrop-blur-sm bg-white/10">
                  <div className="w-6 h-6 border-2 border-white rounded-full relative">
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute top-0 left-0 bottom-10 w-16 bg-gradient-to-r from-white via-white/20 to-transparent pointer-events-none hidden sm:block" />
        <div className="absolute top-0 right-0 bottom-10 w-16 bg-gradient-to-l from-white via-white/20 to-transparent pointer-events-none hidden sm:block" />
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}