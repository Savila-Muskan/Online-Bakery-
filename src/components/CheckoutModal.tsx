import React, { useState } from 'react';
import { X, ShieldCheck, MapPin, Phone, Mail, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PAKISTAN_CITIES, TIME_SLOTS } from '../data/mockData';
import { PaymentMethod } from '../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    deliveryFee, 
    discountAmount, 
    grandTotal, 
    createOrder 
  } = useShop();

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+92 ');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lahore');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(tomorrow);
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState(TIME_SLOTS[2]);
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !deliveryAddress) {
      alert('Please fill in your name, phone number, and complete delivery address.');
      return;
    }

    createOrder(
      {
        fullName,
        phone,
        email,
        city,
        deliveryAddress,
        landmark,
        deliveryDate,
        deliveryTimeSlot,
        orderNotes
      },
      paymentMethod
    );

    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#F4E6EB] my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FFF5F8] border-b border-[#F4E6EB]">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#E84E7B] font-bold block">
              CakeShop Express Checkout
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#2B2225] font-bold">
              Complete Your Cake Order
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full hover:bg-white text-[#7A6D72] hover:text-[#2B2225] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Fields */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-3">
                <h3 className="font-serif text-base font-bold text-[#2B2225] border-b border-[#F4E6EB] pb-1">
                  1. Contact Details
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2225]">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ayesha Tariq"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2225]">Phone (Pakistan WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 349 3438060"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2B2225]">Email Address</label>
                  <input
                    type="email"
                    placeholder="ayesha@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3">
                <h3 className="font-serif text-base font-bold text-[#2B2225] border-b border-[#F4E6EB] pb-1">
                  2. Delivery Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2225]">City *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2225]">Nearest Landmark</label>
                    <input
                      type="text"
                      placeholder="e.g. Near Hameed Latif Hospital"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2B2225]">Complete Street Address *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House #, Street #, Phase / Block / Sector..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="space-y-3">
                <h3 className="font-serif text-base font-bold text-[#2B2225] border-b border-[#F4E6EB] pb-1">
                  3. Delivery Schedule
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2225]">Delivery Date *</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2225]">Time Window *</label>
                    <select
                      value={deliveryTimeSlot}
                      onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                    >
                      {TIME_SLOTS.map((slot, i) => (
                        <option key={i} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2B2225]">Surprise Notes / Rider Instructions</label>
                  <input
                    type="text"
                    placeholder="e.g. Midnight surprise, don't ring bell..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                  />
                </div>
              </div>

              {/* Payment Methods matching reference: COD, JazzCash, Easypaisa, Bank Transfer */}
              <div className="space-y-3">
                <h3 className="font-serif text-base font-bold text-[#2B2225] border-b border-[#F4E6EB] pb-1">
                  4. Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'Cash on Delivery', name: 'Cash on Delivery (COD)', desc: 'Pay cash to refrigerated rider upon delivery' },
                    { id: 'JazzCash', name: 'JazzCash', desc: 'Transfer to 0349-3438060 (CakeShop / Savila Muskan)' },
                    { id: 'Easypaisa', name: 'Easypaisa', desc: 'Instant transfer to 0349-3438060 (Savila Muskan)' },
                    { id: 'Bank Transfer', name: 'Bank Transfer', desc: 'Meezan Bank / HBL / Alfalah' }
                  ].map((m) => {
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFF2F6] border-[#E84E7B] ring-1 ring-[#E84E7B]'
                            : 'bg-[#FFF9FA] border-[#F4E6EB] hover:border-[#E84E7B]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold text-xs text-[#2B2225]">{m.name}</span>
                          <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#E84E7B] bg-[#E84E7B]' : 'border-[#C4B7AC]'
                          }`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#7A6D72]">{m.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Summary */}
            <div className="lg:col-span-5">
              <div className="bg-[#FFF9FA] rounded-2xl p-5 border border-[#F4E6EB] sticky top-6 space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#2B2225]">
                  Order Summary ({cart.length} item{cart.length > 1 ? 's' : ''})
                </h3>

                <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="flex gap-2.5 text-xs bg-white p-2 rounded-lg border border-[#F4E6EB]">
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-12 h-12 rounded object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#2B2225] truncate">{item.product.name}</p>
                        <p className="text-[10px] text-[#7A6D72]">{item.selectedSize.weightLabel} · {item.selectedFlavor.name}</p>
                        <p className="text-[11px] text-[#E84E7B] font-bold mt-0.5">
                          {item.quantity} × Rs. {item.unitPrice.toLocaleString()} = <strong>Rs. {item.totalPrice.toLocaleString()}</strong>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#F4E6EB] space-y-1.5 text-xs text-[#615358]">
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
                    <span>Delivery</span>
                    <span className="font-bold text-[#2B2225]">
                      {deliveryFee === 0 ? <span className="text-emerald-600">FREE</span> : `Rs. ${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-[#F4E6EB] text-sm">
                    <span className="font-bold text-[#2B2225]">Total</span>
                    <span className="font-bold text-xl text-[#E84E7B] tabular-nums">
                      Rs. {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E84E7B] hover:bg-[#D93C6B] text-white text-xs font-bold tracking-wider uppercase rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>CONFIRM ORDER</span>
                </button>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
