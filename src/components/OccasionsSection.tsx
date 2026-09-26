import React from 'react';
import { OCCASIONS_LIST } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { CakeOccasion } from '../types';
import { ArrowUpRight } from 'lucide-react';

export const OccasionsSection: React.FC = () => {
  const { setActiveOccasionFilter, setActiveCategoryFilter } = useShop();

  const handleOccasionClick = (occ: CakeOccasion) => {
    setActiveCategoryFilter(null);
    setActiveOccasionFilter(occ);
    const el = document.getElementById('shop-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="occasions" className="py-20 sm:py-24 bg-[#FAF7F5] border-b border-[#ECE3DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#9A7432] block mb-1">
              Celebration Curation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#241F1E] font-normal tracking-tight">
              Celebrate Life’s Grandest Milestones
            </h2>
            <p className="text-sm text-[#6B635E] font-light mt-1 max-w-xl">
              From intimate anniversaries to 10-tier wedding affairs, each cake is tailored to evoke magic and uncompromised delight.
            </p>
          </div>

          <a
            href="#shop-catalog"
            className="text-xs font-semibold tracking-wider uppercase text-[#9A7432] hover:text-[#7A5B22] flex items-center gap-1.5 transition-colors self-start md:self-end"
          >
            <span>View All Curations</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Occasions Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {OCCASIONS_LIST.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOccasionClick(item.id)}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-[#ECE3DB]"
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Sophisticated Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:from-black/90 transition-colors" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#C5A059] group-hover:text-black transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#E6D5B8] font-semibold block">
                    Collection
                  </span>
                  <h3 className="font-serif text-2xl font-medium tracking-wide text-white group-hover:text-[#F4D7DB] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#D8CBC4] font-light line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
