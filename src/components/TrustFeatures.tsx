import React from 'react';
import { Bike, Award, Sparkles, ShieldCheck } from 'lucide-react';

export const TrustFeatures: React.FC = () => {
  // Matching the four feature cards under hero exactly as in reference:
  // Fast Delivery, Best Quality, 100% Fresh, Secure Payments
  const features = [
    {
      icon: Bike,
      title: 'Fast Delivery',
      desc: 'On time, every time'
    },
    {
      icon: Award,
      title: 'Best Quality',
      desc: 'We use premium ingredients'
    },
    {
      icon: Sparkles,
      title: '100% Fresh',
      desc: 'Baked fresh for you'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      desc: '100% secure checkout'
    }
  ];

  return (
    <section className="bg-white border-b border-[#F4E6EB] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center gap-3.5 p-2 transition-all hover:translate-y-[-2px]"
              >
                {/* Minimal line icon in pink */}
                <div className="w-11 h-11 rounded-full bg-[#FFF2F6] text-[#E84E7B] flex items-center justify-center shrink-0 border border-[#FAD7E1]">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#2B2225] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#7A6D72] leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
