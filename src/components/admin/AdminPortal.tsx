import React, { useState } from 'react';
import {
  Shield,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Tv,
  Film,
  Users,
  BarChart3,
  Check,
  X,
  Play,
  KeyRound,
  Radio,
  Server,
  RefreshCw,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MediaItem, LiveChannel } from '../../types';
import { SAMPLE_VIDEOS } from '../../data/mockData';

export const AdminPortal: React.FC = () => {
  const {
    isAdmin,
    loginAdmin,
    logoutAdmin,
    movies,
    addMovie,
    updateMovie,
    deleteMovie,
    channels,
    addChannel,
    deleteChannel,
    analytics,
    showToast,
    playMedia
  } = useApp();

  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active admin sub-tab
  const [adminTab, setAdminTab] = useState<'analytics' | 'movies' | 'livetv' | 'users' | 'security'>('analytics');

  // Media Modal state (Add / Edit)
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const [mediaFormData, setMediaFormData] = useState<Partial<MediaItem>>({
    title: '',
    type: 'movie',
    description: '',
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    videoUrl: SAMPLE_VIDEOS.tearsOfSteel,
    duration: '2h 10m',
    releaseYear: 2025,
    rating: 'U/A 16+',
    imdbRating: 8.5,
    genres: ['Action', 'Thriller'],
    languages: ['English', 'Hindi'],
    director: 'JSPL Director',
    tags: ['4K UHD', 'Dolby Atmos']
  });

  // Channel Modal state
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [channelFormData, setChannelFormData] = useState({
    name: '',
    category: 'Sports' as LiveChannel['category'],
    logoUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=300&q=80',
    streamUrl: SAMPLE_VIDEOS.tearsOfSteel,
    resolution: '1080p 60fps',
    language: 'English',
    programTitle: 'Live Championship Event'
  });

  // User moderation mock state
  const [managedUsers, setManagedUsers] = useState([
    { id: 'usr-1', name: 'Alex Mercer', email: 'alex.mercer@gmail.com', plan: 'Premium 4K Ultra', status: 'Active', devices: 3 },
    { id: 'usr-2', name: 'Sarah Connor', email: 'sarah.connor@gmail.com', plan: 'OTT Play VIP', status: 'Active', devices: 2 },
    { id: 'usr-3', name: 'Devin Thorne', email: 'd.thorne@outlook.com', plan: 'Free Pass', status: 'Active', devices: 1 },
    { id: 'usr-4', name: 'Rajesh Kumar', email: 'rajesh.k@gmail.com', plan: 'Premium 4K Ultra', status: 'Banned', devices: 0 }
  ]);

  const [movieFilterQuery, setMovieFilterQuery] = useState('');

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(usernameInput, passwordInput);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setUsernameInput('');
      setPasswordInput('');
    }
  };

  const handleFillDemoCreds = () => {
    setUsernameInput('jspl');
    setPasswordInput('6623');
    setLoginError(false);
  };

  // Open Media Modal
  const openNewMediaModal = () => {
    setEditingMediaId(null);
    setMediaFormData({
      title: '',
      type: 'movie',
      description: '',
      backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
      posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
      videoUrl: SAMPLE_VIDEOS.tearsOfSteel,
      duration: '2h 10m',
      releaseYear: 2025,
      rating: 'U/A 16+',
      imdbRating: 8.5,
      genres: ['Action', 'Sci-Fi'],
      languages: ['English', 'Hindi'],
      director: 'JSPL Director',
      tags: ['4K UHD', 'Dolby Atmos']
    });
    setIsMediaModalOpen(true);
  };

  const openEditMediaModal = (m: MediaItem) => {
    setEditingMediaId(m.id);
    setMediaFormData({ ...m });
    setIsMediaModalOpen(true);
  };

  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaFormData.title) {
      showToast('Title is required', 'error');
      return;
    }

    if (editingMediaId) {
      updateMovie(editingMediaId, mediaFormData);
    } else {
      addMovie({
        title: mediaFormData.title,
        type: mediaFormData.type || 'movie',
        description: mediaFormData.description || 'Premium streaming content brought to you by JS Private Limited.',
        backdropUrl: mediaFormData.backdropUrl || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
        posterUrl: mediaFormData.posterUrl || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
        videoUrl: mediaFormData.videoUrl || SAMPLE_VIDEOS.tearsOfSteel,
        duration: mediaFormData.duration || '2h 00m',
        releaseYear: Number(mediaFormData.releaseYear) || 2025,
        rating: mediaFormData.rating || 'U/A 16+',
        imdbRating: Number(mediaFormData.imdbRating) || 8.0,
        genres: Array.isArray(mediaFormData.genres) ? mediaFormData.genres : ['Action'],
        languages: Array.isArray(mediaFormData.languages) ? mediaFormData.languages : ['English'],
        director: mediaFormData.director || 'JSPL Productions',
        cast: [
          { id: 'c-admin-1', name: 'Lead Actor', role: 'Protagonist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
        ],
        tags: mediaFormData.tags || ['4K UHD']
      });
    }
    setIsMediaModalOpen(false);
  };

  const handleSaveChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelFormData.name) {
      showToast('Channel name is required', 'error');
      return;
    }

    addChannel({
      name: channelFormData.name,
      category: channelFormData.category,
      logoUrl: channelFormData.logoUrl,
      streamUrl: channelFormData.streamUrl,
      resolution: channelFormData.resolution,
      language: channelFormData.language,
      viewersCount: Math.floor(45000 + Math.random() * 80000),
      isLive: true,
      currentProgram: {
        id: `epg-${Date.now()}`,
        title: channelFormData.programTitle,
        timeSlot: '15:00 - 18:00',
        startTime: '15:00',
        endTime: '18:00',
        progressPercent: 35,
        description: 'Live broadcast on OTT Play network.'
      },
      upcomingPrograms: [
        {
          id: `epg-up-${Date.now()}`,
          title: 'Upcoming Broadcast',
          timeSlot: '18:00 - 19:30',
          startTime: '18:00',
          endTime: '19:30',
          progressPercent: 0,
          description: 'Next broadcast scheduled.'
        }
      ]
    });
    setIsChannelModalOpen(false);
    setChannelFormData({
      name: '',
      category: 'Sports',
      logoUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=300&q=80',
      streamUrl: SAMPLE_VIDEOS.tearsOfSteel,
      resolution: '1080p 60fps',
      language: 'English',
      programTitle: 'Live Championship Event'
    });
  };

  const toggleUserBan = (userId: string) => {
    setManagedUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'Active' ? 'Banned' : 'Active';
          showToast(`User ${u.name} status updated to ${newStatus}`, newStatus === 'Active' ? 'success' : 'info');
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  // If NOT authenticated as admin, show secure lock gate
  if (!isAdmin) {
    return (
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#131720] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Top Securitized Banner */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-red-950/40">
              <Shield size={28} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">JSPL Securitized Portal</h2>
            <p className="text-xs text-slate-400 mt-1">
              Restricted Administrative Gateway · JS Private Limited
            </p>
          </div>

          {/* Quick Credential Helper Banner */}
          <div className="mb-5 p-3 rounded-xl bg-[#1A1F2B] border border-white/5 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">System Credentials:</span>
              <span className="font-mono text-slate-200">
                User: <b className="text-red-400 font-bold">jspl</b> · Pass: <b className="text-red-400 font-bold">6623</b>
              </span>
            </div>
            <button
              type="button"
              onClick={handleFillDemoCreds}
              className="px-2.5 py-1 rounded bg-red-600/20 hover:bg-red-600/30 text-red-400 font-semibold text-[11px] border border-red-500/20 transition-colors"
            >
              Auto-Fill
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter admin ID (e.g. jspl)"
                  className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-[#0E1118] border border-white/10 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-red-500 font-mono"
                />
                <KeyRound size={14} className="absolute left-3 top-3 text-slate-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Securitized Access Key / Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter passcode (e.g. 6623)"
                  className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-[#0E1118] border border-white/10 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-red-500 font-mono"
                />
                <Lock size={14} className="absolute left-3 top-3 text-slate-500" />
              </div>
            </div>

            {loginError && (
              <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 text-xs text-center font-medium">
                Invalid Admin Credentials. Required: jspl / 6623
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#E50914] hover:bg-[#ff1e2d] text-white font-bold text-xs shadow-lg shadow-red-950/50 transition-all flex items-center justify-center gap-2"
            >
              <Lock size={14} />
              <span>Authenticate & Enter Console</span>
            </button>
          </form>

          <div className="mt-6 text-center text-[11px] text-slate-500">
            Protected under 256-Bit TLS · OTT Play Cloud Infrastructure
          </div>
        </div>
      </div>
    );
  }

  // Filtered movies
  const filteredMovies = movies.filter(
    (m) =>
      m.title.toLowerCase().includes(movieFilterQuery.toLowerCase()) ||
      m.genres.some((g) => g.toLowerCase().includes(movieFilterQuery.toLowerCase()))
  );

  return (
    <div className="min-h-full pb-16">
      {/* Admin Header */}
      <div className="bg-[#12151D] border-b border-white/10 px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md bg-opacity-95">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-base shadow-md">
            JS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                JSPL Operations Portal
              </h1>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                ROOT AUTH
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Parent Entity: JS Private Limited · OTT Play Core CMS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
          >
            <LogOut size={13} />
            <span>Lock Portal</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="px-4 sm:px-6 pt-4 border-b border-white/5 flex items-center gap-1 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setAdminTab('analytics')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-t-lg text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
            adminTab === 'analytics'
              ? 'border-red-500 text-white bg-white/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 size={14} />
          <span>Real-Time Analytics</span>
        </button>

        <button
          onClick={() => setAdminTab('movies')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-t-lg text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
            adminTab === 'movies'
              ? 'border-red-500 text-white bg-white/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Film size={14} />
          <span>Movies & Series ({movies.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('livetv')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-t-lg text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
            adminTab === 'livetv'
              ? 'border-red-500 text-white bg-white/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Tv size={14} />
          <span>Live TV Streams ({channels.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('users')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-t-lg text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
            adminTab === 'users'
              ? 'border-red-500 text-white bg-white/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users size={14} />
          <span>User Accounts</span>
        </button>

        <button
          onClick={() => setAdminTab('security')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-t-lg text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
            adminTab === 'security'
              ? 'border-red-500 text-white bg-white/5'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Server size={14} />
          <span>CDN & DRM Tokens</span>
        </button>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* SUBTAB 1: ANALYTICS */}
        {adminTab === 'analytics' && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl bg-[#141720] border border-white/5">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span>Concurrent Streamers</span>
                  <Radio size={14} className="text-red-500 animate-pulse" />
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">
                  {(analytics.activeUsersNow).toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">↑ +14.8% vs last week</div>
              </div>

              <div className="p-4 rounded-xl bg-[#141720] border border-white/5">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span>Total Paid Subscribers</span>
                  <Users size={14} className="text-blue-400" />
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">
                  {(analytics.totalSubscribers).toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">94.2% renewal rate</div>
              </div>

              <div className="p-4 rounded-xl bg-[#141720] border border-white/5">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span>Egress CDN Bandwidth</span>
                  <Server size={14} className="text-amber-400" />
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">
                  {analytics.liveBandwidthGbps} Gbps
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Edge Cache hit: 98.4%</div>
              </div>

              <div className="p-4 rounded-xl bg-[#141720] border border-white/5">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span>Total Streams Served</span>
                  <Film size={14} className="text-purple-400" />
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">
                  {(analytics.todayViews).toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">Today across all platforms</div>
              </div>
            </div>

            {/* Platform Health & Stream Telemetry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-xl bg-[#141720] border border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  CDN Transcoding Clusters
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Asia-East Transcoder (Mumbai & Singapore)</span>
                      <span className="text-emerald-400 font-mono">HEALTHY · 42ms</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[48%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>US-East Transcoder (Virginia & Ohio)</span>
                      <span className="text-emerald-400 font-mono">HEALTHY · 65ms</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[62%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>EU-Central (Frankfurt & London)</span>
                      <span className="text-emerald-400 font-mono">HEALTHY · 38ms</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[54%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-[#141720] border border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Top 3 Most Streamed Assets Today
                </h3>
                <div className="space-y-2.5">
                  {movies.slice(0, 3).map((item, idx) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#181C26] border border-white/5 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="font-extrabold text-red-500 font-mono w-4">#{idx + 1}</span>
                        <img
                          src={item.posterUrl}
                          alt={item.title}
                          className="w-8 h-10 object-cover rounded"
                        />
                        <div className="truncate">
                          <p className="font-semibold text-white truncate">{item.title}</p>
                          <p className="text-[10px] text-slate-400">{item.genres.join(', ')}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-slate-300">
                        {(180000 - idx * 45000).toLocaleString()} streams
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: MOVIES & SERIES */}
        {adminTab === 'movies' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <input
                  type="text"
                  placeholder="Filter movies & series..."
                  value={movieFilterQuery}
                  onChange={(e) => setMovieFilterQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#141720] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
                <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
              </div>

              <button
                onClick={openNewMediaModal}
                className="py-2 px-4 rounded-xl bg-[#E50914] hover:bg-[#ff1e2d] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
              >
                <Plus size={15} />
                <span>Add New Movie / Series</span>
              </button>
            </div>

            {/* Movies Table / List */}
            <div className="rounded-xl border border-white/5 bg-[#141720] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#181C26] text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Title & Poster</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Duration / Year</th>
                      <th className="p-3">Genres</th>
                      <th className="p-3">Rating</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {filteredMovies.map((m) => (
                      <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={m.posterUrl}
                              alt={m.title}
                              className="w-9 h-12 object-cover rounded-md flex-shrink-0"
                            />
                            <div>
                              <div className="font-semibold text-white">{m.title}</div>
                              <div className="text-[10px] text-slate-500 font-mono truncate max-w-[200px]">
                                {m.videoUrl}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 capitalize">{m.type}</td>
                        <td className="p-3">
                          {m.duration} · {m.releaseYear}
                        </td>
                        <td className="p-3">{m.genres.join(', ')}</td>
                        <td className="p-3">
                          <span className="font-bold text-amber-400">★ {m.imdbRating}</span> ({m.rating})
                        </td>
                        <td className="p-3 text-right space-x-1">
                          <button
                            onClick={() => playMedia(m, false)}
                            title="Preview Video Stream"
                            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                          >
                            <Play size={13} />
                          </button>
                          <button
                            onClick={() => openEditMediaModal(m)}
                            title="Edit Media"
                            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${m.title}"?`)) {
                                deleteMovie(m.id);
                              }
                            }}
                            title="Delete"
                            className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: LIVE TV STREAMS */}
        {adminTab === 'livetv' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Live Broadcast Channels</h3>
                <p className="text-xs text-slate-400">Configure 24/7 linear streaming channels</p>
              </div>
              <button
                onClick={() => setIsChannelModalOpen(true)}
                className="py-2 px-4 rounded-xl bg-[#E50914] hover:bg-[#ff1e2d] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
              >
                <Plus size={15} />
                <span>Add Live Channel</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {channels.map((ch) => (
                <div
                  key={ch.id}
                  className="p-4 rounded-xl bg-[#141720] border border-white/5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={ch.logoUrl}
                          alt={ch.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-1">{ch.name}</h4>
                          <span className="text-[11px] text-slate-400">{ch.category} · {ch.resolution}</span>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 font-bold text-[10px]">
                        <Radio size={10} className="animate-pulse" />
                        LIVE
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#181C26] text-xs space-y-1 mb-3">
                      <div className="text-[11px] text-slate-400 font-semibold uppercase">EPG Active:</div>
                      <div className="font-semibold text-white line-clamp-1">{ch.currentProgram.title}</div>
                      <div className="text-[10px] text-slate-400">{ch.currentProgram.timeSlot}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {(ch.viewersCount / 1000).toFixed(1)}k viewers
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => playMedia(ch, true)}
                        className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                        title="Preview Channel Stream"
                      >
                        <Play size={13} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove channel "${ch.name}"?`)) {
                            deleteChannel(ch.id);
                          }
                        }}
                        className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400"
                        title="Delete Channel"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 4: USER ACCOUNTS */}
        {adminTab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Subscriber Directory</h3>
                <p className="text-xs text-slate-400">
                  Manage viewer tier access, concurrent sessions, and account restrictions
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-[#141720] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#181C26] text-slate-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Subscription Tier</th>
                    <th className="p-3">Devices Active</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {managedUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02]">
                      <td className="p-3">
                        <div className="font-semibold text-white">{u.name}</div>
                        <div className="text-[11px] text-slate-500">{u.email}</div>
                      </td>
                      <td className="p-3 font-medium text-amber-300">{u.plan}</td>
                      <td className="p-3 font-mono">{u.devices} / 4 allowed</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            u.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => toggleUserBan(u.id)}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                            u.status === 'Active'
                              ? 'bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20'
                              : 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {u.status === 'Active' ? 'Revoke Access' : 'Restore Access'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUBTAB 5: CDN & DRM SECURITY */}
        {adminTab === 'security' && (
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-xl bg-[#141720] border border-white/5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Widevine & FairPlay DRM Master Configuration
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Encrypted HLS/DASH media manifests are signed using JS Private Limited rotating key exchange.
              </p>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#0E1118] border border-white/10 flex items-center justify-between">
                  <span className="text-slate-400">Current Key ID:</span>
                  <span className="text-emerald-400">jspl-ott-widevine-2026-rot-a931</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0E1118] border border-white/10 flex items-center justify-between">
                  <span className="text-slate-400">Token Expiry:</span>
                  <span className="text-slate-300">3600 seconds (Auto-refresh on renew)</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0E1118] border border-white/10 flex items-center justify-between">
                  <span className="text-slate-400">Geo-Fencing Compliance:</span>
                  <span className="text-slate-300">Enforced via Cloudflare Workers</span>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => showToast('Flushed Cloudflare edge media cache', 'success')}
                  className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw size={13} />
                  <span>Purge Global Edge Cache</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT MOVIE */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#161922] border border-white/10 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">
                {editingMediaId ? 'Edit Title' : 'Add New Movie / Series'}
              </h3>
              <button
                onClick={() => setIsMediaModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSaveMedia} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={mediaFormData.title || ''}
                  onChange={(e) => setMediaFormData({ ...mediaFormData, title: e.target.value })}
                  placeholder="e.g., Cyberpunk: Neon Genesis"
                  className="w-full px-3 py-2 rounded-xl bg-[#0E1118] border border-white/10 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Content Type</label>
                  <select
                    value={mediaFormData.type || 'movie'}
                    onChange={(e) =>
                      setMediaFormData({
                        ...mediaFormData,
                        type: e.target.value as 'movie' | 'series'
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#0E1118] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="movie">Movie</option>
                    <option value="series">Web Series</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Duration / Season</label>
                  <input
                    type="text"
                    value={mediaFormData.duration || ''}
                    onChange={(e) => setMediaFormData({ ...mediaFormData, duration: e.target.value })}
                    placeholder="e.g. 2h 15m or Season 1"
                    className="w-full px-3 py-2 rounded-xl bg-[#0E1118] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description / Synopsis</label>
                <textarea
                  rows={2}
                  value={mediaFormData.description || ''}
                  onChange={(e) => setMediaFormData({ ...mediaFormData, description: e.target.value })}
                  placeholder="Enter synopsis..."
                  className="w-full px-3 py-2 rounded-xl bg-[#0E1118] border border-white/10 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Release Year</label>
                  <input
                    type="number"
                    value={mediaFormData.releaseYear || 2025}
                    onChange={(e) => setMediaFormData({ ...mediaFormData, releaseYear: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0E1118] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">IMDb Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    value={mediaFormData.imdbRating || 8.5}
                    onChange={(e) => setMediaFormData({ ...mediaFormData, imdbRating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0E1118] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Stream / MP4 / HLS Video URL</label>
                <input
                  type="text"
                  required
                  value={mediaFormData.videoUrl || ''}
                  onChange={(e) => setMediaFormData({ ...mediaFormData, videoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0E1118] border border-white/10 text-white font-mono text-[11px] focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Poster Image URL</label>
                  <input
                    type="text"
                    value={mediaFormData.posterUrl || ''}
                    onChange={(e) => setMediaFormData({ ...mediaFormData, posterUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0E1118] border border-white/10 text-white font-mono text-[11px] focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Backdrop Image URL</label>
                  <input
                    type="text"
                    value={mediaFormData.backdropUrl || ''}
                    onChange={(e) => setMediaFormData({ ...mediaFormData, backdropUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0E1118] border border-white/10 text-white font-mono text-[11px] focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMediaModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#E50914] hover:bg-[#ff1e2d] text-white font-bold"
                >
                  {editingMediaId ? 'Update Media' : 'Publish Title'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CHANNEL */}
      {isChannelModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#161922] border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Add 24/7 Live Channel</h3>
              <button
                onClick={() => setIsChannelModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSaveChannel} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Channel Name *</label>
                <input
                  type="text"
                  required
                  value={channelFormData.name}
                  onChange={(e) => setChannelFormData({ ...channelFormData, name: e.target.value })}
                  placeholder="e.g., OTT Sports 1 HD"
                  className="w-full px-3 py-2 rounded-xl bg-[#0E1118] border border-white/10 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={channelFormData.category}
                    onChange={(e) =>
                      setChannelFormData({
                        ...channelFormData,
                        category: e.target.value as LiveChannel['category']
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#0E1118] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Sports">Sports</option>
                    <option value="News">News</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Movies">Movies</option>
                    <option value="Kids">Kids</option>
                    <option value="Music">Music</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Resolution</label>
                  <input
                    type="text"
                    value={channelFormData.resolution}
                    onChange={(e) => setChannelFormData({ ...channelFormData, resolution: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0E1118] border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Current Show / Program Title</label>
                <input
                  type="text"
                  value={channelFormData.programTitle}
                  onChange={(e) => setChannelFormData({ ...channelFormData, programTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0E1118] border border-white/10 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Live HLS / Video Stream URL</label>
                <input
                  type="text"
                  required
                  value={channelFormData.streamUrl}
                  onChange={(e) => setChannelFormData({ ...channelFormData, streamUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0E1118] border border-white/10 text-white font-mono text-[11px] focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsChannelModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#E50914] hover:bg-[#ff1e2d] text-white font-bold"
                >
                  Add Channel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
