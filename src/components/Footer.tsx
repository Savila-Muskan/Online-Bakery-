import React, { useState } from 'react';
import { Facebook, Instagram, Phone, Mail, Send } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { 
    setIsAdminOpen, 
    setIsTrackingOpen, 
    setIsCustomCakeOpen,
    setActiveCategoryFilter
  } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-[#52454A] pt-14 pb-8 border-t border-[#F4E6EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 4 Columns matching the reference image layout:
            1. CakeShop logo & "We bake more than cakes, we bake happiness! Thank you for choosing us." + Social icons
            2. Quick Links: Home, Shop, About Us, Contact Us, FAQs
            3. Customer Service: My Account, Track Order, Shipping Policy, Return & Refund, Terms & Conditions
            4. Newsletter: Subscribe to get updates on new cakes and offers + Input + SUBSCRIBE button
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFF2F6] border border-[#F8C8D6] flex items-center justify-center text-[#E84E7B]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 17h16v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3z" />
                  <path d="M6 11h12v6H6v-6z" />
                  <path d="M8 7h8v4H8V7z" />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-xl font-bold tracking-tight text-[#E84E7B]">
                  Cake<span className="text-[#382E32]">Shop</span>
                </span>
                <span className="text-[9px] tracking-widest text-[#E84E7B] font-medium -mt-0.5">
                  — Baked with Love —
                </span>
              </div>
            </div>

            <p className="text-xs text-[#7A6D72] leading-relaxed">
              We bake more than cakes, <br />
              we bake happiness! <br />
              Thank you for choosing us.
            </p>

            {/* Social Icons matching the image: Facebook, Instagram, WhatsApp */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                title="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#E1306C] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://wa.me/923493438060"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                title="WhatsApp"
              >
                <span className="text-xs font-bold">W</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#2B2225] tracking-tight">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#6B5D63]">
              <li>
                <button onClick={() => handleScrollTo('hero')} className="hover:text-[#E84E7B] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('shop-catalog')} className="hover:text-[#E84E7B] transition-colors cursor-pointer">
                  Shop
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('about')} className="hover:text-[#E84E7B] transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('contact')} className="hover:text-[#E84E7B] transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('contact')} className="hover:text-[#E84E7B] transition-colors cursor-pointer">
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#2B2225] tracking-tight">
              Customer Service
            </h4>
            <ul className="space-y-2 text-xs text-[#6B5D63]">
              <li>
                <button onClick={() => setIsTrackingOpen(true)} className="hover:text-[#E84E7B] transition-colors cursor-pointer">
                  My Orders & Tracking
                </button>
              </li>
              <li>
                <button onClick={() => setIsTrackingOpen(true)} className="hover:text-[#E84E7B] transition-colors cursor-pointer">
                  Track Order
                </button>
              </li>
              <li>
                <span className="hover:text-[#E84E7B] transition-colors cursor-pointer">
                  Shipping Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#E84E7B] transition-colors cursor-pointer">
                  Return & Refund
                </span>
              </li>
              <li>
                <span className="hover:text-[#E84E7B] transition-colors cursor-pointer">
                  Terms & Conditions
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter matching reference */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#2B2225] tracking-tight">
              Newsletter
            </h4>
            <p className="text-xs text-[#7A6D72]">
              Subscribe to get updates on new cakes and offers.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 bg-[#FFF9FA] border border-[#E0D0D5] rounded focus:outline-none focus:border-[#E84E7B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E84E7B] hover:bg-[#D93C6B] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer shrink-0"
                >
                  SUBSCRIBE
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#E84E7B] font-medium">
                  Thank you for subscribing!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar matching reference image with Payment icons */}
        <div className="pt-6 border-t border-[#F4E6EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6D72]">
          <p>© 2026 CakeShop. All Rights Reserved.</p>
          
          {/* Payment Badges matching reference: VISA, Mastercard, JazzCash, Easypaisa */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#1A1F71] text-xs">VISA</span>
            <span className="font-bold text-[#EB001B] text-xs">mastercard</span>
            <span className="font-bold text-[#ED1C24] text-xs">JazzCash</span>
            <span className="font-bold text-[#00A551] text-xs">easypaisa</span>
            <span className="text-[#888]">• Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
