import React, { useState, useMemo } from 'react';
import { Search, Star, X, Play } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SearchScreen: React.FC = () => {
  const { movies, channels, openDetails, playMedia } = useApp();

  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedSort, setSelectedSort] = useState<'trending' | 'rating' | 'newest'>('trending');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'তুফান',
    'ব্যাচেলর পয়েন্ট',
    'টি স্পোর্টস',
    'জওয়ান',
    'সময় টিভি',
    'কারাগার'
  ]);

  const genres = ['All', 'Action', 'Comedy', 'Crime', 'Drama', 'Mystery', 'Romance', 'Thriller'];
  const languages = ['All', 'Bengali', 'Hindi', 'English'];

  const handleQuerySubmit = (term: string) => {
    setQuery(term);
    if (term && !recentSearches.includes(term)) {
      setRecentSearches((prev) => [term, ...prev.slice(0, 5)]);
    }
  };

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();

    // 1. Initial collection
    let results: any[] = [...movies];

    if (selectedType === 'bangla_movie') {
      results = results.filter((m: any) => m.subCategory === 'bangla_movie');
    } else if (selectedType === 'bangla_natok') {
      results = results.filter((m: any) => m.subCategory === 'bangla_natok');
    } else if (selectedType === 'hindi_movie') {
      results = results.filter((m: any) => m.subCategory === 'hindi_movie');
    } else if (selectedType === 'live_tv') {
      results = channels.map((c) => ({ ...c, isChannel: true }));
    } else {
      // 'all' includes channels if searched
      if (q) {
        const matchingChannels = channels
          .filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              (c.banglaName && c.banglaName.toLowerCase().includes(q)) ||
              c.category.toLowerCase().includes(q) ||
              c.currentProgram.title.toLowerCase().includes(q)
          )
          .map((c) => ({ ...c, isChannel: true }));
        results = [...results, ...matchingChannels];
      }
    }

    if (q) {
      results = results.filter((item: any) => {
        if (item.isChannel) {
          return (
            item.name.toLowerCase().includes(q) ||
            (item.banglaName && item.banglaName.toLowerCase().includes(q)) ||
            item.category.toLowerCase().includes(q) ||
            item.currentProgram.title.toLowerCase().includes(q)
          );
        }
        return (
          item.title.toLowerCase().includes(q) ||
          (item.banglaTitle && item.banglaTitle.toLowerCase().includes(q)) ||
          item.description.toLowerCase().includes(q) ||
          item.director.toLowerCase().includes(q) ||
          item.genres.some((g: string) => g.toLowerCase().includes(q)) ||
          item.cast.some((c: any) => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q))
        );
      });
    }

    // Genre filter
    if (selectedGenre !== 'All') {
      results = results.filter(
        (m: any) => m.isChannel || m.genres?.some((g: string) => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // Language filter
    if (selectedLanguage !== 'All') {
      results = results.filter(
        (m: any) =>
          m.isChannel ||
          m.languages?.some((l: string) => l.toLowerCase().includes(selectedLanguage.toLowerCase()))
      );
    }

    // Sort
    results.sort((a: any, b: any) => {
      if (a.isChannel || b.isChannel) return 0;
      if (selectedSort === 'rating') return b.imdbRating - a.imdbRating;
      if (selectedSort === 'newest') return b.releaseYear - a.releaseYear;
      return (b.imdbRating + (b.isTrending ? 2 : 0)) - (a.imdbRating + (a.isTrending ? 2 : 0));
    });

    return results;
  }, [movies, channels, query, selectedType, selectedGenre, selectedLanguage, selectedSort]);

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto pb-24">
      {/* Header Search Bar */}
      <div className="space-y-4">
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="বাংলা মুভি, নাটক, হিন্দি সিনেমা, টিভি চ্যানেল বা অভিনেতার নাম লিখুন..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-[#161922] border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-red-500 shadow-xl transition-all"
          />
          <Search size={18} className="absolute left-4 top-4 text-slate-400" />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-3.5 p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Recent Search Queries */}
        {!query && recentSearches.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-semibold">জনপ্রিয় অনুসন্ধান:</span>
            {recentSearches.map((term) => (
              <button
                key={term}
                onClick={() => handleQuerySubmit(term)}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 text-xs transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {/* Multi-Facet Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/5">
          {/* Content Type Filter */}
          <div className="flex items-center p-1 bg-[#161922] rounded-xl border border-white/5 text-xs overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'all', label: 'সব (All)' },
                { id: 'bangla_movie', label: 'বাংলা মুভি' },
                { id: 'bangla_natok', label: 'বাংলা নাটক' },
                { id: 'hindi_movie', label: 'হিন্দি মুভি' },
                { id: 'live_tv', label: 'লাইভ টিভি' }
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === t.id
                    ? 'bg-[#E50914] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Genre Dropdown */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#161922] border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-red-500"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                ধরন: {g}
              </option>
            ))}
          </select>

          {/* Language Dropdown */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#161922] border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-red-500"
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                ভাষা: {l}
              </option>
            ))}
          </select>

          {/* Sort Selector */}
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-[#161922] border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-red-500 ml-auto"
          >
            <option value="trending">জনপ্রিয়তা (Trending)</option>
            <option value="rating">রেটিং (Top Rated)</option>
            <option value="newest">নতুন মুক্তিপ্রাপ্ত (Newest)</option>
          </select>
        </div>
      </div>

      {/* Results Matrix */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-slate-400 font-mono">
            {filteredResults.length}টি ফলাফল পাওয়া গেছে
          </span>
        </div>

        {filteredResults.length === 0 ? (
          <div className="text-center py-16 bg-[#161922]/50 rounded-2xl border border-white/5 p-8">
            <Search size={36} className="text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">কোন কনটেন্ট পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              "{query}" সম্পর্কিত কিছু খুঁজে পাওয়া যায়নি। বানানের সঠিকতা যাচাই করুন অথবা ফিল্টার পরিবর্তন করুন।
            </p>
            <button
              onClick={() => {
                setQuery('');
                setSelectedGenre('All');
                setSelectedLanguage('All');
                setSelectedType('all');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
            >
              সব ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredResults.map((item: any) => {
              if (item.isChannel) {
                return (
                  <div
                    key={item.id}
                    onClick={() => playMedia(item, true)}
                    className="bg-[#161922] rounded-xl overflow-hidden border border-white/5 hover:border-red-500/50 hover:bg-[#1A1F2B] transition-all cursor-pointer group p-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-video rounded-lg overflow-hidden bg-black/60 mb-2 relative">
                        <img src={item.logoUrl} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-red-600 text-white font-bold text-[9px]">
                          LIVE
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">
                        {item.banglaName || item.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">{item.currentProgram.title}</p>
                    </div>
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{item.category}</span>
                      <Play size={12} className="text-red-500 fill-red-500" />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={item.id}
                  onClick={() => openDetails(item)}
                  className="bg-[#161922] rounded-xl overflow-hidden border border-white/5 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-950/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
                      <Star size={10} className="fill-amber-400" />
                      {item.imdbRating}
                    </div>
                  </div>

                  <div className="p-2.5">
                    <h4 className="text-xs font-semibold text-white truncate group-hover:text-red-400 transition-colors">
                      {item.banglaTitle || item.title}
                    </h4>
                    {item.banglaTitle && (
                      <p className="text-[10px] text-slate-400 truncate -mt-0.5">
                        {item.title}
                      </p>
                    )}
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
        )}
      </div>
    </div>
  );
};
