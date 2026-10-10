import React, { useState } from 'react';
import { HeroCarousel } from './HeroCarousel';
import { ContinueWatchingRow } from './ContinueWatchingRow';
import { TopTenRow } from './TopTenRow';
import { CategoryRow } from './CategoryRow';
import { LiveTvPreviewRow } from './LiveTvPreviewRow';
import { useApp } from '../../context/AppContext';

export const HomeScreen: React.FC = () => {
  const { movies } = useApp();
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  const filterTags = [
    { id: 'All', label: 'সব (All)' },
    { id: 'bangla_movie', label: 'বাংলা সিনেমা (Bangla Movies)' },
    { id: 'bangla_natok', label: 'বাংলা নাটক ও সিরিজ (Bangla Natok)' },
    { id: 'hindi_movie', label: 'হিন্দি মুভি (Hindi Movies)' },
    { id: 'Action', label: 'অ্যাকশন (Action)' },
    { id: 'Comedy', label: 'কমেডি (Comedy)' },
    { id: 'Thriller', label: 'থ্রিলার ও রহস্য' }
  ];

  // Specific content categorizations
  const banglaMovies = movies.filter((m) => m.subCategory === 'bangla_movie');
  const banglaNatok = movies.filter((m) => m.subCategory === 'bangla_natok');
  const hindiMovies = movies.filter((m) => m.subCategory === 'hindi_movie');
  const actionMovies = movies.filter((m) => m.genres.includes('Action'));
  const comedyMovies = movies.filter((m) => m.genres.includes('Comedy'));

  // Active filter query
  const filteredList = movies.filter((m) => {
    if (selectedCategoryFilter === 'All') return true;
    if (selectedCategoryFilter === 'bangla_movie') return m.subCategory === 'bangla_movie';
    if (selectedCategoryFilter === 'bangla_natok') return m.subCategory === 'bangla_natok';
    if (selectedCategoryFilter === 'hindi_movie') return m.subCategory === 'hindi_movie';
    return m.genres.some((g) => g.toLowerCase() === selectedCategoryFilter.toLowerCase());
  });

  return (
    <div className="pb-24 space-y-2 select-none">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Quick Category Filter Segmented Tabs (Bilingual Bangla / English) */}
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {filterTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setSelectedCategoryFilter(tag.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategoryFilter === tag.id
                ? 'bg-[#E50914] text-white shadow-md shadow-red-950/40'
                : 'bg-[#181C26] text-slate-300 hover:text-white hover:bg-[#202534] border border-white/5'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* If user filtered by a specific category, show instant curated grid */}
      {selectedCategoryFilter !== 'All' ? (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-white">
              {filterTags.find((t) => t.id === selectedCategoryFilter)?.label} ({filteredList.length}টি কনটেন্ট)
            </h2>
          </div>
          <CategoryRow title="" items={filteredList} />
        </div>
      ) : (
        <>
          {/* Continue Watching Row */}
          <ContinueWatchingRow />

          {/* Top 10 Movies Ranked Row */}
          <TopTenRow />

          {/* 24/7 Bangladeshi Live TV Section Preview */}
          <LiveTvPreviewRow />

          {/* 1. Bangla Movies (বাংলা সিনেমা ও ব্লকবাস্টার) */}
          <CategoryRow
            title="বাংলা সিনেমা ও মেগা ব্লকবাস্টার"
            subtitle="তুফান, হাওয়া, সুরঙ্গ, প্রিয়তমা সহ শীর্ষ ঢাকাই সিনেমা"
            items={banglaMovies}
          />

          {/* 2. Bangla Natok & Web Series (বাংলা নাটক ও ওয়েব সিরিজ) */}
          <CategoryRow
            title="জনপ্রিয় বাংলা নাটক ও ওয়েব সিরিজ"
            subtitle="ব্যাচেলর পয়েন্ট, কারাগার, মহানগর, ফিমেল ৪ ও এক্সক্লুসিভ নাটক"
            items={banglaNatok}
          />

          {/* 3. Hindi Movies (হিন্দি সুপারহিট সিনেমা) */}
          <CategoryRow
            title="হিন্দি সুপারহিট মুভি ও অ্যাকশন"
            subtitle="জওয়ান, ১২থ ফেইল, এনিম্যাল, স্ত্রী ২ এবং বলিউড ব্লকবাস্টার"
            items={hindiMovies}
          />

          {/* 4. Action & Thriller Blockbusters */}
          <CategoryRow
            title="অ্যাকশন ও থ্রিলার ধামাকা"
            subtitle="উত্তেজনাপূর্ণ মারপিট ও রুদ্ধশ্বাস গল্প"
            items={actionMovies}
          />

          {/* 5. Comedy & Fun */}
          <CategoryRow
            title="হাসির নাটক ও কমেডি স্পেশাল"
            subtitle="পরিবার নিয়ে উপভোগ করার মতো সেরা বিনোদন"
            items={comedyMovies}
          />
        </>
      )}

      {/* Parent Company Attribution Footer */}
      <footer className="pt-10 pb-6 text-center text-xs text-slate-500 border-t border-white/5 mx-4 sm:mx-8">
        <p className="font-semibold text-slate-400">
          OTT Play · Proprietary Streaming Network of JS Private Limited
        </p>
        <p className="text-[11px] text-slate-600 mt-1">
          বাংলাদেশি লাইভ টিভি, বাংলা নাটক, বাংলা সিনেমা এবং হিন্দি মুভি স্ট্রিমিং প্ল্যাটফর্ম
        </p>
      </footer>
    </div>
  );
};
