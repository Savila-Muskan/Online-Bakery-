import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustFeatures } from './components/TrustFeatures';
import { CategorySection } from './components/CategorySection';
import { BestSellers } from './components/BestSellers';
import { CustomCakeSection } from './components/CustomCakeSection';
import { OccasionsSection } from './components/OccasionsSection';
import { NewArrivals } from './components/NewArrivals';
import { SpecialOfferBanner } from './components/SpecialOfferBanner';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramGallery } from './components/InstagramGallery';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { MessageCircle } from 'lucide-react';

function AppContent() {
  const { currentPath } = useShop();

  // If path is /admin or #admin, show the dedicated Admin & Order Tracking Dashboard
  if (currentPath === '/admin') {
    return <AdminDashboard />;
  }

  // Otherwise, show the public customer website (no admin shown on front)
  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#241F1E] flex flex-col font-sans selection:bg-[#F4D7DB] selection:text-[#53262C]">
      
      {/* Sticky Header */}
      <Header />

      {/* Main Storefront Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Trust Features */}
        <TrustFeatures />

        {/* 3. Circular Shop by Category */}
        <CategorySection />

        {/* 4. Best Sellers & Signature Product Grid */}
        <BestSellers />

        {/* 5. Custom Cake Atelier Section */}
        <CustomCakeSection />

        {/* 6. Occasions Section */}
        <OccasionsSection />

        {/* 7. New Arrivals & Limited Editions */}
        <NewArrivals />

        {/* 8. Special Promotional Banner */}
        <SpecialOfferBanner />

        {/* 9. Verified Customer Reviews & Testimonials */}
        <CustomerReviews />

        {/* 10. Instagram & Social Gallery */}
        <InstagramGallery />

        {/* 11. About Us Brand Story */}
        <AboutSection />

        {/* 12. Contact & Boutiques in Pakistan */}
        <ContactSection />
      </main>

      {/* Multi-column Footer */}
      <Footer />

      {/* Floating WhatsApp Concierge Button (Pakistan Local Integration) */}
      <a
        href="https://wa.me/923493438060?text=Hello%20CakeShop!%20I%20would%20like%20to%20order%20a%20fresh%20celebration%20cake."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-300 hover:scale-105 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold uppercase tracking-wider pr-1">
          WhatsApp Concierge
        </span>
      </a>

      {/* Customer Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <OrderTrackingModal />
      <SearchModal />
      <WishlistDrawer />

    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
