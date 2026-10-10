import React from 'react';
import { Radio, ChevronRight, Play } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LiveTvPreviewRow: React.FC = () => {
  const { channels, playMedia, setActiveTab } = useApp();

  if (channels.length === 0) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-600/20 text-red-500 font-bold text-xs uppercase tracking-wider">
            <Radio size={12} className="animate-pulse" />
            <span>লাইভ টিভি</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            বাংলাদেশি ২৪/৭ লাইভ টিভি চ্যানেল
          </h2>
        </div>

        <button
          onClick={() => setActiveTab('livetv')}
          className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>সব চ্যানেল দেখুন</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {channels.slice(0, 3).map((ch) => (
          <div
            key={ch.id}
            onClick={() => playMedia(ch, true)}
            className="p-3 sm:p-4 rounded-xl bg-[#161922] border border-white/5 hover:border-red-500/40 hover:bg-[#1A1E29] transition-all cursor-pointer group flex items-center justify-between gap-3 shadow-md"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/40 flex-shrink-0">
                <img src={ch.logoUrl} alt={ch.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white truncate group-hover:text-red-400 transition-colors">
                    {ch.banglaName || ch.name}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                </div>
                <p className="text-[11px] text-slate-300 truncate font-medium">
                  {ch.currentProgram.title}
                </p>
                <p className="text-[10px] text-slate-500">
                  {ch.name} · {(ch.viewersCount / 1000).toFixed(0)}k দর্শক
                </p>
              </div>
            </div>

            <button
              aria-label={`Watch ${ch.name}`}
              className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-[#E50914] text-white flex items-center justify-center transition-all flex-shrink-0 shadow-md cursor-pointer"
            >
              <Play size={14} className="fill-white translate-x-0.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
