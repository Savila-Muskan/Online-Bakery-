import React, { useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const BestSellers: React.FC = () => {
  const { 
    products, 
    activeCategoryFilter, 
    setActiveCategoryFilter, 
    activeOccasionFilter,
    setActiveOccasionFilter
  } = useShop();

  // The 4 main cakes featured in the reference:
  // 1. Chocolate Delight
  // 2. Red Velvet Cake
  // 3. Black Forest Cake
  // 4. Mango Cake
  const featuredProducts = useMemo(() => {
    if (activeCategoryFilter) {
      return products.filter(p => p.category === activeCategoryFilter);
    }
    if (activeOccasionFilter) {
      return products.filter(p => p.occasion?.includes(activeOccasionFilter as any));
    }
    return products;
  }, [products, activeCategoryFilter, activeOccasionFilter]);

  return (
    <section id="shop-catalog" className="py-14 sm:py-16 bg-white border-b border-[#F4E6EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title matching "Best Sellers" */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2225] font-bold tracking-tight">
            Best Sellers
          </h2>
        </div>

        {/* Active filter notification if any */}
        {(activeCategoryFilter || activeOccasionFilter) && (
          <div className="flex items-center justify-between bg-[#FFF5F8] p-3 rounded-lg border border-[#FAD7E1] mb-8 max-w-2xl mx-auto">
            <span className="text-xs text-[#2B2225]">
              Showing cakes for: <strong>{activeCategoryFilter || activeOccasionFilter}</strong>
            </span>
            <button
              onClick={() => {
                setActiveCategoryFilter(null);
                setActiveOccasionFilter(null);
              }}
              className="text-xs text-[#E84E7B] font-bold hover:underline cursor-pointer"
            >
              Reset to All
            </button>
          </div>
        )}

        {/* 4-Card Grid matching the reference image layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
