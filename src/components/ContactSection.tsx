import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+92 ');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lahore');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [lastMessageDetails, setLastMessageDetails] = useState<{
    name: string;
    phone: string;
    email: string;
    city: string;
    message: string;
    whatsappUrl: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Compose formatted WhatsApp message for the Baker (+92 349 3438060)
    const formattedWaText = 
`🎂 *NEW MESSAGE FOR BAKER (CAKESHOP PK)* 🎂
━━━━━━━━━━━━━━━━━━━━━━
👤 *Customer Name:* ${name.trim()}
📞 *Customer Phone / WhatsApp:* ${phone.trim()}
📧 *Email Address:* ${email.trim() || 'Not provided'}
📍 *City:* ${city}

📝 *Customer Note / Inquiry:*
${message.trim() || 'No specific note provided'}
━━━━━━━━━━━━━━━━━━━━━━
⏰ *Sent:* ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
💬 *Source:* CakeShop Website Contact Form`;

    const whatsappUrl = `https://wa.me/923493438060?text=${encodeURIComponent(formattedWaText)}`;

    setLastMessageDetails({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city,
      message: message.trim(),
      whatsappUrl
    });

    setSent(true);

    // Open Baker's WhatsApp with customer's details
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
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
                href="tel:+923493438060"
                className="p-4 rounded-2xl bg-[#FFF9FA] border border-[#FAD4DB] hover:border-[#FF4B72] transition-all flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#FFF0F3] text-[#FF4B72] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-[#7A716C] uppercase tracking-wider">Direct Hotline</p>
                  <p className="text-xs font-bold text-[#241F1E] group-hover:text-[#FF4B72]">+92 349 3438060</p>
                </div>
              </a>

              <a
                href="https://wa.me/923493438060?text=Hello%20CakeShop,%20I%20have%20an%20inquiry%20regarding%20a%20cake%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#25D366]/5 border border-[#25D366]/20 hover:border-[#25D366] transition-all flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-[#7A716C] uppercase tracking-wider">WhatsApp Chat</p>
                  <p className="text-xs font-bold text-[#128C7E]">+92 349 3438060</p>
                </div>
              </a>
            </div>

            {/* Email & Working Hours */}
            <div className="p-5 rounded-2xl bg-[#FFF9FA] border border-[#FAD4DB] space-y-3 text-xs text-[#5A524D]">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FF4B72] shrink-0" />
                <a href="mailto:savilamuskan26@gmail.com" className="hover:text-[#FF4B72] transition-colors">
                  savilamuskan26@gmail.com
                </a>
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

              {sent && lastMessageDetails ? (
                <div className="p-6 sm:p-7 bg-white rounded-2xl border border-emerald-200 text-center space-y-4 shadow-sm animate-in fade-in">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-[#241F1E]">
                      Message Sent to Baker's WhatsApp!
                    </h4>
                    <p className="text-xs text-[#6B635E] mt-1 max-w-md mx-auto">
                      All your contact details and message have been formatted and directed to Baker <strong>+92 349 3438060</strong>.
                    </p>
                  </div>

                  {/* Summary of Transmitted Data */}
                  <div className="bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl p-4 text-left text-xs space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF4B72] block">
                      Dispatched Details:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#241F1E]">
                      <div>
                        <span className="text-[#7A6D72] block text-[10px]">Customer Name:</span>
                        <strong>{lastMessageDetails.name}</strong>
                      </div>
                      <div>
                        <span className="text-[#7A6D72] block text-[10px]">Phone Number:</span>
                        <strong className="text-[#FF4B72]">{lastMessageDetails.phone}</strong>
                      </div>
                      <div>
                        <span className="text-[#7A6D72] block text-[10px]">Email Address:</span>
                        <span>{lastMessageDetails.email || 'Not provided'}</span>
                      </div>
                      <div>
                        <span className="text-[#7A6D72] block text-[10px]">City:</span>
                        <span>{lastMessageDetails.city}</span>
                      </div>
                    </div>
                    {lastMessageDetails.message && (
                      <div className="pt-2 border-t border-[#FAD4DB]">
                        <span className="text-[#7A6D72] block text-[10px]">Customer Note / Inquiry:</span>
                        <p className="text-[#241F1E] italic mt-0.5">"{lastMessageDetails.message}"</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={lastMessageDetails.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-md shadow-[#25D366]/20 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open WhatsApp Chat (+92 349 3438060)</span>
                    </a>
                    
                    <button
                      onClick={() => {
                        setSent(false);
                        setName('');
                        setPhone('+92 ');
                        setEmail('');
                        setMessage('');
                      }}
                      className="w-full sm:w-auto px-5 py-3 border border-[#FAD4DB] hover:bg-[#FFF9FA] text-[#52454A] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Send Another Note
                    </button>
                  </div>
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
                        placeholder="+92 349 3438060"
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
