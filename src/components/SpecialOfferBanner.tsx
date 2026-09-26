import React, { useState, useEffect } from 'react';
import { Clock, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SpecialOfferBanner: React.FC = () => {
  const { applyPromoCode } = useShop();
  const [copied, setCopied] = useState(false);

  // Countdown timer state (e.g. 18 hours, 32 mins, 45 secs)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('CAKESPECIAL10');
    applyPromoCode('CAKESPECIAL10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleScrollToShop = () => {
    const el = document.getElementById('shop-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-[#FFF5F6] via-[#FFF0F2] to-[#FFE8EC] border-b border-[#F9DDE2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#F6D5DB] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF4B72]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Celebration Privilege</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#241F1E] font-bold leading-tight">
              Sweet Moments Deserve Something Special
            </h2>

            <p className="text-sm text-[#5A524D] font-normal leading-relaxed">
              Enjoy <strong className="text-[#FF4B72]">10% courtesy discount</strong> on your online celebration order across Lahore, Karachi & Islamabad. Applied instantly at checkout.
            </p>
          </div>

          {/* Right Action & Countdown Timer */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            
            {/* Countdown Blocks */}
            <div className="flex items-center gap-3 text-center">
              <div className="bg-[#FFF5F7] border border-[#FAD4DB] rounded-xl px-3 py-2 w-16">
                <span className="font-serif text-xl font-bold text-[#FF4B72] tabular-nums block">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#8C827A] font-medium">Hours</span>
              </div>
              <span className="text-lg font-serif text-[#FF4B72] font-bold">:</span>
              <div className="bg-[#FFF5F7] border border-[#FAD4DB] rounded-xl px-3 py-2 w-16">
                <span className="font-serif text-xl font-bold text-[#FF4B72] tabular-nums block">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#8C827A] font-medium">Mins</span>
              </div>
              <span className="text-lg font-serif text-[#FF4B72] font-bold">:</span>
              <div className="bg-[#FFF5F7] border border-[#FAD4DB] rounded-xl px-3 py-2 w-16">
                <span className="font-serif text-xl font-bold text-[#FF4B72] tabular-nums block">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#8C827A] font-medium">Secs</span>
              </div>
            </div>

            {/* Voucher & CTA */}
            <div className="flex flex-col gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleCopyCode}
                className="px-4 py-2.5 bg-[#FFF5F7] hover:bg-[#FFEAEF] border border-dashed border-[#FF4B72] rounded-xl flex items-center justify-between gap-3 text-xs font-mono transition-colors cursor-pointer"
                title="Click to copy and apply code"
              >
                <div className="text-left">
                  <span className="text-[9px] text-[#7A716C] uppercase tracking-widest block font-sans">Use Code:</span>
                  <span className="font-bold text-[#FF4B72] tracking-wider">CAKESPECIAL10</span>
                </div>
                <div className="text-[#FF4B72] flex items-center gap-1 text-[11px] font-sans font-medium">
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Applied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </div>
              </button>

              <button
                onClick={handleScrollToShop}
                className="px-6 py-3 bg-[#FF4B72] hover:bg-[#E03A60] text-white text-xs font-bold tracking-wider uppercase rounded-xl shadow-md shadow-[#FF4B72]/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
