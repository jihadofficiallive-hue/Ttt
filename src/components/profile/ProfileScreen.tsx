import React, { useState } from 'react';
import {
  User,
  Bookmark,
  Download,
  Settings,
  Shield,
  LogOut,
  Sparkles,
  Trash2,
  Play,
  HardDrive,
  Info,
  CheckCircle,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VideoQuality } from '../../types';

interface ProfileScreenProps {
  onOpenGoogleAuth: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onOpenGoogleAuth }) => {
  const {
    user,
    logoutUser,
    watchlist,
    toggleWatchlist,
    movies,
    downloads,
    removeDownload,
    playMedia,
    openDetails,
    updateUserProfile,
    showToast
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'watchlist' | 'downloads' | 'settings'>('watchlist');

  // Watchlist movies
  const watchlistMovies = movies.filter((m) => watchlist.includes(m.id));

  // Calculate total offline downloads storage
  const totalDownloadBytes = downloads.reduce((acc, d) => acc + d.fileSizeBytes, 0);
  const totalDownloadGB = (totalDownloadBytes / (1024 * 1024 * 1024)).toFixed(2);

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto pb-24">
      {/* Profile Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171B25] via-[#141720] to-[#171B25] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-red-500/60 shadow-lg flex-shrink-0">
              <img
                src={
                  user?.avatarUrl ||
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
                }
                alt={user?.name || 'User'}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {user ? user.name : 'Guest Viewer'}
                </h1>
                {user && (
                  <span className="px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 font-bold text-[10px] uppercase tracking-wider border border-red-500/20">
                    {user.planTier}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {user ? user.email : 'Sign in with Google to sync your watchlist & 4K streams'}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 text-[11px] text-slate-400">
                <span>{watchlist.length} Saved in Watchlist</span>
                <span>·</span>
                <span>{downloads.length} Downloaded Offline</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <button
                onClick={logoutUser}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 flex items-center gap-1.5 transition-colors"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={onOpenGoogleAuth}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-900 text-xs font-bold shadow-lg transition-all flex items-center gap-2"
              >
                <span>One-Tap Google Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveSubTab('watchlist')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'watchlist'
              ? 'bg-[#E50914] text-white shadow-md shadow-red-950/40'
              : 'bg-[#161922] text-slate-400 hover:text-white'
          }`}
        >
          <Bookmark size={14} />
          <span>My Watchlist ({watchlist.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('downloads')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'downloads'
              ? 'bg-[#E50914] text-white shadow-md shadow-red-950/40'
              : 'bg-[#161922] text-slate-400 hover:text-white'
          }`}
        >
          <Download size={14} />
          <span>Offline Downloads ({downloads.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'settings'
              ? 'bg-[#E50914] text-white shadow-md shadow-red-950/40'
              : 'bg-[#161922] text-slate-400 hover:text-white'
          }`}
        >
          <Settings size={14} />
          <span>Playback & Audio</span>
        </button>
      </div>

      {/* SUB-SECTION 1: WATCHLIST */}
      {activeSubTab === 'watchlist' && (
        <div className="space-y-4">
          {watchlistMovies.length === 0 ? (
            <div className="text-center py-16 bg-[#161922]/40 rounded-2xl border border-white/5 p-8">
              <Bookmark size={36} className="text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">Your Watchlist is Empty</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explore movies and series on OTT Play and click '+' to bookmark your favorites for later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {watchlistMovies.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openDetails(item)}
                  className="bg-[#161922] rounded-xl overflow-hidden border border-white/5 hover:border-red-500/50 transition-all group cursor-pointer"
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Direct Play button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playMedia(item, false);
                      }}
                      title="প্লে করুন (Play Now)"
                      className="absolute inset-0 m-auto w-9 h-9 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-lg opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
                    >
                      <Play size={15} className="fill-white translate-x-0.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchlist(item.id);
                      }}
                      title="Remove from watchlist"
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-colors z-20"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="p-2.5">
                    <h4 className="text-xs font-semibold text-white truncate">{item.banglaTitle || item.title}</h4>
                    <p className="text-[10px] text-slate-400">{item.releaseYear} · {item.genres[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-SECTION 2: OFFLINE DOWNLOADS */}
      {activeSubTab === 'downloads' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#161922] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HardDrive size={20} className="text-red-500" />
              <div>
                <h3 className="text-xs font-bold text-white">Device Offline Storage</h3>
                <p className="text-[11px] text-slate-400">
                  {totalDownloadGB} GB utilized of 64 GB available on this device
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">Encrypted Widevine</span>
          </div>

          {downloads.length === 0 ? (
            <div className="text-center py-16 bg-[#161922]/40 rounded-2xl border border-white/5 p-8">
              <Download size={36} className="text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">No Offline Downloads</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Download your favorite films to watch uninterrupted on flights or when traveling with poor network connectivity.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {downloads.map((dl) => {
                const mediaItem = movies.find((m) => m.id === dl.mediaId);
                const sizeMB = (dl.fileSizeBytes / (1024 * 1024)).toFixed(0);

                return (
                  <div
                    key={dl.id}
                    className="p-3 rounded-xl bg-[#161922] border border-white/5 hover:border-white/10 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={dl.posterUrl}
                        alt={dl.title}
                        className="w-10 h-14 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{dl.title}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span>{sizeMB} MB</span>
                          <span>·</span>
                          <span className="font-mono">{dl.quality}</span>
                          <span>·</span>
                          <span className="text-emerald-400">Ready Offline</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {mediaItem && (
                        <button
                          onClick={() => playMedia(mediaItem, false)}
                          className="p-2 rounded-lg bg-[#E50914] text-white hover:bg-[#ff1e2d] transition-colors"
                          title="Play Offline File"
                        >
                          <Play size={14} className="fill-white" />
                        </button>
                      )}
                      <button
                        onClick={() => removeDownload(dl.id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete Download"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUB-SECTION 3: SETTINGS */}
      {activeSubTab === 'settings' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#161922] border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Streaming & Video Quality
            </h3>

            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <div>
                <h4 className="text-xs font-semibold text-white">Default Video Resolution</h4>
                <p className="text-[11px] text-slate-400">Adaptive bitrate will adjust based on bandwidth</p>
              </div>
              <select
                value={user?.streamQuality || 'Auto'}
                onChange={(e) => updateUserProfile({ streamQuality: e.target.value as VideoQuality })}
                className="px-3 py-1.5 rounded-lg bg-[#0E1118] border border-white/10 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
              >
                <option value="Auto">Auto (Smart Dynamic)</option>
                <option value="4K UHD">4K UHD (High Data)</option>
                <option value="1080p FHD">1080p Full HD</option>
                <option value="720p HD">720p HD (Balanced)</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <div>
                <h4 className="text-xs font-semibold text-white">Autoplay Next Episode</h4>
                <p className="text-[11px] text-slate-400">Automatically launch the next episode after credits</p>
              </div>
              <input
                type="checkbox"
                checked={user?.autoPlayNext ?? true}
                onChange={(e) => updateUserProfile({ autoPlayNext: e.target.checked })}
                className="w-4 h-4 accent-[#E50914] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="text-xs font-semibold text-white">Dolby Atmos & Spatial Audio</h4>
                <p className="text-[11px] text-slate-400">Lossless multi-channel sound on compatible headsets</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold font-mono">
                ENABLED
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Corporate Attribution Footer / About */}
      <div className="p-6 rounded-2xl bg-[#12151D] border border-white/5 text-center space-y-2 mt-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-md bg-red-600 flex items-center justify-center text-white text-[10px] font-bold">
            JS
          </div>
          <span className="text-xs font-bold text-white tracking-wide">
            Powered by JS Private Limited
          </span>
        </div>
        <p className="text-[11px] text-slate-400 max-w-md mx-auto">
          OTT Play Platform Engine · Version 2.4.0 (Build 9021-Production).
          All streaming content, trademarks, and audio licenses are properties of JS Private Limited and affiliated syndicates.
        </p>
        <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 pt-2 font-mono">
          <span>Terms of Service</span>
          <span>·</span>
          <span>Privacy Policy</span>
          <span>·</span>
          <span>DRM Licenses</span>
        </div>
      </div>
    </div>
  );
};
