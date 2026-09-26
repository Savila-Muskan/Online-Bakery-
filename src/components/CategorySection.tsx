import React from 'react';
import { CATEGORIES_LIST } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { CakeCategory } from '../types';

export const CategorySection: React.FC = () => {
  const { activeCategoryFilter, setActiveCategoryFilter, setActiveOccasionFilter } = useShop();

  const handleSelectCategory = (catId: CakeCategory) => {
    setActiveOccasionFilter(null);
    if (activeCategoryFilter === catId) {
      setActiveCategoryFilter(null);
    } else {
      setActiveCategoryFilter(catId);
    }
    const el = document.getElementById('shop-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-14 bg-white border-b border-[#F4E6EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title matching exact heading "Shop by Category" */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2225] font-bold tracking-tight">
            Shop by Category
          </h2>
        </div>

        {/* Circular Categories matching reference: Birthday Cakes, Wedding Cakes, Anniversary Cakes, Photo Cakes, Cupcakes */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
          {CATEGORIES_LIST.slice(0, 5).map((cat) => {
            const isSelected = activeCategoryFilter === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className="group flex flex-col items-center text-center focus:outline-none cursor-pointer"
              >
                {/* Circular image with delicate pink border halo */}
                <div className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 transition-all duration-300 ${
                  isSelected 
                    ? 'ring-3 ring-[#E84E7B] ring-offset-2 scale-105' 
                    : 'group-hover:ring-2 group-hover:ring-[#E84E7B] group-hover:scale-105'
                }`}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#FFF9FA] shadow-md border border-[#F4E6EB]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Category Name */}
                <p className={`mt-3 text-sm font-semibold tracking-tight transition-colors ${
                  isSelected ? 'text-[#E84E7B]' : 'text-[#2B2225] group-hover:text-[#E84E7B]'
                }`}>
                  {cat.name}
                </p>
              </button>
            );
          })}
        </div>

        {/* Extra pill to show all categories if user wants more */}
        <div className="mt-8 flex justify-center gap-2">
          {CATEGORIES_LIST.slice(5).map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className="text-xs px-3 py-1.5 rounded-full bg-[#FFF5F8] text-[#55464B] hover:text-[#E84E7B] hover:bg-[#FFE8EE] transition-colors border border-[#FAD7E1] font-medium cursor-pointer"
            >
              + {cat.name}
            </button>
          ))}
        </div>

        {/* Clear active filter */}
        {activeCategoryFilter && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setActiveCategoryFilter(null)}
              className="text-xs text-[#E84E7B] underline font-semibold cursor-pointer"
            >
              Viewing: "{activeCategoryFilter}" — Click to clear filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
