import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getSafeImageUrl, FALLBACK_CAKE_IMAGE } from '../utils/imageUtils';

export const WishlistDrawer: React.FC = () => {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, toggleWishlist, products, setSelectedProduct } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#ECE3DB]">
          
          {/* Header */}
          <div className="px-6 py-5 bg-[#FFF5F7] border-b border-[#FAD4DB] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#FF4B72] fill-[#FF4B72]" />
              <h2 className="font-serif text-xl font-bold text-[#241F1E]">
                Saved Favorites ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1 rounded-full text-[#7A716C] hover:text-[#241F1E] hover:bg-[#FFEAEF] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#FFF5F7] flex items-center justify-center text-[#FF4B72] border border-[#FAD4DB]">
                  <Heart className="w-8 h-8 opacity-40" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#241F1E]">No Saved Cakes</h3>
                  <p className="text-xs text-[#7A716C] max-w-xs mt-1">
                    Click the heart icon on any cake to bookmark it for your upcoming celebrations.
                  </p>
                </div>
              </div>
            ) : (
              wishlistedProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3.5 bg-[#FFF9FA] hover:bg-[#FFF3F5] rounded-xl border border-[#FAD4DB] gap-3 transition-colors"
                >
                  <img
                    src={getSafeImageUrl(p.images[0])}
                    alt={p.name}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_CAKE_IMAGE; }}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 cursor-pointer border border-[#F6D5DB]"
                    onClick={() => {
                      setSelectedProduct(p);
                      setIsWishlistOpen(false);
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 
                      onClick={() => {
                        setSelectedProduct(p);
                        setIsWishlistOpen(false);
                      }}
                      className="font-serif text-sm font-bold text-[#241F1E] hover:text-[#FF4B72] cursor-pointer truncate"
                    >
                      {p.name}
                    </h4>
                    <p className="text-[10px] text-[#7A716C]">{p.category}</p>
                    <span className="font-serif font-bold text-xs text-[#FF4B72] tabular-nums block mt-1">
                      ₨ {p.basePrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setIsWishlistOpen(false);
                      }}
                      className="p-2 bg-[#FF4B72] hover:bg-[#E03A60] text-white rounded-lg transition-colors cursor-pointer"
                      title="Configure & Order"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-2 text-[#7A716C] hover:text-[#FF4B72] rounded-lg hover:bg-white transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
