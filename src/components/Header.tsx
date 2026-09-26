import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  ChevronDown,
  User,
  Facebook,
  Instagram
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Header: React.FC = () => {
  const { 
    cartCount, 
    setIsCartOpen, 
    wishlist, 
    setIsWishlistOpen, 
    setIsSearchOpen, 
    setIsAdminOpen,
    setIsCustomCakeOpen,
    setIsTrackingOpen,
    setActiveCategoryFilter,
    setActiveOccasionFilter
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cakesDropdownOpen, setCakesDropdownOpen] = useState(false);
  const [occasionsDropdownOpen, setOccasionsDropdownOpen] = useState(false);

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    setCakesDropdownOpen(false);
    setOccasionsDropdownOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: string) => {
    setActiveOccasionFilter(null);
    setActiveCategoryFilter(cat);
    handleNavClick('shop-catalog');
  };

  const handleSelectOccasion = (occ: string) => {
    setActiveCategoryFilter(null);
    setActiveOccasionFilter(occ);
    handleNavClick('shop-catalog');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#F4E6EB] shadow-xs">
      
      {/* 1. Top Ribbon matching the image (Pink bar) */}
      <div className="bg-[#E84E7B] text-white text-xs font-normal py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left Announcement */}
          <div className="flex items-center gap-1.5">
            <span className="inline-block">📍 Delivering happiness to your doorsteps!</span>
          </div>

          {/* Right Contact Info & Socials */}
          <div className="flex items-center gap-4 text-xs">
            <a 
              href="tel:+923001234567" 
              className="flex items-center gap-1 hover:text-[#FFE3EB] transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>+92 300 1234567</span>
            </a>
            <span className="opacity-50 hidden sm:inline">|</span>
            <a 
              href="mailto:info@cakeshop.com" 
              className="hidden sm:flex items-center gap-1 hover:text-[#FFE3EB] transition-colors"
            >
              <Mail className="w-3 h-3" />
              <span>info@cakeshop.com</span>
            </a>
            <div className="hidden md:flex items-center gap-2 pl-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:opacity-80">
                <Facebook className="w-3 h-3" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-80">
                <Instagram className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo matching the reference image */}
        <a 
          href="/" 
          className="flex items-center gap-2 group focus:outline-none"
        >
          {/* Logo Icon (Tiered Cake Outline) */}
          <div className="w-10 h-10 rounded-lg bg-[#FFF2F6] border border-[#F8C8D6] flex items-center justify-center text-[#E84E7B]">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 17h16v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3z" />
              <path d="M6 11h12v6H6v-6z" />
              <path d="M8 7h8v4H8V7z" />
              <path d="M12 3v4" />
              <circle cx="12" cy="3" r="0.5" fill="currentColor" />
            </svg>
          </div>

          <div className="flex flex-col leading-tight">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#E84E7B]">
              Cake<span className="text-[#382E32]">Shop</span>
            </span>
            <span className="text-[10px] tracking-widest text-[#E84E7B] font-medium -mt-0.5">
              — Baked with Love —
            </span>
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-[#4A3F43]">
          <button 
            onClick={() => handleNavClick('hero')} 
            className="text-[#E84E7B] font-semibold transition-colors py-1 cursor-pointer"
          >
            Home
          </button>
          
          <button 
            onClick={() => handleNavClick('shop-catalog')} 
            className="hover:text-[#E84E7B] transition-colors py-1 cursor-pointer"
          >
            Shop
          </button>

          {/* Cakes Dropdown */}
          <div className="relative group">
            <button 
              onClick={() => setCakesDropdownOpen(!cakesDropdownOpen)}
              onMouseEnter={() => setCakesDropdownOpen(true)}
              className="flex items-center gap-1 hover:text-[#E84E7B] transition-colors py-1 cursor-pointer"
            >
              <span>Cakes</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {cakesDropdownOpen && (
              <div 
                onMouseLeave={() => setCakesDropdownOpen(false)}
                className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-[#F4E6EB] py-2 z-50 animate-in fade-in"
              >
                {['Birthday Cakes', 'Wedding Cakes', 'Anniversary Cakes', 'Photo Cakes', 'Cupcakes', 'Customized Cakes', 'Brownies', 'Desserts'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleSelectCategory(cat)}
                    className="w-full text-left px-4 py-2 text-xs text-[#52454A] hover:text-[#E84E7B] hover:bg-[#FFF5F8] transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Occasions Dropdown */}
          <div className="relative group">
            <button 
              onClick={() => setOccasionsDropdownOpen(!occasionsDropdownOpen)}
              onMouseEnter={() => setOccasionsDropdownOpen(true)}
              className="flex items-center gap-1 hover:text-[#E84E7B] transition-colors py-1 cursor-pointer"
            >
              <span>Occasions</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
            {occasionsDropdownOpen && (
              <div 
                onMouseLeave={() => setOccasionsDropdownOpen(false)}
                className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-[#F4E6EB] py-2 z-50 animate-in fade-in"
              >
                {['Birthday', 'Wedding', 'Anniversary', 'Engagement', 'Baby Shower', 'Graduation', 'Valentine\'s Day', 'Eid'].map((occ) => (
                  <button
                    key={occ}
                    onClick={() => handleSelectOccasion(occ)}
                    className="w-full text-left px-4 py-2 text-xs text-[#52454A] hover:text-[#E84E7B] hover:bg-[#FFF5F8] transition-colors cursor-pointer"
                  >
                    {occ}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => handleNavClick('gallery')} 
            className="hover:text-[#E84E7B] transition-colors py-1 cursor-pointer"
          >
            Gallery
          </button>

          <button 
            onClick={() => handleNavClick('about')} 
            className="hover:text-[#E84E7B] transition-colors py-1 cursor-pointer"
          >
            About Us
          </button>
          
          <button 
            onClick={() => handleNavClick('contact')} 
            className="hover:text-[#E84E7B] transition-colors py-1 cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right Navigation Actions (Search, Account, Cart) */}
        <div className="flex items-center gap-3 sm:gap-4 text-[#4A3F43]">
          
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="p-2 hover:text-[#E84E7B] hover:bg-[#FFF5F8] rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Customer Account / Order Tracking Trigger */}
          <button
            onClick={() => setIsTrackingOpen(true)}
            title="Track Your Order"
            aria-label="Track Your Order"
            className="p-2 hover:text-[#E84E7B] hover:bg-[#FFF5F8] rounded-full transition-colors cursor-pointer"
          >
            <User className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label="Wishlist"
            className="relative p-2 hover:text-[#E84E7B] hover:bg-[#FFF5F8] rounded-full transition-colors cursor-pointer"
          >
            <Heart className="w-5 h-5 stroke-[1.8]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#E84E7B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon with Counter */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
            className="relative p-2 text-[#4A3F43] hover:text-[#E84E7B] hover:bg-[#FFF5F8] rounded-full transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#E84E7B] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4A3F43] hover:text-[#E84E7B] rounded-md transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#F4E6EB] px-6 py-6 space-y-3 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-[#4A3F43]">
            <button 
              onClick={() => handleNavClick('hero')} 
              className="text-left py-2 text-[#E84E7B] border-b border-[#F4E6EB]/60 font-semibold"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('shop-catalog')} 
              className="text-left py-2 hover:text-[#E84E7B] border-b border-[#F4E6EB]/60"
            >
              Shop All Cakes
            </button>
            <button 
              onClick={() => handleNavClick('categories')} 
              className="text-left py-2 hover:text-[#E84E7B] border-b border-[#F4E6EB]/60"
            >
              Categories
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); setIsCustomCakeOpen(true); }} 
              className="text-left py-2 text-[#E84E7B] font-semibold border-b border-[#F4E6EB]/60 flex items-center justify-between"
            >
              <span>Custom Cake</span>
              <span>→</span>
            </button>
            <button 
              onClick={() => handleNavClick('gallery')} 
              className="text-left py-2 hover:text-[#E84E7B] border-b border-[#F4E6EB]/60"
            >
              Gallery
            </button>
            <button 
              onClick={() => handleNavClick('about')} 
              className="text-left py-2 hover:text-[#E84E7B] border-b border-[#F4E6EB]/60"
            >
              About Us
            </button>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="text-left py-2 hover:text-[#E84E7B] border-b border-[#F4E6EB]/60"
            >
              Contact
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); setIsTrackingOpen(true); }} 
              className="text-left py-2 text-[#4A3F43] border-b border-[#F4E6EB]/60"
            >
              Track Order
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); setIsAdminOpen(true); }} 
              className="text-left py-2 text-xs text-[#E84E7B]"
            >
              Admin & Baker Portal
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
