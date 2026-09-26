import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Cake, Sparkles } from 'lucide-react';
import { HERO_PINK_ROSE_CAKE, CHOCOLATE_CAKE_IMAGE, RED_VELVET_IMAGE } from '../data/mockData';
import { useShop } from '../context/ShopContext';

export const Hero: React.FC = () => {
  const { setIsCustomCakeOpen } = useShop();

  // Slider slides
  const slides = [
    {
      titlePrefix: "Delicious Cakes",
      titleSuffix: "for Every Occasion",
      desc: "Handmade with love using the finest ingredients. Order online and get your favorite cakes delivered to your doorstep.",
      image: HERO_PINK_ROSE_CAKE,
      alt: "Pastel pink strawberry cream celebration cake with fresh roses on a ceramic stand"
    },
    {
      titlePrefix: "Belgian Chocolate",
      titleSuffix: "Delight & Truffles",
      desc: "Rich dark cocoa layers with molten ganache rosettes and wafer sticks, freshly baked for your grandest moments.",
      image: CHOCOLATE_CAKE_IMAGE,
      alt: "Rich chocolate celebration cake"
    },
    {
      titlePrefix: "Romantic Velvet",
      titleSuffix: "Cream Cheese Gateau",
      desc: "Tender crimson sponge with whipped Philadelphia frosting, designed for birthdays and sweet anniversaries.",
      image: RED_VELVET_IMAGE,
      alt: "Red velvet cream cheese cake"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleScrollToShop = () => {
    const el = document.getElementById('shop-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeSlide = slides[currentSlide];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-r from-[#FFF5F8] via-[#FFF9FB] to-[#FFF0F4] py-12 lg:py-20 border-b border-[#FCE6EE]">
      
      {/* Slider Left Arrow */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-[#55464B] shadow-md flex items-center justify-center transition-all cursor-pointer border border-[#F4E6EB]"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Slider Right Arrow */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-[#55464B] shadow-md flex items-center justify-center transition-all cursor-pointer border border-[#F4E6EB]"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & Buttons */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left pl-0 lg:pl-6">
            
            {/* Main Headline matching exactly: Delicious Cakes for Every Occasion */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2B2225] leading-[1.15]">
              {activeSlide.titlePrefix} <br className="hidden sm:inline" />
              <span className="text-[#E84E7B] font-serif italic">
                {activeSlide.titleSuffix}
              </span>
            </h1>

            {/* Description matching exact text */}
            <p className="text-base sm:text-lg text-[#615358] font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
              {activeSlide.desc}
            </p>

            {/* Action Buttons matching the reference image */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              
              {/* SHOP NOW button (solid pink) */}
              <button
                onClick={handleScrollToShop}
                className="px-7 py-3 bg-[#E84E7B] hover:bg-[#D93C6B] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                SHOP NOW
              </button>

              {/* CUSTOM CAKE button (white outline with cake icon) */}
              <button
                onClick={() => setIsCustomCakeOpen(true)}
                className="px-6 py-3 bg-white hover:bg-[#FFF5F8] text-[#2B2225] border border-[#E0D0D5] hover:border-[#E84E7B] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Cake className="w-4 h-4 text-[#E84E7B]" />
                <span>CUSTOM CAKE</span>
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlide === i ? 'w-7 bg-[#E84E7B]' : 'w-2 bg-[#F3CAD5] hover:bg-[#E84E7B]/50'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Hero Cake Image on Pedestal */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Soft pink ambient halo */}
            <div className="absolute inset-0 bg-[#FCE6EE]/50 rounded-full blur-3xl -z-10" />

            {/* Cake Showcase Image */}
            <div className="relative max-w-md sm:max-w-lg w-full transition-all duration-500">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-white">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.alt}
                  className="w-full h-auto aspect-[4/3] sm:aspect-[4/3] object-cover object-center transform hover:scale-103 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Subtle pink ribbon floating tag */}
              <div className="absolute -bottom-3 -left-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-[#FAD7E1] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E84E7B] animate-pulse" />
                <span className="text-xs font-semibold text-[#2B2225]">100% Freshly Baked Today</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
