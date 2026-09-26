import React, { useState } from 'react';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, setSelectedProduct } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isSearchOpen) return null;

  const results = searchTerm.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#ECE3DB] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-[#FAD4DB] bg-[#FFF5F7]">
          <Search className="w-5 h-5 text-[#FF4B72] mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search cakes (e.g. Belgian Truffle, Lotus Biscoff, Wedding, Eggless...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#241F1E] placeholder-[#9C948D] focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-full text-[#7A716C] hover:text-[#241F1E] hover:bg-[#FFEAEF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {searchTerm.trim() === '' ? (
            <div className="p-8 text-center text-xs text-[#7A716C]">
              <p>Type above to search through our artisanal menu.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Chocolate', 'Lotus Biscoff', 'Red Velvet', 'Wedding', 'Mango', 'Brownies', 'Cupcakes'].map(term => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="px-3 py-1 bg-[#FFF5F7] rounded-full border border-[#FAD4DB] hover:border-[#FF4B72] hover:text-[#FF4B72] transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsSearchOpen(false);
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FFF9FA] transition-colors cursor-pointer border border-transparent hover:border-[#FAD4DB]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover border border-[#F6D5DB]"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#FF4B72] font-semibold">
                      {product.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#241F1E]">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#7A716C] line-clamp-1">{product.shortDescription}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-serif font-bold text-xs text-[#FF4B72] tabular-nums">
                    ₨ {product.basePrice.toLocaleString()}
                  </span>
                  <div className="flex items-center text-[10px] text-[#7A716C] gap-1 justify-end">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-[#7A716C]">
              <p>No cakes found matching "{searchTerm}".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
