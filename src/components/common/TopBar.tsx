import React from 'react';
import { Smartphone, Monitor, Shield, Search, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TopBarProps {
  onOpenGoogleAuth: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenGoogleAuth }) => {
  const {
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    user,
    isAdmin
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-[#0D0F12]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-6 py-2.5 flex items-center justify-between select-none">
      {/* Brand Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => setActiveTab('home')}
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E50914] to-[#B80610] flex items-center justify-center text-white font-black text-sm shadow-lg shadow-red-900/40 group-hover:scale-105 transition-transform">
          ▶
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
              OTT<span className="text-[#E50914]">PLAY</span>
            </span>
          </div>
          <p className="text-[9px] text-slate-400 font-medium tracking-wider -mt-1 hidden xs:block">
            JS PRIVATE LIMITED
          </p>
        </div>
      </div>

      {/* Center Nav Pills (on Home or Wide Screen) */}
      <nav className="hidden md:flex items-center gap-1 bg-[#161922] p-1 rounded-xl border border-white/5 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'home' ? 'bg-[#E50914] text-white' : 'text-slate-300 hover:text-white'
          }`}
        >
          হোম ও সিনেমা
        </button>
        <button
          onClick={() => setActiveTab('livetv')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'livetv' ? 'bg-[#E50914] text-white' : 'text-slate-300 hover:text-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          লাইভ টিভি (BD TV)
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'architecture' ? 'bg-[#E50914] text-white' : 'text-slate-300 hover:text-white'
          }`}
        >
          আর্কিটেকচার
        </button>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Viewport Frame Toggle: Mobile vs Desktop */}
        <button
          onClick={() => setViewMode(viewMode === 'mobile' ? 'full' : 'mobile')}
          title={viewMode === 'mobile' ? 'Expand to Desktop View' : 'Switch to Mobile Device Mockup'}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
        >
          {viewMode === 'mobile' ? (
            <>
              <Monitor size={14} className="text-cyan-400" />
              <span className="hidden sm:inline">Desktop View</span>
            </>
          ) : (
            <>
              <Smartphone size={14} className="text-red-400" />
              <span className="hidden sm:inline">Mobile Frame</span>
            </>
          )}
        </button>

        {/* Admin Portal Shortcut */}
        <button
          onClick={() => setActiveTab('admin')}
          title="Restricted Admin Portal (jspl / 6623)"
          className={`p-2 rounded-xl border transition-colors ${
            isAdmin
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Shield size={16} />
        </button>

        {/* User Google Avatar / Sign In */}
        <button
          onClick={onOpenGoogleAuth}
          className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs"
        >
          <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
            {user ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User size={14} className="text-slate-300 m-auto mt-1" />
            )}
          </div>
          <span className="hidden sm:inline text-white font-medium truncate max-w-[100px]">
            {user ? user.name.split(' ')[0] : 'Sign In'}
          </span>
        </button>
      </div>
    </header>
  );
};
