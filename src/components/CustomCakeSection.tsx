import React, { useState } from 'react';
import { Sparkles, ArrowRight, Upload, CheckCircle2, MessageCircle, X, Calendar, MapPin, Phone, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CHOCOLATE_CAKE_IMAGE, PAKISTAN_CITIES } from '../data/mockData';
import { compressImageFile, getSafeImageUrl, FALLBACK_CHOCOLATE_IMAGE } from '../utils/imageUtils';

export const CustomCakeSection: React.FC = () => {
  const { isCustomCakeOpen, setIsCustomCakeOpen, submitCustomRequest } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('+92 ');
  const [city, setCity] = useState('Lahore');
  const [occasion, setOccasion] = useState('Birthday Celebration');
  const [preferredFlavor, setPreferredFlavor] = useState('Rich Belgian Chocolate Fudge');
  const [size, setSize] = useState('2 Lbs (Classic)');
  const [theme, setTheme] = useState('Chocolate Ganache Drip & Strawberries');
  const [colorPreference, setColorPreference] = useState('Dark chocolate & soft pink cream');
  const [messageOnCake, setMessageOnCake] = useState('');
  const [referenceImageUrl, setReferenceImageUrl] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(
    new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]
  );
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRequestId, setSubmittedRequestId] = useState('');

  const handleImageUploadSim = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 1200, 0.82);
        setReferenceImageUrl(compressed);
      } catch (err) {
        console.error('Error compressing reference photo:', err);
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setReferenceImageUrl(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    const newReq = submitCustomRequest({
      customerName,
      phone,
      city,
      occasion,
      preferredFlavor,
      size,
      theme,
      colorPreference,
      messageOnCake,
      referenceImageUrl: referenceImageUrl || CHOCOLATE_CAKE_IMAGE,
      deliveryDate,
      additionalInstructions
    });

    setSubmittedRequestId(newReq.id);
    setIsSubmitted(true);
  };

  const handleOpenWhatsAppConcierge = () => {
    const message = encodeURIComponent(
      `Hello CakeShop!\nI just submitted a custom cake inquiry:\n• Name: ${customerName}\n• Occasion: ${occasion}\n• Flavor: ${preferredFlavor}\n• Size: ${size}\n• City: ${city}\n• Date: ${deliveryDate}\nPlease share an estimated quote!`
    );
    window.open(`https://wa.me/923493438060?text=${message}`, '_blank');
  };

  return (
    <>
      {/* 
        Custom Cake Section matching bottom banner of reference image:
        - Light blush pink background
        - "Custom Cake for Your Special Moments"
        - "Tell us your ideas, we'll bake your dreams!"
        - "ORDER CUSTOM CAKE →" button (white button with border & arrow)
        - Luscious chocolate drip cake placed on the right
      */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#FFF2F6] via-[#FFEBF1] to-[#FFF0F5] py-14 lg:py-20 border-b border-[#FCE6EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2B2225] leading-tight">
                Custom Cake for <br />
                <span className="text-[#E84E7B]">Your Special Moments</span>
              </h2>

              <p className="text-base sm:text-lg text-[#615358] font-normal">
                Tell us your ideas, we'll bake your dreams!
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                {/* White button matching reference image "ORDER CUSTOM CAKE →" */}
                <button
                  onClick={() => setIsCustomCakeOpen(true)}
                  className="px-6 py-3 bg-white hover:bg-[#FFF5F8] text-[#2B2225] border border-[#E0D0D5] hover:border-[#E84E7B] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>ORDER CUSTOM CAKE</span>
                  <ArrowRight className="w-4 h-4 text-[#E84E7B]" />
                </button>

                <a
                  href="https://wa.me/923493438060?text=Hello%20CakeShop!%20I%20want%20to%20consult%20about%20a%20custom%20cake."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-[#E84E7B] hover:text-[#D93C6B] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Luscious chocolate cake matching the reference image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-sm sm:max-w-md w-full">
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
                  <img
                    src={getSafeImageUrl(CHOCOLATE_CAKE_IMAGE)}
                    alt="Custom chocolate drip cake with piped rosettes"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_CHOCOLATE_IMAGE; }}
                    className="w-full h-auto aspect-square object-cover object-center transform hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Custom Cake Form Modal */}
      {isCustomCakeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#F4E6EB] my-8 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header in CakeShop Pink */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FFF5F8] border-b border-[#F4E6EB]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#E84E7B] font-bold block">
                  Bespoke Bakery
                </span>
                <h3 className="font-serif text-xl font-bold text-[#2B2225]">
                  Order Your Custom Cake
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsCustomCakeOpen(false);
                  setIsSubmitted(false);
                }}
                className="p-1.5 rounded-full hover:bg-white text-[#7A6D72] hover:text-[#2B2225] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6 sm:p-8">
              {isSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-[#FFF2F6] text-[#E84E7B] rounded-full flex items-center justify-center mx-auto border border-[#FAD7E1]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#2B2225]">
                    Custom Cake Request Received!
                  </h4>
                  <p className="text-xs text-[#615358] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{customerName}</strong>! Our master bakers will review your theme and message you at <strong>{phone}</strong> within 1 hour with quote and delivery schedule.
                  </p>
                  <div className="p-3 bg-[#FFF5F8] rounded-xl border border-[#F4E6EB] max-w-sm mx-auto text-xs text-[#2B2225]">
                    <span>Inquiry Reference: </span>
                    <strong className="font-mono text-[#E84E7B]">{submittedRequestId}</strong>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleOpenWhatsAppConcierge}
                      className="px-6 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold tracking-wider uppercase rounded-lg shadow transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat On WhatsApp Now</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsCustomCakeOpen(false);
                        setIsSubmitted(false);
                      }}
                      className="px-6 py-3 bg-[#2B2225] text-white text-xs font-semibold tracking-wider uppercase rounded-lg shadow transition-colors cursor-pointer"
                    >
                      Back to Shop
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2225]">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sana Malik"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2225]">Phone / WhatsApp (Pakistan) *</label>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <label className="text-xs font-semibold text-[#2B2225]">Occasion *</label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                      >
                        <option value="Birthday Celebration">Birthday Celebration</option>
                        <option value="Wedding / Reception">Wedding / Reception</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Baby Shower">Baby Shower</option>
                        <option value="Graduation">Graduation</option>
                        <option value="Eid Mubarak">Eid Mubarak</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2225]">Size / Weight</label>
                      <input
                        type="text"
                        placeholder="e.g. 2 Lbs / 3 Lbs / 2-Tier"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2225]">Preferred Flavor</label>
                      <input
                        type="text"
                        placeholder="e.g. Chocolate Fudge, Red Velvet, Vanilla"
                        value={preferredFlavor}
                        onChange={(e) => setPreferredFlavor(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2225]">Cake Message</label>
                      <input
                        type="text"
                        placeholder="e.g. Happy Birthday Sara!"
                        value={messageOnCake}
                        onChange={(e) => setMessageOnCake(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#2B2225]">Required Date</label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                      />
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2225]">Upload Reference Photo (Optional)</label>
                    <div className="p-3 border-2 border-dashed border-[#FAD7E1] rounded-xl text-center bg-[#FFF9FA]">
                      <input
                        type="file"
                        accept="image/*"
                        id="custom-cake-file-shop"
                        onChange={handleImageUploadSim}
                        className="hidden"
                      />
                      <label htmlFor="custom-cake-file-shop" className="cursor-pointer flex flex-col items-center">
                        {referenceImageUrl ? (
                          <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#E84E7B] mx-auto">
                            <img src={referenceImageUrl} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <>
                            <Upload className="w-5 h-5 text-[#E84E7B] mb-1" />
                            <span className="text-xs font-medium text-[#2B2225]">Click to choose image from device</span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2B2225]">Additional Instructions</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Add extra chocolate drip, deliver by 6 PM..."
                      value={additionalInstructions}
                      onChange={(e) => setAdditionalInstructions(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FFF9FA] border border-[#E0D0D5] rounded-lg focus:outline-none focus:border-[#E84E7B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#E84E7B] hover:bg-[#D93C6B] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow transition-colors cursor-pointer"
                  >
                    SUBMIT CUSTOM INQUIRY
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
