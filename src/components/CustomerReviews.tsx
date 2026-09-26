import React, { useState } from 'react';
import { MOCK_REVIEWS } from '../data/mockData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex(prev => (prev === 0 ? MOCK_REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex(prev => (prev === MOCK_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const review = MOCK_REVIEWS[currentIndex];

  return (
    <section className="py-20 sm:py-24 bg-[#FFF9FA] border-b border-[#FAD4DB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF4B72] block">
            Customer Love
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#241F1E] font-bold tracking-tight">
            Loved By Celebrations Across Pakistan
          </h2>
          <p className="text-sm text-[#6B635E] font-normal">
            Real stories from intimate birthdays, grand society weddings, and heartfelt anniversaries.
          </p>
        </div>

        {/* Featured Review Card (Carousel) */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 sm:p-12 border border-[#FAD4DB] shadow-sm relative">
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Left Avatar & City info */}
            <div className="flex flex-col items-center text-center shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFF0F3] border-2 border-[#FF4B72] flex items-center justify-center text-[#FF4B72] font-serif text-2xl font-bold shadow-sm">
                {review.author.charAt(0)}
              </div>
              <p className="font-serif text-lg font-bold text-[#241F1E] mt-3">
                {review.author}
              </p>
              <p className="text-xs text-[#7A716C] tracking-wide">
                {review.city}
              </p>
              <div className="mt-2 inline-block px-2.5 py-1 bg-[#FFF5F7] border border-[#FAD4DB] rounded-full text-[10px] text-[#FF4B72] font-bold">
                Verified Cake Order
              </div>
            </div>

            {/* Right Review Content */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              
              {/* Stars & Quote Icon */}
              <div className="flex items-center justify-center md:justify-between">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#FAD4DB] hidden md:block" />
              </div>

              {/* Quote Text */}
              <p className="font-serif text-lg sm:text-xl text-[#38332F] italic leading-relaxed">
                "{review.comment}"
              </p>

              {/* Cake Ordered Callout */}
              <div className="pt-3 border-t border-[#FAD4DB] text-xs text-[#7A716C]">
                <span>Ordered: </span>
                <strong className="text-[#241F1E] font-bold">{review.cakeOrdered}</strong>
                <span className="text-[#A89E96]"> · {review.date}</span>
              </div>

            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center md:justify-end gap-3 mt-8 md:mt-4 pt-4 md:pt-0 border-t md:border-t-0 border-[#FAD4DB]">
            <button
              onClick={prevReview}
              className="p-2.5 rounded-full border border-[#FAD4DB] hover:bg-[#FFF5F7] text-[#241F1E] hover:text-[#FF4B72] transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-serif font-bold text-[#7A716C] px-2 tabular-nums">
              {currentIndex + 1} / {MOCK_REVIEWS.length}
            </span>
            <button
              onClick={nextReview}
              className="p-2.5 rounded-full border border-[#FAD4DB] hover:bg-[#FFF5F7] text-[#241F1E] hover:text-[#FF4B72] transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
