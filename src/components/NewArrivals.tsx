import React, { useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const NewArrivals: React.FC = () => {
  const { products } = useShop();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // New arrivals products
  const newArrivals = products.filter(p => p.isNewArrival || p.discountPercentage);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#FAD4DB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Arrows */}
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#FAD4DB]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase text-[#FF4B72] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chef's Seasonal Releases</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#241F1E] font-bold tracking-tight">
              New Arrivals & Limited Editions
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-[#FAD4DB] hover:border-[#FF4B72] hover:bg-[#FFF5F7] text-[#241F1E] hover:text-[#FF4B72] transition-colors cursor-pointer"
              aria-label="Previous items"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-[#FAD4DB] hover:border-[#FF4B72] hover:bg-[#FFF5F7] text-[#241F1E] hover:text-[#FF4B72] transition-colors cursor-pointer"
              aria-label="Next items"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
