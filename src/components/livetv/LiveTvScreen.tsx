import React, { useState } from 'react';
import { Radio, Play, Users, Clock, Tv } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LiveChannel } from '../../types';

export const LiveTvScreen: React.FC = () => {
  const { channels, playMedia } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [selectedChannelForEpg, setSelectedChannelForEpg] = useState<LiveChannel | null>(null);

  const filterTabs = [
    { id: 'All', label: 'সব চ্যানেল (All)' },
    { id: 'bd_all', label: '🇧🇩 বাংলাদেশি চ্যানেল (BD TV)' },
    { id: 'Sports', label: 'খেলাধুলা (Sports)' },
    { id: 'News', label: 'তাজা সংবাদ (News)' },
    { id: 'Entertainment', label: 'নাটক ও বিনোদন (Entertainment)' }
  ];

  const filteredChannels = channels.filter((ch) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'bd_all') return ch.country === 'Bangladesh';
    return ch.category.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto pb-24">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-500 font-bold text-xs uppercase tracking-wider">
              <Radio size={13} className="animate-pulse" />
              <span>লাইভ সম্প্রচার</span>
            </span>
            <span className="text-xs text-slate-400">লো-লেটেন্সি এইচএলএস (HLS) স্ট্রিমিং</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            বাংলাদেশি ও আন্তর্জাতিক ২৪/৭ লাইভ টিভি
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            টি স্পোর্টসে লাইভ ক্রিকেট, সময় ও যমুনা টিভিতে তাজা খবর, চ্যানেল আই ও এনটিভির মেগা ধারাবাহিক নাটক সরাসরি দেখুন।
          </p>
        </div>

        {/* Global Channel Stats */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-[#161922] border border-white/5 text-right">
            <span className="block text-[10px] text-slate-400 uppercase font-semibold">লাইভ ব্রডকাস্ট</span>
            <span className="font-mono text-xs text-emerald-400 font-bold">HD & 60 FPS</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-[#161922] border border-white/5 text-right">
            <span className="block text-[10px] text-slate-400 uppercase font-semibold">সক্রিয় চ্যানেল</span>
            <span className="font-mono text-xs text-white font-bold">{channels.length}টি অনলাইন</span>
          </div>
        </div>
      </div>

      {/* Category Segmented Controls */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === tab.id
                ? 'bg-[#E50914] text-white shadow-lg shadow-red-950/40'
                : 'bg-[#161922] text-slate-300 hover:text-white hover:bg-[#1E2330] border border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Channel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredChannels.map((channel) => (
          <div
            key={channel.id}
            className="rounded-2xl bg-[#151821] border border-white/5 hover:border-red-500/50 hover:bg-[#191D28] transition-all duration-300 p-4 flex flex-col justify-between group shadow-lg"
          >
            <div>
              {/* Channel Top Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/50 border border-white/10 flex-shrink-0 relative">
                    <img
                      src={channel.logoUrl}
                      alt={channel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                        {channel.banglaName || channel.name}
                      </h3>
                      {channel.country === 'Bangladesh' && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-semibold">
                          BD
                        </span>
                      )}
                    </div>
                    {/* Zero-pill unboxed metadata */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <span>{channel.name}</span>
                      <span>·</span>
                      <span className="font-mono">{channel.resolution}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600/20 text-red-500 text-[10px] font-bold tracking-wider">
                  <Radio size={11} className="animate-pulse" />
                  LIVE
                </div>
              </div>

              {/* Ongoing Program Preview */}
              <div className="p-3 rounded-xl bg-[#0F1218] border border-white/5 space-y-1.5 mb-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-red-400 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    এখন সম্প্রচারিত হচ্ছে
                  </span>
                  <span className="text-slate-300 font-mono text-[10px]">{channel.currentProgram.timeSlot}</span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-1">
                  {channel.currentProgram.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {channel.currentProgram.description}
                </p>

                {/* Program progress bar */}
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-red-500"
                    style={{ width: `${channel.currentProgram.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Next Up Sneak Peek */}
              {channel.upcomingPrograms.length > 0 && (
                <div className="flex items-center gap-2 text-[11px] text-slate-400 px-1 mb-2 truncate">
                  <Clock size={12} className="flex-shrink-0 text-slate-500" />
                  <span className="text-slate-500">পরবর্তী:</span>
                  <span className="text-slate-300 truncate">
                    {channel.upcomingPrograms[0].title} ({channel.upcomingPrograms[0].timeSlot})
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
              <span className="flex items-center gap-1 text-[11px] text-slate-400">
                <Users size={13} />
                <span>{(channel.viewersCount / 1000).toFixed(1)}k দর্শক দেখছেন</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedChannelForEpg(channel)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  সময়সূচী
                </button>
                <button
                  onClick={() => playMedia(channel, true)}
                  className="py-1.5 px-3.5 rounded-lg bg-[#E50914] hover:bg-[#ff1e2d] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-950/40 transition-all active:scale-95 cursor-pointer"
                >
                  <Play size={13} className="fill-white" />
                  <span>লাইভ দেখুন</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EPG Schedule Modal */}
      {selectedChannelForEpg && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#161922] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedChannelForEpg.logoUrl}
                  alt={selectedChannelForEpg.name}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {selectedChannelForEpg.banglaName || selectedChannelForEpg.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    ইলেক্ট্রনিক প্রোগ্রাম গাইড (EPG) · {selectedChannelForEpg.category}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedChannelForEpg(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 pt-2 max-h-80 overflow-y-auto custom-scrollbar">
              {/* Current */}
              <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px]">
                    লাইভ অন এয়ার
                  </span>
                  <span className="font-mono text-xs text-red-400">
                    {selectedChannelForEpg.currentProgram.timeSlot}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white">
                  {selectedChannelForEpg.currentProgram.title}
                </h4>
                <p className="text-[11px] text-slate-300 mt-1">
                  {selectedChannelForEpg.currentProgram.description}
                </p>
              </div>

              {/* Upcoming */}
              {selectedChannelForEpg.upcomingPrograms.map((prog) => (
                <div
                  key={prog.id}
                  className="p-3 rounded-xl bg-[#11141B] border border-white/5 space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold uppercase text-[10px]">পরবর্তী অনুষ্ঠান</span>
                    <span className="font-mono text-[11px] text-slate-400">{prog.timeSlot}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{prog.title}</h4>
                  <p className="text-[11px] text-slate-400">{prog.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  const ch = selectedChannelForEpg;
                  setSelectedChannelForEpg(null);
                  playMedia(ch, true);
                }}
                className="w-full py-2.5 rounded-xl bg-[#E50914] hover:bg-[#ff1e2d] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play size={14} className="fill-white" />
                <span>এই চ্যানেলটি এখনই লাইভ চালু করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
