import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Plus, Check, Play } from 'lucide-react';
import { MediaItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface CategoryRowProps {
  title: string;
  subtitle?: string;
  items: MediaItem[];
}

export const CategoryRow: React.FC<CategoryRowProps> = ({ title, subtitle, items }) => {
  const { openDetails, playMedia, watchlist, toggleWatchlist } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -320 : 320;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 relative group/row">
      <div className="flex items-end justify-between mb-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">{title}</h2>
          {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        {/* Scroll Controls */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Items Scroll Container */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2"
      >
        {items.map((item) => {
          const isSaved = watchlist.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => openDetails(item)}
              className="flex-shrink-0 w-32 sm:w-40 bg-[#161922] rounded-xl overflow-hidden border border-white/5 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-950/20 transition-all duration-300 group cursor-pointer relative"
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Score badge */}
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
                  <Star size={10} className="fill-amber-400" />
                  {item.imdbRating}
                </div>

                {/* Direct One-Click Play Button Overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playMedia(item, false);
                  }}
                  title="প্লে করুন (Watch Now)"
                  className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-lg shadow-red-950/80 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <Play size={16} className="fill-white translate-x-0.5" />
                </button>

                {/* Quick Watchlist Bookmark Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWatchlist(item.id);
                  }}
                  aria-label={isSaved ? 'In Watchlist' : 'Add to Watchlist'}
                  className={`absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isSaved
                      ? 'bg-red-600 text-white'
                      : 'bg-black/60 text-white/80 hover:bg-black/90 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {isSaved ? <Check size={13} /> : <Plus size={13} />}
                </button>
              </div>

              {/* Card Footer Info */}
              <div className="p-2.5">
                <h4 className="text-xs font-semibold text-white truncate group-hover:text-red-400 transition-colors">
                  {item.banglaTitle || item.title}
                </h4>
                {item.banglaTitle && (
                  <p className="text-[10px] text-slate-400 truncate -mt-0.5">
                    {item.title}
                  </p>
                )}
                {/* Zero-pill unboxed metadata */}
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5 truncate">
                  <span>{item.releaseYear}</span>
                  <span>·</span>
                  <span>{item.genres[0]}</span>
                  <span>·</span>
                  <span>{item.rating}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
