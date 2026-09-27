import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getSafeImageUrl, FALLBACK_CAKE_IMAGE } from '../utils/imageUtils';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateCartItemQuantity, 
    removeFromCart, 
    cartSubtotal, 
    deliveryFee, 
    promoCode, 
    discountAmount, 
    applyPromoCode, 
    removePromoCode, 
    grandTotal,
    setIsCheckoutOpen
  } = useShop();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#F4E6EB]">
          
          {/* Header in CakeShop Pink */}
          <div className="px-6 py-4 bg-[#FFF5F8] border-b border-[#F4E6EB] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E84E7B]" />
              <h2 className="font-serif text-lg font-bold text-[#2B2225]">
                Your Shopping Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-[#7A6D72] hover:text-[#2B2225] hover:bg-white transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#FFF5F8] flex items-center justify-center text-[#E84E7B] border border-[#FAD7E1]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2B2225]">Your Cart is Empty</h3>
                  <p className="text-xs text-[#7A6D72] max-w-xs mt-1">
                    Select your favorite freshly baked cake from our delicious collection!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#E84E7B] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 bg-[#FFF9FA] rounded-xl border border-[#F4E6EB] space-y-2.5 relative"
                  >
                    <div className="flex gap-3">
                      <img
                        src={getSafeImageUrl(item.product.images[0])}
                        alt={item.product.name}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_CAKE_IMAGE; }}
                        className="w-16 h-16 rounded-lg object-cover bg-white border border-[#F4E6EB] shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="font-serif text-sm font-bold text-[#2B2225] truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-[#615358] space-y-0.5 mt-0.5">
                          <p>Size: <strong className="text-[#2B2225]">{item.selectedSize.name}</strong></p>
                          <p>Flavor: <span>{item.selectedFlavor.name}</span></p>
                          {item.isEggless && <p className="text-[#E84E7B] font-semibold">100% Eggless</p>}
                          {item.cakeMessage && <p className="italic text-[#7A6D72] truncate">"{item.cakeMessage}"</p>}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="absolute top-3 right-3 text-[#7A6D72] hover:text-[#E84E7B] p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity & Item Total */}
                    <div className="pt-2 border-t border-[#F4E6EB] flex items-center justify-between">
                      <div className="flex items-center border border-[#E0D0D5] rounded bg-white">
                        <button
                          onClick={() => updateCartItemQuantity(item.cartItemId, -1)}
                          className="px-2 py-1 text-[#2B2225] hover:bg-[#FFF5F8]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#2B2225] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartItemQuantity(item.cartItemId, 1)}
                          className="px-2 py-1 text-[#2B2225] hover:bg-[#FFF5F8]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-sm text-[#E84E7B] tabular-nums">
                        Rs. {item.totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#FFF9FA] border-t border-[#F4E6EB] space-y-3.5">
              
              {/* Promo code */}
              <form onSubmit={handleApplyCode} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. LOVE10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full text-xs p-2 pl-7 uppercase bg-white border border-[#E0D0D5] rounded-md focus:outline-none focus:border-[#E84E7B]"
                    />
                    <Tag className="w-3.5 h-3.5 text-[#9E8E94] absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#E84E7B] hover:bg-[#D93C6B] text-white text-xs font-bold uppercase rounded-md cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {promoMessage && (
                  <p className={`text-[11px] ${promoMessage.isError ? 'text-red-500' : 'text-emerald-600 font-semibold'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-[#615358] pt-2 border-t border-[#F4E6EB]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#2B2225] tabular-nums">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-[#2B2225]">
                    {deliveryFee === 0 ? <span className="text-emerald-600">FREE</span> : `Rs. ${deliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-[#F4E6EB] text-sm">
                  <span className="font-bold text-[#2B2225]">Total</span>
                  <span className="font-bold text-lg text-[#E84E7B] tabular-nums">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 bg-[#E84E7B] hover:bg-[#D93C6B] text-white text-xs font-bold tracking-wider uppercase rounded-md shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
