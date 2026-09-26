import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+92 ');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lahore');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSent(true);
    setTimeout(() => {
      setName('');
      setPhone('+92 ');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white border-b border-[#FAD4DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF4B72] block">
            Concierge & Bakeries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#241F1E] font-bold tracking-tight">
            Connect With CakeShop
          </h2>
          <p className="text-sm text-[#6B635E] font-normal">
            Visit our physical bakeries in Lahore, Karachi and Islamabad, or reach our concierge directly for immediate celebration planning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info & Locations (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Action Buttons: Direct Call & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:+923008472911"
                className="p-4 rounded-2xl bg-[#FFF9FA] border border-[#FAD4DB] hover:border-[#FF4B72] transition-all flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#FFF0F3] text-[#FF4B72] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-[#7A716C] uppercase tracking-wider">Direct Hotline</p>
                  <p className="text-xs font-bold text-[#241F1E] group-hover:text-[#FF4B72]">+92 300 8472911</p>
                </div>
              </a>

              <a
                href="https://wa.me/923008472911?text=Hello%20CakeShop,%20I%20have%20an%20inquiry%20regarding%20a%20cake%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#25D366]/5 border border-[#25D366]/20 hover:border-[#25D366] transition-all flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-[#7A716C] uppercase tracking-wider">WhatsApp Chat</p>
                  <p className="text-xs font-bold text-[#128C7E]">+92 300 8472911</p>
                </div>
              </a>
            </div>

            {/* Email & Working Hours */}
            <div className="p-5 rounded-2xl bg-[#FFF9FA] border border-[#FAD4DB] space-y-3 text-xs text-[#5A524D]">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FF4B72] shrink-0" />
                <span>orders@cakeshop.pk</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#FF4B72] shrink-0" />
                <span>Baking & Delivery: 9:00 AM - Midnight Daily</span>
              </div>
            </div>

            {/* Pakistan Boutique Locations */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#241F1E]">
                Our Bakeries in Pakistan:
              </h3>

              {/* Lahore */}
              <div className="p-4 rounded-xl border border-[#FAD4DB] bg-white hover:border-[#FF4B72] transition-colors">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF4B72] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs text-[#241F1E]">Lahore Flagship Boutique</p>
                    <p className="text-[11px] text-[#7A716C]">12-C Gulberg III, M.M. Alam Road, Lahore</p>
                    <p className="text-[10px] text-[#FF4B72] mt-0.5 font-medium">Pick-up counter & consultation salon</p>
                  </div>
                </div>
              </div>

              {/* Karachi */}
              <div className="p-4 rounded-xl border border-[#FAD4DB] bg-white hover:border-[#FF4B72] transition-colors">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF4B72] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs text-[#241F1E]">Karachi Clifton Boutique</p>
                    <p className="text-[11px] text-[#7A716C]">Plot 8-C, 7th Zamzama Commercial Lane, DHA Phase 5 / Clifton Block 4</p>
                    <p className="text-[10px] text-[#FF4B72] mt-0.5 font-medium">Temperature-controlled dispatch & tasting bar</p>
                  </div>
                </div>
              </div>

              {/* Islamabad */}
              <div className="p-4 rounded-xl border border-[#FAD4DB] bg-white hover:border-[#FF4B72] transition-colors">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF4B72] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-xs text-[#241F1E]">Islamabad Studio</p>
                    <p className="text-[11px] text-[#7A716C]">Beverly Centre, Blue Area, Islamabad</p>
                    <p className="text-[10px] text-[#FF4B72] mt-0.5 font-medium">Twin-cities central dispatch</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Message Form & Map Preview (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Form */}
            <div className="bg-[#FFF9FA] rounded-2xl p-6 sm:p-8 border border-[#FAD4DB] shadow-sm">
              <h3 className="font-serif text-2xl text-[#241F1E] font-bold mb-1">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#6B635E] font-normal mb-6">
                Have a special request, event partnership, or question? Leave your note below and our concierge team will respond promptly.
              </p>

              {sent ? (
                <div className="p-6 bg-white rounded-xl border border-[#FAD4DB] text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-[#241F1E]">Message Dispatched</h4>
                  <p className="text-xs text-[#6B635E]">
                    Thank you, {name || 'valued customer'}. Our concierge team will reach out via WhatsApp / phone shortly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-xs text-[#FF4B72] font-bold hover:underline cursor-pointer"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#5A524D] block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ayesha Khan"
                        className="w-full text-xs p-3 bg-white border border-[#FAD4DB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#5A524D] block">
                        WhatsApp / Mobile *
                      </label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full text-xs p-3 bg-white border border-[#FAD4DB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#5A524D] block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ayesha@example.com"
                        className="w-full text-xs p-3 bg-white border border-[#FAD4DB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#5A524D] block">
                        City of Delivery / Event
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xs p-3 bg-white border border-[#FAD4DB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
                      >
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Other">Other City</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#5A524D] block">
                      Your Celebration Inquiry or Note
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your celebration date, guest count, or flavor preferences..."
                      className="w-full text-xs p-3 bg-white border border-[#FAD4DB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#FF4B72] hover:bg-[#E03A60] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#FF4B72]/20 flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Baker</span>
                  </button>
                </form>
              )}
            </div>

            {/* Stylized Map View */}
            <div className="rounded-2xl overflow-hidden border border-[#FAD4DB] bg-[#FFF9FA] relative h-56 flex flex-col justify-between p-6">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF4B72_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#FF4B72] uppercase tracking-wider">Kitchen & Storefront Network</span>
                  <h4 className="font-serif text-lg font-bold text-[#241F1E]">Interactive Locations</h4>
                </div>
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[#FF4B72] border border-[#FAD4DB]">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>

              <div className="relative z-10 bg-white/95 backdrop-blur-sm p-3.5 rounded-xl border border-[#FAD4DB] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#241F1E]">All Pakistan Same-Day Express</p>
                  <p className="text-[11px] text-[#7A716C]">Lahore • Karachi • Islamabad • Rawalpindi</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Lahore+Gulberg+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#FFF0F3] hover:bg-[#FFE0E6] text-[#FF4B72] text-[11px] font-bold rounded-lg transition-colors"
                >
                  View on Maps
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
