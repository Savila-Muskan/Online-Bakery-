import React, { useState } from 'react';
import { Instagram, Heart, Sparkles, X, ArrowRight, Eye, Camera, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { GalleryItem } from '../types';

export const InstagramGallery: React.FC = () => {
  const { galleryItems, setIsCustomCakeOpen } = useShop();
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(galleryItems.map(g => g.category || 'Special')))];

  const filteredItems = selectedTag === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedTag);

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-white border-b border-[#FAD4DB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase text-[#FF4B72]">
            <Instagram className="w-3.5 h-3.5" />
            <span>@cakeshop.pk • Live Bakery Gallery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#241F1E] font-bold tracking-tight">
            Follow Our Sweet Moments & Gallery
          </h2>
          <p className="text-sm text-[#6B635E] font-normal">
            Freshly decorated cakes, behind-the-scenes creations, and custom designs baked in our Pakistani ateliers.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedTag(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedTag === cat
                  ? 'bg-[#FF4B72] text-white shadow-md shadow-[#FF4B72]/20'
                  : 'bg-[#FFF0F3] text-[#52454A] hover:bg-[#FFE3E9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FAF7F5] border border-[#FAD4DB] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Tag pill top left */}
              {item.category && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-[#FF4B72] shadow-sm flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" />
                    <span>{item.category}</span>
                  </span>
                </div>
              )}

              {/* Hover Dark Overlay with Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <div className="space-y-1">
                  <h4 className="font-serif text-sm font-bold text-white line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-stone-200 line-clamp-2 font-normal">
                    {item.caption}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/20 text-xs">
                    <span className="flex items-center gap-1 text-[#FF85A2]">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span className="text-[11px] font-bold tabular-nums">{item.likes || 420}</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold text-white tracking-wider flex items-center gap-1">
                      <span>View</span>
                      <Eye className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Instagram CTA */}
        <div className="text-center mt-12 pt-8 border-t border-[#FAD4DB]">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF4B72] hover:text-[#E03A60] transition-colors"
          >
            <Camera className="w-4 h-4" />
            <span>Follow Us on Instagram @cakeshop.pk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLightbox(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#FAD4DB]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[60vh] bg-stone-900 flex items-center justify-center overflow-hidden">
              <img
                src={activeLightbox.url}
                alt={activeLightbox.title}
                className="w-full max-h-[60vh] object-contain"
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {activeLightbox.category && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF4B72] block mb-1">
                      {activeLightbox.category}
                    </span>
                  )}
                  <h3 className="font-serif text-2xl font-bold text-[#241F1E]">
                    {activeLightbox.title}
                  </h3>
                  <p className="text-xs text-[#7A6D72] mt-1 leading-relaxed">
                    {activeLightbox.caption}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 text-rose-500 bg-[#FFF0F3] px-3 py-1.5 rounded-full text-xs font-bold">
                  <Heart className="w-4 h-4 fill-current" />
                  <span>{activeLightbox.likes || 520}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#FAD4DB]">
                <span className="text-[11px] text-[#7A6D72]">
                  Freshly handcrafted at CakeShop Atelier Pakistan
                </span>

                <button
                  onClick={() => {
                    setActiveLightbox(null);
                    setIsCustomCakeOpen(true);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#FF4B72] hover:bg-[#E03A60] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#FF4B72]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Order / Customize This Design</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
