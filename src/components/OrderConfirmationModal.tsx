import React from 'react';
import { CheckCircle2, Compass, ShoppingBag, Printer, MessageCircle, ArrowRight, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderConfirmationModal: React.FC = () => {
  const { confirmedOrder, setConfirmedOrder, setIsTrackingOpen, setTrackingOrderNumber } = useShop();

  if (!confirmedOrder) return null;

  const handleTrackOrder = () => {
    setTrackingOrderNumber(confirmedOrder.orderNumber);
    setConfirmedOrder(null);
    setIsTrackingOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppConfirm = () => {
    const text = encodeURIComponent(
      `Hello CakeShop! I just placed Order #${confirmedOrder.orderNumber}.\n• Customer: ${confirmedOrder.customer.fullName}\n• Total: ₨ ${confirmedOrder.total.toLocaleString()}\n• Delivery: ${confirmedOrder.customer.deliveryDate} (${confirmedOrder.customer.deliveryTimeSlot})\n• Address: ${confirmedOrder.customer.deliveryAddress}, ${confirmedOrder.customer.city}`
    );
    window.open(`https://wa.me/923008472911?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#ECE3DB] my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FFF5F7] border-b border-[#FAD4DB]">
          <span className="text-xs uppercase tracking-widest text-[#FF4B72] font-bold">
            Order Confirmed
          </span>
          <button
            onClick={() => setConfirmedOrder(null)}
            className="p-1 rounded-full text-[#7A716C] hover:text-[#241F1E] hover:bg-[#FFEAEF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Success Banner */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#FFF5F7] text-[#FF4B72] flex items-center justify-center mx-auto border border-[#FAD4DB]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241F1E]">
              Your Sweet Order Has Been Confirmed!
            </h2>
            <p className="text-xs text-[#6B635E]">
              Our bakers have received your order and are preparing freshly baked perfection.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-5 bg-[#FFF9FA] rounded-xl border border-[#FAD4DB] space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAD4DB]">
              <div>
                <span className="text-[10px] text-[#7A716C] uppercase tracking-wider block">Order Reference</span>
                <span className="font-mono text-base font-bold text-[#FF4B72]">{confirmedOrder.orderNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#7A716C] uppercase tracking-wider block">Payment Method</span>
                <span className="font-medium text-[#241F1E]">{confirmedOrder.paymentMethod}</span>
              </div>
            </div>

            {/* Scheduled details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-[#7A716C] text-[10px] uppercase tracking-wider">Scheduled Delivery</p>
                <p className="font-semibold text-[#241F1E]">{confirmedOrder.customer.deliveryDate}</p>
                <p className="text-[#5A524D]">{confirmedOrder.customer.deliveryTimeSlot}</p>
              </div>
              <div>
                <p className="text-[#7A716C] text-[10px] uppercase tracking-wider">Delivery Destination</p>
                <p className="font-semibold text-[#241F1E]">{confirmedOrder.customer.fullName} ({confirmedOrder.customer.city})</p>
                <p className="text-[#5A524D] line-clamp-1">{confirmedOrder.customer.deliveryAddress}</p>
              </div>
            </div>

            {/* Items Summary */}
            <div className="pt-3 border-t border-[#FAD4DB] space-y-2">
              <p className="text-[10px] text-[#7A716C] uppercase tracking-wider font-semibold">
                Ordered Creations:
              </p>
              {confirmedOrder.items.map((item) => (
                <div key={item.cartItemId} className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-[#FAD4DB]">
                  <div>
                    <p className="font-bold text-[#241F1E]">{item.product.name}</p>
                    <p className="text-[10px] text-[#7A716C]">{item.selectedSize.name} · {item.selectedFlavor.name}</p>
                    {item.cakeMessage && <p className="text-[10px] italic text-[#FF4B72]">Message: "{item.cakeMessage}"</p>}
                  </div>
                  <span className="font-serif font-bold text-[#FF4B72] tabular-nums">
                    ₨ {item.totalPrice.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-2 border-t border-[#FAD4DB] flex justify-between text-sm font-semibold text-[#241F1E]">
              <span>Grand Total</span>
              <span className="font-serif text-lg font-bold text-[#FF4B72] tabular-nums">₨ {confirmedOrder.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleTrackOrder}
                className="w-full py-3 bg-[#FF4B72] hover:bg-[#E03A60] text-white text-xs font-bold tracking-wider uppercase rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>TRACK ORDER</span>
              </button>

              <button
                onClick={handleWhatsAppConfirm}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold tracking-wider uppercase rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WHATSAPP CONFIRMATION</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrint}
                className="text-xs text-[#7A716C] hover:text-[#241F1E] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              <button
                onClick={() => setConfirmedOrder(null)}
                className="text-xs text-[#FF4B72] font-bold hover:underline cursor-pointer"
              >
                Continue Shopping →
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
