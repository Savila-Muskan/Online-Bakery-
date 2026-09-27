import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Calendar, 
  Clock, 
  Sparkles, 
  Plus, 
  Minus,
  MessageCircle,
  Truck,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CakeSize, CakeFlavor, CakeAddOn, CartItemAddOn } from '../types';
import { STANDARD_ADDONS, TIME_SLOTS } from '../data/mockData';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    setIsCheckoutOpen 
  } = useShop();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<CakeSize>(selectedProduct.availableSizes[0]);
  const [selectedFlavor, setSelectedFlavor] = useState<CakeFlavor>(selectedProduct.availableFlavors[0]);
  const [isEggless, setIsEggless] = useState(false);
  const [cakeMessage, setCakeMessage] = useState('');
  const [topperText, setTopperText] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<CartItemAddOn[]>([]);
  const [quantity, setQuantity] = useState(1);

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [deliveryDate, setDeliveryDate] = useState(tomorrow);
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState(TIME_SLOTS[2]);

  const isWishlisted = wishlist.includes(selectedProduct.id);

  useEffect(() => {
    if (selectedProduct) {
      setActiveImageIndex(0);
      setSelectedSize(selectedProduct.availableSizes[0]);
      setSelectedFlavor(selectedProduct.availableFlavors[0]);
      setIsEggless(false);
      setCakeMessage('');
      setTopperText('');
      setSelectedAddOns([]);
      setQuantity(1);
    }
  }, [selectedProduct]);

  // Price Calculation
  const sizeMultiplier = selectedSize?.priceMultiplier || 1.0;
  const flavorExtra = selectedFlavor?.extraPrice || 0;
  const egglessExtra = isEggless ? 200 : 0;
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);

  const unitPrice = Math.round(
    (selectedProduct.basePrice * sizeMultiplier) + flavorExtra + egglessExtra + addOnsTotal
  );
  const totalPrice = unitPrice * quantity;

  const handleToggleAddOn = (addon: CakeAddOn) => {
    setSelectedAddOns(prev => {
      const exists = prev.some(item => item.id === addon.id);
      if (exists) {
        return prev.filter(item => item.id !== addon.id);
      } else {
        return [...prev, { id: addon.id, name: addon.name, price: addon.price }];
      }
    });
  };

  const handleAddToCart = () => {
    addToCart({
      product: selectedProduct,
      selectedSize,
      selectedFlavor,
      isEggless,
      cakeMessage,
      topperText,
      deliveryDate,
      deliveryTimeSlot,
      selectedAddOns,
      quantity,
      unitPrice
    });
    setSelectedProduct(null);
  };

  const handleBuyNow = () => {
    addToCart({
      product: selectedProduct,
      selectedSize,
      selectedFlavor,
      isEggless,
      cakeMessage,
      topperText,
      deliveryDate,
      deliveryTimeSlot,
      selectedAddOns,
      quantity,
      unitPrice
    });
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello CakeShop!\nI would like to order:\n• Cake: ${selectedProduct.name}\n• Size: ${selectedSize.name}\n• Flavor: ${selectedFlavor.name}\n• Eggless: ${isEggless ? 'Yes' : 'No'}\n• Message: ${cakeMessage || 'None'}\n• Date: ${deliveryDate}\n• Time: ${deliveryTimeSlot}\n• Total: Rs. ${totalPrice.toLocaleString()}\nPlease confirm delivery!`
    );
    window.open(`https://wa.me/923493438060?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#F4E6EB] my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FFF5F8] border-b border-[#F4E6EB]">
          <span className="text-xs uppercase tracking-wider text-[#E84E7B] font-bold">
            {selectedProduct.category}
          </span>
          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1.5 rounded-full hover:bg-white text-[#7A6D72] hover:text-[#2B2225] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Image (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FFF9FA] border border-[#F4E6EB]">
                <img
                  src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {selectedProduct.discountPercentage && (
                  <span className="absolute top-3 left-3 bg-[#E84E7B] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                    {selectedProduct.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {selectedProduct.images.length > 1 && (
                <div className="flex gap-2">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-[#E84E7B] shadow-xs' : 'border-[#F4E6EB] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="p-3 bg-[#FFF5F8] rounded-xl border border-[#FAD7E1] space-y-1.5 text-xs text-[#615358]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#E84E7B]" />
                  <span>Fresh daily delivery in Lahore, Karachi & Isb</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E84E7B]" />
                  <span>{selectedProduct.preparationTime}</span>
                </div>
              </div>
            </div>

            {/* Right: Customization (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#2B2225]">
                    <div className="flex text-[#FFB800]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold">5.0</span>
                    <span className="text-[#7A6D72]">({selectedProduct.reviewCount} reviews)</span>
                  </div>

                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className="text-xs text-[#7A6D72] hover:text-[#E84E7B] flex items-center gap-1 cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#E84E7B] text-[#E84E7B]' : ''}`} />
                    <span>{isWishlisted ? 'Saved' : 'Save'}</span>
                  </button>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl text-[#2B2225] font-bold mt-1">
                  {selectedProduct.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-[#E84E7B] tabular-nums">
                    Rs. {unitPrice.toLocaleString()}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-[#9E8E94] line-through tabular-nums">
                      Rs. {(selectedProduct.originalPrice * sizeMultiplier).toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#615358] leading-relaxed mt-2">
                  {selectedProduct.fullDescription}
                </p>
              </div>

              {/* Size Selection */}
              <div className="space-y-1.5">
                <span className="font-bold text-xs text-[#2B2225] uppercase tracking-wider block">
                  Select Size:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedProduct.availableSizes.map((size) => {
                    const isSelected = selectedSize?.id === size.id;
                    const calculatedPrice = Math.round(selectedProduct.basePrice * size.priceMultiplier);
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#E84E7B] bg-[#FFF2F6] ring-1 ring-[#E84E7B]'
                            : 'border-[#F4E6EB] hover:border-[#E84E7B]/40 bg-white'
                        }`}
                      >
                        <p className="text-xs font-bold text-[#2B2225]">{size.weightLabel}</p>
                        <p className="text-[11px] text-[#E84E7B] font-semibold mt-0.5">
                          Rs. {calculatedPrice.toLocaleString()}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flavor Selection */}
              <div className="space-y-1.5">
                <span className="font-bold text-xs text-[#2B2225] uppercase tracking-wider block">
                  Select Flavor:
                </span>
                <select
                  value={selectedFlavor?.id}
                  onChange={(e) => {
                    const found = selectedProduct.availableFlavors.find(f => f.id === e.target.value);
                    if (found) setSelectedFlavor(found);
                  }}
                  className="w-full text-xs bg-[#FFF9FA] border border-[#E0D0D5] text-[#2B2225] rounded-lg p-2.5 font-medium focus:border-[#E84E7B] focus:outline-none"
                >
                  {selectedProduct.availableFlavors.map((flavor) => (
                    <option key={flavor.id} value={flavor.id}>
                      {flavor.name} {flavor.extraPrice > 0 ? `(+ Rs. ${flavor.extraPrice})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Eggless Option */}
              <div className="flex items-center justify-between p-3 bg-[#FFF5F8] rounded-lg border border-[#FAD7E1]">
                <div>
                  <p className="text-xs font-bold text-[#2B2225]">100% Eggless Option</p>
                  <p className="text-[10px] text-[#7A6D72]">Baked without eggs (+Rs. 200)</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEggless(!isEggless)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    isEggless ? 'bg-[#E84E7B]' : 'bg-[#D6CDC7]'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isEggless ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Cake Message */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2B2225] uppercase tracking-wider block">
                  Message on Cake (Free):
                </label>
                <input
                  type="text"
                  maxLength={35}
                  placeholder="e.g. Happy Birthday Sara!"
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                />
              </div>

              {/* Delivery Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#FFF5F8] rounded-xl border border-[#FAD7E1]">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2B2225] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#E84E7B]" />
                    <span>Delivery Date:</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2B2225] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#E84E7B]" />
                    <span>Time Slot:</span>
                  </label>
                  <select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                  >
                    {TIME_SLOTS.map((slot, i) => (
                      <option key={i} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add-ons */}
              <div className="space-y-2">
                <span className="font-bold text-xs text-[#2B2225] uppercase tracking-wider block">
                  Add-Ons:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {STANDARD_ADDONS.map((addon) => {
                    const isChecked = selectedAddOns.some(a => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => handleToggleAddOn(addon)}
                        className={`p-2 rounded-lg border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-[#FFF2F6] border-[#E84E7B] ring-1 ring-[#E84E7B]' 
                            : 'bg-white border-[#F4E6EB] hover:border-[#E84E7B]/40'
                        }`}
                      >
                        <span className="truncate pr-1">{addon.name}</span>
                        <span className="font-bold text-[#E84E7B] shrink-0">+Rs. {addon.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Sticky Purchase Footer Bar in CakeShop Theme */}
        <div className="sticky bottom-0 z-20 bg-white border-t border-[#F4E6EB] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          
          <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-6">
            <div className="flex items-center border border-[#E0D0D5] rounded-lg bg-[#FFF9FA]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-[#FFEBF1] text-[#2B2225] transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 text-xs font-bold text-[#2B2225] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-[#FFEBF1] text-[#2B2225] transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <span className="text-[10px] text-[#7A6D72] uppercase font-semibold block">Total</span>
              <span className="text-xl font-bold text-[#E84E7B] tabular-nums">
                Rs. {totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handleWhatsAppOrder}
              type="button"
              className="p-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] rounded-lg transition-colors cursor-pointer"
              title="Order on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </button>

            <button
              onClick={handleAddToCart}
              type="button"
              className="flex-1 sm:flex-none px-6 py-3 bg-[#E84E7B] hover:bg-[#D93C6B] text-white text-xs font-bold tracking-wider uppercase rounded-lg shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO CART</span>
            </button>

            <button
              onClick={handleBuyNow}
              type="button"
              className="flex-1 sm:flex-none px-6 py-3 bg-[#2B2225] hover:bg-[#403438] text-white text-xs font-bold tracking-wider uppercase rounded-lg shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>BUY NOW</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
