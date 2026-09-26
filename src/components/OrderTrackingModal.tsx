import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  Truck, 
  Home, 
  Phone, 
  AlertCircle,
  PackageCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderStatus } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingOpen, setIsTrackingOpen, trackingOrderNumber, setTrackingOrderNumber, orders } = useShop();

  const [searchQuery, setSearchQuery] = useState(trackingOrderNumber || 'LUM-84920');

  if (!isTrackingOpen) return null;

  // Find order by orderNumber or customer phone
  const currentOrder = orders.find(
    o => o.orderNumber.toLowerCase() === searchQuery.trim().toLowerCase() ||
         o.customer.phone.includes(searchQuery.trim())
  ) || orders[0];

  const stages: { label: OrderStatus; desc: string; icon: any }[] = [
    { label: 'Order Placed', desc: 'Received & queued for pastry chef review', icon: Clock },
    { label: 'Order Confirmed', desc: 'Ingredients measured & slot reserved', icon: CheckCircle2 },
    { label: 'Baking', desc: 'Fresh sponge baking & ganache churning', icon: ChefHat },
    { label: 'Ready for Delivery', desc: 'Decorated, gold leaf applied & boxed in chilled unit', icon: PackageCheck },
    { label: 'Out for Delivery', desc: 'In refrigerated transit van with rider', icon: Truck },
    { label: 'Delivered', desc: 'Delivered safely to recipient celebration', icon: Home }
  ];

  const getStageIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Order Placed': return 0;
      case 'Order Confirmed': return 1;
      case 'Baking': return 2;
      case 'Ready for Delivery': return 3;
      case 'Out for Delivery': return 4;
      case 'Delivered': return 5;
      default: return 1;
    }
  };

  const currentStageIndex = currentOrder ? getStageIndex(currentOrder.status) : 1;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingOrderNumber(searchQuery);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#ECE3DB] my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FFF5F7] border-b border-[#FAD4DB]">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#FF4B72] font-bold block">
              Live Fresh Delivery Dispatch
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#241F1E] font-bold">
              Order Tracking & Status
            </h2>
          </div>
          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1 rounded-full text-[#7A716C] hover:text-[#241F1E] hover:bg-[#FFEAEF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Order # (e.g. LUM-84920) or Phone"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs p-2.5 pl-8 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
              />
              <Search className="w-4 h-4 text-[#8C827A] absolute left-2.5 top-3" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#FF4B72] hover:bg-[#E03A60] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Track
            </button>
          </form>

          {currentOrder ? (
            <div className="space-y-6">
              
              {/* Status Header Box */}
              <div className="p-4 bg-[#FFF9FA] rounded-xl border border-[#FAD4DB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#7A716C] uppercase tracking-wider block">Currently Tracking:</span>
                  <span className="font-mono text-base font-bold text-[#FF4B72]">{currentOrder.orderNumber}</span>
                  <span className="text-[#5A524D] block mt-0.5">{currentOrder.customer.fullName} · {currentOrder.customer.city}</span>
                </div>
                <div className="sm:text-right">
                  <span className="inline-block px-3 py-1 bg-[#FF4B72] text-white rounded-full text-xs font-bold uppercase tracking-wider">
                    {currentOrder.status}
                  </span>
                  <span className="text-[11px] text-[#7A716C] block mt-1">
                    Slot: {currentOrder.customer.deliveryTimeSlot}
                  </span>
                </div>
              </div>

              {/* 6-Stage Timeline */}
              <div className="space-y-4 py-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#241F1E] block">
                  Artisanal Kitchen & Delivery Progress:
                </span>

                <div className="relative pl-6 space-y-6 border-l-2 border-[#FAD4DB]">
                  {stages.map((stage, idx) => {
                    const isPassed = idx <= currentStageIndex;
                    const isCurrent = idx === currentStageIndex;
                    const Icon = stage.icon;

                    return (
                      <div key={stage.label} className="relative group">
                        {/* Dot indicator */}
                        <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isCurrent
                            ? 'bg-[#FF4B72] border-white shadow-md ring-2 ring-[#FF4B72] text-white'
                            : isPassed
                            ? 'bg-[#241F1E] border-white text-white'
                            : 'bg-white border-[#FAD4DB] text-[#D9C8BC]'
                        }`}>
                          <Icon className="w-3 h-3" />
                        </div>

                        {/* Text */}
                        <div className="space-y-0.5">
                          <p className={`text-xs font-bold ${
                            isCurrent ? 'text-[#FF4B72]' : isPassed ? 'text-[#241F1E]' : 'text-[#A89E96]'
                          }`}>
                            {idx + 1}. {stage.label}
                            {isCurrent && (
                              <span className="ml-2 text-[10px] text-[#FF4B72] bg-[#FFF0F3] px-2 py-0.5 rounded-full font-semibold">
                                Active State
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-[#6B635E] font-light">
                            {stage.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rider / Chilled Delivery Fleet Details */}
              {currentOrder.riderDetails && (
                <div className="p-4 bg-white rounded-xl border border-[#FAD4DB] space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-[#F6D5DB] pb-2">
                    <span className="font-bold text-[#241F1E] flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#FF4B72]" />
                      <span>Dedicated Chilled Transit Rider</span>
                    </span>
                    <span className="text-[#128C7E] font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Dispatch
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-medium text-[#241F1E]">{currentOrder.riderDetails.name}</p>
                      <p className="text-[10px] text-[#7A716C]">{currentOrder.riderDetails.vehicle}</p>
                    </div>

                    <a
                      href={`tel:${currentOrder.riderDetails.phone}`}
                      className="px-3 py-1.5 bg-[#FFF5F7] hover:bg-[#FFEAEF] border border-[#FAD4DB] text-[#241F1E] rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3 h-3 text-[#FF4B72]" />
                      <span>Call Rider</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Items in this order */}
              <div className="text-xs space-y-2 pt-2 border-t border-[#ECE3DB]">
                <p className="text-[#7A716C] text-[10px] uppercase tracking-wider font-semibold">
                  Items in this dispatch:
                </p>
                {currentOrder.items.map(item => (
                  <div key={item.cartItemId} className="flex justify-between items-center text-[#4A433F]">
                    <span>• {item.quantity}× {item.product.name} ({item.selectedSize.name})</span>
                    <span className="font-serif font-medium">₨ {item.totalPrice.toLocaleString()}</span>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="text-center py-10 text-xs text-[#7A716C] space-y-2">
              <AlertCircle className="w-8 h-8 text-[#C5A059] mx-auto" />
              <p>No order found for "{searchQuery}". Please check your order reference number.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
