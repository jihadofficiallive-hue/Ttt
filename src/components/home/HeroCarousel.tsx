import React, { useState, useEffect } from 'react';
import { Play, Plus, Check, Info, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroCarousel: React.FC = () => {
  const { movies, playMedia, openDetails, watchlist, toggleWatchlist } = useApp();
  const featuredMovies = movies.filter((m) => m.isFeatured || m.isTrending).slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-advance hero banner
  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  if (featuredMovies.length === 0) return null;

  const current = featuredMovies[currentIndex] || featuredMovies[0];
  const isSaved = watchlist.includes(current.id);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] overflow-hidden select-none bg-[#0D0F12]">
      {/* Backdrop Image with Smooth Transitions */}
      <div className="absolute inset-0">
        <img
          key={current.id}
          src={current.backdropUrl}
          alt={current.title}
          className="w-full h-full object-cover object-center filter brightness-90 transition-opacity duration-700 animate-fadeIn"
        />
        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-[#0D0F12]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0F12] via-[#0D0F12]/60 to-transparent w-full sm:w-3/4" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent" />
      </div>

      {/* Floating Carousel Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white items-center justify-center transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white items-center justify-center transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
      >
        <ChevronRight size={22} />
      </button>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-8 lg:p-12 max-w-2xl">
        {/* Category & Badge */}
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-red-500 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>{current.type === 'movie' ? 'Feature Film' : 'Exclusive Series'}</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-300 font-mono">JSPL Premiere</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-lg mb-1 sm:mb-2">
          {current.banglaTitle || current.title}
        </h1>
        {current.banglaTitle && (
          <p className="text-sm sm:text-base font-semibold text-slate-300 drop-shadow mb-2">
            {current.title}
          </p>
        )}

        {/* Unboxed Metadata (Zero-pill discipline) */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-300 mb-3 font-medium">
          <span className="text-amber-400 font-bold">★ {current.imdbRating}</span>
          <span className="text-slate-600">·</span>
          <span>{current.releaseYear}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-200">{current.rating}</span>
          <span className="text-slate-600">·</span>
          <span>{current.duration}</span>
          <span className="text-slate-600">·</span>
          <span className="text-red-400">{current.genres.join(', ')}</span>
        </div>

        {/* Synopsis snippet */}
        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 sm:line-clamp-3 mb-6 max-w-xl leading-relaxed">
          {current.description}
        </p>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => playMedia(current, false)}
            className="py-3 px-6 sm:px-8 rounded-xl bg-[#E50914] hover:bg-[#ff1e2d] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2.5 shadow-xl shadow-red-950/60 transition-all active:scale-95 cursor-pointer"
          >
            <Play size={18} className="fill-white" />
            <span>প্লে করুন / Play Now</span>
          </button>

          <button
            onClick={() => toggleWatchlist(current.id)}
            className={`py-3 px-4 rounded-xl border flex items-center gap-2 text-xs font-semibold backdrop-blur-md transition-all active:scale-95 cursor-pointer ${
              isSaved
                ? 'bg-white/20 border-white/40 text-white'
                : 'bg-white/10 hover:bg-white/20 border-white/10 text-white'
            }`}
          >
            {isSaved ? <Check size={16} className="text-emerald-400" /> : <Plus size={16} />}
            <span className="hidden sm:inline">{isSaved ? 'In Watchlist' : 'Watchlist'}</span>
          </button>

          <button
            onClick={() => openDetails(current)}
            className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Info size={16} />
            <span className="hidden sm:inline">Details</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            aria-label="Toggle mute"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white flex items-center justify-center ml-auto transition-all"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-1.5 mt-5">
          {featuredMovies.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-[#E50914]' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
