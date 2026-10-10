import React from 'react';
import {
  X,
  Play,
  Plus,
  Check,
  Download,
  Share2,
  Star,
  Film,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MovieDetailsModal: React.FC = () => {
  const {
    selectedDetailMedia,
    closeDetails,
    playMedia,
    watchlist,
    toggleWatchlist,
    downloads,
    addDownload,
    movies,
    openDetails,
    showToast
  } = useApp();

  if (!selectedDetailMedia) return null;

  const item = selectedDetailMedia;
  const isSaved = watchlist.includes(item.id);
  const isDownloaded = downloads.some((d) => d.mediaId === item.id);

  // Related movies in same or overlapping genres
  const related = movies
    .filter((m) => m.id !== item.id && m.genres.some((g) => item.genres.includes(g)))
    .slice(0, 4);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Copied streaming link for "${item.title}"!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#12151B] border border-white/10 sm:rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeDetails}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md flex items-center justify-center text-white transition-transform active:scale-95"
        >
          <X size={18} />
        </button>

        {/* Backdrop Banner with Vignette Gradient */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden flex-shrink-0 group">
          <img
            src={item.backdropUrl}
            alt={item.title}
            className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-[#12151B]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12151B]/80 via-transparent to-transparent" />

          {/* Central Direct Play Button on Backdrop */}
          <button
            onClick={() => {
              closeDetails();
              playMedia(item, false);
            }}
            title="ভিডিও চালু করুন (Play Now)"
            className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-2xl shadow-red-950/80 hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
          >
            <Play size={24} className="fill-white translate-x-0.5" />
          </button>

          {/* Quick Play Floating Button on backdrop */}
          <div className="absolute bottom-4 left-5 right-5 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-red-500 uppercase tracking-widest">
              <Film size={14} />
              <span>
                {item.subCategory === 'bangla_movie'
                  ? 'বাংলা সিনেমা (Bangla Movie)'
                  : item.subCategory === 'bangla_natok'
                  ? 'বাংলা নাটক / ওয়েব সিরিজ (Bangla Natok)'
                  : item.subCategory === 'hindi_movie'
                  ? 'হিন্দি মুভি (Hindi Movie)'
                  : item.type === 'movie'
                  ? 'Feature Film'
                  : 'Web Series'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
              {item.banglaTitle || item.title}
            </h1>
            {item.banglaTitle && (
              <p className="text-sm font-medium text-slate-300 drop-shadow">
                {item.title}
              </p>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 custom-scrollbar">
          {/* Metadata Row (Zero-pill discipline: unboxed clean typographic metadata) */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Star size={13} className="fill-amber-400" />
              {item.imdbRating}
            </span>
            <span className="text-slate-600">·</span>
            <span>{item.releaseYear}</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-200">{item.rating}</span>
            <span className="text-slate-600">·</span>
            <span>{item.duration}</span>
            <span className="text-slate-600">·</span>
            <span className="text-red-400 font-semibold">{item.genres.join(', ')}</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                closeDetails();
                playMedia(item, false);
              }}
              className="flex-1 min-w-[140px] py-3 px-5 rounded-xl bg-[#E50914] hover:bg-[#ff1e2d] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 transition-all active:scale-95 cursor-pointer"
            >
              <Play size={18} className="fill-white" />
              <span>প্লে করুন / Watch Now</span>
            </button>

            <button
              onClick={() => toggleWatchlist(item.id)}
              className={`py-3 px-4 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all active:scale-95 ${
                isSaved
                  ? 'bg-white/10 border-white/30 text-white'
                  : 'bg-[#1C202A] border-white/10 text-slate-300 hover:text-white hover:border-white/20'
              }`}
            >
              {isSaved ? <Check size={16} className="text-emerald-400" /> : <Plus size={16} />}
              <span>{isSaved ? 'In Watchlist' : 'Watchlist'}</span>
            </button>

            <button
              onClick={() => addDownload(item)}
              className={`py-3 px-4 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all active:scale-95 ${
                isDownloaded
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                  : 'bg-[#1C202A] border-white/10 text-slate-300 hover:text-white hover:border-white/20'
              }`}
            >
              {isDownloaded ? <Check size={16} /> : <Download size={16} />}
              <span>{isDownloaded ? 'Downloaded' : 'Download'}</span>
            </button>

            <button
              onClick={handleShare}
              aria-label="Share title"
              className="p-3 rounded-xl bg-[#1C202A] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all active:scale-95"
            >
              <Share2 size={16} />
            </button>
          </div>

          {/* Synopsis */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">Synopsis</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              {item.description}
            </p>
          </div>

          {/* Tags & Formats */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-500">Audio / Video Formats:</span>
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                {item.tags.map((tag, idx) => (
                  <span key={tag} className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] text-slate-200">{tag}</span>
                    {idx < item.tags!.length - 1 && <span className="text-slate-600">·</span>}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cast & Crew */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold">Cast & Characters</h3>
              <span className="text-xs text-slate-500">Director: {item.director}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {item.cast.map((actor) => (
                <div
                  key={actor.id}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-[#161A22] border border-white/5"
                >
                  <img
                    src={actor.avatar}
                    alt={actor.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{actor.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{actor.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Recommendations */}
          {related.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-red-500" />
                <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  More Like This
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => openDetails(rel)}
                    className="group cursor-pointer rounded-xl overflow-hidden bg-[#161A22] border border-white/5 hover:border-red-500/50 transition-all"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={rel.posterUrl}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
                        <Star size={10} className="fill-amber-400" />
                        {rel.imdbRating}
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-semibold text-white truncate">{rel.title}</p>
                      <p className="text-[10px] text-slate-400">{rel.releaseYear} · {rel.genres[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Parent Company attribution */}
          <div className="pt-3 border-t border-white/5 text-center text-[11px] text-slate-500">
            OTT Play · Licensed & Distributed by JS Private Limited
          </div>
        </div>
      </div>
    </div>
  );
};
