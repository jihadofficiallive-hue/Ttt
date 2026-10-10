import React from 'react';
import { Play, Clock, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContinueWatchingRow: React.FC = () => {
  const { continueWatching, movies, playMedia, openDetails } = useApp();

  if (continueWatching.length === 0) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-red-500" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            দেখা চালিয়ে যান (Continue Watching)
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          {continueWatching.length} active sessions
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2">
        {continueWatching.map((item) => {
          const media = movies.find((m) => m.id === item.mediaId);
          if (!media) return null;

          const progressPercent = Math.min(
            100,
            Math.max(5, (item.progressSeconds / (item.totalDurationSeconds || 1)) * 100)
          );
          const remainingSecs = Math.max(0, item.totalDurationSeconds - item.progressSeconds);
          const remainingMins = Math.ceil(remainingSecs / 60);

          return (
            <div
              key={item.mediaId}
              className="flex-shrink-0 w-64 sm:w-72 bg-[#161922] rounded-xl overflow-hidden border border-white/5 hover:border-red-500/40 transition-all duration-300 group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={media.backdropUrl}
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* Center Quick Resume Button */}
                <button
                  onClick={() => playMedia(media, false)}
                  aria-label={`Resume ${media.title}`}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-105 transition-all"
                >
                  <Play size={20} className="fill-white translate-x-0.5" />
                </button>

                {/* Remaining Time tag */}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-white/90">
                  {remainingMins > 0 ? `${remainingMins}m left` : 'Resume'}
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
                  <div
                    className="h-full bg-[#E50914] transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Title & Info */}
              <div className="p-3 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-red-400 transition-colors">
                    {media.banglaTitle || media.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">
                    {media.genres.join(', ')} · {item.lastWatchedAt}
                  </p>
                </div>
                <button
                  onClick={() => openDetails(media)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="More Details"
                >
                  <Info size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
