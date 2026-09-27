import React from 'react';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { getSafeImageUrl, FALLBACK_CAKE_IMAGE } from '../utils/imageUtils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    setSelectedProduct, 
    wishlist, 
    toggleWishlist, 
    addToCart 
  } = useShop();

  const isWishlisted = wishlist.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.availableSizes[0] || {
      id: 'default',
      name: '2 Lbs (Classic)',
      weightLabel: '2.0 Lbs',
      servings: '8 - 10 Slices',
      priceMultiplier: 1.0
    };
    const defaultFlavor = product.availableFlavors[0] || {
      id: 'default',
      name: 'Signature Baker’s Blend',
      description: 'Handcrafted signature recipe',
      extraPrice: 0
    };

    addToCart({
      product,
      selectedSize: defaultSize,
      selectedFlavor: defaultFlavor,
      isEggless: false,
      cakeMessage: '',
      topperText: '',
      deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      deliveryTimeSlot: 'Evening (6:00 PM - 9:00 PM)',
      selectedAddOns: [],
      quantity: 1,
      unitPrice: product.basePrice
    });
  };

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-xl border border-[#F4E6EB] hover:border-[#E84E7B]/50 transition-all duration-300 hover:shadow-lg flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image Area with Heart Wishlist & Background */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FFF9FA]">
        <img
          src={getSafeImageUrl(product.images[0])}
          alt={product.name}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_CAKE_IMAGE; }}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Heart icon button in top-right with circle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-xs ${
            isWishlisted 
              ? 'bg-[#E84E7B] text-white' 
              : 'bg-white/80 hover:bg-white text-[#7A6D72] hover:text-[#E84E7B]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-0 bottom-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-center z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="w-full py-1.5 bg-white/95 backdrop-blur text-[#2B2225] hover:bg-[#2B2225] hover:text-white text-xs font-semibold uppercase tracking-wider rounded shadow transition-colors flex items-center justify-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Details Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Cake Title */}
          <h3 className="font-serif text-base font-bold text-[#2B2225] group-hover:text-[#E84E7B] transition-colors truncate">
            {product.name}
          </h3>

          {/* Star Rating & Reviews count like ★★★★★ (120) */}
          <div className="flex items-center gap-1 text-xs text-[#E8A317] mt-1">
            <div className="flex text-[#FFB800]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs text-[#7A6D72] font-medium ml-1">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price matching format: Rs. 2,499 */}
          <div className="mt-2">
            <span className="font-bold text-base text-[#2B2225] tabular-nums">
              Rs. {product.basePrice.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-xs text-[#9E8E94] line-through tabular-nums">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Pink "ADD TO CART" button with cart icon */}
        <button
          onClick={handleQuickAdd}
          className="w-full py-2.5 bg-[#E84E7B] hover:bg-[#D93C6B] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>ADD TO CART</span>
        </button>
      </div>
    </div>
  );
};
