import React from 'react';
import { Star, Play } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TopTenRow: React.FC = () => {
  const { movies, openDetails, playMedia } = useApp();
  const top10List = [...movies]
    .filter((m) => m.isTop10)
    .sort((a, b) => (a.top10Rank || 99) - (b.top10Rank || 99))
    .slice(0, 10);

  if (top10List.length === 0) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-red-500 font-extrabold font-mono">TOP 10</span>
            <span>আজকের ট্রেন্ডিং (Trending on OTT Play)</span>
          </h2>
          <p className="text-[11px] text-slate-400">বাংলাদেশ ও দক্ষিণ এশিয়ায় সর্বাধিক দেখা সিনেমা ও নাটক</p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-3">
        {top10List.map((item, idx) => {
          const rank = idx + 1;
          return (
            <div
              key={item.id}
              onClick={() => openDetails(item)}
              className="flex-shrink-0 flex items-end group cursor-pointer relative"
            >
              {/* Massive stylized numeric typography */}
              <div
                className="font-black text-6xl sm:text-8xl leading-none select-none tracking-tighter -mr-4 sm:-mr-6 z-0 text-transparent transition-transform duration-300 group-hover:scale-105"
                style={{
                  WebkitTextStroke: '3px #2A313E',
                  filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.8))'
                }}
              >
                {rank}
              </div>

              {/* Poster Card */}
              <div className="relative z-10 w-28 sm:w-36 aspect-[2/3] rounded-xl overflow-hidden bg-[#161922] border border-white/5 group-hover:border-red-500/50 group-hover:shadow-xl group-hover:shadow-red-950/30 transition-all duration-300">
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Direct One-Click Play Button Overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playMedia(item, false);
                  }}
                  title="প্লে করুন (Watch Now)"
                  className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-lg shadow-red-950/80 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 cursor-pointer z-20"
                >
                  <Play size={16} className="fill-white translate-x-0.5" />
                </button>

                {/* Score Pill */}
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
                  <Star size={10} className="fill-amber-400" />
                  {item.imdbRating}
                </div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                  <p className="text-[11px] font-bold text-white leading-tight line-clamp-2">
                    {item.banglaTitle || item.title}
                  </p>
                  <p className="text-[9px] text-slate-300 mt-0.5">{item.genres[0]}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
