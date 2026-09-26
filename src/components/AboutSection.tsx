import React from 'react';
import { ATELIER_IMAGE } from '../data/mockData';
import { Award, Heart, Sparkles, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF7F5] border-b border-[#ECE3DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Atelier Photo Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#ECE3DB] bg-white group">
              <img
                src={ATELIER_IMAGE}
                alt="Lumière master pâtissier delicately decorating a tiered wedding cake"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-5 rounded-xl shadow-xl border border-[#ECE3DB] max-w-xs">
              <p className="font-serif text-2xl font-semibold text-[#241F1E]">100% Artisanal</p>
              <p className="text-xs text-[#7A716C] mt-1 leading-relaxed">
                Every tier, crumb, and ganache swirl is handcrafted in small batches using classical French techniques.
              </p>
            </div>
          </div>

          {/* Right: Brand Story Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#9A7432]">
              <span className="w-6 h-[1px] bg-[#C5A059]" />
              <span>The Art of Haute Pâtisserie</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#241F1E] leading-tight">
              Where French Precision Meets Passionate Celebration
            </h2>

            <p className="text-sm sm:text-base text-[#5A524D] font-light leading-relaxed">
              Founded with the vision to bring authentic Parisian pâtisserie standards to Pakistan, Lumière represents a confluence of pure imported ingredients and architectural sugarcraft.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#9A7432] font-semibold text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Finest European Couvertures</span>
                </div>
                <p className="text-xs text-[#6B635E] leading-relaxed">
                  We use 70% Callebaut dark chocolate, Normandy butter, and Madagascar bourbon vanilla pods. Zero commercial shortening.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#9A7432] font-semibold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Bespoke Architectural Sugarcraft</span>
                </div>
                <p className="text-xs text-[#6B635E] leading-relaxed">
                  From delicate wafer-paper blooms to hand-painted 24k gold leaf filigrees, each custom cake is an individual work of art.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#9A7432] font-semibold text-xs uppercase tracking-wider">
                  <Heart className="w-4 h-4" />
                  <span>Fresh Morning Baking</span>
                </div>
                <p className="text-xs text-[#6B635E] leading-relaxed">
                  Cakes are never frozen. Our master bakers work from the early hours of dawn to deliver moist, pristine creations.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#9A7432] font-semibold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Chilled Transit Fleet</span>
                </div>
                <p className="text-xs text-[#6B635E] leading-relaxed">
                  Specialized climate-controlled vehicles ensure your tiers arrive in flawless condition, even in peak summer heat.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
